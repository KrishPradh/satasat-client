// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CheckCircle, XCircle, Clock } from "lucide-react";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const QRPaymentRequests = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [feedback, setFeedback] = useState("");

//   const userId = localStorage.getItem("userId");

//   const fetchPayments = async () => {
//     try {
//       const res = await axios.get(
//         `${baseURL}/api/qrpayment/getqrpayment/${userId}`
//       );
//       if (res.data.success) {
//         setPayments(res.data.payments);
//       }
//     } catch (err) {
//       console.error(err);
//       setFeedback("Error loading QR payments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (paymentId, status) => {
//     try {
//       const res = await axios.patch(
//         `${baseURL}/api/qrpayment/qr/${paymentId}/status`,
//         {
//           status,
//           userId, // Include userId in the request body
//         }
//       );

//       if (res.data.success) {
//         setFeedback(`Marked as ${status}`);
//         fetchPayments(); // Refresh list
//       }
//     } catch (err) {
//       console.error(err);
//       setFeedback("Failed to update status");
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   if (loading) return <p className="text-center py-4">Loading QR payments…</p>;

//   if (payments.length === 0)
//     return (
//       <p className="text-center py-4 text-gray-500">No QR payments found.</p>
//     );

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6">
//       <h2 className="text-2xl font-semibold mb-4">QR Payments</h2>

//       {feedback && (
//         <div className="mb-4 text-sm text-blue-700 bg-blue-100 p-2 rounded">
//           {feedback}
//         </div>
//       )}

//       <div className="space-y-6">
//         {payments.map((payment) => {
//           // Determine if current user is the seller
//           const isSeller = payment.sellerId?._id === userId;

