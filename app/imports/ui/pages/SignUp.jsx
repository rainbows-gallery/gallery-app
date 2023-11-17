import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    username: String,
    email: String,
    password: String,
    //    image: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { username, email, password } = doc;
    const image = 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp';
    const user = { username, email, password, image: image };
    Accounts.createUser(user, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to about page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/about' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-5">
      <Row className="justify-content-center">
        <Col xs={7}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="border-0 rounded px-4">
              <Card.Body>
                <Card.Title><h2>Sign Up</h2></Card.Title>
                <hr />
                <TextField name="username" placeholder="Username" labelClassName="pt-3 pb-1 h5" inputClassName="rounded-pill border-dark" />
                <TextField name="email" placeholder="Email address" labelClassName="pb-1 h5" inputClassName="rounded-pill border-dark" />
                <TextField name="password" placeholder="Password" type="password" labelClassName="pb-1 h5" inputClassName="rounded-pill border-dark" />
                <ErrorsField />
                <Row className="align-items-center py-3">
                  <Col>
                    <SubmitField value="Submit" inputClassName="rounded-pill btn btn-primary px-3 py-2" />
                  </Col>
                  <Col className="text-end login-signup-link">
                    <Link to="/signin">Already have an account?</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
