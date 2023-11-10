import React from 'react';
import { Container } from 'react-bootstrap';
import ImgGrid from '../components/ImgGrid';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <ImgGrid />
  </Container>
);

export default Landing;
