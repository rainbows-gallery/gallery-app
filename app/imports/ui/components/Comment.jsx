import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

const Comment = ({ comment }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{comment.createdAt.toLocaleDateString('en-US')}</p>
    <p>{comment.comment}</p>
  </ListGroup.Item>
);

// Require a document to be passed to this component.
Comment.propTypes = {
  comment: PropTypes.shape({
    comment: String,
    userId: String,
    createdAt: Date,
    owner: String,
    _id: PropTypes.string,
  }).isRequired,
};

export default Comment;
