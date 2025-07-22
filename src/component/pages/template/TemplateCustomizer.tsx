import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TemplateCard from './TemplateCard'
import { callAPI } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import { SuccessMessage, ErrorMessage } from './message.utils'
import './TemplateCustomizer.css'

interface SocialLink {
    platform: string
    username: string
    icon: string
    gradientFrom: string
    gradientTo: string
    borderColor: string
    shadowColor: string
    url?: string
}

interface CustomizationData {
    name: string
    profession: string
    description: string
    profileImage: string
    socialLinks: SocialLink[]
    backgroundColor: string
    textColor: string
    accentColor: string
}

const TemplateCustomizer: React.FC = () => {
    const { templateId } = useParams<{ templateId: string }>()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState<'content' | 'design' | 'social'>(
        'content'
    )

    const [customization, setCustomization] = useState<CustomizationData>({
        name: '',
        profession: '',
        description: '',
        profileImage: '/assets/108723120.png',
        socialLinks: [
            {
                platform: 'instagram',
                username: '',
                icon: 'fab fa-instagram',
                gradientFrom: 'from-pink-500/20',
                gradientTo: 'to-purple-500/20',
                borderColor: 'border-pink-500/30',
                shadowColor: 'rgba(236,72,153,0.3)',
                url: ''
            },
            {
                platform: 'twitter',
                username: '',
                icon: 'fab fa-twitter',
                gradientFrom: 'from-blue-500/20',
                gradientTo: 'to-cyan-500/20',
                borderColor: 'border-blue-500/30',
                shadowColor: 'rgba(59,130,246,0.3)',
                url: ''
            },
            {
                platform: 'linkedin',
                username: '',
                icon: 'fab fa-linkedin-in',
                gradientFrom: 'from-blue-600/20',
                gradientTo: 'to-indigo-600/20',
                borderColor: 'border-blue-600/30',
                shadowColor: 'rgba(37,99,235,0.3)',
                url: ''
            },
            {
                platform: 'github',
                username: '',
                icon: 'fab fa-github',
                gradientFrom: 'from-gray-700/20',
                gradientTo: 'to-gray-900/20',
                borderColor: 'border-gray-700/30',
                shadowColor: 'rgba(75,85,99,0.3)',
                url: ''
            }
        ],
        backgroundColor: '#667eea',
        textColor: '#ffffff',
        accentColor: '#ff6b6b'
    })

    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = async () => {
        setLoading(true)
        try {
            const response = await callAPI(
                apiUrls.getUserInfotoken,
                {},
                'GET',
                {}
            )
            if (response?.data?.status) {
                const userData = response.data.data
                setCustomization(prev => ({
                    ...prev,
                    name: userData.username || '',
                    profession: userData.profession || '',
                    description: userData.bio || '',
                    profileImage:
                        userData.profile_img || '/assets/108723120.png'
                }))
            }
        } catch (error) {
            console.error('Error loading user data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (
        field: keyof CustomizationData,
        value: string
    ) => {
        setCustomization(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSocialLinkChange = (
        index: number,
        field: keyof SocialLink,
        value: string
    ) => {
        setCustomization(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map((link, i) =>
                i === index ? { ...link, [field]: value } : link
            )
        }))
    }

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('image', file)

        try {
            setLoading(true)
            const response = await callAPI(apiUrls.upload, {}, 'POST', formData)
            if (response?.data?.status) {
                setCustomization(prev => ({
                    ...prev,
                    profileImage: response.data.data.imageUrl
                }))
                SuccessMessage('Profile image updated successfully')
            } else {
                ErrorMessage('Failed to upload image')
            }
        } catch (error) {
            ErrorMessage('Error uploading image')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            // Save profile data
            const profileData = {
                username: customization.name,
                profession: customization.profession,
                bio: customization.description,
                profile_img: customization.profileImage,
                template_id: templateId,
                customization: {
                    backgroundColor: customization.backgroundColor,
                    textColor: customization.textColor,
                    accentColor: customization.accentColor
                }
            }

            const profileResponse = await callAPI(
                apiUrls.updateProfile,
                {},
                'PUT',
                profileData
            )

            if (profileResponse?.data?.status) {
                // Save social links
                const socialLinksPromises = customization.socialLinks
                    .filter(link => link.username && link.url)
                    .map(link =>
                        callAPI(apiUrls.addlinks, {}, 'POST', {
                            linkTitle: link.platform,
                            linkUrl: link.url,
                            linkLogo: link.icon,
                            type: 'social',
                            status: 'active'
                        })
                    )

                await Promise.all(socialLinksPromises)

                SuccessMessage('Template customization saved successfully')
                navigate(`/dashboard/profile/${localStorage.getItem('_id')}`)
            } else {
                ErrorMessage('Failed to save customization')
            }
        } catch (error) {
            ErrorMessage('Error saving customization')
        } finally {
            setSaving(false)
        }
    }

    const renderContentTab = () => (
        <div className='customizer-tab-content'>
            <div className='form-group'>
                <label>Name</label>
                <input
                    type='text'
                    value={customization.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    placeholder='Enter your name'
                />
            </div>

            <div className='form-group'>
                <label>Profession</label>
                <input
                    type='text'
                    value={customization.profession}
                    onChange={e =>
                        handleInputChange('profession', e.target.value)
                    }
                    placeholder='e.g., Creative Designer'
                />
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea
                    value={customization.description}
                    onChange={e =>
                        handleInputChange('description', e.target.value)
                    }
                    placeholder='Tell people about yourself...'
                    rows={4}
                />
            </div>

            <div className='form-group'>
                <label>Profile Image</label>
                <div className='image-upload-container'>
                    <img
                        src={customization.profileImage}
                        alt='Profile'
                        className='profile-preview'
                    />
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageUpload}
                        className='image-upload-input'
                        id='profile-image'
                    />
                    <label htmlFor='profile-image' className='image-upload-btn'>
                        Change Image
                    </label>
                </div>
            </div>
        </div>
    )

    const renderDesignTab = () => (
        <div className='customizer-tab-content'>
            <div className='form-group'>
                <label>Background Color</label>
                <div className='color-input-container'>
                    <input
                        type='color'
                        value={customization.backgroundColor}
                        onChange={e =>
                            handleInputChange('backgroundColor', e.target.value)
                        }
                    />
                    <input
                        type='text'
                        value={customization.backgroundColor}
                        onChange={e =>
                            handleInputChange('backgroundColor', e.target.value)
                        }
                        placeholder='#667eea'
                    />
                </div>
            </div>

            <div className='form-group'>
                <label>Text Color</label>
                <div className='color-input-container'>
                    <input
                        type='color'
                        value={customization.textColor}
                        onChange={e =>
                            handleInputChange('textColor', e.target.value)
                        }
                    />
                    <input
                        type='text'
                        value={customization.textColor}
                        onChange={e =>
                            handleInputChange('textColor', e.target.value)
                        }
                        placeholder='#ffffff'
                    />
                </div>
            </div>

            <div className='form-group'>
                <label>Accent Color</label>
                <div className='color-input-container'>
                    <input
                        type='color'
                        value={customization.accentColor}
                        onChange={e =>
                            handleInputChange('accentColor', e.target.value)
                        }
                    />
                    <input
                        type='text'
                        value={customization.accentColor}
                        onChange={e =>
                            handleInputChange('accentColor', e.target.value)
                        }
                        placeholder='#ff6b6b'
                    />
                </div>
            </div>

            <div className='color-presets'>
                <label>Color Presets</label>
                <div className='preset-grid'>
                    {[
                        {
                            bg: '#667eea',
                            text: '#ffffff',
                            accent: '#ff6b6b',
                            name: 'Ocean'
                        },
                        {
                            bg: '#764ba2',
                            text: '#ffffff',
                            accent: '#feca57',
                            name: 'Sunset'
                        },
                        {
                            bg: '#2c3e50',
                            text: '#ffffff',
                            accent: '#e74c3c',
                            name: 'Dark'
                        },
                        {
                            bg: '#8360c3',
                            text: '#ffffff',
                            accent: '#2ebf91',
                            name: 'Purple'
                        }
                    ].map((preset, index) => (
                        <button
                            key={index}
                            className='color-preset'
                            style={{
                                background: `linear-gradient(135deg, ${preset.bg}, ${preset.accent})`,
                                color: preset.text
                            }}
                            onClick={() => {
                                setCustomization(prev => ({
                                    ...prev,
                                    backgroundColor: preset.bg,
                                    textColor: preset.text,
                                    accentColor: preset.accent
                                }))
                            }}
                        >
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderSocialTab = () => (
        <div className='customizer-tab-content'>
            {customization.socialLinks.map((link, index) => (
                <div key={index} className='social-link-form'>
                    <div className='social-platform-header'>
                        <i className={link.icon}></i>
                        <span>{link.platform}</span>
                    </div>

                    <div className='form-group'>
                        <label>Username</label>
                        <input
                            type='text'
                            value={link.username}
                            onChange={e =>
                                handleSocialLinkChange(
                                    index,
                                    'username',
                                    e.target.value
                                )
                            }
                            placeholder={`@your${link.platform}username`}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Profile URL</label>
                        <input
                            type='url'
                            value={link.url || ''}
                            onChange={e =>
                                handleSocialLinkChange(
                                    index,
                                    'url',
                                    e.target.value
                                )
                            }
                            placeholder={`https://${link.platform}.com/yourusername`}
                        />
                    </div>
                </div>
            ))}
        </div>
    )

    if (loading) {
        return (
            <div className='customizer-loading'>
                <img src='/assets/loader.gif' alt='Loading...' />
                <p>Loading customizer...</p>
            </div>
        )
    }

    return (
        <div className='template-customizer'>
            <div className='customizer-header'>
                <button
                    onClick={() => navigate('/templates')}
                    className='back-btn'
                >
                    ← Back to Templates
                </button>
                <h1>Customize Your Template</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className='save-btn'
                >
                    {saving ? 'Saving...' : 'Save & Publish'}
                </button>
            </div>

            <div className='customizer-content'>
                <div className='customizer-sidebar'>
                    <div className='customizer-tabs'>
                        <button
                            className={`tab-btn ${
                                activeTab === 'content' ? 'active' : ''
                            }`}
                            onClick={() => setActiveTab('content')}
                        >
                            <i className='fas fa-edit'></i>
                            Content
                        </button>
                        <button
                            className={`tab-btn ${
                                activeTab === 'design' ? 'active' : ''
                            }`}
                            onClick={() => setActiveTab('design')}
                        >
                            <i className='fas fa-palette'></i>
                            Design
                        </button>
                        <button
                            className={`tab-btn ${
                                activeTab === 'social' ? 'active' : ''
                            }`}
                            onClick={() => setActiveTab('social')}
                        >
                            <i className='fas fa-share-alt'></i>
                            Social Links
                        </button>
                    </div>

                    <div className='customizer-form'>
                        {activeTab === 'content' && renderContentTab()}
                        {activeTab === 'design' && renderDesignTab()}
                        {activeTab === 'social' && renderSocialTab()}
                    </div>
                </div>

                <div className='customizer-preview'>
                    <div className='preview-header'>
                        <h3>Live Preview</h3>
                        <div className='preview-controls'>
                            <button className='preview-btn desktop active'>
                                <i className='fas fa-desktop'></i>
                            </button>
                            <button className='preview-btn mobile'>
                                <i className='fas fa-mobile-alt'></i>
                            </button>
                        </div>
                    </div>

                    <div className='preview-container'>
                        <TemplateCard
                            id={parseInt(templateId || '1')}
                            name={customization.name}
                            profession={customization.profession}
                            description={customization.description}
                            profileImage={customization.profileImage}
                            socialLinks={customization.socialLinks}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateCustomizer
