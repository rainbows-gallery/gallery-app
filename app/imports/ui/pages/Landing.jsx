import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ClickableImage from '../components/ClickableImage';
import ImgGrid from '../components/ImgGrid';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" className="py-3 bg-white rounded">
    <ClickableImage
      width="100%"
      height="500px"
      href={"/"}
      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
      alt="Boat on Calm Water"
      userName="JohnNarrow"
      userProfile="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    />
    <ImgGrid />
  </Container>
);

export default Landing;
