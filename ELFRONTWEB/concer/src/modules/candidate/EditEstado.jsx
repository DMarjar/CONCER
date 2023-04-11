import React, {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../shared/http-client.gateway';
import { useParams, Link, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";



export const EditEstado = () => {
    const navegacion = useNavigate();

    const [payload, setPayload] = useState({
        id: "",
        picture: "",
    });
    const {candidatura} = useParams();

    return(
        <>
            <Container className="my-3">
                <h2 className="text-center" style={{ color: "#002e60" }}>Editar Estado</h2>
                <br />
                <Card>
                    <Card.Body>
                        <Formik
                            initialValues={payload.picture}
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
                                            const data = AxiosClient.doPost(`/candidate/estado`, payload);
                                            Swal.fire(
                                                '¡Actualizado!',
                                                'El estado ha sido actualizado.',
                                                'success'
                                            )
                                            
                                        }catch(error){
                                            Swal.fire(
                                                '¡Error!',
                                                'El estado no ha sido actualizado.',
                                                'error'
                                            )
                                        }
                                    }else{
                                        Swal.fire(
                                            '¡Cancelado!',
                                            'El estado no ha sido actualizado.',
                                            'error'
                                        )
                                    }
                                })
                            }}

                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Row className="mb-3">
                                        <Col sm={12}  >
                                            <div style={{height:'400px', width:'100%'}}>
                                            {
                                            payload.picture !== "" ? (
                                                <div className="d-flex justify-content-center align-items-center" style={{height:'100%', width:'100%'}}>
                                                    <Card>
                                                        <img src={`data:image/png;base64, ${payload.picture}`} alt="preview" className="img-thumbnail" style={{width:'auto', maxHeight:'400px'}} />
                                                    </Card>
                                                </div>  
                                            ) : (
                                                <div className="d-flex justify-content-center align-items-center" style={{height:'100%', width:'100%'}}>
                                                    <Card  style={{height:'90%', width:'70%'}}>
                                                        <div className="d-flex justify-content-center align-items-center" style={{height:'100%', width:'100%', backgroundColor:'#f2f2f2'}}>
                                                        <span style={{color:'#303030'}}>Ingrese fotografía del candidato con su certificado para actualizar su estado</span>
                                                        </div>
                                                    </Card>
                                                </div>  
                                            )
                                        }
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={12} className="text-center">
                                            <label htmlFor="fecha">Imagen</label>
                                            <br/>
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
                                                            const base64 = e.target.result;
                                                            if (base64) {
                                                                setPayload({
                                                                    id: candidatura,
                                                                    picture: base64.toString().replace(/^data:image\/(png|jpeg);base64,/, "")
                                                                })
                                                            } 
                                                        }
                                                        reader.readAsDataURL(file);
                                                    }
                                                }
                                            />
                                            <br/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={12} className="text-center">
                                            <Button type="submit" variant="primary" disabled={isSubmitting}>
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

export default EditEstado