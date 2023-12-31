import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import Dropzone from 'react-dropzone';
import LoadingSpinner from '../components/LoadingSpinner';

const formSchema = new SimpleSchema({
  bio: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);
/* Renders the EditProfile page for editing a single document. */
const EditProfile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dropzoneKey, setDropzoneKey] = useState(0);

  const fileToDataURL = (fileVal) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(fileVal);
  });

  const handleDrop = (acceptedFiles) => {
    const previewUrl = acceptedFiles[0] && URL.createObjectURL(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
    setImagePreview(previewUrl);
  };

  const { user, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe('userList');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const userFetch = Meteor.user();
    return {
      user: userFetch,
      ready: rdy,
    };
  }, []);

  const submit = (data, formRef) => {
    const { bio } = data;

    fileToDataURL(file).then((dataVal) => {
      Meteor.call('image.upload', dataVal, (error, response) => {
        if (error) {
          // Handle the error
          console.error('Error uploading:', error);
        } else {
          const returnedResponse = JSON.parse(response);
          console.log(returnedResponse);
          Meteor.users.update(
            { _id: Meteor.user()._id },
            { $set: { profile: { bio, image: returnedResponse.url } } },
            (errorTwo) => {
              if (errorTwo) {
                swal('Error', errorTwo.message, 'error');
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
  return ready ? (
    <Container id="edit-profile-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Your Profile</h2></Col>
          <AutoForm schema={bridge} ref={ref => { fRef = ref; }} onSubmit={data => submit(data, fRef)} model={user}>
            <Card>
              <Card.Body>
                <p className="text-black">Upload a new profile photo by clicking or dragging a photo into the dotted box below:</p>
                <Dropzone key={dropzoneKey} onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        // This is needed for the dropzone component for drag drop a file
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...getRootProps({
                          className: 'rounded',
                          style: { border: '2px dashed' },
                        })}
                      >
                        <input
                          // This is needed for the dropzone component for drag drop a file
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {
                            ...getInputProps({ id: 'upload-input', accept: 'image/*', name: 'FileImage' })
                          }
                        />
                        <p>You may drag and drop your image here or click and select it</p>
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                      </div>
                    </section>
                  )}
                </Dropzone>
                <Row>
                  <LongTextField id="bio" className="pt-3" name="bio" />
                </Row>
                <Button id="edit-Submit" type="submit">Submit</Button>
                <ErrorsField />
                <Link to={`/profile/${Meteor.user()._id}`}> Back to Profile</Link>
                <p className="text-black">Note: you must upload both a photo and a bio at the same time to successfully update your profile</p>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
