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
interface RegisterInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [register, setRegister] = useState<RegisterInterface>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(register.confirmPassword!==register.password) {
      ErrorMessage("Confirm password and password should be same")
      return 
    }
    setLoader(true);
    try {
      const { confirmPassword, ...registerData } = register;
      const response = await callAPIWithoutAuth(
        apiUrls.register,
        {},
        "POST",
        registerData
      );

      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message || "Registration failed");
      } else {
        setRegister({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        SuccessMessage(
          response?.data?.message ||
          "Account created successfully! Please sign in."
        );
        navigate("/login");
      }
    } catch (err: any) {
      setLoader(true);
    }
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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

              <p className="register-subtitle">
                Create your account to get started
              </p>

              <form onSubmit={handleSubmit} className="register-form">
                <div className="register-input-wrapper">
                  <input
                    type="text"
                    name="username"
                    value={register.username}
                    onChange={handleChange}
                    className={`register-input ${formErrors.username ? "error" : ""
                      }`}
                    placeholder=" "
                    id="username"
                    required
                  />
                  <label htmlFor="username" className="register-label">
                    Username
                  </label>
                </div>
                <div className="register-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={register.email}
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
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    value={register.password}
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
                    onClick={() => togglePasswordVisibility("password")}
                    className="password-toggle"
                    aria-label={
                      showPassword.password ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="register-input-wrapper">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={register.confirmPassword}
                    onChange={handleChange}
                    className={`register-input ${formErrors.confirmPassword ? "error" : ""
                      }`}
                    placeholder=" "
                    id="confirmPassword"
                      required
                  />
                  <label htmlFor="confirmPassword" className="register-label">
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="password-toggle"
                    aria-label={
                      showPassword.confirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                  <Formbutton text={"Create Account"} />
                </div>

                <div className="register-signin-section">
                  <div className="signin-text-wrapper">
                    <p className="signin-text">Already have an account?</p>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="register-btn-outline"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Gradient Background with Content */}
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

export default Register;
