import React from 'react'
import { Col, Container, Figure, Row } from 'react-bootstrap'


export const Profile = () => {

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Información básica</h2>
                <Row className='mt-4 pt-4'>
                    <Col className='col-lg-7 col-md-8 col-sm-7'>
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Nombre(s)
                            </Col>
                            <Col>
                                Ana Belen
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Apellido(s)
                            </Col>
                            <Col>
                                Velasquez Diaz
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Teléfono
                            </Col>
                            <Col>
                                772 156 6806
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Correo electrónico
                            </Col>
                            <Col>
                                20213tn149@utez.edu.mx
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Género
                            </Col>
                            <Col>
                                Femenino
                            </Col>
                        </Row>
                    </Col>
                    <Col className='text-center'>
                        <Row className='justify-content-center'>
                            <div className='rounded-3 border border-4 border-secondary text-center bg-light' style={{ height: "203px", width: "300px", color: "black" }}>
                                Imagen de la certificación
                            </div>
                        </Row>
                        <br />
                        <Row className='text-center'>
                            <h5>Username ?</h5>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* <Container className='px-5 mt-5'>
            <h4 className='text-center'>Información básica</h4>
            <Row >
                <Col className='col-lg-2 col-md-4 col-sm-4'>
                    Nombre(s)
                </Col>
                <Col>
                    Ana Belen
                </Col>
            </Row>
            <hr />
            <Row >
                <Col className='col-lg-2 col-md-4 col-sm-4'>
                    Apellido(s)
                </Col>
                <Col>
                    Velasquez Diaz
                </Col>
            </Row>
            <hr />
            <Row >
                <Col className='col-lg-2 col-md-4 col-sm-4'>
                    Teléfono
                </Col>
                <Col>
                    772 156 6806
                </Col>
            </Row>
            <hr />
            <Row >
                <Col className='col-lg-2 col-md-4 col-sm-4'>
                    Correo electrónico
                </Col>
                <Col>
                    20213tn149@utez.edu.mx
                </Col>
            </Row>
            <hr />
            <Row >
                <Col className='col-lg-2 col-md-4 col-sm-4'>
                    Género
                </Col>
                <Col>
                    Femenino
                </Col>
            </Row>
            </Container> */}

        </>
    )
}

export default Profile
