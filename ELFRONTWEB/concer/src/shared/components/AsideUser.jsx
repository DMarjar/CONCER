import React, {useContext} from 'react'
import { Button, Col, Nav } from 'react-bootstrap'
import { VscGraph } from 'react-icons/vsc'
import AuthContext from '../../modules/auth/AuthContext'
import { NavLink,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const AsideUser = () => {

    const {setState} = useContext(AuthContext);

    const history = useNavigate();

    const logout = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#002e60',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                //navegar a la ruta /login
                
                localStorage.removeItem('token');
                    setState({
                                auth: false,
                                role: ''
                            })
                history('/');
            }
        })  
    }

    return (
        <>
            <Nav className='px-3 py-2 mt-3 text-center'><h4 style={{color:"#002e60"}}>Control de certificaciones</h4></Nav>
            <hr className='mt-1' />
            <NavLink style={{textDecoration: 'none', color: 'black'}} className='pt-1 px-3 py-5' to="/indicators"><VscGraph size={"35"} color="#002e60" />&nbsp; Estadisticas</NavLink>
            <Col className='mb-3' style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)" }}>

                <Button style={{backgroundColor: "#019979"}} onClick={()=>logout()}>Cerrar sesión</Button>

            </Col>
        </>
    )
}

export default AsideUser
