import './App.css';
import './App.scss';
import UserNavbar from './components/User/UserNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Common/Login';
import Register from './components/Common/Register';
import ShipperRegister from './components/User/ShipperRegister';
import SellerRegister from './components/User/SellerRegister';
import GroceryRegister from './components/User/GroceryRegister';
import AuthContextProvider from './contexts/AuthContext';
import PartnerContextProvider from './contexts/PartnerContext';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthContextProvider>
      <PartnerContextProvider>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/shipper-register" component={ShipperRegister} />
            <Route path="/seller-register" component={SellerRegister} />
            <Route path="/grocery-register" component={GroceryRegister} />
            <Route path="/admin" component={Admin} />
            <Route path="/" component={UserNavbar} />
          </Switch>
        </Router>
      </PartnerContextProvider>
    </AuthContextProvider>
  );
}

export default App;
