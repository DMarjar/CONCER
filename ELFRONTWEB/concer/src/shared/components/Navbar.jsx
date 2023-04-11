import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AiFillHome } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const NavbarAll = () => {
    return (
        <>
            <Navbar className='mx-0' style={{ display: 'flex', justifyContent: 'center' }}>
                <Container className="mx-0 my-0 px-0 center" style={{ width: "100%" }}>
                    <Navbar.Brand href="http://www.utez.edu.mx/" target={'_blank'} bg="dark">
                        <img
                            src="data:image/png;base64,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"
                            width="150"
                            height=""
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Nav className="justify-content-end mx-0" activeKey="/home">
                        <Nav.Item>
                            <NavLink to="/home"><AiFillHome size={"35"} color="#002e60" /></NavLink>
                        </Nav.Item>
                        &nbsp;&nbsp;
                        <Nav.Item>
                            <NavLink to="/profile"><FaUserCircle size={"35"} color="#002e60" /></NavLink>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarAll