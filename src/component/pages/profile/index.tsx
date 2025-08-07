import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../helpers/ErrorMessage'
import { BsThreeDots } from 'react-icons/bs'
import { callAPIWithoutAuth } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import { defaultConfig } from '../../../config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  BiLink,
  BiLogoGmail,
  BiLogoTwitter,
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoWhatsapp
} from 'react-icons/bi'
import { socialPlatforms } from '../links/linksAddEdit'
import ProfileShimmer from '../../ProfileShimmer'
import { TbLockPassword, TbX } from 'react-icons/tb'
import axios from 'axios'
import { Report } from './Report'
import './profile.css'
import { MdPhonelinkSetup } from 'react-icons/md'
import { FaCopy } from 'react-icons/fa'

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
  themeDesign?: string
}

interface Link {
  linkTitle: string
  linkUrl: string
  linkLogo: string
  is_index: number
  _id: string
  protectedLinks?: string
}

const Index: React.FC = () => {
  const [ip, setIp] = useState<string>('')
  const navigate = useNavigate()
  const id = useParams()
  const [userInfo, setUserInfo] = useState<userInfo | null>(null)
  const [loader, setLoader] = useState<boolean>(false)
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false)
  const [selectedShareLink, setSelectedShareLink] = useState<Link | null>(null)

  const getUserDetail = async (header?: string) => {
    setLoader(true)
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getUserInfoPublic,
        { _id: id.id, protectedLinksPassword: header },
        'GET',
        {}
      )
      setLoader(false)
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message)
      } else {
        const userData = response?.data?.data[0]
        setUserInfo(userData)
      }
    } catch (err: any) {
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

  const isLoggedIn = localStorage.getItem('accessToken')

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      navigate(`/dashboard/index/${userId}`)
    }
  }
  useEffect(() => {
    getUserDetail()
    getUserIp()
  }, [])

  const handleClickSubmit = async (linkId: string) => {
    try {
      const userId = localStorage.getItem('accessToken')
        ? localStorage.getItem('_id') || ''
        : ''
      const payload = {
        userId,
        ipAddress: userId ? '' : ip
      }
      const response = await callAPIWithoutAuth(
        apiUrls.linkClicked + '/' + linkId,
        {},
        'POST',
        payload
      )
      if (!response?.data?.status) {
        navigate('/')
        ErrorMessage(response?.data?.data?.message)
      }
    } catch (error: any) {
      console.error('Error tracking click:', error)
    }
  }

  const handleLinkClick = (link: Link, event: React.MouseEvent) => {
    event.preventDefault()
    setSelectedLink(link)
    setShowPasswordModal(true)
    return
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    getUserDetail(password)
    closePasswordModal()
  }

  const closePasswordModal = () => {
    setShowPasswordModal(false)
    setPassword('')
    setSelectedLink(null)
  }

  const handlePasswordIconClick = () => {
    setShowPasswordModal(true)
  }
  const generateShareUrl = (
    platform: string,
    linkUrl: string, // Use the actual linkUrl instead of profileUrl
    linkTitle: string
  ) => {
    const encodedUrl = encodeURIComponent(linkUrl)
    const encodedTitle = encodeURIComponent(linkTitle)

    switch (platform.toLowerCase()) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=Check%20out%20this%20link:%20${encodedTitle}`
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
      case 'whatsapp':
        // Use WhatsApp app URL scheme for mobile, fallback to web
        return `whatsapp://send?text=Check%20out%20this%20link:%20${encodedTitle}%20${encodedUrl}`
      case 'email':
        return `mailto:?subject=Check%20out%20this%20link&body=Check%20out%20this%20link:%20${encodedTitle}%20${encodedUrl}`
      default:
        return '#'
    }
  }

  // Share Popup Component
  const SharePopup: React.FC<{
    profileUrl: string
    linkTitle: string
    linkUrl: string
    onClose: () => void
  }> = ({ profileUrl, linkTitle, linkUrl, onClose }) => {
    const platformIcons = [
      {
        name: 'Twitter',
        icon: <BiLogoTwitter style={{ color: '#1DA1F2' }} />
      },
      {
        name: 'Facebook',
        icon: <BiLogoFacebook style={{ color: '#1877F2' }} />
      },
      {
        name: 'LinkedIn',
        icon: <BiLogoLinkedin style={{ color: '#0A66C2' }} />
      },
      {
        name: 'WhatsApp',
        icon: <BiLogoWhatsapp style={{ color: '#25D366' }} />
      },
      {
        name: 'Email',
        icon: <BiLogoGmail style={{ color: '#D14836' }} />
      }
    ]

    // Mobile-friendly clipboard copy function
    const copyToClipboard = async (text: string) => {
      try {
        // Modern clipboard API (works on HTTPS and newer browsers)
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
          alert('Link copied to clipboard!')
          return
        }

        // Fallback for mobile and older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
          document.execCommand('copy')
          alert('Link copied to clipboard!')
        } catch (err) {
          console.error('Failed to copy: ', err)
          // Last resort - show the link for manual copying
          prompt('Copy this link:', text)
        } finally {
          document.body.removeChild(textArea)
        }
      } catch (err) {
        console.error('Failed to copy: ', err)
        // Show the link for manual copying
        prompt('Copy this link:', text)
      }
    }

    const handlePlatformClick = (platformName: string, shareUrl: string) => {
      if (platformName.toLowerCase() === 'whatsapp') {
        // Try to open WhatsApp app first, fallback to web
        const appUrl = shareUrl
        const webUrl = `https://wa.me/?text=Check%20out%20this%20link:%20${encodeURIComponent(
          linkTitle
        )}%20${encodeURIComponent(linkUrl)}`

        // Create a temporary link to test if app opens
        const link = document.createElement('a')
        link.href = appUrl
        link.click()

        // Fallback to web after a short delay if app doesn't open
        setTimeout(() => {
          window.open(webUrl, '_blank', 'noopener,noreferrer')
        }, 1000)
      } else {
        // For other platforms, open in new tab
        window.open(shareUrl, '_blank', 'noopener,noreferrer')
      }
    }

    return (
      <div className='share-popup-overlay' onClick={onClose}>
        <div className='share-popup' onClick={e => e.stopPropagation()}>
          <div className='share-popup-header'>
            <h3>Share this link</h3>
            <TbX className='close-icon' onClick={onClose} />
          </div>
          <div className='share-popup-content'>
            {/* Copy Link Button */}
            <button
              className='share-platform'
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                width: '100%',
                textAlign: 'left'
              }}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                copyToClipboard(linkUrl)
              }}
            >
              <FaCopy style={{ fontSize: '18px' }} />
              <span>Copy Link</span>
            </button>

            {platformIcons.map(platform => (
              <button
                key={platform.name}
                className='share-platform'
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  width: '100%',
                  textAlign: 'left'
                }}
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  handlePlatformClick(
                    platform.name,
                    generateShareUrl(platform.name, linkUrl, linkTitle)
                  )
                }}
              >
                {platform.icon}
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const userId = localStorage.getItem('_id') || null

  return (
    <>
      {loader ? (
        <ProfileShimmer />
      ) : (
        <div className='mobile-profile'>
          {userId !== id.id && userId && (
            <BsThreeDots
              className='threedots'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasBottom'
              aria-controls='offcanvasBottom'
            />
          )}

          <div
            className='mobile-content'
            style={{
              position: 'relative',
              height: '100%',
              overflow: 'scroll',
              scrollbarWidth: 'none',
              fontFamily: userInfo?.theme?.fontFamily,
              color: userInfo?.theme?.fontColor || 'white'
            }}
          >
            <div
              className='blurred-background'
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${
                  defaultConfig?.imagePath + userInfo?.banner_img
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(3px)',
                zIndex: 0
              }}
            ></div>
            <div
              className='background-overlay'
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 1
              }}
            ></div>
            <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
              <div className='mobile-profile-header'>
                <div className='mobile-avatar'>
                  <img
                    src={defaultConfig?.imagePath + userInfo?.profile_img}
                    alt='Profile'
                  />
                </div>
                <div className='mobile-user-info'>
                  <h1 className='mobile-username'>
                    @{userInfo?.username}
                    {localStorage.getItem('accessToken') && userId === id.id}
                  </h1>
                  <p className='mobile-email-button mobile-bio'>
                    <BiLogoGmail />
                    <span>{userInfo?.email}</span>
                  </p>
                  <p className='mobile-bio' style={{ textAlign: 'left' }}>
                    {userInfo?.bio}
                  </p>
                </div>
              </div>

              <div className='mobile-links'>
                {userInfo?.non_social && userInfo.non_social.length > 0 && (
                  <div className='mobile-links-list'>
                    {userInfo.non_social.map(link => (
                      <div
                        className={`link-card ${
                          userInfo.theme.themeDesign || 'round'
                        }`}
                        onClick={e => handleLinkClick(link, e)}
                        style={
                          {
                            padding: '10px',
                            '--card-bg':
                              userInfo?.theme?.is_colorImage || '#333',
                            '--card-color':
                              userInfo?.theme?.fontColor || 'white',
                            '--card-font':
                              userInfo?.theme?.fontFamily || 'sans-serif',
                            cursor: 'pointer'
                          } as React.CSSProperties
                        }
                      >
                        <div className='link-content'>
                          <img
                            src={defaultConfig?.imagePath + link.linkLogo}
                            alt={link.linkTitle}
                            className='mobile-link-icon'
                          />
                          <span className='mobile-link-title'>
                            {link.linkTitle}
                          </span>
                        </div>
                        <BsThreeDots
                          className='share-icon'
                          onClick={e => {
                            e.stopPropagation()
                            setSelectedShareLink(link)
                            setShowSharePopup(true)
                          }}
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {userInfo?.social && userInfo.social.length > 0 && (
                  <div className='mobile-social-section'>
                    <div className='mobile-social-icons'>
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
                            className={`social-link-wrapper `}
                          >
                            <div
                              className={`link-card-social`}
                              onClick={e => handleLinkClick(link, e)}
                              style={{ color: 'black', cursor: 'pointer' }}
                            >
                              <span
                                className='social-icon'
                                style={{
                                  fontFamily: userInfo?.theme?.fontFamily,
                                  color: userInfo?.theme?.fontColor || 'white',
                                  gap: 0
                                }}
                              >
                                {matchedPlatform && matchedPlatform.icon}
                              </span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className='d-flex justify-content-center mt-4'>
             <button
                  type='button'
                  className='link-join-biofoge'
 onClick={handleButtonClick}
                  style={{
                    fontFamily: userInfo?.theme?.fontFamily,
                    background: userInfo?.theme?.is_colorImage || '#333',
                    color: userInfo?.theme?.fontColor || '#fbbf24'
                  }}
                >
                  <span
                    className='link-join-text'
                    style={{
                      fontFamily: userInfo?.theme?.fontFamily,
                      background: userInfo?.theme?.is_colorImage || '#333',
                      color: userInfo?.theme?.fontColor || '#fbbf24'
                    }}
                  >
                    Join
                  </span>
                  <span style={{
                    fontFamily: userInfo?.theme?.fontFamily,
                    background: userInfo?.theme?.is_colorImage || '#333',
                    color: userInfo?.theme?.fontColor || '#fbbf24'
                  }}>
                    {userInfo?.username}
                  </span>
                  {localStorage.getItem('accessToken') && userId === id.id}
                  <span
                    className='link-join-text'
                    style={{
                      fontFamily: userInfo?.theme?.fontFamily,
                      background: userInfo?.theme?.is_colorImage || '#333',
                      color: userInfo?.theme?.fontColor || '#fbbf24'
                    }}
                  >
                    on Bioforge
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div
            onClick={handlePasswordIconClick}
            title='Click to view private links'
          >
            <MdPhonelinkSetup
              className='passwordProfile blinking-icon'
              style={
                {
                  height: '40px',
                  width: '40px',
                  color: userInfo?.theme?.fontColor || '#fbbf24',
                  cursor: 'pointer',
                  fontSize: '40px',
                  top: '19%'
                } as React.CSSProperties
              }
            />
          </div>
          {showPasswordModal && (
            <div className='password-modal-overlay'>
              <div
                className='password-modal'
                style={{
                  fontFamily: userInfo?.theme?.fontFamily,
                  color: userInfo?.theme?.fontColor || '#333'
                }}
              >
                <div className='modal-content'>
                  {selectedLink && (
                    <div className='selected-link-info'>
                      <img
                        src={defaultConfig?.imagePath + selectedLink.linkLogo}
                        alt={selectedLink.linkTitle}
                        className='modal-link-icon'
                      />
                      <p>
                        You're trying to access:{' '}
                        <strong>{selectedLink.linkTitle}</strong>
                      </p>
                      <p className='privacy-notice'>
                        This link is password protected
                      </p>
                    </div>
                  )}
                  <form
                    onSubmit={handlePasswordSubmit}
                    className='password-form'
                  >
                    <div className='input-group'>
                      <label htmlFor='password'>Password:</label>
                      <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Enter password to access link'
                        className='password-input'
                        required
                      />
                    </div>
                    <div className='modal-actions'>
                      <button
                        type='button'
                        onClick={closePasswordModal}
                        className='cancel-button'
                      >
                        Cancel
                      </button>
                      <button type='submit' className='submit-button'>
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {showSharePopup && selectedShareLink && (
            <SharePopup
              profileUrl={`${window.location.origin}/${userInfo?.username}`}
              linkTitle={selectedShareLink.linkTitle}
              linkUrl={selectedShareLink.linkUrl}
              onClose={() => {
                setShowSharePopup(false)
                setSelectedShareLink(null)
              }}
            />
          )}
        </div>
      )}
      <Report userName={userInfo?.username || ''} />
    </>
  )
}

export default Index
