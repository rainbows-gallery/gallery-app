import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Posts } from '../../api/Posts/Posts';
import { Comments } from '../../api/comment/Comments';
import { Follow } from '../../api/Following/following'

// Post Publishers
Meteor.publish(Posts.userPublicationName, function () {
  if (this.userId) {
    return Posts.collection.find({deletedDate: null});
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
  return Posts.collection.find({deletedDate: null});
});


// Following Schema Publishers
Meteor.publish(Follow.userPublicationName, function () {
  if (this.userId) {
    return Follow.collection.find({deletedDate: null});
  }
  return this.ready();
});

Meteor.publish(Follow.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Follow.collection.find();
  }
  return this.ready();
});

Meteor.publish(Follow.everyOnePublicationName, function () {
  return Follow.collection.find({deletedDate: null});
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


// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('userList', function () {
  return Meteor.users.find({});
});
