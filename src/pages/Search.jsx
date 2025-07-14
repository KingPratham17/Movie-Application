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
    if (query.trim() === '') {
      setMovies([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const results = await searchMovies(query);
        let filteredResults = results;
        if (selectedGenre) {
          filteredResults = results.filter(movie => 
            movie.genre_ids.includes(Number(selectedGenre))
          );
        }
        
        setMovies(filteredResults);
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
  }, [query, selectedGenre]);

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
          movies={movies} 
          title={query ? `Results for "${query}"` : "Search for movies"}
        />
      )}
    </div>
  );
};

export default Search;