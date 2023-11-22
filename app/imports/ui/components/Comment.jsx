import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Meteor } from 'meteor/meteor';

const Comment = ({ comment, collection, post }) => {
  const removeItem = (id) => {
    collection.remove(id);
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
        {Meteor.user() && (Meteor.user().username === comment.owner || Meteor.user().username === post.owner || Meteor.user().profile.role === 'admin') && (
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
  collection: PropTypes.object.isRequired,
  post: PropTypes.shape({
    description: PropTypes.string,
    owner: PropTypes.string,
    likes: PropTypes.number,
    uploadDate: PropTypes.instanceOf(Date),
    imageId: PropTypes.string,
    deletedDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([null])]),
    _id: PropTypes.string,
  }),
};

export default Comment;
