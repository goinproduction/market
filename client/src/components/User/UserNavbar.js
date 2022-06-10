import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

export default function UserNavbar() {
    const redirect = useHistory();
    const {
        authState: {
            isAuthenticated,
            user,
            username
        },
        logoutUser,
    } = useContext(AuthContext);
    console.log(isAuthenticated);
    const logout = () => logoutUser();
    return (
        <Navbar bg="light" expand="lg" style={{ fontSize: '1.1rem' }}>
            <Container>
                <Navbar.Brand href="#">
                    <img src={logo} style={{ height: '55px', width: '55px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='link'>Trang chủ</Nav.Link>
                        {isAuthenticated ? (<NavDropdown title="Trở thành đối tác" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => redirect.push('/seller-register')} >Đăng ký bán hàng</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => redirect.push('/shipper-register')}>Đăng ký giao hộ</NavDropdown.Item>
                        </NavDropdown>) : null}
                    </Nav>
                    {isAuthenticated ? (<Nav>
                        <Nav.Link className='link'>Xin chào, {(user.username).charAt(0).toUpperCase() + (user.username).slice(1)}!</Nav.Link>
                        <Nav.Link className='link' onClick={logout}>
                            Đăng xuất
                        </Nav.Link>
                    </Nav>) : (<Nav>
                        <Nav.Link className='link' onClick={() => redirect.push('/login')}>Đăng nhập</Nav.Link>
                        <Nav.Link className='link' onClick={() => redirect.push('/register')}>
                            Đăng ký
                        </Nav.Link>
                    </Nav>)
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
