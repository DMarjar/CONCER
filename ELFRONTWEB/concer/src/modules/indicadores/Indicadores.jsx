import React, { useState, useEffect }  from 'react'
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import { Button, Container, Card, Row, Col} from 'react-bootstrap';
import AxiosClient from '../../shared/http-client.gateway';


export const Indicadores = () => {

    const [Estadisticas, setEstadisticas] = useState("GENERALES");
    const [payload, setPayload] = useState([]);

    //datos
    const getEstadisticasGenerales = async () => {
        try {
            const data = await AxiosClient.doGet('/stats/', {});
            setPayload(data.data.data)
        } catch (error) {
            
        }
    }
    const getEstadisticasCandidate = async () => {
        try {
            const data = await AxiosClient.doGet('/stats/candidate', {});
            setPayload(data.data.data)
        } catch (error) {
            
        }
    }
    const getEstadisticasCertification = async () => {
        try {
            const data = await AxiosClient.doGet('/stats/certification', {});
            setPayload(data.data.data)
        } catch (error) {
            
        }
    }
    const getEstadisticasAcademy = async () => {
        try {
            const data = await AxiosClient.doGet('/stats/academy', {});
            setPayload(data.data.data)
        } catch (error) {

        }
    }
    const getEstadisticasGestor = async () => {
        try {
            const data = await AxiosClient.doGet('/stats/gestor', {});
            console.log(data.data.data)
            setPayload(data.data.data)
        } catch (error) {

        }
    }


    //columnas
    const generalStatsColums = React.useMemo(() => [
        {
            name: 'Total de Certificaciones',
            cell: row => <div>{row.totalCertifications}</div>,
        },
        {
            name: 'Total de Candidatos',
            cell: row => <div>{row.totalCandidates}</div>,
        },
        {
            name: 'Pendientes',
            cell: row => <div>{row.totalPendingCandidates}</div>,
        },
        {
            name: 'Entregados',
            cell: row => <div>{row.totalFinishedCandidates}</div>,
        },
        {
            name: 'Pendientes (%)',
            cell: row => <div>{row.pendingPercentage}</div>,
        },
        {
            name: 'Entregados (%)',
            cell: row => <div>{row.finishedPercentage}</div>,
        },
        {
            name: 'Puntuacion Promedio',
            cell: row => <div>{row.averageScore}</div>,
        }
    
    ]);

    const candidateStatsColums = React.useMemo(() => [
        {
            name: 'Mas popular',
            cell: row => <div>{row.mostPopularCertification}</div>,
        },
        {
            name: 'No. Candidaturas',
            cell: row => <div>{row.mostPopularCertificationCount}</div>,
        },
        {
            name: 'Puntuacion Promedio',
            cell: row => <div>{row.mostPopularCertificationAverageScore}</div>,
        },
        {
            name: 'Menos popular',
            cell: row => <div>{row.leastPopularCertification}</div>,
        },
        {
            name: 'No. Candidaturas',
            cell: row => <div>{row.leastPopularCertificationCount}</div>,
        },
        {
            name: 'Puntuacion Promedio',
            cell: row => <div>{row.leastPopularCertificationAverageScore}</div>,
        }
    ]);

    const certificationStatsColums = React.useMemo(() => [
        {
            name: 'Certificacion',
            cell: row => <div>{row.name}</div>,
        },
        {
            name: 'version',
            cell: row => <div>{row.version}</div>,
        },
        {
            name: 'No. Candidaturas',
            cell: row => <div>{row.totalCandidates}</div>,
        },
        {
            name: 'Puntaje Promedio',
            cell: row => <div>{row.averageScore}</div>,
        },
        {
            name: 'Pendientes (%)',
            cell: row => <div>{row.failPercentage}</div>,
        },
        {
            name: 'Entregados (%)',
            cell: row => <div>{row.passPercentage}</div>,
        },
    ]);

    const academyStatsColums = React.useMemo(() => [
        {
            name: 'Academia',
            cell: row => <div>{row.name}</div>,
        },
        {
            name: 'No. Candidaturas',
            cell: row => <div>{row.totalCandidates}</div>,
        },
        {
            name: 'Puntaje Promedio',
            cell: row => <div>{row.averageScore}</div>,
        },
        {
            name: 'Pendientes (%)',
            cell: row => <div>{row.failPercentage}</div>,
        },
        {
            name: 'Entregados (%)',
            cell: row => <div>{row.passPercentage}</div>,
        },
    ]);

    const gestorStatsColums = React.useMemo(() => [
        {
            name: 'Nombre',
            cell: row => <div>{row[0]}</div>,
        },
    ]);

   
    useEffect(() => {
        switch (Estadisticas) {
            case "GENERALES":
                getEstadisticasGenerales();
                break;
            case "CANDIDATO":
                getEstadisticasCandidate();
                break;
            case "CERTIFICACION":
                getEstadisticasCertification();
                break;
            case "ACADEMIA":
                getEstadisticasAcademy();
                break;
            case "GESTOR":
                getEstadisticasGestor();
                break;
            default:
                break;
        }
    }, [Estadisticas]);


    useEffect(() => {
        document.title = 'CONCER | Estadisticas';
    }, []);
    

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Estadisticas </h2>
                <br/>
                <section>
                    <Row>
                                <Col className='col-md-1'>
                                    <Button variant="primary" onClick={() => setEstadisticas("GENERALES")}>Generales</Button>
                                </Col>
                                <Col className='col-md-1'>
                                    <Button variant="primary" onClick={() => setEstadisticas("CANDIDATO")}>Popularidad</Button>
                                </Col>
                                <Col className='col-md-7'></Col>

                                <Col className='col-md-1 '>
                                    <Button variant="primary" onClick={() => setEstadisticas("CERTIFICACION")}>Certificacion</Button>
                                </Col>
                                <Col className='col-md-1 '>
                                    <Button variant="primary" onClick={() => setEstadisticas("ACADEMIA")}>Academia</Button>
                                </Col>
                                <Col className='col-md-1 '>
                                    <Button variant="primary" onClick={() => setEstadisticas("GESTOR")}>Gestor</Button>
                                </Col>
                            </Row>
                </section>
                <br/>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            {
                                Estadisticas === "GENERALES" ? "Estadisticas Generales" :
                                    Estadisticas === "CANDIDATO" ? "Estadisticas de Popularidad" :
                                        Estadisticas === "CERTIFICACION" ? "Estadisticas de Certificacion" :
                                            Estadisticas === "ACADEMIA" ? "Estadisticas de Academia" :
                                                Estadisticas === "GESTOR" ? "Estadisticas de Gestor" : ""
                            }
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {
                            Estadisticas === "GENERALES" ?
                                <DataTable
                                    columns={generalStatsColums}
                                    data={payload}
                                    highlightOnHover
                                    responsive
                                />
                                : Estadisticas === "CANDIDATO" ?
                                    <DataTable

                                        columns={candidateStatsColums}
                                        data={payload}
                                        highlightOnHover
                                        responsive
                                    />
                                    : Estadisticas === "CERTIFICACION" ?
                                        <DataTable

                                            columns={certificationStatsColums}
                                            data={payload}
                                            pagination
                                            paginationComponentOptions={{
                                                rowsPerPageText: 'Filas por página:',
                                                rangeSeparatorText: 'de',
                        
                                            }}
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                            highlightOnHover
                                            responsive
                                        />
                                        : Estadisticas === "ACADEMIA" ?
                                            <DataTable

                                                columns={academyStatsColums}
                                                data={payload}
                                                pagination
                                                paginationComponentOptions={{
                                                    rowsPerPageText: 'Filas por página:',
                                                    rangeSeparatorText: 'de',
                            
                                                }}
                                                paginationPerPage={5}
                                                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                                highlightOnHover
                                                responsive
                                            />
                                            : Estadisticas === "GESTOR" ?
                                                <DataTable
                                                    columns={gestorStatsColums}
                                                    data={payload}
                                                    pagination
                                                    paginationComponentOptions={{
                                                        rowsPerPageText: 'Filas por página:',
                                                        rangeSeparatorText: 'de',
                                
                                                    }}
                                                    paginationPerPage={5}
                                                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                                    highlightOnHover
                                                    responsive
                                                />
                                                : null

                        }
                        
                        
                    </Card.Body>
                </Card>          
            </Container>       
        </>
    )
}

export default Indicadores
