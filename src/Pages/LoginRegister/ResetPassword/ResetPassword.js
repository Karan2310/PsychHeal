import React from 'react'
import { } from './ResetPassword.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AnimatedPage from '../../../Components/AnimatedPage'
import validator from 'validator'
import axios from "axios"
import { baseUrl } from '../../../Constants'

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const initialInput = { email: "", otp: "", newPassword: "", cNewPassword: "", type: "forgot" }
    const [inputFields, setInputFields] = useState(initialInput)
    const [currentSatge, setCurrentSatge] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value })
    }

    const sendOtp = (e) => {
        e.preventDefault();
        var email = inputFields.email
        if (validator.isEmail(email)) {
            setIsLoading(true)
            axios.post(`${baseUrl}/api/forgotpassword/`, inputFields)
                .then((res) => {
                    setIsLoading(false)
                    alert(res.data.message)
                    setCurrentSatge(currentSatge + 1)
                }).catch((error) => {
                    alert("Retry Again!")
                    setIsLoading(false)
                })
        } else {
            if (validator.isEmail(inputFields.email) === false) {
                alert("Enter Valid Email")
            }
        }
    }

    const enterOtp = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/api/changepassword/`, inputFields)
            .then((res) => {
                setCurrentSatge(currentSatge + 1)
            })
            .catch((res) => {
                alert("Invalid OTP")
            })
    }

    const changePassword = (e) => {
        e.preventDefault();
        if (validator.equals(inputFields.newPassword, inputFields.cNewPassword) === false) {
            alert("Passwords do not match")
        } else {
            setInputFields(inputFields.type === "login")
            axios.post(`${baseUrl}/api/changepassword/`, inputFields)
                .then((res) => {
                    alert("Password Changed Successfully!")
                    window.location.href = "/";
                }).catch((error) => {
                    alert("Something went wrong!")
                })
        }
    }

    return (
        <AnimatedPage>
            <div className="forgotPassword container-fluid p-4">
                <div className="container d-flex align-items-center justify-content-center flex-column p-4 p-md-5">
                    <div className="text-start w-100">
                        <h3 className='text-start mb-4 fw-700'><i className="fa-solid fa-face-smile"></i> PyschHeal</h3>
                    </div>
                    <p className='fw-500 mb-2 login-title text-start welcome w-100' >Can't recall your Password ?</p>
                    <p className='text-start silent w-100'>Don't worry we will help you creating a new password.</p>
                    <div className="d-flex flex-column mb-4 px-3 mt-3">

                        <form onSubmit={sendOtp} className={`${currentSatge === 0 ? "d-block" : "d-none"}`}>
                            <label>Enter you Email ID</label>
                            <input type="email" onChange={handleChange} name="email" value={inputFields.email} />
                            <button className='mt-4 d-flex justify-content-center align-items-center w-100'>
                                {isLoading === true ? <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : "Get Help!"}
                            </button>
                        </form>

                        <form onSubmit={enterOtp} className={`${currentSatge === 1 ? "d-block" : "d-none"}`}>
                            <label>OTP Generated !</label>
                            <input type="number" onChange={handleChange} name="otp" value={inputFields.otp} />
                            <button className='mt-4 d-flex justify-content-center align-items-center w-100'>
                                {isLoading === true ? <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : "Submit"}
                            </button>
                        </form>

                        <form onSubmit={changePassword} className={`${currentSatge === 2 ? "d-block" : "d-none"}`}>
                            <label>Enter New Password</label>
                            <input type="password" onChange={handleChange} name="newPassword" value={inputFields.newPassword} />
                            <label className='mt-3'>Confirm New Password</label>
                            <input type="password" onChange={handleChange} name="cNewPassword" value={inputFields.cNewPassword} />
                            <button className='mt-4 d-flex justify-content-center align-items-center w-100'>
                                {isLoading === true ? <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : "Create Password"}
                            </button>
                        </form>

                        <div className="register-btn w-100 mt-3">
                            <p>You just recalled your password ? <span><NavLink to="/login">Back to Login</NavLink></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    )
}

export default ResetPassword