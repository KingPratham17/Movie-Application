import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, fetchTrendingMovies } from '../api/tmdb';
import Banner from '../components/Banner';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        const trendingMovies = await fetchTrendingMovies();
        
        setMovies(popularMovies);
        setTrending(trendingMovies);
        setFeaturedMovie(trendingMovies[Math.floor(Math.random() * trendingMovies.length)]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="netflix-home">
      {featuredMovie && <Banner movie={featuredMovie} />}
      
      <div className="netflix-content">
        <MovieGrid movies={trending} title="Trending Now" isLarge />
        <MovieGrid movies={movies} title="Popular on Netflix" />
        <MovieGrid movies={[...movies].reverse()} title="Watch Again" />
      </div>
    </div>
  );
};

export default Home;