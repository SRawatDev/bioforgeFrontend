import React, { useEffect, useState } from 'react';
import { callAPIWithoutAuth } from '../../../utils/apicall.utils';
import { apiUrls } from '../../../utils/api.utils';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../../helpers/ErrorMessage';

const fontOptions = ['Arial', 'Roboto', 'Times New Roman', 'Georgia', 'Verdana'];
const colorOptions = ['Light', 'Dark', 'Colorful'];

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
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [formData, setFormData] = useState<{
        profile_img: File | null;
        bio: string;
        banner_img: File | null;
        theme: Theme;
    }>({
        profile_img: null,
        bio: '',
        banner_img: null,
        theme: {
            themeType: '',
            fontFamily: '',
            is_colorImage: '',
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, files } = e.target as any;

        if (name === 'profile_img' || name === 'banner_img') {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else if (name in formData.theme) {
            setFormData((prev) => ({
                ...prev,
                theme: {
                    ...prev.theme,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const getUserDetail = async () => {
        setLoader(true);
        try {
            const response = await callAPIWithoutAuth(apiUrls.getUserInfo, { _id: id }, 'GET', {});
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message);
            } else {
                const user = response?.data?.data[0];
                setUserInfo(user);

                setFormData({
                    profile_img: null,
                    bio: user.bio || '',
                    banner_img: null,
                    theme: {
                        themeType: user.theme?.themeType || '',
                        fontFamily: user.theme?.fontFamily || '',
                        is_colorImage: user.theme?.is_colorImage || '',
                    },
                });
            }
        } catch (err: any) {
            ErrorMessage(err.message || 'Something went wrong');
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (id) {
            getUserDetail();
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        if (formData.profile_img) data.append('profile_img', formData.profile_img);
        if (formData.banner_img) data.append('banner_img', formData.banner_img);
        data.append('bio', formData.bio);
        data.append('themeType', formData.theme.themeType);
        data.append('fontFamily', formData.theme.fontFamily);
        data.append('is_colorImage', formData.theme.is_colorImage);

        // You would send `data` to your backend here
        console.log('FormData ready for submit:', Object.fromEntries(data.entries()));
    };

    const handleCancel = () => {
        if (!userInfo) return;
        setFormData({
            profile_img: null,
            bio: userInfo.bio || '',
            banner_img: null,
            theme: {
                themeType: userInfo.theme?.themeType || '',
                fontFamily: userInfo.theme?.fontFamily || '',
                is_colorImage: userInfo.theme?.is_colorImage || '',
            },
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-box">
                <h2>Profile Settings</h2>

                <label>Profile Image</label>
                <input type="file" name="profile_img" accept="image/*" onChange={handleChange} />

                <label>Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Enter your bio"
                />

                <label>Banner Image</label>
                <input type="file" name="banner_img" accept="image/*" onChange={handleChange} />

                <label>Theme Type</label>
                <input
                    type="text"
                    name="themeType"
                    value={formData.theme.themeType}
                    onChange={handleChange}
                    placeholder="Enter theme type"
                />

                <label>Font Family</label>
                <select name="fontFamily" value={formData.theme.fontFamily} onChange={handleChange}>
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
                    value={formData.theme.is_colorImage}
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
    );
};

export default Index;
