import React, { useState, useEffect } from 'react';
import { searchMovies, fetchGenres } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { Form } from 'react-bootstrap';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const loadGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const filtered = movies.filter(movie => 
        movie.genre_ids.includes(Number(selectedGenre))
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedGenre, movies]);

  useEffect(() => {
    if (query.trim() === '') {
      setMovies([]);
      setFilteredMovies([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const results = await searchMovies(query);
        setMovies(results);
        if (selectedGenre) {
          const filtered = results.filter(movie => 
            movie.genre_ids.includes(Number(selectedGenre))
          );
          setFilteredMovies(filtered);
        } else {
          setFilteredMovies(results);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-page">
      <h2>Search Movies</h2>
      <SearchBar onSearch={setQuery} />
      
      <Form.Group className="mb-3">
        <Form.Label>Filter by Genre</Form.Label>
        <Form.Select 
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <MovieGrid 
          movies={filteredMovies.length > 0 ? filteredMovies : movies} 
          title={query ? `Results for "${query}"` : "Search for movies"}
        />
      )}
    </div>
  );
};

export default Search;