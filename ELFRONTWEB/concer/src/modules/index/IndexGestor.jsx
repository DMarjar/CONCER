import { Row, Col, Container } from 'react-bootstrap'
import React from 'react'
import NavbarAll from '../../shared/components/Navbar'
import AsideGestor from '../../shared/components/AsideGestor'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';
import Indicadores from '../indicadores/Indicadores';

import Home from '../home/Home';
import AllCandidates from '../candidate/AllCandidates';
import Candidate from '../candidate/Candidate';
import NewCandidate from '../candidate/NewCandidate';
import EditCandidate from '../candidate/EditCandidate';
import EditEstado from '../candidate/EditEstado';
import EditPerson from '../utez/person/EditPerson';
import NewPerson from '../utez/person/NewPerson';


export const IndexGestor = () => {

    return (
        <>
            <div className="container-fluid" >
                <Row className="m-0">
                    <NavbarAll />
                </Row>


                <Row className="h-100 square border border-2 border-light " style={{ height: "100vh" }}>
                    <Col
                        className="col-lg-2 col-md-3 col-sm-3 square border border-bottom-0 m-0"
                        style={{ height: "86.5vh", position: "relative" }}
                    >
                        <AsideGestor />
                    </Col>
                    <Col className="col-lg-10 col-md-9 col-sm-9 square border border-bottom-0 m-0"
                        style={{ height: "86.5vh", position: "relative", overflow: "auto" }}
                    >
                        <section className="container-fluid">
                            <Routes>
                                <Route path="/" element={<Home />} />


                                <Route path="/profile" element={<Profile/>} />

                                <Route path="/editProfile" element={<EditProfile/>} />

                                <Route path="/indicators" element={<Indicadores/>} />

                                <Route path="/candidates" element={<AllCandidates/>}/>
                                <Route path="/candidate/:candidatura" element={<Candidate/>}/>
                                <Route path="/newCandidate" element={<NewCandidate/>}/>
                                <Route path="/editCandidate/:candidatura" element={<EditCandidate/>}/>
                                <Route path="/editEstado/:candidatura" element={<EditEstado/>}/>

                                
                                <Route path="/editAccount/:account" element={<EditPerson/>}/>
                                <Route path="/newAccount" element={<NewPerson/>}/>




                            </Routes>
                        </section>
                    </Col>

                </Row>
            </div>


        </>
    )
}
