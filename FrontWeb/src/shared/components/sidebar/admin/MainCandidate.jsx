import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';



const MainCandidate = () => {
    // estilos
    
    return (
        <>
        <h3 className="d-flex justify-content-center pt-3">Principal</h3>
            <Carousel variant="dark" className='h-50 square border border-2 m-3' style={{ display: 'flex', alignItems: 'center' }}>
                <Carousel.Item style={{ width: '50%', marginRight: '10px' }}>
                    <img
                        className="d-block w-100"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtOJnFS6VNRnLPnfX_M_akXn1PzmtjNJrOYg&usqp=CAU"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item style={{ width: '33%', marginRight: '10px' }}>
                    <img
                        className="d-block w-100"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Rz0Wi8VEX47OoDnd9WKTGNEhKLX0vnLEIA&usqp=CAU"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item style={{ width: '33%', marginRight: '10px' }}>
                    <img
                        className="d-block w-100"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGF3NntH3VSTCNovBNd9ofQB5ZY4Ab2xmHw&usqp=CAU"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <CardGroup  className=' mt-2 p-0 square border border-2'>
                <Card className='m-3 bg-secondary' style={{height: "180px"}}>
                    <Card.Img style={{height: "170px"}} className='square border border-2 bg-danger' variant="top" src="https://i.pinimg.com/originals/e2/99/e3/e299e3ce32cfa64aabcbdee37fbed5a2.png" />
                </Card>
                <Card className='m-3' style={{height: "180px"}}>
                    <Card.Img style={{height: "170px"}} variant="top" src="https://i.pinimg.com/originals/e2/99/e3/e299e3ce32cfa64aabcbdee37fbed5a2.png" />
                </Card>
                <Card className='m-3' style={{height: "180px"}}>
                    <Card.Img style={{height: "170px"}} variant="top" src="https://i.pinimg.com/originals/e2/99/e3/e299e3ce32cfa64aabcbdee37fbed5a2.png" />
                </Card>
                <Card className='m-3' style={{height: "180px"}}>
                    <Card.Img style={{height: "170px"}} variant="top" src="https://i.pinimg.com/originals/e2/99/e3/e299e3ce32cfa64aabcbdee37fbed5a2.png" />
                </Card>
            </CardGroup>
        </>
    )
}

export default MainCandidate

