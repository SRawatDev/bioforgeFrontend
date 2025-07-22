import { useNavigate, useParams } from "react-router-dom";
import "./dashboard.css";
import DashboardSidebar from "./DashboardSidebar";
import Main from "./Main";
import { MobileUi } from "./MobileUi";
import ManageLinks from "../links/Index";
import UpadteProfile from "../updateProfile/Index"
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import { useEffect, useState } from "react";
import ErrorMessage from "../../../helpers/ErrorMessage";
import ProfileShimmer from "../../ProfileShimmer";
import { FaShareAlt } from "react-icons/fa"; // Import share icon

interface Theme {
  fontFamily: string;
  is_colorImage: string;
  fontColor: string;
}

interface Link {
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  is_index: number;
  _id: string;
}

interface UserInfo {
  _id: string;
  username: string;
  email: string;
  social: Link[];
  non_social: Link[];
  bio: string;
  banner_img: string;
  profile_img: string;
  theme: Theme;
}

const Index = () => {
  const { layout, id } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const navigate = useNavigate();

  const getUserDetail = async () => {
    if (!id) return;
    setLoader(true);
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getUserInfo,
        { _id: id },
        "GET",
        {}
      );
      setLoader(false);
      if (!response?.data?.status) {
        navigate("/");
        ErrorMessage(response?.data?.data?.message || "Invalid user");
      } else {
        setUserInfo(response?.data?.data[0]);
      }
    } catch (err: any) {
      setLoader(false);
      ErrorMessage(err.message || "Something went wrong");
    }
  };

  // Function to open profile in new tab
  const openProfileInNewTab = () => {
    if (userInfo && userInfo._id) {
      window.open(`/dashboard/profile/${userInfo._id}`, '_blank');
    }
  };

  useEffect(() => {
    getUserDetail();
    
    // Check if screen is mobile size
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 992);
    };
    
    // Initial check
    checkMobileView();
    
    // Add resize listener
    window.addEventListener('resize', checkMobileView);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobileView);
  }, [id]);

  return (
    <>
    {/* <DashboardSidebar /> */}
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">
        <DashboardSidebar />
      </div>
      
      <div className="dashboard-main-area">
        <div className="dashboard-main-content">
          {layout === "profile" ? (
            <Main getUserDetails={getUserDetail} />
          ) : (
            <ManageLinks getUserDetail={getUserDetail} />
          )}
        </div>
      </div>
      
      <div className={`dashboard-preview ${isMobileView ? 'mobile-mode' : ''}`}>
        <div className="preview-header">
          <h3>Mobile Preview</h3>
          <div className="preview-actions">
            <p>See how your profile looks on mobile devices</p>
            {/* Share button */}
            <button 
              className="share-profile-button" 
              onClick={openProfileInNewTab}
              title="Open profile in new tab"
            >
              <FaShareAlt /> share
            </button>
          </div>
        </div>
        
        <div className="preview-device">
          <div className="device-frame">
            <div className="device-status-bar"></div>
            <div className="device-content">
              {loader ? (
                <ProfileShimmer />
              ) : (
                <MobileUi userInfo={userInfo} />
              )}
            </div>
            <div className="device-home-button"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Index;
