import React, {useEffect, useContext} from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Card, Col, Container, Figure, Row, Form, Button } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import axios from '../../shared/http-client.gateway'
import AuthContext from './AuthContext';
import Swal from 'sweetalert2';


export const Login = () => {

    const {setState} = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        
        validationSchema: yup.object().shape({
            username: yup.string().required('Campo requerido'),
            password: yup.string().required('Campo requerido'),
        }),

        onSubmit: async (values) => {
            try {
                const account = await axios.doPost("/auth/inicioSesion",{
                    username:values.username,
                    password:values.password
                })

                await localStorage.setItem("token", JSON.stringify(account.data.data.token));

                const user = await axios.doPost("/user/person",{
                    username:values.username,
                    password:values.password
                })

                await  localStorage.setItem("account", JSON.stringify(user.data.data)); 
 
                setState({
                    auth: true,
                    role: account.data.data.user.authorities[0].authority 
                })

                      
            } catch (err) {
                Swal.fire({
                    title: '¡Error!',
                    text: 'Usuario o contraseña incorrectos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                })
                
            }
        },
    });

    useEffect(() => {
        document.title = 'CONCER | Login';
    }, []);


    return (
        <>
            <section className='h-100 gradient-form'>
                <Container className="py-5 h-100">
                    <Row className='d-flex py-3 justify-content-center align-items-center h-100 bg-ligh'>
                    <Figure  className='d-flex justify-content-center align-items-center h-100 bg-ligh'>
                          <Figure.Image
                            width={250}
                            height={'auto'}
                            alt="LOGO-UTEZ"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png"
                          />
                        </Figure></Row>
                    <Row className='d-flex justify-content-center align-items-center h-100'>
                        <Col className="col-xl-10">

                            <Row className='g-0 '>
                                <Col className='col-lg-3 '>
                                </Col>
                                <Col className='col-lg-6'>
                                    <Card border="light" style={{ backgroundColor: '#f2f2f2' }} className='rounded-3 text-black'>
                                        <Card.Body className='p-md-5 mx-md-4'>

                                            <div className='text-center'>

                                                <h4 className='mt-1 mb-5 pb-1'>Iniciar sesión</h4>
                                                <hr></hr>
                                            </div>

                                            <Form onSubmit={formik.handleSubmit}>
                                                <Form.Group className="form-outline mb-4">
                                                    <Form.Label htmlFor="username">
                                                        Usuario:
                                                    </Form.Label>
                                                    <Form.Control
                                                        
                                                        id="username"
                                                        autoComplete="off"
                                                        name="username"
                                                        value={formik.values.username}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.username ? (
                                                        <span className='error-text' style={{color:'#a32825ff'}}>
                                                            {formik.errors.username}
                                                        </span>
                                                    ) : null}
                                                </Form.Group>
                                                <Form.Group className="form-outline mb-4">
                                                    <Form.Label htmlFor="password">
                                                        Contraseña:
                                                    </Form.Label>
                                                    <Form.Control
                                                        
                                                        id="password"
                                                        type="password"
                                                        autoComplete="off"
                                                        name="password"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        
                                                    />
                                                    {formik.errors.password ? (
                                                        <span className='error-text' style={{color:'#a32825ff'}}>
                                                            {formik.errors.password}
                                                        </span>
                                                    ) : null}
                                                </Form.Group>
                                                <Form.Group className='form-outline mb-4 mt-4'>
                                                    <div className='text-center pt-1 pb-1 '>
                                                        <Button
                                                            variant="secondary"
                                                            className='btn-hover gradient-custom-2 mt-4'
                                                            type="submit"
                                                            style={{ backgroundColor: '#00a780' }}
                                                            disabled={!(formik.isValid && formik.dirty)}
                                                        >
                                                            <FeatherIcon icon={'log-in'} />
                                                            &nbsp; Iniciar sesion
                                                        </Button>
                                                    </div>
                                                </Form.Group>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className='col-lg-3 '>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
