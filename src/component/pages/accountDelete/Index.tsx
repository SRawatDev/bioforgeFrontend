import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
import { FaLowVision, FaEye } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import Formbutton from "../../form/Formbutton";
interface changepasswordInterface {
  password: string;
}
const Index = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
  });
  const navigate = useNavigate();
  const [changepasswordData, setchangepasswordData] =
    useState<changepasswordInterface>({ password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setchangepasswordData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.accountDelete,
        {},
        "POST",
        changepasswordData
      );
      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        navigate(`/`);
        localStorage.clear();
        SuccessMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(true);
    }
  };

  return (
    <>
      {loader && <LoadScreen />}
      <div className="register-container gradient-form">
      <Link
               to= {`/dashboard/index/${localStorage.getItem("_id")}`}
               className="back-button-register"
               aria-label="Go back to login"
             >
          <IoMdArrowRoundBack className="back-icon" />
        </Link>

        <div className="register-row">
          <div className="register-col-left">
            <div className="register-form-wrapper">
              <div className="register-header">
                <img
                  src="/assets/logo12.png"
                  className="register-logo"
                  alt="BioForge Logo"
                />
                <h4 className="register-title">Delete You Bioforge Account</h4>
              </div>
              <form onSubmit={handleSubmit} className="register-form">
                
                <div className="register-input-wrapper">
                  <input
                    name="password"
                    value={changepasswordData.password}
                    onChange={handleChange}
                    required
                    type={showPassword.password ? "text" : "password"}
                    placeholder=""
                    className={`register-input`}
                    id="password"
                  
                  />
                  <label htmlFor="password" className="register-label">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    className="password-toggle"
                  >
                   {showPassword.password ? <FaEye /> : <FaLowVision />}
                  </button>
                </div>

           
                <div className="register-actions">
                  <Formbutton text={"Submit"} />
                </div>

                <div className="register-signin-section">
                  <div className="signin-text-wrapper">
                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/index/${localStorage.getItem("_id")}`)}
                      className="register-btn-outline"
                    >
                     Back to DashBoard
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="register-col-right">
            <div className="register-right-content gradient-custom-2">
              <div className="register-right-text">
                <h4 className="right-title">Start Your Digital Journey</h4>
                <p className="right-description">
                  Join thousands of creators, professionals, and brands who use
                  BioForge to craft beautiful, personalized bio pages. Showcase
                  your digital identity with style and connect with your
                  audience like never before.
                </p>

                <div className="benefits-list">
                  <div className="benefit-item">
                    <div className="benefit-number">1</div>
                    <div className="benefit-content">
                      <h5>Choose Your Template</h5>
                      <p>
                        Select from our collection of beautiful, mobile-first
                        templates
                      </p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-number">2</div>
                    <div className="benefit-content">
                      <h5>Customize Your Page</h5>
                      <p>
                        Add your links, customize colors, and make it uniquely
                        yours
                      </p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-number">3</div>
                    <div className="benefit-content">
                      <h5>Share & Grow</h5>
                      <p>
                        Get your unique link and start building your digital
                        presence
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="stats-section">
                  <div className="stat-item">
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Active Users</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Templates</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">99.9%</div>
                    <div className="stat-label">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
