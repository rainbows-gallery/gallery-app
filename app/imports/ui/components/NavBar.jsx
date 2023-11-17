import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="m-2">
        <Navbar.Brand as={NavLink} to="/">
          <img src="/images/Logo-navbar.svg" alt="rainbow gallery logo" width={146} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Side of NavBar, After Image. */}
          <Nav className="me-auto justify-content-start">
            <input type="text" placeholder="Search" className="p-2 border border-secondary searchText rounded-corners" />
          </Nav>
          {/* Right side of navbar */}
          <Nav className="justify-content-end d-flex">
            {/* If there is no user logged in, then show: */}
            {!currentUser ? ([
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/" key="home">Home</Nav.Link>,
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/about" key="about">About</Nav.Link>,
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/signin" key="signIn">Sign In</Nav.Link>,
              <Link to="/signup" key="signup">
                <Button variant="primary" className="rounded-corners">Sign Up</Button>
              </Link>,
            ]) : [
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/" key="feed">Feed</Nav.Link>,
              <Nav.Link id="add-stuff-nav" as={NavLink} to="/addPosts" key="add">Add Post</Nav.Link>,
              <Nav.Link id="profile-nav" as={NavLink} to={`/profile/${Meteor.user()._id}`} key="profile">Profile</Nav.Link>,
              <Link to="/" key="signOut">
                <Button variant="primary" onClick={() => Meteor.logout()} className="rounded-corners">Sign Out</Button>
              </Link>,
            ]}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
