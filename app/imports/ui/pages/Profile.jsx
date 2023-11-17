import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/Posts/Posts';
import LoadingSpinner from '../components/LoadingSpinner';
import Post from '../components/Post';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Profile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, posts, user } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Posts documents.
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Posts
    const postItems = Posts.collection.find({}).fetch();
    const currentUser = (Meteor.user() ?? 'undefined');
    return {
      posts: postItems,
      ready: rdy,
      user: currentUser,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="text-center">
        <p>Profile</p>
      </Row>
      {/* Profile Photo Associated with Account */}
      <Row>
        <Image className="rounded-circle" src={user.image} alt={user.username} width={40} />
      </Row>
      {/* User name associated with account */}
      <Row>
        <p>{user.username}</p>
      </Row>
      {/* Render the posts owned by this user */}
      <Row className="text-center">
        <p>Posts</p>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post._id}><Post
            post={post}
          />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Profile;
