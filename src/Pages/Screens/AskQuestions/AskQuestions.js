import React, { useState } from 'react'
import AnimatedPage from '../../../Components/AnimatedPage'
import { NavLink } from 'react-router-dom'
import validator from 'validator'
import './AskQuestions.css'
import axios from 'axios'
import { baseUrl } from '../../../Constants'

const AskQuestions = () => {
    const [isLoading, setIsLoading] = useState(false)
    const initialInput = { startTime: "", endTime: "", tourDate: "", tourAns: "", medicine: "", occupation: "", fit: "" }
    const [inputFields, setInputFields] = useState(initialInput)
    const [currentSatge, setCurrentSatge] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value })
    }

    const nextPage1 = (e) => {
        e.preventDefault()
        if (validator.isEmpty(inputFields.startTime) === true || validator.isEmpty(inputFields.endTime) === true) {
            alert("Fields cannot be empty")
        } else {
            setCurrentSatge(currentSatge + 1)
        }
    }
    const nextPage2 = (e) => {
        e.preventDefault()
        if (validator.isEmpty(inputFields.tourDate) === true || validator.isEmpty(inputFields.tourAns) === true) {
            alert("Fields cannot be empty")
        } else {
            setCurrentSatge(currentSatge + 1)
        }
    }
    const nextPage3 = (e) => {
        e.preventDefault()
        if (validator.isEmpty(inputFields.medicine) === true) {
            alert("Fields cannot be empty")
        } else {
            setCurrentSatge(currentSatge + 1)
        }
    }
    const nextPage4 = (e) => {
        e.preventDefault()
        if (validator.isEmpty(inputFields.occupation) === true) {
            alert("Fields cannot be empty")
        } else {
            setCurrentSatge(currentSatge + 1)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validator.isEmpty(inputFields.fit) === true) {
            alert("Fields cannot be empty")
        } else {
            axios.post(`${baseUrl}/api/profile_questions/`, inputFields)
                .then((res) => {
                    window.location.href = "/home"
                }).catch((error) => {
                    alert("Try again")
                })
            // window.location.href = "/"
        }
    }


    return (
        <AnimatedPage>
            <div className="AskQuestions container-fluid p-4">
                <div className="container d-flex align-items-center justify-content-center flex-column p-4 p-md-5">
                    <div className="text-start w-100">
                        <h3 className='text-start mb-4 fw-700'><i className="fa-solid fa-face-smile"></i> PyschHeal</h3>
                    </div>
                    <p className='fw-500 mb-2 login-title text-start welcome w-100' >Let us talk ?</p>
                    <div className="d-flex flex-column mb-4 px-3 mt-3">

                        <form onSubmit={nextPage1} className={`${currentSatge === 0 ? "d-block" : "d-none"}`}>
                            <label>What is your working span?</label>
                            <div className="d-flex flex-column flex-md-row">
                                <input className='mx-md-2 my-2 my-md-0' type="time" onChange={handleChange} name="startTime" value={inputFields.startTime} />
                                <input type="time" onChange={handleChange} name="endTime" value={inputFields.endTime} />
                            </div>
                            <button className='mt-4 d-flex justify-content-center align-items-center w-100'>
                                Next
                            </button>
                        </form>

                        <form onSubmit={nextPage2} className={`${currentSatge === 1 ? "d-block" : "d-none"}`}>
                            <label>Last when you gone to a tour?Is it more than a year?</label>
                            <div className="d-flex flex-column flex-md-row">
                                <input className='mx-md-2 my-2 my-md-0' type="date" onChange={handleChange} name="tourDate" value={inputFields.tourDate} />
                                <select name="tourAns" onChange={handleChange}>
                                    <option value="" disabled selected>Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <button className='mt-4 d-flex justify-content-center align-items-center w-100'>
                                Next
                            </button>
                        </form>

                        <form onSubmit={nextPage3} className={`${currentSatge === 2 ? "d-block" : "d-none"}`}>
                            <label>Are you taking some kind of medicine now-a-days?</label>
                            <div className="d-flex flex-column flex-md-row">
                                <select name="medicine" onChange={handleChange}>
                                    <option value="" disabled selected>Select</option>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>
                            <button className='mt-4 d-flex justify-content-center align-items-center w-100'>
                                Next
                            </button>
                        </form>

                        <form onSubmit={nextPage4} className={`${currentSatge === 3 ? "d-block" : "d-none"}`}>
                            <label>What is your occupation?</label>
                            <div className="d-flex flex-column flex-md-row">
                                <select name="occupation" onChange={handleChange}>
                                    <option value="" disabled selected>Select</option>
                                    <option value="Student">Student</option>
                                    <option value="Engineer">Engineer</option>
                                    <option value="Engineer">Research Work</option>
                                    <option value="Engineer">Doctor</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Professor">Artist</option>
                                    <option value="Job">Job</option>
                                    <option value="Housewife">Housewife</option>
                                    <option value="Student">Other</option>
                                </select>
                            </div>
                            <button className='mt-4 d-flex justify-content-center align-items-center w-100'>
                                Next
                            </button>
                        </form>

                        <form onSubmit={handleSubmit} className={`${currentSatge === 4 ? "d-block" : "d-none"}`}>
                            <label>Are you overfit/underfit?</label>
                            <div className="d-flex flex-column flex-md-row">
                                <select name="fit" onChange={handleChange}>
                                    <option value="" disabled selected>Select</option>
                                    <option value="overweight">Overweight</option>
                                    <option value="underweight">Underweight</option>
                                </select>
                            </div>
                            <button className='mt-4 d-flex justify-content-center align-items-center w-100'>
                                {isLoading === true ? <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    )
}

export default AskQuestions