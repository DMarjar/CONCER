import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Figure, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import AxiosClient from '../../shared/http-client.gateway';
import Buttons from '../../shared/components/Buttons';

const Certification = () => {
  const [payload, setPayload] = useState([]);
  const { certification } = useParams();

  const getCertification = async () => {
    try {
      const data = await AxiosClient.doPost(`/certification/one/${certification}`, {});
      console.log(data.data.data[0])
      setPayload(data.data.data[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCertification();
  }, [certification])

  return (
    <Container className='px-5 mt-3'>
      <h2 className='text-center' style={{ color: '#002e60' }}>Certificación</h2>
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Col lg={6} md={8} sm={12}>
          <Row>
            <Col>
              <h4>Nombre de la certificación</h4>
              <p>{payload[1]}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Versión</h4>
              <p>{payload[4]}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Nombre del gestor a cargo</h4>
              <p>{payload[10]} {payload[11]}</p>
            </Col>
          </Row>
          <br />

        </Col>
        <Col lg={6} md={8} sm={12}>
          <Figure>
            <Figure.Image src={`data:image/png;base64, ${payload[2]}`} width="100%" height="auto" alt="Certification image" />
            <Figure.Caption className="text-center">
              <h4>Nombre de la empresa</h4>
              <p>{payload[8]}</p>
            </Figure.Caption>
          </Figure>
        </Col>
      </Row>

      <div className='mb-3' style={{ position: "absolute", bottom: 0, width: "90%" }}>
        <Row>
          <Col lg={9} md={8} sm={9}>
            <Button style={{ width: "110px", backgroundColor: "#A0A5A1", borderColor: "#A0A5A1" }} className="ms-4">
              Deshabilitar
            </Button>
            <Link to={`/editCertification/${certification}`}>
              <Button style={{ width: "110px", backgroundColor: "#002e60" }} className="ms-4">
                Editar
              </Button>
            </Link>
          </Col>
          <Col>
            <Button style={{ width: "110px", backgroundColor: "#002e60" }}>
              Eliminar
            </Button>
          </Col>
        </Row>
      </div>

    </Container>
  );
}

export default Certification;
