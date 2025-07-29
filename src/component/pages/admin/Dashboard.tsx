import React, { useState, useEffect } from 'react'
import { callAPI } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'

import LoadScreen from '../../loaderScreen'
import NodataFound from '../../NodataFound'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalLinks: number
  totalClicks: number
}

interface RecentUser {
  _id: string
  username: string
  email: string
  createdAt: string
  status: string
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalLinks: 0,
    totalClicks: 0
  })
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [loader, setloader] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setloader(true)
    try {
      const [statsResponse, usersResponse] = await Promise.all([
        callAPI(apiUrls.userReport, {}, 'GET', {}),
        callAPI(apiUrls.getAllUser, { limit: 5 }, 'GET', {})
      ])
      if (statsResponse?.data?.status) {
        setStats(statsResponse.data.data)
      }
      if (usersResponse?.data?.status) {
        setRecentUsers(usersResponse.data.data)
      }
    } catch (err: any) {
      setloader(false)
    }
  }

  if (loader) return <LoadScreen />

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>
          <p className='text-gray-600 mt-2'>
            Overview of your BioForge platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <i className='fas fa-users text-blue-600 text-xl'></i>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Users</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <i className='fas fa-user-check text-green-600 text-xl'></i>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Active Users
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {stats.activeUsers}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <i className='fas fa-link text-purple-600 text-xl'></i>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Links</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {stats.totalLinks}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-orange-100 rounded-lg'>
                <i className='fas fa-mouse-pointer text-orange-600 text-xl'></i>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Total Clicks
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {stats.totalClicks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className='bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Recent Users
            </h2>
          </div>
          <div className='p-6'>
            {recentUsers.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        User
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Email
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {recentUsers.map(user => (
                      <tr key={user._id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>
                            {user.username}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-500'>
                            {user.email}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NodataFound />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
