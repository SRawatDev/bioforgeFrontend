import React, { useEffect, useState } from "react";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import SuccessMessage from "../../../helpers/Success";
import { apiUrls } from "../../../utils/api.utils";
import Delete from "./Delete";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { FiLink2, FiUsers, FiBarChart } from "react-icons/fi";
import LinkShimmer from "../../LinkShimmer";
import { VideoAddEdit } from "./videoAddEdit";
interface LinkItem {
    _id: string;
    videoTitle: string;
    videoLink: string;
    status: string;

}
interface Props {
    getUserDetail: () => void;
}
const Index: React.FC<Props> = ({ getUserDetail }) => {
    const [non_socialData, setnonSocialData] = useState<LinkItem[]>([]);
    const [action, setAction] = useState<"add" | "edit">("add");
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [linkDetail, setLinkDetail] = useState<LinkItem>({
        _id: "",
        videoTitle: "",
        videoLink: "",
        status: ""
    });

    // Fetch regular links (non-social)
    const Detail = async () => {
        setLoader(true);
        try {
            const response = await callAPI(
                apiUrls.getAllVideo,
                {},
                "GET",
                {}
            );
            setLoader(false);
            if (response?.data?.status) {
                setnonSocialData(response.data.data || []);
                getUserDetail();
            } else {
                ErrorMessage(response?.data?.message);
            }
        } catch (err: any) {
            setLoader(false);
        }
    };

    useEffect(() => {
        Detail();
    }, []);

    const handleEdit = (item: LinkItem) => {
        setLinkDetail(item);
        setOpen(true);
        setAction("edit");
    };

    const handleDelete = (item: LinkItem) => {
        setLinkDetail(item);
        setDeleteOpen(true);
    };

    const confirmDelete = async (item: LinkItem) => {
        try {
            setLoader(true);
            const res = await callAPI(
                apiUrls.deleteVideo,
                { _id: item._id },
                "DELETE",
                {}
            );
            setLoader(false);
            if (res?.data?.status) {
                SuccessMessage(res.data.message);
                setDeleteOpen(false);
                Detail();
                getUserDetail();
            } else {
                ErrorMessage(res.data.message);
            }
        } catch (err: any) {
            setLoader(false);
        }
    };

    const confirmStatus = async (item: LinkItem) => {
        try {
            setLoader(true);
            const res = await callAPI(
                apiUrls.statusVideo,
                { _id: item._id },
                "GET",
                {}
            );
            setLoader(false);
            if (res?.data?.status) {
                SuccessMessage(res.data.message);
                Detail();
                getUserDetail();
            } else {
                ErrorMessage(res.data.message);
            }
        } catch (err: any) {
            setLoader(false);
        }
    };



    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes("youtu.be")) {
                return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
            } else if (urlObj.hostname.includes("youtube.com")) {
                const videoId = urlObj.searchParams.get("v");
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } catch {
            return null;
        }
    };

    const inactive = non_socialData.filter(item => item.status === "inactive").length;
    const active = non_socialData.filter(item => item.status !== "inactive").length;

    return (
        <div className="links-page-container">
            <div className="links-page-content">
                {/* Enhanced Header Section */}
                <div className="links-header">
                    <div className="header-top">
                        <div className="header-brand">
                            <img
                                className="links-logo"
                                src="/assets/logo.png"
                                alt="BioForge Logo"
                            />
                            <div className="brand-text">
                                <h1>Video Management</h1>
                            </div>
                        </div>

                        <button
                            className="add-link-button primary-button"
                            onClick={() => {
                                setOpen(true);
                                setAction("add");
                                setLinkDetail({
                                    _id: "",
                                    videoTitle: "",
                                    videoLink: "",
                                    status: ""
                                });
                            }}
                        >
                            <FiLink2 className="button-icon" />
                            Add New Video
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-container">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FiLink2 />
                            </div>
                            <div className="stat-info">
                                <h3>{non_socialData.length}</h3>
                                <p>Total Video</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FiUsers />
                            </div>
                            <div className="stat-info">
                                <h3>{active}</h3>
                                <p>Active</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <FiBarChart />
                            </div>
                            <div className="stat-info">
                                <h3>{inactive}</h3>
                                <p>Total Inactive</p>
                            </div>
                        </div>


                    </div>
                </div>

                {loader ? (
                    <LinkShimmer />
                ) : (
                    <div className="links-sections">
                        {non_socialData.length > 0 && (
                            <div className="links-section">
                                <div className="section-header">
                                </div>
                                <div className="links-list social-links-list">
                                    {non_socialData.map((item) => {

                                        return (
                                            <div
                                                key={item._id}
                                                className={`link-item active`}
                                            >
                                                <div className="link-item-content">


                                                    <div className="link-item-details">
                                                        <div className="link-title-container">
                                                            <h3
                                                                className="link-title d-flex gap-2"
                                                            >
                                                                {item.videoTitle}
                                                                <span
                                                                    className={`link-status ${item.status}`}
                                                                >
                                                                    {item.status}
                                                                </span>
                                                            </h3>

                                                        </div>


                                                        <div className="link-stats">


                                                        </div>
                                                    </div>

                                                    <div className="link-item-actions">
                                                        <button
                                                            className="action-button view-button"
                                                            onClick={() =>
                                                                window.open(item.videoLink, "_blank")
                                                            }
                                                            title="View Link"
                                                        >
                                                            <AiOutlineEye />
                                                        </button>
                                                        <button
                                                            className="action-button status-button"
                                                            onClick={() => confirmStatus(item)}
                                                            title="Toggle Status"
                                                        >
                                                            <TbStatusChange />
                                                        </button>
                                                        <button
                                                            className="action-button edit-button"
                                                            onClick={() => handleEdit(item)}
                                                            title="Edit Link"
                                                        >
                                                            <MdOutlineEdit />
                                                        </button>
                                                        <button
                                                            className="action-button delete-button"
                                                            onClick={() => handleDelete(item)}
                                                            title="Delete Link"
                                                        >
                                                            <MdDeleteOutline />
                                                        </button>
                                                    </div>

                                                </div>
                                                {getYouTubeEmbedUrl(item.videoLink) ? (
                                                    <iframe
                                                        width="250"
                                                        height="150"
                                                        src={getYouTubeEmbedUrl(item.videoLink) || ""}
                                                        title={item.videoTitle}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                ) : (
                                                    <p className="link-url">{item.videoLink}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {non_socialData.length === 0 &&
                            non_socialData.length === 0 &&
                            !loader && (
                                <div className="no-links">
                                    <div className="no-links-content">
                                        <div className="empty-state-icon">
                                            <FiLink2 />
                                        </div>
                                        <h3>No Links Added Yet</h3>
                                        <p>
                                            Add your first link to get started with your BioForge
                                            profile and start building your digital presence.
                                        </p>
                                        <button
                                            className="add-link-button primary-button"
                                            onClick={() => {
                                                setOpen(true);
                                                setAction("add");
                                                setLinkDetail({
                                                    _id: "",
                                                    videoLink: "",
                                                    videoTitle: "",
                                                    status: ""
                                                });
                                            }}
                                        >
                                            <FiLink2 className="button-icon" />
                                            Add Your First Link
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>
                )}
            </div>

            <Delete
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                confirmDetail={() => confirmDelete(linkDetail)}
                linkDetail={linkDetail}
            />

          
            <VideoAddEdit
              NonDetail={Detail} 
                open={open}
                onClose={() => setOpen(false)}
                Detail={Detail}
                linkDetail={linkDetail}
                action={action}
            />

        </div>
    );
};

export default Index;