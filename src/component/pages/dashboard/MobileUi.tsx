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
        aria-label="Mobile preview of Linktree"
      >
        <div
          className="profile-container"
          style={{
            backgroundColor: userInfo?.theme?.is_colorImage,
            fontFamily: userInfo?.theme?.fontFamily,
            color: `${userInfo?.theme?.fontColor
              ? userInfo?.theme?.fontColor
              : "white"
              }`,
          }}
        >
          <div className="cover-photo">
            <img
              id="coverImage three-dots-image"
              src={defaultConfig?.imagePath + userInfo?.banner_img}
              alt="Kapak Resmi"
            />
            {userId !== id.id && userId && (
              <BsThreeDots
                className="threedots"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
              />
            )}
          </div>
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
                backgroundColor: userInfo?.theme?.is_colorImage,
                fontFamily: userInfo?.theme?.fontFamily,
                color: `${userInfo?.theme?.fontColor
                  ? userInfo?.theme?.fontColor
                  : "white"
                  }`,
              }}
            >
              {userInfo?.username}{" "}
            </h1>
            <p
              id="bio"
              style={{
                backgroundColor: userInfo?.theme?.is_colorImage,
                fontFamily: userInfo?.theme?.fontFamily,
                color: `${userInfo?.theme?.fontColor
                  ? userInfo?.theme?.fontColor
                  : "white"
                  }`,
              }}
            >
              {userInfo?.bio}
            </p>
            <button style={{ marginTop: 15 }}>
              <div className="contactEmail">
        
                <p
                  style={{
                    backgroundColor: userInfo?.theme?.is_colorImage,
                    fontFamily: userInfo?.theme?.fontFamily,
                    color: `${userInfo?.theme?.fontColor
                      ? userInfo?.theme?.fontColor
                      : "white"
                      }`,
                  }}
                >
                  <Link className="mobile-email-button" to={`mailto:${userInfo?.email}`} target="blank">
                          <BiLogoGmail />
                  {userInfo?.email}</Link>
                </p>
              </div>
            </button>
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
              >
                <img
                  src={defaultConfig?.imagePath + link.linkLogo}
                  alt={link.linkTitle}
                  className="link-logo"
                />
                <span
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
                          backgroundColor: userInfo?.theme?.is_colorImage, 
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
