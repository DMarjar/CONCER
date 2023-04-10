import React, {useState} from 'react'
import { Button, Col, Container, Figure, Row, Card } from 'react-bootstrap'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AxiosClient from '../../../shared/http-client.gateway';
import Swal from "sweetalert2";


export const NewAcademy = () => {

    const [Academy, setAcademy] = useState({
        name: '',
        fullName: '',
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Este campo no puede estar vacio"),
        fullName: Yup.string().required("Este campo no puede estar vacio"),
    });

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Agregar Academia</h2>
                <br />
                <Card>
                    <Card.Body>
                        
                            <Row>
                                <Col className="col-md-12">
                                    <Formik
                                        initialValues={Academy}
                                        validationSchema={validationSchema}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setSubmitting(true);
                                            Swal.fire({
                                                title: "¿Estas seguro?",
                                                text: "",
                                                icon: "question",
                                                showCancelButton: true,
                                                confirmButtonText: "Si, agregar",
                                                cancelButtonText: "Cancelar",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    AxiosClient.doPost('/academy/', values)
                                                        .then(res => {
                                                            Swal.fire({
                                                                title: "¡Éxito!",
                                                                text: "Academia agregada correctamente",
                                                                icon: "success",
                                                                showCancelButton: false,
                                                                confirmButtonText: "Aceptar",
                                                            })                                                             
                                                            setSubmitting(false);
                                                            window.location.reload();     
                                                        })
                                                        .catch(err => {
                                                            Swal.fire({
                                                                title: "vaya...",
                                                                text: "Algo salio mal",
                                                                icon: "error",
                                                                showCancelButton: false,
                                                                confirmButtonText: "Aceptar",
                                                            })
                                                            setSubmitting(false);
                                                        });
                                                }else{
                                                    Swal.fire({
                                                        title: "¡Cancelado!",
                                                        text: "",
                                                        icon: "error",
                                                        showCancelButton: false,
                                                        confirmButtonText: "Aceptar",
                                                    })
                                                    setSubmitting(false);
                                                }
                                            });
                                        }}
                                    >
                                        {({ errors, touched, isSubmitting }) => (
                                            <Form>
                                                <Row>
                                                    <Col className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Nombre</label>
                                                            <Field
                                                                type="text"
                                                                name="name"
                                                                className={`form-control ${
                                                                    touched.name && errors.name ? "is-invalid" : ""
                                                                    }`}
                                                            />
                                                            <div className="invalid-feedback">{errors.name}</div>
                                                        </div>
                                                    </Col>
                                                    <Col className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="fullName">Nombre Completo</label>
                                                            <Field
                                                                type="text"
                                                                name="fullName"
                                                                className={`form-control ${
                                                                    touched.fullName && errors.fullName ? "is-invalid" : ""
                                                                    }`}
                                                            />
                                                            <div className="invalid-feedback">{errors.fullName}</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <div className="form-group">
                                                    <Button type="submit" disabled={isSubmitting}>
                                                        Agregar
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Col>
                                
                                </Row>
                        
                    </Card.Body>
                </Card>

                <Row>
                <Col className="col-md-8">
                                <img
                                    className="d-block h-100 w-100"
                                    src={`data:image/png;base64, `}
                                    alt={`una imagen para que no se vea vacio (que yo no pondre)`}
                                    style={{ height: '100%', width:'100%', maxHeight:'300px', objectFit: 'contain'  }}
                                    />
                                </Col>
                </Row>
            </Container>       
        </>
    )
}

export default NewAcademy
