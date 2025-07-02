import React, { useEffect, useState } from 'react';
import InputField from '../../form/InputField';
import { API, callAPI } from '../../../utils/apicall.utils';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';
import { defaultConfig } from '../../../config';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface Props {
  open: boolean;
  onClose: () => void;
  Detail: () => void;
  linkDetail: Link;
  action: 'add' | 'edit';
  NonDetail:()=>void
}

interface Link {
  _id?: string;
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  type: string;
}

export const socialPlatforms = [
  { label: 'Instagram', value: 'instagram', icon: <FaInstagram size={24} /> },
  { label: 'Facebook', value: 'facebook', icon: <FaFacebookF size={24} /> },
  { label: 'Twitter', value: 'twitter', icon: <FaTwitter size={24} /> },
  { label: 'LinkedIn', value: 'linkedin', icon: <FaLinkedinIn size={24} /> },
  { label: 'YouTube', value: 'youtube', icon: <FaYoutube size={24} /> },
];
export const LinksAddEdit: React.FC<Props> = ({ open, onClose, Detail, linkDetail, action,NonDetail }) => {
  const [loader, setLoader] = useState(false);
  const [link, setLink] = useState<Link>({ linkTitle: '', linkUrl: '', linkLogo: '', type: 'social' });
  const [preview, setPreview] = useState<string | null>(null);

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

  const UploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];
      const formData = new FormData();
      formData.append('tempImage', file);
      const apiResponse = await API(apiUrls.upload, {}, 'POST', formData);
      if (apiResponse.data.status) {
        const uploadedUrl = apiResponse.data.data;
        setLink((prev) => ({ ...prev, linkLogo: uploadedUrl }));
        setPreview(uploadedUrl);
        e.target.value = '';
      } else {
        ErrorMessage(apiResponse?.data?.message);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      ErrorMessage('Image upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const endpoint = action === 'edit' ? apiUrls.linkupdate : apiUrls.addlinks;
      const payload = action === 'edit' ? { ...link, _id: linkDetail._id } : link;
      if (payload.type === 'social' ) {
        payload.linkLogo = '';
      }

      const response = await callAPI(endpoint, {}, 'POST', payload);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        SuccessMessage(response?.data?.message);
        Detail();
        NonDetail()
        
        onClose();
      }
    } catch (err: any) {
      ErrorMessage(err.message || 'Something went wrong');
    } finally {
      setLoader(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {loader && <LoadScreen />}
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{action === 'edit' ? 'Edit' : 'Add'} Social Link</h2>
            <button className="close-btn" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="linkType">Link Type</label>
            <select
              id="linkType"
              name="type"
              className="form-control"
              value={link.type}
              onChange={handleChange}
              required
            >

              <option value="social">Social</option>
              <option value="non_social">Non-Social</option>
            </select>

            {link.type === 'social' ? (
              <>
                <label htmlFor="socialTitle">Social Platform</label>
                <select
                  id="socialTitle"
                  name="linkTitle"
                  className="form-control"
                  value={link.linkTitle}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Platform</option>
                  {socialPlatforms.map((platform) => (
                    <option key={platform.value} value={platform.label}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <InputField
                label="Link Title"
                name="linkTitle"
                value={link.linkTitle}
                onChange={handleChange}
                required
              />
            )}

            <InputField
              label="Link Url"
              name="linkUrl"
              value={link.linkUrl}
              onChange={handleChange}
              required
            />

            {link.type !== 'social' && (
              <>
                <label>Link Logo (Image)</label>
                <input
                  type="file"
                  name="image"
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={UploadImage}
                  className="form-control"
                />
              </>
            )}

            {preview && (
              <img
                src={defaultConfig.imagePath + preview}
                alt="Preview"
                style={{ marginTop: '10px', width: '80px', borderRadius: '8px' }}
              />
            )}

            <div className="modal-actions">
              <button type="submit" className="btn-primary">
                Submit
              </button>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
