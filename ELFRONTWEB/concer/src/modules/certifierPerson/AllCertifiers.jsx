import React, {useState, useEffect} from 'react'
import { Button, Col, Container, Figure, Row, Card } from 'react-bootstrap'
import AxiosClient from '../../shared/http-client.gateway';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";


export const AllCertifiers = () => {

    const [Certifiers, setCertifiers] = useState([]);
    const [filtrado, setFiltrado] = useState([]);


    const getCertifiers = async () => {
        try {
            const account = JSON.parse(localStorage.getItem('account'));
            if(account.user.role === "ADMIN"){
                const data = await AxiosClient.doGet('/person/certifiers', {});
                setCertifiers(data.data.data);
                console.log(data.data.data)
            }else{
                const data = await AxiosClient.doGet(`/candidate/informationPendientes`, {
                    id: account.id
                });
                setCertifiers(data.data.data);
                setFiltrado(Certifiers)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getCertifiers();
    }, []);

    useEffect(() => {
        setFiltrado(Certifiers)
    }, [Certifiers]);

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
            name: 'email',
            cell: row => <div>{row.email}</div>,
        },
        {
            name: 'Telefono',
            cell: row => <div>{row.phoneNumber}</div>,
            

        },
        {
            name: 'Acciones',
            cell: row =>
            <div><Link to={`/certifier`}><Button variant="primary">Ver</Button></Link></div>,
            
            rigth: true
        }
    
    ]);
   
    function Filter(event){
        const newData = Certifiers.filter(row => {
            return row.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || row.lastName.toLowerCase().includes(event.target.value.toLowerCase()) || row.email.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFiltrado(newData);
    }
    

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Personal Certificador</h2>
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

export default AllCertifiers
