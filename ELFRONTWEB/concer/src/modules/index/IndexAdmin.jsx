import { Col, Row } from 'react-bootstrap'
import React from 'react'

import { NavbarAll } from '../../shared/components/Navbar';
import { AsideAdmin } from '../../shared/components/AsideAdmin';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../home/Home';
import Profile from '../profile/Profile';
import AllCandidates from '../candidate/AllCandidates';
import Candidate from '../candidate/Candidate';
import Certification from '../certification/Certification';
import Certifier from '../certifier/Certifier';
import Company from '../company/Company';
import AllCompanies from '../company/AllCompanies';



export const IndexAdmin = () => {

    return (
        <>
            <div className="container-fluid" >
                <Row className="m-0">
                    <NavbarAll />
                </Row>

                <Row className="h-100 square border border-2 border-light " style={{ height: "100vh" }}>
                    <Col
                        className="col-lg-2 col-md-3 col-sm-3 square border border-bottom-0 m-0"
                        style={{ height: "600px", position: "relative" }}
                    >
                        <AsideAdmin />
                    </Col>
                    <Col className="col-lg-10 col-md-9 col-sm-9 square border border-bottom-0 m-0">
                        <section className="container-fluid">
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/indicators" element={<Company/>}></Route> {/* <h1>INDICADORES </h1> */}
                                <Route path="/candidates" element={<Candidate/>}></Route> {/*<h1>Candidates, dataTable</h1>*/}
                                <Route path="/staff" element={<Certifier/>}></Route> {/* <h1>Personal certificador, misma tabla de candidates</h1> */}
                                <Route path="/certifications" element={<Certification/>}></Route> {/* <h1>Certificaciones, misma tabla de candidates</h1> */}
                                <Route path="/companies" element={<AllCompanies/>}></Route> {/* <h1>Companies, misma tabla de candidates</h1> */}
                                <Route path="/utez" element={<h1>UTEZ</h1>}></Route>
                            </Routes>
                        </section>
                    </Col>
                </Row>
            </div>

        </>
    )
}
