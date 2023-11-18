import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Meteor } from 'meteor/meteor';

const FollowButton = ({ followerUser, isFollowingUser }) => {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Check if the current user is already following the target user
    const subscription = Meteor.subscribe('followingCollection.publication.user', isFollowingUser);

    return () => {
      subscription.stop();
    };
  }, [isFollowingUser]);

  const handleButtonClick = async () => {
    setLoading(true);

    try {
      // Call the Meteor method to toggle follow/unfollow
      Meteor.call('following.toggleFollow', isFollowingUser, (error, result) => {
        if (error) {
          console.error('Error toggling follow/unfollow:', error.reason);
        } else {
          setIsFollowing(result);
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={isFollowing ? 'danger' : 'success'} onClick={handleButtonClick} disabled={loading}>
      { isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;

