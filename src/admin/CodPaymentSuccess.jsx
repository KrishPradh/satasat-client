import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home, Package } from 'lucide-react';

const CodPaymentSuccess = () => {
  const [animate, setAnimate] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 min-h-screen flex items-center justify-center px-4">
      <div className={`max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        
        {/* Success Header Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-6 px-8 relative">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <CheckCircle className="h-12 w-12 text-white opacity-20" />
          </div>
          <h1 className="text-3xl font-bold">Order Successful!</h1>
          <p className="text-green-100 mt-2 font-medium">Your order has been placed and is being processed</p>
        </div>

        {/* Main Content */}
        <div className="p-8 text-center">
          <div className={`transition-all duration-700 delay-300 transform ${animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank you for your order!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your package will arrive shortly. Please have the payment ready for the delivery person.
            </p>

            {/* Order Summary Card */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-100">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-green-600" />
                Order Summary
              </h3>
              
              <div className="flex justify-between text-sm border-b border-gray-200 pb-3 mb-3">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-medium text-gray-800">Cash on Delivery (COD)</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Expected Delivery</span>
                <span className="font-medium text-gray-800">3-5 business days</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link to="/" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </Link>
              <Link to="/orders" className="inline-flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-300">
                <Package className="h-5 w-5 mr-2" />
                Track Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Need help? Contact our <a href="#" className="text-green-600 font-medium hover:underline">customer support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodPaymentSuccess;