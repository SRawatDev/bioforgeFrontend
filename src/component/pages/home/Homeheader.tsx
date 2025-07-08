import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { defaultConfig } from "../../../config";

const Homeheader: React.FC = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("accessToken");

    const profileImg = localStorage.getItem("profile_img")
        ? defaultConfig.imagePath + localStorage.getItem("profile_img")
        : "https://i.pravatar.cc/48";

    const userId = localStorage.getItem("_id");

    return (
        <header className="home-header">
            <div className="home-header-container">
                <Link to="/" className="home-header-logo">
                    <img src="/src/assets/logo.png" alt="Logo" height={50} />
                </Link>

                <div className="home-header-actions">
                    {!isLoggedIn ? (
                        <div className="home-header-buttons">
                            <button
                                className="btn btn-outline"
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/register")}
                            >
                                Sign Up
                            </button>
                        </div>
                    ) : (
                        <div
                            className="home-header-profile"
                            onClick={() => navigate(`/profile/${userId}`)}
                        >
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="home-header-avatar"
                            />
                            <span className="home-header-name">Dashboard</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Homeheader;
