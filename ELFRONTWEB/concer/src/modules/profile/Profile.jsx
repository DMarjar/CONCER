import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Figure, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import AxiosClient from "../../shared/http-client.gateway";
import DataTable from "react-data-table-component";

const Profile = () => {
    const [payload, setPayload] = useState({});
    const [account, setAccount] = useState();

    const getAccount = () => {
        const account = JSON.parse(localStorage.getItem("account"));
        setAccount(account.id);
    }; 

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
        getAccount();
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
                                <Card.Header>Información de contacto</Card.Header>
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
                                        <span style={{ fontWeight: "bold" }}>Teléfono:</span>
                                        </Col>
                                        <Col sm={8}>
                                        <span>{payload.phoneNumber}</span>
                                        </Col>
                                    </Row>
                                <Row className="mb-2">
                                    <Col sm={4}>
                                    <span style={{ fontWeight: "bold" }}>Género:</span>
                                    </Col>
                                    <Col sm={8}>
                                    <span>{payload.gender}</span>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={4}>
                                    <span style={{ fontWeight: "bold" }}>Estado:</span>
                                    </Col>
                                    <Col sm={8}>
                                    <span>{payload.status ? "Active" : "Inactive"}</span>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={4}>
                                    <span style={{ fontWeight: "bold" }}>Tipo de persona:</span>
                                    </Col>
                                    <Col sm={8}>
                                    <span>{payload.typePerson}</span>
                                    </Col>
                                </Row>

                                
                                {
                                    payload.user?.role !== "USER" ? (

                                        <>
                                            <hr />
                                            <Row className="mb-2">
                                                <Col sm={4}>

                                                <Link to={`/editProfile`} className='btn' style={{ backgroundColor: "#002e60", color: "white" }}>Editar datos personales</Link>
                                                </Col>
                                            </Row>
                                        
                                        </>
                                       
                                    ):(
                                        <>
                                            <br />
                                            <p style={{ color: "#A0A5A1"}}>para editar sus datos personales debe contactar con su gestor </p> 
                                        </>
                                    )

                                }
                                
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
                                        <span style={{ fontWeight: "bold" }}>Nombre de usuario:</span>
                                        </Col>
                                        <Col sm={8}>
                                        <span>{payload.user?.username}</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4}>
                                            <span style={{ fontWeight: "bold" }}>Rol:</span>
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

export default Profile;
