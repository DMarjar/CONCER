import React from 'react'
import { Col, Container, Figure, Row } from 'react-bootstrap'
import Buttons from '../../shared/components/Buttons'

export const Certification = () => {
    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Certificación</h2>
                <Row className='pt-2'>
                    <div className='w-10 rounded-3 border border-4 border-secondary text-center' style={{ height: "300px", color: "black" }}>
                        Imagen de la certificación
                    </div>
                    {/* nombre, version, nombre del personal a cargo.... imagen de la empresa, nombre de la empresa | botones */}
                </Row>
                <br />
                <Row className='pt-2'>
                    <Col className='col-lg-6 col-md-8 col-sm-7'>
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4'>
                                Nombre de la certificación
                            </Col>
                            <Col>
                                Microsoft Word Expert
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4'>
                                Versión
                            </Col>
                            <Col>
                                v1.1
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4'>
                                Nombre del personal a cargo
                            </Col>
                            <Col>
                                Ing. Jazmin
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-lg-6 col-md-4 col-sm-5'>
                        <div className='w-10 rounded-3 border border-4 border-secondary text-center bg-light' style={{ height: "150px", color: "black" }}>
                            Imagen de la certificación
                        </div>
                        <br />
                        <Row >
                            <Col className='col-lg-7 col-md-4 col-sm-4 text-end'>
                                Nombre de la empresa
                            </Col>
                            <Col className='mx-4'>
                                Microsoft
                            </Col>
                        </Row>
                        <br />
                    </Col>
                </Row>
                <br />
                <Buttons/>
            </Container>
        </>

    )
}

export default Certification