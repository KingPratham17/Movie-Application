import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') !== 'false'
  );

  useEffect(() => {
  localStorage.setItem('darkMode', darkMode);
  const htmlElement = document.querySelector('html');
  
  if (darkMode) {
    htmlElement.classList.add('dark-theme');
    htmlElement.classList.remove('light-theme');
  } else {
    htmlElement.classList.add('light-theme');
    htmlElement.classList.remove('dark-theme');
  }
}, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};