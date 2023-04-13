import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import AxiosClient from '../../shared/http-client.gateway';

export const NewCandidate = () => {

    const [Person, setPerson] = useState([]);
    const [Certificaciones, setCertificaciones] = useState([]);
    const [Academys, setAcademys] = useState([]);
    const [account, setAccount] = useState([]);

    const getAccount = async () => {
        const accountJSN = JSON.parse(localStorage.getItem('account'));
        setAccount(accountJSN);
    }

    const getPerson = async () => {
        try {
            const dataPerson = await AxiosClient.doGet('/person/users', {});
            setPerson(dataPerson.data.data);
        } catch (error) {

        }
    }

    const getCertificaciones = async () => {
        try {
            console.log(account.user?.role)
            if (account.user?.role === "ADMIN") {
                const data = await AxiosClient.doGet(`/certification/withoutImages`, {});
                setCertificaciones(data.data.data);
                console.log(data.data.data)
            }

            if (account.user?.role === "GESTOR") {
                const data = await AxiosClient.doPost(`/certification/person/${account.id}`, {});
                setCertificaciones(data.data.data);
                console.log(data.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAcademys = async () => {
        try {
            const dataAcademy = await AxiosClient.doGet('/academy/', {});
            setAcademys(dataAcademy.data.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getAccount();
        getPerson();
        getCertificaciones();
        getAcademys();
    }, [account]);

    /* EL REQUEST DEBE SER ASI
    private Estado estado;
    private Long idAcademy;
    private Long idCertification;
    private Long idPerson;
    private LocalDate fechaFin;
    private double puntaje;
    private char grupo;
    private String clave;
    */

    const validationForm = Yup.object().shape({
        idPerson: Yup.string().required("Este campo no puede estar vacio"),
        idAcademy: Yup.string().required("Este campo no puede estar vacio"),
        idCertification: Yup.string().required("Este campo no puede estar vacio"),
        fechaFin: Yup.string().required("Este campo no puede estar vacio"),
        puntaje: Yup.string().required("Este campo no puede estar vacio").test('puntaje', 'Debe ser del 8 al 10', val => /^[8-9]|10$/.test(val)),
        grupo: Yup.string().required("Este campo no puede estar vacio").max(1, "El grupo no puede ser mayor a 1 caracter").matches(/^[A-F]+$/, "Ingrese un grupo valido"),
        clave: Yup.string().required("Este campo no puede estar vacio").max(10, "La clave no puede ser mayor a 10 caracteres")
    });



    return (
        <>
            <Container className='px-5 my-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Agregar candidatura</h2>
                <br />
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Formik
                                    initialValues={{
                                        idPerson: "",
                                        idAcademy: "",
                                        idCertification: "",
                                        fechaFin: "",
                                        puntaje: "",
                                        grupo: "",
                                        clave: "",
                                    }}
                                    validationSchema={validationForm}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        setSubmitting(true);
                                        console.log(values);
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
                                                    const data = await AxiosClient.doPost('/candidate/', {
                                                        idAcademy: values.idAcademy,
                                                        idCertification: values.idCertification,
                                                        idPerson: values.idPerson,
                                                        fechaFin: values.fechaFin,
                                                        puntaje: values.puntaje,
                                                        grupo: values.grupo,
                                                        clave: values.clave
                                                    });
                                                    Swal.fire({
                                                        title: 'Candidatura agregada correctamente',
                                                        icon: 'success',
                                                        showCancelButton: false,
                                                        confirmButtonText: 'Aceptar',
                                                        confirmButtonColor: '#019979',
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            window.location.href = `/candidate/${data.data.data.id}`;
                                                        }
                                                    })
                                                    setSubmitting(false);
                                                } catch (error) {
                                                    Swal.fire({
                                                        title: 'Error al agregar candidatura',
                                                        icon: 'error',
                                                        showCancelButton: false,
                                                        confirmButtonText: 'Aceptar',
                                                        confirmButtonColor: '#019979',
                                                    })
                                                    setSubmitting(false);
                                                }
                                            } else {
                                                Swal.fire({
                                                    title: '¡Cancelado!',
                                                    confirmButtonColor: '#019979',
                                                    icon: 'error',
                                                    confirmButtonText: 'Aceptar'
                                                })
                                                setSubmitting(false);
                                            }
                                        })
                                    }}
                                >
                                    {({ errors, touched, isSubmitting }) => (
                                        <Form>
                                            <Row>
                                                <Col className="col-md-6 mb-3">
                                                    <label>Persona</label>
                                                    <Field as="select" name="idPerson" className="form-control">
                                                        <option value="">Seleccione una opción</option>
                                                        {Person.map((item, index) => (
                                                            <option key={index} value={item.id}>{item.firstName} {item.lastName}</option>
                                                        ))}
                                                    </Field>
                                                    {errors.idPerson && touched.idPerson ? (
                                                        <div className="text-danger">{errors.idPerson}</div>
                                                    ) : null}
                                                </Col>

                                                <Col className="col-md-6 mb-3">
                                                    <label>¿Todavía no se ha registrado?</label>
                                                    <br></br>
                                                    <Link to="/newAccount" className="btn btn-primary btn-block" style={{ border: "none", backgroundColor: "#A0A5A1", width: "120px" }}>Dar de alta</Link>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col className="col-md-6 mb-3">
                                                    <label>Certificación</label>
                                                    <Field as="select" name="idCertification" className="form-control">
                                                        <option value="">Seleccione una opción</option>
                                                        {Certificaciones.map((item, index) => (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        ))}
                                                    </Field>
                                                    {errors.idCertification && touched.idCertification ? (
                                                        <div className="text-danger">{errors.idCertification}</div>
                                                    ) : null}
                                                </Col>

                                                <Col className="col-md-6 mb-3">
                                                    <label>Fecha de culminación</label>
                                                    <Field type="date" name="fechaFin" className="form-control" />
                                                    {errors.fechaFin && touched.fechaFin ? (
                                                        <div className="text-danger">{errors.fechaFin}</div>
                                                    ) : null}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col className="col-md-6 mb-3">
                                                    <label>Puntaje</label>
                                                    <Field type="number" name="puntaje" className="form-control" />
                                                    {errors.puntaje && touched.puntaje ? (
                                                        <div className="text-danger">{errors.puntaje}</div>
                                                    ) : null}
                                                </Col>

                                                <Col className="col-md-6 mb-3">
                                                    <label>Grupo</label>
                                                    <Field type="text" name="grupo" className="form-control" />
                                                    {errors.grupo && touched.grupo ? (
                                                        <div className="text-danger">{errors.grupo}</div>
                                                    ) : null}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col className="col-md-6 mb-3">
                                                    <label>Clave</label>
                                                    <Field type="text" name="clave" className="form-control" />
                                                    {errors.clave && touched.clave ? (
                                                        <div className="text-danger">{errors.clave}</div>
                                                    ) : null}
                                                </Col>

                                                <Col className="col-md-6 mb-3">
                                                    <label>Academia</label>
                                                    <Field as="select" name="idAcademy" className="form-control">
                                                        <option value="">Seleccione una opción</option>
                                                        {Academys.map((item, index) => (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        ))}
                                                    </Field>
                                                    {errors.idAcademy && touched.idAcademy ? (
                                                        <div className="text-danger">{errors.idAcademy}</div>
                                                    ) : null}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col className="col-md-12 mb-3 text-end">
                                                    <Button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ backgroundColor: "#002e60", width: "110px" }}>Registrar</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default NewCandidate
