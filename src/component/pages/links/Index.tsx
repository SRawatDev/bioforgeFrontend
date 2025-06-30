import React, { useEffect, useState } from 'react';
import { callAPI } from '../../../utils/apicall.utils';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';
import { defaultConfig } from '../../../config';
import { LinksAddEdit } from './linksAddEdit';
import Delete from './Delete';
import { Link } from 'react-router-dom';

interface Link {
    _id: string;
    linkTitle: string;
    linkUrl: string;
    linkLogo: string;
    status: string;
}

const Index: React.FC = () => {
    const [action, setAction] = useState<'add' | 'edit'>('add');
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [linksInfo, setLinksInfo] = useState<Link[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [linkDetail, setLinkDetail] = useState<Link>({
        _id: '',
        linkTitle: '',
        linkUrl: '',
        linkLogo: '',
        status: ''
    });

    const Detail = async () => {
        setLoader(true);
        try {
            const response = await callAPI(apiUrls.getlinks, {}, 'GET', {});
            if (response?.data?.status) {
                setLinksInfo(response.data.data || []);
            } else {
                ErrorMessage(response?.data?.message);
            }
        } catch (err: any) {
            ErrorMessage(err.message || 'Something went wrong');
        } finally {
            setLoader(false);
        }
    };

    const handleEdit = (item: Link): void => {
        setLinkDetail(item);
        setOpen(true);
        setAction('edit');
    };

    const handleDelete = (item: Link): void => {
        setLinkDetail(item);
        setDeleteOpen(true);
    };

    const confirmDelete = async (item: Link) => {
        try {
            const res = await callAPI(apiUrls.linkdelete, { _id: item?._id }, 'POST', { _id: linkDetail._id });
            if (res?.data?.status) {
                SuccessMessage(res?.data?.message);
                setDeleteOpen(false);
                Detail();
            } else {
                ErrorMessage(res?.data?.message);
            }
        } catch (err: any) {
            ErrorMessage(err.message || 'Delete failed');
        }
    };
    const confirmStatus = async (item: Link) => {
        try {
            const res = await callAPI(apiUrls.linkupdateStatus, { _id: item?._id }, 'GET', {  });
            if (res?.data?.status) {
                SuccessMessage(res?.data?.message);
                setDeleteOpen(false);
                Detail();
            } else {
                ErrorMessage(res?.data?.message);
            }
        } catch (err: any) {
            ErrorMessage(err.message || 'Delete failed');
        }
    };

    useEffect(() => {
        Detail();
    }, []);

    return (
        <>
            {loader && <LoadScreen />}
            <div className="linksHeader">
                <h2 className="links-title">Social Links</h2>
                <button className="editbutton" onClick={() => { setOpen(true); setAction('add'); }}>ADD</button>
            </div>

            <div className="links-container">
                <div className="links-grid">
                    {linksInfo.map((item) => (
                        <div className="link-card" key={item._id}>
                            <img
                                src={defaultConfig.imagePath + item.linkLogo}
                                alt={item.linkTitle}
                                className="link-logo"
                            />
                            <div className="link-info">
                                <h3 className="link-title">{item.linkTitle}</h3>
                                <p className="link-url"><Link to={item.linkUrl} >{item.linkUrl}</Link></p>
                                <div className="button-row">

                                    <button className="btn status" onClick={() => confirmStatus(item)}>{item?.status}</button>
                                    <button className="btn edit" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn delete" onClick={() => handleDelete(item)}>Delete</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <Delete
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                confirmDetail={() => confirmDelete(linkDetail)}
                linkDetail={linkDetail}
            />
            <LinksAddEdit
                open={open}
                onClose={() => setOpen(false)}
                Detail={Detail}
                linkDetail={linkDetail}
                action={action}
            />
        </>
    );
};

export default Index;
