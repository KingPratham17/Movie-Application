import  { useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext'; 

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 10) { 
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <BootstrapNavbar 
    expand="lg"
    className={`netflix-navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : 'light'}`}
    fixed="top"
  >

      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" className="netflix-brand">
          NETFLIX
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="netflix-nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="netflix-nav-link">My List</Nav.Link>
            <Nav.Link as={Link} to="/search" className="netflix-nav-link">Search</Nav.Link>
          </Nav>
          <ThemeToggle />
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;