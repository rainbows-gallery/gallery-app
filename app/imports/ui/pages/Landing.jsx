import React, { useEffect, useState } from 'react';
import { Container, Row, Image, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../components/LoadingSpinner';
import { Posts } from '../../api/Posts/Posts';
import { Follows } from '../../api/Following/following';
import ClickableImage from '../components/ClickableImage';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const [galleryPosts, setGalleryPosts] = useState([]);

  const { posts, users, ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Posts.everyOnePublicationName);
    const userSubscriber = Meteor.subscribe('userList');
    const followSubscription = Meteor.subscribe(Follows.everyOnePublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const userRdy = userSubscriber.ready();
    const followRdy = followSubscription.ready();

    const signedIn = Meteor.user() ? Meteor.user().username : '';
    const following = signedIn !== ''
      ? Follows.collection.find({ followerUser: signedIn }, { fields: { isFollowingUser: 1 } }).fetch().map(x => x.isFollowingUser)
      : [];
    // Get the Stuff documents
    const postsDef = signedIn !== ''
      ? Posts.collection.find({ owner: { $in: following } }, { sort: { uploadDate: 1, likes: -1 } }).fetch()
      : Posts.collection.find({}, { sort: { likes: -1 } }).fetch();
    const usersDef = (Meteor.users.find({}).fetch() ?? 'undefined');
    return {
      posts: postsDef,
      users: usersDef,
      ready: rdy && userRdy && followRdy,
    };
  }, []);

  useEffect(() => {
    if (ready) {
      setGalleryPosts(posts.map((post) => {
        const currentUser = users.find(x => x.username === post.owner);
        return {
          src: post.imageId,
          width: '100%',
          height: '100%',
          caption: post.description,
          username: post.owner,
          userProfile: currentUser.profile.image,
        };
      }));
    }
  }, [posts]);

  return ready ? (
    <div id="landing-page">
      <Container className="m-0 min-vw-100">
        {!Meteor.userId() && (
          <Row className="d-flex justify-content-center">
            <Image src="/images/rainbow.png" style={{ width: '100%', height: 'auto', padding: 0 }} />
          </Row>
        )}
      </Container>
      <Container className="py-3 bg-white rounded">
        {!Meteor.userId() && (
          <h2 className="py-4">Recent Posts</h2>
        )}
        { galleryPosts.length === 0 && (<h1 className="text-center">Follow some accounts to begin viewing artwork! For inspiration, check the discover tab!</h1>)}
        <Row xs={1} md={2} lg={3} className="g-4">
          {galleryPosts.map((post, index) => (
            <Col key={index} className="mb-4">
              <ClickableImage
                id={`profile-${index}`}
                key={post._id}
                src={post.src}
                alt="Placeholder"
                width="100%"
                height="250px"
                href={`/photo-interact/${posts[index]._id}`}
                userName={post.username}
                userProfile={post.userProfile}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default Landing;
