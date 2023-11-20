import React from 'react';
import { Container, Row, Image } from 'react-bootstrap';

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
        <p style={{ maxWidth: '90%' }} className="text-black">
          The Rainbow Gallery is a community networking service designed to help artists share their work with their peers.
          Our mission is to help connect University of Hawaii at Manoa (UH Manoa) undergraduate student artists who share
          the same passion for art. Here we provide a platform for students to upload photos of their original artwork to
          share with the UH community. Students are also able to interact with each other via liking and commenting on posts.
          We strive to keep Rainbow Gallery a positive environment and encourage students to help us in doing so.
        </p>
        <p style={{ maxWidth: '90%' }} className="text-black">
          This service was created by UH Manoa ICS undergraduate students as a final project for ICS 314.
        </p>
      </Row>
      <Container style={{ backgroundColor: 'white', padding: '10px', width: '90%' }} className="rounded">
        <Row className="align-middle">
          <h1 className="text-center">
            How to Use the Rainbow Gallery App
          </h1>
          <h2>
            Log In or Sign Up
          </h2>
          <p className="text-black">
            If you have created an account with us before, simply log in using either your username or email and your password.
          </p>
          <h2>
            Home
          </h2>
          <p className="text-black">
            Once you have logged in, you will be taken to a home page showing your current feed. Feed is populated based on the accounts that you follow. From the home page, you can view your profile, feed, or search new users to follow!
          </p>
          <h2>
            Viewing Photos
          </h2>
          <p className="text-black">
            If you would like to view a photo from your feed in greater detail, simply click on the photo and you will be able to see it full size, along with comments added to the post.
            Additionally, you can click share to copy the photo link and send it to your friends!
          </p>
          <h2>
            Account Modifications
          </h2>
          <p className="text-black">
            Although you are not able to change your username or email once created, you can add or remove photos
            from your profile from the &apos;profile&apos; tab.
            To delete a photo, click on it and then press the trash icon.
            To add a photo, click add post and you will be taken to a page to add your content!
          </p>
          <h2 className="pt-1">
            How to Run Rainbow Gallery Locally
          </h2>
          <p className="text-black">
            To run Rainbow Gallery locally, clone our repository onto your device.
            If you do not have node installed and accessible on your device, you will need to do that first, then come back here. &apos;cd&apos; into the app folder of gallery-app. The run meteor npm install, followed by meteor npm run start!
          </p>
        </Row>
      </Container>
    </Container>
  </Container>
);

export default About;
