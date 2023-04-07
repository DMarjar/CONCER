import React, {useContext} from 'react'
import { Button, Col, Nav } from 'react-bootstrap'
import { VscGraph } from 'react-icons/vsc'
import AuthContext from '../../modules/auth/AuthContext'
import { Link, NavLink } from 'react-router-dom'

export const AsideUser = () => {

    const {setState} = useContext(AuthContext);

    const logout = () =>{
        setState({ 
                auth: false,
                role: '' 
        })
    }

    return (
        <>
            <Nav className='px-3 py-2 mt-3 text-center'><h4 style={{color:"#002e60"}}>Control de certificaciones</h4></Nav>
            <hr className='mt-1' />
            <NavLink style={{textDecoration: 'none', color: 'black'}} className='pt-1 px-3 py-5' href="/indicators"><VscGraph size={"35"} color="#002e60" />&nbsp; Indicadores</NavLink>
            <Col className='mb-3' style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)" }}>
                <Link to="/">
                <Button style={{backgroundColor: "#019979"}} onClick={()=>logout()}>Cerrar sesión</Button>
                </Link>
            </Col>
        </>
    )
}

export default AsideUser
