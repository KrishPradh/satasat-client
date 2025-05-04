import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Admin-nav';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const OrderHistory = () => {
  const [orderData, setOrderData] = useState({ orders: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Available status options
  const statusOptions = ['pending', 'completed', 'failed'];

  // Fetch orders from backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Use your actual API endpoint
      const response = await axios.get(`${baseURL}/api/order/getallhistory`);
      setOrderData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to update order status
  // const updateStatus = async (orderId, newStatus) => {
  //   try {
  //     // Use your actual API endpoint
  //     await axios.patch(`${baseURL}/api/order/updateorder/${orderId}`, {
  //       status: newStatus
  //     });
      
  //     // Update local state after successful API call
  //     setOrderData(prevData => ({
  //       ...prevData,
  //       orders: prevData.orders.map(order => 
  //         order._id === orderId ? { ...order, status: newStatus } : order
  //       )
  //     }));
  //   } catch (err) {
  //     console.error('Error updating order status:', err);
  //     alert('Failed to update order status. Please try again.');
  //   }
  // };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${baseURL}/api/order/updateorder`, {
        orderId: orderId,
        paymentStatus: newStatus // Changed from status to paymentStatus
      });
      
      setOrderData(prevData => ({
        ...prevData,
        orders: prevData.orders.map(order => 
          order._id === orderId ? { ...order, paymentStatus: newStatus } : order
        )
      }));
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status. Please try again.');
    }
  };

  // Get status color
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default: // pending
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
            <button 
              onClick={fetchOrders} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Refresh Orders
            </button>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PaymentMethod
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center">
                        Loading orders...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-red-600">
                        {error}
                      </td>
                    </tr>
                  ) : !orderData.orders || orderData.orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orderData.orders.map((order) => (
                      <tr key={order.purchaseOrderId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.purchaseOrderId.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.userId ? `${order.userId.name || 'N/A'}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {order.bookTitle || 'N/A' }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {/* const totalNPR = (order.totalAmount ).toFixed(2); */}
                        Rs.{(order.totalAmount).toFixed(2)/100 || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <select
                            value={order.paymentStatus}
                            onChange={(e) => updateStatus(order._id, e.target.value)}
                            className="border rounded py-1 px-2 text-sm"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;