import React, { useState } from 'react'
import { } from './Login.css'
import Vector from '../../../Assets/undraw_smiley_face_re_9uid.svg'
import { NavLink } from 'react-router-dom'
import AnimatedPage from '../../../Components/AnimatedPage'
import validator from 'validator'
import { baseUrl } from '../../../Constants'
import axios from 'axios'

const Login = () => {
    const initialInput = { email: "", password: "" }
    const [inputFields, setInputFields] = useState(initialInput)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var email = inputFields.email
        var password = inputFields.password
        if (validator.isEmail(email) && validator.isStrongPassword(password)) {
            setIsLoading(true)
            axios.post(`${baseUrl}/api/login/`, inputFields)
                .then(res => {
                    console.log(res)
                    localStorage.setItem("isLoggedIn", "true")
                    localStorage.setItem("USER_ID", res.data.id)
                    setIsLoading(false)
                    alert("Login")
                    window.location.reload()
                })
                .catch((error) => console.log(error))

        } else {
            if (validator.isEmail(inputFields.email) === false) {
                alert("Enter Valid Email")
            } else if (validator.isStrongPassword(inputFields.password) === false) {
                alert("Enter Valid Password")
            }
        }
        setInputFields(initialInput)
    }


    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <AnimatedPage>
            <div className="login container-fluid p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-center flex-column p-4 p-md-5">
                            <form className="text-start d-flex flex-column w-100" onSubmit={handleSubmit}>
                                <div className="text-start w-100">
                                    <h3 className='text-start mb-5 fw-700'><i className="fa-solid fa-face-smile"></i> PyschHeal</h3>
                                </div>
                                <p className='fw-500 mb-3 login-title welcome' >Welcome Back!</p>
                                <div className="d-flex flex-column mb-4">
                                    <label htmlFor="Email">Email</label>
                                    <input type="email" name="email" onChange={handleChange} value={inputFields.email} />
                                </div>
                                <div className="d-flex flex-column position-relative" >
                                    <label htmlFor="Password">Password</label>
                                    <input type={showPassword === true ? "text" : "password"} name="password" onChange={handleChange} value={inputFields.password} />
                                    <i className={`fa - solid ${showPassword === true ? "fa-eye" : "fa-eye-slash"} `} onClick={togglePassword}></i>
                                </div>
                                <p className='password-warning m-0'>Password must include atleast one uppercase, lowecase, number and symbols like [@ ! $ ? % &]</p>
                                <NavLink to="/reset_password" id='fpassword'>Forgot password ?</NavLink>
                                <button className='mt-5 d-flex justify-content-center align-items-center'>
                                    {isLoading === true ? <div className="spinner-border text-light" role="status">
                                        <span clasName="visually-hidden"></span>
                                    </div> : <>Login<i className="fa-solid fa-right-long ms-1"></i></>}
                                </button>
                            </form>
                            <div className="register-btn w-100 mt-3">
                                <p>New to PyschHeal ? <span><NavLink to="/register">Register Here</NavLink> </span></p>
                            </div>
                        </div>
                        <div className="vector-div d-none d-md-flex col-md-6 overflow-hidden">
                            <img src={Vector} alt="Be Happy" className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div >
        </AnimatedPage >
    )
}

export default Login