import React from 'react'
import { Button, Col, Nav } from 'react-bootstrap'
import { VscGraph } from 'react-icons/vsc'

const SidebarCandidate = () => {
    return (
        <>
                    <Nav className='px-3 py-2 text-center'><h4>Control de certificaciones</h4></Nav>
                    <hr className='mt-1 mx-2' />
                    <Nav.Link className='pt-1 px-3 py-5' href="/indicators"><VscGraph size={"35"} color="#002e60" />&nbsp; Indicadores</Nav.Link>
                    <Col style={{position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)"}}>
                        <Button variant="success">Cerrar sesión</Button>
                    </Col>
        </>
    )
}

export default SidebarCandidate;