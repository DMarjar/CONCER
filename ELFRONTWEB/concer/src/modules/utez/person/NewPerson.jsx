import React, {useContext, useState} from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, Col, Container, Row } from "react-bootstrap";
import AuthContext from "../../auth/AuthContext";
import AxiosClient from '../../../shared/http-client.gateway';
import Swal from "sweetalert2";

export const NewPerson = () => {

    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        typePerson: "",
        user: {
            username: "",
            password: "",
            role: ""
        }
    });

    const { isRole } = useContext(AuthContext);
    

    const validationForm = Yup.object().shape({
        firstName: Yup.string().required("Required").matches(/^[a-zA-Z\s\u00C0-\u00FF'-]+$/, "No debe contener números o caracteres especiales"),
        lastName: Yup.string().required("Required").matches(/^[a-zA-Z\s\u00C0-\u00FF'-]+$/, "No debe contener números o caracteres especiales"),
        phoneNumber: Yup.string().required("Required").min(10, "Invalid phone number").max(10, "Invalid phone number").matches(/^[0-9]+$/, "Invalid phone number"),
        email: Yup.string().email("Invalid email").required("Required"),
        gender: Yup.string().required("Required"),
        typePerson: Yup.string().required("Required"),
        user: Yup.object().shape({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required").min(6, "minimo 6 caracteres"),
            role: Yup.string().required("Required"),
        }),
    });

  return (
    <>
      <Container className="px-5 mt-3">
        <h1 className="text-center" style={{ color: "#002e60" }}>
          Registrar Cuenta
        </h1>
        <br/>
        <Card>
            <Card.Body>
                    <Formik
                    initialValues={payload}
                    validationSchema={validationForm}
                    onSubmit={(values, { setSubmitting }) => {
                        Swal.fire({
                            text: "Esta seguro de registrar la cuenta?",
                            icon: "question",
                            confirmButtonTextr: "Guardar",
                            showCancelButton: true,
                            cancelButtonText: "Cancelar",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                (async () => {
                                    try {
                                        console.log(values)
                                        await AxiosClient.doPost("/person/", values);
                                        Swal.fire({
                                            text: "Se registro correctamente",
                                            icon: "success",
                                            timer: 2000,
                                        });
                                        setSubmitting(false);
                                    } catch (error) {
                                        console.log(error)
                                        Swal.fire({
                                            text: "Error al registrar",
                                            icon: "error",
                                            timer: 2000,
                                        });
                                        setSubmitting(false);
                                    }
                                })();
                            }else{
                                Swal.fire({
                                    text: "Se cancelo el registro",
                                    icon: "error",
                                    timer: 2000,
                                });
                                setSubmitting(false);
                            }
                            
                        });
                    }}
                >

                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <Row>
                                <Col className="col-md-6 mb-3">
                                    <label>Nombres</label>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        className="form-control"
                                    />
                                    {errors.firstName && touched.firstName ? (
                                        <div className="text-danger">
                                            {errors.firstName}
                                        </div>
                                    ) : null}
                                </Col>

                                <Col className="col-md-6 mb-3">
                                    <label>Apellidos</label>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        className="form-control"
                                    />
                                    {errors.lastName && touched.lastName ? (
                                        <div className="text-danger">
                                            {errors.lastName}
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-md-6 mb-3">
                                    <label>Telefono</label>
                                    <Field
                                        name="phoneNumber"
                                        type="text"
                                        className="form-control"
                                    />
                                    {errors.phoneNumber && touched.phoneNumber ? (
                                        <div className="text-danger">
                                            {errors.phoneNumber}
                                        </div>
                                    ) : null}
                                </Col>
                                <Col className="col-md-6 mb-3">
                                    <label>Correo</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="form-control"
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="text-danger">
                                            {errors.email}
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-md-6 mb-3">
                                    <label>Genero</label>
                                    <Field
                                        as="select"
                                        name="gender"
                                        className={`form-select ${
                                          touched.gender && errors.gender ? "is-invalid" : ""
                                        }`}
                                      >
                                        <option value="" label="" />
                                        <option value="MASCULINO" label="Masculino" />
                                        <option value="FEMENINO" label="Femenino" />
                                      </Field>
                                </Col>
                                <Col className="col-md-6 mb-3">
                                    <label>Tipo de persona</label>
                                    <Field
                                        as="select"
                                        name="typePerson"
                                        className={`form-select ${
                                            touched.typePerson && errors.typePerson ? "is-invalid" : ""
                                        }`}
                                    >
                                        <option value="" label="" />
                                        <option value="ESTUDIANTE" label="Estudiente" />
                                        <option value="PROFESOR" label="Profesor" />
                                        <option value="ADMINISTRATIVO" label="Administrativo" />
                                        <option value="EXTERNO" label="Externo" />
                                    </Field>
                                </Col>
                            </Row>
                            <br/>
                            <hr/>
                            <Row>
                                <Col className="col-md-6 mb-3">
                                    <label>Usuario</label>
                                    <Field
                                        name="user.username"
                                        type="text"
                                        className="form-control"
                                    />
                                    {errors.user && errors.user.username && touched.user && touched.user.username ? (
                                        <div className="text-danger">
                                            {errors.user.username}
                                        </div>
                                    ) : null}
                                </Col>
                                <Col className="col-md-6 mb-3">
                                    <label>Contraseña</label>
                                    <Field
                                        name="user.password"
                                        type="password"
                                        className="form-control"
                                    />
                                    {errors.user && errors.user.password && touched.user && touched.user.password ? (
                                        <div className="text-danger">
                                            {errors.user.password}
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
                            <Row
                                className="mt-3"
                                style={{ display: "flex", justifyContent: "center" }}
                            >
                                <Col className="col-md-6">
                                    <label>Rol</label>
                                    <Field
                                        as="select"
                                        name="user.role"
                                        className={`form-select ${
                                            touched.user && touched.user.role && errors.user && errors.user.role ? "is-invalid" : ""
                                        }`}
                                    >
                                        {
                                            isRole === "ADMIN" ? 
                                            (
                                                <>
                                                    <option value="" label="" />
                                                    <option value="ADMIN" label="Administrador" />
                                                    <option value="USER" label="Usuario" />
                                                    <option value="GESTOR" label="Gestor (certificador)" />
                                                </>
                                                
                                            ):
                                            (
                                                <>
                                                    <option value="" label="" />
                                                    <option value="USER" label="Usuario" />
                                                </> 
                                            )

                                        }
                                        
                                    </Field>
                                </Col>
                            </Row>
                            <br/>
                            <Row
                                className="mt-3"
                                style={{ display: "flex", justifyContent: "center" }}
                            >
                                
                                <Col className="col-md-1">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={isSubmitting}
                                    >
                                        Registrar
                                    </button>   
                                </Col>

                            </Row>

                        </Form>
                    )}
                </Formik>
            </Card.Body>
            
        </Card>
      </Container>
    </>
  );
};

export default NewPerson;
