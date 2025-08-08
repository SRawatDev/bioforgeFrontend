import React, { useEffect, useState } from 'react';
import InputField from '../../form/InputField';
import { callAPI } from '../../../utils/apicall.utils';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from '../../../helpers/Success';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';

import {  FaTimes} from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
interface Props {
  open: boolean;
  onClose: () => void;
  Detail: () => void;
  linkDetail: Link;
  action: 'add' | 'edit';
  NonDetail: () => void;
}

interface Link {

    videoTitle: string;
    videoLink: string;
    status: string;
}


export const VideoAddEdit: React.FC<Props> = ({ open, onClose, Detail, linkDetail, action, NonDetail }) => {
  const [loader, setLoader] = useState(false);
  const [link, setLink] = useState<Link>({

    videoTitle: "",
    videoLink: "",
    status: "active"
  });

  useEffect(() => {
    if (open) {
      if (action === "edit") {
        setLink(linkDetail);
      } else {
        setLink({

          videoTitle: "",
          videoLink: "",
          status: "active"
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
      const endpoint = action === "edit" ? apiUrls.updateVideo : apiUrls.addVideo;
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
                    label="Video Title"
                    name="videoTitle"
                    value={link.videoTitle}
                    onChange={handleChange}
                    required
                    placeholder="Enter video title"
                  />
                </div>

                <div className="input-group">
                  <InputField
                    label="Video URL"
                    name="videoLink" // ✅ Corrected
                    value={link.videoLink}
                    onChange={handleChange}
                    required
                    placeholder="Enter your video URL"
                  />
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
