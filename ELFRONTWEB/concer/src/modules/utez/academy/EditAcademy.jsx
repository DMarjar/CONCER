import React, {useEffect, useState} from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../../shared/http-client.gateway';
import { useParams, Link } from 'react-router-dom'
import Swal from "sweetalert2";



export const EditAcademy = () => {

    const [payload, setPayload] = useState({
        id: "",
        name: "",
        fullName: "",
    });

    const {academy} = useParams();

    const getAcademy = async () => {
        try {
            const data = await AxiosClient.doGet(`/academy/${academy}`, {});
            console.log(data.data.data)
            setPayload({
                id: data.data.data.id,
                name: data.data.data.name,
                fullName: data.data.data.fullName,
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        getAcademy();
    }, [academy])


    return (
        <>
            <Container className="mt-4">
                <h4 className='text-center' style={{ color: "#002e60" }}>Editar Academia</h4>
                <br />
                <Card>
                    <Card.Body>
                        <Formik
                            initialValues={payload}
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
                                            const data = AxiosClient.doPut(`/academy/`, payload);
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
                            {({ isSubmitting }) => (
                                <Form>
                                    <Row>
                                        <Col>
                                            <label htmlFor="name">Nombre</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Nombre"
                                                value={payload.name}
                                                onChange={(e) => setPayload({...payload, name: e.target.value})}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <label htmlFor="fullName">Nombre Completo</label>
                                            <Field
                                                type="text"
                                                name="fullName"
                                                className="form-control"
                                                placeholder="Nombre Completo"
                                                value={payload.fullName}
                                                onChange={(e) => setPayload({...payload, fullName: e.target.value})}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Actualizar
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