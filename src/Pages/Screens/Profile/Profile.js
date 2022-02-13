import React from 'react'
import AnimatedPage from '../../../Components/AnimatedPage'
import { NavLink } from 'react-router-dom'
import LoginVector from '../../../Assets/undraw_develop_app_re_bi4i.svg'
import './Profile.css'

const Profile = () => {
    return (
        <AnimatedPage>
            <div className="profile container-fluid p-3 ">
                <img src={LoginVector} alt="" className='loginVector' />
                <h1 className='text-start fw-600 text-lg-center mb-5'>Your Profile</h1>
                <div className="container-fluid info-div p-5">
                    <div className="d-flex info">
                        <h5 className='fw-600'>Name :</h5>
                        <h5 className='ms-3'> {`${localStorage.getItem("USER_FIRSTNAME")} ${localStorage.getItem("USER_LASTNAME")}`} </h5>
                    </div>
                    <div className="d-flex info">
                        <h5 className='fw-600'>Date of Birth:</h5>
                        <h5 className='ms-3'>{`${localStorage.getItem("USER_DOB")}`}</h5>
                    </div>
                    <div className="d-flex info">
                        <h5 className='fw-600'>Gender :</h5>
                        <h5 className='ms-3'>{`${localStorage.getItem("USER_GENDER")}`}</h5>
                    </div>
                    <div className="d-flex info">
                        <h5 className='fw-600'>Email :</h5>
                        <h5 className='ms-3'>{`${localStorage.getItem("USER_EMAIL")}`}</h5>
                    </div>
                    <div className="d-flex info">
                        <h5 className='fw-600'>Mobile Number :</h5>
                        <h5 className='ms-3'>{`${localStorage.getItem("USER_MOBILE_NO")}`}</h5>
                    </div>
                    <div className="w-100 d-flex flex-start mt-5">
                        <NavLink to="/home">
                            <button>Back to Home</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    )
}

export default Profile