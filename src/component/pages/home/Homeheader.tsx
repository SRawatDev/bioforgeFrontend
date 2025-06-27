import React from 'react'
import { IoMenuOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Homeheader: React.FC = () => {
    const navidate = useNavigate()
    return (
        <header>
            <div className="container">
                <Link to={"/"} className="logo">
                    <img src="https://i.postimg.cc/x87tV35B/logo.png" alt="Funel logo" />
                </Link>
                <div className="navbar-wrapper">
                    <button className="navbar-menu-btn" data-navbar-toggle-btn="">
                        <IoMenuOutline size={24} />
                    </button>
                    <nav className="navbar header-navbar" data-navbar="">
                        <button className="btn btn-primary" onClick={() => navidate("/login")}>Sign In</button>
                        <button className="btn btn-primary" onClick={() => navidate("/register")}>Sign Up</button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Homeheader