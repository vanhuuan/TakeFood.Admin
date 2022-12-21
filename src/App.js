import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/Layout/DefaultLayout/Header/Header';
import DefaultLayout from './components/Layout/DefaultLayout';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  // Link
} from "react-router-dom";
import Home from './pages/Home';
import Users from './pages/users/Users';
import Vouchers from './pages/voucher/vouchers';
import Admins from './pages/admins/Admins';
import Stores from './pages/stores/Stores';
import UserOrders from './pages/users/UserOrder';
import OrderDetail from './pages/orders/OrderDetail';
import StoreDetail from './pages/stores/StoreDetails';
import CreateVoucher from './pages/voucher/CreateVoucher';
import UpdateVoucher from './pages/voucher/UpdateVoucher';
import PaymentSuccess from './pages/orders/PaymentSuccess';
import PaymentFaild from './pages/orders/PaymentFailed';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact="true" path="/" element={<><Header /><Home /></>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path='/dashboard' element={<DefaultLayout><Dashboard /></DefaultLayout>}></Route>
          <Route path='/users' element={<DefaultLayout><Users /></DefaultLayout>}></Route>
          <Route path='/vouchers' element={<DefaultLayout><Vouchers /></DefaultLayout>}></Route>
          <Route path='/admins' element={<DefaultLayout><Admins /></DefaultLayout>}></Route>
          <Route path='/stores' element={<DefaultLayout><Stores /></DefaultLayout>}></Route>
          <Route path='/userOrder' element={<DefaultLayout><UserOrders /></DefaultLayout>}></Route>
          <Route path='/orderDetail' element={<DefaultLayout><OrderDetail /></DefaultLayout>}></Route>
          <Route path='/storeDetail' element={<DefaultLayout><StoreDetail /></DefaultLayout>}></Route>
          <Route path='/createVoucher' element={<DefaultLayout><CreateVoucher /></DefaultLayout>}></Route>
          <Route path='/updateVoucher' element={<DefaultLayout><UpdateVoucher /></DefaultLayout>}></Route>
          <Route path='/notifySuccess' element={<PaymentSuccess />}></Route>
          <Route path='/notifyFailed' element={<PaymentFaild />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
