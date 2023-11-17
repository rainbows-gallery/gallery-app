import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Posts } from '../../api/Posts/Posts';
import LoadingSpinner from '../components/LoadingSpinner';
import ClickableImage from '../components/ClickableImage';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Profile = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, posts, user } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Posts documents.
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    const userSubscriber = Meteor.subscribe('userList');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const userReady = userSubscriber.ready();
    // Get the Posts
    const currentUser = (Meteor.users.find({ _id }).fetch()[0] ?? 'undefined');
    const postItems = currentUser !== 'undefined' ? Posts.collection.find({ owner: currentUser.username }).fetch() : [];
    console.log(currentUser);
    return {
      posts: postItems,
      ready: rdy && userReady,
      user: currentUser,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="whiteText">
        <h1>Profile</h1>
      </Row>
      {/* Profile Photo Associated with Account */}
      <Image className="rounded-circle" src={user.profile.image} alt={user.username} width="200px" height="200px" />
      {/* User name associated with account */}
      <Row className="whiteText py-2">
        <h3>{user.username}</h3>
      </Row>
      {/* Render the posts owned by this user */}
      <Row className="text-center whiteText">
        <h2>Posts</h2>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => {
          console.log(post);
          return (
            <Col key={post._id}>
              <ClickableImage width="100%" height="300px" userProfile={user.profile.image} src={post.imageId} userName={user.username} href={`/photo-interact/${post._id}`} alt="data" />
            </Col>
          );
        })}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Profile;
