import React, { useEffect, useState } from 'react';
import InputField from '../../form/InputField';
import { API, callAPI } from '../../../utils/apicall.utils';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';
import { defaultConfig } from '../../../config';

interface Props {
  open: boolean;
  onClose: () => void;
  Detail: () => void;
  linkDetail: Link;
  action: 'add' | 'edit';
}

interface Link {
  _id?: string;
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
}

export const LinksAddEdit: React.FC<Props> = ({ open, onClose, Detail, linkDetail, action }) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [link, setLink] = useState<Link>({ linkTitle: '', linkUrl: '', linkLogo: '' });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (open && action === 'edit') {
      setLink(linkDetail);
      setPreview(linkDetail?.linkLogo || null);
    }
    if (open && action === 'add') {
      setLink({ linkTitle: '', linkUrl: '', linkLogo: '' });
      setPreview(null);
    }
  }, [open, action, linkDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLink((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const endpoint = action === 'edit' ? apiUrls.linkupdate : apiUrls.addlinks;
      const payload = action === 'edit' ? { ...link, _id: linkDetail._id } : link;

      const response = await callAPI(endpoint, {}, 'POST', payload);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        SuccessMessage(response?.data?.message);
        Detail();
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
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Link Title"
              name="linkTitle"
              value={link.linkTitle}
              onChange={handleChange}
              required
            />
            <InputField
              label="Link Url"
              name="linkUrl"
              value={link.linkUrl}
              onChange={handleChange}
              required
            />

            <label>Link Logo (Image)</label>
            <input
              type="file"
              name="image"
              accept="image/png,image/jpg,image/jpeg"
              onChange={UploadImage}
              className="form-control"
            />
            {preview && (
              <img
                src={defaultConfig.imagePath + preview}
                alt="Preview"
                style={{ marginTop: '10px', width: '80px', borderRadius: '8px' }}
              />
            )}
            <div className="modal-actions">
              <button type="submit" className="btn-primary">Submit</button>
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
