import React, { useState } from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AxiosClient from '../../shared/http-client.gateway';


export const NewCompany = () => {

    const [payload, setPayload] = useState({
        name: '',
        email: '',
        phone: '',
        pictureBase64: ''
    })

    const validationForm = Yup.object().shape({
        name: Yup.string().required('Este campo no puede estar vacio').matches(/^[a-zA-Z\s\u00C0-\u00FF'-]+$/, "No debe contener números o caracteres especiales"),
        email: Yup.string().email('Este campo no puede estar vacio').required('El email es requerido'),
        phone: Yup.string().required('Este campo no puede estar vacio').min(10, "telefono invalido").max(10, "telefono invalido").matches(/^[0-9]+$/, "telefono invalido"),
    })

    const registrar = async (e) => {
        try {
            const data = await AxiosClient.doPost('/certifyingCompany/', {
                name: e.name,
                email: e.email,
                phone: e.phone,
                pictureBase64: payload.pictureBase64
            })
            Swal.fire({
                title: '¡Correcto!',
                text: 'Se ha registrado la empresa correctamente',
                icon: 'success',
                confirmButtonColor: '#019979',
                confirmButtonText: 'Aceptar'
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Vaya...',
                text: 'Ha ocurrido un error al registrar la empresa',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Agregar Empresa certificadora</h2>
                <br />
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                <h5 className='text-center' style={{ color: "#002e60" }}>Datos de la Empresa</h5>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={payload}
                            validationSchema={validationForm}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false)
                                Swal.fire({
                                    title: '¿Está usted seguro?',
                                    text: "",
                                    icon: 'question',
                                    showCancelButton: true,
                                    cancelButtonText: "Cancelar",
                                    confirmButtonColor: '#019979',
                                    cancelButtonColor: '#A0A5A1',
                                    confirmButtonText: 'Sí, guardar!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        registrar(values)
                                    } else {
                                        Swal.fire({
                                            title: 'Registro cancelado',
                                            icon: 'error',
                                            confirmButtonText: 'Aceptar',
                                            confirmButtonColor: '#019979'
                                        })
                                    }
                                })
                            }}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="name">Nombre</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    className={`form-control ${errors.name && touched.name && "is-invalid"}`}

                                                />
                                                <div className="invalid-feedback">{errors.name}</div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    className={`form-control ${errors.email && touched.email && "is-invalid"}`}

                                                />
                                                <div className="invalid-feedback">{errors.email}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="phone">Teléfono</label>
                                                <Field
                                                    type="text"
                                                    name="phone"
                                                    className={`form-control ${errors.phone && touched.phone && "is-invalid"}`}

                                                />
                                                <div className="invalid-feedback">{errors.phone}</div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="pictureBase64">Logo</label>
                                                <input
                                                    type="file"
                                                    className="form-control-file"
                                                    id="pictureBase64"
                                                    name="pictureBase64"
                                                    accept="image/*"
                                                    required
                                                    onChange={
                                                        (e) => {
                                                            const file = e.target.files[0];
                                                            const reader = new FileReader();

                                                            reader.onload = (e) => {
                                                                const base64 = e.target.result;
                                                                if (base64) {
                                                                    setPayload({
                                                                        ...payload,
                                                                        pictureBase64: base64.toString().replace(/^data:image\/(png|jpeg);base64,/, ""),
                                                                    });
                                                                }

                                                            }
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }
                                                />
                                                <div id="preview" className="text-center">
                                                    {
                                                        payload.pictureBase64 ? (
                                                            <img src={`data:image/png;base64, ${payload.pictureBase64}`} alt="preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                                        ) : null
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className='mb-3'>
                                        <Col className='col-md-12 text-end'>
                                            <Button style={{ backgroundColor: "#002e60", color: "white" }} type="submit" disabled={isSubmitting} className='btn btn-primary'>
                                                Guardar
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default NewCompany
