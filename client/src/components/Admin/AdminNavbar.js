import React, { useContext } from 'react'
import avt from '../../assets/img/avt.jpg';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export default function AdminNavbar() {
    const redirect = useHistory();
    const {
        logoutUser,
    } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser();
        redirect.push('/login');
    }
    return (
        <div className='NavBar'>
            <nav className='nav'>
                <div className='profile'>
                    <img src={avt} alt='avatar' />
                </div>

                <ul className='nav-items'>
                    <li className='nav-item'>
                        <NavLink to='/admin/account-manager' exact activeClassName='active'>
                            Quản lý tài khoản
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/admin/partner-manager' exact activeClassName='active'>
                            Quản lý đối tác
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink
                            to='/admin/registration-manager'
                            exact
                            activeClassName='active'
                        >
                            Xét duyệt đơn đăng ký bán hàng
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/admin/store-checker' exact activeClassName='active'>
                            Kiểm tra thông tin cửa hàng
                        </NavLink>
                    </li>
                </ul>

                <footer className='footer'>
                    <Button variant='danger' size='md' onClick={handleLogout.bind(this)}>Đăng xuất</Button>
                </footer>
            </nav>
        </div>
    )
}
