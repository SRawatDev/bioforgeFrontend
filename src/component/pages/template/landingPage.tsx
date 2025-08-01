import { useEffect, useState } from "react";
import Card from "./Card";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { ThemeShimmer } from "../../LinkShimmer";
import { Footer } from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";

export interface ThemeData {
  _id?: string;
  themeName: string;
  themeImg: string;
  themeDiscription: string;
  isloginCheck?: () => void;
}

const LandingPage = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("_id");
  const [loader, setLoader] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeData[]>([]);
  const navigate = useNavigate();
  const isloginCheck = () => {
    if (isLoggedIn) {
      navigate(`/dashboard/updateProfile/${userId}`);
    } else {
      navigate("/register");
    }
  };

  const getheme = async () => {
    setLoader(true);
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getAlltheme,
        {},
        "GET",
        {}
      );
      setLoader(false);
      if (response?.data?.status) {
        setTheme(response.data.data || []);
      } else {
        ErrorMessage(response?.data?.message || "Failed to fetch users");
      }
    } catch (error) {
      setLoader(true);
    }
  };
  useEffect(() => {
    getheme();
  }, []);

  return (
    <>
      <div className="landing-page">
        <section className="gallery-section">
          <div className="section-header">
            <h2 className="section-title">Choose themes</h2>
            <p className="section-subtitle">
              Click preview to explore each landscape in detail
            </p>
          </div>

          <div className="cards-grid">
            {loader ? (
              <ThemeShimmer />
            ) : (
              theme.map((card, index) => (
                <div onClick={isloginCheck}>
                <Card
                  key={card._id}
                  themeName={card.themeName}
                  themeImg={card.themeImg}
                  themeDiscription={card.themeDiscription}
                  isloginCheck={isloginCheck}
                  
                  />
                  </div>
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
