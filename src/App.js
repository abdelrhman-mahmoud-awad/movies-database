import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming the CSS file for styling

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching movies from the API
    fetch('https://dummyapi.online/api/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Movie Database</h1>
      <div className="movie-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.image} alt={movie.movie} className="movie-image" />
              <h2>{movie.movie}</h2>
              <p>Rating: {movie.rating}</p>
              <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer">
                View on IMDb
              </a>
            </div>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
