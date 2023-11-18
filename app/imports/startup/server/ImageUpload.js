import { Meteor } from 'meteor/meteor';
import cloudinary from 'cloudinary';

// Configure Cloudinary (use environment variables or settings file)
cloudinary.config({
  cloud_name: Meteor.settings.CLOUDINARY_CLOUD_NAME,
  api_key: Meteor.settings.CLOUDINARY_API_KEY,
  api_secret: Meteor.settings.CLOUDINARY_API_SECRET,
});

Meteor.methods({
  'image.upload'(file) {
    // Ensure the user is logged in if required
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Upload to Cloudinary
    return cloudinary.uploader.upload(file, {
      resource_type: 'image',
    }).then((result) =>
      // Handle successful upload
      JSON.stringify(result, null, 2)).catch((error) => {
      // Handle errors
      throw new Meteor.Error('upload-failed', error.message);
    });
  },
});
