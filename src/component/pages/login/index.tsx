import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { callAPIWithoutAuth } from '../../../utils/apicall.utils'
import ErrorMessage from '../../../helpers/ErrorMessage'
import InputField from '../../form/InputField'
import { apiUrls } from '../../../utils/api.utils'
import SuccessMessage from '../../../helpers/Success'
import LoadScreen from '../../loaderScreen'
import { FaEyeLowVision } from 'react-icons/fa6'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import './Login.css'
interface RegisterInterface {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [passwordhide, setpasswordHide] = useState<boolean>(true)
  const [loader, setloader] = useState<boolean>(false)
  const navigate = useNavigate()
  const [login, setLogin] = useState<RegisterInterface>({
    email: '',
    password: ''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLogin(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloader(true)
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.login,
        {},
        'POST',
        login
      )
      setloader(false)
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message)
      } else {
        localStorage.setItem('_id', response?.data?.data?.id)
        localStorage.setItem('accessToken', response?.data?.data?.token)
        localStorage.setItem('type', response?.data?.data?.type)
        localStorage.setItem('username', response?.data?.data?.username)
        localStorage.setItem('profile_img', response?.data?.data?.profile_img)
        if (response?.data?.data?.type === 'user') {
          navigate(`/dashboard/profile/${localStorage.getItem('_id')}`)
        } else {
          navigate('/admin/DashBoard')
        }
        SuccessMessage(response?.data?.message)
      }
    } catch (err: any) {
      setloader(true)
    }
  }
  return (
    <>
      {loader && <LoadScreen />}
      <div
        className='container-parent'
        style={{
          background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Link
          to={'/'}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: 'white'
          }}
        >
          <IoMdArrowRoundBack
            className='backbutton'
            style={{ fontSize: '24px' }}
          />
        </Link>
        <div
          className='container-register'
          style={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            width: '100%',
            maxWidth: '400px'
          }}
        >
          <div className='container-inner'>
            <div
              className='icon-box'
              style={{ textAlign: 'center', marginBottom: '20px' }}
            >
              <img src='/assets/logo.png' alt='Logo' height={50} />
            </div>
            <h2
              style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#1f2937',
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            >
              Sign In to Your Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className='form-group' style={{ marginBottom: '20px' }}>
                <InputField
                  label='Email'
                  type='email'
                  name='email'
                  value={login.email}
                  onChange={handleChange}
                  required
                
                />
              </div>
              <div
                className='form-group position-relative'
                style={{ marginBottom: '20px' }}
              >
                <InputField
                  label='Password'
                  name='password'
                  value={login.password}
                  onChange={handleChange}
                  required
                  type={passwordhide ? 'password' : 'text'}
                 
                />
                {passwordhide ? (
                  <FaEyeLowVision
                    onClick={() => setpasswordHide(false)}
                    className='position-absolute'
                    style={{
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#999'
                    }}
                  />
                ) : (
                  <FaEye
                    className='position-absolute'
                    onClick={() => setpasswordHide(true)}
                    style={{
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#999'
                    }}
                  />
                )}
              </div>
              <button
                type='submit'
                className='button'
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'opacity 0.3s'
                }}
              >
                Sign In
              </button>
            </form>
            <br />
            <button
              type='button'
              className='button'
              onClick={() => navigate('/register')}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                background: '#f3f4f6',
                color: '#4b5563',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background 0.3s'
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
