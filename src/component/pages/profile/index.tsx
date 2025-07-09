import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../helpers/ErrorMessage';
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { callAPIWithoutAuth } from '../../../utils/apicall.utils';
import { apiUrls } from '../../../utils/api.utils';
import { defaultConfig } from '../../../config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiLogoGmail } from "react-icons/bi";
import { socialPlatforms } from '../links/linksAddEdit';
import ProfileShimmer from '../../ProfileShimmer';
import axios from 'axios';
import { Report } from './Report';

interface userInfo {
    _id: string;
    username: string;
    email: string;
    social: Link[];
    non_social: Link[];
    bio: string;
    banner_img: string;
    profile_img: string;
    theme: theme
}
interface theme {
    fontFamily: string,
    is_colorImage: string
}
interface Link {
    linkTitle: string;
    linkUrl: string;
    linkLogo: string;
    is_index: number;
    _id: string;
}
const index: React.FC = () => {

    const [ip, setIp] = useState<string>('')
    const navigate = useNavigate()
    const id = useParams()

    const [userInfo, setUserInfo] = useState<userInfo | null>(null);
    const [loader, setLoader] = useState<boolean>(false)
    const getUserDetail = async () => {
        setLoader(true)
        try {
            const response = await callAPIWithoutAuth(apiUrls.getUserInfo, { _id: id.id }, 'GET', {});
            setLoader(false)
            if (!response?.data?.status) {
                navigate("/")
                ErrorMessage(response?.data?.data?.message)
            } else {
                setUserInfo(response?.data?.data[0])
            }
        } catch (err: any) {
            ErrorMessage(err.message || "Something went wrong");
            setLoader(true)
        }
    }
    const getUserIp = async () => {
        try {
            const response = await axios.get("https://api.ipify.org/?format=json");
            setIp(response.data.ip)
        } catch (error: any) {
            ErrorMessage(error.message || "Something went wrong");
        }
    }
    useEffect(() => {
        getUserDetail()

        getUserIp()
    }, [ip])

    const handleClickSubmit = async (id: string) => {
        try {
            const userId = localStorage.getItem("accessToken") ? (localStorage.getItem("_id") || "") : "";
            const payload = {
                userId,
                ipAddress: userId ? "" : ip
            };
            const response = await callAPIWithoutAuth(apiUrls.linkClicked + "/" + id, {}, 'POST', payload);
            if (!response?.data?.status) {
                navigate("/")
                ErrorMessage(response?.data?.data?.message)
            }
        } catch (error: any) {
            ErrorMessage(error.message || "Something went wrong");
        }
    };
    const userId = localStorage.getItem("_id") || null

    return (
        <>

            {loader ? <ProfileShimmer /> :
                <div className="profile-container" style={{ height: "100vh", backgroundColor: (userInfo?.theme?.is_colorImage), color: `${userInfo?.theme?.is_colorImage === 'Elegant Dark' || userInfo?.theme?.is_colorImage === 'Midnight' ? "White" : "black"}` }}>
                    <div className="cover-photo">
                        <img id="coverImage three-dots-image" src={defaultConfig?.imagePath + userInfo?.banner_img} alt="Kapak Resmi" />
                        {userId !== id.id && userId &&

                            <BsThreeDots className='threedots' type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasBottom"
                                aria-controls="offcanvasBottom" />
                        }
                    </div>
                    <div className="profile-picture">
                        <img
                            id="profileImage"
                            src={defaultConfig?.imagePath + userInfo?.profile_img}
                            alt="Profil Fotoğrafı"
                        />

                    </div>
                    <div className="profile-info">
                        <h1 id="username " className='editprofile' style={{ fontFamily: `${userInfo?.theme?.fontFamily}` }}>{userInfo?.username} <Link to={`/updateProfile/${localStorage.getItem("_id")}`}>    {localStorage.getItem("accessToken") ? <FaEdit /> : null}</Link></h1>
                        <p id="bio" style={{ fontFamily: `${userInfo?.theme?.fontFamily}` }}>{userInfo?.bio}</p>
                        <button style={{ marginTop: 15 }}>
                            <div className='contactEmail'>
                                <BiLogoGmail />
                                <p style={{ fontFamily: `${userInfo?.theme?.fontFamily}` }}>
                                    {userInfo?.email}
                                </p>
                            </div>
                        </button>
                    </div>
                    <div className="edit-form" id="editForm">
                        <input type="text" id="editUsername" placeholder="Adınızı girin" />
                        <textarea
                            id="editBio"
                            style={{ fontFamily: `${userInfo?.theme?.fontFamily}` }}
                            placeholder="Hakkınızda bir şeyler yazın..."
                            rows={3}
                            defaultValue={""}
                        />

                    </div>

                    <div className="links-list">
                        {userInfo?.non_social.map(link => (
                            <Link
                                key={link._id}
                                to={link.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-card"
                                onClick={() => handleClickSubmit(link._id)}
                            >
                                <img src={defaultConfig?.imagePath + link.linkLogo} alt={link.linkTitle} className="link-logo" />
                                <span style={{ fontFamily: `${userInfo?.theme?.fontFamily}` }}>{link.linkTitle}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="spcial-links-list d-flex  justify-content-center gap-2">
                        {userInfo?.social.map(link => {
                            const matchedPlatform = socialPlatforms.find(
                                (platform) => platform.label.toLowerCase() === link.linkTitle.toLowerCase()
                            );
                            return (
                                <>
                                    <Link
                                        key={link._id}
                                        to={link.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-card-social"
                                        onClick={() => handleClickSubmit(link._id)}
                                    >
                                        {matchedPlatform && <span className="social-icon" style={{ fontFamily: `${userInfo?.theme?.fontFamily}` }}>{matchedPlatform.icon}</span>}
                                    </Link>
                                </>
                            )
                        }



                        )}
                    </div>

                </div>
            }
            <Report userName={userInfo?.username || ""} />

        </>
    )
}

export default index