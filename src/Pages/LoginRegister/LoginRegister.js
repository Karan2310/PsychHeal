import React from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import ResetPassword from './ResetPassword/ResetPassword';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const LoginRegister = () => {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/reset_password" element={<ResetPassword />} />
                <Route exact path="*" element={<Login />} />
            </Routes>
        </AnimatePresence >
    )
};

export default LoginRegister;
