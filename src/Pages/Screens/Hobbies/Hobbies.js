import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import React, { useEffect, useState } from 'react'
import AnimatedPage from '../../../Components/AnimatedPage'
import { NavLink } from 'react-router-dom'
import './Hobbies.css'
import axios from 'axios'
import { baseUrl } from '../../../Constants'

const Hobbies = () => {
    const id = localStorage.getItem("USER_ID")
    const email = localStorage.getItem("USER_EMAIL")

    const [selectedHobbies, setSelectedHobbies] = useState([])
    const [availableHobbies, setAvailableHobbies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get(`${baseUrl}/api/hobbies/`)
            .then((res) => {
                const result = res.data
                setAvailableHobbies(result)
            })
            .catch((err) => {
                alert("Please try again")
            })
    }, [])

    const selectHobby = (id) => {
        let curArray = [...selectedHobbies]
        if (curArray.indexOf(id) > -1) {
            let curIndex = curArray.indexOf(id);
            setSelectedHobbies([...curArray.slice(0, curIndex), ...curArray.slice(curIndex + 1)])
        } else {
            curArray.push(id);
            setSelectedHobbies([...curArray])
        }
    }

    const activeCard = (id) => {
        return (selectedHobbies.filter(curHobby => curHobby === id)).length > 0 ? "selected" : ""
    }

    const submitHobby = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post(`${baseUrl}/api/profile/`, { email, id: parseInt(id), hobbies: [...selectedHobbies] })
            .then((res) => {
                setIsLoading(false)
                window.location.href = "/questions"
            }).catch((error) => {
                setIsLoading(false)
                alert("Something went wrong!")
            })
    }

    return (
        <AnimatedPage>
            <div className="hobbies container-fluid p-4">
                <h1 className='fw-600'>Please Select Your Hobbies</h1>
                <div className="hobbies-container container py-2 px-4 mt-3">
                    <div className="cards-container">
                        <div className="row">
                            {availableHobbies.map((curElem, index) => {
                                const { hobby, image, id } = curElem;
                                return (
                                    <div className="col-md-4 col-lg-3 my-3 px-4" key={index} id={id}>
                                        <div className={`hobby-card ${activeCard(id)}`} onClick={() => selectHobby(id)} style={{
                                            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${image}')`
                                        }}>
                                            <h5 className='text-light'>{hobby}</h5>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-100 d-flex align-items-center justify-content-center">
                        <button className='mt-2 d-flex justify-content-center align-items-center w-100' onClick={submitHobby}>
                            {isLoading === true ? <div className="spinner-border text-light" role="status">
                                <span clasName="visually-hidden"></span>
                            </div> : <>Next</>}
                        </button>
                    </div>

                </div>
            </div>
        </AnimatedPage>
    )
}

export default Hobbies