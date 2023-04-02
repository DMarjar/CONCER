import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from '../../modules/auth/AuthContext';
import { HomeUser } from '../../modules/home/HomeUser';
import { HomeGestor } from '../../modules/home/HomeGestor';
import { HomeAdmin } from '../../modules/home/HomeAdmin';

export const RoleRoute = () => {
    const { isRole } = useContext(AuthContext);


    return (
            <Routes>
                <Route exact path="/" element={
                    isRole === 'ADMIN' ?
                    <><HomeAdmin /></>
                    : isRole === 'GESTOR' ? 
                    <><HomeGestor /></>
                    :   
                    <><HomeUser/></>
                    }
                />
            </Routes>
    );
};
