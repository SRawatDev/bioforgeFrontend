import React, { useState } from "react";
import { defaultConfig } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { LogoutModal } from "../../../layout/Header";
import SuccessMessage from "../../../helpers/Success";

const DashboardSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const handleLogoutClick = () => {
    const dismissBtn = document.querySelector(
      '#offcanvasTop [data-bs-dismiss="offcanvas"]'
    ) as HTMLElement;
    if (dismissBtn) dismissBtn.click();
    setTimeout(() => setShowLogout(true), 300);
  };
  const handleLogoutConfirm = () => {
    SuccessMessage("Logout successfully");
    localStorage.clear();
    setShowLogout(false);
    navigate("/login");
  };
  return (
    <>
      <nav id="sidebar" className="d-flex flex-column">
        <div className="px-3 mb-3 d-flex align-items-center gap-2 user-select-none">
          <div className="avatar" aria-label="User avatar placeholder">
            <img
              src={
                localStorage.getItem("profile_img")
                  ? defaultConfig.imagePath +
                    localStorage.getItem("profile_img")
                  : "https://i.pravatar.cc/48"
              }
              alt="Profile"
              className="home-header-avatar"
            />
          </div>
          <div className="fw-semibold user-select-none">
            {localStorage.getItem("username")} <i className="bi bi-caret-down-fill" />
          </div>
        </div>
        <ul className="nav flex-column nav-pills mx-2 mb-3">
          <li className="nav-item">
            <ul className="nav flex-column ms-3 mt-1">
              <li className="nav-item">
                <Link
                  to={`/dashboard/profile/${localStorage.getItem("_id")}`}
                  className="nav-link active px-2 rounded-pill"
                  style={{ background: "#c7c4bb", color: "#000" }}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/dashboard/Links/${localStorage.getItem("_id")}`}
                  className="nav-link px-2 rounded-pill"
                >
                  Links
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/deleteAccount"}
                  className="nav-link px-2 rounded-pill"
                >
                  Account Delete
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/changepassword"}
                  className="nav-link px-2 rounded-pill"
                >
                  Change Password
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link px-2 rounded-pill"
                  onClick={handleLogoutClick}
                  data-bs-dismiss="offcanvas"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
