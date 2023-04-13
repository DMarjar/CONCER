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
            cell: row => <div  className='w-100'><Link><Button style={{ backgroundColor: "#002e60", color: "white", width: "80px" }}>Ver</Button></Link></div>,
        },
    ]
    return (
        <>
            <Container className='px-5 mt-5'>
            <h2 className='text-center' style={{ color: "#002e60" }}>Certificador</h2>
            <br />
                <Row>
                    <Col className='col-md-7 col-sm-7'>
                        <div>
                            <Card >
                                <Card.Header>
                                    <Row>
                                        <Col className='col-md-8'>
                                            <h5 style={{ color: "#002e60" }}>Certificaciones a Cargo</h5>
                                        </Col>
                                        <Col className='col-md-4 col-sm-4 text-end'></Col>

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
                                        
                                        responsive
                                        />
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    <Col className='text-center col-md-5 col-sm-5'>
                        {payload.pictureBase64 === null ?
                            <div className='text-center' >
                                <Figure>
                                <Figure.Image
                                    className='rounded-circle border border-3 border-dark p-4'
                                    width={200}
                                    height={200}
                                    alt="17x1801"
                                    src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                                />
                                </Figure>
                            </div>
                            :
                            <img src={`data:image/png;base64, ${payload.pictureBase64}`} alt="Imagen" style={{ height: "200px", width: "200px", objectFit: "cover" }} className="img-fluid rounded-circle" />
                        }
                        <br />
                        <br />

                        
                        <br />
                    </Col>
                </Row>
                
                <Row>
                    <Col className='col-md-12'>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col className='col-md-12 col-sm-12 text-center'>
                                        <h5 style={{ color: "#002e60" }}>Datos personales</h5>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row >
                                    <Col className='col-lg-6 col-md-4 col-sm-4'>
                                        Nombre completo:
                                    </Col>
                                    <Col className='mx-4 text-start'>
                                        {payload.firstName} {payload.lastName}
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='mt-2'>
                                    <Col className='col-lg-6 col-md-4 col-sm-4 '>
                                        Correo electrónico:
                                    </Col>
                                    <Col className='mx-4 text-start'>
                                        {payload.email}
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='mt-2'>
                                    <Col className='col-lg-6 col-md-4 col-sm-4 '>
                                        Número de teléfono:
                                    </Col>
                                    <Col className='mx-4 text-start'>
                                        {payload.phoneNumber}
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='mt-2'>
                                    <Col className='text-end'>
                                        <Link to={`/editAccount/${payload.id}`}>
                                        <Button className='ml-auto' style={{ backgroundColor: "#002e60" }}>Editar datos personales</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Certifier