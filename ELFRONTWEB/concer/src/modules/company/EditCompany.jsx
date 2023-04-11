import React, {useEffect, useState} from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../shared/http-client.gateway';
import { useParams, Link } from 'react-router-dom'
import Swal from "sweetalert2";



export const EditCompany = () => {

    const [payload, setPayload] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        pictureBase64: "",
    });

    const {company} = useParams();

    const getCompany = async () => {
        try {
            const data = await AxiosClient.doGet(`/certifyingCompany/${company}`, {});
            console.log(data.data.data)
            setPayload({
                id: data.data.data.id,
                name: data.data.data.name,
                email: data.data.data.email,
                phone: data.data.data.phone,
                pictureBase64: data.data.data.pictureBase64,
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        getCompany();
    }, [company])

    return(
        <>
            <Container className="mt-3">
                <h2 className='text-center' style={{ color: "#002e60" }}>Editar Empresa Certificadora</h2>
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
                                            const data = AxiosClient.doPut(`/certifyingCompany/`, payload);
                                            Swal.fire(
                                                '¡Actualizado!',
                                                'La empresa ha sido actualizada.',
                                                'success'
                                            )
                                            
                                        }catch(error){
                                            Swal.fire(
                                                '¡Error!',
                                                'La empresa no ha sido actualizada.',
                                                'error'
                                            )
                                        }
                                    }else{
                                        Swal.fire(
                                            '¡Cancelado!',
                                            'La empresa no ha sido actualizada.',
                                            'error'
                                        )
                                    }
                                })
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
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
                                        <Col>
                                            <label htmlFor="email">Correo</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Correo"
                                                value={payload.email}
                                                onChange={(e) => setPayload({...payload, email: e.target.value})}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <label htmlFor="phone">Teléfono</label>
                                            <Field
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Teléfono"
                                                value={payload.phone}
                                                onChange={(e) => setPayload({...payload, phone: e.target.value})}
                                            />
                                        </Col>
                                        <Col>
                                            <label htmlFor="pictureBase64">Logo</label>
                                            <input
                                                type="file" 
                                                className="form-control-file"
                                                id="picture"
                                                name="picture"
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
                                                                if (aspectRatio > 1.2 || aspectRatio < 0.8) {
                                                                    Swal.fire(
                                                                        'Error!',
                                                                        'La imagen debe ser lo mas cuadrada posible.',
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
                                                        }
                                                        reader.readAsDataURL(file);
                                                    }
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <div id="preview" className="text-center">
                                                {
                                                    payload.pictureBase64 ? (
                                                        <img src={`data:image/png;base64, ${payload.pictureBase64}`} alt="preview" className="img-thumbnail" style={{maxHeight:'200px'}} />
                                                    ) : null
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="btn btn-primary"
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

export default EditCompany