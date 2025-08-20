
import React, { useState, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callAPI } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import { clearData } from "../../../redux/Slice";
import ErrorMessage from "../../../helpers/ErrorMessage";

interface DeleteAccountModalProps { isOpen: boolean; onClose: () => void; }
interface DeleteAccountData { password: string; }
const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"warning" | "password">("warning");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteAccountData, setDeleteAccountData] = useState<DeleteAccountData>({password: "",});
  const [errors, setErrors] = useState({password: "",general: ""});
  useEffect(() => {
    if (isOpen) {
      setStep("warning");
      setDeleteAccountData({ password: "" });
      setShowPassword(false);

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeleteAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.accountDelete,
        {},
        "POST",
        deleteAccountData
      );
      setLoader(false);

      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        localStorage.clear();
        dispatch(clearData());
        onClose();
        SuccessMessage(
          response?.data?.message || "Account deleted successfully"
        );
        navigate("/");
      }
    } catch (err: any) {
      setLoader(false);
    }
  };
  const handleCancel = () => {
    setDeleteAccountData({ password: "" });
    setStep("warning");
    onClose();
  };
  const proceedToPasswordStep = () => {
    setStep("password");
  };
  if (!isOpen) return null;
  return (
    <>
    
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
     
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            maxWidth: step === "warning" ? "500px" : "450px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
            animation: "modalFadeIn 0.3s ease-out forwards",
            scrollbarWidth: "none",
          }}
          onClick={(e) => e.stopPropagation()}

        >   <RxCross2 onClick={handleCancel}
            style={{
              width: "24px",
              height: "24px",
              marginLeft:' 462px',
              marginTop: '19px',
              position: "absolute",
              cursor: "pointer",
              color: "#1529e0ff",
            }}/>

          {step === "warning" && (
            <div style={{ padding: "40px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              ></div>
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#5154ebff",
                    margin: "0 0 16px 0",
                  }}
                >
                  Delete Your Account
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#181717ff",
                    lineHeight: "1.5",
                    margin: "0 0 24px 0",
                  }}
                >
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#dee0f3ff",
                  border: "1px solid #5b4bf0ff",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "32px",
                }}
              >
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#314bdfff",
                    margin: "0 0 16px 0",
                  }}
                >
                  What will be deleted:
                </h4>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "20px",
                    color: "#3d54d4ff",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    Your profile and personal information
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    All your links and content
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    Analytics and usage data
                  </li>
                  <li>Access to your Bioforge account</li>
                </ul>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#3d54d4ff",
                    backgroundColor: "#dee0f3ff",
                    border: "1px solid #5b4bf0ff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Keep My Account
                </button>

                <button
                  type="button"
                  onClick={proceedToPasswordStep}
                  style={{
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#5b4bf0ff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                 
                >
                  Yes, Delete My Account
                </button>
              </div>
            </div>
          )}

          {step === "password" && (
            <div style={{ padding: "40px" }}>
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#5b4bf0ff",
                    margin: "0 0 8px 0",
                  }}
                >
                  Confirm Account Deletion
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#171718ff",
                    margin: 0,
                  }}
                >
                  Please enter your password to confirm this action
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "32px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#212529",
                      marginBottom: "8px",
                    }}
                  >
                    Password <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      name="password"
                      value={deleteAccountData.password}
                      onChange={handleChange}
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={loader}
                      style={{
                        width: "100%",
                        padding: "14px 50px 14px 16px",
                        fontSize: "15px",

                        borderRadius: "10px",
                        outline: "none",
                        transition: "all 0.2s ease",
                        backgroundColor: loader ? "#f8f9fa" : "#ffffff",
                        boxSizing: "border-box",
                        color: "#495057",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loader}
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: loader ? "not-allowed" : "pointer",
                        color: "#6c757d",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      {showPassword ? (
                        <FaEye size={18} />
                      ) : (
                        <FaEyeSlash size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setStep("warning")}
                    disabled={loader}
                    style={{
                      padding: "12px 20px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#6c757d",
                      backgroundColor: "transparent",
                      border: "none",
                      borderRadius: "8px",
                      cursor: loader ? "not-allowed" : "pointer",
                      transition: "color 0.2s ease",
                      textDecoration: "underline",
                    }}
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loader || !deleteAccountData.password.trim()}
                    style={{
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#ffffff",
                      backgroundColor:
                        loader || !deleteAccountData.password.trim()
                          ? "#cbd0faff"
                          : "#5b4bf0ff",
                      border: "none",
                      borderRadius: "8px",
                      cursor:
                        loader || !deleteAccountData.password.trim()
                          ? "not-allowed"
                          : "pointer",
                      transition: "background-color 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {loader && (
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid transparent",
                          borderTop: "2px solid #ffffff",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                    )}
                    {loader ? "Deleting Account..." : "Delete My Account"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteAccountModal;
