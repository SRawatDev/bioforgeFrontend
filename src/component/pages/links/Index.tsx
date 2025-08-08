import React, { useEffect, useState } from "react";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import SuccessMessage from "../../../helpers/Success";
import { apiUrls } from "../../../utils/api.utils";
import { defaultConfig } from "../../../config";
import { LinksAddEdit } from "./linksAddEdit";
import Delete from "./Delete";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { FiLink2, FiUsers, FiBarChart } from "react-icons/fi";
import { socialPlatforms } from "./linksAddEdit";
import LinkShimmer from "../../LinkShimmer";
import UserInfo from "./UserInfo";
import './links.css'
interface LinkItem {
  _id: string;
  linkTitle: string;
  linkUrl: string;
  videoId:string,
  linkLogo: string;
  status: string;
  type: string;
  protectedLinks?: string;
  clickCount?: number;
  clicks?: clicks[];
}

interface getuser {
  username?: string;
  count?: number;
}

export interface clicks {
  userInfo: getuser;
  ipAddress: string;
  count: string;
}

interface Props {
  getUserDetail: () => void;
}

const Index: React.FC<Props> = ({ getUserDetail }) => {
  const [openuserInfo, setopenuserInfo] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<clicks[]>([]);
  const [non_socialData, setnonSocialData] = useState<LinkItem[]>([]);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [linksInfo, setLinksInfo] = useState<LinkItem[]>([]);
  const [loader, setLoader] = useState(false);
  const [linkDetail, setLinkDetail] = useState<LinkItem>({
    _id: "",
    linkTitle: "",
    videoId:"",
    linkUrl: "",
    linkLogo: "",
    status: "",
    type: "",
  });

  // Fetch regular links (non-social)
  const Detail = async () => {
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.getlinks,
        { type: "non_social" },
        "GET",
        {}
      );
      setLoader(false);
      if (response?.data?.status) {
        setLinksInfo(response.data.data || []);
        getUserDetail();
      } else {
        ErrorMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(false);
      ErrorMessage("Failed to fetch links");
    }
  };

  // Fetch social media links
  const NonDetail = async () => {
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.getlinks,
        { type: "social" },
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
      ErrorMessage("Failed to fetch social links");
    }
  };

  useEffect(() => {
    Detail();
    NonDetail();
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
        apiUrls.linkdelete,
        { _id: item._id },
        "POST",
        {}
      );
      setLoader(false);
      if (res?.data?.status) {
        SuccessMessage(res.data.message);
        setDeleteOpen(false);
        Detail();
        getUserDetail();
        NonDetail();
      } else {
        ErrorMessage(res.data.message);
      }
    } catch (err: any) {
      setLoader(false);
      ErrorMessage("Failed to delete link");
    }
  };

  const confirmStatus = async (item: LinkItem) => {
    try {
      setLoader(true);
      const res = await callAPI(
        apiUrls.linkupdateStatus,
        { _id: item._id },
        "GET",
        {}
      );
      setLoader(false);
      if (res?.data?.status) {
        SuccessMessage(res.data.message);
        Detail();
        NonDetail();
        getUserDetail();
      } else {
        ErrorMessage(res.data.message);
      }
    } catch (err: any) {
      setLoader(false);
      ErrorMessage("Failed to update status");
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    
    const reordered = Array.from(linksInfo);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setLinksInfo(reordered);
    
    const updatedOrder = reordered.map((item, index) => ({
      _id: item._id,
      is_index: index,
    }));
    
    try {
      setLoader(true);
      await callAPI(apiUrls.updateindex, {}, "POST", { items: updatedOrder });
      setLoader(false);
      await Detail();
      getUserDetail();
      SuccessMessage("Link order updated");
    } catch (err: any) {
      setLoader(false);
      ErrorMessage(err.message || "Failed to update order");
    }
  };

  const handleUserInfo = (clickList: clicks[] = []) => {
    setUserInfo(clickList);
    setopenuserInfo(true);
  };

  const totalLinks = linksInfo.length + non_socialData.length;
  const totalClicks = [...linksInfo, ...non_socialData].reduce(
    (sum, item) => sum + (item.clickCount || 0),
    0
  );
  const activeLinks = [...linksInfo, ...non_socialData].filter(
    (item) => item.status === "active"
  ).length;

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
                <h1>Link Management</h1>
                <p>Organize and customize your digital presence</p>
              </div>
            </div>
            
            <button
              className="add-link-button primary-button"
              onClick={() => {
                setOpen(true);
                setAction("add");
                setLinkDetail({
                  _id: "",
                  linkTitle: "",
                  linkUrl: "",
                    videoId:"",
                  linkLogo: "",
                  status: "",
                  type: "",
                });
              }}
            >
              <FiLink2 className="button-icon" />
              Add New Link
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">
                <FiLink2 />
              </div>
              <div className="stat-info">
                <h3>{totalLinks}</h3>
                <p>Total Links</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiBarChart />
              </div>
              <div className="stat-info">
                <h3>{totalClicks}</h3>
                <p>Total Clicks</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiUsers />
              </div>
              <div className="stat-info">
                <h3>{activeLinks}</h3>
                <p>Active Links</p>
              </div>
            </div>
          </div>
        </div>

        {loader ? (
          <LinkShimmer />
        ) : (
          <div className="links-sections">
            {/* Regular Links Section */}
            {linksInfo.length > 0 && (
              <div className="links-section">
                <div className="section-header">
                  <div className="section-title">
                    <h2>Regular Links</h2>
                    <span className="links-count">{linksInfo.length}</span>
                  </div>
                  <p>Drag to reorder your links</p>
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="links-list">
                    {(provided) => (
                      <div
                        className="links-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {linksInfo.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={`link-item ${
                                  item.status !== "active" ? "inactive" : ""
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="link-item-content">
                                  <div className="link-item-icon">
                                    <img
                                      src={
                                        defaultConfig.imagePath + item.linkLogo
                                      }
                                      alt={item.linkTitle}
                                    />
                                  </div>

                                  <div className="link-item-details">
                                    <div className="link-title-container">
                                      <h3
                                        onClick={() =>
                                          handleUserInfo(item?.clicks)
                                        }
                                        className="link-title"
                                      >
                                        {item.linkTitle}
                                      </h3>
                                      <span
                                        className={`privacy-badge ${
                                          item.protectedLinks === "private"
                                            ? "private-badge"
                                            : "public-badge"
                                        }`}
                                      >
                                        {item.protectedLinks || "public"}
                                      </span>
                                    </div>
                                    <p className="link-url">{item.linkUrl}</p>
                                    <div className="link-stats">
                                      <span className="link-clicks">
                                        {item.clickCount || 0} clicks
                                      </span>
                                      <span
                                        className={`link-status ${item.status}`}
                                      >
                                        {item.status}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="link-item-actions">
                                    <button
                                      className="action-button view-button"
                                      onClick={() =>
                                        window.open(item.linkUrl, "_blank")
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
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}

            {/* Social Media Links Section */}
            {non_socialData.length > 0 && (
              <div className="links-section">
                <div className="section-header">
                  <div className="section-title">
                    <h2>Social Media Links</h2>
                    <span className="links-count">{non_socialData.length}</span>
                  </div>
                  <p>Connect your social profiles</p>
                </div>
                <div className="links-list social-links-list">
                  {non_socialData.map((item) => {
                    const matchedPlatform = socialPlatforms.find(
                      (platform) =>
                        platform.label.toLowerCase() ===
                        item.linkTitle.toLowerCase()
                    );
                    return (
                      <div
                        key={item._id}
                        className={`link-item ${
                          item.status !== "active" ? "inactive" : ""
                        }`}
                      >
                        <div className="link-item-content">
                          <div className="link-item-icon social-icon">
                            {matchedPlatform && item.type === "social" ? (
                              matchedPlatform.icon
                            ) : (
                              <img
                                src={defaultConfig.imagePath + item.linkLogo}
                                alt={item.linkTitle}
                              />
                            )}
                          </div>

                          <div className="link-item-details">
                            <div className="link-title-container">
                              <h3
                                onClick={() => handleUserInfo(item?.clicks)}
                                className="link-title"
                              >
                                {item.linkTitle}
                              </h3>
                              <span
                                className={`privacy-badge ${
                                  item.protectedLinks === "private"
                                    ? "private-badge"
                                    : "public-badge"
                                }`}
                              >
                                {item.protectedLinks || "public"}
                              </span>
                            </div>
                            <p className="link-url">{item.linkUrl}</p>
                            <div className="link-stats">
                              <span className="link-clicks">
                                {item.clickCount || 0} clicks
                              </span>
                              <span className={`link-status ${item.status}`}>
                                {item.status}
                              </span>
                            </div>
                          </div>

                          <div className="link-item-actions">
                            <button
                              className="action-button view-button"
                              onClick={() =>
                                window.open(item.linkUrl, "_blank")
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
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {linksInfo.length === 0 &&
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
                          linkTitle: "",
                          linkUrl: "",
                          linkLogo: "",
                          status: "",
                          type: "",
                            videoId:"",
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

      {/* Modals */}
      <UserInfo
        userInfo={userInfo}
        visible={openuserInfo}
        onClose={() => setopenuserInfo(false)}
      />

      <Delete
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        confirmDetail={() => confirmDelete(linkDetail)}
        linkDetail={linkDetail}
      />

      <LinksAddEdit
        NonDetail={NonDetail}
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