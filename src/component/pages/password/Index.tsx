import React, { useState } from "react";
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
      <div style={{
        padding: '0 30px',
        margin: '0 auto'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '22px',

          }}>
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

                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease-in-out',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    color: '#495057'
                  }}

                />
                <span

                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      oldPassword: !prev.oldPassword,
                    }))
                  }
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '40%',
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
                  {showPassword.oldPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>

            </div>
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

                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease-in-out',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    color: '#495057'
                  }}

                />
                <span

                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      newPassword: !prev.newPassword,
                    }))
                  }
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '40%',
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
                  {showPassword.newPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>

            </div>
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

                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease-in-out',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    color: '#495057'
                  }}

                />
                <span
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '40%',
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
                  {showPassword.confirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>


            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <div className='form-actions'>
              <span

                className='btn-secondary'
                onClick={() => {
                  setchangepasswordData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                  navigate(`/dashboard/index/${localStorage.getItem("_id")}`)
                }}
              >
                Cancel
              </span>
              <button type="submit" className='btn-primary'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div >


    </div >
  );
};

export default Index;