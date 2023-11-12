import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Posts } from '../../api/Posts/Posts';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  description: String,
  image: { type: String, optional: true }, // Added for handling image URL
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddStuff = () => {
  const [imageFile, setImageFile] = useState(null);

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { description } = data;
    const owner = Meteor.user().username;

    if (imageFile) {
      // Handle the image file upload
      const upload = Posts.images.insert({
        file: imageFile,
        streams: 'dynamic',
        chunkSize: 'dynamic',
      }, false);

      upload.on('end', (error, fileObj) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          // Now insert the post data, including the imageId
          Posts.collection.insert(
            { description, imageId: fileObj._id, owner },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Success', 'Post added successfully with image', 'success');
                formRef.reset();
                setImageFile(null);
              }
            },
          );
        }
      });

      upload.start();
    } else {
      swal('Error', 'No image file selected', 'error');
    }
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="description" />
                <input type="file" onChange={handleImageChange} />
                <ErrorsField />
                <SubmitField value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStuff;
