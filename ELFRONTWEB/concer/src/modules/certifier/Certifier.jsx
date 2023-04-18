import React from 'react'
import { Col, Container, Figure, Row, Button } from 'react-bootstrap'
import Buttons from '../../shared/components/Buttons'

export const Certifier = () => {
    return (
        <>
            <Container className='px-5 mt-5'>
                <Row>
                    <Col className='col-lg-6 col-md-8 col-sm-7'>
                        <br />
                        <h4 style={{ color: "#002e60" }}>Certificaciones a cargo</h4>
                        <div className='text-end mt-1'>
                            <Button className='ml-auto' style={{ backgroundColor: "#002e60" }}>Agregar</Button>
                        </div>
                        <br />
                        <div className='rounded-3 border border-1 border-secondary w-100' style={{height: "300px"}}>
                        tabla de certificaciones
                        </div>
                    </Col>
                    <Col className='text-center'>
                        <h2 style={{ color: "#002e60" }}>Certificador</h2>
                        <br />
                        <Figure>
                            <Figure.Image
                                className='rounded-circle border border-3 border-dark p-4'
                                width={181}
                                height={190}
                                alt="171x180"
                                src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                            />
                        </Figure>
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Nombre completo
                            </Col>
                            <Col className='mx-4 text-start'>
                                Ana Belen Velasquez Diaz
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Correo electrónico
                            </Col>
                            <Col className='mx-4 text-start'>
                                20213tn149@utez.edu.mx
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Número de teléfono
                            </Col>
                            <Col className='mx-4 text-start'>
                                772 156 6806
                            </Col>
                        </Row>
                        <br />
                    </Col>
                </Row>
                <br />
            </Container>
            <br />
            <Buttons/>

        </>
    )
}

export default Certifier