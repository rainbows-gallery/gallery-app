import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ClickableImage from '../components/ClickableImage';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner';
import { Posts } from '../../api/Posts/Posts';
import { Follow } from '../../api/Following/following';
import { Gallery } from "react-grid-gallery";

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const [galleryPosts, setGalleryPosts] = useState([])
  const navigate = useNavigate();

  const { posts, users, highlight, ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Posts.everyOnePublicationName);
    const userSubscriber = Meteor.subscribe('userList');
    const followSubscription = Meteor.subscribe(Follow.everyOnePublicationName)
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const userRdy = userSubscriber.ready();
    const followRdy = followSubscription.ready();

    const signedIn = Meteor.user() ? Meteor.user().username : '';
    const following = signedIn !== ''
      ? Follow.collection.find({followerUser: signedIn}, {fields: {followingUser: 1}}).fetch().map(x => x.followingUser)
      : [];
    console.log(following)
    // Get the Stuff documents
    const posts = signedIn !== ''
      ? Posts.collection.find({owner: {$in: following}}, { sort: { uploadDate: 1, likes: -1 } }).fetch()
      : Posts.collection.find({}, { sort: { likes: -1 } }).fetch();
    const users = (Meteor.users.find({}).fetch() ?? 'undefined');
    return {
      highlight: posts.shift(),
      posts: posts,
      users: users,
      ready: rdy && userRdy && followRdy,
    };
  }, []);

  useEffect(() => {
    if (posts) {
      setGalleryPosts(posts.map((post) => {
        const currentUser = users.find(x => x.username === post.owner)
        console.log(currentUser)
        return {
          src: post.imageId,
          width: 520,
          height: 212,
          caption: post.description,
          thumbnailCaption: (
            <div className="p-2 d-flex position-absolute bottom-0 start-0 bg-white w-100 opacity-75">
              <img className="rounded-circle" src={currentUser.profile.image} alt={post.owner} width={40} />
              <h3 className="text-black">@{post.owner}</h3>
            </div>
          )
        }
      }))
    }
  }, [posts]);

  return ready ? (
    <Container id="landing-page" className="py-3 bg-white rounded">
      { highlight !== undefined ? <ClickableImage
        width="100%"
        height="500px"
        href={`/photo-interact/${highlight._id}`}
        src={highlight.imageId}
        alt={highlight.description}
        userName={highlight.owner}
        userProfile={users.find(x => x.username === highlight.owner).profile.image}
      />: <h1>For some reason their are no posts at this time please come back later for more posts ...</h1>}
      <Gallery
        images={galleryPosts}
        onClick={(index)=>{
          navigate(`/photo-interact/${posts[index]._id}`);
        }}
        enableImageSelection={false}
      />
    </Container>
  ) : <LoadingSpinner />;
};

export default Landing;
