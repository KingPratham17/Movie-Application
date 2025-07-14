import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Button } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Button 
      variant={darkMode ? 'dark' : 'light'} 
      onClick={toggleTheme}
      className="theme-toggle"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </Button>
  );
};

export default ThemeToggle;