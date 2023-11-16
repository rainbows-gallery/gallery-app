import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import SearchBar from './SearchBar';

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
          <Nav className="me-auto justify-content-start">
            <SearchBar id="search-bar-nav" />
            {currentUser ? ([
              <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Stuff</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">List Stuff</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end d-flex">
            {!currentUser ? ([
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/" key="about">Home</Nav.Link>,
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/about" key="about">About</Nav.Link>,
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/signin" key="signIn">Sign In</Nav.Link>,
              <Link to="/signup"><Button variant="primary" className="rounded-corners">Sign Up</Button></Link>,
            ]) : [
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/" key="about">Feed</Nav.Link>,
              <Link to="/"><Button variant="primary" onClick={() => Meteor.logout()} className="rounded-corners">Sign Out</Button></Link>,
            ]}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
