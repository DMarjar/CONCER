import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from '../../modules/auth/AuthContext';
import { IndexUser } from '../../modules/index/IndexUser';
import { IndexGestor } from '../../modules/index/IndexGestor';
import { IndexAdmin } from '../../modules/index/IndexAdmin';

export const RoleRoute = () => {
    const { isRole } = useContext(AuthContext);


    return (
            <Routes>
                <Route path="/*" element={
                    isRole === 'ADMIN' ?
                    <>< IndexAdmin/></>
                    : isRole === 'GESTOR' ? 
                    <><IndexGestor /></>
                    :   
                    <><IndexUser/></>
                    }
                />
            </Routes>
    );
};
