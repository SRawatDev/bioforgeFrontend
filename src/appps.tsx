import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './component/pages/home'
import Login from './component/pages/login'
import TemplateLanding from './component/pages/template/TemplatesLanding'
import TemplatePreview from './component/pages/template/TemplatePreview'
import TemplateCustomizer from './component/pages/template/TemplateCustomizer'
import Dashboard from './component/pages/dashboard/DashboardSidebar'
import Profile from './component/pages/dashboard/profile/index'
import Links from './component/pages/links/Index'
import Authenticated from './guard/Authenticated'
import Guest from './guard/Guest'
import './App.css'

const appps: React.FC = () => {
  return (
    <Router>
      <div className='App'>
        <Toaster
          position='top-right'
          reverseOrder={false}
          gutter={8}
          containerClassName=''
          containerStyle={{}}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff'
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff'
              }
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff'
              }
            }
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/templates' element={<TemplateLanding />} />
          <Route
            path='/templates/:templateId/preview'
            element={<TemplatePreview />}
          />

          {/* Guest Routes (only accessible when not logged in) */}
          <Route
            path='/login'
            element={
              <Guest>
                <Login />
              </Guest>
            }
          />

          {/* Protected Routes (only accessible when logged in) */}
          <Route
            path='/templates/:templateId/customize'
            element={
              <Authenticated>
                <TemplateCustomizer />
              </Authenticated>
            }
          />

          <Route
            path='/dashboard/*'
            element={
              <Authenticated>
                <Dashboard />
              </Authenticated>
            }
          />

          <Route
            path='/profile/:userId'
            element={
              <Authenticated>
                <Profile />
              </Authenticated>
            }
          />

          <Route
            path='/links'
            element={
              <Authenticated>
                <Links getUserDetail={() => {}} />
              </Authenticated>
            }
          />

          {/* Catch all route - redirect to home */}
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default appps
