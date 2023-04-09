import React, { useState, useEffect }  from 'react'
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import { Button, Container, Card, Row, Col} from 'react-bootstrap';
import AxiosClient from '../../shared/http-client.gateway';


export const AllCandidates = () => {
    
    const [candidates, setCandidates] = useState([]);
    const [filtrado, setFiltrado] = useState([]);


    const getCandidates = async () => {
        try {
            const account = JSON.parse(localStorage.getItem('account'));
            if(account.user.role === "ADMIN"){
                const data = await AxiosClient.doGet('/candidate/', {});
                setCandidates(data.data.data);
                console.log(data.data.data)
            }else{
                const data = await AxiosClient.doGet(`/candidate/informationPendientes`, {
                    id: account.id
                });
                setCandidates(data.data.data);
                setFiltrado(candidates)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getCandidates();
    }, []);

    useEffect(() => {
        setFiltrado(candidates)
    }, [candidates]);

    const columns = React.useMemo(() => [
        {
            name: 'Nombre',
            cell: row => <div>{row[4]}</div>,
        },
        {
            name: 'Apellido',
            cell: row => <div>{row[5]}</div>,
        },
        {
            name: 'Certificacion',
            cell: row => <div>{row[3]}</div>,
        },
        {
            name: 'Gestor',
            cell: row => <div>{row[6]}</div>,
            

        },
        {
            name: 'Acciones',
            cell: row =>
            <div><Link to={`/candidate/${row[1]}`}><Button variant="primary">Ver</Button></Link></div>,
            
            rigth: true
        }
    
    ]);
   
    function Filter(event){
        const newData = candidates.filter(row => {
            return row[4].toLowerCase().includes(event.target.value.toLowerCase()) || row[5].toLowerCase().includes(event.target.value.toLowerCase()) || row[3].toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFiltrado(newData);
    }

    useEffect(() => {
        document.title = 'CONCER | Control de Candidatos';
    }, []);


    return (
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Candidaturas</h2>
                <br/>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            
                            <Row>
                                <Col className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Buscar" onChange={Filter} />
                                </Col>
                                <Col className="col-md-7"></Col>
                                <Col className="col-md-1">
                                    <Link to="/NewCandidate"><Button>Agregar</Button></Link>
                                </Col>
                            </Row>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <DataTable
                            columns={columns}
                            data={filtrado}
                            noDataComponent="No hay candidatos registrados"
                            pagination
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por página:',
                                rangeSeparatorText: 'de',
        
                            }}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                            fixedHeader
                        />
                    
                        
                    </Card.Body>
                </Card>   
            </Container>
    )
}

export default AllCandidates