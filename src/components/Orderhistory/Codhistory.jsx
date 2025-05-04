// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ChevronDown, ChevronRight, Clock, CheckCircle, XCircle } from "lucide-react";

// const CODPayments = ({ userIdProp }) => {
//   const [payments, setPayments] = useState([]);
//   const [expandedPayment, setExpandedPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const baseURL = process.env.REACT_APP_API_BASE_URL;
  
//   const userId = userIdProp || localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/api/codpayment/get/cod/${userId}`);
//         setPayments(res.data.payments);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch COD payments.');
//         setLoading(false);
//       }
//     };
    
//     if (userId) {
//       fetchPayments();
//     } else {
//       setError('User ID not found.');
//       setLoading(false);
//     }
//   }, [userId, baseURL]);

//   const togglePayment = (id) => {
//     setExpandedPayment(expandedPayment === id ? null : id);
//   };

//   if (loading) return <p className="text-center py-2 text-sm">Loading COD payments…</p>;
//   if (error) return <p className="text-center py-2 text-sm text-red-500">{error}</p>;
//   if (payments.length === 0) return null; // Don't show section if no payments

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
//         COD Payments
//       </h2>

//       <div className="space-y-3">
//         {payments.map((payment) => {
//           const formattedDate = payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A';
          
//           return (
//             <div
//               key={payment._id}
//               className="bg-white rounded-lg shadow border overflow-hidden"
//             >
//               {/* Compact Header */}
//               <div
//                 className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
//                 onClick={() => togglePayment(payment._id)}
//               >
//                 <div className="flex items-center gap-2">
//                   {/* Add book thumbnail if available */}
//                   {payment.bookId?.bookImage && (
//                     <img
//                       src={payment.bookId.bookImage}
//                       alt="Book"
//                       className="w-8 h-10 object-cover rounded-sm"
//                     />
//                   )}
//                   <div>
//                     <h3 className="font-medium text-sm text-gray-900">
//                       {payment.bookId?.title || "Untitled Book"}
//                     </h3>
//                     <p className="text-xs text-gray-500">
//                       {formattedDate} • Rs. {payment.amount}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                       payment.status === "completed"
//                         ? "bg-green-100 text-green-800"
//                         : payment.status === "failed"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
//                   </span>
//                   {expandedPayment === payment._id ? (
//                     <ChevronDown size={16} className="text-gray-400" />
//                   ) : (
//                     <ChevronRight size={16} className="text-gray-400" />
//                   )}
//                 </div>
//               </div>

//               {/* Condensed expanded content */}
//               {expandedPayment === payment._id && (
//                 <div className="border-t border-gray-200 p-3 bg-gray-50 text-sm">
//                   <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs mb-3">
//                     <div className="text-gray-500">Amount:</div>
//                     <div className="col-span-2">Rs. {payment.amount}</div>
                    
//                     <div className="text-gray-500">Status:</div>
//                     <div className="col-span-2 flex items-center">
//                       {payment.status === "pending" && (
//                         <span className="flex items-center text-yellow-600">
//                           <Clock size={12} className="mr-1" />
//                           Pending
//                         </span>
//                       )}
//                       {payment.status === "completed" && (
//                         <span className="flex items-center text-green-600">
//                           <CheckCircle size={12} className="mr-1" />
//                           Completed
//                         </span>
//                       )}
//                       {payment.status === "failed" && (
//                         <span className="flex items-center text-red-600">
//                           <XCircle size={12} className="mr-1" />
//                           Failed
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="text-gray-500">Mobile:</div>
//                     <div className="col-span-2">{payment.mobile}</div>
                    
//                     <div className="text-gray-500">Address:</div>
//                     <div className="col-span-2 truncate max-w-xs">{payment.shippingAddress}</div>
                    
//                     {payment.transactionId && (
//                       <>
//                         <div className="text-gray-500">Transaction ID:</div>
//                         <div className="col-span-2">{payment.transactionId}</div>
//                       </>
//                     )}
                    
//                     <div className="text-gray-500">Seller:</div>
//                     <div className="col-span-2 truncate max-w-xs">
//                       {payment.sellerId?.fullName || payment.sellerId?.email || 'N/A'}
//                     </div>
//                   </div>

//                   {/* Additional information can go here if needed */}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CODPayments;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ChevronDown, ChevronRight, Clock, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";

