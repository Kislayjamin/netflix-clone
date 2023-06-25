import React, { useState, useEffect } from 'react';
import './Films.css';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
function Disney() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'be5dbe26845f42388321ae8a91a8fa79';
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&certification_country=India&sort_by=popularity.desc`
        );
        const data = await response.json();
        console.log(data);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div className="container">
      <div className="movies">
        <Carousel className='Carousel' autoPlay={true} showThumbs={false} transitionTime={100} infiniteLoop={true} showStatus={false}>
          {movies.length > 0 ? (
            movies.map(movie => (
              console.log("Kislay"),
              <Link to="rfc" key={movie.id} state={movie}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  style={{height: "600px", width: "100vw"}}
                  alt={movie.title}
                />
                <h1>This is my website</h1>
              </Link>
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default Disney;
