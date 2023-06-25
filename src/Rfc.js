import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoviePlayer = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              sort_by: 'popularity.desc',
              api_key: 'be5dbe26845f42388321ae8a91a8fa79',
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        setError('Error fetching movies');
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchYouTubeIds = async () => {
      try {
        const moviesWithYouTubeIds = await Promise.all(
          movies.map(async (movie) => {
            try {
              const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                  params: {
                    part: 'snippet',
                    q: `${movie.title} official trailer`,
                    type: 'video',
                    maxResults: 1,
                    key: 'AIzaSyBT2JQJ14QfDySUhZXrR1Dqz6hRqwUtJfY',
                  },
                }        
              );

              if (response.data.items.length > 0) {
                return {
                  ...movie,
                  key: response.data.items[0].id.videoId,
                };
              } else {
                return movie;
              }
            } catch (error) {
              return movie;
            }
          })
        );

        setMovies(moviesWithYouTubeIds);
      } catch (error) {
        setError('Error fetching YouTube video IDs');
      }
    };

    if (movies.length > 0) {
      fetchYouTubeIds();
    }
  }, [movies]);

  const handleMovieChange = (index) => {
    setCurrentMovieIndex(index);
  };

  return (
    <div>
      <h1>Movie Player</h1>
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          { movies && 
          movies.length > 0 ? (
            <div>
              <iframe
                title="Movie Player"
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${movies[currentMovieIndex]?.key}`}
                frameBorder="0"
                allowFullScreen
              />
              <ul>
                {movies.map((movie, index) => (
                  <li key={movie.id} onClick={() => handleMovieChange(index)}>
                    {movie.title}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>Loading movies...</div>
          )}
        </>
      )}
    </div>
  );
};

export default MoviePlayer;
