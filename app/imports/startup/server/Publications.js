import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useParams } from 'react-router';
import { Posts } from '../../api/Posts/Posts';
import { Comments } from '../../api/comment/Comments';
import { Follows } from '../../api/Following/following';
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Posts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Posts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find({});
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Posts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Posts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Comments.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Comments.collection.find();
  }
  return this.ready();
});

Meteor.publish(Posts.everyOnePublicationName, function () {
  return Posts.collection.find();
});

Meteor.publish('userList', function () {
  return Meteor.users.find({});
});

// Following Schema Publishers
Meteor.publish(Follows.userPublicationName, function () {
  if (this.userId) {
    return Follows.collection.find({ deletedDate: null });
  }
  return this.ready();
});

Meteor.publish(Follows.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Follows.collection.find();
  }
  return this.ready();
});

Meteor.publish(Follows.everyOnePublicationName, function () {
  return Follows.collection.find({ deletedDate: null });
});
