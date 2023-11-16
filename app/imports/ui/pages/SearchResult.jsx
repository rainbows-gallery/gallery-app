import React from 'react';
import { Card, Container, Image } from 'react-bootstrap';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

const testData = [
  { username: 'JamesNarrow' },
  { username: 'JamesNarrowthe2nd' },
  { username: 'JamesJamesJames' },
  { username: 'LebronJames' },
  { username: 'wowie' },
];

const SearchEntry = ({ userProfilePic, alt, userName, email, href, width = 64, height = 64 }) => (
  <Card className="border-0 rounded px-4 my-3 align-content-center">
    <Card.Body>
      <Image
        src={userProfilePic}
        alt={alt}
        width={width}
        height={height}
        className="rounded-circle me-4 float-start"
      />
      <Card.Title><a href={href} className="h2">@{userName}</a></Card.Title>
      <Card.Text className="text-muted">{email}</Card.Text>
    </Card.Body>
  </Card>
);

const SearchResult = () => {
  const location = useLocation();
  const searchInput = location.state;

  return (
    <Container id="search-results-page">
      <h1 className="text-white fw-bold">Searched for profiles named &quot;{searchInput}&quot;</h1>
      {testData.map((entry) => (
        <SearchEntry
          userProfilePic="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="User Profile Picture"
          userName={entry.username}
          email="Email"
          href="/"
        />
      ))}
    </Container>
  );
};

SearchEntry.propTypes = {
  userProfilePic: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default SearchResult;
