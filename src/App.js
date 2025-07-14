import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import './styles/shared.css';
import './styles/lightTheme.css';
import './styles/darkTheme.css';
import Navbar from './components/NavBar';


function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <div className="app">
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;