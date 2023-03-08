import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Button, Container } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

export const CandidateSide = () => {
    const tab = '\u00A0';
    return (
        <>
        <Container className='p-4' style={{height:"100%", marginTop: "15px"}}>
            <h4 className='text-center' style={{color: "black", fontWeight: "normal"}}>Control de certificaciones</h4>
            <hr />
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="#" style={{marginBottom: "400px", fontSize: "15px", marginRight: "10px"}}><h5><FeatherIcon icon={'bar-chart-2'} />{tab} Indicadores</h5> </Nav.Link>
                <Button
                    variant="secondary"
                    className='btn-hover gradient-custom-1'
                    type="submit"
                    style={{ backgroundColor: '#00a780', marginBottom: "30px" }}
                    // disabled={!(formik.isValid && formik.dirty)}
                >
                    <FeatherIcon icon={'log-in'} />
                    &nbsp; Cerrar sesion
                </Button>
            </Nav>
        </Container>
        </>
    )
}
