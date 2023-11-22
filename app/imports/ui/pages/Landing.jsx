import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Gallery } from 'react-grid-gallery';
import { useNavigate } from 'react-router-dom';
import ClickableImage from '../components/ClickableImage';
import LoadingSpinner from '../components/LoadingSpinner';
import { Posts } from '../../api/Posts/Posts';
import { Follows } from '../../api/Following/following';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const [galleryPosts, setGalleryPosts] = useState([]);
  const navigate = useNavigate();

  const { posts, users, highlight, ready } = useTracker(() => {
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
      highlight: postsDef.shift(),
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
          width: 520,
          height: 212,
          caption: post.description,
          thumbnailCaption: (
            <div className="p-2 d-flex position-absolute bottom-0 start-0 bg-white w-100 opacity-75">
              <img
                  className="rounded-circle"
                  src={currentUser.profile ? currentUser.profile.image : ''}
                  alt={post.owner} width={40}
              />
              <h3 className="text-black">@{post.owner}</h3>
            </div>
          ),
        };
      }));
    }
  }, [posts]);
  useEffect(() => {
    console.log(users)
  }, [users]);
  return ready ? (
    <Container id="landing-page" className="py-3 bg-white rounded">
      { highlight !== undefined ? (
        <ClickableImage
          width="100%"
          height="500px"
          href={`/photo-interact/${highlight._id}`}
          src={highlight.imageId}
          alt={highlight.description}
          userName={highlight.owner}
          userProfile={users.find(x => x.username === highlight.owner).profile ? users.find(x => x.username === highlight.owner).profile.image : ''}
        />
      ) : <h1>For some reason their are no posts at this time please come back later for more posts ...</h1>}
      <Gallery
        images={galleryPosts}
        onClick={(index) => {
          navigate(`/photo-interact/${posts[index]._id}`);
        }}
        enableImageSelection={false}
      />
    </Container>
  ) : <LoadingSpinner />;
};

export default Landing;
