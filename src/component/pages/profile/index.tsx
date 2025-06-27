import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { callAPI } from '../../../utils/apicall.utils';
import { apiUrls } from '../../../utils/api.utils';
const index: React.FC = () => {
    const [loader, setLoader] = useState<boolean>(false)
    const getUserDetail = async () => {
        try {
            const response = await callAPI(apiUrls.getUserInfo, {}, 'GET', {});
            if (!response?.data?.status) {
                ErrorMessage(response?.data?.message)
            } else {
                localStorage.setItem("_id", response?.data?.data)
                setLoader(true)
                SuccessMessage(response?.data?.message)
            }
        } catch (err: any) {
            ErrorMessage(err.message || "Something went wrong");
            setLoader(false)
        }
    }
    useEffect(() => {
        getUserDetail()
    }, [])

    return (
        <div>index</div>
    )
}

export default index