// const CODPayments = ({ userIdProp, isSeller = false }) => {
//   const [payments, setPayments] = useState([]);
//   const [expandedPayment, setExpandedPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const baseURL = process.env.REACT_APP_API_BASE_URL;
  
//   const userId = userIdProp || localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/api/codpayment/get/cod/${userId}`);
//         setPayments(res.data.payments);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch COD payments.');
//         setLoading(false);
//       }
//     };
    
//     if (userId) {
//       fetchPayments();
//     } else {
//       setError('User ID not found.');
//       setLoading(false);
//     }
//   }, [userId, baseURL]);

//   const togglePayment = (id) => {
//     setExpandedPayment(expandedPayment === id ? null : id);
//   };

//   const handleVerifyPayment = async (paymentId, status) => {
//     setProcessing(true);
//     try {
//       const response = await axios.put(`${baseURL}/api/codpayment/cod/verify/${paymentId}`, {
//         status: status === 'approve' ? 'completed' : 'failed'
//       });
      
//       if (response.data.success) {
//         // Update the payment status in the local state
//         setPayments(payments.map(payment => 
//           payment._id === paymentId 
//             ? {...payment, status: status === 'approve' ? 'completed' : 'failed'} 
//             : payment
//         ));
//       } else {
//         setError('Failed to update payment status.');
//       }
//     } catch (err) {
//       console.error('Payment verification error:', err);
//       setError('Error processing verification. Please try again.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (loading) return <p className="text-center py-2 text-sm">Loading COD payments…</p>;
//   if (error) return <p className="text-center py-2 text-sm text-red-500">{error}</p>;
//   if (payments.length === 0) return null; // Don't show section if no payments

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
//         COD Payments
//       </h2>

//       <div className="space-y-3">
//         {payments.map((payment) => {
//           const formattedDate = payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A';
//           const isCurrentUserSeller = payment.sellerId?._id === userId || payment.sellerId === userId;
//           const showVerificationButtons = isSeller || isCurrentUserSeller;
          
//           return (
//             <div
//               key={payment._id}
//               className="bg-white rounded-lg shadow border overflow-hidden"
//             >
//               {/* Compact Header */}
//               <div
//                 className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
//                 onClick={() => togglePayment(payment._id)}
//               >
//                 <div className="flex items-center gap-2">
//                   {/* Add book thumbnail if available */}
//                   {payment.bookId?.bookImage && (
//                     <img
//                       src={payment.bookId.bookImage}
//                       alt="Book"
//                       className="w-8 h-10 object-cover rounded-sm"
//                     />
//                   )}
//                   <div>
//                     <h3 className="font-medium text-sm text-gray-900">
//                       {payment.bookId?.title || "Untitled Book"}
//                     </h3>
//                     <p className="text-xs text-gray-500">
//                       {formattedDate} • Rs. {payment.amount}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                       payment.status === "completed"
//                         ? "bg-green-100 text-green-800"
//                         : payment.status === "failed"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
//                   </span>
//                   {expandedPayment === payment._id ? (
//                     <ChevronDown size={16} className="text-gray-400" />
//                   ) : (
//                     <ChevronRight size={16} className="text-gray-400" />
//                   )}
//                 </div>
//               </div>

//               {/* Condensed expanded content */}
//               {expandedPayment === payment._id && (
//                 <div className="border-t border-gray-200 p-3 bg-gray-50 text-sm">
//                   <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs mb-3">
//                     <div className="text-gray-500">Amount:</div>
//                     <div className="col-span-2">Rs. {payment.amount}</div>
                    
//                     <div className="text-gray-500">Status:</div>
//                     <div className="col-span-2 flex items-center">
//                       {payment.status === "pending" && (
//                         <span className="flex items-center text-yellow-600">
//                           <Clock size={12} className="mr-1" />
//                           Pending
//                         </span>
//                       )}
//                       {payment.status === "completed" && (
//                         <span className="flex items-center text-green-600">
//                           <CheckCircle size={12} className="mr-1" />
//                           Completed
//                         </span>
//                       )}
//                       {payment.status === "failed" && (
//                         <span className="flex items-center text-red-600">
//                           <XCircle size={12} className="mr-1" />
//                           Failed
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="text-gray-500">Mobile:</div>
//                     <div className="col-span-2">{payment.mobile || 'N/A'}</div>
                    
