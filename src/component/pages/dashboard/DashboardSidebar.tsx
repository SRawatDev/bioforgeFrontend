import React, { useState, useEffect } from "react";
import { defaultConfig } from "../../../config";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogoutModal } from "../../../layout/Header";
import SuccessMessage from "../../../helpers/Success";
import { 
  IoClose, 
  IoHomeOutline, 
  IoLinkOutline, 
  IoPersonOutline, 
  IoTrashOutline, 
  IoKeyOutline, 
  IoLogOutOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
  IoNotificationsOutline
} from "react-icons/io5";
import { FaUser, FaCrown } from "react-icons/fa";
// import "./DashboardSidebar.css";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ isMobile, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogoutClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
    setTimeout(() => setShowLogout(true), 300);
  };

  const handleLogoutConfirm = () => {
    SuccessMessage("Logout successfully");
    localStorage.clear();
    setShowLogout(false);
    navigate("/login");
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const menuItems = [

    {
      path: `/dashboard/changepassword/${localStorage.getItem("_id")}`,
      label: "Change Password",
      icon: <IoKeyOutline />,
      category: "settings"
    },
    {
      path: `/dashboard/links/${localStorage.getItem("_id")}`,
      label: "Manage Links",
      icon: <IoLinkOutline />,
      category: "main"
    },
    {
      path: `/dashboard/updateProfile/${localStorage.getItem("_id")}`,
      label: "Edit Profile",
      icon: <IoPersonOutline />,
      category: "main"
    },
   
    {
      path: "/deleteAccount",
      label: "Delete Account",
      icon: <IoTrashOutline />,
      category: "settings"
    }
  ];

  const mainItems = menuItems.filter(item => item.category === "main");
  const settingsItems = menuItems.filter(item => item.category === "settings");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && onClose) {
        const sidebar = document.querySelector('.dashboard-sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          onClose();
        }
      }
    };
    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, onClose]);

  return (
    <>
      <nav className={`dashboard-sidebar ${isMobile ? 'mobile-sidebar' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        {isMobile && (
          <button className="sidebar-close-btn" onClick={onClose}>
            <IoClose />
          </button>
        )}
        <div className="sidebar-header">
        <div className="user-profile-section">
            <div className="user-profile">
              <div className="avatar-container">
                <img 
                  src={
                    localStorage.getItem("profile_img")
                      ? defaultConfig.imagePath + localStorage.getItem("profile_img")
                      : "https://i.pravatar.cc/48"
                  }
                  alt="Profile"
                  className="user-avatar"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://i.pravatar.cc/48";
                  }}
                />
                <div className="status-indicator online"></div>
                <div className="user-badge">
                  <FaCrown />
                </div>
              </div>
              
              {!isCollapsed && (
                <div className="user-info">
                  <h6 className="username">
                    {localStorage.getItem("username") || "User"}
                  </h6>
                  <span className="user-role">Premium User</span>
                  <div className="user-stats">
                    <span className="stat-item">
                      <IoStatsChartOutline />
                      <span>1.2k views</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="sidebar-content">
          <div className="sidebar-menu">
            {/* Main Navigation */}
            <div className="menu-section">
              {!isCollapsed && <h6 className="section-title">Main</h6>}
              <ul className="menu-list">
                {mainItems.map((item, index) => (
                  <li key={index} className="menu-item">
                    <Link
                      to={item.path}
                      className={`menu-link ${isActiveLink(item.path) ? 'active' : ''}`}
                      onClick={isMobile && onClose ? onClose : undefined}
                      title={isCollapsed ? item.label : ''}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      {!isCollapsed && <span className="menu-text">{item.label}</span>}
                      {isActiveLink(item.path) && <div className="active-indicator"></div>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Settings Navigation */}
            <div className="menu-section">
              {!isCollapsed && <h6 className="section-title">Settings</h6>}
              <ul className="menu-list">
                {settingsItems.map((item, index) => (
                  <li key={index} className="menu-item">
                    <Link
                      to={item.path}
                      className={`menu-link ${isActiveLink(item.path) ? 'active' : ''}`}
                      onClick={isMobile && onClose ? onClose : undefined}
                      title={isCollapsed ? item.label : ''}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      {!isCollapsed && <span className="menu-text">{item.label}</span>}
                      {isActiveLink(item.path) && <div className="active-indicator"></div>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

           
          </div>
        </div>
        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={handleLogoutClick}
            title={isCollapsed ? "Logout" : ''}
          >
            <IoLogOutOutline className="menu-icon" />
            {!isCollapsed && <span>Logout</span>}
          </button>
          {!isMobile && (
            <button
              className="collapse-toggle"
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <IoClose className={`toggle-icon ${isCollapsed ? 'rotated' : ''}`} />
            </button>
          )}
        </div>
      </nav>

      {isMobile && (
        <div className="sidebar-backdrop" onClick={onClose}></div>
      )}

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
