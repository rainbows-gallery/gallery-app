import React, { useState, useRef } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import Dropzone from 'react-dropzone';
import { Posts } from '../../api/Posts/Posts';
import UploadField from '../components/uploadField';

// Create a schema to specify the structure of the data to appear in the form.

const formSchema = new SimpleSchema({
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddPosts = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dropzoneKey, setDropzoneKey] = useState(0);

  const fileToDataURL = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleDrop = (acceptedFiles) => {
    const previewUrl = acceptedFiles[0] && URL.createObjectURL(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
    setImagePreview(previewUrl);
  };

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { description } = data;
    const owner = Meteor.user().username;

    fileToDataURL(file).then((data) => {
      Meteor.call('image.upload', data, (error, response) => {
        if (error) {
          // Handle the error
          console.error('Error uploading:', error);
        } else {
          const returnedResponse = JSON.parse(response);
          console.log(returnedResponse);
          Posts.collection.insert(
            { description, owner, likes: 0, uploadDate: new Date(), imageId: returnedResponse.url },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Success', 'Item added successfully', 'success');
                formRef.reset();
                setDropzoneKey(prevKey => prevKey + 1);
                setImagePreview(null);
                setFile(null);
              }
            },
          );
        }
      });
    });
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center text-white"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Dropzone key={dropzoneKey} onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps({ className: 'rounded', style: { border: '2px dashed' } })}>
                        <input {...getInputProps({ accept: 'image/*', name: 'FileImage' })} />
                        <p>You may drag and drop your image here or click and select it</p>
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                      </div>
                    </section>
                  )}
                </Dropzone>
                <TextField name="description" />
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

export default AddPosts;
