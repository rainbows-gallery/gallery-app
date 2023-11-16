import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Posts } from '../../api/Posts/Posts';
import { AdvancedImage } from "@cloudinary/react";
import UploadField from '../components/uploadField';

// Create a schema to specify the structure of the data to appear in the form.

const formSchema = new SimpleSchema({
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddPosts = () => {
  const [image, setImage] = useState('')

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { description } = data;
    const owner = Meteor.user().username;
    Posts.collection.insert(
      { description, owner, image,  },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );

  };

  useEffect(() => {
    console.log(image)
  }, [image])

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
                <UploadField onUpload={(x) => setImage(x)} />
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
