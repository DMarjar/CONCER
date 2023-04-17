import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../shared/http-client.gateway';
import Swal from "sweetalert2";



export const NewCertification = () => {

    const [person, setPerson] = React.useState([]);
    const [company, setCompany] = React.useState([]);
    const [payload, setPayload] = React.useState({
        name: "",
        version: "",
        pictureBase64: "",
        idPerson: "",
        idCompany: "",
    });

    const getPerson = async () => {
        try {
            const data = await AxiosClient.doGet('/person/certifiers', {});
            setPerson(data.data.data);
            console.log(data.data.data)
        } catch (error) {

        }
    }

    const getCompany = async () => {
        try {
            const data = await AxiosClient.doGet('/certifyingCompany/', {});
            setCompany(data.data.data);
            console.log(data.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getPerson();
        getCompany();
    }, []);

    const validationForm = Yup.object().shape({
        name: Yup.string().required("El nombre es requerido"),
        version: Yup.string().required("La version es requerida"),
        idPerson: Yup.string().required("El gestor es requerido"),
        idCompany: Yup.string().required("La empresa es requerida"),
    });


    const registrar = async (e) => {
        Swal.fire({
            title: '¿Está usted seguro?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#019979',
            cancelButtonColor: '#A0A5A1',
            confirmButtonText: 'Sí, guardar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const data = await AxiosClient.doPost('/certification/', {
                        name: e.name,
                        version: e.version,
                        pictureBase64: payload.pictureBase64,
                        idPerson: e.idPerson,
                        idCompany: e.idCompany,
                    });
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Certificación registrada correctamente',
                        icon: 'success',
                        confirmButtonColor: '#019979',
                        confirmButtonText: 'Aceptar'
                    })
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'Ocurrio un error al registrar.',
                        'error'
                    )
                }
            } else {
                Swal.fire({
                    title: '¡Operación cancelada!',
                    text: "Registro no procesado",
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#019979',
                    timer: 2000,
                });
            }
        })

    }

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Agregar certificación</h2>
                <br />
                <Card>
                    <Card.Body>
                        <Formik
                            initialValues={{
                                name: "",
                                version: "",
                                idPerson: "",
                                idCompany: "",
                            }}
                            validationSchema={validationForm}
                            onSubmit={async (values, { setSubmitting }) => {
                                await registrar(values);
                                setSubmitting(false);
                            }}
                        >
                            {({ errors, touched, isSubmitting, validateForm }) => (
                                <Form>
                                    <Row>
                                        <Col className='col-12'>
                                            <label htmlFor="name">Nombre de la certificación</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                            />
                                            {touched.name && errors.name ? (
                                                <div className="invalid-feedback">{errors.name}</div>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col className='col-12'>
                                            <label htmlFor="version">Versión</label>
                                            <Field
                                                type="text"
                                                name="version"
                                                className={`form-control ${touched.version && errors.version ? "is-invalid" : ""}`}
                                            />
                                            {touched.version && errors.version ? (
                                                <div className="invalid-feedback">{errors.version}</div>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col className='col-12'>
                                            <label htmlFor="idCompany">Empresa</label>
                                            <Field
                                                as="select"
                                                name="idCompany"
                                                className={`form-control ${touched.idCompany && errors.idCompany ? "is-invalid" : ""}`}
                                            >
                                                <option value="">Seleccione una empresa</option>
                                                {company.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </Field>
                                            {touched.idCompany && errors.idCompany ? (
                                                <div className="invalid-feedback">{errors.idCompany}</div>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col className='col-12'>
                                            <label htmlFor="idPerson">Encargado de la gestión</label>
                                            <Field
                                                as="select"
                                                name="idPerson"
                                                className={`form-control ${touched.idPerson && errors.idPerson ? "is-invalid" : ""}`}
                                            >
                                                <option value="">Seleccione un gestor</option>
                                                {person.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.firstName} {item.lastName}</option>
                                                ))}
                                            </Field>
                                            {touched.idPerson && errors.idPerson ? (
                                                <div className="invalid-feedback">{errors.idPerson}</div>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col className='col-lg-12 col-md-12 col-sm-12'>
                                            <div className="form-group">
                                                <label htmlFor="pictureBase64">Imagen</label>
                                                <br />
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="pictureBase64"
                                                    name="pictureBase64"
                                                    accept="image/*"
                                                    required
                                                    onChange={
                                                        (e) => {
                                                            const file = e.target.files[0];
                                                            const reader = new FileReader();
                                                            reader.onload = (e) => {


                                                                const img = new Image();
                                                                img.src = e.target.result;
                                                                img.onload = () => {
                                                                    const aspectRatio = img.width / img.height;
                                                                    if (aspectRatio < 1.5) {
                                                                        Swal.fire(
                                                                            'Error!',
                                                                            'La imagen debe ser rectangular para el carrusel y lo suficientemente grande',
                                                                            'error'
                                                                        )
                                                                        return;
                                                                    }
                                                                    const base64 = e.target.result;
                                                                    if (base64) {
                                                                        setPayload({
                                                                            ...payload,
                                                                            pictureBase64: base64.toString().replace(/^data:image\/(png|jpeg);base64,/, ""),
                                                                        });
                                                                    }
                                                                }
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }
                                                />

                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className='mt-3'>
                                        <div id="preview" className="text-center">
                                            {
                                                payload.pictureBase64 ? (
                                                    <img src={`data:image/png;base64, ${payload.pictureBase64}`} alt="preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                                ) : null
                                            }
                                        </div>
                                    </Row>
                                    <br />
                                    <Row className='mb-3'>
                                        <Col className='col-md-12 text-end'>
                                            <Button style={{ backgroundColor: "#002e60", color: "white" }} className='btn btn-primary' type="submit" disabled={isSubmitting} >Guardar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>

                <br />

            </Container>
        </>
    )
}

export default NewCertification
