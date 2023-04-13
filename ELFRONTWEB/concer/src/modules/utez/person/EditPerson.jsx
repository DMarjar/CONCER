import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../../shared/http-client.gateway';
import { useParams, Link, useLocation } from 'react-router-dom'
import Swal from "sweetalert2";



export const EditPerson = () => {


    const [payload, setPayload] = useState({
        id: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        gender: '',
        typePerson: '',
        pictureBase64: '',
        user: {}
    });


    const { account } = useParams();


    const getPerson = async () => {
        try {
            const data = await AxiosClient.doGet(`/person/one/${account}`, {});
            setPayload({
                id: data.data.data.id,
                firstName: data.data.data.firstName,
                lastName: data.data.data.lastName,
                phoneNumber: data.data.data.phoneNumber,
                email: data.data.data.email,
                gender: data.data.data.gender,
                typePerson: data.data.data.typePerson,
                pictureBase64: data.data.data.pictureBase64,
                user: data.data.data.user
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPerson();
    }, []);

    return (
        <>
            <Container className='px-5 mt-3'>
                <h4 className='text-center' style={{ color: "#002e60" }}>Editar información</h4>
                <br />
                <Card>
                    <Card.Body>
                        <Formik
                            initialValues={payload}
                            onSubmit={async (values, { setSubmitting }) => {
                                Swal.fire({
                                    title: '¿Está usted seguro?',
                                    text: "",
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#019979',
                                    cancelButtonColor: '#A0A5A1',
                                    confirmButtonText: '!Sí, actualizar!',
                                    cancelButtonText: 'Cancelar'
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        try {
                                            const data = await AxiosClient.doPut('/person/updateWeb/', payload);
                                            console.log(data.data.data);
                                            Swal.fire({
                                                title: '!Actualizado!',
                                                text: 'Se edito la información',
                                                confirmButtonColor: '#019979',
                                                icon: 'success',
                                                confirmButtonText: 'Aceptar'
                                            })
                                        } catch (error) {
                                            console.log(error);
                                            Swal.fire({
                                                title: 'Vaya..',
                                                text: 'Algo salio mal',
                                                icon: 'error',
                                                confirmButtonText: 'Aceptar',
                                                confirmButtonColor: '#019979',
                                            })
                                        }
                                    } else {
                                        Swal.fire({
                                            title: '¡Cancelado!',
                                            text: 'No se edito la información',
                                            confirmButtonColor: '#019979',
                                            icon: 'error',
                                            confirmButtonText: 'Aceptar'

                                        })
                                    }
                                })
                            }}
                        >

                            <Form >
                                <Row className='mb-3'>
                                    <Col className="col-md-6">
                                        <label className="form-label">Nombre</label>
                                        <Field
                                            name="firstName"
                                            type="text"
                                            value={payload.firstName}
                                            onChange={e => setPayload({ ...payload, firstName: e.target.value })}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col className="col-md-6">
                                        <label className="form-label">Apellido</label>
                                        <Field
                                            name="lastName"
                                            type="text"
                                            value={payload.lastName}
                                            onChange={e => setPayload({ ...payload, lastName: e.target.value })}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row className='mb-3'>
                                    <Col className="col-md-6">
                                        <label className="form-label">Teléfono</label>
                                        <Field
                                            name="phoneNumber"
                                            type="text"
                                            value={payload.phoneNumber}
                                            onChange={e => setPayload({ ...payload, phoneNumber: e.target.value })}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <Field
                                            name="email"
                                            type="text"
                                            value={payload.email}
                                            onChange={e => setPayload({ ...payload, email: e.target.value })}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row className='mb-3'>
                                    <Col className="col-md-6">
                                        <label className="form-label">Género</label>
                                        <Field
                                            name='gender'
                                            as='select'
                                            value={payload.gender}
                                            className="form-control"
                                            onChange={e => setPayload({ ...payload, gender: e.target.value })}
                                        >
                                            <option value=''>Seleccione</option>
                                            <option value='MASCULINO'>Masculino</option>
                                            <option value='FEMENINO'>Femenino</option>
                                        </Field>
                                    </Col>
                                    <Col className="col-md-6">
                                        <label className="form-label">Tipo de persona</label>
                                        <Field
                                            name='typePerson'
                                            as='select'
                                            value={payload.typePerson}
                                            className="form-control"
                                            onChange={e => setPayload({ ...payload, typePerson: e.target.value })}
                                        >
                                            <option value=''>Seleccione</option>
                                            <option value='ESTUDIANTE'>Estudiante</option>
                                            <option value='PROFESOR'>Profesor</option>
                                            <option value='ADMINISTRATIVO'>Administrativo</option>
                                            <option value='EXTERNO'>Externo</option>
                                        </Field>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col className="col-md-12">
                                        <label className="form-label">Foto de perfil</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="pictureBase64"
                                            name="pictureBase64"
                                            accept="image/*"
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
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }
                                        />

                                    </Col>

                                </Row>
                                <br />
                                <Row className='mb-3'>
                                    <Col className="col-md-12">
                                        <div id="preview" className="text-center">
                                            {
                                                payload.pictureBase64 ? (
                                                    <img src={`data:image/png;base64, ${payload.pictureBase64}`} alt="preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                                ) : null
                                            }
                                        </div>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col className="col-md-12 text-end">
                                        <Button style={{ backgroundColor: "#002e60", color: "white" }} type="submit" className="btn btn-primary">
                                            Guardar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default EditPerson;