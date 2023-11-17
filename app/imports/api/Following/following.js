import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class PostsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'followingCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.

    this.schema = new SimpleSchema({
      followingUser: String,
      followerUser: String,
      deletedDate: {
        type: Date,
        optional: true,
        defaultValue: null,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.everyOnePublicationName = `${this.name}.publication.everyOne`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {PostsCollection}
 */
export const Posts = new PostsCollection();
