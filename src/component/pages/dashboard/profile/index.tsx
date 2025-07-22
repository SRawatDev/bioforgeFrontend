import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../../helpers/ErrorMessage'
import { BsThreeDots } from 'react-icons/bs'
import { FaEdit, FaShareAlt } from 'react-icons/fa'
import { callAPIWithoutAuth } from '../../../../utils/apicall.utils'
import { apiUrls } from '../../../../utils/api.utils'
import { defaultConfig } from '../../../../config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiLogoGmail } from 'react-icons/bi'
import { socialPlatforms } from '../../links/linksAddEdit'
import ProfileShimmer from '../../../ProfileShimmer'
import axios from 'axios'
import { Report } from './Report'
import './profile.css'

interface userInfo {
  _id: string
  username: string
  email: string
  social: Link[]
  non_social: Link[]
  bio: string
  banner_img: string
  profile_img: string
  theme: theme
}

interface theme {
  fontFamily: string
  fontColor: string
  is_colorImage: string
}

interface Link {
  linkTitle: string
  linkUrl: string
  linkLogo: string
  is_index: number
  _id: string
}

const Index: React.FC = () => {
  const [ip, setIp] = useState<string>('')
  const navigate = useNavigate()
  const id = useParams()
  const [userInfo, setUserInfo] = useState<userInfo | null>(null)
  const [loader, setLoader] = useState<boolean>(false)

  const getUserDetail = async () => {
    setLoader(true)
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getUserInfo,
        { _id: id.id },
        'GET',
        {}
      )
      setLoader(false)
      if (!response?.data?.status) {
        navigate('/')
        ErrorMessage(response?.data?.data?.message)
      } else {
        setUserInfo(response?.data?.data[0])
      }
    } catch (err: any) {
      ErrorMessage(err.message || 'Something went wrong')
      setLoader(false)
    }
  }

  const getUserIp = async () => {
    try {
      const response = await axios.get('https://api.ipify.org/?format=json')
      setIp(response.data.ip)
    } catch (error: any) {
      ErrorMessage(error.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    getUserDetail()
    getUserIp()
  }, [])

  const handleClickSubmit = async (id: string) => {
    try {
      const userId = localStorage.getItem('accessToken')
        ? localStorage.getItem('_id') || ''
        : ''
      const payload = {
        userId,
        ipAddress: userId ? '' : ip
      }
      const response = await callAPIWithoutAuth(
        apiUrls.linkClicked + '/' + id,
        {},
        'POST',
        payload
      )
      if (!response?.data?.status) {
        navigate('/')
        ErrorMessage(response?.data?.data?.message)
      }
    } catch (error: any) {
      ErrorMessage(error.message || 'Something went wrong')
    }
  }

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userInfo?.username}'s Profile`,
        url: window.location.href
      })
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Profile link copied to clipboard!'))
        .catch((err) => console.error('Could not copy text: ', err));
    }
  }

  const userId = localStorage.getItem('_id') || null

  return (
    <>
      {loader ? (
        <ProfileShimmer />
      ) : (
        <div
          className="mobile-profile"
          style={{
            backgroundColor: userInfo?.theme?.is_colorImage || '#f5f5f5',
            color: userInfo?.theme?.fontColor || '#333',
            fontFamily: userInfo?.theme?.fontFamily || 'sans-serif'
          }}
        >
          {/* Banner Image */}
          <div className="mobile-banner">
            <img 
              src={defaultConfig?.imagePath + userInfo?.banner_img} 
              alt="Banner"
            />
            
            {userId !== id.id && userId && (
              <BsThreeDots
                className="mobile-menu-dots"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
              />
            )}
          </div>
          
          {/* Profile Content */}
          <div className="mobile-content">
            {/* Profile Header */}
            <div className="mobile-profile-header">
              <div className="mobile-avatar">
                <img 
                  src={defaultConfig?.imagePath + userInfo?.profile_img} 
                  alt="Profile"
                />
              </div>
              
              <div className="mobile-user-info">
                <h1 className="mobile-username">
                  {userInfo?.username}
                  {localStorage.getItem('accessToken') && userId === id.id 
                    // <Link to={`/updateProfile/${localStorage.getItem('_id')}`} className="mobile-edit-icon">
                    //   <FaEdit />
                    // </Link>
                  }
                </h1>
                
                <p className="mobile-bio">{userInfo?.bio}</p>
                
                <a href={`mailto:${userInfo?.email}`} className="mobile-email-button">
                  <BiLogoGmail />
                  <span>{userInfo?.email}</span>
                </a>
              </div>
            </div>
            
            {/* Links Section */}
            <div className="mobile-links">
              {userInfo?.non_social && userInfo.non_social.length > 0 && (
                <>
                  <h2 className="mobile-section-title">Links</h2>
                  
                  <div className="mobile-links-list">
                    {userInfo.non_social.map(link => (
                      <Link
                        key={link._id}
                        to={link.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-link-item"
                        onClick={() => handleClickSubmit(link._id)}
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
                </>
              )}
              
              {/* Social Links */}
              {userInfo?.social && userInfo.social.length > 0 && (
                <div className="mobile-social-section">
                  <h2 className="mobile-section-title">Social Media</h2>
                  
                  <div className="mobile-social-icons">
                    {userInfo.social.map(link => {
                      const matchedPlatform = socialPlatforms.find(
                        platform => platform.label.toLowerCase() === link.linkTitle.toLowerCase()
                      )
                      return (
                        <Link
                          key={link._id}
                          to={link.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mobile-social-icon"
                          onClick={() => handleClickSubmit(link._id)}
                        >
                          {matchedPlatform && matchedPlatform.icon}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Share Button */}
          {/* <button 
            className="mobile-share-button" 
            onClick={shareProfile}
            aria-label="Share profile"
          >
            <FaShareAlt />
          </button> */}
        </div>
      )}
      <Report userName={userInfo?.username || ''} />
    </>
  )
}

export default Index
