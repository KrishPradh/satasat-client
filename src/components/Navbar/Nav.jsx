// import React, { useEffect, useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import logo from '../../Images/logo.png';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [profileDropdown, setProfileDropdown] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const profileRef = useRef(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch user data
//         const userResponse = await axios.get(`${baseURL}/api/user`, { withCredentials: true });
//         if (userResponse.data.success) {
//           setUser(userResponse.data.user);

//           // Fetch cart data for logged-in user
//           const cartResponse = await axios.get(`${baseURL}/api/cart/getcart`, { withCredentials: true });
//           const cartData = cartResponse.data;

//           if (cartData.books) {
//             const totalItems = cartData.books.reduce((total, item) => total + item.quantity, 0);
//             setCartCount(totalItems);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileDropdown(false);
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownVisible(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handlePostClick = () => {
//     navigate('/post');
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
//       alert('Logout successful!');
//       localStorage.removeItem('token');
//       localStorage.removeItem('userId');
//       // localStorage.removeItem('cart');
//       window.location.href = '/';
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-gradient-to-r from-[#2C5282] to-[#3b67a3] px-6 py-3 z-10 shadow-md">
//       {/* Logo */}
//       <Link to="/" className="flex items-center space-x-2">
//         <img src={logo} alt="Logo" className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform" />
//       </Link>

//       {/* Navbar Links */}
//       <ul className="hidden md:flex gap-8 items-center text-white">
//         <li><Link to="/" className="text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all">Home</Link></li>
//         <li><Link to="/Buysell" className="text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all">Buy/Sell</Link></li>
//         <li><Link to="/Exchange" className="text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all">Exchange</Link></li>
//         <li><Link to="/Rent" className="text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all">Rent</Link></li>

//         {/* Requests Dropdown */}
//         <li className="relative" ref={dropdownRef}>
//           <button onClick={toggleDropdown} className="text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all flex items-center">
//             Requests
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>

//           {dropdownVisible && (
//             <ul className="absolute top-10 right-0 bg-white text-[#2C5282] w-48 shadow-lg rounded-lg overflow-hidden">
//               <li><Link to="/exchange-request" className="block px-4 py-2 hover:bg-blue-50" onClick={() => setDropdownVisible(false)}>Exchange Request</Link></li>
//               <li><Link to="/rent-request" className="block px-4 py-2 hover:bg-blue-50" onClick={() => setDropdownVisible(false)}>Rent Request</Link></li>
//               <li><Link to="/rent-request" className="block px-4 py-2 hover:bg-blue-50" onClick={() => setDropdownVisible(false)}>Orders</Link></li>
//             </ul>
//           )}
//         </li>

//         <li><Link to="/About" className="text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all">About us</Link></li>
//       </ul>

//       {/* Mobile Menu Button */}
//       <button className="md:hidden text-white">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Auth/Profile Section */}
//       <div className="flex gap-4 items-center relative" ref={profileRef}>
//         {/* Shopping Cart Icon */}
//         <Link to="/cart" className="text-white relative">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//           </svg>
//           {/* Cart Item Counter Badge */}
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//             {cartCount}
//           </span>
//         </Link>

//         <button className="bg-slate-900 text-white px-4 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors" onClick={handlePostClick}>
//           + Post for Free
//         </button>

//         {user ? (
//           <div className="relative">
//             <button onClick={() => setProfileDropdown(!profileDropdown)} className="flex items-center space-x-2">
//               <img src={user.profilePicture || 'https://via.placeholder.com/40'} alt="Profile" className="w-9 h-9 rounded-full border-2 border-white" />
//               <span className="text-white text-sm hidden sm:block">{user.name}</span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>

//             {profileDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
//                 <div className="p-3 border-b border-gray-100">
//                   <p className="font-medium">{user.name}</p>
//                   <p className="text-xs text-gray-500">{user.email || 'user@example.com'}</p>
//                 </div>
//                 <Link to="/profile" className="block px-4 py-2 hover:bg-blue-50" onClick={() => setProfileDropdown(false)}>My Profile</Link>
//                 <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Logout</button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => navigate('/Login')}>
//             Login
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


///////////////////

// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../../Images/logo.png";
// import { toast } from "react-toastify";
// // import { Bell } from "lucide-react";
// import { CartContext } from "../../Context/CartContext";
// import { NotificationContext } from "../../Context/NotificationContext";

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [profileDropdown, setProfileDropdown] = useState(false);
//   // const [cartCount, setCartCount] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   // const [notificationCount, setNotificationCount] = useState(3);
//   const profileRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   const { cartItems, fetchCartData } = useContext(CartContext);
//   const { notifications,fetchNotifications } = useContext(NotificationContext);

//   // console.log(cartItems?.length, "cartitems");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch user data
//         const userResponse = await axios.get(`${baseURL}/api/user`, { withCredentials: true });
//         if (userResponse.data.success) {
//           setUser(userResponse.data.user);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
    
//     fetchData();
//     // fetchCartData();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileDropdown(false);
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownVisible(false);
//       }
//       if (
//         mobileMenuRef.current &&
//         !mobileMenuRef.current.contains(event.target) &&
//         event.target.id !== "mobile-menu-button"
//       ) {
//         setMobileMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handlePostClick = () => {
//     // Check if user is logged in
//     if (!user) {
//       // Show error toast message
//       toast.error("Please login to post a listing", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       // Navigate to login page after a short delay
//       // setTimeout(() => {
//       //   navigate('/Login');
//       // }, 1000);
//     } else {
//       navigate("/post");
//     }
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
//       toast.success("Logout successful!");
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const handleMobileNavigation = (path) => {
//     navigate(path);
//     setMobileMenuOpen(false);
//     setDropdownVisible(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-gradient-to-r from-[#2C5282] to-[#3b67a3] px-4 sm:px-6 py-3 z-10 shadow-md">
//       {/* Logo */}
//       <Link to="/" className="flex items-center space-x-2">
//         <img
//           src={logo}
//           alt="Logo"
//           className="h-8 sm:h-10 w-auto cursor-pointer hover:scale-105 transition-transform"
//         />
//       </Link>

//       {/* Navbar Links - Desktop */}
//       <ul className="hidden md:flex gap-4 lg:gap-8 items-center text-white">
//         <li>
//           <Link
//             to="/"
//             className="text-base lg:text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all"
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/Buysell"
//             className="text-base lg:text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all"
//           >
//             Buy/Sell
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/Buynew"
//             className="text-base lg:text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all"
//           >
//             BuyNew
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/Exchange"
//             className="text-base lg:text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all"
//           >
//             Exchange
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/Rent"
//             className="text-base lg:text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all"
//           >
//             Rent
//           </Link>
//         </li>

//         {/* Requests Dropdown */}
//         <li className="relative" ref={dropdownRef}>
//           <button
//             onClick={toggleDropdown}
//             className="text-base lg:text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all flex items-center"
//           >
//             Requests
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 ml-1"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>

//           {dropdownVisible && (
//             <ul className="absolute top-10 right-0 bg-white text-[#2C5282] w-48 shadow-lg rounded-lg overflow-hidden">
//               <li>
//                 <Link
//                   to="/exchange-request
//               "
//                   className="block px-4 py-2 hover:bg-blue-50"
//                   onClick={() => setDropdownVisible(false)}
//                 >
//                   Exchange Request
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/rent-request"
//                   className="block px-4 py-2 hover:bg-blue-50"
//                   onClick={() => setDropdownVisible(false)}
//                 >
//                   Rent Request
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/myorders"
//                   className="block px-4 py-2 hover:bg-blue-50"
//                   onClick={() => setDropdownVisible(false)}
//                 >
//                   Orders
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>

//         <li>
//           <Link
//             to="/About"
//             className="text-base lg:text-lg font-medium hover:text-blue-200 border-b-2 border-transparent hover:border-white transition-all"
//           >
//             About us
//           </Link>
//         </li>
//       </ul>

//       {/* Mobile Menu Button */}
//       <button
//         id="mobile-menu-button"
//         className="md:hidden text-white p-1 rounded-md hover:bg-blue-700 transition-colors"
//         onClick={toggleMobileMenu}
//       >
//         {mobileMenuOpen ? (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         ) : (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         )}
//       </button>

//       <div
//         className="flex gap-2 sm:gap-4 items-center relative"
//         ref={profileRef}
//       >
//         <Link to="/notifications" className="text-white relative">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//             />
//           </svg>
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//             {notifications?.length || 0}
//           </span>
//         </Link>

//         <Link to="/cart" className="text-white relative">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//             />
//           </svg>
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//             {cartItems?.length}
//           </span>
//         </Link>

//         <button
//           className="hidden sm:block bg-slate-900 text-white px-3 py-2 text-sm sm:text-base sm:px-4 sm:py-2 rounded-full font-medium hover:bg-slate-800 transition-colors shadow-md"
//           onClick={handlePostClick}
//         >
//           + Post for Free
//         </button>

//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => setProfileDropdown(!profileDropdown)}
//               className="flex items-center space-x-1 sm:space-x-2"
//             >
//               <span className="text-white text-sm hidden sm:block">
//                 {user.name}
//               </span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-white hidden sm:block"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>

//             {profileDropdown && (
//               <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-20">
//                 <div className="p-3 border-b border-gray-100 bg-blue-50">
//                   <p className="font-medium">{user.name}</p>
//                   <p className="text-xs text-gray-500 truncate">
//                     {user.email || "user@example.com"}
//                   </p>
//                 </div>
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 hover:bg-blue-50 transition-colors"
//                   onClick={() => setProfileDropdown(false)}
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 mr-2 text-blue-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     My Profile
//                   </div>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 mr-2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                       />
//                     </svg>
//                     Logout
//                   </div>
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button
//             className="text-sm sm:text-base bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
//             onClick={() => navigate("/Login")}
//           >
//             Login
//           </button>
//         )}
//       </div>

//       {mobileMenuOpen && (
//         <div
//           ref={mobileMenuRef}
//           className="fixed top-14 left-0 w-full h-auto max-h-screen overflow-y-auto bg-[#2C5282] shadow-xl md:hidden z-20 transition-all duration-300 ease-in-out"
//           style={{
//             opacity: mobileMenuOpen ? 1 : 0,
//             transform: `translateY(${mobileMenuOpen ? "0" : "-10px"})`,
//           }}
//         >
//           <div className="p-2">
//             {user && (
//               <div className="flex items-center space-x-3 p-3 mb-2 bg-blue-700 rounded-lg">
//                 <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white">
//                   <img
//                     src={
//                       user.profilePicture || "https://via.placeholder.com/40"
//                     }
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-white font-medium">{user.name}</p>
//                   <p className="text-blue-200 text-xs truncate">
//                     {user.email || "user@example.com"}
//                   </p>
//                 </div>
//               </div>
//             )}

//             <ul className="rounded-lg overflow-hidden bg-blue-600 shadow-inner">
//               <li>
//                 <button
//                   onClick={() => handleMobileNavigation("/")}
//                   className="w-full text-left px-4 py-3 border-b border-blue-500 hover:bg-blue-700 text-white flex items-center"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                     />
//                   </svg>
//                   Home
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleMobileNavigation("/Buysell")}
//                   className="w-full text-left px-4 py-3 border-b border-blue-500 hover:bg-blue-700 text-white flex items-center"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                   Buy/Sell
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleMobileNavigation("/Buynew")}
//                   className="w-full text-left px-4 py-3 border-b border-blue-500 hover:bg-blue-700 text-white flex items-center"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                   BuyNew
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleMobileNavigation("/Exchange")}
//                   className="w-full text-left px-4 py-3 border-b border-blue-500 hover:bg-blue-700 text-white flex items-center"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                     />
//                   </svg>
//                   Exchange
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleMobileNavigation("/Rent")}
//                   className="w-full text-left px-4 py-3 border-b border-blue-500 hover:bg-blue-700 text-white flex items-center"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   Rent
//                 </button>
//               </li>

