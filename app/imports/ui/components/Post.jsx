import React from 'react';
import PropTypes from 'prop-types';
import ClickableImage from './ClickableImage';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Post = ({ post }) => (
  <ClickableImage src={post.imageId} alt={post.description} userName={post.owner} />
);
// Require a document to be passed to this component.
Post.propTypes = {
  post: PropTypes.shape({
    owner: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.string,
    imageId: PropTypes.string,
    uploadDate: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Post;
