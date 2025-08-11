import React, { useEffect, useState } from 'react';
import InputField from '../../form/InputField';
import { API, callAPI } from '../../../utils/apicall.utils';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';

import {  FaImage, FaTimes, FaUpload} from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
import { defaultConfig } from '../../../config';
interface Props {
  open: boolean;
  onClose: () => void;
  Detail: () => void;
  linkDetail: Link;
  action: 'add' | 'edit';
  NonDetail: () => void;
}


interface Link {
  _id?: string,
  title: string,
  image: string,
  status: string,
  link: string
}


export const VideoAddEdit: React.FC<Props> = ({ open, onClose, Detail, linkDetail, action, NonDetail }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [link, setLink] = useState<Link>({

        title: "",
        image: "",
        status: "active",
        link: ""
  });

  useEffect(() => {
    if (open) {
      if (action === "edit") {
        setPreview(linkDetail.image)
        setLink(linkDetail);
      } else {
        setLink({
        title: "",
        image: "",
        status: "active",
        link: ""
        });
      }
    }
  }, [open, action, linkDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    try {
      const endpoint = action === "edit" ? apiUrls.updatelinkCategory : apiUrls.addlinkCategory;
      const payload = { ...link };

      const response = await callAPI(endpoint, {}, "POST", payload);
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
      setLoader(false);
      ErrorMessage("Something went wrong");
    }
  };

  if (!open) return null;
  
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
      const uploadedUrl = apiResponse.data.data; // URL from backend
      setLink((prev) => ({ ...prev, image: uploadedUrl })); // ✅ correct property
      setPreview(uploadedUrl)
    } else {
      ErrorMessage(apiResponse?.data?.message);
    }
  } catch (err) {
    setLoader(false); // ✅ fix
    ErrorMessage("Image upload failed");
  }
};
  
 const UploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await handleFileUpload(files[0]);
    e.target.value = '';
  };

  return (
    <>
      {loader && <LoadScreen />}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-icon">
              {action === "edit" ? <MdEdit /> : <MdAdd />}
            </div>
            <div className="modal-title-section">
              <h2>{action === "edit" ? "Edit" : "Add"} Link</h2>
              <p>Connect your audience to your content</p>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="link-form gap-0">
              <div className="form-section">
                <div className="input-group">
                  <InputField
                    label="Title"
                    name="title"
                    value={link.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter title"
                  />
                </div>

                <div className="input-group">
                  <InputField
                    label="URL"
                    name="link" // ✅ Corrected
                    value={link.link}
                    onChange={handleChange}
                    required
                    placeholder="Enter your URL"
                  />
                </div>
              </div>
                 <div className="form-section">
                                <label className="form-label">
                                  <FaImage className="label-icon" />
                                  Product Image
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
                                        <h4>Upload Product Image</h4>
                                        <p>Drag & drop or click to select</p>
                                        <small>PNG, JPG up to 5MB</small>
                                      </div>
                                    )}
                                  </label>
                                </div>
                              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {action === "edit" ? "Update Link" : "Add Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
