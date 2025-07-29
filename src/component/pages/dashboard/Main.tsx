import React, { useEffect, useState } from 'react'
import { API, callAPI, callAPIWithoutAuth } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import {
  FaEdit,
  FaCamera,
  FaUser,
  FaPalette,
  FaFont,
  FaSave,
  FaTimes
} from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../../../helpers/ErrorMessage'
import { defaultConfig } from '../../../config'
import LoadScreen from '../../loaderScreen'
import SuccessMessage from '../../../helpers/Success'
import './Main.css'
const fontOptions = [
  'Times New Roman',
  'Georgia',
  'Verdana',
  'math',
  'monospace',
  'Montserrat',
  'Playfair Display',
  'Source Sans Pro',
  'cursive'
]
interface Theme {
  themeType: string
  fontFamily: string
  is_colorImage: string
  fontColor: string
}
interface UserInfo {
  _id: string
  username: string
  email: string
  bio: string
  banner_img: string
  profile_img: string
  theme: Theme
}
export interface ThemeData {
  _id?: string
  themeName: string
  themeImg: string
  themeDiscription: string
}
interface Props {
  getUserDetails: () => void
}
const Main: React.FC<Props> = ({ getUserDetails }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loader, setloader] = useState(false)
  const [previewProfile, setPreviewProfile] = useState<string | null>(null)
  const [themeimg, setTheme] = useState<ThemeData[]>([])
  const [previewBanner, setPreviewBanner] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setUserInfo(prev => {
      if (!prev) return prev
      if (
        ['themeType', 'fontFamily', 'is_colorImage', 'fontColor'].includes(name)
      ) {
        return {
          ...prev,
          theme: {
            ...prev.theme,
            [name]: value
          }
        }
      }
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const getheme = async () => {
    setloader(true)
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getAlltheme,
        {},
        'GET',
        {}
      )
      setloader(false)
      if (response?.data?.status) {
        setTheme(response.data.data || [])
      } else {
        ErrorMessage(response?.data?.message || 'Failed to fetch users')
      }
    } catch (error) {
      setloader(true)
    }
  }
  const getUserDetail = async () => {
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
        ErrorMessage(response?.data?.message)
      } else {
        const user = response?.data?.data[0]
        setUserInfo(user)
        setPreviewProfile(user.profile_img || null)
        setPreviewBanner(user.banner_img || null)
      }
    } catch (err: any) {
      setloader(true)
    }
  }

  useEffect(() => {
    if (id) {
      getUserDetail()
    }
    getheme()
  }, [id])

  const UploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setloader(true)
      const files = e.target.files
      if (!files || files.length === 0) return
      const file = files[0]
      const formData = new FormData()
      formData.append('tempImage', file)
      const apiResponse = await API(apiUrls.upload, {}, 'POST', formData)
      setloader(false)
      if (apiResponse.data.status) {
        const uploadedUrl = apiResponse.data.data
        setUserInfo(prev => ({ ...prev!, profile_img: uploadedUrl }))
        setPreviewProfile(uploadedUrl)
        e.target.value = ''
      } else {
        ErrorMessage(apiResponse?.data?.message)
      }
    } catch (err) {
      setloader(true)
    }
  }

  const UploadBannerImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setloader(true)
      const files = e.target.files
      if (!files || files.length === 0) return
      const file = files[0]
      const formData = new FormData()
      formData.append('tempImage', file)
      const apiResponse = await API(apiUrls.upload, {}, 'POST', formData)
      setloader(false)
      if (apiResponse.data.status) {
        const uploadedUrl = apiResponse.data.data
        setUserInfo(prev => ({ ...prev!, banner_img: uploadedUrl }))
        setPreviewBanner(uploadedUrl)
        e.target.value = ''
      } else {
        ErrorMessage(apiResponse?.data?.message)
      }
    } catch (err) {
      setloader(true)
    }
  }

  const handleCancel = () => {
    navigate(`/dashboard/index/${localStorage.getItem('_id')}`)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloader(true)
    try {
      const response = await callAPI(
        apiUrls.updateProfile,
        {},
        'POST',
        userInfo || {}
      )
      setloader(false)
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message)
      } else {
        localStorage.setItem('profile_img', userInfo?.profile_img || '')
        navigate(`/dashboard/updateProfile/${localStorage.getItem('_id')}`)
        getUserDetails()
        SuccessMessage(response?.data?.message)
      }
    } catch (err: any) {
      setloader(true)
    }
  }
  const selectSelectedTheme = (img: string) => {
    setPreviewBanner(img)
    setUserInfo(prev => ({ ...prev!, banner_img: img }))
  }

  console.log('================', previewProfile)
  return (
    <>
      {loader && <LoadScreen />}
      <div className='profile-update-wrapper'>
        <div className='profile-container'>
          <div className='profile-header'>
            <div className='header-content'>
              <h1 className='profile-title'>
                <FaEdit className='title-icon' />
                Edit Profile
              </h1>
              <p className='profile-subtitle'>
                Customize your profile appearance and information
              </p>
            </div>
          </div>

          <form className='profile-form' onSubmit={handleSubmit}>
            {/* Theme Section */}
            <div className='section-card'>
              <div className='section-header'>
                <h3 className='section-title'>Theme </h3>
                <p className='section-description'>
                  Upload a theme for your profile
                </p>
              </div>
              <div className='static-banner-grid'>
                {themeimg.map((src, idx) => (
                  <img
                    key={idx}
                    src={defaultConfig.imagePath + src.themeImg}
                    alt={`Static Banner ${idx + 1}`}
                    className={`static-banner-thumb  'selected' : ''
                                            }`}
                    onClick={() => selectSelectedTheme(src.themeImg)}
                  />
                ))}
              </div>
              <div className='banner-upload-area'>
                <div className='banner-container'>
                  {previewBanner ? (
                    <img
                      className='banner-image'
                      src={`${defaultConfig.imagePath + previewBanner}`}
                      alt='Banner preview'
                    />
                  ) : (
                    <div className='banner-placeholder'>
                      <FaCamera className='placeholder-icon' />
                      <span>No Theme</span>
                    </div>
                  )}
                  <div className='banner-overlay'>
                    <label
                      htmlFor='bannerUploadInput'
                      className='upload-button'
                    >
                      <FaCamera />
                      <span>Change Theme</span>
                    </label>
                  </div>
                </div>
                <input
                  id='bannerUploadInput'
                  type='file'
                  name='banner_img'
                  accept='image/png,image/jpg,image/jpeg,image'
                  onChange={UploadBannerImage}
                  className='file-input'
                />
              </div>
            </div>
           {/* Profile Picture Section */}
            <div className='section-card'>
              <div className='section-header'>
                <h3 className='section-title'>Profile Picture</h3>
                <p className='section-description'>Upload your profile photo</p>
              </div>
              <div className='profile-upload-area'>
                <div className='profile-image-container'>
                  <div
                    className='profile-avatar'
                    style={{
                      backgroundImage: previewProfile
                        ? `url(${defaultConfig.imagePath + previewProfile})`
                        : 'none'
                    }}
                  >
                    {!previewProfile && (
                      <FaUser className='avatar-placeholder' />
                    )}
                    <div className='profile-overlay'>
                      <label
                        htmlFor='profileUploadInput'
                        className='profile-upload-btn'
                      >
                        <FaCamera />
                      </label>
                    </div>
                  </div>
                </div>
                <input
                  id='profileUploadInput'
                  type='file'
                  name='profile_img'
                  accept='image/png,image/jpg,image/jpeg,image'
                  onChange={UploadProfileImage}
                  className='file-input'
                />
              </div>
            </div>
              {/* About Section */}
            <div className='section-card'>
              <div className='section-header'>
                <h3 className='section-title'>About You</h3>
                <p className='section-description'>
                  Tell others about yourself
                </p>
              </div>
              <div className='form-group'>
                <label htmlFor='bio' className='field-label'>
                  Bio
                </label>
                <textarea
                  id='bio'
                  name='bio'
                  value={userInfo?.bio || ''}
                  onChange={handleChange}
                  placeholder='Write a brief description about yourself...'
                  rows={4}
                  className='bio-textarea'
                />
              </div>
            </div>
              {/* Theme and Appperance Section */}
            <div className='section-card'>
              <div className='section-header'>
                <h3 className='section-title'>
                  <FaPalette className='section-icon' />
                  Theme & Appearance
                </h3>
                <p className='section-description'>
                  Customize your profile's visual style
                </p>
              </div>

              <div className='theme-grid'>
                <div className='form-group'>
                  <label htmlFor='fontFamily' className='field-label'>
                    <FaFont className='label-icon' />
                    Font Style
                  </label>
                  <select
                    id='fontFamily'
                    name='fontFamily'
                    value={userInfo?.theme?.fontFamily || ''}
                    onChange={handleChange}
                    className='select-field'
                  >
                    <option value=''>Select Font</option>
                    {fontOptions.map(font => (
                      <option
                        key={font}
                        value={font}
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='fontColor' className='field-label'>
                    Font Color
                  </label>
                  <div className='color-input-wrapper'>
                    <input
                      type='color'
                      id='fontColor'
                      name='fontColor'
                      value={userInfo?.theme?.fontColor || '#000000'}
                      onChange={handleChange}
                      className='color-input'
                    />
                    <span
                      className='color-preview'
                      style={{ backgroundColor: userInfo?.theme?.fontColor }}
                    ></span>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='is_colorImage' className='field-label'>
                    Theme Color
                  </label>
                  <div className='color-input-wrapper'>
                    <input
                      type='color'
                      id='is_colorImage'
                      name='is_colorImage'
                      value={userInfo?.theme?.is_colorImage || '#ffffff'}
                      onChange={handleChange}
                      className='color-input'
                    />
                    <span
                      className='color-preview'
                      style={{
                        backgroundColor: userInfo?.theme?.is_colorImage
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='form-actions'>
              <button type='submit' className='save-button'>
                <FaSave className='button-icon' />
                Save Changes
              </button>
              <button
                type='button'
                className='cancel-button'
                onClick={handleCancel}
              >
                <FaTimes className='button-icon' />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Main
