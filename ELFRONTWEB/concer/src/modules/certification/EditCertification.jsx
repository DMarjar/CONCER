import React, {useEffect, useState} from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../shared/http-client.gateway';
import { useParams, Link } from 'react-router-dom'
import Swal from "sweetalert2";


export const EditCertification = () => {
    const [payload, setPayload] = useState({
        id: '',
        name: '',
        version: '',
        idPerson: '',
        pictureBase64: '',
        idCompany: ''
    });
    const {certification} = useParams();
    const [person, setPerson] = useState([]);

    const getCertification = async () => {
        try {
            const data = await AxiosClient.doPost(`/certification/one/${certification}`, {});
            console.log(data.data.data[0])
            setPayload({
                id: data.data.data[0][0],
                name: data.data.data[0][1],
                version: data.data.data[0][4],
                idPerson: data.data.data[0][6],
                pictureBase64: data.data.data[0][2],
                idCompany: data.data.data[0][7],
              });
        } catch (error) {
            console.log(error)
        }
    }

    const getPerson = async () => {
        try {
            const data = await AxiosClient.doGet('/person/certifiers', {});
            setPerson(data.data.data);
            console.log(data.data.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getCertification();
        getPerson();
    }, [certification])



    return (
        <>
            <Container className='px-5 mt-3 '>
                <h2 className='text-center' style={{ color: "#002e60" }}>Editar Certificacion</h2>
                <br />
                <Card className='p-3'>
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
                                            const data = await AxiosClient.doPut(`/certification/`, payload);
                                            console.log(data)
                                            Swal.fire({
                                                title: '!Actualizado!',
                                                text: 'Se edito la información',
                                                confirmButtonColor: '#019979',
                                                icon: 'success',
                                                confirmButtonText: 'Aceptar'
                                            })
                                        } catch (error) {
                                            console.log(error)
                                            Swal.fire({
                                                title: 'Vaya..',
                                                text: 'ocurrio un error al intentar guardar los cambios',
                                                icon: 'error',                                                
                                                confirmButtonText: 'Aceptar',
                                                confirmButtonColor: '#019979',
                                            })
                                        }
                                    }else{
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
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Row>
                                        <Col className='col-12'>
                                            <label>Nombre de la certificación</label>
                                            <Field 
                                                name="name" 
                                                type="text" 
                                                className="form-control" 
                                                value={payload.name}

                                                onChange={(e) =>{
                                                    
                                                    setPayload({ ...payload, name: e.target.value })} 
                                                } />
                                            {errors.name && touched.name ? (
                                                <div className="text-danger">{errors.name}</div>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col className='col-12'>
                                            <label>Versión</label>
                                            <Field 
                                                name="version" 
                                                type="text" 
                                                className="form-control" 
                                                value={payload.version} 
                                                onChange={(e) => setPayload({ ...payload, version: e.target.value })}
                                                />
                                            {errors.version && touched.version ? (
                                                <div className="text-danger">{errors.version}</div>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col className='col-12'>
                                            <label>Gestor que estara a Cargo</label>
                                            <Field 
                                                name="idPerson" 
                                                as="select" 
                                                className="form-control" 
                                                value={payload.idPerson}
                                                onChange={(e) => setPayload({ ...payload, idPerson: parseInt(e.target.value) })}
                                            >
                                                {person.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.firstName} {item.lastName}</option>
                                                ))}
                                            </Field>
                                            {errors.idPerson && touched.idPerson ? (
                                                <div className="text-danger">{errors.idPerson}</div>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col className='col-12'>
                                            <label>Imagen</label>
                                            <br />
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
                                        <Col className='col-12'>
                                            <Button type="submit" style={{ width: "110px", backgroundColor: "#002e60" }} className="btn btn-primary me-4" disabled={isSubmitting}>
                                                Guardar
                                            </Button>
                                            <Link to={`/certification/${certification}`} style={{ width: "110px", backgroundColor: "#A0A5A1", borderColor: "#A0A5A1" }} className="btn btn-danger ml-2">Cancelar</Link>
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