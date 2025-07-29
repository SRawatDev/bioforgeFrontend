import React, { useState, useEffect } from 'react'
import { callAPI } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import LoadScreen from '../../loaderScreen'
import NodataFound from '../../NodataFound'
import ErrorMessage from '../../../helpers/ErrorMessage'
import SuccessMessage from '../../../helpers/Success'

interface User {
  _id: string
  username: string
  email: string
  type: string
  status: string
  createdAt: string
  profile_img: string
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loader, setloader] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setloader(true)
    try {
      const response = await callAPI(apiUrls.getAllUser, {}, 'GET', {})
      setloader(false)
      if (response?.data?.status) {
        setUsers(response.data.data || [])
      } else {
        ErrorMessage(response?.data?.message || 'Failed to fetch users')
      }
    } catch (err: any) {
      setloader(true)
    }
  }

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    try {
      setloader(true)
      const response = await callAPI(apiUrls.userStatusUpdate, {}, 'POST', {
        userId,
        status: newStatus
      })
      setloader(false)
      if (response?.data?.status) {
        SuccessMessage('User status updated successfully')
        fetchUsers()
      } else {
        ErrorMessage(response?.data?.message || 'Failed to update status')
      }
    } catch (err: any) {
      setloader(true)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      setloader(true)
      const response = await callAPI(apiUrls.admindeleteUser, {}, 'DELETE', {
        userId
      })
      setloader(false)
      if (response?.data?.status) {
        SuccessMessage('User deleted successfully')
        setDeleteConfirm(null)
        fetchUsers()
      } else {
        ErrorMessage(response?.data?.message || 'Failed to delete user')
      }
    } catch (err: any) {
      setloader(true)
    }
  }

  if (loader) return <LoadScreen />

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>User Management</h1>
          <p className='text-gray-600 mt-2'>Manage all registered users</p>
        </div>

        <div className='bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-900'>
              All Users ({users.length})
            </h2>
          </div>

          {users.length > 0 ? (
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
                      Type
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Joined
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <img
                            className='h-10 w-10 rounded-full object-cover'
                            src={user.profile_img || '/assets/108723120.png'}
                            alt={user.username}
                          />
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {user.username}
                            </div>
                          </div>
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
                            user.type === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {user.type}
                        </span>
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
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex space-x-2'>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                user._id,
                                user.status === 'active' ? 'inactive' : 'active'
                              )
                            }
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              user.status === 'active'
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {user.status === 'active'
                              ? 'Deactivate'
                              : 'Activate'}
                          </button>

                          {user.type !== 'admin' && (
                            <button
                              onClick={() => setDeleteConfirm(user._id)}
                              className='px-3 py-1 bg-red-100 text-red-800 rounded text-xs font-medium hover:bg-red-200'
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='p-6'>
              <NodataFound />
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Confirm Delete
              </h3>
              <p className='text-gray-600 mb-6'>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </p>
              <div className='flex justify-end space-x-3'>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className='px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(deleteConfirm)}
                  className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
