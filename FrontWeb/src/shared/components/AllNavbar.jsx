import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const AllNavbar = () => {
  return (
    <Navbar bg="light" variant="light" sticky='top'>
      <Container>
        <Navbar.Brand href="#home">
        <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png"
              width="150"
              height=""
              className="d-inline-block align-top"
              alt="LOGO-UTEZ"
            />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:<i color='black' data-feather="circle"></i>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
