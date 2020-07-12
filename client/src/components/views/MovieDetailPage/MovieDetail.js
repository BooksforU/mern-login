import React,{useEffect,useState} from 'react'
import { API_URL,API_KEY, IMAGE_URL} from '../../Config'
import { Descriptions,Button ,Row} from 'antd';
import GridCard from "../../commons/GridCard"
import MainImage from "../LandingPage/Sections/MainImage"
import Favorite from './Sections/Favorite';
import { Typography } from 'antd';
const { Title } = Typography;


function MovieDetail(props) {
 const movieId = props.match.params.movieId
 const [movie,setMovie] = useState([])
 const [Casts, setCasts] = useState([])
 const [ActorToggle, setActorToggle] = useState(false)



    useEffect(() => {
        const movieId = props.match.params.movieId
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setMovie(res)
        })
    }, [])



    // For casts
    useEffect(() => {
        const movieId = props.match.params.movieId
        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        fetch(endpointForCasts)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.cast)
            setCasts(res.cast)
        })
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }


    return (
    <div>
 
        {movie && 
            
            <MainImage
            image = {`${IMAGE_URL}w1280${movie.backdrop_path&&movie.backdrop_path}`}
            title = {movie.original_title}
            text = {movie.overview}
            
            />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        </div>


        <Descriptions title="Movie Info" bordered className="ml-3">
                <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
                <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
                <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
                <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
                <Descriptions.Item label="vote_average" span={2}>
                {movie.vote_average}
                </Descriptions.Item>
                <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
                <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
                <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
        </Descriptions> 
        <br></br>
        <Title level ={4} className="mt-5 ml-3">Casts</Title>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Actor View </Button>
        </div>
        {ActorToggle &&
        <Row className="mt-5 container-fluid" gutter  = {[16,16]}>  
                {Casts && Casts.map((cast,index)=>(
                    <React.Fragment key={index}>
                        {cast.profile_path &&
                                <GridCard
                                actor image={`${IMAGE_URL}w300${cast.profile_path}`}
                                castId = {cast.cast_id}
                                />
                        } 
                    </React.Fragment>
             
                ))}
        </Row>
        }
              



    </div>
    )
}

export default MovieDetail
