import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Figure, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import AxiosClient from "../../../shared/http-client.gateway";

const Person = () => {
    const [payload, setPayload] = useState({});
    const { account } = useParams();

    const getPerson = async () => {
        try {
        const data = await AxiosClient.doGet(`/person/one/${account}`, {});
        console.log(data.data.data);
        setPayload(data.data.data);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getPerson();
    }, [account]);

    return (
        <Container className="my-3">
            <h2 className="text-center" style={{ color: "#002e60" }}>{payload.firstName} {payload.lastName}</h2>
            <br />
            <Card>
                <Card.Body>
                    <Row className="mb-3">
                        <Col sm={8}>
                            <Card>
                                <Card.Header>Informacion de Contacto</Card.Header>
                                <Card.Body>
                                    <Row className="mb-2">
                                        <Col sm={4}>
                                        <span style={{ fontWeight: "bold" }}>Email:</span>
                                        </Col>
                                        <Col sm={8}>
                                        <span>{payload.email}</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4}>
                                        <span style={{ fontWeight: "bold" }}>Telefono:</span>
                                        </Col>
                                        <Col sm={8}>
                                        <span>{payload.phoneNumber}</span>
                                        </Col>
                                    </Row>
                                <Row className="mb-2">
                                    <Col sm={4}>
                                    <span style={{ fontWeight: "bold" }}>Genero:</span>
                                    </Col>
                                    <Col sm={8}>
                                    <span>{payload.gender}</span>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={4}>
                                    <span style={{ fontWeight: "bold" }}>Status:</span>
                                    </Col>
                                    <Col sm={8}>
                                    <span>{payload.status ? "Active" : "Inactive"}</span>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={4}>
                                    <span style={{ fontWeight: "bold" }}>Tipo de Persona:</span>
                                    </Col>
                                    <Col sm={8}>
                                    <span>{payload.typePerson}</span>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="mb-2">
                                    <Col sm={4}>
                                    <Link to={{pathname:`/editAccount/${payload.id}`}} className='btn btn-primary'>Editar datos personales</Link>
                                    </Col>
                                </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4} className="text-center mt-4">
                            {
                                    payload.pictureBase64 === null ?
                                        <div className='text-center' >
                                            <Figure>
                                                <Figure.Image
                                                    className='rounded-circle border border-3 border-dark p-4'
                                                    width={260}
                                                    height={260}
                                                    alt="17x1801"
                                                    src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                                                />
                                            </Figure>
                                        </div>
                                        :
                                        <img src={`data:image/png;base64, ${payload.pictureBase64}`} alt="Imagen" style={{ height: "260px", width: "260px", objectFit: "cover" }} className="img-fluid rounded-circle" />
                            }
                        </Col>
                        

                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Usuario</Card.Header>
                                <Card.Body>
                                    <Row className="mb-2">
                                        <Col sm={4}>
                                        <span style={{ fontWeight: "bold" }}>Username:</span>
                                        </Col>
                                        <Col sm={8}>
                                        <span>{payload.user?.username}</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4}>
                                            <span style={{ fontWeight: "bold" }}>Role:</span>
                                        </Col>
                                        <Col sm={8}>
                                            <span>{payload.user?.role}</span>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Person;
