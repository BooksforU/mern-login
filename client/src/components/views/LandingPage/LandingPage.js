import React, { useEffect, useState ,Fragment} from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCard from "../../commons/GridCard";
import { Row } from "antd";
import { Carousel } from "antd";
import Skeltone from "../../commons/Skeltone"

import { Typography } from "antd";
const { Title } = Typography;

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = path => {
    fetch(path)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setMovies([...Movies, ...res.results]);
        setCurrentPage(res.page);
        setloading(false);
      });
  };

  const handleClick = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage +
      1}`;
    fetchMovies(endpoint);
  };
  return (
    <div style={{ width: "100%", marginTop: "10px" }}>
      {loading ? (
        <Fragment><Skeltone/></Fragment>
      ) : (
        <Fragment>
          {/* MAIN HEADING MOVIEW PAGE */}
          <Carousel autoplay>
            {Movies[0] && (
              <MainImage
                image={`${IMAGE_URL}w1280${Movies[0].backdrop_path &&
                  Movies[0].backdrop_path}`}
                title={Movies[0].original_title}
                text={Movies[0].overview}
              />
            )}

            {Movies[2] && (
              <MainImage
                image={`${IMAGE_URL}w1280${Movies[2].backdrop_path &&
                  Movies[2].backdrop_path}`}
                title={Movies[2].original_title}
                text={Movies[2].overview}
              />
            )}

            {Movies[1] && (
              <MainImage
                image={`${IMAGE_URL}w1280${Movies[1].backdrop_path &&
                  Movies[1].backdrop_path}`}
                title={Movies[1].original_title}
                text={Movies[1].overview}
              />
            )}
          </Carousel>
          {/* Listing Movies */}

          <div style={{ width: "85%", margin: " auto" }}>
            <Title level={3} className="mt-5">
              Movies by lastest
            </Title>
            <hr />
            <Row gutter={[16, 16]}>
              {Movies &&
                Movies.map((movie, index) => (
                  <React.Fragment key={index}>
                    {console.log(movie)}
                    <GridCard
                      image={
                        movie.poster_path &&
                        `${IMAGE_URL}w500${movie.poster_path}`
                      }
                      movieId={movie.id}
                      movieName={movie.original_title}
                    />
                  </React.Fragment>
                ))}
            </Row>

            <br />
            {/* Load More Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn btn-info" onClick={handleClick}>
                Load More
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default LandingPage;
