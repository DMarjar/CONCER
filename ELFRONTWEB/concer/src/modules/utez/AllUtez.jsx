import React, {useState, useEffect} from 'react'
import { Button, Col, Container, Figure, Row, Card } from 'react-bootstrap'
import AxiosClient from '../../shared/http-client.gateway';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";



export const AllUtez = () => {

    //ACADEMIAS
    const [Academias, setAcademias] = useState([]);
    const [filtrado, setFiltrado] = useState([]);


    const getAcademias = async () => {
        try {
            const account = JSON.parse(localStorage.getItem('account'));
            if(account.user.role === "ADMIN"){
                const data = await AxiosClient.doGet('/academy/', {});
                setAcademias(data.data.data);
                console.log(data.data.data)
            }else{
                const data = await AxiosClient.doGet(`/candidate/informationPendientes`, {
                    id: account.id
                });
                setAcademias(data.data.data);
                setFiltrado(Academias)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getAcademias();
    }, []);

    useEffect(() => {
        setFiltrado(Academias)
    }, [Academias]);

    const columns = React.useMemo(() => [
        {
            name: 'Academia',
            cell: row => <div>{row.name}</div>,
        },
        {
            name: 'Estado',
            cell: row => <div>{row.status == 1
                ? <p>Activo</p>
                
                : <p>Inactivo</p>
            }</div>,
        },
        {
            name: 'Acciones',
            cell: row =>
            <div><Link to={`/certifier`}><Button variant="primary">Ver</Button></Link></div>,
            
            rigth: true
        }
    
    ]);
   
    function Filter(event){
        const newData = Academias.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFiltrado(newData);
    }

    //CUENTAS

    const [cuentas, setCuentas] = useState([]);
    const [filtradoCuentas, setFiltradoCuentas] = useState([]);


    const getCuentas = async () => {
        try {
            const account = JSON.parse(localStorage.getItem('account'));
            if(account.user.role === "ADMIN"){
                const data = await AxiosClient.doGet('/person/', {});
                setAcademias(data.data.data);
                console.log(data.data.data)
            }else{
                const data = await AxiosClient.doGet(`/candidate/informationPendientes`, {
                    id: account.id
                });
                setAcademias(data.data.data);
                setFiltrado(cuentas)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getCuentas();
    }, []);

    useEffect(() => {
        setFiltrado(cuentas)
    }, [cuentas]);

    const columns2 = React.useMemo(() => [
        {
            name: 'Nombre',
            cell: row => <div>{row.firstName}</div>,
        },
        {
            name: 'Apellido',
            cell: row => <div>{row.lastName}</div>,
        },
        {
            name: 'Acciones',
            cell: row =>
            <div><Link to={`/certifier`}><Button variant="primary">Ver</Button></Link></div>,
            
            rigth: true
        }
    
    ]);
   
    function Filter2(event){
    }

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Academias</h2>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            
                            <Row>
                                <Col className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Buscar" onChange={Filter2} />
                                </Col>
                                <Col className="col-md-7"></Col>
                                <Col className="col-md-1">
                                    <Link to="/newCertifier"><Button>Agregar</Button></Link>
                                </Col>
                            </Row>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <DataTable
                            columns={columns2}
                            data={filtradoCuentas}
                            noDataComponent="No hay candidatos"
                            pagination
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por página:',
                                rangeSeparatorText: 'de',
        
                            }}
                            paginationPerPage={3}
                            paginationRowsPerPageOptions={[3, 5, 10, 15, 20, 25, 30]}
                            
                            fixedHeader
                        />
                    
                        
                    </Card.Body>
                </Card>

                <h2 className='text-center' style={{ color: "#002e60" }}>Cuentas</h2>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            
                            <Row>
                                <Col className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Buscar" onChange={Filter} />
                                </Col>
                                <Col className="col-md-7"></Col>
                                <Col className="col-md-1">
                                    <Link to="/newCertifier"><Button>Agregar</Button></Link>
                                </Col>
                            </Row>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <DataTable
                            columns={columns}
                            data={filtrado}
                            noDataComponent="No hay candidatos"
                            pagination
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por página:',
                                rangeSeparatorText: 'de',
        
                            }}
                            paginationPerPage={3}
                            paginationRowsPerPageOptions={[3, 5, 10, 15, 20, 25, 30]}
                            
                            fixedHeader
                        />
                    
                        
                    </Card.Body>
                </Card>                      
            </Container>       
        </>
    )
}

export default AllUtez
