import React, {useEffect, useState}from 'react'
import { Button, Col, Container, Figure, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';




export const Profile = () => {

    const [user, setUser] = useState({})

    useEffect(() => {

        const account = JSON.parse(localStorage.getItem('account'));
        if(account){
            setUser(account)
        }
    }, []);
    

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Información básica</h2>
                <Row className='mt-4 pt-4'>
                    <Col className='col-lg-7 col-md-8 col-sm-7'>
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Nombre(s)
                            </Col>
                            <Col>
                                {user.firstName}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Apellido(s)
                            </Col>
                            <Col>
                                {user.lastName}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Teléfono
                            </Col>
                            <Col>
                                {user.phoneNumber}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Correo electrónico
                            </Col>
                            <Col>
                                {user.email}
                            </Col>
                        </Row>
                        <hr />
                        <Row >
                            <Col className='col-lg-3 col-md-4 col-sm-4'>
                                Género
                            </Col>
                            <Col>
                                {user.gender}
                            </Col>
                        </Row>
                    </Col>
                    <Col className='text-center'>
                        <Row className='justify-content-center'>
                            <div className='rounded-3 border border-4 border-secondary text-center bg-light' style={{ height: "203px", width: "300px", color: "black" }}>
                                Imagen de la certificación
                            </div>
                        </Row>
                        <br />
                        <Row className='text-center'>
                            <h5>Username ?</h5>
                        </Row>
                    </Col>
                </Row>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <Link to="/editProfile">
                    <Button style={{ backgroundColor: "#019979" }}  >Editar Informacion</Button>
                </Link>
                
            </Container>

            

        </>
    )
}

export default Profile
