import React from 'react';
import { Trash3Fill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Posts } from '../../api/Posts/Posts';
import { Comments } from '../../api/comment/Comments';

const TrashPostButton = ({ postId, comments, redirectTo }) => {
  const navigate = useNavigate();

  // Remove post and its associated comments from collection and navigate to another page
  const removePost = function () {
    comments.map((comment) => Comments.collection.remove(comment._id));
    Posts.collection.remove(postId);
    navigate(redirectTo);
  };

  return (
    <Button variant="link" className="text-danger ps-0" onClick={() => removePost()}><Trash3Fill size={30} /></Button>
  );
};

TrashPostButton.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    comment: PropTypes.string,
    postId: PropTypes.string,
    createdAt: PropTypes.objectOf(Date),
    owner: PropTypes.string,
  })).isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default TrashPostButton;
