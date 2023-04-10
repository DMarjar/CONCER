import React, {useState, useEffect} from 'react'
import { Button, Col, Container, Figure, Row, Card } from 'react-bootstrap'
import AxiosClient from '../../../shared/http-client.gateway';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";




export const AllPerson = () => {

    const [Person, setPerson] = useState([]);
    const [filtrado, setFiltrado] = useState([]);


    const getPerson = async () => {
        try {
            const account = JSON.parse(localStorage.getItem('account'));
            if(account.user.role === "ADMIN"){
                const data = await AxiosClient.doGet('/person/', {});
                setPerson(data.data.data);
                console.log(data.data.data)
            }else{
                const data = await AxiosClient.doGet(`/candidate/informationPendientes`, {
                    id: account.id
                });
                setPerson(data.data.data);
                setFiltrado(Person)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getPerson();
    }, []);

    useEffect(() => {
        setFiltrado(Person)
    }, [Person]);

    const columns = React.useMemo(() => [
        {
            name: 'Nombre',
            cell: row => <div>{row.firstName}</div>,
        },
        {
            name: 'Apellido',
            cell: row => <div>{row.lastName}</div>,
        },
        {
            name: 'Email',
            cell: row => <div>{row.email}</div>,
        },
        {
            name: 'Usuario',
            cell: row => <div>{row.user.username}</div>,
        },

        {
            name: 'Acciones',
            cell: row =>
            <div><Link to={`/account/${row.id}`}><Button variant="primary">Ver</Button></Link></div>,
            
            rigth: true
        }
    
    ]);
   
    function Filter(event){
        const newData = Person.filter(row => {
            return row.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || row.lastName.toLowerCase().includes(event.target.value.toLowerCase()) || row.email.toLowerCase().includes(event.target.value.toLowerCase()) || row.user.username.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFiltrado(newData);
    }

    return (
        <>
            <Container className='px-5 mt-3'>
                <h4 className='text-center' style={{ color: "#002e60" }}>Cuentas</h4>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            
                            <Row>
                                <Col className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Buscar" onChange={Filter} />
                                </Col>
                                <Col className="col-md-7"></Col>
                                <Col className="col-md-1">
                                    <Link to="/newAccount"><Button>Agregar</Button></Link>
                                </Col>
                            </Row>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <DataTable
                            columns={columns}
                            data={filtrado}
                            noDataComponent="No hay personas registradas"
                            pagination
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por página:',
                                rangeSeparatorText: 'de',
        
                            }}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                            highlightOnHover
                            responsive
                            fixedHeader
                        />
                    
                        
                    </Card.Body>
                </Card>           
            </Container>       
        </>
    )
}

export default AllPerson
