import React, {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../shared/http-client.gateway';
import { useParams, Link } from 'react-router-dom'
import Swal from "sweetalert2";


export const EditCandidate = () => {
    const [people, setPeople] = useState([]);
    const [academies, setAcademies] = useState([]);
    const [certificaciones, setCertificaciones] = useState([]);
    const [payload, setPayload] = useState({
        id: '',
        fechaFin: '',
        estado: '',
        puntaje: '',
        clave: '',
        grupo: '',
        idPerson: '',
        idCertification: '',
        idAcademy: '',

    });
    const {candidatura} = useParams();

    const getCandidature = async () => {
        try {
            const data = await AxiosClient.doPost(`/candidate/one/${candidatura}`, {});
            setPayload({
                id: data.data.data[0][0],
                fechaFin: data.data.data[0][3],
                estado: data.data.data[0][1],
                puntaje: data.data.data[0][5],
                clave: data.data.data[0][7],
                grupo: data.data.data[0][6],
                idPerson: data.data.data[0][8],
                idCertification: data.data.data[0][10],
                idAcademy: data.data.data[0][9],
            });
        } catch (error) {
        }
    }

    const getCertificaciones = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('account'));
            if(user.user.role === "ADMIN"){
                const data = await AxiosClient.doGet(`/certification/withoutImages`, {});
                setCertificaciones(data.data.data);
            }else{
                const data = await AxiosClient.doPost(`/certification/person/${user.id}`, {});
                console.log(data.data.data)
                setCertificaciones(data.data.data);
            }
        } catch (error) {
        }
    }

    const getAcademies = async () => {
        try {
            const data = await AxiosClient.doGet(`/academy/`, {});
            setAcademies(data.data.data);
        } catch (error) {

        }
    }


    useEffect(() => {
        getCandidature();
        getCertificaciones();
        getAcademies();
    }, [candidatura]);


    const enviarDatos = async () => {
        try {
            const response = await AxiosClient.doPut(`/candidate/`, payload);
            
            if (!response.data.error) {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: 'La candidatura ha sido actualizada.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'

                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/candidates';
                    }
                })   
            }else{
                Swal.fire(
                    'Vaya...',
                    'Algo salió mal, intenta de nuevo.',
                    'error'
                )
            }
        } catch (error) {
            console.log(error)
            Swal.fire(
                'Vaya...',
                'Algo salió mal, intenta de nuevo.',
                'error'
            )
        }
    }

    return (
        <>
            <Container className='px-5 mt-3'>
                <h1 className='text-center' style={{ color: "#002e60" }}>Editar Candidatura</h1>
                <br />
                <Card className='mt-3'>
                    <Card.Body>
                        <Formik
                            initialValues={payload}
                            onSubmit={async (values, { setSubmitting }) => {
                                Swal.fire({
                                    title: '¿Estás seguro?',
                                    text: "",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Si, actualizar!'
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        enviarDatos();
                                    }else{
                                        Swal.fire(
                                            '',
                                            'Actualización cancelada',
                                            'error'
                                        )
                                    }
                                })

                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <br />
                                    <Row>
                                        <Col>
                                            <label>Puntaje</label>
                                            <Field
                                                type="number"
                                                name="puntaje"
                                                value={payload.puntaje}
                                                onChange={(e) => setPayload({...payload, puntaje: e.target.value})}
                                                className="form-control"
                                            />
                                        </Col>
                                        <Col>
                                            <label>Clave</label>
                                            <Field
                                                type="text"
                                                name="clave"
                                                value={payload.clave}
                                                onChange={(e) => setPayload({...payload, clave: e.target.value})}
                                                className="form-control"
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <label>Grupo</label>
                                            <Field
                                                type="text"
                                                name="grupo"
                                                value={payload.grupo}
                                                onChange={(e) => setPayload({...payload, grupo: e.target.value})}
                                                className="form-control"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <label>Fecha de finalización</label>
                                            <Field
                                                type="date"
                                                name="fechaFin"
                                                className="form-control"
                                                value={payload.fechaFin}
                                                onChange={(e) => setPayload({...payload, fechaFin: e.target.value})}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <label>Certificación</label>
                                            <Field
                                                as="select"
                                                name="idCertificacion"
                                                className="form-control"
                                                value={payload.idCertification}
                                                onChange={(e) => setPayload({...payload, idCertification: e.target.value})}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                {certificaciones.map((certificacion) => (
                                                    <option value={certificacion.id}>{certificacion.name}</option>
                                                ))}
                                            </Field>
                                        </Col>
                                        <Col>
                                            <label>Academia</label>
                                            <Field
                                                as="select"
                                                name="idAcademy"
                                                className="form-control"
                                                value={payload.idAcademy}
                                                onChange={(e) => setPayload({...payload, idAcademy: e.target.value})}
                                            >
                                                <option value="0">Selecciona una opción</option>
                                                {academies.map((academy) => (
                                                    <option value={academy.id}>{academy.name}</option>
                                                ))}
                                            </Field>
                                        </Col>
                                    </Row>
                                    <br />
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

export default EditCandidate