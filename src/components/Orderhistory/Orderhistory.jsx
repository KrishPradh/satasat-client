// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import QRPaymentRequests from "./Qrhistory";
// import CODPayments from "./Codhistory";

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!userId) {
//         setError("You must be logged in to see your orders.");
//         setLoading(false);
//         return;
//       }
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/api/order/history/${userId}`
//         );
//         if (res.data.success) {
//           setOrders(res.data.orders);
//         } else {
//           setError(res.data.message || "Failed to load orders.");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching order history.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [userId]);

//   const toggleOrder = (id) => {
//     setExpandedOrder(expandedOrder === id ? null : id);
//   };

//   const filterOrders = orders.filter((order) => {
//     if (!searchTerm) return true;
//     const lower = searchTerm.toLowerCase();
//     if (order._id.toLowerCase().includes(lower)) return true;
//     return order.items?.some((item) =>
//       item.bookId.title.toLowerCase().includes(lower)
//     );
//   });

//   const groupedOrders = {};
//   for (const order of filterOrders) {
//     const method = order.paymentMethod || "Other";
//     if (!groupedOrders[method]) groupedOrders[method] = [];
//     groupedOrders[method].push(order);
//   }

//   if (loading) return <p className="p-4 text-center">Loading your orders…</p>;
//   if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

//   return (
//     <div className="max-w-6xl mt-20 mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>

//       {/* Search input */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by order ID or book title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       <div className="space-y-8">
//         {filterOrders.length === 0 && (
//           <p className="text-center text-gray-600">
//             No orders match your search.
//           </p>
//         )}

//         {Object.entries(groupedOrders).map(([method, orders]) => (
//           <div key={method} className="mb-10">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
//               {method}
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Bookname
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {orders.map((order) => {
//                     const totalNPR = (order.totalAmount / 100).toFixed(2);
//                     return (
//                       <React.Fragment key={order._id}>
//                         <tr
//                           className="hover:bg-gray-50 cursor-pointer"
//                           onClick={() => toggleOrder(order._id)}
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             {order.bookTitle}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {new Date(order.createdAt).toLocaleDateString()}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span
//                               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                                 order.paymentStatus === "completed"
//                                   ? "bg-green-100 text-green-800"
//                                   : order.paymentStatus === "pending"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : "bg-gray-100 text-gray-800"
//                               }`}
//                             >
//                               {order.paymentStatus}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             NPR {totalNPR}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {expandedOrder === order._id ? (
//                               <ChevronDown size={20} className="text-gray-400" />
//                             ) : (
//                               <ChevronRight size={20} className="text-gray-400" />
//                             )}
//                           </td>
//                         </tr>

//                         {expandedOrder === order._id && (
//                           <tr>
//                             <td colSpan="5" className="px-6 py-4 bg-gray-50">
//                               <div className="space-y-4">
//                                 <div>
//                                   <h4 className="font-semibold text-gray-900 mb-1">
//                                     Shipping Address
//                                   </h4>
//                                   <p className="text-gray-700">{order.address}</p>
//                                 </div>

//                                 <div className="mt-4">
//                                   <h4 className="font-semibold text-gray-900 mb-2">
//                                     Books in this Order
//                                   </h4>
//                                   <table className="min-w-full divide-y divide-gray-200">
//                                     <thead className="bg-gray-100">
//                                       <tr>
//                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Image</th>
//                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Title</th>
//                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Author</th>
//                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       {order.bookId.map((book, idx) => (
//                                         <tr key={idx}>
//                                           <td className="px-4 py-2">
//                                             <img
//                                               src={book.bookImage}
//                                               alt={book.title}
//                                               className="w-16 h-20 object-cover rounded"
//                                             />
//                                           </td>
//                                           <td className="px-4 py-2 text-sm text-gray-900">{book.title}</td>
//                                           <td className="px-4 py-2 text-sm text-gray-600">{book.author}</td>
//                                           <td className="px-4 py-2 text-sm text-gray-600">Rs. {book.price}</td>
//                                         </tr>
//                                       ))}
//                                     </tbody>
//                                   </table>
//                                 </div>

