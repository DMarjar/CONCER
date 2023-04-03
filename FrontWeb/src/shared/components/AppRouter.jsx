import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'
import { AuthContext } from '../../modules/auth/authContext';
import { LoginScreen } from '../../modules/auth/LoginScreen';
import { AllNavbar } from '../components/navbar/AllNavbar';
import { Col, Row } from 'react-bootstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import SidebarCandidate from '../components/sidebar/SidebarCandidate';
import MainCandidate from '../components/main/MainCandidate';
import SidebarCertifier from './sidebar/SidebarCertifier';
import MainCertifier from './main/MainCertifier';
import SidebarAdministrator from './sidebar/SidebarAdministrator';
import MainAdministrator from './main/MainAdministrator';
import AllCandidates from './main/certifier/AllCandidates';
import Candidate from './main/certifier/Candidate';


export const AppRouter = () => {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={
                    user.isLogged ? (
                        <>
                            esta logeado
                        </>
                    ) : (
                        <>
                            <AllNavbar />
                            
                            <Row style={{height: "630px"}} className="h-300 m-0">
                                <Col className='col-lg-2 col-md-3 col-sm-3 square border border-2 h-100 m-0' style={{height: "300px", position: "relative"}}>
                                    <SidebarCandidate />
                                </Col>
                                <Col className='col-lg-10 col-md-9 col-sm-9 square border border-2 m-0'>
                                    <MainCandidate /> 
                                 </Col>
                            </Row> 
                            {/* LOGEADO COMO CANDIDATO */}
                            {/*}
                            <Row style={{height: "630px"}} className="h-300 m-0">
                                <Col className='col-lg-2 col-md-3 col-sm-3 square border border-2 h-100 m-0' style={{height: "300px", position: "relative"}}>
                                    <SidebarCandidate />
                                </Col>
                                <Col className='col-lg-10 col-md-9 col-sm-9 square border border-2 m-0'>
                                    <MainCandidate />
                                 </Col>
                            </Row> 
                            */}
                            {/* LOGEADO COMO CERTIFICADOR */}
                           {/* <Row style={{height: "630px"}} className="h-300 m-0">
                                <Col className='col-lg-2 col-md-3 col-sm-3 square border border-2 h-100 m-0' style={{height: "300px", position: "relative"}}>
                                    <SidebarCertifier />
                                </Col>
                                <Col className='col-lg-10 col-md-9 col-sm-9 square border border-2 m-0'>
                                    <MainCertifier/>
                                 </Col>
                            </Row> */}

                            {/* LOGEADO COMO ADMINISTRADOR */}
                            {/* <Row style={{height: "630px"}} className="h-300 m-0">
                                <Col className='col-lg-2 col-md-3 col-sm-3 square border border-2 h-100 m-0' style={{height: "300px", position: "relative"}}>
                                    <SidebarAdministrator />
                                </Col>
                                <Col className='col-lg-10 col-md-9 col-sm-9 square border border-2 m-0'>
                                    <MainAdministrator />
                                 </Col>
                            </Row> 
                            {/*

                            <Row style={{height: "630px"}} className="h-300 m-0">
                                <Col className='col-lg-2 col-md-3 col-sm-3 square border border-2 h-100 m-0' style={{height: "300px", position: "relative"}}>
                                    <SidebarCertifier />
                                </Col>
                                <Col className='col-lg-10 col-md-9 col-sm-9 square border border-2 m-0'>
                                    <Candidate />
                                 </Col>
                            </Row>
                          */}
                            
                        </>
                    )
                } />
                <Route
                    path="/*"
                    element={
                        <LoginScreen />
                    }
                />
                <Route path='*' element={<>404</>} />
            </Routes>
        </Router>
    );
}
