import React from 'react'
import AnimatedPage from '../../../Components/AnimatedPage'
import { } from './Home.css'
import DoughnutChart from '../../../Components/DoughnutChart'
import axios from 'axios'
import { baseUrl } from '../../../Constants'
import { NavLink } from 'react-router-dom'
import Analysis from '../../../Assets/undraw_analytics_re_dkf8.svg'

const Home = () => {

    const handleLogout = () => {
        const userId = localStorage.getItem("USER_ID")
        axios.post(`${baseUrl}/api/logout/${userId}`)
            .then((res) => {
                alert("Logout sucessfull")
                localStorage.clear()
                window.location.href = "/"
            }).catch((error) => {
                localStorage.clear()
                window.location.href = "/"
                window.location.reload()
            })
    }

    return (
        <AnimatedPage>
            <div className="home p-3 ">
                <div className="header container-fluid w-100 d-flex justify-content-end ">
                    <button className='logout' onClick={handleLogout}>Logout</button>
                    <NavLink to="/profile">
                        <div className="avatar ms-3 overflow-hidden">
                            <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg" alt="" className='img-fluid' />
                        </div>
                    </NavLink>
                </div>

                <div className="container-fluid main text-start p-3">
                    <h1 className='mt-5 fw-600'>Hello! {localStorage.getItem("USER_FIRSTNAME")},</h1>
                    <div className="row mt-4">
                        <div className="col-md-6 col-lg-4">
                            <div className="container p-0 m-0 doughnut-container">
                                <DoughnutChart />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-8 graph-right py-4 px-5 " id='analyze'>
                            <h2 className='ms-3 fw-600'>Analyzing you profile</h2>
                            <img src={Analysis} alt="" id="analysisImg" />
                            <ul style={{ marginTop: "1rem" }}>
                                <li>31.6% of you time is utilized during Lectures</li>
                                <li>42.1% of you time is utilized during sleeps</li>
                                <li>5.3% of you time is utilized while Eating</li>
                                <li>10.5% of you time is Self Study</li>
                                <li>10.5% of you time is Free time</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8 col-lg-8">
                            <div className="container p-0 m-0 graph-right p-4">
                                <h3>You can also ... </h3>
                                <div className="row mt-3">
                                    <div className="col-md-3">
                                        <div className="suggestCard" id="card1">
                                            <p>Play Games</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="suggestCard" id="card2">
                                            <p>Read Books</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="suggestCard" id="card3">
                                            <p>Play Cricket</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="suggestCard" id="card4">
                                            <p>Listen to Music</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 my-4">
                                        <div className="suggestCard" id="card5">
                                            <p>Drawing</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 graph-right p-0 overflow-hidden">
                            <div id="carouselExampleControls" className="carousel slide h-100" data-bs-ride="carousel">
                                <div className="carousel-inner h-100">
                                    <div className="carousel-item active">
                                        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-happiness-quotes-06-carrie-underwood-1621885408.png" Name="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://wallpaperaccess.com/full/292399.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/happy-quotes-psdthe-secret-1550850742.jpg?crop=1xw:1xh;center,top&resize=480:*" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    )
}

export default Home

