import React, {useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {Card, Row, Col} from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container } from 'react-bootstrap';
import AxiosClient from '../../shared/http-client.gateway';


export const Home = () => {
    const [imgsCert, setImgsCert] = React.useState([]);
    const [imgsCompany, setImgsCompany] = React.useState([]);

    const getImgsCert = async () => {
        try {
            const data = await AxiosClient.doGet('/certification/images', {})
            .then(res => {
                console.log(res.data.data)
                setImgsCert(res.data.data);
            });
        } catch (error) {
            
        }
    }

    const getImgsCompany = async () => {
        try {
            const data = await AxiosClient.doGet('/certifyingCompany/images', {})
            console.log(data.data.data)
            setImgsCompany(data.data.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getImgsCert();
        getImgsCompany();
    }, []);

    useEffect(() => {
        document.title = 'CONCER | Principal';
    }, []);

    return (
        <>
            <Container className='px-4 mt-1'>
                <div className='p-3 m-0 h-50' style={{ width: '100%', height: '200px' }}>
                    {imgsCert.length === 0 ? (
                        <h3 className="d-flex justify-content-center" style={{ color: "#002e60" }}>No hay certificaciones</h3>
                    ) : (
                        <Carousel variant="dark" className='square border border-2 h-100 p-5 m-0' style={{ display: 'flex', alignItems: 'center', width: '100%', height: '260px'}}>
                        {imgsCert.map((img, index) => (
                            <Carousel.Item key={index}>
                            <img
                                className="d-block"
                                src={`data:image/png;base64, ${img}`}
                                alt={`Slide ${index}`}
                                style={{ objectFit: 'contain', height: '300px', width:'100%' }}
                            />
                            </Carousel.Item>
                        ))}
                        </Carousel>
                    )}
                </div>



                <CardGroup className='mt-2 p-3'>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {imgsCompany.map((img, index) => (
                        <Col key={index}>
                            <Card key={index} className='border border-2' style={{ width: '18rem', height: '18rem' }}>
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Card.Img 
                                    variant="top" 
                                    src={`data:image/png;base64, ${img}`} 
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                </CardGroup>

            </Container>

        </>
    )
}

export default Home