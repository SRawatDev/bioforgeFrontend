import React, { useEffect, useState } from 'react'
import { API, callAPI, callAPIWithoutAuth } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import {
  FaEdit,
  FaCamera,
  FaUser,
  FaPalette,
  FaSave,
  FaTimes,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { defaultConfig } from "../../../config";
import SuccessMessage from "../../../helpers/Success";
import { addData, clearData } from "../../../redux/Slice";
import "./Main.css";
import Updateprofileshimmer from "../../Updateprofileshimmer";
import { useSelector } from "react-redux";
const fontOptions = [
  'Times New Roman',
  'Georgia',
  'Verdana',
  'math',
  'monospace',
  'Montserrat',
  'Playfair Display',
  'Source Sans Pro',
  'cursive',
  'system-ui',
  'sans-serif'
]
interface Theme {
  themeType: string
  fontFamily: string
  is_colorImage: string
  fontColor: string
  themeDesign?: string
}
interface UserInfo {
  _id: string
  username: string
  email: string
  bio: string
  banner_img: string
  profile_img: string
  protectedLinksPassword?: string,
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
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const storeData = useSelector((state: any) => state?.userInfo?.data);
  const [themeimg, setTheme] = useState<ThemeData[]>([]);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setUserInfo((prev) => {
      if (!prev) return prev;

      let updated: UserInfo;

      if (
        ['themeType', 'fontFamily', 'is_colorImage', 'fontColor'].includes(name)
      ) {
        updated = {
          ...prev,
          theme: {
            ...prev.theme,
            [name]: value,
          },
        };
      } else {
        updated = {
          ...prev,
          [name]: value,
        };
      }

      // ✅ Dispatch with updated state inside the updater function
      dispatch(addData(updated));
      return updated;
    });
  };

  const getheme = async () => {
    setLoader(true)
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getAlltheme,
        {},
        'GET',
        {}
      )
      setLoader(false)
      if (response?.data?.status) {
        setTheme(response.data.data || [])
      } else {
        ErrorMessage(response?.data?.message || 'Failed to fetch users')
      }
    } catch (error) {
      setLoader(true)
    }
  }
  const getUserDetail = async () => {
    setLoader(true)
    try {
      const response = await callAPI(
        apiUrls.getUserInfo,
        { _id: id },
        'GET',
        {}
      )
      setLoader(false)
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message)
      } else {
        const user = response?.data?.data[0];
        if (!storeData || Object.keys(storeData).length === 0) {
          dispatch(addData(user));
          setUserInfo(user);
          setPreviewProfile(user.profile_img || null);
          setPreviewBanner(user.banner_img || null);
        } else {
          setUserInfo(storeData);
          setPreviewProfile(storeData.profile_img || null);
          setPreviewBanner(storeData.banner_img || null);
        }
      }
    } catch (err: any) {
      setLoader(true)
    }
  }

  useEffect(() => {
    if (id) {
      getUserDetail()
    }

    getheme();
  }, [id]);

  const UploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoader(true)
      const files = e.target.files
      if (!files || files.length === 0) return
      const file = files[0]
      const formData = new FormData()
      formData.append('tempImage', file)
      const apiResponse = await API(apiUrls.upload, {}, 'POST', formData)
      setLoader(false)
      if (apiResponse.data.status) {
        const uploadedUrl = apiResponse.data.data;
        setUserInfo((prev) => {
          if (!prev) return prev;

          const updated = {
            ...prev,
            profile_img: uploadedUrl,
          };

          dispatch(addData(updated));
          return updated;
        });

        setPreviewProfile(uploadedUrl);
        e.target.value = "";
      } else {
        ErrorMessage(apiResponse?.data?.message)
      }
    } catch (err) {
      setLoader(true)
    }
  }

  const UploadBannerImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoader(true)
      const files = e.target.files
      if (!files || files.length === 0) return
      const file = files[0]
      const formData = new FormData()
      formData.append('tempImage', file)
      const apiResponse = await API(apiUrls.upload, {}, 'POST', formData)
      setLoader(false)
      if (apiResponse.data.status) {
        const uploadedUrl = apiResponse.data.data;
        setUserInfo((prev) => {
          if (!prev) return prev;

          const updated = {
            ...prev,
            banner_img: uploadedUrl,
          };

          dispatch(addData(updated)); // ✅ Sync Redux
          return updated;
        });

        setPreviewBanner(uploadedUrl);
        e.target.value = "";
      } else {
        ErrorMessage(apiResponse?.data?.message)
      }
    } catch (err) {
      setLoader(true)
    }
  }

  const handleCancel = () => {
    navigate(`/dashboard/index/${localStorage.getItem("_id")}`);
    dispatch(clearData())
  
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoader(true)
    try {
      const response = await callAPI(
        apiUrls.updateProfile,
        {},
        'POST',
        userInfo || {}
      )
      setLoader(false)
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message)
      } else {
        localStorage.setItem('profile_img', userInfo?.profile_img || '')
        navigate(`/dashboard/updateProfile/${localStorage.getItem('_id')}`)
       
        getUserDetails()
        SuccessMessage(response?.data?.message)
      }
    } catch (err: any) {
      setLoader(true)
    }
  }
  const selectSelectedTheme = (img: string) => {
    setPreviewBanner(img);

    setUserInfo((prev) => {
      if (!prev) return prev;

      const updated = {
        ...prev,
        banner_img: img,
      };

      dispatch(addData(updated));
      return updated;
    });
  };

  const selectedDesign = (design: string) => {
    setUserInfo((pre) => {
      if (!pre) return pre;

      const updated = {
        ...pre,
        theme: {
          ...pre.theme,
          themeDesign: design,
        },
      };

      dispatch(addData(updated));
      return updated;
    });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {loader ? (
        <Updateprofileshimmer />
      ) : (
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
              <div className='section-card'>
                <div className='section-header'>
                  <h3 className='section-title'>Theme</h3>
                </div>
                <div className='static-banner-selection'>
                  <div className='static-banner-grid'>
                    {themeimg.map((src, idx) => (
                      <img
                        key={idx}
                        src={defaultConfig.imagePath + src.themeImg}
                        alt={`Static Banner ${idx + 1}`}
                        className={`static-banner-thumb  'selected' : ''}`}
                        onClick={() => selectSelectedTheme(src.themeImg)}
                      />
                    ))}
                  </div>
                  <div className='banner-upload-area'>
                    <div className='banner-container'>
                      {previewBanner ? (
                        <img
                          className='banner-image fill'
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
                      accept='image/png,image/jpg,image/jpeg,image/avif'
                      onChange={UploadBannerImage}
                      className='file-input'
                    />
                  </div>
                </div>
              </div>
              <div className='section-card'>
                <div className='section-header'>
                  <h3 className='section-title'>Button Design </h3>
                </div>
                <div className='static-button-grid'>
                  <span
                    className={`static-banner-thumb text-center bg-light ${userInfo?.theme?.themeDesign === "curved"
                      ? "selected"
                      : ""
                      }`}
                    onClick={() => selectedDesign("curved")}
                  >
                    Curved
                  </span>
                  <span
                    className={`static-button-thumb text-center bg-light ${userInfo?.theme?.themeDesign === 'sharp' ? 'selected' : ''
                      }`}
                    onClick={() => selectedDesign('sharp')}
                  >
                    Sharp
                  </span>
                  <span
                    className={`static-button-thumb text-center bg-light ${userInfo?.theme?.themeDesign === 'round' ? 'selected' : ''
                      }`}
                    onClick={() => selectedDesign('round')}
                  >
                    Round
                  </span>
                </div>
              </div>
              <div className='section-card'>
                <div className='section-header'>
                  <h3 className='section-title'>Profile Picture</h3>
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
                    accept='image/png,image/jpg,image/jpeg'
                    onChange={UploadProfileImage}
                    className='file-input'
                  />
                </div>
              </div>
              <div className='section-card'>
                <div className='section-header'>
                  <h3 className='section-title'>About You</h3>
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
              <div className='section-card'>
                <div className='section-header'>
                  <h3 className='section-title'>
                    <FaPalette className='section-icon' />
                    Theme & Appearance
                  </h3>
                </div>

                <div className='theme-grid'>
                  <div className='form-group'>
                    <label htmlFor='fontFamily' className='field-label'>
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
              <div className='section-card'>
                <div className='section-header'>
                  <h3 className='section-title'>
                    {/* <FaPalette className='section-icon' /> */}
                    Protect Your Private Links
                  </h3>
                </div>

                <div className="register-input-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="protectedLinksPassword"
                    value={userInfo?.protectedLinksPassword}
                    onChange={handleChange}
                    className={`register-input`}
                    placeholder=" "
                    id="protectedLinksPassword"
                    required

                  />
                  <label htmlFor="protectedLinksPassword" className="register-label">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

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
      )}
    </>
  )
}
export default Main
