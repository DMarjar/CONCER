import React,{useEffect, useState} from 'react'
import { Card, Col, Container, Figure, Row, Button } from 'react-bootstrap'
import Buttons from '../../shared/components/Buttons'
import { useParams, Link } from 'react-router-dom'
import AxiosClient from '../../shared/http-client.gateway';


export const Certification = () => {
    const [payload, setPayload] = useState([]);
    const {certification} = useParams();

    const getCertification = async () => {
        try {
            const data = await AxiosClient.doPost(`/certification/one/${certification}`, {});
            console.log(data.data.data[0])
            setPayload(data.data.data[0]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCertification();
    }, [certification])

    return (
        <>
            <Container className='px-5 mt-3 '>
                <h2 className='text-center' style={{ color: "#002e60" }}>Certificación</h2>
                
                <br />
                <br />
                <br />
                <Row className='pt-2'>
                    
                    <Col className='col-lg-6 col-md-8 col-sm-7'>
                       
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4'>
                                Nombre de la certificación
                            </Col>
                            <Col>
                                {payload[1]}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4'>
                                Versión
                            </Col>
                            <Col>
                                {payload[3]}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4'>
                                Nombre del gestor a cargo
                            </Col>
                            <Col>
                                {payload[10]} {payload[11]}
                            </Col>
                        </Row>
                    </Col>
                    <Col className='col-lg-6 col-md-4 col-sm-5'>
                        <div className=' text-center' style={{ height: "260px", color: "black" }}>
                            <img src={`data:image/png;base64, ${payload[6]}`} style={{height: "200px", width:"600px"}}className="card"/>
                        </div>
                        <br />
                        <Row >
                            <br/>
                            <Col className='col-lg-7 col-md-4 col-sm-4 text-end'>
                                Nombre de la empresa
                            </Col>
                            <Col className='mx-4'>
                                {payload[8]}
                            </Col>
                        </Row>
                        <br />
                    </Col>
                </Row>
                <br />
                <div className='mb-3' style={{ position: "absolute", bottom: 0, width: "90%" }}>
                    <Row>
                        <Col className="col-lg-9 col-md-8 col-sm-9">
                        <Button style={{ width: "110px" }} className="ms-4" variant="warning">
                            Deshabilitar
                        </Button>
                        <Link to={`/editCertification/${certification}`} >
                        <Button style={{ width: "110px" }} className="ms-4" variant="primary">
                            Editar
                        </Button>
                        </Link>
                        </Col>
                        <Col>
                        <Button style={{ width: "110px" }} variant="danger">
                            Eliminar
                        </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>

    )
}

export default Certification