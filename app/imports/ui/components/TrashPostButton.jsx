import React, { useRef, useState } from 'react';
import { Trash3Fill } from 'react-bootstrap-icons';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Posts } from '../../api/Posts/Posts';
import { Comments } from '../../api/comment/Comments';

const TrashPostButton = ({ postId, comments, redirectTo }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const target = useRef(null);
  let isClickOnce = false;

  // Remove post and its associated comments from collection and navigate to another page
  const removePost = function () {
    if (isClickOnce) {
      comments.map((comment) => Comments.collection.remove(comment._id));
      Posts.collection.remove(postId);
      navigate(redirectTo);
    } else {
      setShow(true);
    }
  };

  const handleMouseLeave = function () {
    setShow(false);
  };

  return (
    <>
      <Button id="deletePost" variant="link" className="text-danger" onClick={() => removePost()} onMouseLeave={() => handleMouseLeave()}>
        <Trash3Fill ref={target} size={30} />
      </Button>
      <Overlay
        show={show}
        target={target.current}
        onEntered={() => { isClickOnce = true; }}
        onExit={() => { isClickOnce = false; }}
      >
        <Tooltip>Are you sure you want to delete this post? (This action can not be reverted)</Tooltip>
      </Overlay>
    </>
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
