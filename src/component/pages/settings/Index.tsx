import React, { useState, useEffect } from 'react'
import { callAPI } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import { ErrorMessage, SuccessMessage } from '../template/message.utils'
import LoadScreen from '../../loaderScreen'

interface Settings {
  notifications: {
    email: boolean
    push: boolean
    marketing: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private'
    showAnalytics: boolean
    allowIndexing: boolean
  }
  account: {
    twoFactorEnabled: boolean
    sessionTimeout: number
  }
}

const Index: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: false,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showAnalytics: true,
      allowIndexing: true
    },
    account: {
      twoFactorEnabled: false,
      sessionTimeout: 30
    }
  })
  const [loader, setLoader] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (
    category: keyof Settings,
    key: string,
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      // Save to localStorage for now (can be extended to API call)
      localStorage.setItem('userSettings', JSON.stringify(settings))
      SuccessMessage('Settings saved successfully')
    } catch (err: any) {
      ErrorMessage('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loader) return <LoadScreen />

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Settings</h1>
          <p className='text-gray-600 mt-2'>Manage your account preferences</p>
        </div>

        <div className='space-y-6'>
          {/* Notifications */}
          <div className='bg-white rounded-lg shadow'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Notifications
              </h2>
              <p className='text-sm text-gray-600'>
                Choose how you want to be notified
              </p>
            </div>
            <div className='p-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <label className='text-sm font-medium text-gray-900'>
                    Email Notifications
                  </label>
                  <p className='text-sm text-gray-500'>
                    Receive notifications via email
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={settings.notifications.email}
                    onChange={e =>
                      handleSettingChange(
                        'notifications',
                        'email',
                        e.target.checked
                      )
                    }
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <label className='text-sm font-medium text-gray-900'>
                    Push Notifications
                  </label>
                  <p className='text-sm text-gray-500'>
                    Receive push notifications in browser
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={settings.notifications.push}
                    onChange={e =>
                      handleSettingChange(
                        'notifications',
                        'push',
                        e.target.checked
                      )
                    }
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <label className='text-sm font-medium text-gray-900'>
                    Marketing Emails
                  </label>
                  <p className='text-sm text-gray-500'>
                    Receive updates about new features
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={settings.notifications.marketing}
                    onChange={e =>
                      handleSettingChange(
                        'notifications',
                        'marketing',
                        e.target.checked
                      )
                    }
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className='bg-white rounded-lg shadow'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-900'>Privacy</h2>
              <p className='text-sm text-gray-600'>
                Control your privacy settings
              </p>
            </div>
            <div className='p-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <label className='text-sm font-medium text-gray-900'>
                    Profile Visibility
                  </label>
                  <p className='text-sm text-gray-500'>
                    Who can see your profile
                  </p>
                </div>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={e =>
                    handleSettingChange(
                      'privacy',
                      'profileVisibility',
                      e.target.value
                    )
                  }
                  className='px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='public'>Public</option>
                  <option value='private'>Private</option>
                </select>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <label className='text-sm font-medium text-gray-900'>
                    Show Analytics
                  </label>
                  <p className='text-sm text-gray-500'>
                    Display click analytics on your profile
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={settings.privacy.showAnalytics}
                    onChange={e =>
                      handleSettingChange(
                        'privacy',
                        'showAnalytics',
                        e.target.checked
                      )
                    }
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <label className='text-sm font-medium text-gray-900'>
                    Search Engine Indexing
                  </label>
                  <p className='text-sm text-gray-500'>
                    Allow search engines to index your profile
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={settings.privacy.allowIndexing}
                    onChange={e =>
                      handleSettingChange(
                        'privacy',
                        'allowIndexing',
                        e.target.checked
                      )
                    }
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className='bg-white rounded-lg shadow'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Account Security
              </h2>
              <p className='text-sm text-gray-600'>
                Manage your account security settings
              </p>
            </div>
            <div className='p-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <label className='text-sm font-medium text-gray-900'>
                    Two-Factor Authentication
                  </label>
                  <p className='text-sm text-gray-500'>
                    Add an extra layer of security
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={settings.account.twoFactorEnabled}
                    onChange={e =>
                      handleSettingChange(
                        'account',
                        'twoFactorEnabled',
                        e.target.checked
                      )
                    }
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <label className='text-sm font-medium text-gray-900'>
                    Session Timeout
                  </label>
                  <p className='text-sm text-gray-500'>
                    Auto logout after inactivity (minutes)
                  </p>
                </div>
                <select
                  value={settings.account.sessionTimeout}
                  onChange={e =>
                    handleSettingChange(
                      'account',
                      'sessionTimeout',
                      parseInt(e.target.value)
                    )
                  }
                  className='px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                  <option value={0}>Never</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className='flex justify-end'>
            <button
              onClick={saveSettings}
              disabled={saving}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center'
            >
              {saving && <i className='fas fa-spinner fa-spin mr-2'></i>}
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
