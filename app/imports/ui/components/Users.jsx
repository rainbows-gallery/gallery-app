import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchEntry = ({ userProfilePic, id, alt, userName, email, href, width = 64, height = 64 }) => (
  <Link to={href} className="text-decoration-none">
    <Card className="border-0 rounded px-4 my-3 align-content-center">
      <Card.Body>
        <Image
          id={id}
          src={userProfilePic}
          alt={alt}
          width={width}
          height={height}
          className="rounded-circle me-4 float-start"
        />
        <Card.Title><h2>@{userName}</h2></Card.Title>
        <Card.Text className="text-muted">{email}</Card.Text>
      </Card.Body>
    </Card>
  </Link>
);

SearchEntry.propTypes = {
  userProfilePic: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default SearchEntry;
