import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ClickableImage from '../components/ClickableImage';
import ImgGrid from '../components/ImgGrid';
import { Posts } from '../../api/Posts/Posts';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const { stuffs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Posts.everyOnePublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Posts.collection.find({}, { sort: { likes: -1 } }).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    console.log(stuffs);
  }, [stuffs]);

  return (
    <Container id="landing-page" className="py-3 bg-white rounded">
      <ClickableImage
        width="100%"
        height="500px"
        href="/photo-interact"
        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
        alt="Boat on Calm Water"
        userName="JohnNarrow"
        userProfile="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      />
      <ImgGrid />
    </Container>
  );
};

export default Landing;
