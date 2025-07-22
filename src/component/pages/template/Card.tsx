import React, { useState } from 'react';
import './Card.css';
import ImageModal from './ImageModal';

const Card = ({ title, image, description, htmlFile, category, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = () => {
    // Open the HTML file in a new window/tab
    window.open(`/html-pages/${htmlFile}`, '_blank');
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={`card card-${index % 3}`} style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="card-header">
          <span className="category-badge">{category}</span>
          <div className="card-actions">
            <button className="action-btn favorite-btn">♡</button>
            <button className="action-btn share-btn">⤴</button>
          </div>
        </div>
        
        <div className="card-image-container" >
          <img src={image} alt={title} className="card-image" />
          <div className="image-overlay">
            <button className="quick-preview-btn" onClick={handleImageClick}>
              Quick View
            </button>
          </div>
          <div className="image-click-hint">
            <span>Click to view full image</span>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          
          <div className="card-footer">
            {/* <div className="card-meta">
              <span className="views">1.2k views</span>
              <span className="rating">★ 4.8</span>
            </div> */}
            <button className="preview-button" onClick={handlePreview}>
              <span>Preview</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <ImageModal
          image={image}
          title={title}
          description={description}
          category={category}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Card;
