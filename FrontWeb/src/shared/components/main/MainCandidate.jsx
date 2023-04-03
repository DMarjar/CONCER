import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import TeamWork from '../../../assets/img/OFERTA_EDUCATIVA_OK.png';
import TeamWork2 from '../../../assets/img/SERVICIOS_PARA_ESTUDIANTES.png';
import TeamWork3 from '../../../assets/img/VINCULACION.png';
import oracleCertification from '../../../assets/img/oracleCertification.jpg'
import adobeCertification from '../../../assets/img/adobeCertification2.png'
import microsoftCertification from '../../../assets/img/microsoftCertification.png'
import solidWorksCertification from '../../../assets/img/solidworksCertification.png'


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
    <CardGroup className=''>
    <Card className='m-3' style={{ height: "180px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 2px rgba(0,0,0,0.1)", overflow: "hidden" }}>
      <Card.Img style={{ marginTop: 10, marginLeft: 55, width: "160px", borderRadius: "10px 0 0 10px", objectFit: "cover", height: "100%", flex: "1" }} src={oracleCertification} />
      <Card.Body style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "2" }}>
          <Card.Title style={{ fontWeight: "bold", fontSize: "18px" }}>Oracle Certification</Card.Title>
          <Card.Text style={{ fontSize: "16px" }}>Description about Oracle Certification.</Card.Text>
        </div>
      </Card.Body>
    </Card>

    <Card className='m-3' style={{ height: "180px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 2px rgba(0,0,0,0.1)", overflow: "hidden" }}>
      <Card.Img style={{ marginTop: 40, marginLeft: 25, width: "230px", borderRadius: "10px 10px 10px 10px" }} src={adobeCertification} />
      
    </Card>
  
    <Card className='m-3' style={{ height: "180px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 2px rgba(0,0,0,0.1)", overflow: "hidden" }}>
      <Card.Img style={{ marginTop: 10, marginLeft: 55, width: "160px", borderRadius: "10px 0 0 10px", objectFit: "cover", height: "100%", flex: "1" }} src={microsoftCertification} />
      <Card.Body style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "2" }}>
          <Card.Title style={{ fontWeight: "bold", fontSize: "18px" }}>Oracle Certification</Card.Title>
          <Card.Text style={{ fontSize: "16px" }}>Description about Oracle Certification.</Card.Text>
        </div>
      </Card.Body>
    </Card>

    <Card className='m-3' style={{ height: "180px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 2px rgba(0,0,0,0.1)", overflow: "hidden" }}>
      <Card.Img style={{ marginTop: 10, marginLeft: 55, width: "160px", borderRadius: "10px 0 0 10px", objectFit: "cover", height: "100%", flex: "1" }} src={solidWorksCertification} />
      <Card.Body style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "2" }}>
          <Card.Title style={{ fontWeight: "bold", fontSize: "18px" }}>Oracle Certification</Card.Title>
          <Card.Text style={{ fontSize: "16px" }}>Description about Oracle Certification.</Card.Text>
        </div>
      </Card.Body>
    </Card>

</CardGroup>

        </>
    )
}

export default MainCandidate

