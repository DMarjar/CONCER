import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export const MainAdmin = () => {
  return (
    <>
    <h2 className="d-flex justify-content-center pt-3" style={{ color: "#2375d7" }}>Principal</h2>
    <div className=' p-3  m-0 h-50'>
        <Carousel variant="dark" className='square border border-2 h-100 p-5 m-0' style={{ display: 'flex', alignItems: 'center' }}>
            <Carousel.Item>
                <img
                    className="d-block h-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtOJnFS6VNRnLPnfX_M_akXn1PzmtjNJrOYg&usqp=CAU"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block h-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Rz0Wi8VEX47OoDnd9WKTGNEhKLX0vnLEIA&usqp=CAU"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block h-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGF3NntH3VSTCNovBNd9ofQB5ZY4Ab2xmHw&usqp=CAU"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    </div>
    <CardGroup className=' mt-2 p-0'>
        <Card className='m-3' style={{ height: "180px", backgroundColor: "#019979" }}>
            <Card.Body className='d-flex justify-content-center align-items-center text-center text-light'><h4>Empresas certificadoras</h4> </Card.Body>
        </Card>
        <Card className='m-3' style={{ height: "180px", backgroundColor: "#019979" }}>
            <Card.Body className='d-flex justify-content-center align-items-center text-center text-light'><h4>Certificaciones</h4> </Card.Body>
        </Card>
        <Card className='m-3' style={{ height: "180px", backgroundColor: "#019979" }}>
            <Card.Body className='d-flex justify-content-center align-items-center text-center text-light'><h4>Candidatos</h4> </Card.Body>
        </Card>
        <Card className='m-3' style={{ height: "180px", backgroundColor: "#019979" }}>
            <Card.Body className='d-flex justify-content-center align-items-center text-center text-light'><h4>UTEZ</h4> </Card.Body>
        </Card>
    </CardGroup>
</>
  )
}

export default MainAdmin