import React, { useEffect, useState } from "react";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { callAPI, callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import { defaultConfig } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { socialPlatforms } from "../links/linksAddEdit";
import "./mobilePreview.css";
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

interface videoInterface {
  _id?: string;
  videoLink?: string;
}

interface linkCategoryInterface {
  _id: string;
  title: string;
  link: string;
  image?: string;
}

interface theme {
  fontFamily: string;
  is_colorImage: string;
  fontColor: string;
  themeDesign?: string;
}

interface Link {
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  is_index: number;
  video?: videoInterface;
  // LinkCategoryId?: linkCategoryInterface[];
  LinkCategoryId?: linkCategoryInterface[]; // Array of category IDs
  _id: string;
}

interface MobileUiProps {
  userInfo: userInfo | null;
  newUserData: userInfo | null;
}

// Product Slider Component
const ProductSlider: React.FC<{
  LinkCategoryId: linkCategoryInterface[];
  fontFamily?: string;
  fontColor?: string;
}> = ({ LinkCategoryId, fontFamily, fontColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto-loop functionality
  useEffect(() => {
    if (!isAutoplay || LinkCategoryId.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % LinkCategoryId.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [LinkCategoryId.length, isAutoplay]);

  const goToPrevious = () => {
    setIsAutoplay(false);
    setCurrentIndex(prev => (prev - 1 + LinkCategoryId.length) % LinkCategoryId.length);
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  const goToNext = () => {
    setIsAutoplay(false);
    setCurrentIndex(prev => (prev + 1) % LinkCategoryId.length);
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  if (!LinkCategoryId || LinkCategoryId.length === 0) return null;
  return (
    <div className="product-slider-container" style={{ margin: '15px 0' }}>
      <h4 
        style={{ 
          fontFamily, 
          color: fontColor || 'white',
          marginBottom: '10px',
          textAlign: 'center',
          fontSize: '14px'
        }}
      >
        Featured Links ({LinkCategoryId.length})
      </h4>
      
      <div className="product-slider" style={{ position: 'relative' }}>
        {/* Navigation Arrows */}
        {LinkCategoryId.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              style={{
                position: 'absolute',
                left: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={goToNext}
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <FaChevronRight size={12} />
            </button>
          </>
        )}
        
        <div 
          className="product-slides" 
          style={{ 
            display: 'flex',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
            overflow: 'hidden'
          }}
        >
          {LinkCategoryId.map((link, index) => (
            <div 
              key={link._id}
              className="product-slide"
              style={{
                minWidth: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                margin: '0 2px',
                boxSizing: 'border-box'
              }}
            >
              <Link
                to={link.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  width: '100%',
                  gap: '12px'
                }}
              >
                {link.image && (
                  <img
                    src={defaultConfig.imagePath + link.image}
                    alt={link.title}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h5 
                    style={{
                      fontFamily,
                      color: fontColor || 'white',
                      margin: '0 0 4px 0',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {link.title}
                  </h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Dots indicator */}
        {LinkCategoryId.length > 1 && (
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '10px'
            }}
          >
            {LinkCategoryId.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoplay(false);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAutoplay(true), 5000);
                }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: index === currentIndex ? 
                    (fontColor || 'white') : 
                    'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const MobileUi: React.FC<MobileUiProps> = ({ userInfo, newUserData }) => {
  const [ip, setIp] = useState<string>("");
  const [linkCategories, setLinkCategories] = useState<{ [key: string]: linkCategoryInterface[] }>({});
  const navigate = useNavigate();

  const getUserIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIp(response.data.ip);
    } catch (error: any) {
      ErrorMessage(error.message || "Something went wrong");
    }
  };

  // Function to fetch link categories by IDs
  const fetchLinkCategories = async (LinkCategoryId: string[]) => {
    try {
      const response = await callAPI(
        apiUrls.getlinks, // Assuming this is your getLinks endpoint
        { LinkCategoryId }, // Send array of IDs
        'GET',
        {}
      );
      
      if (response?.data?.status) {
        return response.data.data || [];
      } else {
        console.error('Failed to fetch link categories:', response?.data?.message);
        return [];
      }
    } catch (error: any) {
      console.error('Error fetching link categories:', error.message);
      return [];
    }
  };

  // Fetch link categories for each link that has LinkCategoryId
  useEffect(() => {
    const fetchAllLinkCategories = async () => {
      if (!newUserData?.non_social) return;

      const categoriesMap: { [key: string]: linkCategoryInterface[] } = {};
      
      for (const link of newUserData.non_social) {
        if (link.LinkCategoryId && link.LinkCategoryId.length > 0) {
          const categories = await fetchLinkCategories(link.LinkCategoryId);
          categoriesMap[link._id] = categories;
        }
      }
      
      setLinkCategories(categoriesMap);
    };

    fetchAllLinkCategories();
  }, [newUserData?.non_social]);

  useEffect(() => {
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
    } catch (error: any) {
      ErrorMessage(error.message || "Something went wrong");
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";

      if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v") || "";
      }

      if (!videoId) return null;

      // Minimal branding + no unrelated recommendations
      return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&controls=1`;
    } catch {
      return null;
    }
  };

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
            position: "relative",
            height: "100%",
            overflow: "scroll",
            fontFamily: userInfo?.theme?.fontFamily,
            backgroundImage: `url(${defaultConfig?.imagePath + userInfo?.banner_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: userInfo?.theme?.fontColor || "white",
          }}
        >
          <div
            className="blurred-background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
          <div
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
          <div className="blur-overlay"></div>
          <div
            className="content-wrapper"
            style={{
              position: "relative",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              zIndex: 1,
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
                id="username"
                className="editprofile"
                style={{
                  fontFamily: userInfo?.theme?.fontFamily,
                  color: userInfo?.theme?.fontColor || "white",
                }}
              >
                @{userInfo?.username}
              </h1>

              <div className="contactEmail">
                <p
                  style={{
                    fontFamily: userInfo?.theme?.fontFamily,
                    color: userInfo?.theme?.fontColor || "white",
                  }}
                >
                  <p className="mobile-email-button">
                    <BiLogoGmail />
                    <p>{userInfo?.email}</p>
                  </p>
                </p>
              </div>

              <p
                id="bio"
                className="editprofile"
                style={{
                  fontFamily: userInfo?.theme?.fontFamily,
                  textAlign: "left",
                  color: userInfo?.theme?.fontColor || "white",
                }}
              >
                {userInfo?.bio}
              </p>
            </div>

            <div className="edit-form" id="editForm">
              <input
                type="text"
                id="editUsername"
                placeholder="Adınızı girin"
              />
              <textarea
                id="editBio"
                style={{ fontFamily: userInfo?.theme?.fontFamily }}
                placeholder="Hakkınızda bir şeyler yazın.."
                rows={3}
                defaultValue={""}
              />
            </div>

            <div className="links-list">
              {Array.isArray(newUserData?.non_social) && newUserData?.non_social.map((link) => (
                <div key={link._id} className="link-wrapper">
                  <Link
                    to={link.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`link-card ${userInfo?.theme?.themeDesign || "round"}`}
                    onClick={() => handleClickSubmit(link._id)}
                    style={
                      {
                        "--card-bg": userInfo?.theme?.is_colorImage || "#333",
                        "--card-color": userInfo?.theme?.fontColor || "white",
                        "--card-font": userInfo?.theme?.fontFamily || "sans-serif",
                      } as React.CSSProperties
                    }
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
                        color: userInfo?.theme?.fontColor || "white",
                      }}
                    >
                      {link.linkTitle}
                    </span>
                  </Link>

                  {/* Video Section */}
                  {getYouTubeEmbedUrl(link?.video?.videoLink || "") && (
                    <div style={{ margin: '10px 0', textAlign: 'center' }}>
                      <iframe
                        width="280"
                        height="160"
                        src={getYouTubeEmbedUrl(link?.video?.videoLink || "") || ""}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          borderRadius: '10px',
                          maxWidth: '100%'
                        }}
                      ></iframe>
                    </div>
                  )}

                  {/* Link Categories Slider Section */}
                  {linkCategories[link._id] && linkCategories[link._id].length > 0 && (
                    <ProductSlider
                      LinkCategoryId={linkCategories[link._id]}
                      fontFamily={userInfo?.theme?.fontFamily}
                      fontColor={userInfo?.theme?.fontColor}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="spcial-links-list d-flex justify-content-center gap-2">
              {Array.isArray(newUserData?.social) && newUserData?.social.map((link) => {
                const matchedPlatform = socialPlatforms.find(
                  (platform) =>
                    platform.label.toLowerCase() === link.linkTitle.toLowerCase()
                );
                return (
                  <Link
                    key={link._id}
                    to={link.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-card-social"
                    onClick={() => handleClickSubmit(link._id)}
                  >
                    {matchedPlatform && (
                      <span
                        className="social-icons"
                        style={{
                          fontFamily: userInfo?.theme?.fontFamily,
                          color: userInfo?.theme?.fontColor || "white",
                          gap: 0,
                        }}
                      >
                        {matchedPlatform.icon}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};