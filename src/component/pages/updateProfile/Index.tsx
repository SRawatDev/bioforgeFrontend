import React, { useEffect, useState } from 'react';
import { API, callAPI, callAPIWithoutAuth } from '../../../utils/apicall.utils';
import { apiUrls } from '../../../utils/api.utils';
import { FaEdit, FaCamera } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../../../helpers/ErrorMessage';
import { defaultConfig } from '../../../config';
import LoadScreen from '../../loaderScreen';
import SuccessMessage from '../../../helpers/Success';
import './updateProfile.css';

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
];

const colorOptions = [
    'Classic Light',
    'aqua',
    'thistle',
    'Soft Charcoal',
];

interface Theme {
    themeType: string;
    fontFamily: string;
    is_colorImage: string;
    fontColor: string
}

interface UserInfo {
    _id: string;
    username: string;
    email: string;
    bio: string;
    banner_img: string;
    profile_img: string;
    theme: Theme;
}

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [previewProfile, setPreviewProfile] = useState<string | null>(null);
    const [previewBanner, setPreviewBanner] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

     const handleChange = (
       e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
       >
     ) => {
       const { name, value } = e.target;
       setUserInfo((prev) => {
         if (!prev) return prev;
         if (
           ["themeType", "fontFamily", "is_colorImage", "fontColor"].includes(name)
         ) {
           return {
             ...prev,
             theme: {
               ...prev.theme,
               [name]: value,
             },
           };
         }
         return {
           ...prev,
           [name]: value,
         };
       });
     };

    const getUserDetail = async () => {
        setLoader(true);
        try {
            const response = await callAPIWithoutAuth(apiUrls.getUserInfo, { _id: id }, 'GET', {});
            setLoader(false);
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message);
            } else {
                const user = response?.data?.data[0];
                setUserInfo(user);
                setPreviewProfile(user.profile_img || null);
                setPreviewBanner(user.banner_img || null);
            }
        } catch (err: any) {
            setLoader(false);
            ErrorMessage(err.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        if (id) {
            getUserDetail();
        }
    }, [id]);
    console.log("=========================", previewBanner)

    const UploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setLoader(true);
            const files = e.target.files;
            if (!files || files.length === 0) return;
            const file = files[0];
            const formData = new FormData();
            formData.append('tempImage', file);
            const apiResponse = await API(apiUrls.upload, {}, 'POST', formData);
            setLoader(false);
            if (apiResponse.data.status) {
                const uploadedUrl = apiResponse.data.data;
                setUserInfo((prev) => ({ ...prev!, profile_img: uploadedUrl }));
                setPreviewProfile(uploadedUrl);
                e.target.value = '';
            } else {
                ErrorMessage(apiResponse?.data?.message);
            }
        } catch (err) {
            setLoader(false);
            ErrorMessage('Profile image upload failed');
        }
    };

    const UploadBannerImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setLoader(true);
            const files = e.target.files;
            if (!files || files.length === 0) return;
            const file = files[0];
            const formData = new FormData();
            formData.append('tempImage', file);
            const apiResponse = await API(apiUrls.upload, {}, 'POST', formData);
            setLoader(false);
            if (apiResponse.data.status) {
                const uploadedUrl = apiResponse.data.data;
                setUserInfo((prev) => ({ ...prev!, banner_img: uploadedUrl }));
                setPreviewBanner(uploadedUrl);
                e.target.value = '';
            } else {
                ErrorMessage(apiResponse?.data?.message);
            }
        } catch (err) {
            setLoader(false);
            ErrorMessage('Banner image upload failed');
        }
    };

    const handleCancel = () => {
        navigate(`/dashboard/index/${localStorage.getItem("_id")}`);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await callAPI(apiUrls.updateProfile, {}, 'POST', userInfo || {});
            setLoader(false);
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message);
            } else {
                localStorage.setItem("profile_img", userInfo?.profile_img || "");
                navigate(`/dashboard/index/${localStorage.getItem("_id")}`);
                SuccessMessage(response?.data?.message);
            }
        } catch (err: any) {
            setLoader(false);
            ErrorMessage(err.message || "Something went wrong");
        }
    };

    return (
        <>
            {loader && <LoadScreen />}
            <div className="update-profile-container">

                <div className="update-profile-card">
                    <h1 className="update-profile-title">Edit Your Profile</h1>

                    <form className="update-profile-form" onSubmit={handleSubmit}>
                        {/* Banner Image */}
                        <div className="banner-upload-container">
                            <div className="banner-preview"
                            >
                                <img className='banner-preview' src={
                                    previewBanner
                                        ? `${defaultConfig.imagePath + previewBanner}`
                                        : 'none'
                                } alt="" />

                                <div className="banner-overlay">
                                    <label htmlFor="bannerUploadInput" className="banner-upload-label">
                                        <FaCamera />
                                        <span>Change Cover</span>
                                    </label>
                                </div>
                            </div>
                            <input
                                id="bannerUploadInput"
                                type="file"
                                name="banner_img"
                                accept="image/png,image/jpg,image/jpeg"
                                onChange={UploadBannerImage}
                                className="hidden-input"
                            />
                        </div>
                        <div className="profile-upload-container">
                            <div className="profile-image-wrapper">
                                <div className="profile-image-preview"
                                    style={{
                                        backgroundImage: previewProfile
                                            ? `url(${defaultConfig.imagePath + previewProfile})`
                                            : 'none'
                                    }}
                                >
                                    <div className="profile-overlay">
                                        <label htmlFor="profileUploadInput" className="profile-upload-icon">
                                            <FaCamera />
                                        </label>
                                    </div>
                                </div>
                                <input
                                    id="profileUploadInput"
                                    type="file"
                                    name="profile_img"
                                    accept="image/png,image/jpg,image/jpeg"
                                    onChange={UploadProfileImage}
                                    className="hidden-input"
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="form-fields">
                            <div className="form-group">
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={userInfo?.bio || ''}
                                    onChange={handleChange}
                                    placeholder="Tell the world about yourself"
                                    rows={4}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fontFamily">Font Style</label>
                                <select
                                    id="fontFamily"
                                    name="fontFamily"
                                    value={userInfo?.theme?.fontFamily || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Font</option>
                                    {fontOptions.map((font) => (
                                        <option key={font} value={font} style={{ fontFamily: font }}>
                                            {font}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Font Color</label>
                                <input
                                    type="color"
                                    id="favcolor"
                                    name="fontColor"
                                    value={userInfo?.theme?.fontColor || ""}
                                    onChange={handleChange}
                                ></input>
                            </div>
                            <div>
                                <label>Color Theme</label>
                                <input
                                    type="color"
                                    id="favcolor"
                                    name="is_colorImage"
                                    value={userInfo?.theme?.is_colorImage || ""}
                                    onChange={handleChange}
                                ></input>
                            </div>


                            <div className="form-actions">
                                <button type="submit" className="save-button">
                                    Save Changes
                                </button>
                                <button type="button" className="cancel-button" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
