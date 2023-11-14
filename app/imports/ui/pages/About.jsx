import React from 'react';
import { Container, Row, Col, Form, FormGroup, FormControl, Button, Image } from 'react-bootstrap';
import ContactButton from '../components/ContactButton';

const About = () => (
  <Container id="about" fluid className="py-3">
    <Row className="d-flex justify-content-center">
      <Image src="/images/about_picture.png" style={{ width: '70%', height: 'auto' }} />
    </Row>
    <Container style={{ backgroundColor: 'white', padding: '10px', width: '70%' }} className="rounded">
      <Row className="align-middle text-center pt-3">
        <h1>About</h1>
      </Row>
      <Row className="py-4 d-flex justify-content-center">
        <p style={{ maxWidth: '90%' }}>
          The Rainbow Gallery is a community networking service designed to help artists share their work with their peers.
          Our mission is to help connect University of Hawaii at Manoa (UH Manoa) undergraduate student artists who share
          the same passion for art. Here we provide a platform for students to upload photos of their original artwork to
          share with the UH community. Students are also able to interact with each other via liking and commenting on posts.
          We strive to keep Rainbow Gallery a positive environment and encourage students to help us in doing so.
        </p>
        <p style={{ maxWidth: '90%' }}>
          This service was created by UH Manoa ICS undergraduate students as a final project for ICS 314.
        </p>
      </Row>
      <Container style={{ backgroundColor: 'white', padding: '10px', width: '90%' }} className="rounded">
        <Row className="align-middle">
          <h1 className="text-center">
            How to Use the Rainbow Gallery App
          </h1>
          <h2>
            Log In or Sign up
          </h2>
          <p>
            If you have created an account with us before, simply log in using either your username or email and your password.
          </p>
          <h2>
            Home
          </h2>
          <p>
            Once you have logged in, you will be taken to a home page showing your current feed. Feed is populated based on the accounts that you follow. From the home page, you can view your profile, feed, or search new users to follow!
          </p>
          <h2>
            Viewing Photos
          </h2>
          <p>
            If you would like to view a photo from your feed in greater detail, simply click on the photo and you will be able to see it full size, along with comments added to the post.
            Additionally, you can click share to copy the photo link and send it to your friends!
          </p>
          <h2>
            Account Modifications
          </h2>
          <p>
            Although you are not able to change your username or email once created, you can add or remove photos
            from your profile from the &apos;profile&apos; tab.
            To delete a photo, click on it and then press the trash icon.
            To add a photo, click add post and you will be taken to a page to add your content!
          </p>
        </Row>
      </Container>
      <Row className="py-4 d-flex">
        <Col md={2} />
        <Col xs={4}>
          <h2>Contact us</h2>
          <p>
            We are always looking to improve the functionality of our service for a better user experience. Any feedback is encouraged and highly appreciated.
          </p>
        </Col>
        <Col xs={4}>
          <Form>
            <FormGroup className="py-1">
              <FormControl
                type="text"
                placeholder="Name"
              />
            </FormGroup>
            <FormGroup className="py-1">
              <FormControl
                type="text"
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup className="py-1">
              <FormControl
                type="text"
                placeholder="Comments"
              />
            </FormGroup>
            <ContactButton />
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  </Container>
);

export default About;
