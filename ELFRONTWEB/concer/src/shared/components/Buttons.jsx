import { Button, Container, Row, Col } from 'react-bootstrap';

function Buttons() {
    const handleDeshabilitarClick = () => {
        // lógica para deshabilitar
    };

    const handleEditarClick = () => {
        // lógica para editar
    };

    const handleEliminarClick = () => {
        // lógica para eliminar
    };

    return (
        <Container>
            <Row>
                <Col className='col-lg-9 col-md-8 col-sm-9'>
                    <Button style={{ width: "110px" }} className='ms-4' variant="danger" onClick={handleDeshabilitarClick}>Deshabilitar</Button>
                    <Button style={{ width: "110px" }} className='ms-4' variant="primary" onClick={handleEditarClick}>Editar</Button>
                </Col>
                <Col>
                    <Button style={{ width: "110px" }} variant="warning" onClick={handleEliminarClick}>Eliminar</Button>
                </Col>
            </Row>
            <br />
        </Container>
    );
}

export default Buttons