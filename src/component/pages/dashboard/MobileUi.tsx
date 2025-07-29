import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../helpers/ErrorMessage'
import { BsThreeDots } from 'react-icons/bs'
import { callAPIWithoutAuth } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import { defaultConfig } from '../../../config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiLogoGmail } from 'react-icons/bi'
import { socialPlatforms } from '../links/linksAddEdit'
import axios from 'axios'

// ... (keep the existing interfaces)
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
  is_colorImage: string
  fontColor: string
}

interface Link {
  linkTitle: string
  linkUrl: string
  linkLogo: string
  is_index: number
  _id: string
}

interface MobileUiProps {
  userInfo: userInfo | null
}
export const MobileUi: React.FC<MobileUiProps> = ({ userInfo }) => {
  // ... (keep the existing state and functions)
  const [ip, setIp] = useState<string>('')
  const navigate = useNavigate()
  const id = useParams()

  const getUserIp = async () => {
    try {
      const response = await axios.get('https://api.ipify.org/?format=json')
      setIp(response.data.ip)
    } catch (error: any) {
      ErrorMessage(error.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    getUserIp()
  }, [ip])

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

  const userId = localStorage.getItem('_id') || null

  const getThemeStyles = (includeBackground: boolean = false) => ({
    ...(includeBackground
      ? { backgroundColor: 'rgba(255, 255, 255, 0.8)' }
      : {}),
    color: userInfo?.theme?.fontColor || '#333',
    fontFamily: userInfo?.theme?.fontFamily || 'Arial, sans-serif'
  })

  const containerStyle = {
    ...getThemeStyles(),
    borderRadius: '33px',
    boxShadow:
      '0 4px 6px rgba(95, 229, 51, 0.1), 0 1px 3px rgba(211, 215, 18, 0.08)',
    padding: '0.5rem',
    maxWidth: '400px',
    maxHeight: '710px'
  }

  const profilePictureStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '0 auto 1.5rem',
    display: 'block'
  }

  // const headingStyle = {
  //   fontSize: '1.5rem',
  //   fontWeight: 'bold',
  //   marginBottom: '0.5rem',
  //   textAlign: 'center' as const,
  //   background:
  //     'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)',
  //   backgroundSize: '400% 400%',
  //   WebkitBackgroundClip: 'text',
  //   WebkitTextFillColor: 'transparent',
  //   fontFamily: userInfo?.theme?.fontFamily,
  //   color: `${
  //     userInfo?.theme?.fontColor ? userInfo?.theme?.fontColor : 'white'
  //   }`
  // }

  // const bioStyle = {
  //   fontSize: '1rem',
  //   marginBottom: '0.5rem',
  //   textAlign: 'start' as const,
  //   lineHeight: '1.2'
  // }

  // const linkCardStyle = {
  //   ...getThemeStyles(true),
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: '0.75rem 1rem',
  //   borderRadius: '12px',
  //   marginBottom: '1rem',
  //   transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  //   textDecoration: 'none'
  // }

  // const linkLogoStyle = {
  //   width: '24px',
  //   height: '24px',
  //   marginRight: '1rem',
  //   BiBorderRadius: '15px',
  //   marginTop: '5.5px'
  // }

  const socialLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem'
  }

  const socialIconStyle = {
    fontSize: '1.5rem',
    backgroundColor: 'transparent',
    color: userInfo?.theme?.fontColor || '#333'
  }

  return (
    <>
      <section
        id='phone-preview-container'
        aria-label='Mobile preview of Linktree'
        style={{
          backgroundImage: userInfo?.banner_img
            ? `url(${defaultConfig?.imagePath + userInfo?.banner_img})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className='profile-container' style={containerStyle}>
          {userId !== id.id && userId && (
            <BsThreeDots
              className='threedots'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasBottom'
              aria-controls='offcanvasBottom'
              style={{
                backgroundImage: `url(${
                  defaultConfig?.imagePath + userInfo?.banner_img
                })`,
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                overflow: 'scroll',
                fontFamily: userInfo?.theme?.fontFamily,
                color: `${
                  userInfo?.theme?.fontColor
                    ? userInfo?.theme?.fontColor
                    : 'white'
                }`
              }}
            />
          )}

          <img
            id='profileImage'
            src={defaultConfig?.imagePath + userInfo?.profile_img}
            alt='Profile Picture'
            style={profilePictureStyle}
          />

          <div className='profile-info'>
            <h1
              id='username'
              className='editprofile'
              style={{
                fontFamily: userInfo?.theme?.fontFamily,
                color: `${
                  userInfo?.theme?.fontColor
                    ? userInfo?.theme?.fontColor
                    : 'white'
                }`
              }}
            >
              {' '}
              @{userInfo?.username} 
            </h1>
            <p
              id='bio'
              style={{
                fontFamily: userInfo?.theme?.fontFamily,
                textAlign: 'left',
                color: `${
                  userInfo?.theme?.fontColor
                    ? userInfo?.theme?.fontColor
                    : 'white'
                }`
              }}
            >
              {userInfo?.bio}
            </p>
            <div className='contactEmail'>
              <p
                style={{
                  fontFamily: userInfo?.theme?.fontFamily,
                  color: `${
                    userInfo?.theme?.fontColor
                      ? userInfo?.theme?.fontColor
                      : 'white'
                  }`
                }}
              >
                <p className='mobile-email-button' >
                  <BiLogoGmail />
                  <p style={{ marginLeft:'5px' }}>{userInfo?.email}</p>
                </p>
              </p>
            </div>
          </div>
          <div className='edit-form' id='editForm'>
            <input type='text' id='editUsername' placeholder='Adınızı girin' />
            <textarea
              id='editBio'
              style={{ fontFamily: `${userInfo?.theme?.fontFamily}` }}
              placeholder='Hakkınızda bir şeyler yazın..'
              rows={3}
              defaultValue={''}
            />
          </div>
          <div className='links-list'>
            {userInfo?.non_social.map(link => (
              <Link
                key={link._id}
                to={link.linkUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='link-card'
                onClick={() => handleClickSubmit(link._id)}
                style={
                  {
                    '--card-bg': userInfo?.theme?.is_colorImage || '#333',
                    '--card-color': userInfo?.theme?.fontColor || 'white',
                    '--card-font': userInfo?.theme?.fontFamily || 'sans-serif',
                    'border-radius':' 9px'
                  } as React.CSSProperties
                }
              >
                <img
                  src={defaultConfig?.imagePath + link.linkLogo}
                  alt={link.linkTitle}
                  // style={linkLogoStyle}
                  className="link-logo"
                  style={{ width: '24px', height: '24px', marginRight: '1rem', borderRadius: '15px', marginTop: '5.5px' }}
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

          <div className='social-links-list' style={socialLinksStyle}>
            {userInfo?.social.map(link => {
              const matchedPlatform = socialPlatforms.find(
                platform =>
                  platform.label.toLowerCase() === link.linkTitle.toLowerCase()
              )
              return (
                <Link
                  key={link._id}
                  to={link.linkUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link-card-social'
                  onClick={() => handleClickSubmit(link._id)}
                >
                  {matchedPlatform && (
                    <span className='social-icon' style={socialIconStyle}>
                      {matchedPlatform.icon}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
           
        </div>
      </section>
    </>
  )
}
