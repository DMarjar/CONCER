import { Col, Row } from 'react-bootstrap'
import React from 'react'

import { NavbarAll } from '../../shared/components/Navbar';
import { AsideAdmin } from '../../shared/components/AsideAdmin';
import {MainAdmin} from '../../shared/components/MainAdmin'

export const HomeAdmin = () => {

    return (
        <>
            <Row className="m-0">
                <NavbarAll />
            </Row>

            <Row className="h-100 square border border-2 border-light " style={{ height: "100vh" }}>
                <Col
                    className="col-lg-2 col-md-3 col-sm-3 square border border-bottom-0 m-0"
                    style={{ height: "600px", position: "relative" }}
                >
                    <AsideAdmin />
                </Col>
                <Col className="col-lg-10 col-md-9 col-sm-9 square border border-bottom-0 m-0">
                    {/* <Router>    
                     <Routes>

                    </Routes>
                </Router> */}
                    <MainAdmin/>
                </Col>

            </Row>



        </>
    )
}
