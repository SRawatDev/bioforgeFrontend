import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../helpers/ErrorMessage';
import { callAPI } from '../../../utils/apicall.utils';
import { apiUrls } from '../../../utils/api.utils';
import { TablePagination } from "@mui/material";
import SuccessMessage from '../../../helpers/Success';
export interface Welcome {
    _id: string;
    username: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    password: string;
    type: string;
    status: string;
    is_deleted: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    links: Link[];
}

export interface Link {
    linkTitle: string;
    linkUrl: string;
    linkLogo: string;
    _id: string;
    is_index?: number;
}


const Index = () => {
    const [users, setusers] = useState<Welcome[]>([])
    const getUser = async () => {
        try {
            const response = await callAPI(
                apiUrls.getAllUser,
                {},
                "GET",
                {}
            );
            if (!response?.data?.status) {
                setusers(response?.data?.data)
                ErrorMessage(response?.data?.message);
            } else {
                SuccessMessage(response?.data?.message);
            }
        } catch (err: any) {
            ErrorMessage(err.message || "Something went wrong");
        }
    }
    useEffect(() => {
        getUser()

    }, [])
    return (
        <div>Index</div>
    )
}

export default Index