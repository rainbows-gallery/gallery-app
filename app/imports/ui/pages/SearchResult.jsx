import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchEntry = ({ userProfilePic, id, alt, userName, email, href, width = 64, height = 64 }) => (
  <Link to={href} className="h2">
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
        <Card.Title>@{userName}</Card.Title>
        <Card.Text className="text-muted">{email}</Card.Text>
      </Card.Body>
    </Card>
  </Link>
);

const SearchResult = () => {
  const location = useLocation();
  const searchInput = location.state;
  const filter = new RegExp(`${searchInput}`, 'i');

  const { ready, users } = useTracker(() => {
    const userSubscriber = Meteor.subscribe('userList');
    // Determine if the subscription is ready
    const userReady = userSubscriber.ready();
    // Get the Users
    const currentUser = Meteor.users.find({}).fetch();
    return {
      ready: userReady,
      users: currentUser,
    };
  }, []);

  const usersFiltered = _.filter(users, (user) => filter.test(user.username));

  return (ready ? (
    <Container id="search-results-page">
      <h1 className="fw-bold">Searched for profiles with username including &quot;{searchInput}&quot;</h1>
      {usersFiltered.length !== 0 ? (
        usersFiltered.map((user, index) => (
          <SearchEntry
            id={`profile-${index}`}
            userProfilePic={user.profile.image}
            alt="User Profile Picture"
            userName={user.username}
            email={user.emails[0].address}
            href={`/profile/${user._id}`}
            height={64}
            width={64}
          />
        ))
      ) : <h2>No profiles matched your input</h2>}
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
  id: PropTypes.string.isRequired,
};

export default SearchResult;
