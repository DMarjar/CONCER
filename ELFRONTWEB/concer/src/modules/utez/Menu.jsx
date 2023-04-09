import React from 'react'
import { Button, Col, Container, Figure, Row } from 'react-bootstrap'
import AllAcademis from './academy/AllAcademis'
import AllPerson from './person/AllPerson'





export const Menu = () => {

    

    return (
        <>
            <Container className='px-5 mt-3'>
                <AllAcademis/>
                <br/>
                <AllPerson/>           
            </Container>       
        </>
    )
}

export default Menu
