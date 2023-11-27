//* ** Is currently just EditContact Page copy pasted

import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders the EditProfile page for editing a single document. */
const EditProfile = () => {

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

  const submit = (data) => {
    const { image } = data;
    Meteor.users.update(user, {
      $set: {
        profile: {
          image,
        },
      },
    }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Contact</h2></Col>
          <AutoForm onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField name="image" />
                  </Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
