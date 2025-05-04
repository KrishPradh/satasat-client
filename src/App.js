import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Landingpage/Home';
import About from './components/About/About';
import Navbar  from './components/Navbar/Nav';
import Signup from './components/LoginSignup/SignUp';
import Footer from './components/Footer/Footer';
import Rent from './components/Rent/Rent';
import Exchange from './components/BookExchange/Exchange';
// import Buysell from './components/Buysell';
import Login from './components/LoginSignup/Login';
import Post from './components/Post/Post';
// import Viewpage from './components/Viewpage/Viewpage';
import ExchangeForm from './components/BookExchange/ExchangeForm';
import Profile from './components/ProfilePage/Profile';
import Buysell from './components/Buysell/Buysell';
import ExchangeViewpage from './components/Viewpage/ExchangeViewpage';
import RentViewpage from './components/Viewpage/RentViewPage';
import BuysellViewpage from './components/Viewpage/BuysellViewPage';
import RentForm from './components/Rent/RentForm';
// import BuySellForm from './components/Buysell/BuysellForm';
import RentReqPage from './components/RentRequestPage/RentRequestPage';
import ExchangeReqPage from './components/ExchangeRequestPage/ExchangeReqPage';
import RequestBookDetail from './components/ExchangeRequestPage/RequestBookDetail';
import RentRequestBookDetail from './components/RentRequestPage/RentRequestBookDetail';
import Viewpage from './components/Viewpage/Viewpage';
import { ToastContainer } from 'react-toastify';
import Cart from './components/Cart/Cart';
// import Chat from './components/Chat/Chat';
import Dashboard from '../src/admin/dashboard';
import AdminUser from './admin/AdminUser';
import AdminBooks from './admin/Admin-books';
import PaymentPage from './components/CheckoutPage/PaymentPage';
import AdminLogin from './admin/Admin-login';
import PaymentSuccess from './components/CheckoutPage/PaymentSuccess';
import OrderHistory from './components/Orderhistory/Orderhistory';
import AdminPost from './admin/Admin-bookpost';
import Buynew from './components/BuyNew/Buynew';
// import AdminBookViewpage from './admin/AdminBook-Viewpage';
import BuyNowCheckout from './admin/Checkout';
// import PaymentButtons from './admin/PaymentButtons';
// import AdminViewpage from './admin/Adminbookviewpage';
import PaymentSuccessPage from './admin/PaymentSuccessPage';
import BuysellBookViewpage from './components/Buysell/Buysell-Viewpage';
import AdminViewpage from './admin/Adminbookviewpage';
import CodPaymentSuccess from './admin/CodPaymentSuccess';
import Notification from './components/Notification/Notification';
import QRPaymentRequests from './components/Orderhistory/Qrhistory';
import OrderConfirmed from './components/Orderhistory/Orderconfirmed';
import AdminOrderHistory from './admin/Orderhistory';
import Verifyemail from './components/LoginSignup/Verifyemail';
import AdminNotification from './admin/AdminNotification';
import EditPost from './components/ProfilePage/EditPost';
import { ForgotPassword } from './components/LoginSignup/Forgetpassword';
import { ResetPassword } from './components/LoginSignup/ResetPassword';
// import ResetPassword from './components/LoginSignup/ResetPassword';
// import Checkout from './admin/Checkout';
// import AdminUser from './admin/AdminUser';


function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const removeNavFOtter = location.pathname === '/Login' ||location.pathname === '/login' ||location.pathname === '/reset-password'||location.pathname === '/verifyemail'||location.pathname === '/forgot-password'|| location.pathname === '/Signup'||location.pathname.includes("admin")
  return (
    
    <div className="App">
      
      {!removeNavFOtter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/Contact' element={<Contact />} /> */}
        
        <Route path='/About' element={<About />} />
        <Route path='/buysell' element={<Buysell/>} />
        <Route path='/Rent' element={<Rent/>} />
        <Route path='/Exchange' element={<Exchange />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/verifyemail' element={<Verifyemail />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/post' element={<Post/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/exchange-request' element={<ExchangeReqPage/>} />
        <Route path='/rent-request' element={<RentReqPage/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/exchangeviewpage/:bookId' element={<ExchangeViewpage/>} />
        <Route path='/viewpage/:bookId' element={<Viewpage/>} />
        <Route path='/rentviewpage/:bookId' element={<RentViewpage/>} />
        <Route path='/buysellviewpage/:bookId' element={<BuysellViewpage/>} />
        <Route path='/exchange-form' element={<ExchangeForm/>} />
        <Route path='/rent-form' element={<RentForm/>} />
        <Route path='/checkout/:bookId' element={<PaymentPage/>} />
        <Route path='/requestbookdetail/:id' element={<RequestBookDetail/>} />
        <Route path='/rentrequestbookdetail/:id' element={<RentRequestBookDetail/>} />
        {/* <Route path='/chat' element={<Chat/>} /> */}
        <Route path='/success' element={<PaymentSuccess/>} />
        <Route path='/myorders' element={<OrderHistory/>} />
        {/* <Route path='/myqr' element={<QRPaymentRequests/>} /> */}
        <Route path='/notifications' element={<Notification/>} />
        <Route path='/order-success' element={<OrderConfirmed/>} />
        {/* <Route path='/editpost' element={<EditPost/>} /> */}


        {/* Admin */}
        <Route path='/admin-dashboard' element={<Dashboard/>} />
        <Route path='/adminUser' element={<AdminUser/>} />
        <Route path='/adminBooks' element={<AdminBooks/>} />
        <Route path='/adminLogin' element={<AdminLogin/>} />
        <Route path='/adminPost' element={<AdminPost/>} />
        <Route path='/buynew' element={<Buynew/>} />
        <Route path='/buysell-viewpage/:bookId' element={<BuysellBookViewpage/>} />
        <Route path='/buynew-viewpage/:bookId' element={<AdminViewpage/>} />
        <Route path='/adminorderhistory' element={<AdminOrderHistory/>} />
        <Route path='/admin-notification' element={<AdminNotification/>} />
        {/* <Route path='/buynew-checkout/:bookId' element={<BuyNowCheckout/>} /> */}
        <Route path='/buynew-checkout/' element={<BuyNowCheckout/>} />
        <Route path='/khaltipay/successful' element={<PaymentSuccessPage/>} />
        <Route path='/codpay/successful' element={<CodPaymentSuccess/>} />
      </Routes>
      
      {!removeNavFOtter&&<Footer/>}
    </div>
  );
}

export default App;
