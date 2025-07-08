import React, { useEffect, useState } from 'react';
import { API, callAPI, callAPIWithoutAuth } from '../../../utils/apicall.utils';
import { apiUrls } from '../../../utils/api.utils';
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../../../helpers/ErrorMessage';
import { defaultConfig } from '../../../config';
import LoadScreen from '../../loaderScreen';
import SuccessMessage from '../../../helpers/Success';
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
const Index = () => {
    const navidate = useNavigate()
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [previewProfile, setPreviewProfile] = useState<string | null>(null);
    const [previewBanner, setPreviewBanner] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setUserInfo((prev) => {
            if (!prev) return prev;
            if (['themeType', 'fontFamily', 'is_colorImage'].includes(name)) {
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
            setLoader(true);
            ErrorMessage(err.message || 'Something went wrong');
        }
    };
    useEffect(() => {
        if (id) {
            getUserDetail();
        }
    }, [id]);
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
            setLoader(true);
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
            console.error('Error uploading banner image:', err);
            ErrorMessage('Banner image upload failed');
        }
    };
    const handleCancel = () => {
        navidate(`/profile/${localStorage.getItem("_id")}`)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true)
        try {
            const response = await callAPI(apiUrls.updateProfile, {}, 'POST', userInfo || {});
            setLoader(false)
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message)
            } else {
                localStorage.setItem("profile_img", userInfo?.profile_img || "")
                navidate(`/profile/${localStorage.getItem("_id")}`)

                SuccessMessage(response?.data?.message)
            }
        } catch (err: any) {
            setLoader(true)
            ErrorMessage(err.message || "Something went wrong");
        }
    };
    return (
        <>{loader && <LoadScreen />}
            <div className="form-container">
                <form className="form-box" onSubmit={handleSubmit}>
                    <div className="cover-photo">
                        {previewBanner && (
                            <img
                                id="coverImage"
                                src={defaultConfig.imagePath + previewBanner}
                                alt="Cover Photo"
                            />
                        )}
                        <input
                            id="bannerUploadInput"
                            type="file"
                            name="banner_img"
                            accept="image/png,image/jpg,image/jpeg"
                            onChange={UploadBannerImage}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="bannerUploadInput" className="edit-icon-label">
                            <FaEdit className="edit-icon" />
                        </label>
                    </div>
                    <div className="profile-picture">
                        <div className="profile-width">
                            {previewProfile && (
                                <img
                                    id="profileImageedit"
                                    src={defaultConfig.imagePath + previewProfile}
                                    alt="Profile Photo"
                                />
                            )}
                            <input
                                id="profileUploadInput"
                                type="file"
                                name="profile_img"
                                accept="image/png,image/jpg,image/jpeg"
                                onChange={UploadProfileImage}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="profileUploadInput" className="edit-iconprofile-label">
                                <FaEdit className="edit-iconprofile" />
                            </label>
                        </div>
                    </div>
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={userInfo?.bio || ''}
                        onChange={handleChange}
                        placeholder="Enter your bio"
                    />
                    <label>Font Family</label>
                    <select
                        name="fontFamily"
                        value={userInfo?.theme?.fontFamily || ''}
                        onChange={handleChange}
                    >
                        <option value="">Select Font</option>
                        {fontOptions.map((font) => (
                            <option key={font} value={font}>
                                {font}
                            </option>
                        ))}
                    </select>

                    <label>Color Theme</label>
                    <select
                        name="is_colorImage"
                        value={userInfo?.theme?.is_colorImage || ''}
                        onChange={handleChange}
                    >
                        <option value="">Select Theme</option>
                        {colorOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <div className="button-group">
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Index;
