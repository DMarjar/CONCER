import React, {useState} from 'react'
import { Card, Col, Container, Figure, Row, Form, Button } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

const Candidate = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [status, setStatus] = useState('')
  const [certificationName, setCertificationName] = useState('')
  const [certificationKey, setCertificationKey] = useState('')
  const [candidateType, setCandidateType] = useState('')
  const [date, setDate] = useState('')
  const [group, setGroup] = useState('')
  const [career, setCareer] = useState('')
  const [division, setDivision] = useState('')
  const [certificationPhoto, setCertificationPhoto] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault() //evita que se recargue la pagina
    const data = {
      name,
      email,
      telephone,
      status,
      certificationName,
      certificationKey,
      candidateType,
      date,
      group,
      career,
      division,
      certificationPhoto
    }
    console.log(data)
  }


  return (
    <>
    <h2 className="d-flex justify-content-center pt-3" style={{ color: "#2375d7" }}>Nombre del candidato</h2>
    {/* <Container className="py-5 h-100">
                    <Row className='d-flex py-3 justify-content-center align-items-center h-100 bg-ligh'>
                    <Figure  className='d-flex justify-content-center align-items-center h-100 bg-ligh'>
                          <Figure.Image
                            width={175}
                            height={110}
                            alt="LOGO-UTEZ"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png"
                          />
                        </Figure></Row>
                    <Row className='d-flex justify-content-center align-items-center h-100'>
                        <Col className="col-xl-10">

                            <Row className='g-0 '>
                                <Col className='col-lg-3 '>
                                </Col>
                                <Col className='col-lg-6'>
                                    <Card border="light" style={{ backgroundColor: '#f2f2f2' }} className='rounded-3 text-black'>
                                        <Card.Body className='p-md-5 mx-md-4'>

                                            <div className='text-center'>

                                                <h4 className='mt-1 mb-5 pb-1'>Iniciar sesión</h4>
                                                <hr></hr>
                                            </div>

                                            <Form onSubmit={formik.handleSubmit}>
                                                <Form.Group className="form-outline mb-4">
                                                    <Form.Label htmlFor="username">
                                                        Usuario:
                                                    </Form.Label>
                                                    <Form.Control
                                                        placeholder="user@example.com"
                                                        id="username"
                                                        autoComplete="off"
                                                        name="username"
                                                        value={formik.values.username}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.username ? (
                                                        <span className='error-text'>
                                                            {formik.errors.username}
                                                        </span>
                                                    ) : null}
                                                </Form.Group>
                                                <Form.Group className="form-outline mb-4">
                                                    <Form.Label htmlFor="password">
                                                        Contraseña:
                                                    </Form.Label>
                                                    <Form.Control
                                                        placeholder="************"
                                                        id="password"
                                                        type="password"
                                                        autoComplete="off"
                                                        name="password"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        rightIcon={
                                                            <FeatherIcon icon={'eye'} size={20} />
                                                        }
                                                    />
                                                    {formik.errors.password ? (
                                                        <span className='error-text'>
                                                            {formik.errors.password}
                                                        </span>
                                                    ) : null}
                                                </Form.Group>
                                                <Form.Group className='form-outline mb-4'>
                                                    <div className='text-center pt-1 pb-1'>
                                                        <Button
                                                            variant="secondary"
                                                            className='btn-hover gradient-custom-2'
                                                            type="submit"
                                                            style={{ backgroundColor: '#00a780' }}
                                                            disabled={!(formik.isValid && formik.dirty)}
                                                        >
                                                            <FeatherIcon icon={'log-in'} />
                                                            &nbsp; Iniciar sesion
                                                        </Button>
                                                    </div>
                                                </Form.Group>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className='col-lg-3 '>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
 */}
    </>
  )
}

export default Candidate