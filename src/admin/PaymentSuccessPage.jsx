// PaymentSuccessPage.jsx
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const PaymentSuccessPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         // Get query parameters from URL
//         const params = new URLSearchParams(location.search);
//         const pidx = params.get('pidx');
//         const purchase_order_id = params.get('purchase_order_id');
//         const amount = params.get('amount');
//         const transaction_id = params.get('transaction_id');
//         const status = params.get('status');

//         if (!pidx || !purchase_order_id) {
//           setError('Invalid payment information');
//           setLoading(false);
//           return;
//         }

//         // Verify payment with your backend
//         const response = await axios.post(`${baseURL}/api/payment/khalti/verify`, {
//           pidx,
//           purchase_order_id,
//           amount,
//           transaction_id,
//           status
//         });

//         if (response.data.success) {
//           setOrderDetails(response.data.order);
//         } else {
//           setError(response.data.message || 'Payment verification failed');
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || 'An error occurred during payment verification');
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [location]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
//         <p className="text-gray-600">Verifying your payment...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-red-100 p-3 rounded-full">
//               <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-2xl font-bold text-center mb-4">Payment Failed</h2>
//           <p className="text-center text-gray-600 mb-6">{error}</p>
//           <div className="flex justify-center">
//             <Link to="/" className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
//               Return to Homepage
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//         <div className="flex items-center justify-center mb-6">
//           <div className="bg-green-100 p-3 rounded-full">
//             <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//             </svg>
//           </div>
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-4">Payment Successful!</h2>
//         <p className="text-center text-gray-600 mb-6">
//           Your order has been placed successfully. Thank you for your purchase!
//         </p>
        
//         {orderDetails && (
//           <div className="bg-gray-50 p-4 rounded-md mb-6">
//             <h3 className="font-semibold mb-2">Order Details</h3>
//             <p className="text-sm text-gray-600">Order ID: {orderDetails.purchaseOrderId}</p>
//             <p className="text-sm text-gray-600">Book: {orderDetails.bookTitle}</p>
//             <p className="text-sm text-gray-600">Amount: NPR {orderDetails.totalAmount/100}</p>
//           </div>
//         )}
        
//         <div className="flex justify-center space-x-4">
//           <Link to="/my-books" className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
//             My Books
//           </Link>
//           <Link to="/" className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
//             Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccessPage;



// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const PaymentSuccessPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState('');
//   const location = useLocation();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const params = new URLSearchParams(location.search);
//         const pidx = params.get('pidx');

//         if (!pidx) {
//           setError('Invalid payment information');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.post(`${baseURL}/api/payment/khalti/verify`, {
//           pidx,
//         });

//         if (response.data.success) {
//           setOrderDetails(response.data.order);
//         } else {
//           setError(response.data.message || 'Payment verification failed');
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || 'An error occurred during payment verification');
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [location]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
//         <p className="text-gray-600">Verifying your payment...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-red-100 p-3 rounded-full">
//               <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-2xl font-bold text-center mb-4">Payment Failed</h2>
//           <p className="text-center text-gray-600 mb-6">{error}</p>
//           <div className="flex justify-center">
//             <Link to="/" className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
//               Return to Homepage
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//         <div className="flex items-center justify-center mb-6">
//           <div className="bg-green-100 p-3 rounded-full">
//             <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-4">Payment Successful!</h2>
//         <p className="text-center text-gray-600 mb-6">
//           Your order has been placed successfully. Thank you for your purchase!
//         </p>

//         {orderDetails && (
//           <div className="bg-gray-50 p-4 rounded-md mb-6">
//             <h3 className="font-semibold mb-2">Order Details</h3>
//             <p className="text-sm text-gray-600">Order ID: {orderDetails.purchaseOrderId}</p>
//             <p className="text-sm text-gray-600">Book: {orderDetails.bookTitle}</p>
//             <p className="text-sm text-gray-600">Amount: NPR {orderDetails.totalAmount / 100}</p>
//           </div>
//         )}

//         <div className="flex justify-center space-x-4">
//           <Link to="/my-books" className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
//             My Books
//           </Link>
//           <Link to="/" className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
//             Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccessPage;



import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const PaymentSuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const pidx = params.get('pidx');

        if (!pidx) {
          setError('Invalid payment information');
          setLoading(false);
          return;
        }

        const response = await axios.post(`${baseURL}/api/payment/khalti/verify`, {
          pidx,
        });

        if (response.data.success) {
          setOrderDetails(response.data.order);
        } else {
          setError(response.data.message || 'Payment verification failed');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred during payment verification');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-6"></div>
        <p className="text-lg text-gray-700 font-medium">Verifying your payment...</p>
        <p className="text-gray-500 mt-2 text-center max-w-md">This may take a moment while we process your transaction</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-red-100">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full shadow-sm">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Payment Failed</h2>
          <p className="text-center text-gray-600 mb-8 px-4">{error}</p>
          <div className="flex justify-center">
            <Link to="/" className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition duration-300 shadow-md font-medium">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-green-100">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full shadow-sm">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Thank You!</h2>
          <div className="h-1 w-16 bg-purple-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 mb-1">
            Your payment was processed successfully.
          </p>
          <p className="text-gray-600">
            Your books are now available in your library!
          </p>
        </div>

        {orderDetails && (
          <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-3 text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Order Summary
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-medium">Order ID:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{orderDetails.purchaseOrderId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-medium">Book:</span>
                <span>{orderDetails.bookTitle}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold text-purple-700">NPR {(orderDetails.totalAmount / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link to="/myorders" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition duration-300 shadow-md text-center font-medium">
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              My Orders
            </span>
          </Link>
          <Link to="/" className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 rounded-lg hover:from-gray-200 hover:to-gray-300 transition duration-300 shadow-sm text-center font-medium">
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </span>
          </Link>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Thank you for shopping with us!</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;