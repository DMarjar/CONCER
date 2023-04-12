import React, {useEffect, useState} from "react";
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

    const {academy} = useParams()

    const getAcademy = async () => {
        try{
            const res = await AxiosClient.doGet(`/academy/${academy}`);
            console.log(res.data.data)
            setAcademy({
                id: res.data.data.id,
                name: res.data.data.name,
                fullName: res.data.data.fullName,
                status: res.data.data.status,
            });
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        getAcademy();
    }, [])

    return (
        <>
            <Container>
                <h4 className='text-center' style={{ color: "#002e60" }}>Editar</h4>
                <br />
                <Card>
                    <Card.Body>
                        <Formik
                            initialValues={Academy}
                            onSubmit={async (values, { setSubmitting }) => {
                                Swal.fire({
                                    title: '¿Está seguro?',
                                    text: "",
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonText: '¡Si, actualizar!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        try{
                                            const data = AxiosClient.doPut(`/academy/`, Academy);
                                            console.log(data)
                                            Swal.fire(
                                                '¡Actualizado!',
                                                'La academia ha sido actualizada.',
                                                'success'
                                            )
                                            
                                        }catch(error){
                                            Swal.fire(
                                                '¡Error!',
                                                'La academia no ha sido actualizada.',
                                                'error'
                                            )
                                        }
                                    }else{
                                        Swal.fire(
                                            '¡Cancelado!',
                                            'La academia no ha sido actualizada.',
                                            'error'
                                        )
                                    }
                                })
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Row>
                                        <Col className="col-md-6">
                                            <label htmlFor="name">Nombre</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={Academy.name}
                                                onChange={(e) => setAcademy({ ...Academy, name: e.target.value })}
                                            />
                                        </Col>
                                        <Col className="col-md-6">
                                            <label htmlFor="fullName">Nombre completo</label>
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
                                    <Row>
                                        <Col className="col-md-12">
                                            <Button type="submit" variant="primary" className="float-right">Guardar</Button>
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