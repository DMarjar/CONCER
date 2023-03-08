import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'
import { AuthContext } from '../../modules/auth/authContext';
import { LoginScreen } from '../../modules/auth/LoginScreen';
import { AllNavbar } from './AllNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import { CandidateSide } from './CandidateSide';
import { Main } from './Main';

export const AppRouter = () => {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={
                    user.isLogged ? (
                        <>
                            <AllNavbar />
                            <Container style={{ marginTop: '20px', backgroundColor: "#00a780" }}>

                            </Container>
                        </>
                    ) : (
                        <>
                            <AllNavbar />

                            <Container style={{ marginTop: '20px', color: "red", border: "#595959" }}>
                                <Row className=' h-100'>
                                    <Col className='col-lg-3 d-flex justify-content-center align-items-center' style={{ backgroundColor: "#eeeeee", heigh: "100%s" }}>
                                        <CandidateSide />
                                    </Col>
                                    <Col className='col-lg-9 justify-content-center'>
                                        <Main />
                                    </Col>
                                </Row>
                            </Container>

                        </>
                    )
                } />
                <Route
                    path="/*"
                    element={
                        <LoginScreen />
                    }
                /* element={
                    user.isLogged ? (
                        <>
                            <AllNavbar />
                            <Container style={{ marginTop: '20px', backgroundColor: "#00a780" }}>

                            </Container>
                        </>
                    ) : (
                        <>
                            <AllNavbar />
                            {// className='mx-0 my-0 px-0 w-100' }
                            <Container style={{ marginTop: '20px', backgroundColor: "#00a780", color: "red" }}>
                                <Row className=' h-100'>
                                    <Col className='col-lg-3 d-flex justify-content-center align-items-center' style={{ backgroundColor: "#eeeeee", heigh: "100%s" }}>
                                        <CandidateSide/>
                                    </Col>
                                    <Col className='col-lg-9 bg-secondary justify-content-center'>
                                        <Main/>
                                    </Col>
                                </Row>
                            </Container>

                        </>
                    )
                } */
                />
                <Route path='*' element={<>404</>} />
            </Routes>
        </Router>
    );
};
