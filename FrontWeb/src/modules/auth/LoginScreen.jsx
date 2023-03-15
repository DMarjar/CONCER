import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Card, Container, Figure, Form, Row, Col, Button } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import { AuthContext } from './authContext';
import AxiosClient from '../../shared/plugins/axios';
import Alert from '../../shared/plugins/alert';


export const LoginScreen = () => {
  const navigation = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Required field'),
      password: yup.string().required('Required field'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await AxiosClient({
          url: '/auth/login',
          method: 'POST',
          data: JSON.stringify(values),
        });
        if (!response.error) {
          const action = {
            type: 'LOGIN',
            payload: response.data,
          };
          dispatch(action);
          navigation('/products', { replace: true });
        }
        throw Error();
      } catch (err) {
        Alert.fire({
          title: 'Verify data',
          text: 'User or password incorrect',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Accept',
        });
      }
    },
  });

  useEffect(() => {
    document.title = 'MT | Login';
  }, []);

  if (user.isLogged) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <section className="h-100 gradient-form">
        <Container className="py-5 h-100">
          <Row
            className="d-flex justify-content-center
            align-items-center h-100"
          >
            <Col className="col-xl-10">
              <Card className="rounded-3 text-black">
                <Row className="g-0">
                  <Col className="col-lg-6">
                    <Card.Body className="p-md-5 mx-md-4">
                      <div className="text-center">
                        <Figure>
                          <Figure.Image
                            width={125}
                            height={110}
                            alt="Market"
                            src=""
                          />
                        </Figure>
                        <h4 className="mt-1 mb-5 pb-1">Market</h4>
                      </div>
                      <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="form-outline mb-4">
                          <Form.Label htmlFor="username">
                            Email or user
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
                            <span className="error-text">
                              {formik.errors.username}
                            </span>
                          ) : null}
                        </Form.Group>
                        <Form.Group className="form-outline mb-4">
                          <Form.Label htmlFor="password">
                            Password
                          </Form.Label>
                          <Form.Control
                            placeholder="*********"
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
                            <span className="error-text">
                              {formik.errors.password}
                            </span>
                          ) : null}
                        </Form.Group>
                        <Form.Group className="form-outline mb-4">
                          <div className="text-end pt-1 pb-1">
                            <a href="#!" className="text-muted">
                              Forgot password?
                            </a>
                          </div>
                        </Form.Group>
                        <Form.Group className="form-outline mb-4">
                          <div className="text-center pt-1 pb-1">
                            <Button
                              variant="secondary"
                              className="btn-hover gradient-custom-2"
                              type="submit"
                              disabled={!(formik.isValid && formik.dirty)}
                            >
                              <FeatherIcon icon={'log-in'} />
                              &nbsp; Log in
                            </Button>
                          </div>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Col>
                  <Col
                    className="col-lg-6 d-flex 
                    align-items-center gradient-custom-2"
                  >
                    <div className="text-white px-3 p-md-5 mx-md-4">
                      <h4 className="mb-4">PROJECT NAME</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nostrum quisquam dicta asperiores aliquid. Quisquam,
                        quae magni? Neque tenetur, odio officia, repudiandae
                        earum nemo, quia nam voluptatibus debitis excepturi sunt
                        illo?
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LoginScreen;