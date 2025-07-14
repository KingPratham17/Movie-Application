import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/tmdb';
import { useFavorites } from '../context/FavoritesContext';
import { IMAGE_BASE_URL } from '../api/tmdb';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie) return <div>Movie not found</div>;

  return (
    <Container className="movie-details">
      <Row>
        <Col md={4}>
          <Card.Img
            variant="top"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1>
          <div className="mb-3">
            {movie.genres.map(genre => (
              <Badge key={genre.id} bg="secondary" className="me-2">
                {genre.name}
              </Badge>
            ))}
          </div>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
          <p>{movie.overview}</p>
          <Button
            variant={isFavorite(movie.id) ? "danger" : "primary"}
            onClick={handleFavoriteClick}
          >
            {isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;