//                     <div className="text-gray-500">Address:</div>
//                     <div className="col-span-2 truncate max-w-xs">{payment.shippingAddress || 'N/A'}</div>
                    
//                     {payment.transactionId && (
//                       <>
//                         <div className="text-gray-500">Transaction ID:</div>
//                         <div className="col-span-2">{payment.transactionId}</div>
//                       </>
//                     )}
                    
//                     <div className="text-gray-500">Seller:</div>
//                     <div className="col-span-2 truncate max-w-xs">
//                       {payment.sellerId?.fullName || payment.sellerId?.email || payment.sellerId?.name || 'N/A'}
//                     </div>

//                     <div className="text-gray-500">Buyer:</div>
//                     <div className="col-span-2 truncate max-w-xs">
//                       {payment.buyerId?.fullName || payment.buyerId?.email || payment.buyerId?.name || 'N/A'}
//                     </div>
//                   </div>

//                   {/* Verification buttons for seller */}
//                   {showVerificationButtons && payment.status === "pending" && (
//                     <div className="mt-4 flex gap-2 justify-end">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleVerifyPayment(payment._id, 'approve');
//                         }}
//                         disabled={processing}
//                         className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors disabled:opacity-50"
//                       >
//                         <ThumbsUp size={14} className="mr-1" />
//                         Accept Payment
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleVerifyPayment(payment._id, 'reject');
//                         }}
//                         disabled={processing}
//                         className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
//                       >
//                         <ThumbsDown size={14} className="mr-1" />
//                         Reject Payment
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CODPayments;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ChevronDown, ChevronRight, Clock, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";

