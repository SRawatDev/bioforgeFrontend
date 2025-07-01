import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Homeheader: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header>
            <div className="container">
                <Link to={"/"} className="logo">
                    <img src="/src/assets/logo.png" alt="Logo" height={50} />
                </Link>
                <div className="navbar-wrapper">
                    {!localStorage.getItem("accessToken") ? (
                        <nav className="nav-bar header-navbar" data-navbar="">
                            <button className="btn btn-primary" onClick={() => navigate("/login")}>
                                Sign In
                            </button>
                            <button className="btn btn-primary" onClick={() => navigate("/register")}>
                                Sign Up
                            </button>
                        </nav>
                    ) :
                        (<div className="profile" onClick={() => navigate("/profile/" + localStorage.getItem("_id"))}>
                            <img
                                src="https://i.pravatar.cc/48"
                                alt="Profile Picture"
                                className="avatar"
                            />
                            <div className="info">
                                <span className="name">Dashboard</span>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </header>
    );
};

export default Homeheader;
