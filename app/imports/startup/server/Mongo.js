import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/Posts/Posts.js';
import { Follows } from '../../api/Following/following';

/* eslint-disable no-console */

// Initialize the database with a default data document.=
const addDataPosts = (data) => {
  Posts.collection.insert(data);
};

const addDataFollow = (data) => {
  Follows.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Posts.collection.find().count() === 0) {
  if (Meteor.settings.defaultPosts) {
    console.log('Creating default data.');
    Meteor.settings.defaultPosts.forEach(data => addDataPosts(data));
  }
}

if (Follows.collection.find().count() === 0) {
  if (Meteor.settings.defaultFollow) {
    console.log('Creating default data.');
    Meteor.settings.defaultFollow.forEach(data => addDataFollow(data));
  }
}
