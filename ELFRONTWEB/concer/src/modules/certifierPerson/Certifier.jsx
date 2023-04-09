import React, {useState, useEffect} from 'react'
import { Col, Container, Figure, Row, Button, Card } from 'react-bootstrap'
import Buttons from '../../shared/components/Buttons'
import { Link, useParams } from 'react-router-dom'
import AxiosClient from '../../shared/http-client.gateway';
import DataTable from "react-data-table-component";


export const Certifier = () => {
    const [certifications, setCertifications] = useState([]);
    const [payload, setPayload] = useState([]);
    const {certifier} = useParams();

    const getCertifications = async () => {
        try {
            const data = await AxiosClient.doPost(`/certification/person/${certifier}`, {});
            console.log(data.data.data)
            setCertifications(data.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getCertifier =  () => {
        console.log(certifier)
        try {
            AxiosClient.doGet(`/person/one/${certifier}`, {})
            .then((res) => {
                console.log(res.data.data)
                setPayload(res.data.data)
                getCertifications();
            })   
        } catch (error) {
            
        }
    }


    useEffect(() => {
        getCertifier();
    }, [certifier])

    const columns =  [
        {
            name: 'Cerefiticación',
            cell: row => <div>{row.name}</div>,
        },
        {
            name: 'version',
            cell: row => <div>{row.version}</div>,
        },
        {
            name: 'status',
            cell: row => {
                if(row.status === true){
                    return <div>Activa</div>
                }else{
                    return <div>Inactiva</div>
                }
            },
        },
        {
            name: 'Accion',
            cell: row => <div><Link><Button>Ver</Button></Link></div>,
        },
    ]
    return (
        <>
            <Container className='px-5 mt-5'>
            <h2 className='text-center' style={{ color: "#002e60" }}>Certificador</h2>
            <br />
                <Row>
                    <Col className='col-md-5 col-sm-5'>
                        <div>
                            <Card >
                                <Card.Header>
                                    <Row>
                                        <Col className='col-md-5 col-sm-4 text-end'>
                                            <h5 style={{ color: "#002e60" }}>Certificaciones a Cargo</h5>
                                        </Col>
                                        <Col className='col-md-4 col-sm-4 text-end'></Col>
                                        <Col >
                                            <Button className='ml-auto' style={{ backgroundColor: "#002e60" }}>Agregar</Button>
                                        </Col>
                                    </Row>
                                    
                                </Card.Header>
                                <Card.Body>
                                    <DataTable
                                        columns={columns}
                                        data={certifications}
                                        highlightOnHover
                                        pagination
                                        paginationPerPage={2}
                                        paginationRowsPerPageOptions={[2, 4, 6]}
                                        
                                        />
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col></Col>
                    <Col className='text-center col-md-6 col-sm-6'>
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
                                {payload.firstName} {payload.lastName}
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Correo electrónico
                            </Col>
                            <Col className='mx-4 text-start'>
                                {payload.email}
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mt-2'>
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Número de teléfono
                            </Col>
                            <Col className='mx-4 text-start'>
                                {payload.phoneNumber}
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