import React from 'react'
import { IoMenuOutline } from 'react-icons/io5';
const Homeheader: React.FC = () => {
    return (
        <header>
            <div className="container">
                <a href="#" className="logo">
                    <img src="https://i.postimg.cc/x87tV35B/logo.png" alt="Funel logo" />
                </a>
                <div className="navbar-wrapper">
                    <button className="navbar-menu-btn" data-navbar-toggle-btn="">
                        <IoMenuOutline size={24} />
                    </button>
                    <nav className="navbar header-navbar" data-navbar="">
                        <button className="btn btn-primary">Sign In</button>
                        <button className="btn btn-primary">Sign Up</button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Homeheader