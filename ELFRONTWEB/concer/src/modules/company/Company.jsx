import React, {useEffect, useState} from 'react'
import { Col, Container, Figure, Row, Button, Card } from 'react-bootstrap'
import Buttons from '../../shared/components/Buttons'
import { useParams, Link } from 'react-router-dom'
import AxiosClient from '../../shared/http-client.gateway';
import DataTable from "react-data-table-component";

export const Company = () => {
    const[payload, setPayload] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const {company} = useParams();

    useEffect(() => {
        getCompany();
        getCertifications();
    }, [])

    const getCompany = async () => {
        try {
            const data = await AxiosClient.doGet(`/certifyingCompany/${company}`, {});
            console.log(data.data.data)
            setPayload(data.data.data)
        } catch (error) {

        }
    }

    const getCertifications = async () => {
        try {
            const data = await AxiosClient.doGet(`/certification/company/${company}`, {});
            console.log(data.data.data)
            setCertifications(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const certificacionColumns = React.useMemo(() => [
        {
            name: 'Nombre',
            cell: row => <div>{row.name}</div>,
        },
        {
            name: 'Version',
            cell: row => <div>{row.version}</div>,
        },
        {
            name: 'Estado',
            cell: row => {
                if(row.status === true){
                    return <div>Activa</div>
                }else{
                    return <div>Inactiva</div>
                }
            }
        },
    ]);

    return (
        <>
            <Container className='px-5 mt-5'>
            <h2 className='text-center' style={{ color: "#002e60" }}>Empresa Certificadora</h2>
            <br />
                <Row>
                    <Col className='col-lg-6 col-md-8 col-sm-7'>
                        <br />
                        <div className='text-end mt-1'>
                            <Card>
                                <Card.Header>
                                    <Card.Title>
                                        Certificaciones
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <DataTable
                                        columns={certificacionColumns}
                                        data={certifications}
                                        pagination
                                        highlightOnHover
                                        responsive
                                        noDataComponent={<div className='text-center'>No hay certificaciones</div>}
                                        paginationPerPage={3}
                                        paginationRowsPerPageOptions={[3,6, 12, 18, 24, 30]}
                                    />
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col className='text-align-center'>
                        <br />
                        <br />
                        <Row className='justify-content-center'>
                            <div  style={{ height: "203px", width: "300px", color: "black" }}>                            
                                {
                                    payload[19] === "" ?
                                        <div className='text-center' >
                                            
                                        </div>
                                   
                                        :
                                        <Card className='rounded-3 border border-4 border-secondary text-center bg-light' style={{ height: "203px", width: "300px", color: "black" }}>
                                            <img src={`data:image/png;base64, ${payload.pictureBase64}`} alt="Imagen" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                        </Card>

                                }
                            
                            </div>
                        </Row>
                        <br />
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Nombre de la empresa
                            </Col>
                            <Col className='mx-4 text-start'>
                                {payload.name}
                            </Col>
                        </Row>
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Email de contacto:
                            </Col>
                            <Col className='mx-4 text-start'>
                                {payload.email}
                            </Col>
                        </Row>
                        <Row >
                            <Col className='col-lg-6 col-md-4 col-sm-4 text-end'>
                                Telefono de contacto:
                            </Col>
                            <Col className='mx-4 text-start'>
                                {payload.phone}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </Container>
            <br />
            <div className='mb-3' style={{ position: "absolute", bottom: 0, width: "90%" }}>
                    <Row>
                        <Col lg={9} md={8} sm={9}>
                            <Button style={{ width: "110px" }} className="ms-4" variant="warning">
                                Deshabilitar
                            </Button>
                            <Link to={`/editCompany/${company}`}>
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
        </>
    )
}

export default Company