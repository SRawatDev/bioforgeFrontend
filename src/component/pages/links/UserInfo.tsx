import React from 'react';

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
    return (
        <div className="user-info-modal">
            <div className="user-info-content">
                <h3>User Details</h3>

                {userInfo.length === 0 ? (
                    <p>No data found.</p>
                ) : (
                    <table className="user-info-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>IP Address</th>
                                <th>Clicks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.map((info, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{info?.userInfo?.username || 'Anonymous'}</td>
                                    <td>{info.ipAddress ? info.ipAddress : "---------------"}</td>
                                    <td>{info.count}{info?.userInfo?.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