//               {/* Mobile Requests menu */}
//               <li className="border-b border-blue-500">
//                 <button
//                   onClick={toggleDropdown}
//                   className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-blue-700 text-white"
//                 >
//                   <div className="flex items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 mr-2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                       />
//                     </svg>
//                     Requests
//                   </div>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className={`h-4 w-4 transition-transform duration-200 ${
//                       dropdownVisible ? "rotate-180" : ""
//                     }`}
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>

//                 {dropdownVisible && (
//                   <ul className="bg-blue-800 transition-all duration-200">
//                     <li>
//                       <button
//                         onClick={() =>
//                           handleMobileNavigation("/exchange-request")
//                         }
//                         className="w-full text-left px-6 py-3 border-b border-blue-700 hover:bg-blue-700 text-blue-200 flex items-center"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 mr-2"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
//                           />
//                         </svg>
//                         Exchange Request
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         onClick={() => handleMobileNavigation("/rent-request")}
//                         className="w-full text-left px-6 py-3 border-b border-blue-700 hover:bg-blue-700 text-blue-200 flex items-center"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 mr-2"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                           />
//                         </svg>
//                         Rent Request
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         onClick={() => handleMobileNavigation("/orders")}
//                         className="w-full text-left px-6 py-3 hover:bg-blue-700 text-blue-200 flex items-center"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 mr-2"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                           />
//                         </svg>
//                         Orders
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <button
//                   onClick={() => handleMobileNavigation("/About")}
//                   className="w-full text-left px-4 py-3 border-b border-blue-500 hover:bg-blue-700 text-white flex items-center"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   About us
//                 </button>
//               </li>

//               {user && (
//                 <li>
//                   <button
//                     onClick={() => handleMobileNavigation("/profile")}
//                     className="w-full text-left px-4 py-3 border-b border-blue-500 hover:bg-blue-700 text-white flex items-center"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 mr-2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     My Profile
//                   </button>
//                 </li>
//               )}

//               {user && (
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-3 border-b border-blue-500 hover:bg-red-600 text-white flex items-center"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 mr-2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                       />
//                     </svg>
//                     Logout
//                   </button>
//                 </li>
//               )}
//             </ul>

//             <div className="mt-4 px-2">
//               <button
//                 onClick={() => {
//                   handlePostClick();
//                   setMobileMenuOpen(false);
//                 }}
//                 className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-2"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   />
//                 </svg>
//                 Post for Free
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




// updated
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../Images/logo.png";
import { toast } from "react-toastify";
import { CartContext } from "../../Context/CartContext";
import { NotificationContext } from "../../Context/NotificationContext";
import { Menu, X, ChevronDown, Bell, ShoppingCart, LogOut, User, Home, Package, RotateCw, Clock, Info, Plus, Menu as MenuIcon } from "lucide-react";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { cartItems, fetchCartData } = useContext(CartContext);
  const { notifications, fetchNotifications } = useContext(NotificationContext);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${baseURL}/api/user`, { withCredentials: true });
        if (userResponse.data.success) {
          setUser(userResponse.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchData();
  }, []);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        event.target.id !== "mobile-menu-button"
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if user is logged in for posting
  const handlePostClick = () => {
    if (!user) {
      toast.error("Please login to post a listing", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      navigate("/post");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
      toast.success("Logout successful!");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDropdownVisible(false); // This ensures the dropdown closes when navigating
  };
  
  // Helper function to render nav links with animation
  const NavLink = ({ to, children, className = "" }) => (
    <Link
      to={to}
      className={`text-base font-medium text-white transition-all duration-300 hover:text-blue-200 relative group ${className}`}
    >
      <span className="inline-block">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Main navbar */}
      <div className="bg-gradient-to-r from-[#2C5282] to-[#3b67a3] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-10 w-auto transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/Buysell">Buy/Sell</NavLink>
              <NavLink to="/Buynew">BuyNew</NavLink>
              <NavLink to="/Exchange">Exchange</NavLink>
              <NavLink to="/Rent">Rent</NavLink>
              
              {/* Requests dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="text-base font-medium text-white group flex items-center space-x-1 hover:text-blue-200 transition-all duration-300"
                >
                  <span>Requests</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${dropdownVisible ? 'rotate-180' : ''}`} 
                  />
                </button>

                {dropdownVisible && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-lg shadow-xl overflow-hidden transform origin-top transition-all duration-200 ease-out z-50 border border-gray-200">
                    <div className="py-1">
                      <Link
                        to="/exchange-request"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center"
                        onClick={() => setDropdownVisible(false)}
                      >
                        <RotateCw size={16} className="mr-2 text-blue-600" />
                        Exchange Request
                      </Link>
                      <Link
                        to="/rent-request"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center"
                        onClick={() => setDropdownVisible(false)}
                      >
                        <Clock size={16} className="mr-2 text-blue-600" />
                        Rent Request
                      </Link>
                      <Link
                        to="/myorders"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center"
                        onClick={() => setDropdownVisible(false)}
                      >
                        <Package size={16} className="mr-2 text-blue-600" />
                        Orders
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <NavLink to="/About">About us</NavLink>
            </div>

            {/* User actions - desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notification icon */}
              <Link to="/notifications" className="relative text-white p-1.5 rounded-full hover:bg-blue-900 transition-colors">
                <Bell size={20} />
                {notifications?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {notifications.length}
                  </span>
                )}
              </Link>

              {/* Cart icon */}
              <Link to="/cart" className="relative text-white p-1.5 rounded-full hover:bg-blue-900 transition-colors">
                <ShoppingCart size={20} />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Post button */}
              <button
                className="bg-white text-blue-900 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-md flex items-center space-x-1"
                onClick={handlePostClick}
              >
                <Plus size={16} />
                <span>Post for Free</span>
              </button>

              {/* User menu */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center space-x-1 bg-blue-900 hover:bg-blue-800 transition-colors px-3 py-1.5 rounded-full"
                  >
                    <span className="text-white text-sm font-medium">{user.name}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-white transition-transform duration-300 ${profileDropdown ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200">
                      <div className="p-4 border-b border-gray-100 bg-blue-50">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {user.email || "user@example.com"}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <User size={16} className="mr-2 text-blue-600" />
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-3 md:hidden">
              {/* Notification and cart icons for mobile */}
              <Link to="/notifications" className="relative text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors">
                <Bell size={20} />
                {notifications?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {notifications.length}
                  </span>
                )}
              </Link>
              
              <Link to="/cart" className="relative text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors">
                <ShoppingCart size={20} />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              
              <button
                id="mobile-menu-button"
                className="text-white p-1.5 rounded-md hover:bg-blue-700 transition-colors"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <MenuIcon size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-blue-900 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto pb-12">
          <div className="px-4 pt-5 pb-6 flex justify-between items-center border-b border-blue-800">
            <h2 className="text-lg font-bold text-white">Menu</h2>
            <button
              className="text-white p-1 rounded-md hover:bg-blue-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* User info for mobile */}
          {user && (
            <div className="px-4 py-4 border-b border-blue-800">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-blue-300 text-xs truncate">
                    {user.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile navigation links */}
          <div className="px-2 py-2">
            <div className="space-y-1">
              <button
                onClick={() => handleMobileNavigation("/")}
                className="w-full flex items-center px-3 py-3 text-base font-medium text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Home size={20} className="mr-3 text-blue-300" />
                Home
              </button>
              
              <button
                onClick={() => handleMobileNavigation("/Buysell")}
                className="w-full flex items-center px-3 py-3 text-base font-medium text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Package size={20} className="mr-3 text-blue-300" />
                Buy/Sell
              </button>
              
              <button
                onClick={() => handleMobileNavigation("/Buynew")}
                className="w-full flex items-center px-3 py-3 text-base font-medium text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Package size={20} className="mr-3 text-blue-300" />
                BuyNew
              </button>
              
              <button
                onClick={() => handleMobileNavigation("/Exchange")}
                className="w-full flex items-center px-3 py-3 text-base font-medium text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <RotateCw size={20} className="mr-3 text-blue-300" />
                Exchange
              </button>
              
              <button
                onClick={() => handleMobileNavigation("/Rent")}
                className="w-full flex items-center px-3 py-3 text-base font-medium text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Clock size={20} className="mr-3 text-blue-300" />
                Rent
              </button>
              
              {/* Mobile Requests dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-white hover:bg-blue-800 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Package size={20} className="mr-3 text-blue-300" />
                    Requests
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-blue-300 transition-transform duration-300 ${dropdownVisible ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {dropdownVisible && (
                  <div className="pl-4 pb-1 space-y-1 bg-blue-800 rounded-b-lg mt-1">
                    <button
                      onClick={() => handleMobileNavigation("/exchange-request")}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-blue-200 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <RotateCw size={16} className="mr-3 text-blue-300" />
                      Exchange Request
                    </button>
                    
                    <button
                      onClick={() => handleMobileNavigation("/rent-request")}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-blue-200 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Clock size={16} className="mr-3 text-blue-300" />
                      Rent Request
                    </button>
                    
                    <button
                      onClick={() => handleMobileNavigation("/myorders")}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-blue-200 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Package size={16} className="mr-3 text-blue-300" />
                      Orders
                    </button>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleMobileNavigation("/About")}
                className="w-full flex items-center px-3 py-3 text-base font-medium text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Info size={20} className="mr-3 text-blue-300" />
                About us
              </button>
              
              {user && (
                <button
                  onClick={() => handleMobileNavigation("/profile")}
                  className="w-full flex items-center px-3 py-3 text-base font-medium text-white hover:bg-blue-800 rounded-lg transition-colors"
                >
                  <User size={20} className="mr-3 text-blue-300" />
                  My Profile
                </button>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-blue-800">
              {/* Post button for mobile */}
              <button
                onClick={() => {
                  handlePostClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center bg-white text-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md space-x-2"
              >
                <Plus size={18} />
                <span>Post for Free</span>
              </button>
              
              {/* Login/Logout for mobile */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full flex items-center justify-center bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/Login");
                    setMobileMenuOpen(false);
                  }}
                  className="mt-3 w-full flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
