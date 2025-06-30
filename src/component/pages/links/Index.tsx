import React, { useEffect, useState } from 'react'
import { callAPI } from '../../../utils/apicall.utils';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';
import { defaultConfig } from '../../../config';
interface links {
    linkTitle: string,
    linkUrl: string,
    linkLogo: string,
    status: string,
}
const Index: React.FC = () => {
    const [linksInfo, setlinksInfo] = useState<links[]>([]);
    const [loader, setLoader] = useState<boolean>(false)
    const getUserDetail = async () => {
        setLoader(true)
        try {
            const response = await callAPI(apiUrls.getlinks, {}, 'GET', {});
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message)
                setLoader(true)
            } else {
                setlinksInfo(response?.data?.data || [])
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
            <div className="links-container">
                <div className='linksHeader'>

                    <h2 className="links-title">My Social Links</h2>
                    <button className="btn edit">ADD</button>
                </div>
                <div className="links-grid">
                    {
                        linksInfo?.map((item) => (
                            <div className="link-card">
                                <img
                                    src={defaultConfig?.imagePath + item?.linkLogo}
                                    alt="Instagram"
                                    className="link-logo"
                                />
                                <div className="link-info">
                                    <h3 className="link-title">{item?.linkTitle}</h3>
                                    <p className="link-url">{item?.linkUrl}</p>
                                    <div className="button-row">
                                        <a
                                            href="https://youtube.com/@MrAbhi"
                                            target="_blank"
                                            className="btn visit"
                                        >
                                            Visit
                                        </a>
                                        <button className="btn edit">Edit</button>
                                        <button className="btn delete">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </>


    )
}

export default Index