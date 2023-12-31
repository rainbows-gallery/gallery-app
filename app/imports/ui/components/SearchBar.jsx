import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = ({ id }) => {
  const [value, setValue] = useState('');
  const submitBtn = useRef(null);
  const navigate = useNavigate();
  let isFocused = false;

  // Handles the form submission, navigates to search results page and passes its input to it
  const handleSubmit = function (e) {
    e.preventDefault();
    navigate('/search', { state: value });
    setValue('');
  };

  // Handles key presses and activates the hidden submission button on Enter press
  const handleKeyDown = function (e) {
    if (isFocused && e.key === 'Enter') {
      submitBtn.active = true;
    }
  };

  return (
    <Form
      onFocus={() => { isFocused = true; }}
      onBlur={() => { isFocused = false; }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Form.Control
        id={id}
        name="searchField"
        type="text"
        placeholder="Search for Profiles"
        className="p-2 border border-secondary searchText rounded-corners"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <Button ref={submitBtn} type="submit" className="invisible position-absolute" />
    </Form>
  );
};

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SearchBar;
