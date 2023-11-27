import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfileTab = ({ userName, userProfilePic, userEmail, href }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={userProfilePic} width={75} />
      <Card.Title><a href={href} className="h2">@{userName}</a></Card.Title>
      <Card.Subtitle>{userEmail}</Card.Subtitle>
    </Card.Header>
  </Card>
);
const Discover = () => {
  const { ready, users } = useTracker(() => {
    const userSubscriber = Meteor.subscribe('userList');
    // Determine if the subscription is ready
    const rdy = userSubscriber.ready();
    // Get the Users
    const currentUser = Meteor.users.find({}).fetch();
    return {
      ready: rdy,
      users: currentUser,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Click an account to view their profile</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {users.map((user) => (
              <Col key={user._id}><ProfileTab
                userProfilePic={user.profile.image}
                userName={user.username}
                userEmail={user.emails[0].address}
                href={`/profile/${user._id}`}
              />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

ProfileTab.propTypes = {
  userProfilePic: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default Discover;
