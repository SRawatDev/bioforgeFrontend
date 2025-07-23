import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { callAPI } from '../../../utils/apicall.utils'
import ErrorMessage from '../../../helpers/ErrorMessage'
import InputField from '../../form/InputField'
import { apiUrls } from '../../../utils/api.utils'
import SuccessMessage from '../../../helpers/Success'
import LoadScreen from '../../loaderScreen'
import { FaLowVision, FaEye, FaKey, FaLock } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { MdSecurity } from 'react-icons/md'
import './changePassword.css'
import DashboardSidebar from '../dashboard/DashboardSidebar'

interface changepasswordInterface {
  oldPassword: string
  newPassword: string
}

const Index = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false
  })
  const [formErrors, setFormErrors] = useState<{
    oldPassword?: string
    newPassword?: string
  }>({})
  const navigate = useNavigate()
  const [changepasswordData, setchangepasswordData] =
    useState<changepasswordInterface>({
      oldPassword: '',
      newPassword: ''
    })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setchangepasswordData(pre => ({ ...pre, [name]: value }))

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const errors: { oldPassword?: string; newPassword?: string } = {}

    if (!changepasswordData.oldPassword) {
      errors.oldPassword = 'Current password is required'
    }

    if (!changepasswordData.newPassword) {
      errors.newPassword = 'New password is required'
    } else if (changepasswordData.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters'
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(changepasswordData.newPassword)
    ) {
      errors.newPassword =
        'Password must contain uppercase, lowercase, and number'
    }

    if (changepasswordData.oldPassword === changepasswordData.newPassword) {
      errors.newPassword =
        'New password must be different from current password'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoader(true)
    try {
      const response = await callAPI(
        apiUrls.changePassword,
        {},
        'POST',
        changepasswordData
      )
      setLoader(false)
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message)
      } else {
        navigate(`/dashboard/index/${localStorage.getItem('_id')}`)
        SuccessMessage(response?.data?.message)
      }
    } catch (err: any) {
      ErrorMessage(err.message || 'Something went wrong')
      setLoader(false)
    }
  }

  return (
    <>
      {/* <DashboardSidebar /> */}
      {loader && <LoadScreen />}{' '}
      
        <div className='auth-container'>
          {/* Back button */}
          {/* <Link
          to={`/dashboard/profile/${localStorage.getItem("_id")}`}
          className="back-button"
        >
          <IoMdArrowRoundBack />
        </Link> */}
          <div className='dashboard-layout'>
            {/* Left side - Form */}

            <div className='auth-form-container'>
              <div className='auth-form-wrapper'>
                {/* Logo */}
                <div className='auth-logo'>
                  {/* <img src="/assets/logo12.png" alt="BioForge Logo" /> */}
                </div>

                {/* Header */}
                <div className='auth-header'>
                  <div className='change-password-icon'>
                    <FaKey />
                  </div>
                  <h1>Change Password</h1>
                  <p className='auth-subtitle'>
                    Keep your account secure by updating your password regularly
                  </p>
                </div>

                {/* Security Tips */}
                <div className='security-tips'>
                  <MdSecurity className='security-icon' />
                  <div className='tips-content'>
                    <h4>Password Security Tips</h4>
                    <ul>
                      <li>Use at least 8 characters</li>
                      <li>Include uppercase and lowercase letters</li>
                      <li>Add numbers and special characters</li>
                      <li>Avoid common words or personal information</li>
                    </ul>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='auth-form'>
                  <div className='form-group'>
                    <div className='input-wrapper'>
                      <div className='input-icon'>
                        <FaLock />
                      </div>
                      <InputField
                        id='newPassword'
                        label='Current Password'
                        name='oldPassword'
                        value={changepasswordData.oldPassword}
                        onChange={handleChange}
                        required
                        type={showPassword.oldPassword ? 'text' : 'password'}
                        placeholder='Enter your current password'
                        error={formErrors.oldPassword}
                      />
                      <button
                        type='button'
                        className='password-toggle'
                        onClick={() =>
                          setShowPassword(prev => ({
                            ...prev,
                            oldPassword: !prev.oldPassword
                          }))
                        }
                      >
                        {showPassword.oldPassword ? <FaEye /> : <FaLowVision />}
                      </button>
                    </div>
                  </div>

                  <div className='form-group'>
                    <div className='input-wrapper'>
                      <div className='input-icon'>
                        <FaKey />
                      </div>
                      <InputField
                        id='newPassword'
                        label='New Password'
                        name='newPassword'
                        value={changepasswordData.newPassword}
                        onChange={handleChange}
                        required
                        type={showPassword.newPassword ? 'text' : 'password'}
                        placeholder='Enter your new password'
                        error={formErrors.newPassword}
                      />
                      <button
                        type='button'
                        className='password-toggle'
                        onClick={() =>
                          setShowPassword(prev => ({
                            ...prev,
                            newPassword: !prev.newPassword
                          }))
                        }
                      >
                        {showPassword.newPassword ? <FaEye /> : <FaLowVision />}
                      </button>
                    </div>
                  </div>

                  {/* Password strength indicator */}
                  {changepasswordData.newPassword && (
                    <div className='password-strength'>
                      <div className='strength-bar'>
                        <div
                          className={`strength-fill ${getPasswordStrength(
                            changepasswordData.newPassword
                          )}`}
                        ></div>
                      </div>
                      <span className='strength-text'>
                        Password strength:{' '}
                        {getPasswordStrength(changepasswordData.newPassword)}
                      </span>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type='submit'
                    className='auth-button change-password-button'
                  >
                    <FaKey />
                    Update Password
                  </button>
                </form>

                {/* Footer links */}
                <div className='auth-footer'>
                  <p>
                    Remember your password?{' '}
                    <Link
                      to={`/dashboard/index/${localStorage.getItem('_id')}`}
                    >
                      Back to dashboard
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className='auth-image-container'>
              <div className='auth-image-overlay'>
                <h2>Secure Your Account</h2>
                <p>
                  Regular password updates help keep your digital identity safe
                  and secure from unauthorized access.
                </p>
              </div>
              <img
                src='/assets/logo12.png'
                alt='Background'
                className='auth-background-image'
              />
            </div>
          </div>
        </div>
      
    </>
  )
}

// Helper function for password strength
const getPasswordStrength = (password: string): string => {
  let score = 0
  if (password.length >= 8) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score < 2) return 'weak'
  if (score < 4) return 'medium'
  return 'strong'
}

export default Index
