import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import LoadScreen from "../../loaderScreen";
interface changepasswordInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Index = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();
  const [changepasswordData, setchangepasswordData] = useState<changepasswordInterface>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setchangepasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (changepasswordData.newPassword !== changepasswordData.confirmPassword) {
      ErrorMessage("New Password and Confirm Password do not match");
      return;
    }
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.changePassword,
        {},
        "POST",
        {
          oldPassword: changepasswordData.oldPassword,
          newPassword: changepasswordData.newPassword
        }
      );
      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        navigate(`/dashboard/index/${localStorage.getItem("_id")}`);
        SuccessMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(false);
    }
  };
  return (
    <>
      {loader && <LoadScreen />}
      <div className="cp-page">
      {loader && (
        <div className="cp-loader-overlay">
          <div className="cp-loader-spinner"></div>
        </div>
      )}

      <div className="cp-header">
        <h1>Change Password</h1>
      </div>

      <div className="cp-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">
                Current Password <span className="text-danger">*</span>
              </label>
              <div className="cp-input-wrapper">
                <input
                  name="oldPassword"
                  value={changepasswordData.oldPassword}
                  onChange={handleChange}
                  required
                  type={showPassword.oldPassword ? "text" : "password"}
                  placeholder="Enter Current Password"
                  className="cp-input"
                />
                <span
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      oldPassword: !prev.oldPassword,
                    }))
                  }
                  className="cp-toggle-password"
                >
                  {showPassword.oldPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                New Password <span className="text-danger">*</span>
              </label>
              <div className="cp-input-wrapper">
                <input
                  name="newPassword"
                  value={changepasswordData.newPassword}
                  onChange={handleChange}
                  required
                  type={showPassword.newPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  className="cp-input"
                />
                <span
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      newPassword: !prev.newPassword,
                    }))
                  }
                  className="cp-toggle-password"
                >
                  {showPassword.newPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="cp-input-wrapper">
                <input
                  name="confirmPassword"
                  value={changepasswordData.confirmPassword}
                  onChange={handleChange}
                  required
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  className="cp-input"
                />
                <span
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                  className="cp-toggle-password"
                >
                  {showPassword.confirmPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="cp-form-actions">
            <button
              type="button"
              className="cp-cancel"
              onClick={() => {
                setchangepasswordData({
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                navigate(`/dashboard/index/${localStorage.getItem("_id")}`);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="cp-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Index;