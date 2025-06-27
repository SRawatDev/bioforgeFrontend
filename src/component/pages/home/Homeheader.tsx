import React from 'react'
import { Link } from 'react-router-dom'
import image from "../../../../public/image"

export default function Homeheader() {
    return (
        <>  <header className="header">
            <nav className="navbar navbar-expand-lg p-0">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
                            <li className="nav-item header-item">
                                <Link className="nav-link " aria-current="page" to="/">
                                    {" "}
                                    HOME
                                </Link>
                            </li>
                            <li className="nav-item header-item">
                                <Link className="nav-link " aria-current="page" to="#">
                                    {" "}
                                    SUBSCRIBE{" "}
                                </Link>
                            </li>
                            <li className="nav-item header-item">
                                <Link className="nav-link" to="#">
                                    {" "}
                                    THE APP{" "}
                                </Link>
                            </li>
                            <li className="nav-item header-item">
                                <Link className="nav-link" to="#">
                                    {" "}
                                    FEATURES{" "}
                                </Link>
                            </li>
                            <li className="nav-item header-item">
                                <Link className="nav-link" to="/contact">
                                    {" "}
                                    CONTACT
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
            <section className="top-banner-section pb-0">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-3">
                            <div className="banner-content">
                                <div className="banner-heading">
                                    <h3>CREDO IN DEUM</h3>
                                    <h5 className="mt-3">
                                        The mobile app that will inspire, motivate and help you{" "}
                                    </h5>
                                </div>
                                {!localStorage.getItem('accessToken') &&
                                    <div className="banner-btn mt-40">
                                        <Link to={"/user/login"} className="theme-btn">Sign Up</Link>
                                    </div>
                                }
                                <div className="banner-sub-content mt-40">
                                    <p>Strive for Holiness</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 mb-3">
                            <img src="/image/mobile-banner.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className="banner-sub-content  banner-footer text-end">
                    <p className="mb-0">Available in 13 different languages</p>
                </div>
            </section>

        </>
    )
}
