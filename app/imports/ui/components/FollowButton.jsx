import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Follows } from '../../api/Following/following';

const FollowButton = ({ isFollowingUser, followerUser }) => {
  const [existingFollow, setExistingFollow] = useState([]);
  function isAFollow() {
    setExistingFollow(Follows.collection.findOne({
      isFollowingUser: isFollowingUser,
      followerUser: followerUser,
    }));
  }
  useEffect(() => {
    isAFollow();
  }, []);
  function toggleFollow() {
    if (existingFollow) {
      // If already following, remove the follow entry
      Follows.collection.remove(existingFollow._id);
      console.log(`${isFollowingUser} is no longer followed by ${followerUser}`);
    } else {
      // If not following, add a new follow entry
      Follows.collection.insert({
        isFollowingUser: isFollowingUser,
        followerUser: followerUser,
      });
      console.log(`${isFollowingUser} is now followed by ${followerUser}`);
    }
    isAFollow();
  }
  const handleButtonClick = async () => {
    toggleFollow();
  };
  useEffect(() => { console.log(`existing follow: ${existingFollow}`); }, [existingFollow]);
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