//                                 <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//                                   <div className="text-lg font-semibold text-gray-900">
//                                     Total: NPR {totalNPR}
//                                   </div>
//                                   <div className="space-x-2">
//                                     {order.paymentUrl && (
//                                       <a
//                                         href={order.paymentUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                                       >
//                                         View Receipt
//                                       </a>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))}

//         <div>
//           <CODPayments />
//         </div>
//         <div>
//           <QRPaymentRequests />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";
import QRPaymentRequests from "./Qrhistory";
import CODPayments from "./Codhistory";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError("You must be logged in to see your orders.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/order/history/${userId}`
        );
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setError(res.data.message || "Failed to load orders.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching order history.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const filterOrders = orders.filter((order) => {
    if (!searchTerm) return true;
    const lower = searchTerm.toLowerCase();
    if (order._id.toLowerCase().includes(lower)) return true;
    return order.items?.some((item) =>
      item.bookId.title.toLowerCase().includes(lower)
    );
  });

  const groupedOrders = {};
  for (const order of filterOrders) {
    const method = order.paymentMethod || "Other";
    if (!groupedOrders[method]) groupedOrders[method] = [];
    groupedOrders[method].push(order);
  }

  if (loading) return <p className="p-4 text-center">Loading your orders…</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mt-20 mx-auto mb-60 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>

      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by order ID or book title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="space-y-8">
        {filterOrders.length === 0 && (
          <p className="text-center text-gray-600">
            {/* No orders match your search. */}
          </p>
        )}

        {Object.entries(groupedOrders).map(([method, orders]) => (
          <div key={method} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              {/* {method} */}
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Book
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => {
                    const totalNPR = (order.totalAmount / 100).toFixed(2);
                    return (
                      <React.Fragment key={order._id}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {/* {order.bookImage && (
                          <img
                            src={order.bookImage}
                            alt="Book"
                            className="w-8 h-10 object-cover rounded-sm mr-2"
                          />
                        )} */}

                              <div className="text-sm font-medium text-gray-900">
                                {order.bookTitle || "Untitled Book"}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                order.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : order.paymentStatus === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            NPR {totalNPR}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => toggleOrder(order._id)}
                              className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            >
                              Details
                              {expandedOrder === order._id ? (
                                <ChevronDown size={16} className="ml-1" />
                              ) : (
                                <ChevronRight size={16} className="ml-1" />
                              )}
                            </button>
                          </td>
                        </tr>

                        {expandedOrder === order._id && (
                          <tr>
                            <td
                              colSpan="5"
                              className="px-4 py-3 border-t border-gray-100 bg-gray-50"
                            >
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    Shipping Address
                                  </h4>
                                  <p className="text-gray-700">
                                    {order.address}
                                  </p>
                                </div>

                                <div className="mt-4">
                                  <h4 className="font-semibold text-gray-900 mb-2">
                                    Books in this Order
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 border rounded">
                                      <thead className="bg-gray-100">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            Image
                                          </th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            Title
                                          </th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            Author
                                          </th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            Price
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white divide-y divide-gray-200">
                                        {order.bookId.map((book, idx) => (
                                          <tr key={idx}>
                                            <td className="px-4 py-2">
                                              <img
                                                src={book.bookImage}
                                                alt={book.title}
                                                className="w-12 h-16 object-cover rounded"
                                              />
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-900">
                                              {book.title}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-600">
                                              {book.author}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-600">
                                              Rs. {book.price}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                  <div className="text-lg font-semibold text-gray-900">
                                    Total: NPR {totalNPR}
                                  </div>
                                  <div className="space-x-2">
                                    {order.paymentUrl && (
                                      <a
                                        href={order.paymentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                      >
                                        View Receipt
                                      </a>
                                    )}
                                  </div>
                                </div>
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
        ))}

        <div>
          <CODPayments />
        </div>
        <div>
          <QRPaymentRequests />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
