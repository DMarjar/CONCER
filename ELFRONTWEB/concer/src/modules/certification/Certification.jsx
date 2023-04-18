import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Figure, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import AxiosClient from '../../shared/http-client.gateway';
import Buttons from '../../shared/components/Buttons';
import Swal from 'sweetalert2';

const Certification = () => {
  const [payload, setPayload] = useState([]);
  const { certification } = useParams();

  const getCertification = async () => {
    try {
      const data = await AxiosClient.doPost(`/certification/one/${certification}`, {});
      setPayload(data.data.data[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCertification();
  }, [certification])

  const changeState = async () => {
    Swal.fire({
      title: '¿Está usted seguro de cambiar el estado de la certificación?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#019979',
      cancelButtonColor: '#A0A5A1',
      confirmButtonText: '¡Sí, actualizar!',
      cancelButtonText: 'Cancelar'
    }).then( async (result) => {
      if (result.isConfirmed) {
          try {
              const response = await AxiosClient.doPut(`/certification/changeStatus/${certification}`, {});
              
              if(!response.data.error){
                  Swal.fire({
                      title: '¡Éxito!',
                      text: 'Estado camcbiado correctamente',
                      icon: 'success',
                      confirmButtonText: 'Aceptar'
                  }).then((result) => {
                      if (result.isConfirmed) {
                          window.location.reload();
                      }
                  })
              }else{
                  Swal.fire({
                      title: 'Error',
                      text: response.data.message,
                      icon: 'error',
                      confirmButtonText: 'Aceptar'
                  })
              }

          } catch (error) {
              console.log(error)
              Swal.fire({
                  title: 'Vaya...',
                  text: 'No se pudo cambiar el estado de la empresa',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
              })
          }
      }
    })  
  }

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
            <Button style={{ width: "110px", backgroundColor: "#A0A5A1", borderColor: "#A0A5A1" }} className="ms-4" onClick={()=>changeState()}>
              {
                payload[3] === 1 ?
                  "Desactivar"
                  :
                  "Activar"
              }
            </Button>
            <Link to={`/editCertification/${certification}`}>
              <Button style={{ width: "110px", backgroundColor: "#002e60" }} className="ms-4">
                Editar
              </Button>
            </Link>
          </Col>
        </Row>
      </div>

    </Container>
  );
}

export default Certification;
