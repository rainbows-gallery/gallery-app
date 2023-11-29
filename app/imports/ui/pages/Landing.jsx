import React, { useEffect, useState } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Gallery } from 'react-grid-gallery';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Posts } from '../../api/Posts/Posts';
import { Follows } from '../../api/Following/following';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const [galleryPosts, setGalleryPosts] = useState([]);
  const navigate = useNavigate();

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
      setGalleryPosts(posts.map((post, index) => {
        const currentUser = users.find(x => x.username === post.owner);
        return {
          src: post.imageId,
          width: '100%',
          height: '100%',
          caption: post.description,
          thumbnailCaption: (
            <div
              id={`pic-${index.toString()}`}
              onClick={() => { navigate(`/photo-interact/${posts[index]._id}`); }}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/photo-interact/${posts[index]._id}`); }}
              role="button"
              tabIndex="0"
              className="p-2 d-flex position-absolute bottom-0 start-0 bg-white w-100 opacity-75"
            >
              <img
                className="rounded-circle"
                src={currentUser.profile ? currentUser.profile.image : ''}
                alt={post.owner}
                width={40}
              />
              <h5 className="text-black">@{post.owner}</h5>
            </div>
          ),
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
        <Gallery
          images={galleryPosts}
          onClick={(index) => {
            navigate(`/photo-interact/${posts[index]._id}`);
          }}
          enableImageSelection={false}
        />
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default Landing;
