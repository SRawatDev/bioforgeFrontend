import React, { useEffect, useState } from 'react';
import { callAPI } from '../../../utils/apicall.utils';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';
import { defaultConfig } from '../../../config';
import { LinksAddEdit } from './linksAddEdit';
import Delete from './Delete';
import { Link as RouterLink } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { socialPlatforms } from './linksAddEdit';

interface LinkItem {
    _id: string;
    linkTitle: string;
    linkUrl: string;
    linkLogo: string;
    status: string;
    type: string;
}

const Index: React.FC = () => {
    const [action, setAction] = useState<'add' | 'edit'>('add');
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [linksInfo, setLinksInfo] = useState<LinkItem[]>([]);
    const [loader, setLoader] = useState(false);
    const [linkDetail, setLinkDetail] = useState<LinkItem>({
        _id: '',
        linkTitle: '',
        linkUrl: '',
        linkLogo: '',
        status: '',
        type: ''
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

    const handleEdit = (item: LinkItem) => {
        setLinkDetail(item);
        setOpen(true);
        setAction('edit');
    };

    const handleDelete = (item: LinkItem) => {
        setLinkDetail(item);
        setDeleteOpen(true);
    };

    const confirmDelete = async (item: LinkItem) => {
        try {
            const res = await callAPI(apiUrls.linkdelete, { _id: item._id }, 'POST', {});
            if (res?.data?.status) {
                SuccessMessage(res.data.message);
                setDeleteOpen(false);
                Detail();
            } else {
                ErrorMessage(res.data.message);
            }
        } catch (err: any) {
            ErrorMessage(err.message || 'Delete failed');
        }
    };

    const confirmStatus = async (item: LinkItem) => {
        try {
            const res = await callAPI(apiUrls.linkupdateStatus, { _id: item._id }, 'GET', {});
            if (res?.data?.status) {
                SuccessMessage(res.data.message);
                Detail();
            } else {
                ErrorMessage(res.data.message);
            }
        } catch (err: any) {
            ErrorMessage(err.message || 'Status update failed');
        }
    };

    useEffect(() => {
        Detail();
    }, []);

    return (
        <>
            {loader && <LoadScreen />}
            <div className="linksHeader">
                <h2 className="links-title">Manage Your Links</h2>
                <button
                    className="editbutton"
                    onClick={() => {
                        setOpen(true);
                        setAction('add');
                        setLinkDetail({
                            _id: '',
                            linkTitle: '',
                            linkUrl: '',
                            linkLogo: '',
                            status: '',
                            type: '',
                        });
                    }}
                >
                    ADD
                </button>
            </div>

            <div className="links-container">
                <div className="links-grid">
       
                    <h5 className='social-Links'>Social Links</h5>
                    {linksInfo.map((item) => {
                        const matchedPlatform = socialPlatforms.find(
                            (platform) => platform.label.toLowerCase() === item.linkTitle.toLowerCase()
                        );
                        return (
                            <>
                                {
                                    item?.type == 'social' &&
                                    <div className="link-card" key={item._id}>
                                        {matchedPlatform ? (
                                            <span className="social-icon">{matchedPlatform.icon}</span>
                                        ) : (
                                            <img
                                                src={defaultConfig.imagePath + item.linkLogo}
                                                alt={item.linkTitle}
                                                className="link-logo"
                                            />
                                        )}

                                        <div className="link-info">
                                            <h3 className="link-title">{item.linkTitle}</h3>

                                            <div className="dropdown three-dots">
                                                <BsThreeDotsVertical
                                                    className="dropdown-toggle three-dots"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                />
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <RouterLink
                                                            className="dropdown-item d-flex align-items-center gap-2"
                                                            to={item.linkUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <AiOutlineEye /> {item.linkTitle}
                                                        </RouterLink>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item d-flex align-items-center gap-2"
                                                            type="button"
                                                            onClick={() => confirmStatus(item)}
                                                        >
                                                            <TbStatusChange /> {item.status}
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item d-flex align-items-center gap-2"
                                                            type="button"
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            <MdOutlineEdit /> Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item d-flex align-items-center gap-2 text-danger"
                                                            type="button"
                                                            onClick={() => handleDelete(item)}
                                                        >
                                                            <MdDeleteOutline /> Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        );
                    })}
                        <h5 className='social-Links'> Non Social Links</h5>
                    {linksInfo.map((item) => {
                        const matchedPlatform = socialPlatforms.find(
                            (platform) => platform.label.toLowerCase() === item.linkTitle.toLowerCase()
                        );
                        return (
                            <>
                                {
                                    item?.type == 'non_social' &&
                                    <div className="link-card" key={item._id}>
                                        {matchedPlatform ? (
                                            <span className="social-icon">{matchedPlatform.icon}</span>
                                        ) : (
                                            <img
                                                src={defaultConfig.imagePath + item.linkLogo}
                                                alt={item.linkTitle}
                                                className="link-logo"
                                            />
                                        )}

                                        <div className="link-info">
                                            <h3 className="link-title">{item.linkTitle}</h3>

                                            <div className="dropdown three-dots">
                                                <BsThreeDotsVertical
                                                    className="dropdown-toggle three-dots"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                />
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <RouterLink
                                                            className="dropdown-item d-flex align-items-center gap-2"
                                                            to={item.linkUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <AiOutlineEye /> {item.linkTitle}
                                                        </RouterLink>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item d-flex align-items-center gap-2"
                                                            type="button"
                                                            onClick={() => confirmStatus(item)}
                                                        >
                                                            <TbStatusChange /> {item.status}
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item d-flex align-items-center gap-2"
                                                            type="button"
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            <MdOutlineEdit /> Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item d-flex align-items-center gap-2 text-danger"
                                                            type="button"
                                                            onClick={() => handleDelete(item)}
                                                        >
                                                            <MdDeleteOutline /> Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        );
                    })}
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
