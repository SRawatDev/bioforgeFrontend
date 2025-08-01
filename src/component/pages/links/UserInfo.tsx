import React from 'react';
import { FaTimes, FaUser, FaGlobe, FaMousePointer, FaChartBar, FaUsers } from 'react-icons/fa';
import { MdAnalytics } from 'react-icons/md';
import './UserInfo.css';

interface GetUser {
    username?: string;
    count?: number;
}

export interface Clicks {
    userInfo: GetUser;
    ipAddress: string;
    count: string;
}

interface Props {
    userInfo: Clicks[];
    onClose: () => void;
    visible: boolean;
}

const UserInfo: React.FC<Props> = ({ userInfo, onClose, visible }) => {
    if (!visible) return null;
    const totalClick1 = userInfo.reduce((sum, info) => sum + parseInt(info.count || '0'), 0);
    const totalClicks2 = userInfo.reduce(  (sum, info) => sum + parseInt(String(info?.userInfo?.count || '0')),  0 );
    const totalClicks = totalClick1 + totalClicks2
    const uniqueUsers = userInfo.filter(info => info.userInfo?.username).length;
    const anonymousClicks = userInfo.filter(info => !info.userInfo?.username).length;

    return (
        <div className="user-info-overlay" onClick={onClose}>
            <div className="user-info-container" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="user-info-header">
                    <div className="header-icon">
                        <MdAnalytics />
                    </div>
                    <div className="header-content">
                        <h2>Analytics Dashboard</h2>
                        <p style={{ color: 'white' }}>Detailed insights about your link interactions</p>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card total-clicks">
                        <div className="stat-icon">
                            <FaMousePointer />
                        </div>
                        <div className="stat-content">
                            <h3>{totalClicks}</h3>
                            <p>Total Clicks</p>
                        </div>
                    </div>
                    <div className="stat-card unique-users">
                        <div className="stat-icon">
                            <FaUsers />
                        </div>
                        <div className="stat-content">
                            <h3>{uniqueUsers}</h3>
                            <p>Registered Users</p>
                        </div>
                    </div>
                    <div className="stat-card anonymous-clicks">
                        <div className="stat-icon">
                            <FaGlobe />
                        </div>
                        <div className="stat-content">
                            <h3>{anonymousClicks}</h3>
                            <p>Anonymous Clicks</p>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="table-section">
                    <div className="table-header">
                        <h3>
                            <FaChartBar />
                            Detailed Analytics
                        </h3>
                        <span className="data-count">{userInfo.length} entries</span>
                    </div>

                    {userInfo.length === 0 ? (
                        <div className="no-data">
                            <div className="no-data-icon">
                                <FaChartBar />
                            </div>
                            <h4>No Analytics Data</h4>
                            <p>Start sharing your links to see analytics data here.</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="analytics-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <span className="th-content">
                                                <span className="th-icon">#</span>
                                                Rank
                                            </span>
                                        </th>
                                        <th>
                                            <span className="th-content">
                                                <FaUser className="th-icon" />
                                                User
                                            </span>
                                        </th>
                                        <th>
                                            <span className="th-content">
                                                <FaGlobe className="th-icon" />
                                                IP Address
                                            </span>
                                        </th>
                                        <th>
                                            <span className="th-content">
                                                <FaMousePointer className="th-icon" />
                                                Clicks
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userInfo.map((info, index) => (
                                        <tr key={index} className="table-row">
                                            <td>
                                                <span className="rank-badge">
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar">
                                                        {info?.userInfo?.username ? (
                                                            <FaUser />
                                                        ) : (
                                                            <span>?</span>
                                                        )}
                                                    </div>
                                                    <div className="user-info">
                                                        <span className="username" style={{color:"black",fontSize:"18px"}}>
                                                            {info?.userInfo?.username || 'Anonymous User '}
                                                        </span>
                                                        <span className="user-type">
                                                            {info?.userInfo?.username ? ' (Registered)' : ' (Guest)'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="ip-address">
                                                    {info.ipAddress || (
                                                        <span className="no-ip">Not tracked</span>
                                                    )}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="clicks-cell">
                                                    <span className="click-count">
                                                        {info.count || info?.userInfo?.count || 0}
                                                    </span>
                                                    <div className="click-bar">
                                                        <div
                                                            className="click-fill"
                                                            style={{
                                                                width: `${Math.min((parseInt(info.count || '0') / Math.max(totalClicks, 1)) * 100, 100)}%`
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <div className="footer-info">
                        <small>Data updates in real-time as users interact with your links</small>
                    </div>
                    <button className="close-footer-btn" onClick={onClose}>
                        Close Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
