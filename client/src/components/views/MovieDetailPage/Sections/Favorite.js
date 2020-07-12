import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  // variables
  const variables = {
    movieId: movieId,
    userFrom: userFrom,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime
  };

  // Onclicck

  const onClickFavorite = () => {
    // if (user.userData && !user.userData.isAuth) {
    //     return alert('Please Log in first');
    // }
    if (Favorited) {
      //when we are already subscribed

      axios
        .post("/api/favorite/removeFromFavorite", variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to Add To Favorite");
          }
        });
    } else {
      // when we are not subscribed yet
      axios.post("/api/favorite/addToFavorite", variables).then(response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to Add To Favorite");
        }
      });
    }
  };
  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then(response => {
      if (response.data.success) {
        setFavoriteNumber(response.data.subscribeNumber);
      } else {
        alert("Failed to numbers fetch");
      }
    });

    axios.post("/api/favorite/favorited", variables).then(response => {
      if (response.data.success) {
        setFavorited(response.data.subcribed);
      } else {
        alert("Failed to get Favorite Information");
      }
    });
  }, []);
  return (
    <div className="mt-5 mr-3">
      <Button onClick={onClickFavorite}>
        {" "}
        {!Favorited ? "Add to Favorite" : "Not Favorite"} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
