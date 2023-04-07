import { Col, Row } from 'react-bootstrap'
import React from 'react'

import { NavbarAll } from '../../shared/components/Navbar';
import { AsideAdmin } from '../../shared/components/AsideAdmin';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../home/Home';
import Profile from '../profile/Profile';
import Candidate from '../candidate/Candidate';
import Certification from '../certification/Certification';
import Certifier from '../certifierPerson/Certifier';
import AllCompanies from '../company/AllCompanies';
import EditProfile from '../profile/EditProfile';
import Indicadores from '../indicadores/Indicadores';
import AllCandidates from '../candidate/AllCandidates';
import NewCandidate from '../candidate/NewCandidate';
import AllCertifiers from '../certifierPerson/AllCertifiers';
import NewCertifier from '../certifierPerson/NewCertifier';



export const IndexAdmin = () => {

    return (
        <>
            <div className="container-fluid"  >
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
                                <Route path="/" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/editProfile" element={<EditProfile/>}></Route>
                                <Route path="/indicators" element={<Indicadores/>}></Route> {/* <h1>INDICADORES </h1> */}
                                <Route path="/candidates" element={<AllCandidates/>}></Route>
                                <Route path="/candidate" element={<Candidate/>}></Route>
                                <Route path="/newCandidate" element={<NewCandidate/>}></Route>
                                <Route path="/certifiers" element={<AllCertifiers/>}></Route>
                                <Route path="/certifier" element={<Certifier/>}></Route>
                                <Route path="/newCertifier" element={<NewCertifier/>}></Route>
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
