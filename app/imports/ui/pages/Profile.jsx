import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Posts } from '../../api/Posts/Posts';
// import { Follows } from '../../api/Following/following';
import LoadingSpinner from '../components/LoadingSpinner';
import ClickableImage from '../components/ClickableImage';
import FollowButton from '../components/FollowButton';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Profile = () => {
  // get userID for the profile you are looking at
  const { _id } = useParams();
  // Check to see if it is properly getting the value
  console.log(` id: ${_id}`);
  const { ready, posts, shownUser, user } = useTracker(() => {
    // subscribe to posts
    const postSubscription = Meteor.subscribe(Posts.userPublicationName);
    // subscribe to userList
    const userSubscription = Meteor.subscribe('userList');
    // subscribe to use Follows
    // const followSubscription = Meteor.subscribe(Follows.userPublicationName);
    // check to see if subscriptions are ready
    const rdy = postSubscription.ready() && userSubscription.ready(); // && followSubscription.ready();
    // console log to check
    console.log(`post subscription: ${postSubscription.ready()}`);
    console.log(`user subscription: ${userSubscription.ready()}`);
    // console.log(`follows subscription: ${followSubscription.ready()}`);
    // establish users
    const showingThisUser = Meteor.users.findOne({ _id });
    const currentUser = Meteor.user();
    // // check to see that they are loaded correctly !! CANNOT DO THIS because need to wait for subscription to be ready
    // console.log(`Showing this user: ${showingThisUser.username}`);
    // console.log(`Current user: ${currentUser.username}`);
    // get posts
    const postItems = currentUser ? Posts.collection.find({ owner: showingThisUser.username }).fetch() : [];
    return {
      ready: rdy,
      posts: postItems,
      shownUser: showingThisUser,
      user: currentUser,
    };
  }, []);
  function isUserShownUser() {
    return shownUser.username === user.username;
  }
  return (ready ? (
    <Container className="py-3">
      <Row className="whiteText text-center">
        <h1>Profile</h1>
      </Row>
      <Row>
        <Col>
          {/* Profile Photo Associated with Account */}
          <Image className="rounded-circle" src={shownUser.profile.image} alt={shownUser.username} width="200px" height="200px" />
          {/* User name associated with account */}
          <Row className="whiteText py-2">
            <h3>{shownUser ? shownUser.username : 'User Not Found'}</h3>
          </Row>
        </Col>
        <Col />
        <Col className="justify-content-end">
          <Row className="whiteText pt-5 py-2 px-4">
            <h2>Followers</h2>
          </Row>
          <Row className="whiteText pt-5 py-2 px-4">
            <h2>Following</h2>
          </Row>
          <Row>
            {!isUserShownUser() && <FollowButton isFollowingUser={shownUser.username} followerUser={user.username} /> }
          </Row>
        </Col>
      </Row>
      {/* Render the posts owned by this user */}
      <Row className="text-center whiteText">
        <h2>Posts</h2>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post._id}>
            <ClickableImage width="100%" height="300px" userProfile={shownUser.profile.image} src={post.imageId} userName={shownUser.username} href={`/photo-interact/${post._id}`} alt="data" />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Profile;
