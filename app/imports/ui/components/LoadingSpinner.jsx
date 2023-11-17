import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Container>
    <Row className="justify-content-md-center" style={{color:'white'}}>
      <Spinner animation="border" style={{color:'white'}}/>
      Getting data
    </Row>
  </Container>
);

export default LoadingSpinner;