// const CODPayments = ({ userIdProp, isSeller = false }) => {
//   const [payments, setPayments] = useState([]);
//   const [expandedPayment, setExpandedPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const baseURL = process.env.REACT_APP_API_BASE_URL;
  
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/api/codpayment/get/cod/${userId}`);
//         setPayments(res.data.payments);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch COD payments.');
//         setLoading(false);
//       }
//     };
    
//     if (userId) {
//       fetchPayments();
//     } else {
//       setError('User ID not found.');
//       setLoading(false);
//     }
//   }, [userId, baseURL]);

//   const togglePayment = (id) => {
//     setExpandedPayment(expandedPayment === id ? null : id);
//   };

//   const handleVerifyPayment = async (paymentId, status) => {
//     setProcessing(true);
//     try {
//       // Include userId in the request body as required by the backend
//       const response = await axios.patch(`${baseURL}/api/codpayment/cod/verify/${paymentId}`, 
//         {
//             status,
//             userId,
//           }// Add the userId to the request
//       );
      
//       if (response.data.success) {
//         // Update the payment status in the local state
//         setPayments(payments.map(payment => 
//           payment._id === paymentId 
//             ? {...payment, status: status === 'approve' ? 'completed' : 'failed'} 
//             : payment
//         ));
//       } else {
//         setError('Failed to update payment status.');
//       }
//     } catch (err) {
//       console.error('Payment verification error:', err);
//       setError(`Error processing verification: ${err.response?.data?.message || 'Please try again.'}`);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (loading) return <p className="text-center py-2 text-sm">Loading COD payments…</p>;
//   if (error) return <p className="text-center py-2 text-sm text-red-500">{error}</p>;
//   if (payments.length === 0) return null; // Don't show section if no payments

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
//         COD Payments
//       </h2>

//       <div className="space-y-3">
//         {payments.map((payment) => {
//           const formattedDate = payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A';
//           const isCurrentUserSeller = payment.sellerId?._id === userId || payment.sellerId === userId;
//           const showVerificationButtons = isSeller || isCurrentUserSeller;
          
//           return (
//             <div
//               key={payment._id}
//               className="bg-white rounded-lg shadow border overflow-hidden"
//             >
//               {/* Compact Header */}
//               <div
//                 className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
//                 onClick={() => togglePayment(payment._id)}
//               >
//                 <div className="flex items-center gap-2">
//                   {/* Add book thumbnail if available */}
//                   {payment.bookId?.bookImage && (
//                     <img
//                       src={payment.bookId.bookImage}
//                       alt="Book"
//                       className="w-8 h-10 object-cover rounded-sm"
//                     />
//                   )}
//                   <div>
//                     <h3 className="font-medium text-sm text-gray-900">
//                       {payment.bookId?.title || "Untitled Book"}
//                     </h3>
//                     <p className="text-xs text-gray-500">
//                       {formattedDate} • Rs. {payment.amount}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                       payment.status === "completed"
//                         ? "bg-green-100 text-green-800"
//                         : payment.status === "failed"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
//                   </span>
//                   {expandedPayment === payment._id ? (
//                     <ChevronDown size={16} className="text-gray-400" />
//                   ) : (
//                     <ChevronRight size={16} className="text-gray-400" />
//                   )}
//                 </div>
//               </div>

//               {/* Condensed expanded content */}
//               {expandedPayment === payment._id && (
//                 <div className="border-t border-gray-200 p-3 bg-gray-50 text-sm">
//                   <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs mb-3">
//                     <div className="text-gray-500">Amount:</div>
//                     <div className="col-span-2">Rs. {payment.amount}</div>
                    
//                     <div className="text-gray-500">Status:</div>
//                     <div className="col-span-2 flex items-center">
//                       {payment.status === "pending" && (
//                         <span className="flex items-center text-yellow-600">
//                           <Clock size={12} className="mr-1" />
//                           Pending
//                         </span>
//                       )}
//                       {payment.status === "completed" && (
//                         <span className="flex items-center text-green-600">
//                           <CheckCircle size={12} className="mr-1" />
//                           Completed
//                         </span>
//                       )}
//                       {payment.status === "failed" && (
//                         <span className="flex items-center text-red-600">
//                           <XCircle size={12} className="mr-1" />
//                           Failed
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="text-gray-500">Mobile:</div>
//                     <div className="col-span-2">{payment.mobile || 'N/A'}</div>
                    
//                     <div className="text-gray-500">Address:</div>
//                     <div className="col-span-2 truncate max-w-xs">{payment.shippingAddress || 'N/A'}</div>
                    
//                     {payment.transactionId && (
//                       <>
//                         <div className="text-gray-500">Transaction ID:</div>
//                         <div className="col-span-2">{payment.transactionId}</div>
//                       </>
//                     )}
                    
//                     <div className="text-gray-500">Seller:</div>
//                     <div className="col-span-2 truncate max-w-xs">
//                       {payment.sellerId?.fullName || payment.sellerId?.email || payment.sellerId?.name || 'N/A'}
//                     </div>

//                     <div className="text-gray-500">Buyer:</div>
//                     <div className="col-span-2 truncate max-w-xs">
//                       {payment.buyerId?.fullName || payment.buyerId?.email || payment.buyerId?.name || 'N/A'}
//                     </div>
//                   </div>

//                   {/* Verification buttons for seller */}
//                   {showVerificationButtons && payment.status === "pending" && (
//                     <div className="mt-4 flex gap-2 justify-end">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleVerifyPayment(payment._id, 'approve');
//                         }}
//                         disabled={processing}
//                         className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors disabled:opacity-50"
//                       >
//                         <ThumbsUp size={14} className="mr-1" />
//                         Accept Payment
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleVerifyPayment(payment._id, 'reject');
//                         }}
//                         disabled={processing}
//                         className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
//                       >
//                         <ThumbsDown size={14} className="mr-1" />
//                         Reject Payment
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CODPayments;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ChevronDown, ChevronRight, Clock, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";

// const CODPayments = ({ userIdProp, isSeller = false }) => {
//   const [payments, setPayments] = useState([]);
//   const [expandedPayment, setExpandedPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const baseURL = process.env.REACT_APP_API_BASE_URL;
  
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/api/codpayment/get/cod/${userId}`);
//         setPayments(res.data.payments);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch COD payments.');
//         setLoading(false);
//       }
//     };
    
//     if (userId) {
//       fetchPayments();
//     } else {
//       setError('User ID not found.');
//       setLoading(false);
//     }
//   }, [userId, baseURL]);

//   const togglePayment = (id) => {
//     setExpandedPayment(expandedPayment === id ? null : id);
//   };

//   const handleVerifyPayment = async (paymentId, status) => {
//     setProcessing(true);
//     try {
//       // Include userId in the request body as required by the backend
//       const response = await axios.patch(`${baseURL}/api/codpayment/cod/verify/${paymentId}`, 
//         {
//           status,
//           userId,
//         }
//       );
      
