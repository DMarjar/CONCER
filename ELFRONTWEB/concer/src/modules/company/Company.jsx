import React from 'react'
import { Col, Container, Figure, Row, Button } from 'react-bootstrap'
import Buttons from '../../shared/components/Buttons'

export const Company = () => {
    return (
        <>
            <Container className='px-5 mt-5'>
                {/* <h2 className='text-center' style={{ color: "#002e60" }}>Nombre del candidato</h2> */}
                <Row>
                    <Col className='col-lg-6 col-md-8 col-sm-7'>
                        <br />
                        <h4 style={{ color: "#002e60" }}>Certificaciones</h4>
                        <div className='text-end mt-1'>
                            <Button className='ml-auto' style={{ backgroundColor: "#002e60" }}>Agregar</Button>
                        </div>
                        <br />
                        <div className='rounded-3 border border-1 border-secondary w-100' style={{ height: "300px" }}>
                            tabla de certificaciones de la empresa
                        </div>
                    </Col>
                    <Col className='text-align-center'>
                        <br />
                        <br />
                        <Row className='justify-content-center'>
                            <div className='rounded-3 border border-4 border-secondary text-center bg-light' style={{ height: "203px", width: "300px", color: "black" }}>
                                Imagen de la empresa
                            </div>
                        </Row>
                        <br />
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Nombre de la empresa
                            </Col>
                            <Col className='mx-4 text-start'>
                                Microsoft
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </Container>
            <br />
            <Buttons />
        </>
    )
}

export default Company