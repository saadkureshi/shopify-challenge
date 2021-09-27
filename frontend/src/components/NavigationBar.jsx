import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './NavigationBar.css';

function NavigationBar() {

  const userLoggedIn = localStorage.getItem("user_details");

  let userEmail = "";
  if (userLoggedIn){
    userEmail = (localStorage.getItem("user_details") && JSON.parse(localStorage.getItem("user_details"))?.email);
  }

  return (
    <div className="navigation-bar">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Image Repository</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
          {userLoggedIn ? 
            <Nav>
              <Nav.Link href="#">Welcome, {userEmail}</Nav.Link>
              <Nav.Link href="/" onClick={() => localStorage.clear()}>Logout</Nav.Link>
            </Nav>
            :
            <Nav>
            <Nav.Link href="#">Join today for free!</Nav.Link>
          </Nav>
          }
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar;
