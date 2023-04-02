import { Col, Row } from 'react-bootstrap'
import React from 'react'

import {NavbarAll} from '../../shared/components/Navbar';
import {AsideAdmin} from '../../shared/components/AsideAdmin';


export const HomeAdmin = () => {

    return (
        <>
        <NavbarAll/>
        <Row >
            <Col className='col-lg-2 col-md-3 col-sm-3 square border border-2 h-100 m-0' style={{height: "300px", position: "relative"}}>
                <AsideAdmin/>
            </Col>
            <Col className='col-lg-10 col-md-9 col-sm-9 square border border-2 m-0'>
                {/* <Router>    
                     <Routes>

                    </Routes>
                </Router> */}
                contenido admin
            </Col>

        </Row>
        
        
       
        </>
    )
}
