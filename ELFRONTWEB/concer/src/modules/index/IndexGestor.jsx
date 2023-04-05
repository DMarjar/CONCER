import { Row, Col, Container } from 'react-bootstrap'
import React from 'react'
import NavbarAll from '../../shared/components/Navbar'
import AsideGestor from '../../shared/components/AsideGestor'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Home from '../home/Home';
import Profile from '../profile/Profile';


export const IndexGestor = () => {

    return (
        <>
            <div className="container-fluid" >
                <Row className="m-0">
                    <NavbarAll />
                </Row>

<<<<<<< HEAD
            <Row className="h-100 square border border-2 border-light " style={{ height: "100vh" }}>
                <Col
                    className="col-lg-2 col-md-3 col-sm-3 square border border-bottom-0 m-0"
                    style={{ height: "600px", position: "relative" }}
                >
                    <AsideGestor />
                </Col>
                <Col className="col-lg-10 col-md-9 col-sm-9 square border border-bottom-0 m-0">
                    
                    contenido gestor
                </Col>
=======
                <Row className="h-100 square border border-2 border-light " style={{ height: "100vh" }}>
                    <Col
                        className="col-lg-2 col-md-3 col-sm-3 square border border-bottom-0 m-0"
                        style={{ height: "600px", position: "relative" }}
                    >
                        <AsideGestor />
                    </Col>
                    <Col className="col-lg-10 col-md-9 col-sm-9 square border border-bottom-0 m-0">
                        <section className="container-fluid">
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="about" element={<h1>About</h1>} />
                                <Route path="contact" element={<h1>Contact</h1>} />
                            </Routes>
                        </section>
                    </Col>

                </Row>
            </div>
>>>>>>> c77129f3359e420086bc2d963e1c347d4ca06124

        </>
    )
}
