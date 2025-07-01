import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoLinkSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';



const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
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
                        <li> <FaHome /> <Link to={"/"}>Home</Link></li>
                        <li><ImProfile /> <Link  to={`/profile/${localStorage.getItem("_id")}`} >Profile</Link></li>
                        <li><IoLinkSharp /><Link to={"/link"}>Links</Link></li>
                        <li><IoSettingsSharp />Setiing</li>
                        <li><MdLogout />logout</li>
                    </ul>
                </div>
            </div>


            <div className="page-content">{children}</div>
        </>
    );
};

export default Header;
