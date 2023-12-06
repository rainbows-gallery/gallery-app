import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { useLocation } from 'react-router';
import SearchEntry from '../components/Users';
import LoadingSpinner from '../components/LoadingSpinner';

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

export default SearchResult;
