import React, { useState, useEffect }  from 'react'
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import { Button, Container, Card, Row, Col} from 'react-bootstrap';
import AxiosClient from '../../shared/http-client.gateway';


export const AllCertifications = () => {

    const [Certifications, setCertifications] = useState([]);
    const [filtrado, setFiltrado] = useState([]);


    const getCertifications = async () => {
        try {
            const account = JSON.parse(localStorage.getItem('account'));
            if(account.user.role === "ADMIN"){
                const data = await AxiosClient.doGet('/certification/', {});
                setCertifications(data.data.data);
                console.log(data.data.data)
            }else{
                const data = await AxiosClient.doGet(`/certification/informationPendientes`, {
                    id: account.id
                });
                setCertifications(data.data.data);
                setFiltrado(Certifications)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getCertifications();
    }, []);

    useEffect(() => {
        setFiltrado(Certifications)
    }, [Certifications]);

    const columns = React.useMemo(() => [
        {
            name: 'Certificacion',
            cell: row => <div>{row[1]}</div>,
        },
        {
            name: 'Version',
            cell: row => <div>{row[2]}</div>,
        },
        {
            name: 'Empresa',
            cell: row => <div>{row[4]}</div>,
        },
        {
            name: 'Gestor',
            cell: row => <div>{row[3]}</div>,
            

        },
        {
            name: 'Acciones',
            cell: row =>
            <div><Link to={`/certification`}><Button variant="primary">Ver</Button></Link></div>,
            
            rigth: true
        }
    
    ]);

    function Filter(event){
        const newData = Certifications.filter(row => {
            return row.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || row.lastName.toLowerCase().includes(event.target.value.toLowerCase()) || row.email.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFiltrado(newData);
    }

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Certificaciones</h2>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            
                            <Row>
                                <Col className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Buscar" onChange={Filter} />
                                </Col>
                                <Col className="col-md-7"></Col>
                                <Col className="col-md-1">
                                    <Link to="/newCertification"><Button>Agregar</Button></Link>
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

export default AllCertifications