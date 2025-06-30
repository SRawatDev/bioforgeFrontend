import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  linkDetail: Link;
  confirmDetail: () => void;
}

interface Link {
  _id?: string;
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
}

const Delete: React.FC<Props> = ({ open, onClose, linkDetail, confirmDetail }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete Confirmation</h3>
        <p>
          Are you sure you want to delete <strong>{linkDetail.linkTitle}</strong>?
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
