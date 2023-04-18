import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row, Button, Alert } from 'react-bootstrap'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import AxiosClient from '../../shared/http-client.gateway';
import Select from 'react-select'

export const NewCandidate = () => {
    const [payload, setPayload] = useState({
        idPerson: "",
        idAcademy: "",
        idCertification: "",
        fechaFin: "",
        puntaje: "",
        grupo: "",
        clave: "",
    })

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
            if (account.user?.role === "ADMIN") {
                const data = await AxiosClient.doGet(`/certification/withoutImages`, {});
                setCertificaciones(data.data.data);
            }

            if (account.user?.role === "GESTOR") {
                const data = await AxiosClient.doPost(`/certification/person/${account.id}`, {});
                setCertificaciones(data.data.data);
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
    }, []);

    useEffect(() => {     
        getPerson();
        getCertificaciones();
        getAcademys();
    }, [account]);


    const validationForm = Yup.object().shape({
        idAcademy: Yup.string().required("Este campo no puede estar vacio"),
        idCertification: Yup.string().required("Este campo no puede estar vacio"),
        fechaFin: Yup.string().required("Este campo no puede estar vacio"),
        puntaje: Yup.string().required("Este campo no puede estar vacio").test('puntaje', 'Debe ser del 8 al 10', val => /^[8-9]|10$/.test(val)),
        grupo: Yup.string().required("Este campo no puede estar vacio").max(1, "El grupo no puede ser mayor a 1 caracter").matches(/^[A-F]+$/, "Ingrese un grupo valido"),
        clave: Yup.string().required("Este campo no puede estar vacio").max(10, "La clave no puede ser mayor a 10 caracteres")
    });

    const enviarDatos = async(e) =>{
        try{
            const response = await AxiosClient.doPost('/candidate/', {
            idPerson: payload.idPerson,
            idAcademy: e.idAcademy,
            idCertification: e.idCertification,
            fechaFin: e.fechaFin,
            puntaje: e.puntaje,
            grupo: e.grupo,
            clave: e.clave

            })
            if(!response.data.error){
                Swal.fire({
                    title: '¡Candidatura agregada!',
                    icon: 'success',
                    confirmButtonColor: '#019979',
                    confirmButtonText: 'Aceptar'
                    
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/candidates'
                    }
                })
            }else{
                Swal.fire({
                    title: 'Vaya...',
                    text: `${response.data.message}`,
                    icon: 'error',
                    confirmButtonColor: '#019979',
                    confirmButtonText: 'Aceptar'
                })
            }
        }catch(error){
            console.log(error)
            Swal.fire({
                title: 'Vaya...',
                icon: 'error',
                text: `${error}`,
                confirmButtonColor: '#019979',
            })
        }       
    }

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
                                    initialValues={payload}
                                    validationSchema={validationForm}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        setSubmitting(true);

                                        Swal.fire({
                                            title: '¿Está usted seguro?',
                                            text: "",
                                            icon: 'question',
                                            showCancelButton: true,
                                            confirmButtonColor: '#019979',
                                            cancelButtonColor: '#A0A5A1',
                                            confirmButtonText: '!Sí, Agregar!',
                                            cancelButtonText: 'Cancelar'
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                try {
                                                    enviarDatos(values);
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
                                                    <Select
                                                        placeholder="Seleccione una opcion"
                                                        name="idPerson"
                                                        required
                                                        options={
                                                            Person.map((item, index) => ({
                                                                label: `${item.firstName} ${item.lastName}`,
                                                                value: item.id
                                                            }))
                                                        }
                                                        onChange={(e) => {
                                                            setPayload({
                                                                ...payload,
                                                                idPerson: e.value
                                                            })
                                                        }}
                                                    />
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
                                                    <Button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ backgroundColor: "#002e60", width: "110px" }}>Guardar</Button>
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
