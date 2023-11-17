import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';

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

  const { ready, users } = useTracker(() => {
    const userSubscriber = Meteor.subscribe('userList');
    // Determine if the subscription is ready
    const userReady = userSubscriber.ready();
    // Get the Users
    const currentUser = Meteor.users.find({ username: searchInput }).fetch();
    return {
      ready: userReady,
      users: currentUser,
    };
  }, []);
  return (ready ? (
    <Container id="search-results-page">
      <h1 className="text-white fw-bold">Searched for profiles named &quot;{searchInput}&quot;</h1>
      {users.length !== 0 ? (
        users.map((user) => (
          <SearchEntry
            userProfilePic={user.profile.image}
            alt="User Profile Picture"
            userName={user.username}
            email={user.email}
            href={`/profile/${user._id}`}
          />
        ))
      ) : <h2 className="text-white">No profiles matched your input</h2>}
    </Container>
  ) : <LoadingSpinner />);
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
