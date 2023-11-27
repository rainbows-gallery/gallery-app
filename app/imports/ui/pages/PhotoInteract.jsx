import React from 'react';
import { Card, Container, Image, ListGroup } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import AddComment from '../components/AddComment';
import LoadingSpinner from '../components/LoadingSpinner';
import { Comments } from '../../api/comment/Comments';
import Comment from '../components/Comment';
import { Posts } from '../../api/Posts/Posts';

const PhotoInteract = () => {
  const { _id } = useParams();

  const { ready, post, comments, users } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.everyOnePublicationName); // Update with your actual publication name
    const subscription2 = Meteor.subscribe(Comments.userPublicationName); // Update with your actual publication name
    const userSubscriber = Meteor.subscribe('userList');

    const rdy = subscription.ready() && subscription2.ready() && userSubscriber.ready();
    const postItem = Posts.collection.findOne({ _id });
    const commentItems = Comments.collection.find({ postId: _id }).fetch();
    const usersDef = (Meteor.users.find({ username: postItem ? postItem.owner : '' }).fetch() ?? 'undefined');

    return {
      ready: rdy,
      post: postItem,
      comments: commentItems,
      users: usersDef,
    };
  }, []);
  const currentUser = users.find(x => x.username === post.owner);
  return ready ? (
    <Container id="photo-interact" className="py-3 bg-white rounded">
      <Card>
        <Image
          className="mx-auto mt-3"
          variant="top"
          src={post.imageId}
          style={{ maxWidth: '80%' }}
        />
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Image
              src={currentUser.profile.image}
              alt={post.owner}
              width="40"
              height="40"
              className="rounded-circle me-3"
            />
            <div>
              <Card.Title>{post.owner}</Card.Title>
              <Card.Text style={{ color: 'black' }}>{post.description}</Card.Text>
            </div>
          </div>
          <div className="d-flex align-items-center">
            { Meteor.user() && <span><StarFill size={30} /></span> }
          </div>
        </Card.Body>
        <ListGroup variant="flush">
          {comments.map((comment, index) => <Comment key={index} comment={comment} post={post} />)}
        </ListGroup>
        { Meteor.user() && <AddComment owner={Meteor.user().username} postId={post._id} /> }
      </Card>
    </Container>
  ) : <LoadingSpinner />;
};

export default PhotoInteract;
