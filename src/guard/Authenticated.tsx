import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface Props {
    children: ReactNode;
}

const Authenticated: React.FC<Props> = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    return <>{children}</>;
};

export default Authenticated;
