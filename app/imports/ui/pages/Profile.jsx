import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Profiles from '../../api/Profiles/Profiles';
import { Posts } from '../../api/Posts/Posts';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ShowProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, posts } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Posts documents.
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Posts
    const postItems = Posts.collection.find({}).fetch();
    return {
      posts: postItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row>
        <Col className="text-center">
          <h2>Profile</h2>
        </Col>
      </Row>
      {/* Here get profile Image */}
      <Row>
        <h2>Profile Image Here</h2>
      </Row>
      <Row>
        <h2>Username Here</h2>
      </Row>
      <Row>
        <h2>Posts </h2>
      </Row>
      {/* Here you will make contacts actually posts */}
      {/* <Row xs={1} md={2} lg={3} className="g-4"> */}
      {/*  {posts.map((posts) => ( */}
      {/*    <Col key={post._id}><Post */}
      {/*      contact={contact} */}
      {/*      notes={notes.filter(note => (note.contactId === contact._id))} */}
      {/*    /> */}
      {/*    </Col> */}
      {/*  ))} */}
      {/* </Row> */}
    </Container>
  ) : <LoadingSpinner />);
};

export default ShowProfile;
