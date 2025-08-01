import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import Formbutton from "../../form/Formbutton";
interface LoginInterface {
  email: string;
  password: string;
}

const Index: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginInterface>({
    email: "",
    password: "",
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    setLoader(true);
    try {
      const response = await callAPIWithoutAuth(apiUrls.login, {}, "POST", loginData);
      setLoader(false);

      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message || "Login failed");
      } else {
        const userData = response.data.data;
        localStorage.setItem("_id", userData.id);
        localStorage.setItem("accessToken", userData.token);
        localStorage.setItem("type", userData.type);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("profile_img", userData.profile_img || "");
        if (userData.type === "user") {
          navigate(`/dashboard/index/${userData.id}`, { replace: true });
        } else {
          navigate("/admin/DashBoard");
        }
        SuccessMessage(response.data.message);
      }
    } catch (err: any) {
      setLoader(true);

    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      {loader && <LoadScreen />}

      <div className="register-container gradient-form">
        <Link
          to="/"
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
                  src="/assets/logo.png"
                  className="register-logo"
                  alt="BioForge Logo"
                />
                <h4 className="register-title">Join The BioForge Community</h4>
              </div>
              <form onSubmit={handleSubmit} className="register-form">

                <div className="register-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className={`register-input ${formErrors.email ? "error" : ""
                      }`}
                    placeholder=" "
                    id="email"
                    required
                  />
                  <label htmlFor="email" className="register-label">
                    Email address
                  </label>
                </div>

                <div className="register-input-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    className={`register-input ${formErrors.password ? "error" : ""
                      }`}
                    placeholder=" "
                    id="password"
                    required

                  />
                  <label htmlFor="password" className="register-label">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="terms-section">
                  <p className="terms-text">
                    By creating an account, you agree to our{" "}
                    <Link to="/terms" className="terms-link">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="terms-link">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                <div className="register-actions">
                  <Formbutton text={"Login"} />
                </div>

                <div className="register-signin-section">
                  <div className="signin-text-wrapper">
                    <p className="signin-text">Don't have an account?</p>
                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="register-btn-outline"
                    >
                      Create Account
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

                {/* Benefits list */}
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
