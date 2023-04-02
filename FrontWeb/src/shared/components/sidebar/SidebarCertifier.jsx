import React,{useContext} from 'react'
import { Button, Col, Nav } from 'react-bootstrap'
import { VscGraph } from 'react-icons/vsc'
import { IoIosPeople } from 'react-icons/io'
import AuthContext from '../../modules/auth/AuthContext'


const SidebarCertifier = () => {
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
            <Nav.Link className='pt-1 px-3 py-3' href="/indicators"><VscGraph size={"35"} color="#002e60" />&nbsp; Indicadores</Nav.Link>
            <Nav.Link className='pt-1 px-3 py-3' href="/candidates"><IoIosPeople size={"35"} color="#002e60" />&nbsp; Candidatos </Nav.Link>
            <Col className='mb-3' style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)" }}>
                <Button style={{backgroundColor: "#019979"}}>Cerrar sesión</Button>
            </Col>

        </>
    )
}

export default SidebarCertifier