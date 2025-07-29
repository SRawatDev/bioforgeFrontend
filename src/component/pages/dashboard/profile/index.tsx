import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../../helpers/ErrorMessage'
import { callAPIWithoutAuth } from '../../../../utils/apicall.utils'
import { apiUrls } from '../../../../utils/api.utils'
import { defaultConfig } from '../../../../config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiLogoGmail } from 'react-icons/bi'
import { socialPlatforms } from '../../links/linksAddEdit'
import ProfileShimmer from '../../../ProfileShimmer'
import axios from 'axios'
import { Report } from './Report'

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
  const [loader, setloader] = useState<boolean>(false)

  const getUserDetail = async () => {
    setloader(true)
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getUserInfo,
        { _id: id.id },
        'GET',
        {}
      )
      setloader(false)
      if (!response?.data?.status) {
        navigate('/')
        ErrorMessage(response?.data?.data?.message)
      } else {
        setUserInfo(response?.data?.data[0])
      }
    } catch (err: any) {
      setloader(true)
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
      // Handle error
    }
  }


  return (
    <>
      {loader ? (
        <ProfileShimmer />
      ) : (
        <div
          className='professional-profile-container'
          style={{
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px',
            color: userInfo?.theme?.fontColor || '#1a1a1a'
          }}
        >
          {/* Main Profile Card */}
          <div
            className='profile-card'
            style={{
              backgroundImage: `url(${
                defaultConfig?.imagePath + userInfo?.banner_img
              })`,
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',

              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              overflow: 'hidden',
              fontFamily: userInfo?.theme?.fontFamily
            }}
          >
            {/* Gradient Accent */}

            {/* Header Section */}
            <div
              className='profile-header'
              style={{
                padding: '40px 32px 24px',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* Profile Image with Status Indicator */}
              <div
                style={{
                  position: 'relative',
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 24px'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '4px solid #ffffff',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    background: 'linear-gradient(45deg, #f8fafc, #e2e8f0)'
                  }}
                >
                  <img
                    src={defaultConfig?.imagePath + userInfo?.profile_img}
                    alt='Profile'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                {/* Online Status */}
                {/* <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    border: '3px solid #ffffff',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                /> */}
              </div>

              {/* User Info */}
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  margin: '0 0 8px',
                  letterSpacing: '-0.8px',
                  backgroundColor:
                    userInfo?.theme?.fontColor || 'rgba(255, 255, 255, 0.95)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '-0.4'
                }}
              >
                @{userInfo?.username}
              </h1>

              <p
                style={{
                  fontSize: '20px',
                  textAlign: 'start',
                  lineHeight: '1.6',
                  color: userInfo?.theme?.fontColor || '#111827',

                  margin: '0 0 24px',
                  fontWeight: '600',
                  maxWidth: '400px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              >
                {userInfo?.bio}
              </p>

              {/* Email Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  // backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  fontSize: '14px',
                  color: userInfo?.theme?.fontColor || '#1a1a1a',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <BiLogoGmail style={{ fontSize: '20px', color: '#ea4335' }} />
                <span>{userInfo?.email}</span>
              </div>
            </div>

            {/* Content Section */}
            <div style={{ padding: '0 32px 40px' }}>
              {/* Main Links */}
              {userInfo?.non_social && userInfo.non_social.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px'
                    }}
                  >
                    {userInfo.non_social.map((link) => (
                      <Link
                        key={link._id}
                        to={link.linkUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        onClick={() => handleClickSubmit(link._id)}
                        className='profile-link'
                        style={
                          {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '18px',
                            padding: '6px 15px',
                            backgroundColor:
                              userInfo?.theme?.is_colorImage ||
                              'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '18px',
                            textDecoration: 'none',
                            color: userInfo?.theme?.fontColor || '#1a1a1a',
                            fontWeight: '600',
                            fontSize: '16px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                            position: 'relative',
                            overflow: 'hidden',

                            '--card-bg':
                              userInfo?.theme?.is_colorImage || '#333',
                            '--card-color':
                              userInfo?.theme?.fontColor || 'white'
                            // '--card-font':
                            //   userInfo?.theme?.fontFamily || 'sans-serif'
                          } as React.CSSProperties
                        }
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-3px)'
                          e.currentTarget.style.boxShadow =
                            '0 12px 30px rgba(0, 0, 0, 0.12)'
                          e.currentTarget.style.borderColor = '#3b82f6'
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow =
                            '0 4px 6px rgba(0, 0, 0, 0.05)'
                          e.currentTarget.style.borderColor = '#e5e7eb'
                          e.currentTarget.style.backgroundColor =
                            userInfo?.theme?.is_colorImage || '#1a1a1a'
                        }}
                      >
                        {/* Link Icon */}
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            flexShrink: 0,
                            background:
                              'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <img
                            src={defaultConfig?.imagePath + link.linkLogo}
                            alt={link.linkTitle}
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              objectFit: 'contain'
                            }}
                          />
                        </div>

                        {/* Link Text */}
                        <span style={{ flex: 1, fontSize: '16px' }}>
                          {link.linkTitle}
                        </span>

                        {/* Arrow Icon */}
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          style={{ flexShrink: 0, color: '#9ca3af' }}
                        >
                          <path
                            d='M7 17L17 7M17 7H7M17 7V17'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {userInfo?.social && userInfo.social.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#9ca3af',
                      marginBottom: '20px',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    Connect with me
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px'
                    }}
                  >
                    {userInfo.social.map(link => {
                      const matchedPlatform = socialPlatforms.find(
                        platform =>
                          platform.label.toLowerCase() ===
                          link.linkTitle.toLowerCase()
                      )
                      return (
                        <Link
                          key={link._id}
                          to={link.linkUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          onClick={() => handleClickSubmit(link._id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '56px',
                            height: '56px',
                            // border: '1px solid #e5e7eb',
                            // borderRadius: '18px',
                            textDecoration: 'none',
                            fontSize: '22px',
                            borderRadius: '50%',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 4px 6px rgba(164, 132, 132, 0.05)',
                            fontFamily: `${userInfo?.theme?.fontFamily}`,
                            color: userInfo?.theme?.fontColor || '#1a1a1a'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform =
                              'translateY(-4px) scale(1.05)'
                            e.currentTarget.style.boxShadow =
                              '0 12px 30px rgba(0, 0, 0, 0.15)'
                            e.currentTarget.style.backgroundColor =
                              'transparent'
                            // e.currentTarget.style.borderColor = '#3b82f6'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform =
                              'translateY(0) scale(1)'
                            e.currentTarget.style.boxShadow =
                              '0 4px 6px rgba(0, 0, 0, 0.05)'
                            // e.currentTarget.style.borderColor = '#e5e7eb'
                            e.currentTarget.style.backgroundColor =
                              'transparent'
                          }}
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
        </div>
      )}
      <Report userName={userInfo?.username || ''} />
    </>
  )
}

export default Index
