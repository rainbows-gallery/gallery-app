import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ClickableImage from '../components/ClickableImage'

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <ClickableImage width={"500px"} src={"https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"} alt={"test"} userName={"JohnNarrow"} userProfile={"https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"} />
  </Container>
);

export default Landing;
