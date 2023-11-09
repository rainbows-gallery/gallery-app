import React from 'react';
import { Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <h1>Content and Design can go here</h1>
    </Row>
  </Container>
);

export default Landing;
