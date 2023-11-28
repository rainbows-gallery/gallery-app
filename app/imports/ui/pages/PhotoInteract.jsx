import React from 'react';
import { Card, Container, Image, ListGroup } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import AddComment from '../components/AddComment';
import LoadingSpinner from '../components/LoadingSpinner';
import { Comments } from '../../api/comment/Comments';
import Comment from '../components/Comment';
import { Posts } from '../../api/Posts/Posts';
import TrashPostButton from '../components/TrashPostButton';

const PhotoInteract = () => {
  const { _id } = useParams();
  const { ready, post, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.everyOnePublicationName);
    const subscription2 = Meteor.subscribe(Comments.userPublicationName);
    const subscription3 = Meteor.subscribe('userList');

    const rdy = subscription.ready() && subscription2.ready() && Roles.subscription.ready() && subscription3.ready();

    const postItem = Posts.collection.findOne({ _id });
    const commentItems = Comments.collection.find({ postId: _id }).fetch();
    return {
      ready: rdy,
      post: postItem,
      comments: commentItems,
    };
  }, []);
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
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt="User Contact"
              width="40"
              height="40"
              className="rounded-circle me-3"
            />
            <div>
              <Card.Title><Link to={`/profile/${Meteor.users.findOne({ username: post.owner })._id}`}>{post.owner}</Link></Card.Title>
              <Card.Text>{post.description}</Card.Text>
            </div>
          </div>
          <div className="d-flex align-items-center">
            { Meteor.user() && <span><StarFill size={30} /></span> }
            { Meteor.user() && (Meteor.user().username === post.owner || Roles.userIsInRole(Meteor.user(), 'admin')) && <span><TrashPostButton postId={post._id} comments={comments} redirectTo="/" /></span>}
          </div>
        </Card.Body>
        <ListGroup variant="flush">
          {comments.map((comment, index) => <Comment id={index} key={index} comment={comment} post={post} />)}
        </ListGroup>
        { Meteor.user() && <AddComment owner={Meteor.user().username} postId={post._id} /> }
      </Card>
    </Container>
  ) : <LoadingSpinner />;
};

export default PhotoInteract;
