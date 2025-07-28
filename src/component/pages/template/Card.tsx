//chnage the  layout design of card in mobile portrait mode
import './Card.css';
import type { ThemeData } from './landingPage';
import { defaultConfig } from '../../../config';
import { useNavigate } from 'react-router-dom';
const Card = ({ themeName, themeImg, themeDiscription }: ThemeData) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("_id");
  const navigate = useNavigate()
  const isloginCheck = () => {
    if (isLoggedIn) {
      navigate(`/dashboard/updateProfile/${userId}`)
    } else {
      navigate("/register")
    }
  }

  return (
    <>
      <div className={`card card`}>
        <div className="card-header">
          <div className="card-actions">
            <button type="button" className="action-btn favorite-btn">♡</button>
            <button type="button" className="action-btn share-btn">⤴</button>
          </div>
        </div>

        <div className="card-image-container">
          <img src={defaultConfig.baseAPIUrl + "images/" + themeImg} alt={themeName} className="card-image" />
          <div className="image-overlay">
            <button type="button" className="quick-preview-btn" onClick={isloginCheck}>
              Quick View
            </button>
          </div>
          <div className="image-click-hint">
            <span>Click to view full image</span>
          </div>
        </div>

        <div className="card-content">
          <h3 className="card-title">{themeName}</h3>
          <p className="card-description">{themeDiscription}</p>

          <div className="card-footer">
            <button type="button" className="preview-button">
              <span>Preview</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* {isModalOpen && (
        <ImageModal
          image={image}
          title={title}
          description={description}
          category={category}
          onClose={closeModal}
        />
      )} */}
    </>
  );
};

export default Card;
