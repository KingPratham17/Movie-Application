import React from 'react';
import { IMAGE_BASE_URL } from '../api/tmdb';
import { Button } from 'react-bootstrap';
import './Banner.css';

const Banner = ({ movie }) => {
  const backgroundImage = movie?.backdrop_path 
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : `${IMAGE_BASE_URL}${movie.poster_path}`;

  return (
    <div 
      className="netflix-banner"
      style={{
          backgroundImage: `url("${backgroundImage}")`
      }}
    >
      <div className="netflix-banner-content">
        <h1 className="netflix-banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="netflix-banner-buttons">
          <Button variant="light" className="me-2">
            ▶ Play
          </Button>
          <Button variant="dark" className="me-3">
            ℹ More Info
          </Button>
        </div>
        <p className="netflix-banner-description">
          {movie?.overview?.length > 150 
            ? `${movie.overview.substring(0, 150)}...` 
            : movie?.overview}
        </p>
      </div>
      <div className="netflix-fade-bottom" ></div>
    </div>
  );
};

export default Banner;