import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
export default function Dashboard() {
    const {
        authState: {
            isAuthenticated,
            user
        }
    } = useContext(AuthContext);
    return (
        <div className="dashboard">
            {isAuthenticated ? (<p className='title'>Xin chào, <span>{(user.username).charAt(0).toUpperCase() + (user.username).slice(1)}</span></p>) : null}
        </div>
    )
}
