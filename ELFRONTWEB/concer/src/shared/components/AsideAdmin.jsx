import React, { useContext } from 'react'
import { Button, Col, Nav, Row } from 'react-bootstrap'
import { VscGraph } from 'react-icons/vsc'
import { IoIosPeople } from 'react-icons/io'
import { FcBusinessman } from 'react-icons/fc'
import { BsPersonCheckFill } from 'react-icons/bs'
import { TbCertificate } from 'react-icons/tb'
import { BsFillBuildingsFill } from 'react-icons/bs'
import { IoMdSchool } from 'react-icons/io'
import AuthContext from '../../modules/auth/AuthContext'
import { Link, NavLink } from 'react-router-dom'

export const AsideAdmin = () => {

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
                <NavLink style={{ textDecoration: 'none', color: 'black' }} className='pt-1 px-3' to="/indicators"><VscGraph size={"35"} color="#002e60"/>&nbsp; Estadisticas</NavLink>
            </Row>
            <Row className='pb-2'>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} className='pt-1 px-3' to="/candidates"><IoIosPeople size={"35"} color="#002e60"/>&nbsp; Candidatos</NavLink>
            </Row>
            <Row className='pb-2'>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} className=' pt-1 px-3' to="/certifiers"><BsPersonCheckFill size={"30"} color="#002e60"/>&nbsp; Personal C.</NavLink>
            </Row>
            <Row className='pb-2'>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} className='pt-1 px-3' to="/certifications"><TbCertificate size={"35"} color="#002e60" />&nbsp; Certificaciones</NavLink>
            </Row>
            <Row className='pb-2'>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} className='pt-1 px-3' to="/companies"><BsFillBuildingsFill size={"30"} color="#002e60" />&nbsp; Empresas C. </NavLink>
            </Row>
            <Row className='pb-2'>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} className='pt-1 px-3' to="/utez"><IoMdSchool size={"30"} color="#002e60" />&nbsp; UTEZ </NavLink>
            </Row>            
            <Col className='mb-3' style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)" }}>
                <Link to="/">
                    <Button style={{ backgroundColor: "#019979" }} onClick={() => logout()} >Cerrar sesión</Button>
                </Link>
                
            </Col>
        </>
    )
}

export default AsideAdmin
