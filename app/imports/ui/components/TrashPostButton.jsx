import React from 'react';
import { Trash3Fill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Posts } from '../../api/Posts/Posts';

const TrashPostButton = ({ postId }) => {
  const navigate = useNavigate();

  const removePost = function (id) {
    Posts.collection.remove(id);
    navigate('/');
  };

  return (
    <Button variant="link" className="text-danger ps-0" onClick={() => removePost(postId)}><Trash3Fill size={30} /></Button>
  );
};

TrashPostButton.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default TrashPostButton;
