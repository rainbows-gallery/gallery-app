import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Posts } from '../../api/Posts/Posts';
import ClickableImage from '../components/ClickableImage';

const ProfileTab = ({ userName, userProfilePic, userEmail, href, onePost, userBio }) => (
  <Link to={href} className="text-decoration-none">
    <Card className="h-100">
      <Card.Header className="py-2">
        <Image src={userProfilePic} width={64} height={64} className="float-start" roundedCircle />
        <Card.Title className="text-end"><h2>@{userName}</h2></Card.Title>
        <Card.Subtitle className="text-end text-muted">{userEmail}</Card.Subtitle>
        {userBio ? <Card.Text className="text-black pt-2 ">Bio: {userBio}</Card.Text> : ''}
      </Card.Header>
      <Card.Body className="text-center">
        <Image src={onePost} className="w-75" thumbnail />
      </Card.Body>
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
    const userList = Meteor.users.find({ _id: { $ne: Meteor.user()?._id } }).fetch() || undefined;
    return {
      ready: rdy,
      users: userList,
    };
  }, []);
  return (ready ? (
    <Container id="discover" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h3>Click an image to view the account of the poster!</h3>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {users
              .filter((user) => {
                const userPost = Posts.collection.findOne({ owner: user.username });
                return userPost; // Filter out users without posts
              })
              .map((user, index) => {
                const userPost = Posts.collection.findOne({ owner: user.username });
                const onePost = userPost ? userPost.imageId : undefined;
                return (
                  <ClickableImage
                    id={`profile-${index}`}
                    key={user._id}
                    src={onePost}
                    alt="Placeholder"
                    width="100%"
                    height="250px"
                    href={`/profile/${user._id}`}
                    userName={user.username}
                    userProfile={user.profile.image}
                  />
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
