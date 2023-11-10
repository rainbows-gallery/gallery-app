import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StuffItem from './StuffItem';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const ClickableImage = ({src, alt, width, userName, userProfile}) => (
  <div className="position-relative rounded overflow-hidden shadow" style={{"width": width}}>
    <img src={src} alt={alt} width={width} />
    <div className="p-2 d-flex position-absolute bottom-0 start-0 bg-white w-100 opacity-75">
      <img className="rounded-circle" src={userProfile} alt={userName} width={40} />
      <h3>@{userName}</h3>
    </div>
  </div>
);

ClickableImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  userName: PropTypes.string,
  userProfile: PropTypes.string,
};

export default ClickableImage;
