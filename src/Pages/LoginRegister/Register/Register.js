import React, { useState } from 'react'
import { } from './Register.css'
import { NavLink } from 'react-router-dom'
import AnimatedPage from '../../../Components/AnimatedPage'
import validator from 'validator'
import './Register.css'
import axios from 'axios'
import { baseUrl } from '../../../Constants'

const Register = () => {
    const initialInput = { first_name: "", last_name: "", email: "", password: "", cPassword: "", mobile_no: "", dob: "", gender: "" }
    const [inputFields, setInputFields] = useState(initialInput)
    const [password, setPassword] = useState(false)
    const [cPassword, setCpassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var fname = inputFields.first_name
        var lname = inputFields.last_name
        var gender = inputFields.gender
        var dob = inputFields.dob
        var email = inputFields.email
        var password = inputFields.password
        var cPassword = inputFields.cPassword
        var mobile_no = inputFields.mobile_no

        if (validator.isEmpty(fname.trim()) === true || validator.isLength(fname, 3) === false) {
            alert("Enter valid First Name")
        } else if (validator.isEmpty(lname.trim()) === true || validator.isLength(lname, 3) === false) {
            alert("Enter valid Last Name")
        } else if (validator.isEmpty(gender) === true) {
            alert("Select Gender")
        } else if (validator.isDate(dob) === false) {
            alert("Enter valid Date of Birth")
        } else if (validator.isInt(mobile_no) === false) {
            alert("Enter valid Mobile Number")
        } else if (validator.isEmail(email) === false) {
            alert("Enter valid Email")
        } else if (validator.isStrongPassword(password) === false) {
            alert("Password must include atleast one uppercase, lowecase, number and symbols like [@ ! $ ? % &]")
        } else if (validator.equals(password, cPassword) === false) {
            console.log(validator.equals(password, cPassword));
            alert("Passwords do not match")
        } else {
            setIsLoading(true);
            axios.post(`${baseUrl}/api/signup/`, inputFields)
                .then((res) => {
                    console.log(res);
                    alert("Register")
                    setIsLoading(false);
                    setInputFields(initialInput)
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response) {
                        if (error.response.status === 406) {
                            alert("user aleady exist")
                            window.location.href = "/"
                        } else {
                            alert("Something went wrong!")
                        }
                    }
                })
        }
    }

    const showPassword = () => {
        setPassword(!password)
    }
    const showCpassword = () => {
        setCpassword(!cPassword)
    }

    return (
        <AnimatedPage>
            <div className="register container-fluid p-4">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex align-items-center justify-content-center p-4 p-md-5">
                            <div className="text-start w-100">
                                <h3 className='text-center text-md-start mb-3 fw-700'><i className="fa-solid fa-face-smile"></i> PyschHeal</h3>
                            </div>
                            <p className='fw-500 mb-0 login-title welcome text-md-center ms-md-5' >Nice to meet you!</p>
                            <div className="col-md-6 p-0 px-md-5">
                                <div className="d-flex flex-column input-fields">
                                    <label>First Name</label>
                                    <input onChange={handleChange} type="text" value={inputFields.first_name} name="first_name" />
                                </div>
                                <div className="d-flex flex-column input-fields">
                                    <label>Last Name</label>
                                    <input onChange={handleChange} type="text" value={inputFields.last_name} name="last_name" />
                                </div>


                                <div className="d-flex flex-column input-fields">
                                    <label>Gender</label>
                                    <div className="d-flex">
                                        <div className="d-flex align-items-center">
                                            <input onChange={handleChange} type="radio" name="gender" id="Male" value="male" />
                                            <label>Male</label>
                                        </div>
                                        <div className="d-flex align-items-center ms-4">
                                            <input onChange={handleChange} type="radio" name="gender" id="Female" value="female" />
                                            <label>Female</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column input-fields">
                                    <label>Date of Birth</label>
                                    <input onChange={handleChange} type="date" value={inputFields.dob} name="dob" />
                                </div>

                            </div>

                            <div className="col-md-6 p-0 px-md-5">

                                <div className="d-flex flex-column input-fields">
                                    <label>Mobile Number</label>
                                    <input onChange={handleChange} type="number" value={inputFields.mobile_no} name="mobile_no" />
                                </div>

                                <div className="d-flex flex-column input-fields">
                                    <label>Email ID</label>
                                    <input onChange={handleChange} type="email" value={inputFields.email} name="email" />
                                </div>
                                <div className="d-flex flex-column input-fields position-relative">
                                    <label>Password</label>
                                    <input onChange={handleChange} type={password === true ? "text" : "password"} value={inputFields.password} name="password" />
                                    <i className={`fa-solid ${password === true ? "fa-eye" : "fa-eye-slash"}`} onClick={showPassword}></i>
                                </div>

                                <div className="d-flex flex-column input-fields position-relative">
                                    <label>Confirm Password</label>
                                    <input onChange={handleChange} type={cPassword === true ? "text" : "password"} value={inputFields.cPassword} name="cPassword" />
                                    <i className={`fa-solid ${cPassword === true ? "fa-eye" : "fa-eye-slash"}`} onClick={showCpassword}></i>
                                </div>
                            </div>
                            <button className='mt-4 d-flex justify-content-center align-items-center'>
                                {isLoading === true ? <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : "Register"}
                            </button>
                            <div className="register-btn w-100 mt-3">
                                <p>You are already registered ? <span><NavLink to="/Login">Back to Login</NavLink> </span></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    )
}

export default Register