import React from 'react'
import { Col, Container, Figure, Row } from 'react-bootstrap'
import Buttons from '../../shared/components/Buttons'

export const Candidate = () => {
    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Nombre del candidato</h2>
                <Row className='mt-4 pt-4'>
                    <Col className='col-lg-6 col-md-8 col-sm-7'>
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Correo
                            </Col>
                            <Col>
                                20213tn149@utez.edu.mx
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Teléfono
                            </Col>
                            <Col>
                                772 156 6806
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Tipo de candidato
                            </Col>
                            <Col>
                                Estudiante de la UTEZ
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Fecha
                            </Col>
                            <Col>
                                2023-08-01
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Grupo
                            </Col>
                            <Col>
                                D
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Carrera
                            </Col>
                            <Col>
                                DSM
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                División / Academia
                            </Col>
                            <Col>
                                DATIC
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-lg-6 col-md-4 col-sm-5'>
                        <Row className='justify-content-center'>
                            <div className='rounded-3 border border-4 border-secondary text-center bg-light' style={{ height: "203px", width: "300px", color: "black" }}>
                                Imagen de la certificación
                            </div>
                        </Row>

                        <br />
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Nombre de la certificación
                            </Col>
                            <Col className='mx-4'>
                                Microsoft Word Expert
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Clave de la certificación
                            </Col>
                            <Col className='mx-4'>
                                MO-101
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Estado
                            </Col>
                            <Col className='mx-4'>
                                PENDIENTE
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </Container>
            {/* <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Nombre del candidato</h2>
                <Row className='mt-4 pt-4'>
                    <Col className='col-lg-9 col-md-8 col-sm-7'>
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Correo
                            </Col>
                            <Col>
                                20213tn149@utez.edu.mx
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
                                Status
                            </Col>
                            <Col>
                                PENDIENTE
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Nombre de la certificación
                            </Col>
                            <Col>
                                Microsoft Word Expert
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Clave de la certificación
                            </Col>
                            <Col>
                                MO-101
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Tipo de candidato
                            </Col>
                            <Col>
                                Estudiante de la UTEZ
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Fecha
                            </Col>
                            <Col>
                                2023-08-01
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Grupo
                            </Col>
                            <Col>
                                D
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Carrera
                            </Col>
                            <Col>
                                DSM
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                División / Academia
                            </Col>
                            <Col>
                                DATIC
                            </Col>
                        </Row>
                    </Col>
                    <Col className='text-center'>
                        <Figure>
                            <Figure.Image
                                className='rounded-3 border border-1 border-secondary p-4'
                                width={171}
                                height={180}
                                alt="171x180"
                                src="https://cdn-icons-png.flaticon.com/512/6873/6873974.png"
                            />
                        </Figure>
                        <Row className='text-center'>
                            <h5>Username ?</h5>
                        </Row>
                    </Col>
                </Row>
                <br />
            </Container> */}
            <br />
            <Buttons />

            {/*
            candidateee: correo, telefono, status, name de la certificacion, clave del certificado, tipo de candidato, fecha, grupo, carrera, division / academia..
            fotografia certificacion
            botones: deshabilitar, editar, eliminar */}

        </>
    )
}

export default Candidate