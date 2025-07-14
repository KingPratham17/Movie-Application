import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { IMAGE_BASE_URL } from '../api/tmdb';
import { FaHeart, FaRegHeart, FaPlayCircle } from 'react-icons/fa';
import './MovieCard.css';

const MovieCard = ({ movie, isLarge }) => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const imagePath = isLarge ? movie.poster_path : movie.backdrop_path;
  const imageUrl = imagePath
    ? `${IMAGE_BASE_URL}${imagePath}`
    : 'https://via.placeholder.com/180x270?text=No+Image';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div 
      className={`netflix-movie-card ${isLarge ? 'netflix-movie-card-large' : ''}`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={imageUrl}
        alt={movie.title || movie.name || 'Movie Poster'}
      />
      <div className="netflix-movie-card-overlay">
        <div className="netflix-movie-card-header">
          <FaPlayCircle className="netflix-play-icon" />
          <button 
            className="netflix-favorite-button"
            onClick={handleFavoriteClick}
          >
            {isFavorite(movie.id) ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart color="white" />
            )}
          </button>
        </div>
        <div className="netflix-movie-card-footer">
          <h4>{movie.title || movie.name || 'Untitled'}</h4>
          <p>{movie.vote_average ? `${movie.vote_average}/10` : 'No rating'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
