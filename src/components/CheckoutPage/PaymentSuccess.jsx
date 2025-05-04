// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const PaymentSuccess = () => {
//   const [loading, setLoading] = useState(true);
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         // Extract query parameters from URL
//         const params = new URLSearchParams(location.search);
//         const pidx = params.get('pidx');
//         const transaction_id = params.get('transaction_id');
//         const amount = params.get('amount');
//         const mobile = params.get('mobile');
//         const purchase_order_id = params.get('purchase_order_id');
//         const purchase_order_name = params.get('purchase_order_name');
        
//         if (!pidx || !transaction_id) {
//           setError('Invalid payment information');
//           setLoading(false);
//           return;
//         }
        
//         // Here you would typically verify the payment with your backend
//         // For demonstration purposes, we're just capturing the details
        
//         setPaymentDetails({
//           transactionId: transaction_id,
//           amount: amount ? parseFloat(amount) / 100 : 0, // Convert paisa to rupees
//           orderId: purchase_order_id,
//           customerName: purchase_order_name,
//           mobile: mobile
//         });
        
//         // In actual implementation, you would call your verification API:
        
//         await axios.post(`${baseURL}/api/verify/verifypayment`, {
//           khaltiTransactionId: transaction_id,
//           amount: amount ? parseFloat(amount) / 100 : 0,
//           mobile: mobile,
//           khaltiPayload: Object.fromEntries(params)
//         }, {
//           withCredentials: true
//         });
        
//       } catch (err) {
//         setError('Failed to verify payment. Please contact support.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [location]);

//   return (
//     <div className="bg-gray-50 mt-16 min-h-screen py-8">
//       <div className="max-w-3xl mx-auto px-4">
//         {loading ? (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Verifying your payment...</p>
//           </div>
//         ) : error ? (
//           <div className="bg-white rounded-lg shadow-md p-8">
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//               <p className="text-red-700">{error}</p>
//             </div>
//             <button
//               onClick={() => navigate('/payment')}
//               className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="bg-green-500 py-8 text-center">
//               <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto">
//                 <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h2 className="mt-4 text-2xl font-bold text-white">Payment Successful!</h2>
//               <p className="mt-2 text-green-100">Thank you for your order</p>
//             </div>
            
//             <div className="p-8">
//               <div className="bg-gray-50 rounded-lg p-6 mb-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">Order Confirmation</h3>
                
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Transaction ID:</span>
//                     <span className="font-medium">{paymentDetails?.transactionId}</span>
//                   </div>
                  
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Order ID:</span>
//                     <span className="font-medium">{paymentDetails?.orderId}</span>
//                   </div>
                  
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Customer:</span>
//                     <span className="font-medium">{paymentDetails?.customerName}</span>
//                   </div>
                  
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Amount Paid:</span>
//                     <span className="font-medium">Rs. {paymentDetails?.amount.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Payment Method:</span>
//                     <span className="font-medium">Khalti</span>
//                   </div>
                  
//                   <div className="border-t border-gray-200 pt-3 mt-3">
//                     <div className="flex justify-between">
//                       <span className="font-medium">Status:</span>
//                       <span className="font-bold text-green-600">Completed</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <button
//                   onClick={() => navigate('/my-orders')} 
//                   className="w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   View My Orders
//                 </button>
                
//                 <button
//                   onClick={() => navigate('/')}
//                   className="w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 >
//                   Continue Shopping
//                 </button>
                
//                 <button
//                   onClick={() => window.print()}
//                   className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                   </svg>
//                   Print Receipt
//                 </button>
//               </div>
              
//               <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//                 <p className="text-sm text-gray-600">
//                   A confirmation email has been sent to your registered email address.
//                 </p>
//                 <p className="text-sm text-gray-600 mt-1">
//                   If you have any questions, please contact our support team.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract query parameters from URL
        const params = new URLSearchParams(location.search);
        const pidx = params.get('pidx');
        const transaction_id = params.get('transaction_id');
        const amount = params.get('amount');
        const mobile = params.get('mobile');
        const purchase_order_id = params.get('purchase_order_id');
        const purchase_order_name = params.get('purchase_order_name');
        
        if (!pidx || !transaction_id) {
          setError('Invalid payment information');
          setLoading(false);
          return;
        }
        
        // Set payment details (for UI display)
        setPaymentDetails({
          transactionId: transaction_id,
          amount: amount ? parseFloat(amount) / 100 : 0, // Convert paisa to rupees
          orderId: purchase_order_id,
          customerName: purchase_order_name,
          mobile: mobile
        });
        
        // Verify payment with backend
        const response = await axios.post(`${baseURL}/api/verify/verifypayment`, {
          khaltiTransactionId: transaction_id,
          amount: amount ? parseFloat(amount) / 100 : 0,
          mobile: mobile,
          khaltiPayload: Object.fromEntries(params)
        }, {
          withCredentials: true
        });
        
        if (response.data.message === 'Payment verified and completed') {
          setLoading(false);
        } else {
          throw new Error('Payment verification failed');
        }
        
      } catch (err) {
        setError('Failed to verify payment. Please contact support.');
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location]);

  return (
    <div className="bg-gray-50 mt-16 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying your payment...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={() => navigate('/payment')}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-500 py-8 text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">Payment Successful!</h2>
              <p className="mt-2 text-green-100">Thank you for your order</p>
            </div>
            
            <div className="p-8">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Confirmation</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-medium">{paymentDetails?.transactionId}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{paymentDetails?.orderId}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">{paymentDetails?.customerName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium">Rs. {paymentDetails?.amount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">Khalti</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className="font-bold text-green-600">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/my-orders')} 
                  className="w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View My Orders
                </button>
                
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Continue Shopping
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Receipt
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  A confirmation email has been sent to your registered email address.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  If you have any questions, please contact our support team.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
