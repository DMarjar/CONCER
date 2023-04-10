import React, {useEffect, useState } from 'react'
import { Col, Container, Figure, Row,Card } from 'react-bootstrap'
import Buttons from '../../shared/components/Buttons'
import AxiosClient from '../../shared/http-client.gateway';
import { useParams } from 'react-router-dom';


export const Candidate = () => {
    const [payload, setPayload] = useState([]);
    const {candidatura} = useParams();

    //lo hice con then pq por wey se me olvido usar async await
    const getCandidature =  () => {
        const data = AxiosClient.doPost("/candidate/candidature", {id: candidatura})
        .then((response) => {
            setPayload(response.data.data[0]);
        });    
    }

    useEffect(() => {
        getCandidature();
    }, []);


    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>{payload[3]} {payload[4]}</h2>
                <Row className='mt-4 pt-4'>
                    <Col className='col-lg-6 col-md-8 col-sm-7'>
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Correo
                            </Col>
                            <Col>
                                {payload[6]}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Teléfono
                            </Col>
                            <Col>
                                {payload[7]}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Tipo de candidato
                            </Col>
                            <Col>
                                {payload[8]}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Fecha
                            </Col>
                            <Col>
                                {payload[18]}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                Grupo
                            </Col>
                            <Col>
                                {payload[16]}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-5 col-md-4 col-sm-4'>
                                División / Academia
                            </Col>
                            <Col>
                                {payload[9]}
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-lg-6 col-md-4 col-sm-5'>
                        <Row className='justify-content-center'>
                            <div  style={{ height: "203px", width: "300px", color: "black" }}>                            
                                {
                                    payload[19] === "" ?
                                        <div className='text-center' >
                                            <Figure>
                                                <Figure.Image
                                                    className='rounded-circle border border-3 border-dark p-4'
                                                    width={181}
                                                    height={190}
                                                    alt="171x180"
                                                    src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                                                />
                                            </Figure>
                                        </div>
                                   
                                        :
                                        <Card className='rounded-3 border border-4 border-secondary text-center bg-light' style={{ height: "203px", width: "300px", color: "black" }}>
                                            <img src={`data:image/png;base64, ${payload[19]}`} alt="Imagen" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                        </Card>

                                }
                            
                            </div>
                        </Row>

                        <br />
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Nombre de la certificación
                            </Col>
                            <Col className='mx-4'>
                                {payload[11]}
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Clave de la certificación
                            </Col>
                            <Col className='mx-4'>
                                {payload[15]}
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Estado
                            </Col>
                            <Col className='mx-4'>
                                {payload[10]}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
                <Row className='justify-content-center'>
                

                </Row>

            </Container>
            <br />
            <Buttons />
        </>
    )
}

export default Candidate