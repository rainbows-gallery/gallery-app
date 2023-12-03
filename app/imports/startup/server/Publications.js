import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Posts } from '../../api/Posts/Posts';
import { Comments } from '../../api/comment/Comments';
import { Follows } from '../../api/Following/following';
import { Stars } from '../../api/stars/Stars';

// Post Publishers
Meteor.publish(Posts.userPublicationName, function () {
  if (this.userId) {
    return Posts.collection.find({ deletedDate: null });
  }
  return this.ready();
});

Meteor.publish(Posts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Posts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Posts.everyOnePublicationName, function () {
  return Posts.collection.find({ deletedDate: null });
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

// Comment Publishers
Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Comments.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Comments.collection.find();
  }
  return this.ready();
});

Meteor.publish('userList', function () {
  return Meteor.users.find({});
});

// Star Pubhlishers

Meteor.publish(Stars.userPublicationName, function () {
  if (this.userId) {
    return Stars.collection.find({ user: Meteor.users.find({ _id: this.userId }).fetch()[0].username });
  }
  return this.ready();
});

Meteor.publish(Stars.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stars.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Publishes roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
