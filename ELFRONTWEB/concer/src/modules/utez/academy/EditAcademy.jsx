import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../../shared/http-client.gateway';

import { useParams, Link, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";



export const EditAcademy = () => {


    const [Academy, setAcademy] = useState({
        id: '',
        name: '',
        fullName: '',
        status: '',
    });

    const { academy } = useParams()

    const getAcademy = async () => {
        try {
            const res = await AxiosClient.doGet(`/academy/${academy}`);
            console.log(res.data.data)
            setAcademy({
                id: res.data.data.id,
                name: res.data.data.name,
                fullName: res.data.data.fullName,
                status: res.data.data.status,
            });
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAcademy();
    }, [])

    const enviarDatos = async () => {
        try {

            const response = await AxiosClient.doPut(`/academy/`, Academy);
            
            if(!response.data.error){
                Swal.fire({
                    title: '¡Exito!',
                    icon: 'success',
                    text: 'La academia ha sido actualizada.',
                    confirmButtonColor: '#019979',
                    confirmButtonText: 'Aceptar'
                    
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/utez'
                    }
                })
            }else{
                Swal.fire(
                    'Vaya...',
                    'Algo a salido mal, intentelo de nuevo.',
                    'error'
                )
            }

        } catch (error) {
            Swal.fire(
                '¡Error!',
                'La academia no ha sido actualizada.',
                'error'
            )
        }
    }

    return (
        <>
            <Container className='px-5 mt-3'>
            <h2 className="text-center" style={{ color: "#002e60" }}>Editar academia</h2>
                <br />
                <Card>
                    <Card.Body>
                        <Formik
                            initialValues={Academy}

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
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        enviarDatos();
                                    } else {
                                        Swal.fire({
                                            title: '¡Operación cancelada!',
                                            text: "Registro no procesado",
                                            icon: 'error',
                                            confirmButtonText: 'Aceptar',
                                            confirmButtonColor: '#019979'

                                        })
                                    }
                                })
                            }}
                        >

                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Row>
                                        <Col className="col-md-6">

                                            <label htmlFor="name">Abreviatura</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="form-control"

                                                value={Academy.name}
                                                onChange={(e) => setAcademy({ ...Academy, name: e.target.value })}
                                            />
                                        </Col>
                                        <Col className="col-md-6">
                                            <label htmlFor="fullName">Expansión</label>
                                            <Field
                                                type="text"
                                                name="fullName"
                                                className="form-control"
                                                value={Academy.fullName}
                                                onChange={(e) => setAcademy({ ...Academy, fullName: e.target.value })}

                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className='mb-3'>
                                        <Col className="col-md-12 text-end">
                                            <Button style={{ backgroundColor: "#002e60", color: "white" }} type="submit" className="btn btn-primary">
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

export default EditAcademy