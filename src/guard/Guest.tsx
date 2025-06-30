import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface Props {
    children: ReactNode;
}
const Guest: React.FC<Props> = ({ children }) => {
    console.log("======",children)
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate]);
    return (
        <>{children}</>
    )
}

export default Guest