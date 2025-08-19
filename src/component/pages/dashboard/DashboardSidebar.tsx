import React, { useState, useEffect } from "react";
import { defaultConfig } from "../../../config";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogoutModal } from "../../../layout/Header";
import SuccessMessage from "../../../helpers/Success";
import { IoVideocam } from "react-icons/io5";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import "./DashboardSidebar.css";
import "./dashboard.css";
import { useDispatch } from "react-redux";
import { clearData } from "../../../redux/Slice";
import { MdProductionQuantityLimits, MdUnsubscribe } from "react-icons/md";
import DeleteAccountModal from "../accountDelete/Index";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
  children?: React.ReactNode
}

const DashboardSidebar: React.FC<SidebarProps> = ({ isMobile, onClose, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const storedata = useDispatch();

  const handleLogoutClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
    setTimeout(() => setShowLogout(true), 300);
  };

  const handleDeleteAccountClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
    setTimeout(() => setShowDeleteModal(true), 300);
  };

  const handleLogoutConfirm = () => {
    SuccessMessage("Logout successfully");
    localStorage.clear();
    storedata(clearData())
    setShowLogout(false);
    navigate("/login");
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      path: `/dashboard/updateProfile/${localStorage.getItem("_id")}`,
      label: "Edit Profile",
      icon: <FaUser />,
      category: "main",
    },
    {
      path: `/dashboard/links/${localStorage.getItem("_id")}`,
      label: "Manage Links",
      icon: <PiLinkSimpleHorizontalBold />,
      category: "main",
    },
    {
      path: `/dashboard/Video/${localStorage.getItem("_id")}`,
      label: "Manage Video",
      icon: <IoVideocam />,
      category: "main",
    },
    {
      path: `/dashboard/product/${localStorage.getItem("_id")}`,
      label: "Manage Product",
      icon: <MdProductionQuantityLimits />,
      category: "main",
    },
    {
      path: `/dashboard/subscribe/${localStorage.getItem("_id")}`,
      label: "Subcriber",
      icon: <MdUnsubscribe />,
      category: "main",
    },
    {
      path: `/dashboard/changepassword`,
      label: "Change Password",
      icon: <RiLockPasswordFill />,
      category: "main",
    },

  ];
  const mainItems = menuItems.filter((item) => item.category === "main");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && onClose) {
        const sidebar = document.querySelector(".dashboard-sidebar");
        if (sidebar && !sidebar.contains(event.target as Node)) {
          onClose();
        }
      }
    };
    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, onClose]);
  return (
    <>
      <div className="Main-Navbar-section d-flex">
        <nav className="sidebardashboard bg-white">
          <div className="sidebar-header">
            <div className="user-profile-section">
              <Link to={"/"}>
                <div className="user-profile">
                  <div className="avatar-container">
                    <img
                      src={
                        localStorage.getItem("profile_img")
                          ? defaultConfig.imagePath +
                          localStorage.getItem("profile_img")
                          : "https://i.pravatar.cc/48"
                      }
                      alt="Profile"
                      className="user-avatar"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://i.pravatar.cc/48";
                      }}
                    />
                  </div>
                  {!isCollapsed && (
                    <div className="user-info">
                      <h6 className="username">
                        {localStorage.getItem("username") || "User"}
                      </h6>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-menu">
              <div className="menu-section">
                <ul className="menu-list">
                  {mainItems.map((item, index) => (
                    <li key={index} className="menu-item">
                      {item.path ? (
                        <Link
                          to={item.path}
                          className={`menu-link ${isActiveLink(item.path) ? "active" : ""
                            }`}
                          onClick={isMobile && onClose ? onClose : undefined}
                          title={isCollapsed ? item.label : ""}
                        >
                          <span className="menu-icon">{item.icon}</span>
                          {!isCollapsed && (
                            <span className="menu-text">{item.label}</span>
                          )}
                          {item.path && isActiveLink(item.path) && (
                            <div className="active-indicator"></div>
                          )}
                        </Link>
                      ) : (
                        <button
                          className="menu-link menu-button"
                          title={isCollapsed ? item.label : ""}
                          style={{
                            background: 'none',
                            border: 'none',
                            width: '100%',
                            textAlign: 'left',
                            cursor: 'pointer',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: '#dc3545',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            (e.target as any).style.backgroundColor = '#fff5f5';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as any).style.backgroundColor = 'transparent';
                          }}
                        >
                          <span className="menu-icon">{item.icon}</span>
                          {!isCollapsed && (
                            <span className="menu-text">{item.label}</span>
                          )}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="dropdown w-100">
            <button
              className="btn logout-btns dropdown-toggle d-flex align-items-center"
              type="button"
              id="logoutDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              title={isCollapsed ? "Logout" : ""}
            >
              {!isCollapsed && <span className="ms-2">Setting</span>}
            </button>
            <ul className="dropdown-menu" aria-labelledby="logoutDropdown">
              <li className="drop_menu">
                <span  onClick={handleDeleteAccountClick}>
                  Delete Account
                </span>
              </li>
              <li className="drop_menu">
                <span  onClick={handleLogoutClick}>
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </nav>
        {isMobile && <div className="sidebar-backdrop" onClick={onClose}></div>}
        {showLogout && (
          <LogoutModal
            onClose={() => setShowLogout(false)}
            onConfirm={handleLogoutConfirm}
          />
        )}
        <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        />
        {children}
      </div>
    </>
  );
};

export default DashboardSidebar;