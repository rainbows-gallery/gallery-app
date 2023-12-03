import React from 'react';
import { Card, Container, Image, ListGroup, Button } from 'react-bootstrap';
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
import { Stars } from '../../api/stars/Stars';
import TrashPostButton from '../components/TrashPostButton';

const PhotoInteract = () => {
  const { _id } = useParams();

  const { ready, post, comments, users, stared } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.everyOnePublicationName); // Update with your actual publication name
    const subscription2 = Meteor.subscribe(Comments.userPublicationName); // Update with your actual publication name
    const userSubscriber = Meteor.subscribe('userList');
    const starSubscription = Meteor.subscribe(Stars.userPublicationName);

    const rdy = subscription.ready() && subscription2.ready() && userSubscriber.ready() && starSubscription.ready();
    const postItem = Posts.collection.findOne({ _id });
    const commentItems = Comments.collection.find({ postId: _id }).fetch();
    const usersDef = (Meteor.users.find({ username: postItem ? postItem.owner : '' }).fetch() ?? 'undefined');
    const stars = Stars.collection.find({ post: _id }).fetch();
    console.log(postItem);
    return {
      ready: rdy,
      post: postItem,
      comments: commentItems,
      users: usersDef,
      stared: stars.length > 0,
    };
  }, []);

  const starClick = () => {
    if (stared) {
      Stars.collection.find({ post: _id }).forEach((star) => {
        Stars.collection.remove(star._id);
      });
      Posts.collection.update({ _id }, { $inc: { likes: -1 } });
    } else {
      Stars.collection.insert({ post: _id, user: Meteor.user().username });
      Posts.collection.update({ _id }, { $inc: { likes: 1 } });
    }
  };

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
          <div className="d-flex align-items-center ms-3">
            <Image
              src={currentUser.profile.image}
              alt={post.owner}
              width="60"
              height="60"
              className="rounded-circle"
            />
            <div>
              <Card.Title><Link style={{ color: 'black', textDecoration: 'none' }} to={`/profile/${Meteor.users.findOne({ username: post.owner })._id}`}>{post.owner}</Link></Card.Title>
              <Card.Text style={{ color: 'black' }}>{post.description}</Card.Text>
            </div>
          </div>
          <div className="d-flex align-items-center me-3">
            <div>
              { stared
                ? Meteor.user() && (
                  <Button id="stared" className="bg-warning border-warning" type="button" aria-label="Fill star" onClick={starClick}>
                    <StarFill color="white" size={30} />
                  </Button>
                )
                : Meteor.user() && (
                  <Button id="unStared" className="bg-white border-black" type="button" aria-label="Unfill star" onClick={starClick}>
                    <StarFill color="black" size={30} />
                  </Button>
                ) }
              <b><span className="ms-2" id="likeCount">{post.likes}</span> Stars</b>
            </div>
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
