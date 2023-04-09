import React, {useState, useEffect} from 'react'
import { Button, Col, Container, Figure, Row, Card } from 'react-bootstrap'
import AxiosClient from '../../../shared/http-client.gateway';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";



export const AllAcademis = () => {

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
            <div><Link to={`/academy`}><Button variant="primary">Ver</Button></Link></div>,
            
            rigth: true
        }
    
    ]);
   
    function Filter(event){
        const newData = Academias.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFiltrado(newData);
    }

    useEffect(() => {
        document.title = 'CONCER | Control de Academias';
    }, []);

    return (
        <>
            <Container className='px-5 mt-3'>
                <h4 className='text-center' style={{ color: "#002e60" }}>Academias</h4>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            
                            <Row>
                                <Col className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Buscar" onChange={Filter} />
                                </Col>
                                <Col className="col-md-7"></Col>
                                <Col className="col-md-1">
                                    <Link to="/newAcademy"><Button>Agregar</Button></Link>
                                </Col>
                            </Row>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <DataTable
                            columns={columns}
                            data={filtrado}
                            noDataComponent="No hay academias registradas"
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

export default AllAcademis
