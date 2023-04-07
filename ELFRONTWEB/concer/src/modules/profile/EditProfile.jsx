import React, {useEffect, useState}from 'react'
import { Button, Col, Container, Figure, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';




export const EditProfile = () => {

    const [user, setUser] = useState({})

    useEffect(() => {

        const account = JSON.parse(localStorage.getItem('account'));
        if(account){
            console.log(account)
            setUser(account)
            console.log(user)
        }


    }, []);
    

    return (
        <>
            <Container className='px-5 mt-3'>
                <h2 className='text-center' style={{ color: "#002e60" }}>Editar informacion </h2>
                
                
            </Container>

            

        </>
    )
}

export default EditProfile
