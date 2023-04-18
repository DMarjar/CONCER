import React from 'react'
import { Link } from 'react-router-dom';
import '../components/Error404.css';

export const Error = () => {
    return (
        <div className='centerE'  >
        


            <h1 className="error-title">Error 404</h1>
            <p className="error-text">La página que estás buscando no existe.</p>
            <br />
            <Link to="/" className="error-link" style={{ backgroundColor: "#019979" }} >Ir a la página de inicio</Link> </div>
    )
}

export default Error