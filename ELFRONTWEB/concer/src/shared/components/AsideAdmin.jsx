import React, {useContext} from 'react'
import { Button, Col, Nav } from 'react-bootstrap'
import { VscGraph } from 'react-icons/vsc'
import { IoIosPeople } from 'react-icons/io'
import {FcBusinessman} from 'react-icons/fc'
import {BsPersonCheckFill} from 'react-icons/bs'
import {TbCertificate} from 'react-icons/tb'
import {BsFillBuildingsFill} from 'react-icons/bs'
import {IoMdSchool} from 'react-icons/io'
import AuthContext from '../../modules/auth/AuthContext'
import { NavLink } from 'react-router-dom'

export const AsideAdmin = () => {

    const {setState} = useContext(AuthContext);

    const logout = () =>{
        setState({ 
                auth: false,
                role: '' 
        })
    }

    return (
        <>
            <Nav className='px-3 py-2 text-center'><h4>Control de certificaciones</h4></Nav>
            <hr className='mt-1' />
            <NavLink className='pt-1 px-3 py-3' to="/indicators"><VscGraph size={"35"} color="#002e60" />&nbsp; Indicadores</NavLink>
            <NavLink className='pt-1 px-3 py-3' to="/candidates"><IoIosPeople size={"35"} color="#002e60" />&nbsp; Candidatos </NavLink>
            <NavLink className='pt-1 px-3 py-3' to="/staff"><BsPersonCheckFill size={"30"} color="#002e60" />&nbsp; Personal C. </NavLink>
            <NavLink className='pt-1 px-3 py-3' to="/certifications"><TbCertificate size={"35"} color="#002e60" />&nbsp; Certificaciones</NavLink>
            <NavLink className='pt-1 px-3 py-3' to="/companies"><BsFillBuildingsFill size={"30"} color="#002e60" />&nbsp; Empresas C. </NavLink>
            <NavLink className='pt-1 px-3 py-3' to="/utez"><IoMdSchool size={"30"} color="#002e60" />&nbsp; UTEZ </NavLink>
            <Col className='mb-3' style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)" }}>
                <Button style={{backgroundColor: "#019979"}} onClick={()=>logout()} >Cerrar sesión</Button>
            </Col>
        </>
    )
}

export default AsideAdmin
