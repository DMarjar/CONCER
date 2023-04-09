import React,{useState} from 'react'
import {Card, Col, Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const NewCandidate = () => {
    
    const [Person, setPerson] = useState([]);

    

    return (
        <>
            <Container className='px-5 mt-3'>
                <h1 className='text-center' style={{ color: "#002e60" }}>Agregar Candidatura</h1>
                <br/>
                <Card>
                    <Card.Header>
                        <Card.Title as="h3">
                            <Row>
                                <Col className="col-md-4">
                                    <h3>Persona</h3>
                                </Col>
                            </Row>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col className="col-md-4">
                                <h5>Ya esta registrado?</h5>
                            </Col>
                            <Col className="col-md-4">
                                <Link to='/newAccount'><Button variant="primary">Registrar Cuenta</Button></Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                
                
            </Container>       
        </>
    )
}

export default NewCandidate
