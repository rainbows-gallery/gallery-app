import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class PostsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PostsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.

    this.schema = new SimpleSchema({
      description: String,
      owner: String,
      likes: Number,
      uploadDate: Date,
      imageId: String,
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
 * @type {StuffsCollection}
 */
export const Posts = new PostsCollection();
