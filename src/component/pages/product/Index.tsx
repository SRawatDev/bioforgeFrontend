import React, { useEffect, useState } from 'react'
import { callAPI } from '../../../utils/apicall.utils'
import ErrorMessage from '../../../helpers/ErrorMessage'
import SuccessMessage from '../../../helpers/Success'
import { apiUrls } from '../../../utils/api.utils'
import Delete from './Delete'
import { Link } from 'react-router-dom'
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md'
import { TbStatusChange } from 'react-icons/tb'
import { AiOutlineEye } from 'react-icons/ai'
import { AiFillProduct } from "react-icons/ai";
import { VscFolderActive } from "react-icons/vsc";
import { MdOutlineNotInterested } from "react-icons/md";
import LinkShimmer from '../../LinkShimmer'
import { VideoAddEdit } from './VideoAddEdit'
import { defaultConfig } from '../../../config'
interface LinkItem {
  _id?: string
  title: string
  image: string
  link: string
  status: string
}
interface Props {
  getUserDetail: () => void
}
const Index: React.FC<Props> = ({ getUserDetail }) => {
  const [non_socialData, setnonSocialData] = useState<LinkItem[]>([])
  const [action, setAction] = useState<'add' | 'edit'>('add')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [linkDetail, setLinkDetail] = useState<LinkItem>({
    _id: '',
    title: '',
    image: '',
    status: '',
    link: ''
  })
  const Detail = async () => {
    setLoader(true)
    try {
      const response = await callAPI(apiUrls.getlinkCategory, {}, 'GET', {})
      setLoader(false)
      if (response?.data?.status) {
        setnonSocialData(response.data.data || [])
        getUserDetail()
      } else {
        ErrorMessage(response?.data?.message)
      }
    } catch (err: any) {
      setLoader(false)
    }
  }

  useEffect(() => {
    Detail()
  }, [])

  const handleEdit = (item: LinkItem) => {
    setLinkDetail(item)
    setOpen(true)
    setAction('edit')
  }

  const handleDelete = (item: LinkItem) => {
    setLinkDetail(item)
    setDeleteOpen(true)
  }

  const confirmDelete = async (item: LinkItem) => {
    try {
      setLoader(true)
      const res = await callAPI(
        apiUrls.deletelinkCategory,
        { _id: item._id },
        'DELETE',
        {}
      )
      setLoader(false)
      if (res?.data?.status) {
        SuccessMessage(res.data.message)
        setDeleteOpen(false)
        Detail()
        getUserDetail()
      } else {
        ErrorMessage(res.data.message)
      }
    } catch (err: any) {
      setLoader(false)
    }
  }

  const confirmStatus = async (item: LinkItem) => {
    try {
      setLoader(true)
      const res = await callAPI(
        apiUrls.statuslinkCategory,
        { _id: item._id },
        'GET',
        {}
      )
      setLoader(false)
      if (res?.data?.status) {
        SuccessMessage(res.data.message)
        Detail()
        getUserDetail()
      } else {
        ErrorMessage(res.data.message)
      }
    } catch (err: any) {
      setLoader(false)
    }
  }

  const inactive = non_socialData.filter(
    item => item.status === 'inactive'
  ).length
  const active = non_socialData.filter(
    item => item.status !== 'inactive'
  ).length

  return (
    <div className='links-page-container'>
      <div className='links-page-content'>
        {/* Enhanced Header Section */}
        <div className='links-header'>
          <div className='header-top'>
            <div className='header-brand'>
              <img
                className='links-logo'
                src='/assets/logo.png'
                alt='BioForge Logo'
              />
              <div className='brand-text'>
                <h1>Product Management</h1>
              </div>
            </div>

            <button
              className='add-link-button primary-button'
              onClick={() => {
                setOpen(true)
                setAction('add')
                setLinkDetail({
                  _id: '',
                  title: '',
                  image: '',
                  status: '',
                  link: ''
                })
              }}
            >
              <AiFillProduct className='button-icon' />
              Add New Product
            </button>
          </div>

          <div className='stats-container'>
            <div className='stat-card'>
              <div className='stat-icon'>
                <AiFillProduct />
              </div>
              <div className='stat-info'>
                <h3>{non_socialData.length}</h3>
                <p>Total Product</p>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon'>
                <VscFolderActive />
              </div>
              <div className='stat-info'>
                <h3>{active}</h3>
                <p>Total Active Product</p>
              </div>
            </div>

            <div className='stat-card'>
              <div className='stat-icon'>
                <MdOutlineNotInterested />
              </div>
              <div className='stat-info'>
                <h3>{inactive}</h3>
                <p>Total Inactive Product</p>
              </div>
            </div>
          </div>
        </div>

        {loader ? (
          <LinkShimmer />
        ) : (
          <div className='links-sections'>
            {non_socialData.length > 0 && (
              <div className='links-section'>
                <div className='section-header'></div>
                <div className='links-list social-links-list'>
                  {non_socialData.map(item => {
                    return (
                      <div
                        key={item._id}
                        className={`link-item ${
                          item.status !== 'active' ? 'inactive' : ''
                        }`}
                      >
                        <div className='link-item-content'>
                          <div className='link-item-icon social-icon'>
                            <img
                              src={defaultConfig.imagePath + item.image}
                              alt={item.title}
                            />
                          </div>
                          <div className='link-item-details'>
                            <div className='link-title-container'>
                              <h3 className='link-title '>
                                {item.title}
                                <span
                                  className={`ms-2 link-status ${item.status}`}
                                >
                                  {item.status}
                                </span>
                              </h3>
                            </div>

                            <div className='link-stats'>
                              <Link to={`${item.link}`} target='blank'>
                                {' '}
                                {item.link}
                              </Link>
                            </div>
                          </div>

                          <div className='link-item-actions'>
                            <button
                              className='action-button view-button'
                              onClick={() => window.open(item.link, '_blank')}
                              title='View Product'
                            >
                              <AiOutlineEye />
                            </button>
                            <button
                              className='action-button status-button'
                              onClick={() => confirmStatus(item)}
                              title='Toggle Status'
                            >
                              <TbStatusChange />
                            </button>
                            <button
                              className='action-button edit-button'
                              onClick={() => handleEdit(item)}
                              title='Edit Product'
                            >
                              <MdOutlineEdit />
                            </button>
                            <button
                              className='action-button delete-button'
                              onClick={() => handleDelete(item)}
                              title='Delete Product'
                            >
                              <MdDeleteOutline />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {non_socialData.length === 0 &&
              non_socialData.length === 0 &&
              !loader && (
                <div className='no-links'>
                  <div className='no-links-content'>
                    <div className='empty-state-icon'>
                      <AiFillProduct />
                    </div>
                    <h3>No Product Added Yet</h3>
                    <p>
                      Add your first Product to get started with your BioForge
                      profile and start building your digital presence.
                    </p>
                    <button
                      className='add-link-button primary-button'
                      onClick={() => {
                        setOpen(true)
                        setAction('add')
                        setLinkDetail({
                          _id: '',
                          title: '',
                          image: '',
                          status: '',
                          link: ''
                        })
                      }}
                    >
                      <AiFillProduct className='button-icon' />
                      Add Your First Product
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      <Delete
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        confirmDetail={() => confirmDelete(linkDetail)}
        linkDetail={linkDetail}
      />

      <VideoAddEdit
        NonDetail={Detail}
        open={open}
        onClose={() => setOpen(false)}
        Detail={Detail}
        linkDetail={linkDetail}
        action={action}
      />
    </div>
  )
}

export default Index
