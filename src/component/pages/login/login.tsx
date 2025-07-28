import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./login.css";

interface LoginInterface {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    
    if (!loginData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!loginData.password) {
      errors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    
    if (!validateForm()) {
      return;
    }
    
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
  
        SuccessMessage(response.data.message || "Welcome back to BioForge!");
        
        if (userData.type === "user") {
          navigate(`/dashboard/index/${userData.id}`,{replace: true});
        } else {
          navigate("/admin/DashBoard");
        }
      }
    } catch (err: any) {
      setLoader(true);
    
    }
  };

  return (
    <>
      {loader && <LoadScreen />}
      
      <div className="signin-container gradient-form">
        {/* Back Button */}
        <Link 
          to="/" 
          className="back-button-signin"
          aria-label="Go back to home"
        >
          <IoMdArrowRoundBack className="back-icon" />
          <span className="back-button-signin-text">Back to home</span>
        </Link>

        <div className="signin-row">
          {/* Left Column - Login Form */}
          <div className="signin-col-left">
            <div className="signin-form-wrapper">
              {/* Logo and Header */}
              <div className="signin-header">
                <img 
                  src="/assets/logo12.png"
                  className="signin-logo" 
                  alt="BioForge Logo" 
                />
                <h4 className="signin-title">We are The BioForge Team</h4>
              </div>

              <p className="signin-subtitle">Please login to your account</p>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="signin-form">
                {/* Email Input */}
                <div className="signin-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className={`signin-input ${formErrors.email ? 'error' : ''}`}
                    placeholder=" "
                    id="email"
                  />
                  <label htmlFor="email" className="signin-label">Email address</label>
                  {formErrors.email && (
                    <div className="signin-error">{formErrors.email}</div>
                  )}
                </div>

                {/* Password Input */}
                <div className="signin-input-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    className={`signin-input ${formErrors.password ? 'error' : ''}`}
                    placeholder=" "
                    id="password"
                  />
                  <label htmlFor="password" className="signin-label">Password</label>
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="password-toggle"
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formErrors.password && (
                    <div className="signin-error">{formErrors.password}</div>
                  )}
                </div>

                {/* Sign In Button and Forgot Password */}
                <div className="signin-actions">
                  <button
                    type="submit"
                    disabled={loader}
                    className="signin-btn-primary gradient-custom-2"
                  >
                    {loader ? (
                      <div className="signin-loading">
                        <div className="spinner"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot password?
                  </Link>
                </div>

                {/* Sign Up Section */}
                <div className="signin-signup-section">
                  <div className="signup-text-wrapper">
                    <p className="signup-text">Don't have an account?</p>
                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="signin-btn-outline"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Gradient Background with Content */}
          <div className="signin-col-right">
            <div className="signin-right-content gradient-custom-2">
              <div className="signin-right-text">
                <h4 className="right-title">We are more than just a platform</h4>
                <p className="right-description">
                  BioForge empowers creators, professionals, and brands to craft beautiful, 
                  personalized bio pages that showcase their digital identity. Join thousands 
                  of users who trust us to manage their online presence with style and simplicity.
                </p>
                
                {/* Feature highlights */}
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-dot"></div>
                    <span>Beautiful, customizable templates</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-dot"></div>
                    <span>Easy link management</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-dot"></div>
                    <span>Analytics and insights</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-dot"></div>
                    <span>Mobile-first design</span>
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

export default Login;
