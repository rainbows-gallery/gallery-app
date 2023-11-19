import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ClickableImage from './ClickableImage';
import { Gallery } from "react-grid-gallery";

const ImgGrid = () => (
  <Row>
    <Col className="lg-4 md-12 mb-4 mb-lg-0">
      <ClickableImage
        width="100%"
        href="/"
        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
        alt="Boat on Calm Water"
        userName="JohnNarrow"
        userProfile="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      />
      <ClickableImage
        width="100%"
        href="/"
        src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
        alt="Wintry Mountain Landscape"
        userName="JohnNarrow"
        userProfile="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      />
    </Col>

    <Col className="lg-4 mb-4 mb-lg-0">
      <ClickableImage
        width="100%"
        href="/"
        src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
        alt="Mountains in the Clouds"
        userName="JohnNarrow"
        userProfile="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      />
      <ClickableImage
        width="100%"
        href="/"
        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
        alt="Boat on Calm Water"
        userName="JohnNarrow"
        userProfile="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      />
    </Col>

    <Col className="lg-4 mb-4 mb-lg-0">
      <ClickableImage
        width="100%"
        href="/"
        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
        alt="Waves at Sea"
        userName="JohnNarrow"
        userProfile="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      />
      <ClickableImage
        width="100%"
        href="/"
        src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
        alt="Yosemite National Park"
        userName="JohnNarrow"
        userProfile="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      />
    </Col>
  </Row>
);

export default ImgGrid;
