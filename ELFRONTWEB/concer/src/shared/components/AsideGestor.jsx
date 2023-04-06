import React, { useContext } from 'react'
import { Button, Col, Nav, Row } from 'react-bootstrap'
import { VscGraph } from 'react-icons/vsc'
import { IoIosPeople } from 'react-icons/io'
import AuthContext from '../../modules/auth/AuthContext'
import { NavLink } from 'react-router-dom'

const AsideGestor = () => {
    const { setState } = useContext(AuthContext);

    const logout = () => {
        setState({
            auth: false,
            role: ''
        })
    }
    return (
        <>
            <Nav className='px-3 py-2 mt-3 text-center'><h4 style={{ color: "#002e60" }}>Control de certificaciones</h4></Nav>
            <hr className='mt-1' />
            <Row className='pb-2'>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} className='pt-1 px-3' href="/indicators"><VscGraph size={"35"} color="#002e60" />&nbsp; Indicadores</NavLink>
            </Row>
            <Row className='pb-2'>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} className='pt-1 px-3' href="/candidates"><IoIosPeople size={"35"} color="#002e60" />&nbsp; Candidatos </NavLink>
            </Row>

            <Col className='mb-3' style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)" }}>
                <Button style={{ backgroundColor: "#019979" }} onClick={() => logout()} >Cerrar sesión</Button>
            </Col>

        </>
    )
}

export default AsideGestor