import React, { useEffect, useState } from "react";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { BsThreeDots } from "react-icons/bs";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import { defaultConfig } from "../../../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { socialPlatforms } from "../links/linksAddEdit";
import ProfileShimmer from "../../ProfileShimmer";
import axios from "axios";
import { Report } from "./Report";
import "./profile.css";

interface userInfo {
  _id: string;
  username: string;
  email: string;
  social: Link[];
  non_social: Link[];
  bio: string;
  banner_img: string;
  profile_img: string;
  theme: theme;
}

interface theme {
  fontFamily: string;
  fontColor: string;
  is_colorImage: string;
  themeDesign?: string;
}

interface Link {
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  is_index: number;
  _id: string;
}

const Index: React.FC = () => {
  const [ip, setIp] = useState<string>("");
  const navigate = useNavigate();
  const id = useParams();
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getUserDetail = async () => {
    setLoader(true);
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getUserInfo,
        { _id: id.id },
        "GET",
        {}
      );
      setLoader(false);
      if (!response?.data?.status) {
        navigate("/");
        ErrorMessage(response?.data?.data?.message);
      } else {
        setUserInfo(response?.data?.data[0]);
      }
    } catch (err: any) {
      setLoader(true);
    }
  };

  const getUserIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIp(response.data.ip);
    } catch (error: any) {
      ErrorMessage(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getUserDetail();
    getUserIp();
  }, []);

  const handleClickSubmit = async (id: string) => {
    try {
      const userId = localStorage.getItem("accessToken")
        ? localStorage.getItem("_id") || ""
        : "";
      const payload = {
        userId,
        ipAddress: userId ? "" : ip,
      };
      const response = await callAPIWithoutAuth(
        apiUrls.linkClicked + "/" + id,
        {},
        "POST",
        payload
      );
      if (!response?.data?.status) {
        navigate("/");
        ErrorMessage(response?.data?.data?.message);
      }
    } catch (error: any) {}
  };

  const userId = localStorage.getItem("_id") || null;
  return (
    <>
      {loader ? (
        <ProfileShimmer />
      ) : (
        <div className="mobile-profile">
          {userId !== id.id && userId && (
            <BsThreeDots
              className="threedots"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
            />
          )}

         <div
  className="mobile-content"
  style={{
    position: "relative",
    height: "100%",
    overflow: "scroll",
    scrollbarWidth: "none",
    fontFamily: userInfo?.theme?.fontFamily,
    color: userInfo?.theme?.fontColor || "white",
  }}
>
  {/* Blurred background layer */}
  <div
    className="blurred-background"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${defaultConfig?.imagePath + userInfo?.banner_img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "blur(3px)",
      zIndex: 0,
    }}
  ></div>

  {/* Optional dark overlay for readability */}
  <div
    className="background-overlay"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 1,
    }}
  ></div>

  {/* Foreground content */}
  <div style={{ position: "relative", zIndex: 2,width: "100%" }}>
    <div className="mobile-profile-header">
      <div className="mobile-avatar">
        <img
          src={defaultConfig?.imagePath + userInfo?.profile_img}
          alt="Profile"
        />
      </div>

      <div className="mobile-user-info">
        <h1 className="mobile-username">
          @{userInfo?.username}
          {localStorage.getItem("accessToken") && userId === id.id}
        </h1>

        <p className="mobile-email-button mobile-bio">
          <BiLogoGmail />
          <span>{userInfo?.email}</span>
        </p>

        <p className="mobile-bio" style={{ textAlign: "left" }}>
          {userInfo?.bio}
        </p>
      </div>
    </div>

    <div className="mobile-links">
      {userInfo?.non_social && userInfo.non_social.length > 0 && (
        <div className="mobile-links-list">
          {userInfo.non_social.map((link) => (
            <Link
              key={link._id}
              to={link.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`link-card ${userInfo.theme.themeDesign || "round"}`}
              onClick={() => handleClickSubmit(link._id)}
              style={
                {
                  padding: "10px",
                  "--card-bg": userInfo?.theme?.is_colorImage || "#333",
                  "--card-color": userInfo?.theme?.fontColor || "white",
                  "--card-font": userInfo?.theme?.fontFamily || "sans-serif",
                } as React.CSSProperties
              }
            >
              <img
                src={defaultConfig?.imagePath + link.linkLogo}
                alt={link.linkTitle}
                className="mobile-link-icon"
              />
              <span className="mobile-link-title">{link.linkTitle}</span>
            </Link>
          ))}
        </div>
      )}

      {userInfo?.social && userInfo.social.length > 0 && (
        <div className="mobile-social-section">
          <div className="mobile-social-icons">
            {userInfo.social.map((link) => {
              const matchedPlatform = socialPlatforms.find(
                (platform) =>
                  platform.label.toLowerCase() ===
                  link.linkTitle.toLowerCase()
              );
              return (
                <Link
                  key={link._id}
                  to={link.linkUrl}
                  target="_blank"
                  style={{ color: "black" }}
                  rel="noopener noreferrer"
                  className="link-card-social"
                  onClick={() => handleClickSubmit(link._id)}
                >
                  <span
                    className="social-icon"
                    style={{
                      fontFamily: userInfo?.theme?.fontFamily,
                      color: userInfo?.theme?.fontColor || "white",
                      gap: 0,
                    }}
                  >
                    {matchedPlatform && matchedPlatform.icon}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </div>
</div>

        </div>
      )}
      <Report userName={userInfo?.username || ""} />
    </>
  );
};

export default Index;
