import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const ClickableImage = ({ src, href, alt, width, height, id }) => (
  <Link to={href}>
    <div className="position-relative rounded overflow-hidden shadow mb-2" style={{ width: width, height: height }} id={id}>
      <img src={src} alt={alt} width="500px" />
    </div>
  </Link>
);

ClickableImage.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default ClickableImage;
