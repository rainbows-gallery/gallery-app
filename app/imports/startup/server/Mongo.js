import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/Posts/Posts.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.=
const addDataContacts = (data) => {
    Posts.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Posts.collection.find().count() === 0) {
    if (Meteor.settings.defaultPosts) {
        console.log('Creating default data.');
        Meteor.settings.defaultPosts.forEach(data => addDataContacts(data));
    }
}