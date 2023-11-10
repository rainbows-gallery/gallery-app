import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id="signin-page" className="py-5">
      <Row className="justify-content-center">
        <Col xs={7}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="border-0 rounded px-4">
              <Card.Body>
                <Card.Title><h2>Login</h2></Card.Title>
                <hr />
                {/* NOTE FOR LATER: Figure out a way for login to accept either username or email to enter an account, for now, name is left as 'email' */}
                <TextField id="signin-form-email" name="email" placeholder="Username/Email address" labelClassName="pt-3 pb-1 h5" inputClassName="rounded-pill border-dark" label="Username or Email Address" />
                <TextField id="signin-form-password" name="password" placeholder="Password" type="password" labelClassName="pb-1 h5" inputClassName="rounded-pill border-dark" />
                <ErrorsField />
                <Row className="align-items-center py-3">
                  <Col>
                    <SubmitField id="signin-form-submit" value="Submit" inputClassName="rounded-pill btn btn-primary px-3 py-2" />
                  </Col>
                  <Col className="text-end login-signup-link">
                    <Link to="/signup">Don&apos;t have an account?</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
