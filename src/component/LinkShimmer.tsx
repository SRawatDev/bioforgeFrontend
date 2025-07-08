import React from 'react';

const LinkShimmer:React.FC = () => {
    return (
        <div className="shimmer-container">
            <div
                className="shimmer-header shimmer-box"
                style={{ width: '60%', height: '20px' }}
            ></div>
            <div className="shimmer-link-card"></div>
            <div className="shimmer-link-card"></div>
            <div className="shimmer-link-card"></div>
            <div className="shimmer-link-card"></div>
            <div className="shimmer-link-card"></div>
            <div className="shimmer-header shimmer-box" style={{ width: '50%', height: '20px', marginTop: '24px' }}
            ></div>
            <div className="shimmer-link-card"></div>
        </div>
    );
};

export default LinkShimmer;
