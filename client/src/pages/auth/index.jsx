import React from 'react'
import './styles.css'
import SignUp from './SignUp'
import Login from './Login'
import ForgotPass from './ForgotPass'
import ResetPass from './ResetPass'
import { Routes, Route } from 'react-router-dom'


const AuthPage = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password/" element={<ForgotPass />} />
            <Route path="/forgot-password/reset/" element={<ResetPass />}>
                <Route path=":token" element={<ResetPass />} />
            </Route>
        </Routes>
    )
}

export default AuthPage