import React from 'react';
import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies, title, isLarge }) => {
  return (
    <div className="netflix-movie-row">
      <h2 className="netflix-row-title">{title}</h2>
      <div className="netflix-row-posters">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isLarge={isLarge}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;