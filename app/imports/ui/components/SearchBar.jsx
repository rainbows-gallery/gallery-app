import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const submitBtn = useRef(null);
  let isFocused = false;

  const handleSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(value);
  };
  const handleFocus = function () {
    isFocused = true;
  };

  const handleBlur = function () {
    isFocused = false;
  };

  const handleKeyDown = function (e) {
    if (isFocused && e.key === 'Enter') {
      submitBtn.active = true;
    }
  };

  return (
    <Form
      onFocus={() => handleFocus()}
      onBlur={() => handleBlur()}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Form.Control
        name="searchField"
        type="text"
        placeholder="Search"
        className="p-2 border border-secondary searchText rounded-corners"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <Button ref={submitBtn} type="submit" className="invisible position-absolute" />
    </Form>
  );
};

export default SearchBar;
