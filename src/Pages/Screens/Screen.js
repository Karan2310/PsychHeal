import React from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Home/Home';
import Hobbies from './Hobbies/Hobbies';
import AskQuestions from './AskQuestions/AskQuestions';
import Profile from './Profile/Profile';

const Screen = () => {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
                <Route exact path="/" element={<Hobbies />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/questions" element={<AskQuestions />} />
                <Route exact path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </AnimatePresence >


    )
}

export default Screen