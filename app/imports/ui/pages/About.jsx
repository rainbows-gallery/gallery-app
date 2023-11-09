import React from 'react';
import { Container, Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import { ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';

const About = () => (
  <Container id="about" fluid className="py-3">
    <Row className="align-middle text-center">
        <h1>About</h1>
    </Row>
    <Row className="py-4 d-flex justify-content-center">
      <p style={{maxWidth: '60%'}}>
        The Rainbow Gallery is a community networking service designed to help artists share their work with their peers. Our mission is to help connect University of Hawaii at Manoa (UH Manoa) undergraduate student artists who share the same passion for art. Here we provide a platform for students to upload photos of their original artwork to share with the UH community. Students are also able to interact with each other via liking and commenting on posts. We strive to keep Rainbow Gallery a positive environment and encourage students to help us in doing so.
      </p>
      <p style={{maxWidth: '60%'}}>
        This service was created by UH Manoa ICS undergraduate students as a final project for ICS 314.
      </p>
    </Row>
    <Row className="py-4 d-flex">
      <Col className="p-0" md={2}></Col>
      <Col xs={4}>
        <h2 >Contact us</h2>
        <p>
          We are always looking to improve the functionality of our service for a better user experience. Any feedback is encouraged and highly appreciated.
       </p>
      </Col>
      <Col xs={4}>
        <Form>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Name"
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Comments"
            />
          </FormGroup>
          <Button variant="secondary" type="submit">Submit</Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  </Container>
)

export default About;