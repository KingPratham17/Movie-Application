import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieGrid from '../components/MovieGrid';
import './Favorites.css';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="favorites-page" style={{paddingTop:"70px"}}>
      <h2>Your Favorite Movies</h2>
      {favorites.length > 0 ? (
        <MovieGrid 
          movies={favorites} 
          title="My List"
          onRemoveFavorite={removeFavorite}
          isFavoritePage={true}
        />
      ) : (
        <p>You haven't added any favorites yet.</p>
      )}
    </div>
  );
};

export default Favorites;