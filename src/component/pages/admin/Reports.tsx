import React, { useState, useEffect } from 'react'
import { callAPI } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import LoadScreen from '../../loaderScreen'
import ErrorMessage from '../../../helpers/ErrorMessage'
interface ReportData {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  totalLinks: number
  socialLinks: number
  customLinks: number
  totalClicks: number
  monthlyGrowth: number
  topUsers: Array<{
    username: string
    totalClicks: number
    totalLinks: number
  }>
}

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loader, setloader] = useState(false)
  const [dateRange, setDateRange] = useState('30') // days

  useEffect(() => {
    fetchReportData()
  }, [dateRange])

  const fetchReportData = async () => {
    setloader(true)
    try {
      const response = await callAPI(
        apiUrls.userReport,
        { days: dateRange },
        'GET',
        {}
      )
      setloader(false)
      if (response?.data?.status) {
        setReportData(response.data.data)
      } else {
        ErrorMessage(response?.data?.message || 'Failed to fetch report data')
      }
    } catch (err: any) {
      setloader(true)
    }
  }

  if (loader) return <LoadScreen />

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8 flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Analytics & Reports
            </h1>
            <p className='text-gray-600 mt-2'>Platform performance insights</p>
          </div>

          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='7'>Last 7 days</option>
            <option value='30'>Last 30 days</option>
            <option value='90'>Last 90 days</option>
            <option value='365'>Last year</option>
          </select>
        </div>

        {reportData && (
          <>
            {/* Key Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              <div className='bg-white rounded-lg shadow p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Total Users
                    </p>
                    <p className='text-3xl font-bold text-gray-900'>
                      {reportData.totalUsers}
                    </p>
                  </div>
                  <div className='p-3 bg-blue-100 rounded-full'>
                    <i className='fas fa-users text-blue-600 text-xl'></i>
                  </div>
                </div>
                <div className='mt-4'>
                  <span className='text-sm text-gray-500'>
                    {reportData.activeUsers} active, {reportData.inactiveUsers}{' '}
                    inactive
                  </span>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Total Links
                    </p>
                    <p className='text-3xl font-bold text-gray-900'>
                      {reportData.totalLinks}
                    </p>
                  </div>
                  <div className='p-3 bg-green-100 rounded-full'>
                    <i className='fas fa-link text-green-600 text-xl'></i>
                  </div>
                </div>
                <div className='mt-4'>
                  <span className='text-sm text-gray-500'>
                    {reportData.socialLinks} social, {reportData.customLinks}{' '}
                    custom
                  </span>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Total Clicks
                    </p>
                    <p className='text-3xl font-bold text-gray-900'>
                      {reportData.totalClicks}
                    </p>
                  </div>
                  <div className='p-3 bg-purple-100 rounded-full'>
                    <i className='fas fa-mouse-pointer text-purple-600 text-xl'></i>
                  </div>
                </div>
                <div className='mt-4'>
                  <span className='text-sm text-gray-500'>
                    Avg:{' '}
                    {Math.round(reportData.totalClicks / reportData.totalUsers)}{' '}
                    per user
                  </span>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Growth Rate
                    </p>
                    <p className='text-3xl font-bold text-gray-900'>
                      {reportData.monthlyGrowth}%
                    </p>
                  </div>
                  <div className='p-3 bg-orange-100 rounded-full'>
                    <i className='fas fa-chart-line text-orange-600 text-xl'></i>
                  </div>
                </div>
                <div className='mt-4'>
                  <span
                    className={`text-sm ${
                      reportData.monthlyGrowth >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {reportData.monthlyGrowth >= 0 ? '↗' : '↘'} Monthly growth
                  </span>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className='bg-white rounded-lg shadow'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>
                  Top Performing Users
                </h2>
              </div>
              <div className='p-6'>
                {reportData.topUsers.length > 0 ? (
                  <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Rank
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Username
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Total Clicks
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Total Links
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Avg Clicks/Link
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {reportData.topUsers.map((user, index) => (
                          <tr key={user.username}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <span
                                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                    index === 0
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : index === 1
                                      ? 'bg-gray-100 text-gray-800'
                                      : index === 2
                                      ? 'bg-orange-100 text-orange-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {index + 1}
                                </span>
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm font-medium text-gray-900'>
                                {user.username}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm text-gray-900'>
                                {user.totalClicks}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm text-gray-900'>
                                {user.totalLinks}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm text-gray-900'>
                                {user.totalLinks > 0
                                  ? Math.round(
                                      user.totalClicks / user.totalLinks
                                    )
                                  : 0}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <p className='text-gray-500'>
                      No data available for the selected period
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Reports
