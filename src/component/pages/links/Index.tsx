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
import { Link as RouterLink } from "react-router-dom";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { socialPlatforms } from "./linksAddEdit";
import LinkShimmer from "../../LinkShimmer";
import NodataFound from "../../NodataFound";
import UserInfo from "./UserInfo";

interface LinkItem {
  _id: string;
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  status: string;
  type: string;
  clickCount?: number;
  clicks?: [clicks];
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

const Index: React.FC = () => {
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
    linkUrl: "",
    linkLogo: "",
    status: "",
    type: "",
  });

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
      } else {
        ErrorMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(true);
      ErrorMessage(err.message || "Something went wrong");
    }
  };
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
      } else {
        ErrorMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(true);
      ErrorMessage(err.message || "Something went wrong");
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
        NonDetail();
      } else {
        ErrorMessage(res.data.message);
      }
    } catch (err: any) {
      setLoader(true);
      ErrorMessage(err.message || "Delete failed");
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
      } else {
        ErrorMessage(res.data.message);
      }
    } catch (err: any) {
      setLoader(true);
      ErrorMessage(err.message || "Status update failed");
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
      await Detail();
      SuccessMessage("Link order updated");
    } catch (err: any) {
      ErrorMessage(err.message || "Failed to update order");
    } finally {
      setLoader(false);
    }
  };
  const handleUserInfo = (clickList: clicks[] = []) => {
    setUserInfo(clickList);
    setopenuserInfo(true);
  };

  return (
    <>
      <main id="main-content" className="d-flex flex-column" style={{fontFamily:"&quot;Playfair Display&quot"}}>
        <div className="linksHeader">
          <img src="/src/assets/logo.png" alt="Logo" height={50} />
          <button
            className="editbutton"
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
              });
            }}
          >
            Add Links
          </button>
        </div>
        {non_socialData.length == 0 && <NodataFound />}
        {loader ? (
          <LinkShimmer />
        ) : (
          <>
            <div className="links-container">
              {linksInfo.length > 0 && (
                <h5
                  style={{
                    marginTop: "20px",
                    padding: "8px",
                  }}
                >
                  Non Social Links
                </h5>
              )}
              <div className="links-grid">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="links-list">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {linksInfo.length > 0 &&
                          linksInfo.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="link-card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <img
                                      src={
                                        defaultConfig.imagePath + item.linkLogo
                                      }
                                      alt={item.linkTitle}
                                      className="link-logo"
                                    />

                                    <div className="link-info">
                                      <p
                                        className="link-title"
                                        onClick={() =>
                                          handleUserInfo(item?.clicks)
                                        }
                                        style={{
                                          color: `${item.status === "active"
                                            ? "#07bc0c"
                                            : "red"
                                            }`,
                                        }}
                                      >
                                        {item.linkTitle}(
                                        {item.clickCount ? item.clickCount : 0})
                                      </p>
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
                                              onClick={() =>
                                                confirmStatus(item)
                                              }
                                            >
                                              <TbStatusChange /> {item.status}
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              className="dropdown-item d-flex align-items-center gap-2"
                                              onClick={() => handleEdit(item)}
                                            >
                                              <MdOutlineEdit /> Edit
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              className="dropdown-item d-flex align-items-center gap-2 text-danger"
                                              onClick={() => handleDelete(item)}
                                            >
                                              <MdDeleteOutline /> Delete
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </>
        )}

        {loader ? (
          <LinkShimmer />
        ) : (
          <>
            <div className="links-container">
              {non_socialData.length > 0 && (
                <h5
                  style={{
                    marginTop: "20px",
                    padding: "8px",
                  }}
                >
                  Social Links
                </h5>
              )}
              <div className="links-grid">
                {non_socialData.length > 0 &&
                  non_socialData?.map((item) => {
                    const matchedPlatform = socialPlatforms.find(
                      (platform) =>
                        platform.label.toLowerCase() ===
                        item.linkTitle.toLowerCase()
                    );
                    return (
                      <div className="link-card">
                        {matchedPlatform && item.type == "social" ? (
                          <span className="social-icon">
                            {matchedPlatform.icon}
                          </span>
                        ) : (
                          <img
                            src={defaultConfig.imagePath + item.linkLogo}
                            alt={item.linkTitle}
                            className="link-logo"
                          />
                        )}

                        <div className="link-info">
                          <p
                            className="link-title"
                            style={{
                              color: `${item.status === "active" ? "#07bc0c" : "red"
                                }`,
                            }}
                            onClick={() => handleUserInfo(item?.clicks)}
                          >
                            {item.linkTitle}(
                            {item.clickCount ? item.clickCount : 0})
                          </p>
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
                                  onClick={() => confirmStatus(item)}
                                >
                                  <TbStatusChange /> {item.status}
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item d-flex align-items-center gap-2"
                                  onClick={() => handleEdit(item)}
                                >
                                  <MdOutlineEdit /> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item d-flex align-items-center gap-2 text-danger"
                                  onClick={() => handleDelete(item)}
                                >
                                  <MdDeleteOutline /> Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}

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
      </main>
    </>
  );
};

export default Index;
