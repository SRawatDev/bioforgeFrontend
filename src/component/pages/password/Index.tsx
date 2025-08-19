import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
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

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    general: ""
  });

  // Check if any field has content to show Cancel button
  const hasContent = changepasswordData.oldPassword || changepasswordData.newPassword || changepasswordData.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setchangepasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
        general: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      general: ""
    };

    if (!changepasswordData.oldPassword.trim()) {
      newErrors.oldPassword = "Current password is required";
    }

    if (!changepasswordData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (changepasswordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    if (!changepasswordData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (changepasswordData.newPassword !== changepasswordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (changepasswordData.oldPassword === changepasswordData.newPassword && changepasswordData.oldPassword) {
      newErrors.general = "New password must be different from current password";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoader(true);
    setErrors({ oldPassword: "", newPassword: "", confirmPassword: "", general: "" });

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
      ErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleCancel = () => {
    setchangepasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      general: ""
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '0',
      margin: '0',
      width: '100%',
    }}>
      {loader && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      )}

      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e9ecef',
        padding: '24px 40px',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#212529',
          margin: 0
        }}>
          Change Password
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        padding: '0 40px',
        // maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <form onSubmit={handleSubmit}>
          {/* General Error Message */}
          {errors.general && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '12px 16px',
              border: '1px solid #f5c6cb',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {errors.general}
            </div>
          )}

          {/* Three Password Fields in Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '30px',
            marginBottom: '2px'
          }}>
            {/* Current Password Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#212529',
                marginBottom: '8px'
              }}>
                Current Password <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  name="oldPassword"
                  value={changepasswordData.oldPassword}
                  onChange={handleChange}
                  required
                  type={showPassword.oldPassword ? "text" : "password"}
                  placeholder="Enter Current Password"
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    fontSize: '14px',
                    border: `1px solid ${errors.oldPassword ? '#dc3545' : '#ced4da'}`,
                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease-in-out',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    color: '#495057'
                  }}
                  onFocus={(e) => {
                    if (!errors.oldPassword) {
                      e.target.style.borderColor = '#80bdff';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.oldPassword) {
                      e.target.style.borderColor = '#ced4da';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      oldPassword: !prev.oldPassword,
                    }))
                  }
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6c757d',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword.oldPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </button>
              </div>
              {errors.oldPassword && (
                <div style={{
                  color: '#dc3545',
                  fontSize: '12px',
                  marginTop: '4px'
                }}>
                  {errors.oldPassword}
                </div>
              )}
            </div>

            {/* New Password Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#212529',
                marginBottom: '8px'
              }}>
                New Password <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  name="newPassword"
                  value={changepasswordData.newPassword}
                  onChange={handleChange}
                  required
                  type={showPassword.newPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    fontSize: '14px',
                    border: `1px solid ${errors.newPassword ? '#dc3545' : '#ced4da'}`,
                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease-in-out',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    color: '#495057'
                  }}
                  onFocus={(e) => {
                    if (!errors.newPassword) {
                      e.target.style.borderColor = '#80bdff';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.newPassword) {
                      e.target.style.borderColor = '#ced4da';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      newPassword: !prev.newPassword,
                    }))
                  }
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6c757d',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword.newPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <div style={{
                  color: '#dc3545',
                  fontSize: '12px',
                  marginTop: '4px'
                }}>
                  {errors.newPassword}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#212529',
                marginBottom: '8px'
              }}>
                Confirm Password <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  name="confirmPassword"
                  value={changepasswordData.confirmPassword}
                  onChange={handleChange}
                  required
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    fontSize: '14px',
                    border: `1px solid ${errors.confirmPassword ? '#dc3545' : '#ced4da'}`,
                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease-in-out',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    color: '#495057'
                  }}
                  onFocus={(e) => {
                    if (!errors.confirmPassword) {
                      e.target.style.borderColor = '#80bdff';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.confirmPassword) {
                      e.target.style.borderColor = '#ced4da';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6c757d',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword.confirmPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div style={{
                  color: '#dc3545',
                  fontSize: '12px',
                  marginTop: '4px'
                }}>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '8px'
          }}>
            {/* Only show Cancel button when user has typed something */}
            {hasContent && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6c757d',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease-in-out',
                  textDecoration: 'underline'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.color = '#495057';
                }}
                onMouseLeave={(e) => {
                 (e.target as HTMLButtonElement).style.color = '#6c757d';
                }}
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              disabled={loader}
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loader ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.15s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (!loader) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#218838';
                }
              }}
              onMouseLeave={(e) => {
                if (!loader) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#28a745';
                }
              }}
            >
              {loader ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Index;