import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Meteor } from 'meteor/meteor';
import { Comments } from "../../api/comment/Comments";

const Comment = ({ comment, post }) => {
  const removeItem = (id) => {
    Comments.collection.remove(id);
  };
  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <div>
            <p className="comment-item">{comment.createdAt.toLocaleDateString('en-US')}</p>
            <p className="comment-item">{comment.comment}</p>
            <footer className="blockquote-footer">{comment.owner}</footer>
          </div>
        </Col>
        {Meteor.user() && (Meteor.user().username === comment.owner || Meteor.user().username === post.owner || Meteor.user().username === 'admin@foo.com') && (
          <Col xs="auto">
            <Button
              variant="light"
              onClick={() => removeItem(comment._id)}
            >
              <Trash />
            </Button>
          </Col>
        )}
      </Row>
    </ListGroup.Item>
  );
};

// Require a document to be passed to this component.
Comment.propTypes = {
  comment: PropTypes.shape({
    comment: PropTypes.string,
    postId: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  post: PropTypes.shape({
    description: PropTypes.string,
    owner: PropTypes.string,
    likes: PropTypes.number,
    uploadDate: PropTypes.instanceOf(Date),
    imageId: PropTypes.string,
    deletedDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([null])]),
    _id: PropTypes.string,
  }).isRequired,
};

export default Comment;
