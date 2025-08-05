import React, { useEffect, useState } from 'react';
import InputField from '../../form/InputField';
import { API, callAPI } from '../../../utils/apicall.utils';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';
import { defaultConfig } from '../../../config';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaTimes, FaLink, FaUpload, FaImage } from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
import './LinksAddEdit.css';

interface Props {
  open: boolean;
  onClose: () => void;
  Detail: () => void;
  linkDetail: Link;
  action: 'add' | 'edit';
  NonDetail: () => void;
}

interface Link {
  _id?: string;
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  type: string;
  protectedLinks?:string
}

export const socialPlatforms = [
  { label: 'Instagram', value: 'instagram', icon: <FaInstagram size={24} />, color: '#E4405F' },
  { label: 'Facebook', value: 'facebook', icon: <FaFacebookF size={24} />, color: '#1877F2' },
  { label: 'Twitter', value: 'twitter', icon: <FaTwitter size={24} />, color: '#1DA1F2' },
  { label: 'LinkedIn', value: 'linkedin', icon: <FaLinkedinIn size={24} />, color: '#0A66C2' },
  { label: 'YouTube', value: 'youtube', icon: <FaYoutube size={24} />, color: '#FF0000' },
];

export const LinksAddEdit: React.FC<Props> = ({ open, onClose, Detail, linkDetail, action, NonDetail }) => {
  const [loader, setLoader] = useState(false);
  const [link, setLink] = useState<Link>({ linkTitle: '', linkUrl: '', linkLogo: '', type: 'social',protectedLinks:"public" });
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (open) {
      if (action === 'edit') {
        setLink(linkDetail);
        setPreview(linkDetail?.linkLogo || null);
      } else if (action === 'add') {
        setLink({ linkTitle: '', linkUrl: '', linkLogo: '', type: 'social' });
        setPreview(null);
      }
    }
  }, [open, action, linkDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'linkTitle' && link.type === 'social') {
      const selected = socialPlatforms.find(
        (p) => p.label.toLowerCase() === value.toLowerCase() || p.value.toLowerCase() === value.toLowerCase()
      );
      setLink((prev) => ({
        ...prev,
        [name]: value,
        linkLogo: selected ? selected.value : prev.linkLogo,
      }));
      setPreview(null);
    } else {
      setLink((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append('tempImage', file);
      const apiResponse = await API(apiUrls.upload, {}, 'POST', formData);
      setLoader(false);
      if (apiResponse.data.status) {
        const uploadedUrl = apiResponse.data.data;
        setLink((prev) => ({ ...prev, linkLogo: uploadedUrl }));
        setPreview(uploadedUrl);
      } else {
        ErrorMessage(apiResponse?.data?.message);
      }
    } catch (err) {
      setLoader(true);
     
    }
  };

  const UploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await handleFileUpload(files[0]);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(link.type=='social' && link.linkTitle===""){
      ErrorMessage("Please select linktitle")
      return
    }else if(link.type=='non_social' &&link.linkLogo===""){
       ErrorMessage("Please upload custom Logo")
      return
    }
    setLoader(true);
    try {
      const endpoint = action === 'edit' ? apiUrls.linkupdate : apiUrls.addlinks;
      const payload = action === 'edit' ? { ...link, _id: linkDetail._id } : link;
      if (payload.type === 'social') {
        payload.linkLogo = '';
      }
      const response = await callAPI(endpoint, {}, 'POST', payload);
      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        SuccessMessage(response?.data?.message);
        Detail();
        NonDetail();
        onClose();
      }
    } catch (err: any) {
      setLoader(true);
     }
  };

  if (!open) return null;

  const selectedPlatform = socialPlatforms.find(p => p.label === link.linkTitle);

  return (
    <>
      {loader && <LoadScreen />}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-icon">
              {action === 'edit' ? <MdEdit /> : <MdAdd />}
            </div>
            <div className="modal-title-section">
              <h2>{action === 'edit' ? 'Edit' : 'Add'} Link</h2>
              <p>Connect your audience to your content</p>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="link-form gap-0">
              {/* Link Type Selection */}
              <div className="form-section">
                <label className="form-label">
                  <FaLink className="label-icon" />
                  Link Type
                </label>
                <div className="type-selector">
                  <label className={`type-option ${link.type === 'social' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="type"
                      value="social"
                      checked={link.type === 'social'}
                      onChange={handleChange}
                    />
                    <span className="type-content">
                      <div className="type-icon">📱</div>
                      <div>
                        <strong>Social</strong>
                        <small>Instagram, Facebook, etc.</small>
                      </div>
                    </span>
                  </label>
                  <label className={`type-option ${link.type === 'non_social' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="type"
                      value="non_social"
                      checked={link.type === 'non_social'}
                      onChange={handleChange}
                    />
                    <span className="type-content">
                      <div className="type-icon">🔗</div>
                      <div>
                        <strong>Custom</strong>
                        <small>Website, portfolio, etc.</small>
                      </div>
                    </span>
                  </label>
                </div>
              </div>

              {/* Platform/Title Selection */}
              <div className="form-section">
                {link.type === 'social' ? (
                  <>
                    <label className="form-label">Social Platform</label>
                    <div className="social-platforms">
                      {socialPlatforms.map((platform) => (
                        <label
                          key={platform.value}
                          className={`platform-option ${link.linkTitle === platform.label ? 'selected' : ''}`}
                          style={{ '--platform-color': platform.color } as React.CSSProperties}
                        >
                          <input
                            type="radio"
                            name="linkTitle"
                            value={platform.label}
                            checked={link.linkTitle === platform.label}
                            onChange={handleChange}
                          />
                          <div className="platform-content">
                            {platform.icon}
                            <span>{platform.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="input-group">
                    <InputField
                      label="Link Title"
                      name="linkTitle"
                      value={link.linkTitle}
                      onChange={handleChange}
                      required
                      placeholder="Enter link title"
                    />
                  </div>
                )}
              </div>

              {/* URL Input */}
              <div className="form-section">
                <div className="input-group">
                  <InputField
                    label="Link URL"
                    name="linkUrl"
                    value={link.linkUrl}
                    onChange={handleChange}
                    required
                    placeholder={link.type === 'social' ? `Enter your ${link.linkTitle || 'social'} profile URL` : 'https://example.com'}
                  />
                </div>
              </div>
              <div className="form-section">
                <div className="input-group" >
                   <label htmlFor='protectedLinks' className='field-label'>
                      Protect You Links
                    </label>
                    <select
                      id='protectedLinks'
                      name='protectedLinks'
                      value={link?.protectedLinks}
                      onChange={handleChange}
                      className='select-field'
                      style={{borderRadius:"10px",padding:"10px"}}
                    >
                   
                        <option
                          key={"public"}
                          value={"public"}
                          
                        
                        >
                          Public
                        </option>
                        <option
                          key={"private"}
                          value={"private"}
                        
                        >
                          private
                        </option>
              
                    </select>

                </div>
              </div>

              {/* Image Upload for Non-Social */}
              {link.type !== 'social' && (
                <div className="form-section">
                  <label className="form-label">
                    <FaImage className="label-icon" />
                    Link Logo
                  </label>
                  <div
                    className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/png,image/jpg,image/jpeg"
                      onChange={UploadImage}
                      className="upload-input"
                    />
                    <label htmlFor="imageUpload" className="upload-label">
                      {preview ? (
                        <div className="preview-container">
                          <img
                            src={defaultConfig.imagePath + preview}
                            alt="Preview"
                            className="preview-image"
                          />
                          <div className="preview-overlay">
                            <FaUpload />
                            <span>Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <FaUpload size={32} />
                          <h4>Upload Logo</h4>
                          <p>Drag & drop or click to select</p>
                          <small>PNG, JPG up to 5MB</small>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {/* Preview Section */}
              {(link.linkTitle || link.linkUrl) && (
                <div className="form-section">
                  <label className="form-label">Preview</label>
                  <div className="link-preview">
                    <div className="preview-icon">
                      {link.type === 'social' && selectedPlatform ? (
                        <div style={{ color: selectedPlatform.color }}>
                          {selectedPlatform.icon}
                        </div>
                      ) : preview ? (
                        <img src={defaultConfig.imagePath + preview} alt="Logo" />
                      ) : (
                        <FaLink />
                      )}
                    </div>
                    <div className="preview-content">
                      <h4>{link.linkTitle || 'Link Title'}</h4>
                      <p>{link.linkUrl || 'Link URL'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {action === 'edit' ? 'Update Link' : 'Add Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
