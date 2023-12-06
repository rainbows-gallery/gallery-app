import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import SearchEntry from './Users';

const UserFollow = ({ show, setShow, title, data }) => {
  const hide = () => setShow(false);
  return (
    <Modal size="lg" show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.map((user, index) => (
          <div onClick={hide} role="button" tabIndex="0" onKeyPress={hide}>
            <SearchEntry
              id={`profile-${index}`}
              userProfilePic={user.profile.image}
              alt="User Profile Picture"
              userName={user.username}
              email={user.emails[0].address}
              href={`/profile/${user._id}`}
              height={64}
              width={64}
            />
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

UserFollow.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.shape({
      image: PropTypes.string,
      bio: PropTypes.string,
    }),
  })).isRequired,
};

export default UserFollow;
