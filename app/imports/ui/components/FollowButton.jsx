import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Meteor } from 'meteor/meteor';
import { Follows } from '../../api/Following/following';
import { useParams } from 'react-router';

const FollowButton = ({ followerUser, isFollowingUser }) => {

  const handleButtonClick = async () => {
    function toggleFollow() {

      const existingFollow = Follows.collection.findOne({
        isFollowingUser: isFollowingUser,
        followerUser: Meteor.userId(),
      });

      if (existingFollow) {
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
    toggleFollow(isFollowingUser);
  };

  return (
    <Button variant={isFollowing ? 'danger' : 'success'} onClick={handleButtonClick} disabled={loading}>
      { isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
