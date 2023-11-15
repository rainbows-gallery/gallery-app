import React, { useState } from 'react';
import { Card, Container, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { StarFill, ShareFill } from 'react-bootstrap-icons';
import { Meteor } from 'meteor/meteor';
import AddComment from '../components/AddComment';
import { Comments } from '../../api/comment/Comments';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/Posts/Posts';

const PhotoInteract = () => {

  const { ready, posts, comments } = useTracker(() => {

    const subscription = Meteor.subscribe(Posts.userPublicationName);
    const subscription2 = Meteor.subscribe(Comments.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Stuff documents
    const postsItems = Posts.collection.find({}).fetch();
    const commentItems = Comments.collection.find({}).fetch();
    return {
      ready: rdy,
      posts: postsItems,
      comments: commentItems,
    };
  }, []);
  let fRef = null;
  return (
    <Container id="photo-interact" className="py-3 bg-white rounded">
      <Card>
        <Card.Img
          className="mx-auto mt-3"
          variant="top"
          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
          alt="Boat on Calm Water"
          style={{ maxWidth: '80%' }}
        />
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Image
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt="User Contact"
              width="40"
              height="40"
              className="rounded-circle me-3"
            />
            <div>
              <Card.Title>@JohnNarrow</Card.Title>
              <Card.Text>Boat on calm water.</Card.Text>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <span><StarFill size={30} /></span>
            <span><ShareFill size={30} /></span>
          </div>
        </Card.Body>
        <ListGroup variant="flush">
          {comments.map((comment, index) => <Comment key={index} comment={comment} />)}
        </ListGroup>
        {/*<AddComment owner={post?.owner} userId={post?._id} />*/}
      </Card>
    </Container>
  );
};

export default PhotoInteract;
