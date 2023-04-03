import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import TeamWork from '../../../assets/img/OFERTA_EDUCATIVA_OK.png';
import TeamWork2 from '../../../assets/img/SERVICIOS_PARA_ESTUDIANTES.png';
import TeamWork3 from '../../../assets/img/VINCULACION.png';


const MainCandidate = () => {
    return (
        <>            
            <div className="d-flex justify-content-center align-items-center">
      <Carousel style={{ width: "80%" }}>
        <Carousel.Item>
          <img
          className="d-block w-100"
          src={TeamWork}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={TeamWork2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={TeamWork3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
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
        </>
    )
}

export default MainCandidate

