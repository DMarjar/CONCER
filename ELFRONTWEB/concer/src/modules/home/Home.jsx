import React, {useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container } from 'react-bootstrap';
import AxiosClient from '../../shared/http-client.gateway';


export const Home = () => {
    const [imgsCert, setImgsCert] = React.useState([]);

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

    useEffect(() => {
        getImgsCert();
    }, []);

    useEffect(() => {
        document.title = 'CONCER | Principal';
    }, []);

    return (
        <>
            <Container className='px-4 mt-3'>
                <div className='p-3 m-0 h-50' style={{ width: '100%', height: '200px' }}>
                    {
                        imgsCert.length === 0 ? <h3 className="d-flex justify-content-center" style={{ color: "#002e60" }}>No hay certificaciones</h3> : 
                        <Carousel variant="dark" className='square border border-2 h-100 p-5 m-0' style={{ display: 'flex', alignItems: 'center', width: '100%', height: '400px'}}>
                            {imgsCert.map((img, index) => (
                                <Carousel.Item key={index} style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'  }}>
                                    <img
                                    className="d-block h-100 w-100"
                                    src={`data:image/png;base64, ${img.pictureBase64}`}
                                    alt={`Slide ${index}`}
                                    style={{ height: '100%', width:'100%', maxHeight:'300px', objectFit: 'contain'  }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    }
                </div>

                <CardGroup className=' mt-2 p-0'>
                    <Card className='m-3' style={{ height: "180px" }}>
                        <Card.Img style={{ height: "170px" }} variant="top" src="https://i.pinimg.com/originals/e2/99/e3/e299e3ce32cfa64aabcbdee37fbed5a2.png" />
                    </Card>
                    <Card className='m-3' style={{ height: "180px" }}>
                        <Card.Img style={{ height: "170px" }} variant="top" src="https://i.pinimg.com/originals/e2/99/e3/e299e3ce32cfa64aabcbdee37fbed5a2.png" />
                    </Card>
                    <Card className='m-3' style={{ height: "180px" }}>
                        <Card.Img style={{ height: "170px" }} variant="top" src="https://i.pinimg.com/originals/e2/99/e3/e299e3ce32cfa64aabcbdee37fbed5a2.png" />
                    </Card>
                    <Card className='m-3' style={{ height: "180px" }}>
                        <Card.Img style={{ height: "170px" }} variant="top" src="https://i.pinimg.com/originals/e2/99/e3/e299e3ce32cfa64aabcbdee37fbed5a2.png" />
                    </Card>
                </CardGroup>
            </Container>

        </>
    )
}

export default Home