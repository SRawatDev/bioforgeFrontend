import { useNavigate, useParams } from "react-router-dom";
import "./dashboard.css";
import DashboardSidebar from "./DashboardSidebar";
import Main from "./Main";
import { MobileUi } from "./MobileUi";
import ManageLinks from "../links/Index";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import { useEffect, useState } from "react";
import ErrorMessage from "../../../helpers/ErrorMessage";
import ProfileShimmer from "../../ProfileShimmer";

interface Theme {
  fontFamily: string;
  is_colorImage: string;
  fontColor: string;
}

interface Link {
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  is_index: number;
  _id: string;
}

interface UserInfo {
  _id: string;
  username: string;
  email: string;
  social: Link[];
  non_social: Link[];
  bio: string;
  banner_img: string;
  profile_img: string;
  theme: Theme;
}

const Index = () => {
  const { layout, id } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();

  const getUserDetail = async () => {
    if (!id) return;
    setLoader(true);
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getUserInfo,
        { _id: id },
        "GET",
        {}
      );
      setLoader(false);
      if (!response?.data?.status) {
        navigate("/");
        ErrorMessage(response?.data?.data?.message || "Invalid user");
      } else {
        setUserInfo(response?.data?.data[0]);
      }
    } catch (err: any) {
      setLoader(false);
      ErrorMessage(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [id]);

  return (
    <div className="d-flex">
      <DashboardSidebar />
      {layout === "profile" ? (
        <Main getUserDetails={getUserDetail} />
      ) : (
        <ManageLinks getUserDetail={getUserDetail} />
      )}

      {loader ? (
        <section
          id="phone-preview-container"
          aria-label="Mobile preview of Linktree"
        >
          <div className="profile-container">
            <ProfileShimmer />
          </div>
        </section>
      ) : (
        <MobileUi userInfo={userInfo} />
      )}
    </div>
  );
};

export default Index;
