import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoLinkSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import SuccessMessage from '../helpers/Success';

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        // Find and trigger any element with data-bs-dismiss="offcanvas"
        const dismissBtn = document.querySelector('#offcanvasTop [data-bs-dismiss="offcanvas"]') as HTMLElement;
        if (dismissBtn) dismissBtn.click();

        setTimeout(() => setShowLogout(true), 300);
    };


    const handleLogoutConfirm = () => {
        SuccessMessage("Logout successfully")
        localStorage.clear();
        setShowLogout(false);
        navigate('/login');
    };

    return (
        <>
            <div className='mainheader d-flex justify-content-center '>
                <div className='toplogo d-flex justify-content-between'>
                    <img src="/src/assets/logo.png" alt="Logo" height={150} />
                </div>

                <button
                    className="btn btn-primary header-button"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasTop"
                    aria-controls="offcanvasTop"
                >
                    <GiHamburgerMenu />
                </button>
            </div>

            <div
                className="offcanvas offcanvas-top offcanvas-stop"
                tabIndex={-1}
                id="offcanvasTop"
                aria-labelledby="offcanvasTopLabel"
            >
                <div className="offcanvas-header">
                    <div className='toplogo d-flex justify-content-between'>
                        <img src="/src/assets/logo.png" alt="Logo" height={30} />
                    </div>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>

                <div className="offcanvas-body">
                    <ul>
                        <li data-bs-dismiss="offcanvas"><FaHome /> <Link to="/">Home</Link></li>
                        <li data-bs-dismiss="offcanvas"><ImProfile /> <Link to={`/profile/${localStorage.getItem("_id")}`}>Profile</Link></li>
                        <li data-bs-dismiss="offcanvas"><IoLinkSharp /> <Link to="/link">Links</Link></li>
                        {/* <li><IoSettingsSharp /> Settings</li> */}
                        <li onClick={handleLogoutClick} data-bs-dismiss="offcanvas"><MdLogout /> Logout</li>
                    </ul>
                </div>
            </div>

            <div className="page-content">{children}</div>

            {showLogout && (
                <LogoutModal
                    onClose={() => setShowLogout(false)}
                    onConfirm={handleLogoutConfirm}
                />
            )}
        </>
    );
};

export default Header;


interface LogoutModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>Logout Confirmation</h3>
                <p>Are you sure you want to logout?</p>
                <div className="modal-actions">
                    <button className="btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn submit" onClick={onConfirm}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
