import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

const ImgGrid = () => (
  <Row>
    <Col className="lg-4 md-12 mb-4 mb-lg-0">
      <Image
        className="w-100 shadow-1-strong rounded mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
        alt="Boat on Calm Water"
      />

      <Image
        className="w-100 shadow-1-strong rounded mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
        alt="Wintry Mountain Landscape"
      />
    </Col>

    <Col className="lg-4 mb-4 mb-lg-0">
      <Image
        className="w-100 shadow-1-strong rounded mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
        alt="Mountains in the Clouds"
      />

      <Image
        className="w-100 shadow-1-strong rounded mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
        alt="Boat on Calm Water"
      />
    </Col>

    <Col className="lg-4 mb-4 mb-lg-0">
      <Image
        className="w-100 shadow-1-strong rounded mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
        alt="Waves at Sea"
      />

      <Image
        className="w-100 shadow-1-strong rounded mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
        alt="Yosemite National Park"
      />
    </Col>
  </Row>
);

export default ImgGrid;
