import React, { useEffect, useState } from "react";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import { defaultConfig } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { socialPlatforms } from "../links/linksAddEdit";
import "./mobilePreview.css";
import axios from "axios";
import Product from "./Product";

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
  _id?: string,
  videoLink?: string
}

interface productInterface {
  _id?: string;
  title?: string;
  image?: string
  link?: string
}

interface theme {
  fontFamily: string;
  is_colorImage: string;
  fontColor: string;
  themeDesign?: string;
}

interface Link {
  LinkCategoryId?: productInterface[]
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  is_index: number;
  video?: videoInterface
  _id: string;
}

interface MobileUiProps {
  userInfo: userInfo | null;
  newUserData: userInfo | null;
}

// Carousel Component
// Individual Product Slide Component - Each product gets its own slide
const IndividualProductSlides: React.FC<{
  products: productInterface[];
  userInfo: userInfo | null;
}> = ({ products, userInfo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!products || products.length === 0) return null;

  // Get current product
  const currentProduct = products[currentIndex];

  return (
    <div className="individual-product-slides" style={{
      position: 'relative',
      width: '240px',
      height: '140px',
      margin: '8px auto',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Single Product Display */}
      <div style={{
        width: '100%',
        height: '100%',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        transition: 'opacity 0.3s ease'
      }}>
        {currentProduct.image && (
          <img
            src={defaultConfig?.imagePath + currentProduct.image}
            alt={currentProduct.title || 'Product'}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '6px',
              marginBottom: '8px',
              flexShrink: 0
            }}
          />
        )}
        <h4 style={{
          fontFamily: userInfo?.theme?.fontFamily,
          color: userInfo?.theme?.fontColor || 'white',
          fontSize: '13px',
          margin: '0 0 8px 0',
          fontWeight: '600',
          lineHeight: '1.2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          maxWidth: '100%',
          textAlign: 'center'
        }}>
          {currentProduct.title}
        </h4>
        {currentProduct.link && (
          <a
            href={currentProduct.link.toString()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: userInfo?.theme?.fontColor || 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '10px',
              fontFamily: userInfo?.theme?.fontFamily,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.2s ease',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Visit Link
          </a>
        )}
      </div>

      {/* Navigation Arrows - Only show if more than 1 product */}
      {products.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if more than 1 product */}
      {products.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          gap: '6px'
        }}>
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentIndex 
                  ? (userInfo?.theme?.fontColor || 'white')
                  : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      )}

      {/* Current Slide Counter */}
      {products.length > 1 && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          fontSize: '9px',
          padding: '2px 6px',
          borderRadius: '10px',
          fontFamily: userInfo?.theme?.fontFamily
        }}>
          {currentIndex + 1} / {products.length}
        </div>
      )}

      {/* Product ID Display for Development */}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        fontSize: '8px',
        padding: '2px 4px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        maxWidth: '120px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        ID: {currentProduct._id}
      </div>
    </div>
  );
};

// Updated MobileUi component with the new individual slides
export const MobileUi: React.FC<MobileUiProps> = ({ userInfo, newUserData }) => {
  const [ip, setIp] = useState<string>("");
  const navigate = useNavigate();
  
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
                <div key={link._id}>
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
                  
                  {getYouTubeEmbedUrl(link?.video?.videoLink || "") && (
                    <div>
                      <iframe
                        width="250"
                        height="150"
                        src={getYouTubeEmbedUrl(link?.video?.videoLink || "") || ""}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  
                  {/* Individual Product Slides - Each product on its own slide */}
                  {link?.LinkCategoryId && link.LinkCategoryId.length > 0 && (
                    <IndividualProductSlides 
                      products={link.LinkCategoryId} 
                      userInfo={userInfo} 
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="spcial-links-list d-flex justify-content-center gap-2">
              {Array.isArray(newUserData?.social) && newUserData?.social.map((link) => {
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