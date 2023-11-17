import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Posts } from '../../api/Posts/Posts';
import { Comments } from '../../api/comment/Comments';

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

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('userList', function (){
  return Meteor.users.find({});
});