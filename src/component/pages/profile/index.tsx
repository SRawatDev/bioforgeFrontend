import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { callAPI, callAPIWithoutAuth } from '../../../utils/apicall.utils';
import { apiUrls } from '../../../utils/api.utils';
import { defaultConfig } from '../../../config';
import { Link, useParams } from 'react-router-dom';
import { BiLogoGmail } from "react-icons/bi";
import LoadScreen from '../../loaderScreen';
interface userInfo {
    _id: string;
    username: string;
    email: string;
    linkInfo: Link[];
    bio: string;
    profile_img: string;
}

interface Link {
    linkTitle: string;
    linkUrl: string;
    linkLogo: string;
    is_index: number;
    _id: string;
}

const index: React.FC = () => {
    const id = useParams()
    const [userInfo, setUserInfo] = useState<userInfo | null>(null);
    const [loader, setLoader] = useState<boolean>(false)
    const getUserDetail = async () => {
        setLoader(true)
        try {
            const response = await callAPIWithoutAuth(apiUrls.getUserInfo, { _id: id.id }, 'GET', {});
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message)
                setLoader(true)
            } else {
                setUserInfo(response?.data?.data[0])
                setLoader(false)
                SuccessMessage(response?.data?.message)
            }
        } catch (err: any) {
            ErrorMessage(err.message || "Something went wrong");
            setLoader(true)
        }
    }
    useEffect(() => {
        getUserDetail()
    }, [])
    return (
        <>
            {loader && <LoadScreen />}
            <div className="profile-container">
                <div className="cover-photo">
                    <img id="coverImage" src={defaultConfig?.imagePath + userInfo?.profile_img} alt="Kapak Resmi" />
                </div>
                <div className="profile-picture">
                    <img
                        id="profileImage"
                        src={defaultConfig?.imagePath + userInfo?.profile_img}
                        alt="Profil Fotoğrafı"
                    />

                </div>
                <div className="profile-info">
                    <h1 id="username">{userInfo?.username}</h1>
                    <p id="bio">{userInfo?.bio}</p>
                    <button style={{ marginTop: 15 }}>
                        <div className='contactEmail'>
                            <BiLogoGmail />
                            <p>

                                {userInfo?.email}
                            </p>
                        </div>
                    </button>
                </div>
                <div className="edit-form" id="editForm">
                    <input type="text" id="editUsername" placeholder="Adınızı girin" />
                    <textarea
                        id="editBio"
                        placeholder="Hakkınızda bir şeyler yazın..."
                        rows={3}
                        defaultValue={""}
                    />
                    <button>Kaydet</button>
                </div>
                <div className="links-list">
                    {userInfo?.linkInfo.map(link => (
                        <Link
                            key={link._id}
                            to={link.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-card"
                        >
                            <img src={defaultConfig?.imagePath + link.linkLogo} alt={link.linkTitle} className="link-logo" />
                            <span>{link.linkTitle}</span>
                        </Link>
                    ))}
                </div>

            </div>

        </>
    )
}

export default index