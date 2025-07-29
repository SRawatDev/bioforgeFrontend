import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { callAPIWithoutAuth } from '../../../utils/apicall.utils'
import ErrorMessage from '../../../helpers/ErrorMessage'
import { apiUrls } from '../../../utils/api.utils'
import SuccessMessage from '../../../helpers/Success'
import LoadScreen from '../../loaderScreen'
import { FaEyeSlash, FaEye} from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import './register.css'

interface RegisterInterface {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [loader, setloader] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<{
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  const [register, setRegister] = useState<RegisterInterface>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })

  const validateForm = (): boolean => {
    const errors: {
      username?: string
      email?: string
      password?: string
      confirmPassword?: string
    } = {}

    // Username validation
    if (!register.username.trim()) {
      errors.username = 'Username is required'
    } else if (register.username.length < 3) {
      errors.username = 'Username must be at least 3 characters'
    } else if (!/^[a-zA-Z0-9_]+$/.test(register.username)) {
      errors.username =
        'Username can only contain letters, numbers, and underscores'
    }

    // Email validation
    if (!register.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(register.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!register.password) {
      errors.password = 'Password is required'
    } else if (register.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(register.password)) {
      errors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    // Confirm password validation
    if (!register.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (register.password !== register.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegister(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for the field being edited
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setloader(true)
    try {
      const { confirmPassword, ...registerData } = register
      const response = await callAPIWithoutAuth(
        apiUrls.register,
        {},
        'POST',
        registerData
      )

      setloader(false)
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message || 'Registration failed')
      } else {
        setRegister({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        SuccessMessage(
          response?.data?.message ||
            'Account created successfully! Please sign in.'
        )
        navigate('/login')
      }
    } catch (err: any) {
      setloader(true)
    }
  }

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <>
      {loader && <LoadScreen />}

      <div className='register-container gradient-form'>
        {/* Back Button */}
        <Link
          to='/'
          className='back-button-register'
          aria-label='Go back to login'
        >
          <IoMdArrowRoundBack className='back-icon' />
          <span className='back-button-register-text'>Back to Home</span>
        </Link>

        <div className='register-row'>
          {/* Left Column - Registration Form */}
          <div className='register-col-left'>
            <div className='register-form-wrapper'>
              {/* Logo and Header */}
              <div className='register-header'>
                <img
                  src='/assets/logo.png'
                  className='register-logo'
                  alt='BioForge Logo'
                />
                <h4 className='register-title'>Join The BioForge Community</h4>
              </div>

              <p className='register-subtitle'>
                Create your account to get started
              </p>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className='register-form'>
                {/* Username Input */}
                <div className='register-input-wrapper'>
                  {/* <FaUser className="input-icon" /> */}
                  <input
                    type='text'
                    name='username'
                    value={register.username}
                    onChange={handleChange}
                    className={`register-input ${
                      formErrors.username ? 'error' : ''
                    }`}
                    placeholder=' '
                    id='username'
                  />
                  <label htmlFor='username' className='register-label'>
                    Username
                  </label>
                  {formErrors.username && (
                    <div className='register-error'>{formErrors.username}</div>
                  )}
                </div>

                {/* Email Input */}
                <div className='register-input-wrapper'>
                  {/* <HiMail className="input-icon" /> */}
                  <input
                    type='email'
                    name='email'
                    value={register.email}
                    onChange={handleChange}
                    className={`register-input ${
                      formErrors.email ? 'error' : ''
                    }`}
                    placeholder=' '
                    id='email'
                  />
                  <label htmlFor='email' className='register-label'>
                    Email address
                  </label>
                  {formErrors.email && (
                    <div className='register-error'>{formErrors.email}</div>
                  )}
                </div>

                {/* Password Input */}
                <div className='register-input-wrapper'>
                  {/* <FaLock className="input-icon" /> */}
                  <input
                    type={showPassword.password ? 'text' : 'password'}
                    name='password'
                    value={register.password}
                    onChange={handleChange}
                    className={`register-input ${
                      formErrors.password ? 'error' : ''
                    }`}
                    placeholder=' '
                    id='password'
                  />
                  <label htmlFor='password' className='register-label'>
                    Password
                  </label>
                  <button
                    type='button'
                    onClick={() => togglePasswordVisibility('password')}
                    className='password-toggle'
                    aria-label={
                      showPassword.password ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formErrors.password && (
                    <div className='register-error'>{formErrors.password}</div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className='register-input-wrapper'>
                  {/* <FaLock className="input-icon" /> */}
                  <input
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={register.confirmPassword}
                    onChange={handleChange}
                    className={`register-input ${
                      formErrors.confirmPassword ? 'error' : ''
                    }`}
                    placeholder=' '
                    id='confirmPassword'
                  />
                  <label htmlFor='confirmPassword' className='register-label'>
                    Confirm Password
                  </label>
                  <button
                    type='button'
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    className='password-toggle'
                    aria-label={
                      showPassword.confirmPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formErrors.confirmPassword && (
                    <div className='register-error'>
                      {formErrors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className='terms-section'>
                  <p className='terms-text'>
                    By creating an account, you agree to our{' '}
                    <Link to='/terms' className='terms-link'>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to='/privacy' className='terms-link'>
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                {/* Sign Up Button */}
                <div className='register-actions'>
                  <button
                    type='submit'
                    disabled={loader}
                    className='register-btn-primary gradient-custom-2'
                  >
                    {loader ? (
                      <div className='register-loading'>
                        <div className='spinner'></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>

                {/* Sign In Section */}
                <div className='register-signin-section'>
                  <div className='signin-text-wrapper'>
                    <p className='signin-text'>Already have an account?</p>
                    <button
                      type='button'
                      onClick={() => navigate('/login')}
                      className='register-btn-outline'
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Gradient Background with Content */}
          <div className='register-col-right'>
            <div className='register-right-content gradient-custom-2'>
              <div className='register-right-text'>
                <h4 className='right-title'>Start Your Digital Journey</h4>
                <p className='right-description'>
                  Join thousands of creators, professionals, and brands who use
                  BioForge to craft beautiful, personalized bio pages. Showcase
                  your digital identity with style and connect with your
                  audience like never before.
                </p>

                {/* Benefits list */}
                <div className='benefits-list'>
                  <div className='benefit-item'>
                    <div className='benefit-number'>1</div>
                    <div className='benefit-content'>
                      <h5>Choose Your Template</h5>
                      <p>
                        Select from our collection of beautiful, mobile-first
                        templates
                      </p>
                    </div>
                  </div>
                  <div className='benefit-item'>
                    <div className='benefit-number'>2</div>
                    <div className='benefit-content'>
                      <h5>Customize Your Page</h5>
                      <p>
                        Add your links, customize colors, and make it uniquely
                        yours
                      </p>
                    </div>
                  </div>
                  <div className='benefit-item'>
                    <div className='benefit-number'>3</div>
                    <div className='benefit-content'>
                      <h5>Share & Grow</h5>
                      <p>
                        Get your unique link and start building your digital
                        presence
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className='stats-section'>
                  <div className='stat-item'>
                    <div className='stat-number'>10K+</div>
                    <div className='stat-label'>Active Users</div>
                  </div>
                  <div className='stat-item'>
                    <div className='stat-number'>50+</div>
                    <div className='stat-label'>Templates</div>
                  </div>
                  <div className='stat-item'>
                    <div className='stat-number'>99.9%</div>
                    <div className='stat-label'>Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
