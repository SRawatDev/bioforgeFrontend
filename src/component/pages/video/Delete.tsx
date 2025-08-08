import React from 'react';
// import './Delete.css';
interface Props {
  open: boolean;
  onClose: () => void;
  linkDetail: Link;
  confirmDetail: () => void;
}

interface Link {
    _id: string;
    videoTitle: string;
    videoLink: string;
    status: string;
}

const Delete: React.FC<Props> = ({ open, onClose, linkDetail, confirmDetail }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete Confirmation</h3>
        <p>
          Are you sure you want to delete <strong>{linkDetail.videoTitle}</strong>?
        </p>
        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn submit" onClick={confirmDetail}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
