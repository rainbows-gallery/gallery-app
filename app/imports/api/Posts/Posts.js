import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class PostsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StuffsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.images = new FilesCollection({
      collectionName: 'Images',
      allowClientCode: false, // Disallow remove files from Client
      storagePath: () => 'assets/app/uploads/Images',
      onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
          return true;
        }
        return 'Please upload an image, with size equal to or less than 10MB';

      },
      // Use GridFS for storage
      storageAdapters: {
        GridFS: {
          // Configuration options for GridFS
        },
      },
    });

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
