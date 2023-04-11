import React, {useEffect, useState } from 'react'
import { Col, Container, Figure, Row,Card, Button } from 'react-bootstrap'
import AxiosClient from '../../shared/http-client.gateway';
import { useParams, Link } from 'react-router-dom';


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
            <Container className='px-5 mt-3 mb-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>CANDIDATURA</h2>
                <Row className='mt-4'>
                    <Col className='col-lg-6 col-md-8 col-sm-7'>
                        <Card>
                            <Card.Header>
                                <h4 className='text-center' style={{ color: "#002e60" }}>Datos personales</h4>
                            </Card.Header>
                            <Card.Body>
                                <Row >
                                    <Col className='col-md-6'>
                                        Nombre
                                    </Col>
                                    <Col>
                                        {payload[3]}
                                    </Col>
                                    
                                </Row>
                                <hr />
                                <Row >
                                    <Col className='col-md-6'>
                                        Apellidos
                                    </Col>
                                    <Col>
                                        {payload[4]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row >
                                    <Col className='col-md-6'>
                                        telefono
                                    </Col>
                                    <Col>
                                        {payload[7]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row >
                                    <Col className='col-md-6'>
                                        Correo
                                    </Col>
                                    <Col>
                                        {payload[6]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row >
                                    <Col className='col-md-6'>
                                        Tipo de persona
                                    </Col>
                                    <Col>
                                        {payload[8]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row >
                                    <Col className='col-md-6'>
                                        Genero
                                    </Col>
                                    <Col>
                                        {payload[5]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row >
                                    <Col className='text-right'>
                                        <Link to={`/editAccount/${payload[2]}`} className='btn btn-primary'>Editar datos personales</Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col-lg-6 col-md-4 col-sm-5'>
                        <Row className='justify-content-center'>
                            <div  style={{ height: "203px", width: "300px", color: "black" }}>                            
                                {
                                    payload[19] === "" ?
                                        <div className='text-center mt-5' >
                                            <Figure>
                                                <Figure.Image
                                                        className='rounded-circle border border-3 border-dark p-4 mt-5'
                                                        width={300}
                                                        height={300}
                                                        alt="171x180"
                                                        src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                                                />
                                            </Figure>
                                        </div>
                                        :
                                        <Card className='rounded-3 border border-4 border-secondary text-center bg-light mt-5' style={{ height: "300px", width: "300px", color: "black" }}>
                                            <img src={`data:image/png;base64, ${payload[19]}`} alt="Imagen" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                        </Card>
                                }
                            </div>
                        </Row>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className='col-lg-12'>
                        <Card>
                            <Card.Header>
                                <h4 className='text-center' style={{ color: "#002e60" }}>Datos de la candidatura</h4>
                            </Card.Header>
                            <Card.Body>
                                <Row className='text-center'>
                                    <Col >
                                        {payload[10]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row >
                                    <Col className='col-md-3'>
                                        certificacion
                                    </Col>
                                    <Col className='col-md-3 text-center'>
                                        {payload[11]}
                                    </Col>
                                    <Col className='col-md-3'>
                                        Verison
                                    </Col>
                                    <Col className='col-md-3 text-center'>
                                        {payload[12]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col className='col-md-3'>
                                        Empresa
                                    </Col>
                                    <Col className='col-md-3 text-center'>
                                        {payload[13]}
                                    </Col>
                                    <Col className='col-md-3'>
                                        Clave
                                    </Col>
                                    <Col className='col-md-3 text-center'>
                                        {payload[15]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col className='col-md-3'>
                                        Gestor
                                    </Col>
                                    <Col className='col-md-3 text-center'>
                                        {payload[14]}
                                    </Col>
                                    <Col className='col-md-3'>
                                        Fecha en que concluyo
                                    </Col>
                                    <Col className='col-md-3 text-center'>
                                        {payload[18]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col className='col-md-3'>
                                        Grupo
                                    </Col>
                                    <Col className='col-md-3 text-center'>
                                        {payload[16]}
                                    </Col>
                                    <Col className='col-md-3'>
                                        Puntaje final
                                    </Col>
                                    <Col className='col-md-3 text-center'>
                                        {payload[17]}
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    {payload[10] === "ENTREGADO" ?
                                            <>
                                                
                                            </>
                                            :
                                            <>
                                                <Col className='col-md-3'>
                                                    <Link to={`/editCandidate/${candidatura}`} className='btn btn-primary'>Editar datos de la candidatura</Link>
                                                </Col>
                                                <Col className='col-md-3'>
                                                    <Link to={`/editEstado/${candidatura}`} className='btn btn-primary'>Actualizar Estado</Link>
                                                </Col>
                                            </>
                                    }
                                    
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
            </Container>
        </>
    )
}

export default Candidate