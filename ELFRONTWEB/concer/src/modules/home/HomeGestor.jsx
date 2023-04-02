import { Row, Col, Container } from 'react-bootstrap'
import React from 'react'
import NavbarAll from '../../shared/components/Navbar'
import AsideGestor from '../../shared/components/AsideGestor'


export const HomeGestor = () => {

    return (
        <>
            <NavbarAll/>
            <Row >
                <Col className='col-lg-2 col-md-3 col-sm-3 square border border-2 h-100 m-0' style={{height: "300px", position: "relative"}}>
                    <AsideGestor/>
                </Col>
                <Col className='col-lg-10 col-md-9 col-sm-9 square border border-2 m-0'>
                    {/* <Router>    
                        <Routes>

                        </Routes>
                    </Router> */}
                    contenido gestor
                </Col>

            </Row>
        </>
    )
}
