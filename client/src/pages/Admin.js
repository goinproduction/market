import React, { useState } from 'react'
import AdminNavbar from '../components/Admin/AdminNavbar'
import AccountManager from '../components/Admin/AccountManager'
import StoreChecker from '../components/Admin/StoreChecker'
import PartnerManager from '../components/Admin/PartnerManager'
import RegistrationManager from '../components/Admin/RegistrationManager'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard'
export default function Admin() {
    const [navToggle, setNavToggle] = useState(false);

    const navClick = () => {
        setNavToggle(!navToggle);
    };
    return (
        <div className='admin-dashboard'>
            <div className={`sidebar ${navToggle ? 'nav-toggle' : ''}`}>
                <AdminNavbar />
            </div>
            <div className='nav-btn' onClick={navClick}>
                <div className='lines-1'></div>
                <div className='lines-2'></div>
                <div className='lines-3'></div>
            </div>
            <div className='main-content'>
                <div className='content'>
                    <Switch>
                        <Route exact path='/admin/account-manager' component={AccountManager} />
                        <Route exact path="/admin/store-checker" component={StoreChecker} />
                        <Route exact path="/admin/registration-manager" component={RegistrationManager} />
                        <Route exact path="/admin/partner-manager" component={PartnerManager} />
                        <Route exact path="/admin" component={Dashboard} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
