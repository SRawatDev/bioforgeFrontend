import React, { useEffect, useState } from "react";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { BsThreeDots } from "react-icons/bs";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import { defaultConfig } from "../../../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { socialPlatforms } from "../links/linksAddEdit";
import axios from "axios";
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
interface MobileUiProps {
  userInfo: userInfo | null;
}
export const MobileUi: React.FC<MobileUiProps> = ({ userInfo }) => {
  const [ip, setIp] = useState<string>("");
  const navigate = useNavigate();
  const id = useParams();
  const getUserIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIp(response.data.ip);
    } catch (error: any) {
      ErrorMessage(error.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getUserIp();
  }, [ip]);



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
    } catch (error: any) {
      ErrorMessage(error.message || "Something went wrong");
    }
  };
  const userId = localStorage.getItem("_id") || null;
  return (
    <>

      <section
        id="phone-preview-container"
        style={{ height: "100%" }}

        aria-label="Mobile preview of Linktree"
      >
        <div
          className="profile-container"
          style={{
    
            backgroundImage: `url(${defaultConfig?.imagePath + userInfo?.banner_img})`,
            height: "100%",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow:"scroll",
            fontFamily: userInfo?.theme?.fontFamily,
            color: `${userInfo?.theme?.fontColor
              ? userInfo?.theme?.fontColor
              : "white"
              }`,
          }}
        >
        
          <div className="profile-picture">
            <img
              id="profileImage"
              src={defaultConfig?.imagePath + userInfo?.profile_img}
              alt="Profil Fotoğrafı"
            />
          </div>
          <div className="profile-info">
            <h1
              id="username "
              className="editprofile"
              style={{
                fontFamily: userInfo?.theme?.fontFamily,
                color: `${userInfo?.theme?.fontColor
                  ? userInfo?.theme?.fontColor
                  : "white"
                  }`,
              }}
            >
              @{userInfo?.username}{" "}
            </h1>
            <p
              id="bio"
              style={{
                fontFamily: userInfo?.theme?.fontFamily,
                textAlign:"center",
                color: `${userInfo?.theme?.fontColor
                  ? userInfo?.theme?.fontColor
                  : "white"
                  }`,
              }}
            >
              {userInfo?.bio}
            </p>
            <div className="contactEmail">

              <p
                style={{
                  fontFamily: userInfo?.theme?.fontFamily,
                  color: `${userInfo?.theme?.fontColor
                    ? userInfo?.theme?.fontColor
                    : "white"
                    }`,
                }}
              >
                <p className="mobile-email-button">
                  <BiLogoGmail />
                  <p>{userInfo?.email}</p></p>
              </p>
            </div>
          </div>
          <div className="edit-form" id="editForm">
            <input
              type="text"
              id="editUsername"
              placeholder="Adınızı girin"
            />
            <textarea
              id="editBio"
              style={{ fontFamily: `${userInfo?.theme?.fontFamily}` }}
              placeholder="Hakkınızda bir şeyler yazın.."
              rows={3}
              defaultValue={""}
            />
          </div>

          <div className="links-list">
            {userInfo?.non_social.map((link) => (
              <Link
                key={link._id}
                to={link.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
                onClick={() => handleClickSubmit(link._id)}
                style={{
                  '--card-bg': userInfo?.theme?.is_colorImage || '#333',
                  '--card-color': userInfo?.theme?.fontColor || 'white',
                  '--card-font': userInfo?.theme?.fontFamily || 'sans-serif',
                } as React.CSSProperties}
              >
                <img
                  src={defaultConfig?.imagePath + link.linkLogo}
                  alt={link.linkTitle}
                  className="link-logo"
                />
                <span
                  className="link-card-title"
                  style={{
                    fontFamily: userInfo?.theme?.fontFamily,
                    color: `${userInfo?.theme?.fontColor
                      ? userInfo?.theme?.fontColor
                      : "white"
                      }`,
                  }}
                >
                  {link.linkTitle}
                </span>
              </Link>
            ))}
          </div>
          <div className="spcial-links-list d-flex  justify-content-center gap-2">
            {userInfo?.social.map((link) => {
              const matchedPlatform = socialPlatforms.find(
                (platform) =>
                  platform.label.toLowerCase() ===
                  link.linkTitle.toLowerCase()
              );
              return (
                <>
                  <Link
                    key={link._id}
                    to={link.linkUrl}
                    target="_blank"
                    style={{ color: "black" }}
                    rel="noopener noreferrer"
                    className="link-card-social"
                    onClick={() => handleClickSubmit(link._id)}
                  >
                    {matchedPlatform && (
                      <span
                        className="social-icon"
                        style={{
                          fontFamily: `${userInfo?.theme?.fontFamily}`,
                          color: `${userInfo?.theme?.fontColor ? userInfo?.theme?.fontColor : "white"}`,
                          gap: 0
                        }}
                      >
                        {matchedPlatform.icon}
                      </span>
                    )}
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
};
