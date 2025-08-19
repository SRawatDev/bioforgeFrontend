import React, { useState, useEffect } from "react";
import { Eye, EyeOff, AlertTriangle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import SuccessMessage from "../../../helpers/Success";
import { clearData } from "../../../redux/Slice";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DeleteAccountData {
  password: string;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'warning' | 'password'>('warning');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [deleteAccountData, setDeleteAccountData] = useState<DeleteAccountData>({
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    general: ""
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('warning');
      setDeleteAccountData({ password: "" });
      setErrors({ password: "", general: "" });
      setShowPassword(false);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeleteAccountData((prev) => ({
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
      password: "",
      general: ""
    };

    if (!deleteAccountData.password.trim()) {
      newErrors.password = "Password is required to delete account";
    } else if (deleteAccountData.password.length < 6) {
      newErrors.password = "Please enter a valid password";
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
    setErrors({ password: "", general: "" });

    try {
      const response = await callAPI(
        apiUrls.accountDelete,
        {},
        "POST",
        deleteAccountData
      );
      setLoader(false);
      
      if (!response?.data?.status) {
        setErrors(prev => ({
          ...prev,
          general: response?.data?.message || "Failed to delete account"
        }));
      } else {
        localStorage.clear();
        dispatch(clearData());
        onClose();
        SuccessMessage(response?.data?.message || "Account deleted successfully");
        navigate("/");
      }
    } catch (err: any) {
      setLoader(false);
      setErrors(prev => ({
        ...prev,
        general: "An error occurred. Please try again later."
      }));
    }
  };

  const handleCancel = () => {
    setDeleteAccountData({ password: "" });
    setErrors({ password: "", general: "" });
    setStep('warning');
    onClose();
  };

  const proceedToPasswordStep = () => {
    setStep('password');
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}
        // onClick={handleCancel}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            maxWidth: step === 'warning' ? '500px' : '450px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            animation: 'modalFadeIn 0.3s ease-out forwards',
            scrollbarWidth:'none'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {loader && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
              borderRadius: '16px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #dc3545',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          )}

          <button
            onClick={handleCancel}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: '#6c757d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              zIndex: 11
            }}
            onMouseEnter={(e) => {
              (e.target as any).style.backgroundColor = '#f8f9fa';
              (e.target as any).style.color = '#495057';
            }}
            onMouseLeave={(e) => {
              (e.target as any).style.backgroundColor = 'transparent';
              (e.target as any).style.color = '#6c757d';
            }}
          >
            <X size={20} />
          </button>

          {step === 'warning' && (
            <div style={{ padding: '40px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#fff5f5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #fed7d7'
                }}>
                  <AlertTriangle size={36} color="#dc3545" />
                </div>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#dc3545',
                  margin: '0 0 16px 0'
                }}>
                  Delete Your Account
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#6c757d',
                  lineHeight: '1.5',
                  margin: '0 0 24px 0'
                }}>
                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </p>
              </div>

              <div style={{
                backgroundColor: '#fff5f5',
                border: '1px solid #fed7d7',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '32px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#dc3545',
                  margin: '0 0 16px 0'
                }}>
                  What will be deleted:
                </h4>
                <ul style={{
                  margin: 0,
                  paddingLeft: '20px',
                  color: '#721c24'
                }}>
                  <li style={{ marginBottom: '8px' }}>Your profile and personal information</li>
                  <li style={{ marginBottom: '8px' }}>All your links and content</li>
                  <li style={{ marginBottom: '8px' }}>Analytics and usage data</li>
                  <li>Access to your Bioforge account</li>
                </ul>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6c757d',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#e9ecef';
                    (e.target as HTMLButtonElement).style.borderColor = '#adb5bd';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#f8f9fa';
                    (e.target as HTMLButtonElement).style.borderColor = '#dee2e6';
                  }}
                >
                  Keep My Account
                </button>
                
                <button
                  type="button"
                  onClick={proceedToPasswordStep}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#ffffff',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#c82333';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#dc3545';
                  }}
                >
                  Yes, Delete My Account
                </button>
              </div>
            </div>
          )}

          {step === 'password' && (
            <div style={{ padding: '40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#dc3545',
                  margin: '0 0 8px 0'
                }}>
                  Confirm Account Deletion
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#6c757d',
                  margin: 0
                }}>
                  Please enter your password to confirm this action
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {errors.general && (
                  <div style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '12px 16px',
                    border: '1px solid #f5c6cb',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    fontSize: '14px'
                  }}>
                    {errors.general}
                  </div>
                )}

                <div style={{ marginBottom: '32px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#212529',
                    marginBottom: '8px'
                  }}>
                    Password <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      name="password"
                      value={deleteAccountData.password}
                      onChange={handleChange}
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={loader}
                      style={{
                        width: '100%',
                        padding: '14px 50px 14px 16px',
                        fontSize: '15px',
                        border: `2px solid ${errors.password ? '#dc3545' : '#e9ecef'}`,
                        borderRadius: '10px',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: loader ? '#f8f9fa' : '#ffffff',
                        boxSizing: 'border-box',
                        color: '#495057'
                      }}
                      onFocus={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = '#80bdff';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,.25)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loader}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: loader ? 'not-allowed' : 'pointer',
                        color: '#6c757d',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!loader) {
                          (e.target as any).style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loader) {
                          (e.target as any).style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <div style={{
                      color: '#dc3545',
                      fontSize: '13px',
                      marginTop: '6px'
                    }}>
                      {errors.password}
                    </div>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    type="button"
                    onClick={() => setStep('warning')}
                    disabled={loader}
                    style={{
                      padding: '12px 20px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#6c757d',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: loader ? 'not-allowed' : 'pointer',
                      transition: 'color 0.2s ease',
                      textDecoration: 'underline'
                    }}
                    onMouseEnter={(e) => {
                      if (!loader) {
                        (e.target as HTMLButtonElement).style.color = '#495057';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loader) {
                        (e.target as HTMLButtonElement).style.color = '#6c757d';
                      }
                    }}
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loader || !deleteAccountData.password.trim()}
                    style={{
                      padding: '12px 24px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#ffffff',
                      backgroundColor: loader || !deleteAccountData.password.trim() ? '#6c757d' : '#dc3545',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: loader || !deleteAccountData.password.trim() ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      if (!loader && deleteAccountData.password.trim()) {
                         (e.target as HTMLButtonElement).style.backgroundColor = '#c82333';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loader && deleteAccountData.password.trim()) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#dc3545';
                      }
                    }}
                  >
                    {loader && (
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid #ffffff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                    )}
                    {loader ? 'Deleting Account...' : 'Delete My Account'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes modalFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default DeleteAccountModal;