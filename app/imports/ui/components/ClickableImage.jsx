import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const ClickableImage = ({ src, href, alt, width, height, userName, userProfile }) => (
  <Link to={href}>
    <div className="position-relative rounded overflow-hidden shadow mb-2" style={{ width: width, height: height }}>
      <img src={src} alt={alt} width={width} />
      <div className="p-2 d-flex position-absolute bottom-0 start-0 bg-white w-100 opacity-75">
        <img className="rounded-circle" src={userProfile} alt={userName} width={40} />
        <h3 className="text-black">@{userName}</h3>
      </div>
    </div>
  </Link>
);

ClickableImage.propTypes = {
  src: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  userProfile: PropTypes.string.isRequired,
};

export default ClickableImage;
