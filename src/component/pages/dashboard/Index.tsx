import { useNavigate, useParams } from 'react-router-dom'
// import "./dashboard.css";
import DashboardSidebar from './DashboardSidebar'
import Main from './Main'
import { MobileUi } from './MobileUi'
import ManageLinks from '../links/Index'
import { callAPIWithoutAuth } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import { useEffect, useState } from 'react'
import ErrorMessage from '../../../helpers/ErrorMessage'
import ProfileShimmer from '../../ProfileShimmer'
import { FaShareAlt, FaCopy, FaCheck } from 'react-icons/fa'

interface Theme {
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

interface UserInfo {
  _id: string
  username: string
  email: string
  social: Link[]
  non_social: Link[]
  bio: string
  banner_img: string
  profile_img: string
  theme: Theme
}

const Index = () => {
  const { layout, id } = useParams()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loader, setloader] = useState<boolean>(false)
  const [isMobileView, setIsMobileView] = useState<boolean>(false)
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const navigate = useNavigate()

  const getUserDetail = async () => {
    if (!id) return
    setloader(true)
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getUserInfo,
        { _id: id },
        'GET',
        {}
      )
      setloader(false)
      if (!response?.data?.status) {
        navigate('/')
        ErrorMessage(response?.data?.data?.message || 'Invalid user')
      } else {
        setUserInfo(response?.data?.data[0])
      }
    } catch (err: any) {
      setloader(true)
    }
  }

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions)
  }

  const copyProfileLink = async () => {
    if (userInfo && userInfo._id) {
      const profileUrl = `${window.location.origin}/dashboard/profile/${userInfo._id}`
      try {
        await navigator.clipboard.writeText(profileUrl)
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
          setShowShareOptions(false)
        }, 2000)
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = profileUrl
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
          setShowShareOptions(false)
        }, 2000)
      }
    }
  }

  const openProfileInNewTab = () => {
    if (userInfo && userInfo._id) {
      window.open(`/dashboard/profile/${userInfo._id}`, '_blank')
    }
  }

  useEffect(() => {
    getUserDetail()
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 992)
    }
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    
    // Close share options when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.share-dropdown')) {
        setShowShareOptions(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('resize', checkMobileView)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [id])

  return (
    <>
      <div className='dashboard-layout'>
        <div className='dashboard-sidebar'>
          <DashboardSidebar />
        </div>

        <div className='dashboard-main-area'>
          <div className='dashboard-main-content'>
            {layout === 'updateProfile' ? (
              <Main getUserDetails={getUserDetail} />
            ) : (
              <ManageLinks getUserDetail={getUserDetail} />
            )}
          </div>
        </div>

        <div
          className={`dashboard-preview ${isMobileView ? 'mobile-mode' : ''}`}
        >
          <div className='preview-header'>
            <h3>Mobile Preview</h3>
            <div className='preview-actions'>
              <p>See how your profile looks on mobile devices</p>

              <div className='share-dropdown' style={{ position: 'relative', display: 'inline-block' }}>
                <button
                  className='share-profile-button'
                  onClick={handleShareClick}
                  title='Share profile'
                >
                  <FaShareAlt /> share
                </button>

                {showShareOptions && (
                  <div 
                    className='share-options'
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      zIndex: 1000,
                      minWidth: '180px',
                      marginTop: '4px'
                    }}
                  >
                    <button
                      onClick={copyProfileLink}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: copied ? '#4CAF50' : '#333',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {copied ? <FaCheck /> : <FaCopy />}
                      {copied ? 'Link copied!' : 'Copy link'}
                    </button>
                    
                    <button
                      onClick={openProfileInNewTab}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#333',
                        borderRadius: '0 0 8px 8px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <FaShareAlt />
                      Open in new tab
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='preview-device'>
            <div className='device-frame'>
              <div className='device-status-bar'></div>
              <div className='device-content'>
                {loader ? <ProfileShimmer /> : <MobileUi userInfo={userInfo} />}
              </div>
              <div className='device-home-button'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index