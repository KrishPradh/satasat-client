
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const CheckoutPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookDetail, setBookDetail] = useState(null);
  const [formData, setFormData] = useState({
    buyerId: "",
    bookId: "",
    sellerId: "",
    price: 0,
    address: "",
    phone: "",
    paymentMethod: "COD",
    paymentSlip: null,
    paymentSlipPreview: null
  });
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/user`, { withCredentials: true });
        if (data.success) {
          setFormData(prev => ({ ...prev, buyerId: data.user.id }));
        }
      } catch (error) {
        toast.error("Failed to identify user");
      }
    };
    fetchUserData();
  }, []);

  // Fetch book details when bookId is available
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookId) return;
      
      try {
        const { data } = await axios.get(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
        setBookDetail(data);
        setFormData(prev => ({
          ...prev,
          bookId: data._id,
          sellerId: data.user,
          price: data.price
        }));
      } catch (err) {
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookDetails();
  }, [bookId]);

  // Calculate total price including delivery fee
  const calculateTotal = () => {
    if (!bookDetail) return 0;
    return bookDetail.delivery === "Yes" ? bookDetail.price + 50 : bookDetail.price;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle payment slip upload
  const handlePaymentSlipChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, paymentSlip: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, paymentSlipPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit order handler
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!formData.address.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all delivery details");
      return;
    }
    
    if (formData.paymentMethod === "QR" && !formData.paymentSlip) {
      toast.error("Please upload your payment slip");
      return;
    }
    
    setIsOrderProcessing(true);
    
    try {
      if (formData.paymentMethod === "QR") {
        // Handle QR payment submission
        const formDataWithFile = new FormData();
        formDataWithFile.append("buyerId", formData.buyerId);
        formDataWithFile.append("sellerId", formData.sellerId);
        formDataWithFile.append("bookId", formData.bookId);
        formDataWithFile.append("amount", calculateTotal());
        formDataWithFile.append("mobile", formData.phone);
        formDataWithFile.append("shippingAddress", formData.address);
        formDataWithFile.append("paymentMethod", formData.paymentMethod);
        formDataWithFile.append("paymentSlip", formData.paymentSlip);
        
        const res = await axios.post(`${baseURL}/api/qrpayment/qr`, formDataWithFile, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        
        if (res.data.success) {
          toast.success("Order confirmed!");
          navigate("/order-success");
        } else {
          throw new Error("Payment failed");
        }
      } else {
        // Handle COD payment submission
        const res = await axios.post(`${baseURL}/api/codpayment/create/cod`, {
          buyerId: formData.buyerId,
          sellerId: formData.sellerId,
          bookId: formData.bookId,
          amount: calculateTotal(),
          mobile: formData.phone,
          shippingAddress: formData.address,
          paymentMethod: formData.paymentMethod
        });
        
        if (res.data.success) {
          toast.success("Order placed successfully!");
          navigate("/order-success");
        } else {
          throw new Error(res.data.message || "Payment failed");
        }
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsOrderProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!bookDetail) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-xl font-bold text-red-500 mb-4">Book Not Found</h2>
          <p className="mb-6 text-gray-600">The book you're looking for could not be found.</p>
          <button
            onClick={() => navigate("/books")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className=" bg-gradient-to-r from-[#2C5282] to-[#3b67a3] text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
            <p className="text-blue-100">Just a few more steps to get your book</p>
          </div>
          
          <div className="p-6 md:flex gap-8">
            {/* Order Summary */}
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  Order Summary
                </h2>
                
                <div className="flex items-start mb-6">
                  <div className="h-28 w-20 overflow-hidden rounded-md shadow-sm flex-shrink-0">
                    <img
                      src={bookDetail.bookImage}
                      alt={bookDetail.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg">{bookDetail.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">by {bookDetail.author}</p>
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                      Rs. {bookDetail.price}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs. {bookDetail.price}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">{bookDetail.delivery === "Yes" ? "Rs. 50" : "FREE"}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total</span>
                    <span className="text-blue-700">Rs. {calculateTotal()}</span>
                  </div>
                </div>
              </div>
              
              {/* Estimated Delivery */}
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-blue-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="font-medium text-blue-800">Estimated Delivery</h3>
                </div>
                <p className="text-sm text-blue-700">3-5 business days after order confirmation</p>
              </div>
            </div>
            
            {/* Checkout Form */}
            <div className="md:w-2/3">
              <form onSubmit={handleSubmitOrder} className="space-y-8">
                {/* Delivery Details */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Delivery Details
                  </h2>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-gray-700 mb-2 font-medium">
                        Delivery Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        rows="3"
                        placeholder="Enter your complete delivery address"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Enter your contact number"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    Payment Method
                  </h2>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* COD Option */}
                      <label 
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === "COD" 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={formData.paymentMethod === "COD"}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <div className="ml-3">
                          <span className="block font-medium">Cash on Delivery</span>
                          <span className="text-sm text-gray-500">Pay when you receive</span>
                        </div>
                      </label>
                      
                      {/* QR Option */}
                      <label 
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === "QR" 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="QR"
                          checked={formData.paymentMethod === "QR"}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <div className="ml-3">
                          <span className="block font-medium">QR Payment</span>
                          <span className="text-sm text-gray-500">Pay now via QR code</span>
                        </div>
                      </label>
                    </div>
                    
                    {formData.paymentMethod === "COD" ? (
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <div>
                            <p className="text-sm text-yellow-800">
                              Pay Rs. {calculateTotal()} in cash upon delivery.
                            </p>
                            <p className="text-xs text-yellow-700 mt-1">
                              An extra Rs. 20 COD charge may apply in some areas.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <p className="text-sm text-blue-700 mb-3">
                            Scan the QR code to pay Rs. {calculateTotal()}
                          </p>
                          <div className="bg-white p-2 rounded-lg shadow-sm">
                            <img
                              src={bookDetail.qrcodeImage}
                              alt="QR Code"
                              className="w-40 h-40 object-contain"
                            />
                          </div>
                        </div>
                        
                        {/* Payment Slip Upload */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h3 className="font-medium text-gray-800 mb-2">Upload Payment Slip</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            After making the payment, please upload a screenshot or photo of your payment receipt
                          </p>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Payment Verification
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePaymentSlipChange}
                              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              required={formData.paymentMethod === "QR"}
                            />
                          </div>
                          
                          {formData.paymentSlipPreview && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-600 mb-2">Payment Slip Preview:</p>
                              <div className="relative w-40 h-40 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                <img
                                  src={formData.paymentSlipPreview}
                                  alt="Payment slip preview"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center pt-4 gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/buysell/${bookId}`)}
                    className="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center"
                  >
                    Back to Book
                  </button>

                  <button
                    type="submit"
                    disabled={isOrderProcessing}
                    className={`px-8 py-3 bg-gradient-to-r from-[#2C5282] to-[#3b67a3] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
                      isOrderProcessing ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isOrderProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order 
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;