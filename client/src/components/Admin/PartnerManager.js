import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import SellerPartner from './SellerPartner';
import ShipperPartner from './ShipperPartner';

export default function PartnerManager() {
    const [select, setSelect] = useState('ban-hang');
    return (
        <div className="partner-manager">
            <h1 className="auth-title">QUẢN LÝ THÔNG TIN ĐỐI TÁC</h1>
            <Navbar collapseOnSelect expand="md" style={{ fontSize: '1.3rem' }}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className={select === 'ban-hang' ? 'link active' : 'link'} onClick={() => setSelect('ban-hang')}>Đối tác bán hàng</Nav.Link>
                        <Nav.Link className={select === 'giao-hang' ? 'link active' : 'link'} onClick={() => setSelect('giao-hang')}>Đối tác giao hàng</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
            {
                select === 'ban-hang' ? <SellerPartner /> : <ShipperPartner />
            }
        </div>
    )
}