//       if (response.data.success) {
//         // Update the payment status in the local state
//         setPayments(payments.map(payment => 
//           payment._id === paymentId 
//             ? {...payment, status: status === 'approve' ? 'completed' : 'failed'} 
//             : payment
//         ));
//       } else {
//         setError('Failed to update payment status.');
//       }
//     } catch (err) {
//       console.error('Payment verification error:', err);
//       setError(`Error processing verification: ${err.response?.data?.message || 'Please try again.'}`);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (loading) return <p className="text-center py-2 text-sm">Loading COD payments…</p>;
//   if (error) return <p className="text-center py-2 text-sm text-red-500">{error}</p>;
//   if (payments.length === 0) return null; // Don't show section if no payments

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
//         COD Payments
//       </h2>

//       <div className="space-y-3">
//         {payments.map((payment) => {
//           const formattedDate = payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A';
//           const isCurrentUserSeller = payment.sellerId?._id === userId || payment.sellerId === userId;
//           const showVerificationButtons = isSeller || isCurrentUserSeller;
          
//           return (
//             <div
//               key={payment._id}
//               className="bg-white rounded-lg shadow border overflow-hidden"
//             >
//               {/* Compact Header */}
//               <div
//                 className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
//                 onClick={() => togglePayment(payment._id)}
//               >
//                 <div className="flex items-center gap-2">
//                   {/* Add book thumbnail if available */}
//                   {payment.bookId?.bookImage && (
//                     <img
//                       src={payment.bookId.bookImage}
//                       alt="Book"
//                       className="w-8 h-10 object-cover rounded-sm"
//                     />
//                   )}
//                   <div>
//                     <h3 className="font-medium text-sm text-gray-900">
//                       {payment.bookId?.title || "Untitled Book"}
//                     </h3>
//                     <p className="text-xs text-gray-500">
//                       {formattedDate} • Rs. {payment.amount}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                       payment.status === "completed"
//                         ? "bg-green-100 text-green-800"
//                         : payment.status === "failed"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
//                   </span>
//                   {expandedPayment === payment._id ? (
//                     <ChevronDown size={16} className="text-gray-400" />
//                   ) : (
//                     <ChevronRight size={16} className="text-gray-400" />
//                   )}
//                 </div>
//               </div>

//               {/* Condensed expanded content */}
//               {expandedPayment === payment._id && (
//                 <div className="border-t border-gray-200 p-3 bg-gray-50 text-sm">
//                   <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs mb-3">
//                     <div className="text-gray-500">Amount:</div>
//                     <div className="col-span-2">Rs. {payment.amount}</div>
                    
//                     <div className="text-gray-500">Status:</div>
//                     <div className="col-span-2 flex items-center">
//                       {payment.status === "pending" && (
//                         <span className="flex items-center text-yellow-600">
//                           <Clock size={12} className="mr-1" />
//                           Pending
//                         </span>
//                       )}
//                       {payment.status === "completed" && (
//                         <span className="flex items-center text-green-600">
//                           <CheckCircle size={12} className="mr-1" />
//                           Completed
//                         </span>
//                       )}
//                       {payment.status === "failed" && (
//                         <span className="flex items-center text-red-600">
//                           <XCircle size={12} className="mr-1" />
//                           Failed
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="text-gray-500">Mobile:</div>
//                     <div className="col-span-2">{payment.mobile || 'N/A'}</div>
                    
//                     <div className="text-gray-500">Address:</div>
//                     <div className="col-span-2 truncate max-w-xs">{payment.shippingAddress || 'N/A'}</div>
                    
//                     {payment.transactionId && (
//                       <>
//                         <div className="text-gray-500">Transaction ID:</div>
//                         <div className="col-span-2">{payment.transactionId}</div>
//                       </>
//                     )}
                    
//                     <div className="text-gray-500">Seller:</div>
//                     <div className="col-span-2 truncate max-w-xs">
//                       {payment.sellerId?.fullName || payment.sellerId?.email || payment.sellerId?.name || 'N/A'}
//                     </div>

//                     <div className="text-gray-500">Buyer:</div>
//                     <div className="col-span-2 truncate max-w-xs">
//                       {payment.buyerId?.fullName || payment.buyerId?.email || payment.buyerId?.name || 'N/A'}
//                     </div>
//                   </div>

