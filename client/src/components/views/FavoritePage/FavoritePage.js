import React, { useState, useSelector, useEffect, Fragment } from "react";
import Axios from "axios";
import { Popover, Typography } from "antd";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import './Favorite.css'
import { Button } from 'antd';
import { Popconfirm, message } from 'antd';
import { Empty } from 'antd';
const { Title } = Typography;



function FavoritePage({user:{userData}}) {
 
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  let variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    fetchFavoriteMovie();
  }, []);
  function confirm(e) {
    console.log(e);
    message.success('Deleted');
  }
  
  function cancel(e) {
    console.log(e);
    message.error('No');
  }

  const fetchFavoriteMovie = () => {
    Axios.post("/api/favorite/getFavoredMovie", variable).then(res => {
        
      if (res.data.success) {
        setFavorites(res.data.favorites)
        setLoading(false)
          
      } else {
        alert("Failed to get subscription videos");
      }
    });
  };
//Remove 
const onDelete = (movieId,userFrom) =>{
    const removeVar = {
        movieId:movieId,
        userData:userFrom
    }

    
    

    // Delete api
    Axios.post('/api/favorite/removeFromFavorite',removeVar)
    .then(r=>{
        if(r.data.success){
            fetchFavoriteMovie()
        }else{
            alert('Failed')
        }
    })
}
  const renderCards = Favorites.map((favorite, index) => {
    const content = (
        
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_URL}w500${favorite.moviePost}`} />
        ) : (
          <Empty/>
        )}
      </div>
    );

    return (
       
      <tr key={index}>
         
           
          {favorite.length<0 ? <Fragment>
              <td>
                  hadgghd

              <Empty/>
              </td>

          </Fragment>:<Fragment>
          <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunTime} mins</td>
            <td>
            <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={()=>onDelete(favorite.movieId,favorite.userFrom)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
            <a href="#" type="primary">Delete</a>
            </Popconfirm>
            </td>

          </Fragment>}
      
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Favorite Movies By Me </Title>
      <hr />
      {userData && !userData.isAuth ? (
        <div
          style={{
            width: "100%",
            fontSize: "2rem",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <p>Please Log in first...</p>
          <a href="/login">Go to Login page</a>
        </div>
      ) : (
        !Loading && (
          <table>
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Movie RunTime</th>
                <td>Remove from favorites</td>
              </tr>
            </thead>
        
          
            <tbody>{renderCards}</tbody>
         
          </table>
        )
      )}
    </div>
  );
}

FavoritePage.propTypes = {
    user: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    user: state.user
  });
  
  export default connect(mapStateToProps)(FavoritePage);
