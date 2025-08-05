import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultConfig } from "../../config";
import { Link } from "react-router-dom";
const Navbar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("accessToken");

  const profileImg = localStorage.getItem("profile_img")
    ? defaultConfig.imagePath + localStorage.getItem("profile_img")
    : "https://i.pravatar.cc/48";

  const userId = localStorage.getItem("_id");
  return (
    <>
      {/* <nav
        className="navbar"
        style={{ backgroundColor: "red", minHeight: "70px" }}
      >
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="navbar-logo">
            
            </div>
          </div>
          <div
            className={`navbar-links-container ${
              isMobileMenuOpen ? "active" : ""
            }`}
          >
            <div className="navbar-links">
              <Link to={"/"} className="navbar-link">
                Home
              </Link>
              <Link to={"/landingPage"} className="navbar-link">
                Theme
              </Link>
            </div>
            <div className="navbar-right">
              {!isLoggedIn ? (
                <>
                  <Link to={"/login"} className="btn newbtn-secondary btn-large">
                    SignIn
                  </Link>
                  <Link to={"/register"} className="btn newbtn-secondary btn-large">
                    Signup
                  </Link>
                </>
              ) : (
                <div
                  className="home-header-profile "
                  onClick={() => navigate(`/dashboard/index/${userId}`)}
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
        </div>
      </nav> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container" style={{ padding: "15px" }}>
          <a className="navbar-brand fw-bold" href="#" style={{ fontSize: "24px" }}>
            BioForge
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item" style={{padding:"0px 10px 5px 2px"}}>
                <Link className="nav-link active text-dark" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item"style={{padding:"0px 10px 5px 2px"}} >
                <Link className="nav-link text-dark" to={"/landingPage"}>
                  Theme
                </Link>
              </li>

             {!isLoggedIn ?(
              <>
               <li className="nav-item" style={{padding:"0px 10px 5px 2px"}}>
                <Link className="nav-link text-dark" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item" style={{padding:"0px 10px 5px 2px"}}>
                <Link className="btn btn-primary newbton" style={{padding:"6px 28px 6px 28px"}} to={"/register"} >
                  Signup
                </Link>
              </li>
              </>
              ):( <li
                 className="nav-item d-flex"
                  onClick={() => navigate(`/dashboard/updateProfile/${userId}`)}
                  style={{background:"#7162f3",padding:"5px 13px 6px 16px",borderRadius:"10px" ,cursor: "pointer"}}
                >
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="home-header-avatar"
                  />
                  <Link to={`/dashboard/index/${userId}`} className="nav-link text-dark">
                  <span style={{ color :"white" }}>Dashboard</span></Link>
                </li>)
             }
            </ul>
          </div>
        </div>
      </nav>
{/* background: #7162f3;
    padding: 5px 13px 6px 16px;
    border-radius: 10px; */}
      {children}
    </>
  );
};

export default Navbar;
