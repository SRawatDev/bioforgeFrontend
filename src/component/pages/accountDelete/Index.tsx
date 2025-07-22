import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import InputField from "../../form/InputField";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
import { FaLowVision, FaEye, FaTrashAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdWarning } from "react-icons/md";
import "./deleteAccount.css";

interface changepasswordInterface {
  password: string;
}

const Index = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
  });
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const navigate = useNavigate();
  const [changepasswordData, setchangepasswordData] =
    useState<changepasswordInterface>({ password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setchangepasswordData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!confirmDelete) {
      ErrorMessage("Please confirm that you want to delete your account");
      return;
    }

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
      ErrorMessage(err.message || "Something went wrong");
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <LoadScreen />}
      <div className="auth-container">
        {/* Back button */}
        <Link 
          to={`/dashboard/index/${localStorage.getItem("_id")}`}
          className="back-button"
        >
          <IoMdArrowRoundBack />
        </Link>

        <div className="auth-content">
          {/* Left side - Form */}
          <div className="auth-form-container">
            <div className="auth-form-wrapper">
              {/* Logo */}
              <div className="auth-logo">
                {/* <img src="/assets/logo12.png" alt="BioForge Logo" /> */}
              </div>

              {/* Header */}
              <div className="auth-header">
                <div className="delete-icon">
                  <FaTrashAlt />
                </div>
                <h1>Delete Account</h1>
                <p className="auth-subtitle">
                  This action cannot be undone. Please enter your password to confirm.
                </p>
              </div>

              {/* Warning Alert */}
              <div className="warning-alert">
                <MdWarning className="warning-icon" />
                <div className="warning-content">
                  <h4>Warning!</h4>
                  <p>
                    Deleting your account will permanently remove all your data, 
                    including your profile, links, and analytics. This action cannot be reversed.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <div className="input-wrapper">
                    <InputField
                      label="Enter your password to confirm"
                      name="password"
                      value={changepasswordData.password}
                      onChange={handleChange}
                      required
                      type={showPassword.password ? "text" : "password"}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    >
                      {showPassword.password ? <FaEye /> : <FaLowVision />}
                    </button>
                  </div>
                </div>

                {/* Confirmation checkbox */}
                <div className="form-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={confirmDelete}
                      onChange={(e) => setConfirmDelete(e.target.checked)}
                      required
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">
                      I understand that this action is permanent and cannot be undone
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button 
                  type="submit" 
                  className="auth-button delete-button"
                  disabled={!confirmDelete || !changepasswordData.password}
                >
                  <FaTrashAlt />
                  Delete My Account Permanently
                </button>
              </form>

              {/* Footer links */}
              <div className="auth-footer">
                <p>
                  Changed your mind?{" "}
                  <Link to={`/dashboard/index/${localStorage.getItem("_id")}`}>
                    Go back to dashboard
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="auth-image-container">
            <div className="auth-image-overlay">
              <h2>We're sorry to see you go</h2>
              <p>
                Your digital identity deserves a home. Consider updating your 
                profile instead of deleting it entirely.
              </p>
            </div>
            <img
              src="/assets/logo12.png"
              alt="Background"
              className="auth-background-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