//           return (
//             <div
//               key={payment._id}
//               className="border rounded-lg p-4 bg-white shadow"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <div>
//                   <p className="font-medium">
//                     <span className="text-gray-700">Book:</span>{" "}
//                     {payment.bookId?.title || "N/A"}
//                   </p>
//                   {payment.bookId?.bookImage ? (
//                     <img
//                       src={payment.bookId.bookImage}
//                       alt={payment.bookId.title || "Book Image"}
//                       className="w-24 h-32 object-cover mt-2 rounded"
//                     />
//                   ) : (
//                     <p className="text-gray-500">No image available</p>
//                   )}
//                   <p className="text-sm text-gray-600">
//                     {isSeller ? (
//                       <>Buyer: {payment.buyerId?.name || "N/A"}</>
//                     ) : (
//                       <>Seller: {payment.sellerId?.name || "N/A"}</>
//                     )}
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium ${
//                       payment.status === "completed"
//                         ? "bg-green-100 text-green-700"
//                         : payment.status === "failed"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {payment.status === "completed"
//                       ? "Accepted"
//                       : payment.status === "failed"
//                       ? "Rejected"
//                       : "Pending"}
//                   </span>
//                   <span className="text-xs text-gray-500 mt-1">
//                     {new Date(payment.createdAt).toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               {payment.paymentSlip && (
//                 <div className="mb-4">
//                   <p className="text-sm font-semibold text-gray-700 mb-1">
//                     Payment Slip:
//                   </p>
//                   <img
//                     src={payment.paymentSlip}
//                     alt="Payment Slip"
//                     className="w-64 h-auto rounded border"
//                   />
//                 </div>
//               )}

//               {/* Status indicator visible to everyone */}
//               <div className="flex items-center gap-2 mt-2 mb-3">
//                 {payment.status === "pending" && (
//                   <div className="flex items-center text-yellow-600">
//                     <Clock size={16} className="mr-1" />
//                     <span className="text-sm">Waiting for verification</span>
//                   </div>
//                 )}
//                 {payment.status === "completed" && (
//                   <div className="flex items-center text-green-600">
//                     <CheckCircle size={16} className="mr-1" />
//                     <span className="text-sm">Payment verified</span>
//                   </div>
//                 )}
//                 {payment.status === "failed" && (
//                   <div className="flex items-center text-red-600">
//                     <XCircle size={16} className="mr-1" />
//                     <span className="text-sm">Payment rejected</span>
//                   </div>
//                 )}
//               </div>

//               {/* Show accept/reject buttons only for sellers */}
//               {isSeller && (
//                 <div className="flex gap-3">
//                   <button
//                     className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handleStatusUpdate(payment._id, "completed")}
//                     disabled={payment.status === "completed"}
//                   >
//                     <CheckCircle size={16} />
//                     Accept
//                   </button>

//                   <button
//                     className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handleStatusUpdate(payment._id, "failed")}
//                     disabled={payment.status === "failed"}
//                   >
//                     <XCircle size={16} />
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default QRPaymentRequests;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CheckCircle, XCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const QRPaymentRequests = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [feedback, setFeedback] = useState("");
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [expandedItem, setExpandedItem] = useState(null);

//   const userId = localStorage.getItem("userId");

//   const fetchPayments = async () => {
//     try {
//       const res = await axios.get(
//         `${baseURL}/api/qrpayment/getqrpayment/${userId}`
//       );
//       if (res.data.success) {
//         setPayments(res.data.payments);
//       }
//     } catch (err) {
//       console.error(err);
//       setFeedback("Error loading QR payments");
//       setShowFeedback(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (paymentId, status) => {
//     try {
//       const res = await axios.patch(
//         `${baseURL}/api/qrpayment/qr/${paymentId}/status`,
//         {
//           status,
//           userId,
//         }
//       );

//       if (res.data.success) {
//         setFeedback(`Payment ${status === "completed" ? "accepted" : "rejected"} successfully`);
//         setShowFeedback(true);
//         fetchPayments();
        
//         // Hide feedback after 3 seconds
//         setTimeout(() => {
//           setShowFeedback(false);
//         }, 3000);
//       }
//     } catch (err) {
//       console.error(err);
//       setFeedback("Failed to update status");
//       setShowFeedback(true);
//     }
//   };

//   const toggleExpand = (id) => {
//     if (expandedItem === id) {
//       setExpandedItem(null);
//     } else {
//       setExpandedItem(id);
//     }
//   };

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     if (status === "completed") {
//       return (
//         <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center">
//           <CheckCircle size={12} className="mr-1" />
//           Accepted
//         </span>
//       );
//     } else if (status === "failed") {
//       return (
//         <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center">
//           <XCircle size={12} className="mr-1" />
//           Rejected
//         </span>
//       );
//     } else {
//       return (
//         <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 flex items-center">
//           <Clock size={12} className="mr-1" />
//           Pending
//         </span>
//       );
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (payments.length === 0) {
//     return (
//       <div className="text-center py-8 bg-gray-50 rounded-lg">
//         <AlertCircle size={20} className="text-gray-400 mx-auto mb-2" />
//         <p className="text-gray-500">No QR payment requests found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-0 py-6">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">QR Payments</h2>

//       {showFeedback && (
//         <div className="mb-3 p-2 rounded-lg bg-blue-50 border border-blue-200 flex items-center text-sm">
//           <AlertCircle size={16} className="mr-2 text-blue-500" />
//           <div className="text-blue-700 flex-1">{feedback}</div>
//           <button 
//             onClick={() => setShowFeedback(false)}
//             className="text-blue-400 hover:text-blue-600"
//           >
//             &times;
//           </button>
//         </div>
//       )}

//       <div className="space-y-2 border rounded-lg overflow-hidden">
//         {payments.map((payment) => {
//           const isSeller = payment.sellerId?._id === userId;
//           const isExpanded = expandedItem === payment._id;
//           const formattedDate = new Date(payment.createdAt).toLocaleDateString();
          
//           return (
//             <div key={payment._id} className="border-b last:border-b-0">
//               {/* Header - Always visible */}
//               <div 
//                 className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
//                 onClick={() => toggleExpand(payment._id)}
//               >
//                 <div className="flex items-center gap-3">
//                   {/* Small book image */}
//                   {payment.bookId?.bookImage ? (
//                     <img 
//                       src={payment.bookId.bookImage} 
//                       alt="Book" 
//                       className="w-10 h-14 rounded object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-14 bg-gray-100 rounded flex items-center justify-center">
//                       <span className="text-gray-400 text-xs">No img</span>
//                     </div>
//                   )}
                  
//                   <div>
//                     <h3 className="font-medium text-sm">
//                       {payment.bookId?.title || "Untitled Book"}
//                     </h3>
//                     <p className="text-xs text-gray-500">
//                       {formattedDate} • Rs. {payment.amount}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <StatusBadge status={payment.status} />
//                   {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                 </div>
//               </div>
              
//               {/* Expanded content */}
//               {isExpanded && (
//                 <div className="p-3 bg-gray-50 border-t">
//                   <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
//                     <div className="text-gray-500">Amount:</div>
//                     <div className="font-medium">Rs. {payment.amount}</div>
                    
//                     <div className="text-gray-500">
//                       {isSeller ? "Buyer:" : "Seller:"}
//                     </div>
//                     <div className="font-medium">
//                       {isSeller
//                         ? payment.buyerId?.email || "N/A"
//                         : payment.sellerId?.email || "N/A"}
//                     </div>
                    
//                     {payment.mobile && (
//                       <>
//                         <div className="text-gray-500">Mobile:</div>
//                         <div className="font-medium">{payment.mobile}</div>
//                       </>
//                     )}
                    
//                     {payment.shippingAddress && (
//                       <>
//                         <div className="text-gray-500">Address:</div>
//                         <div className="font-medium">{payment.shippingAddress}</div>
//                       </>
//                     )}
//                   </div>

//                   {/* Payment slip */}
//                   {payment.paymentSlip && (
//                     <div className="mb-3">
//                       <p className="text-xs font-medium text-gray-700 mb-1">
//                         Payment Slip:
//                       </p>
//                       <img
//                         src={payment.paymentSlip}
//                         alt="Payment Slip"
//                         className="w-40 h-auto rounded border"
//                       />
//                     </div>
//                   )}

//                   {/* Status info */}
//                   <div className="text-xs text-gray-600 mb-3">
//                     {payment.status === "pending" && (
//                       <div className="flex items-center">
//                         <Clock size={14} className="mr-1 text-yellow-600" />
//                         <span>Awaiting verification</span>
//                       </div>
//                     )}
//                     {payment.status === "completed" && (
//                       <div className="flex items-center">
//                         <CheckCircle size={14} className="mr-1 text-green-600" />
//                         <span>Payment verified</span>
//                       </div>
//                     )}
//                     {payment.status === "failed" && (
//                       <div className="flex items-center">
//                         <XCircle size={14} className="mr-1 text-red-600" />
//                         <span>Payment rejected</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Actions - Only for pending payments and sellers */}
//                   {isSeller && payment.status === "pending" && (
//                     <div className="flex gap-2">
//                       <button
//                         className="px-3 py-1.5 bg-green-600 text-white text-xs rounded flex items-center hover:bg-green-700"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleStatusUpdate(payment._id, "completed");
//                         }}
//                       >
//                         <CheckCircle size={14} className="mr-1" />
//                         Accept
//                       </button>

//                       <button
//                         className="px-3 py-1.5 bg-red-600 text-white text-xs rounded flex items-center hover:bg-red-700"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleStatusUpdate(payment._id, "failed");
//                         }}
//                       >
//                         <XCircle size={14} className="mr-1" />
//                         Reject
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

// export default QRPaymentRequests;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CheckCircle, XCircle, Clock, ChevronDown, ChevronRight } from "lucide-react";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const QRPaymentRequests = () => {
//   const [payments, setPayments] = useState([]);
//   const [expandedPayment, setExpandedPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [feedback, setFeedback] = useState("");
//   const [showFeedback, setShowFeedback] = useState(false);

//   const userId = localStorage.getItem("userId");

//   const fetchPayments = async () => {
//     try {
//       const res = await axios.get(
//         `${baseURL}/api/qrpayment/getqrpayment/${userId}`
//       );
//       if (res.data.success) {
//         setPayments(res.data.payments);
//       }
//     } catch (err) {
//       console.error(err);
//       setFeedback("Error loading QR payments");
//       setShowFeedback(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (paymentId, status) => {
//     try {
//       const res = await axios.patch(
//         `${baseURL}/api/qrpayment/qr/${paymentId}/status`,
//         {
//           status,
//           userId,
//         }
//       );

//       if (res.data.success) {
//         setFeedback(`Payment ${status === "completed" ? "accepted" : "rejected"} successfully`);
//         setShowFeedback(true);
//         fetchPayments();
        
//         // Hide feedback after 3 seconds
//         setTimeout(() => {
//           setShowFeedback(false);
//         }, 3000);
//       }
//     } catch (err) {
//       console.error(err);
//       setFeedback("Failed to update status");
//       setShowFeedback(true);
//     }
//   };

//   const togglePayment = (id) => {
//     setExpandedPayment(expandedPayment === id ? null : id);
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   if (loading) return <p className="text-center py-4">Loading QR payments…</p>;

//   if (payments.length === 0) {
//     return null; // Don't show the section if there are no payments
//   }

//   return (
//     <div className="mb-10">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
//         QR Payments
//       </h2>

//       {showFeedback && (
//         <div className="mb-4 text-sm p-3 bg-blue-50 border border-blue-100 text-blue-700 rounded-md">
//           {feedback}
//         </div>
//       )}

//       <div className="space-y-4">
//         {payments.map((payment) => {
//           const isSeller = payment.sellerId?._id === userId;
//           const formattedDate = new Date(payment.createdAt).toLocaleDateString();
          
//           return (
//             <div
//               key={payment._id}
//               className="bg-white rounded-lg shadow border overflow-hidden"
//             >
//               {/* Header - similar to orders */}
//               <div
//                 className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
//                 onClick={() => togglePayment(payment._id)}
//               >
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     {payment.bookId?.title || "Untitled Book"}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {formattedDate} • Rs. {payment.amount}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       payment.status === "completed"
//                         ? "bg-green-100 text-green-800"
//                         : payment.status === "failed"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {payment.status === "completed"
//                       ? "Accepted"
//                       : payment.status === "failed"
//                       ? "Rejected"
//                       : "Pending"}
//                   </span>
//                   {expandedPayment === payment._id ? (
//                     <ChevronDown size={20} className="text-gray-400" />
//                   ) : (
//                     <ChevronRight size={20} className="text-gray-400" />
//                   )}
//                 </div>
//               </div>

//               {/* Expanded content - similar to order details */}
//               {expandedPayment === payment._id && (
//                 <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
//                   {/* Book and payment info */}
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     {payment.bookId?.bookImage && (
//                       <img
//                         src={payment.bookId.bookImage}
//                         alt={payment.bookId.title || "Book"}
//                         className="w-16 h-20 object-cover rounded"
//                       />
//                     )}
                    
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-gray-900 mb-2">
//                         Payment Details
//                       </h4>
//                       <div className="grid grid-cols-2 gap-2 text-sm">
//                         <div className="text-gray-600">Amount:</div>
//                         <div>Rs. {payment.amount}</div>
                        
//                         <div className="text-gray-600">
//                           {isSeller ? "Buyer:" : "Seller:"}
//                         </div>
//                         <div>
//                           {isSeller
//                             ? payment.buyerId?.name || "N/A"
//                             : payment.sellerId?.name || "N/A"}
//                         </div>
                        
//                         {payment.mobile && (
//                           <>
//                             <div className="text-gray-600">Mobile:</div>
//                             <div>{payment.mobile}</div>
//                           </>
//                         )}
                        
//                         {payment.shippingAddress && (
//                           <>
//                             <div className="text-gray-600">Shipping Address:</div>
//                             <div>{payment.shippingAddress}</div>
//                           </>
//                         )}
                        
//                         <div className="text-gray-600">Status:</div>
//                         <div className="flex items-center">
//                           {payment.status === "pending" && (
//                             <span className="flex items-center text-yellow-600">
//                               <Clock size={16} className="mr-1" />
//                               Pending verification
//                             </span>
//                           )}
//                           {payment.status === "completed" && (
//                             <span className="flex items-center text-green-600">
//                               <CheckCircle size={16} className="mr-1" />
//                               Verified
//                             </span>
//                           )}
//                           {payment.status === "failed" && (
//                             <span className="flex items-center text-red-600">
//                               <XCircle size={16} className="mr-1" />
//                               Rejected
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Payment slip */}
//                   {payment.paymentSlip && (
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-2">
//                         Payment Slip
//                       </h4>
//                       <div className="border rounded-md overflow-hidden">
//                         <img
//                           src={payment.paymentSlip}
//                           alt="Payment Slip"
//                           className="w-32 h-auto rounded border"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Actions for sellers with pending payments */}
//                   {isSeller && payment.status === "pending" && (
//                     <div className="flex justify-end pt-4 border-t border-gray-200">
//                       <div className="space-x-2">
//                         <button
//                           onClick={() => handleStatusUpdate(payment._id, "completed")}
//                           className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
//                         >
//                           Accept Payment
//                         </button>
//                         <button
//                           onClick={() => handleStatusUpdate(payment._id, "failed")}
//                           className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
//                         >
//                           Reject Payment
//                         </button>
//                       </div>
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

// export default QRPaymentRequests;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronRight } from "lucide-react";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const QRPaymentRequests = () => {
  const [payments, setPayments] = useState([]);
  const [expandedPayment, setExpandedPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/qrpayment/getqrpayment/${userId}`
      );
      if (res.data.success) {
        setPayments(res.data.payments);
      }
    } catch (err) {
      console.error(err);
      setFeedback("Error loading QR payments");
      setShowFeedback(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (paymentId, status) => {
    try {
      const res = await axios.patch(
        `${baseURL}/api/qrpayment/qr/${paymentId}/status`,
        {
          status,
          userId,
        }
      );

      if (res.data.success) {
        setFeedback(`Payment ${status === "completed" ? "accepted" : "rejected"} successfully`);
        setShowFeedback(true);
        fetchPayments();
        
        // Hide feedback after 3 seconds
        setTimeout(() => {
          setShowFeedback(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setFeedback("Failed to update status");
      setShowFeedback(true);
    }
  };

  const togglePayment = (id) => {
    setExpandedPayment(expandedPayment === id ? null : id);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <p className="text-center py-4">Loading QR payments…</p>;

  if (payments.length === 0) {
    return null; // Don't show the section if there are no payments
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        
      </h2>

      {showFeedback && (
        <div className="mb-4 text-sm p-3 bg-blue-50 border border-blue-100 text-blue-700 rounded-md">
          {feedback}
        </div>
      )}

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
              const isSeller = payment.sellerId?._id === userId;
              const formattedDate = new Date(payment.createdAt).toLocaleDateString();
              
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
                        <div className="text-sm font-medium text-gray-900">
                          {payment.bookId?.title || "Untitled Book"}
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
                        {payment.status === "completed"
                          ? "Accepted"
                          : payment.status === "failed"
                          ? "Rejected"
                          : "Pending"}
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-600">Amount:</div>
                            <div>Rs. {payment.amount}</div>
                            
                            <div className="text-gray-600">
                              {isSeller ? "Buyer:" : "Seller:"}
                            </div>
                            <div>
                              {isSeller
                                ? payment.buyerId?.name || "N/A"
                                : payment.sellerId?.name || "N/A"}
                            </div>
                            
                            {payment.mobile && (
                              <>
                                <div className="text-gray-600">Mobile:</div>
                                <div>{payment.mobile}</div>
                              </>
                            )}
                            
                            {payment.shippingAddress && (
                              <>
                                <div className="text-gray-600">Shipping Address:</div>
                                <div>{payment.shippingAddress}</div>
                              </>
                            )}
                            
                            <div className="text-gray-600">Status:</div>
                            <div className="flex items-center">
                              {payment.status === "pending" && (
                                <span className="flex items-center text-yellow-600">
                                  <Clock size={16} className="mr-1" />
                                  Pending verification
                                </span>
                              )}
                              {payment.status === "completed" && (
                                <span className="flex items-center text-green-600">
                                  <CheckCircle size={16} className="mr-1" />
                                  Verified
                                </span>
                              )}
                              {payment.status === "failed" && (
                                <span className="flex items-center text-red-600">
                                  <XCircle size={16} className="mr-1" />
                                  Rejected
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Payment slip */}
                          {payment.paymentSlip && (
                            <div className="flex flex-col items-start">
                              <div className="text-sm font-medium text-gray-700 mb-2">Payment Slip</div>
                              <div className="border rounded-md overflow-hidden">
                                <img
                                  src={payment.paymentSlip}
                                  alt="Payment Slip"
                                  className="w-32 h-auto"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions for sellers with pending payments */}
                        {isSeller && payment.status === "pending" && (
                          <div className="flex justify-end pt-4 mt-4 border-t border-gray-200">
                            <div className="space-x-2">
                              <button
                                onClick={() => handleStatusUpdate(payment._id, "completed")}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                              >
                                Accept Payment
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(payment._id, "failed")}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                              >
                                Reject Payment
                              </button>
                            </div>
                          </div>
                        )}
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

export default QRPaymentRequests;