import React from 'react';
import { Form } from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search movies..."
        onChange={(e) => onSearch(e.target.value)}
        className="netflix-search-bar"
      />
    </Form.Group>
  );
};

export default SearchBar;