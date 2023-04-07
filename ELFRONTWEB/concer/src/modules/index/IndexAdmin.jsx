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
import AllCertifications from '../certification/AllCertifications';
import NewCertification from '../certification/NewCertification';
import Company from '../company/Company';
import NewCompany from '../company/NewCompany';
import AllUtez from '../utez/AllUtez';



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
                        style={{ height: "86.5vh", position: "relative" }}
                    >
                        <AsideAdmin />
                    </Col>
                    <Col className="col-lg-10 col-md-9 col-sm-9 square border border-bottom-0 m-0"
                        style={{ height: "86.5vh", position: "relative", overflow: "auto" }}
                    >
                        <section className="container-fluid">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/editProfile" element={<EditProfile/>}/>
                                <Route path="/indicators" element={<Indicadores/>}/>
                                <Route path="/candidates" element={<AllCandidates/>}/>
                                <Route path="/candidate" element={<Candidate/>}/>
                                <Route path="/newCandidate" element={<NewCandidate/>}/>
                                <Route path="/certifiers" element={<AllCertifiers/>}/>
                                <Route path="/certifier" element={<Certifier/>}/>
                                <Route path="/newCertifier" element={<NewCertifier/>}/>
                                <Route path="/certifications" element={<AllCertifications/>}/>
                                <Route path="/certification" element={<Certification/>}/>
                                <Route path="/newCertification" element={<NewCertification/>}/>
                                <Route path="/companies" element={<AllCompanies/>}/>
                                <Route path="/company" element={<Company/>}/>
                                <Route path="/newCompany" element={<NewCompany/>}/>
                                <Route path="/utez" element={<AllUtez/>}/>
                            </Routes>
                        </section>
                    </Col>
                </Row>
            </div>
        </>
    )
}
