import React from 'react';
import Button from 'react-bootstrap/Button';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Follows } from '../../api/Following/following';

const FollowButton = ({ isFollowingUser, followerUser }) => {

  const existingFollow = Follows.collection.findOne({
    isFollowingUser: isFollowingUser,
    followerUser: followerUser,
  });
  function toggleFollow() {
    if (existingFollow !== null && existingFollow !== undefined) {
      // If already following, remove the follow entry
      Follows.collection.remove(existingFollow._id);
    } else {
      // If not following, add a new follow entry
      Follows.collection.insert({
        isFollowingUser: isFollowingUser,
        followerUser: followerUser,
      });
    }
  }
  const handleButtonClick = async () => {
    toggleFollow();
  };
  return (
    <Button variant={existingFollow ? 'danger' : 'success'} onClick={handleButtonClick}>
      { existingFollow ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

FollowButton.propTypes = {
  isFollowingUser: PropTypes.string.isRequired,
  followerUser: PropTypes.string.isRequired,
};
export default FollowButton;
