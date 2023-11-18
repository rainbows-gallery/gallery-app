import React from 'react';
import Button from 'react-bootstrap/Button';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Follows } from '../../api/Following/following';

const FollowButton = ({ isFollowingUser }) => {

  const existingFollow = Follows.collection.findOne({
    isFollowingUser: isFollowingUser,
    followerUser: Meteor.userId(),
  });
  function toggleFollow() {
    if (existingFollow !== null) {
      // If already following, remove the follow entry
      Follows.collection.remove(existingFollow._id);
    } else {
      const { _id } = useParams();
      // If not following, add a new follow entry
      Follows.insert({
        isFollowingUser: Meteor.users.find({ _id }).fetch(),
        followerUser: Meteor.userId(),
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
};
export default FollowButton;
