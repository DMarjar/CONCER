import React, { useState, useEffect }  from 'react'
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import { Button, Container, Card, Row, Col} from 'react-bootstrap';
import AxiosClient from '../../shared/http-client.gateway';


export const AllCompanies = () => {
    const [candidates, setCandidates] = useState([]);
    const [filtrado, setFiltrado] = useState([]);

    const getCandidates = async () => {
        try {
            const account = JSON.parse(localStorage.getItem('account'));
            if(account.user.role === "ADMIN"){
                const data = await AxiosClient.doGet('/certifyingCompany/', {});
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
            name: 'Empresa',
            cell: row => <div>{row.name}</div>,
        },
        {
            name: 'Email',
            cell: row => <div>{row.email}</div>,
        },
        {
            name: 'Telefono',
            cell: row => <div>{row.phone}</div>,
        },
        {
            name: 'Acciones',
            cell: row =>
            <div><Link to={`/company`}><Button variant="primary">Ver</Button></Link></div>,
            
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
        document.title = 'CONCER | Control de Empresas';
    }, []);

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Empresas Certificadoras</h2>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            
                            <Row>
                                <Col className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Buscar" onChange={Filter} />
                                </Col>
                                <Col className="col-md-7"></Col>
                                <Col className="col-md-1">
                                    <Link to="/newCompany"><Button>Agregar</Button></Link>
                                </Col>
                            </Row>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <DataTable
                            columns={columns}
                            data={filtrado}
                            noDataComponent="No hay empresas certificadoras registradas"
                            pagination
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por página:',
                                rangeSeparatorText: 'de',
        
                            }}
                            paginationPerPage={6}
                            paginationRowsPerPageOptions={[6, 12, 18, 24, 30]}
                            fixedHeader
                        />
                    
                        
                    </Card.Body>
                </Card>           
            </Container>       
        </>
    )
}

export default AllCompanies