//                   {/* Verification buttons for seller */}
//                   {showVerificationButtons && payment.status === "pending" && (
//                     <div className="mt-4 flex gap-2 justify-end">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleVerifyPayment(payment._id, 'approve');
//                         }}
//                         disabled={processing}
//                         className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors disabled:opacity-50"
//                       >
//                         <ThumbsUp size={14} className="mr-1" />
//                         Accept Payment
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleVerifyPayment(payment._id, 'reject');
//                         }}
//                         disabled={processing}
//                         className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
//                       >
//                         <ThumbsDown size={14} className="mr-1" />
//                         Reject Payment
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CODPayments;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronRight, Clock, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";

const CODPayments = ({ userIdProp, isSeller = false }) => {
  const [payments, setPayments] = useState([]);
  const [expandedPayment, setExpandedPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/codpayment/get/cod/${userId}`);
        setPayments(res.data.payments);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch COD payments.');
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchPayments();
    } else {
      setError('User ID not found.');
      setLoading(false);
    }
  }, [userId, baseURL]);

  const togglePayment = (id) => {
    setExpandedPayment(expandedPayment === id ? null : id);
  };

  const handleVerifyPayment = async (paymentId, status) => {
    setProcessing(true);
    try {
      const response = await axios.patch(`${baseURL}/api/codpayment/cod/verification/${paymentId}`, 
        // {
        //   status,
        //   userId,
        // }
        {
          status: status === 'approve' ? 'completed' : 'failed', // Directly using 'completed' or 'failed'
        }
      );
      
      if (response.data.success) {
        setPayments(payments.map(payment => 
          payment._id === paymentId 
            ? {...payment, status: status === 'approve' ? 'completed' : 'failed'} 
            : payment
        ));
      } else {
        setError('Failed to update payment status.');
      }
    } catch (err) {
      console.error('Payment verification error:', err);
      setError(`Error processing verification: ${err.response?.data?.message || 'Please try again.'}`);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p className="text-center py-2 text-sm">Loading COD payments…</p>;
  if (error) return <p className="text-center py-2 text-sm text-red-500">{error}</p>;
  if (payments.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => {
              const formattedDate = payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A';
              const isCurrentUserSeller = payment.sellerId?._id === userId || payment.sellerId === userId;
              const showVerificationButtons = isSeller || isCurrentUserSeller;
              
              return (
                <React.Fragment key={payment._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {payment.bookId?.bookImage && (
                          <img
                            src={payment.bookId.bookImage}
                            alt="Book"
                            className="w-8 h-10 object-cover rounded-sm mr-2"
                          />
                        )}
                        <div className="ml-1">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.bookId?.title || "Untitled Book"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formattedDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      Rs. {payment.amount}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status === "pending" && <Clock size={12} className="mr-1" />}
                        {payment.status === "completed" && <CheckCircle size={12} className="mr-1" />}
                        {payment.status === "failed" && <XCircle size={12} className="mr-1" />}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => togglePayment(payment._id)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        Details
                        {expandedPayment === payment._id ? (
                          <ChevronDown size={16} className="ml-1" />
                        ) : (
                          <ChevronRight size={16} className="ml-1" />
                        )}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded row */}
                  {expandedPayment === payment._id && (
                    <tr>
                      <td colSpan="5" className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Mobile:</p>
                            <p className="font-medium">{payment.mobile || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Transaction ID:</p>
                            <p className="font-medium">{payment.transactionId || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Seller:</p>
                            <p className="font-medium truncate">{payment.sellerId?.name  || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Buyer:</p>
                            <p className="font-medium truncate">{payment.buyerId?.name || 'N/A'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-500 mb-1">Shipping Address:</p>
                            <p className="font-medium">{payment.shippingAddress || 'N/A'}</p>
                          </div>
                          
                          {/* Verification buttons for seller */}
                          {showVerificationButtons && payment.status === "pending" && (
                            <div className="col-span-2 mt-2 flex gap-2 justify-end">
                              <button
                                onClick={() => handleVerifyPayment(payment._id, 'approve')}
                                disabled={processing}
                                className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors disabled:opacity-50"
                              >
                                <ThumbsUp size={14} className="mr-1" />
                                Accept Payment
                              </button>
                              <button
                                onClick={() => handleVerifyPayment(payment._id, 'reject')}
                                disabled={processing}
                                className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
                              >
                                <ThumbsDown size={14} className="mr-1" />
                                Reject Payment
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CODPayments;