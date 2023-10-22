
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Landing from './Landing';
import Login from './Pages/usermanagement/Login';
import Profile from './Pages/usermanagement/Profile';
import Register from './Pages/usermanagement/Register';
import EmpProfile from './Pages/usermanagement/employeprofile';
import EmpList from './Pages/usermanagement/Listemployees';
import Logout from './Pages/usermanagement/Logout';
import UpdateForm from './Pages/usermanagement/updateEmp';

import BillValidation from './Pages/Refund/BillValidation';
import BillDetails from './Pages/Refund/BillDetails';
import ViewStock from './Pages/Inventory/ViewStock';
import RefundBillDetails from './Pages/Refund/RefundBillDetails';
import ModifyStock from './Pages/Inventory/ModifyStock';
import SearchPage from './Pages/Orders/InStore/SearchPage';
import ProductDetails from './Pages/Orders/InStore/ProductDetails';
import CheckoutPage from './Pages/Orders/InStore/CheckoutPage';
import Invoice from './Pages/Refund/Invoice';
import RepairForm from './Pages/Repair/RepairForm';
import RepairList from './Pages/Repair/RepairList';
import ModifyRepair from './Pages/Repair/ModifyRepair';
import Track from './Pages/Track/TrackRepair';
import {CartProvider} from 'react-use-cart';
import ProductListing from './Pages/Orders/InStore/ProductListing';
import CartPage from './Pages/Orders/InStore/CartPage';
import SpecialOrder from './Pages/SpecialOrder/SpecialOrder';
import SpecialOrderList from './Pages/Track/TrackSpecialOrder';
import SalesReport from './Pages/Sales Report/SalesReport';


function App() {
  const location = useLocation(); // get the current location of the page
  const showNavbar = location.pathname !== "/"; // check if the current path is not "/" (i.e. Login page)
  const showNavbar1 = location.pathname !== "/Login";
  return (
    <div>
      {showNavbar && showNavbar1 && <Navbar />}
      <CartProvider>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/emplist" element={<EmpList />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/updateemployee" element={<UpdateForm />} />
        <Route path="/empprofile" element={<EmpProfile/>}/>
        
        <Route path="/refund" element={<BillValidation/>} />
        <Route path="/billdetails" element={<BillDetails/>} />
        <Route path="/refundBillDetails" element={<RefundBillDetails/>} />
        <Route path="specialOrder" element={<SpecialOrder/>}/>
        <Route path="/salesReport" element={<SalesReport/>}/>

        <Route path="/invoice" element={<Invoice />} replace={true} />
        <Route path="/viewStock" element={<ViewStock/>} />
        <Route path="/modifyStock/:isFromViewStock" element={<ModifyStock /> }/>
        
        <Route path="CartPage" element={<CartPage/>} />
        <Route path="/SearchPage" element={<SearchPage/>} />
        <Route path="/ProductDetails" element={<ProductDetails/>} />
        <Route path="ProductListing" element={<ProductListing/>} />
        <Route path="/CheckoutPage" element={<CheckoutPage/>} />

        <Route path="/createRepair" element={<RepairForm/>} />
        <Route path="/view" element={<RepairList/>}/>
        <Route path="/modifyRepair" element={<ModifyRepair/>}/>
        <Route path="/trackRepair" element={<Track/>}/>
        <Route path="/trackSpecialOrders" element={<SpecialOrderList/>}/>
        
      </Routes>
      </CartProvider>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

