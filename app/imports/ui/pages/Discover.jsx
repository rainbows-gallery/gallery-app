import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Posts } from '../../api/Posts/Posts';

const ProfileTab = ({ userName, userProfilePic, userEmail, href, onePost, userBio }) => (
  <Link to={href} className="text-decoration-none">
    <Card className="h-100">
      <Card.Header className="py-3">
        <Image src={userProfilePic} width={64} height={64} className="float-start" roundedCircle />
        <Card.Title className="text-end"><h2>@{userName}</h2></Card.Title>
        <Card.Subtitle className="text-end text-muted">{userEmail}</Card.Subtitle>
        {userBio ? <Card.Text className="text-black pt-2 ">Bio: {userBio}</Card.Text> : ''}
      </Card.Header>
      {onePost ? (
        <Card.Body className="text-center">
          <Image src={onePost} className="w-75" thumbnail />
        </Card.Body>
      ) : (
        <Card.Body className="text-center">
          <Card.Text className="text-muted">This profile has not posted an image yet</Card.Text>
        </Card.Body>
      )}
    </Card>
  </Link>
);
const Discover = () => {
  const { ready, users } = useTracker(() => {
    const userSubscriber = Meteor.subscribe('userList');
    const postSubscription = Meteor.subscribe(Posts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = userSubscriber.ready() && postSubscription.ready();
    // Get the Users
    const userList = Meteor.users.find({ _id: { $ne: Meteor.user()._id } }).fetch();
    return {
      ready: rdy,
      users: userList,
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
            {users.map((user) => {
              const userPost = Posts.collection.findOne({ owner: user.username });
              const onePost = userPost ? userPost.imageId : undefined;
              return (
                <Col key={user._id}><ProfileTab
                  userProfilePic={user.profile.image}
                  userName={user.username}
                  userEmail={user.emails[0].address}
                  href={`/profile/${user._id}`}
                  userBio={user.profile.bio}
                  onePost={onePost}
                />
                </Col>
              );
            })}
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
  onePost: PropTypes.string.isRequired,
  userBio: PropTypes.string.isRequired,
};

export default Discover;
