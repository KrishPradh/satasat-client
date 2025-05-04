// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const CheckoutPage = () => {
//   const [user, setUser] = useState({
//     fullName: '',
//     phone: '',
//     email: '',
//     address: '',
//   });
//   const [userId, setUserId] = useState('');
//   const [cartBooks, setCartBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Get userId from localStorage
//         const storedUserId = localStorage.getItem('userId');
//         if (!storedUserId) {
//           toast.error("User not logged in.");
//           return;
//         }
//         setUserId(storedUserId);

//         // Fetch cart data
//         const cartResponse = await axios.get(`${baseURL}/api/cart/getcart`, {
//           withCredentials: true,
//         });
//         const cartData = cartResponse.data;

//         const formattedItems = cartData.books.map((item) => ({
//           _id: item.bookId._id,
//           title: item.bookId.title,
//           author: item.bookId.author,
//           price: item.bookId.price,
//           image: item.bookId.bookImage,
//           quantity: Number(item.quantity) || 1,
//         }));

//         setCartBooks(formattedItems);

//         // Optionally fetch user info if not stored
//         const userResponse = await axios.get(`${baseURL}/api/user`, {
//           withCredentials: true,
//         });

//         const userData = userResponse.data;
//         if (userData?.user) {
//           setUser({
//             fullName: userData.user.name || '',
//             phone: userData.user.phone || '',
//             email: userData.user.email || '',
//             address: userData.user.address || '',
//           });
//         } else {
//           toast.warning('User data missing.');
//         }

//         setIsLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err.message);
//         toast.error('Failed to load data');
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleKhaltiPayment = async () => {
//     try {
//       const orderPayload = {
//         purchaseOrderId: `ORD-${Date.now()}`,
//         userId: userId,
//         totalAmount: total.toFixed(2) * 100, // paisa
//         paymentMethod: 'khalti',
//         address: user.address,
//         books: cartBooks.map((book) => ({
//           bookId: book._id,
//           title: book.title,
//           author: book.author,
//           image: book.image || '',
//           quantity: book.quantity,
//           price: book.price,
//         })),
//       };

//       const res = await axios.post(`${baseURL}/api/payment/khalti/initiate`, orderPayload);

//       if (res.data.success) {
//         toast.success("Redirecting to Khalti...");
//         window.location.href = res.data.paymentUrl;
//       } else {
//         toast.error("Payment initiation failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Khalti initiation error.");
//     }
//   };

//   if (isLoading) return <div className="p-4">Loading...</div>;

//   const subtotal = cartBooks.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const shipping = 0;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold">Shipping Info</h2>
//         <p><strong>Name:</strong> {user.fullName}</p>
//         <p><strong>Address:</strong> {user.address}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//       </div>

//       <h2 className="text-lg font-semibold mb-2">Your Cart</h2>
//       {cartBooks.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         cartBooks.map(book => (
//           <div key={book._id} className="border rounded p-4 mb-4 shadow-sm bg-white">
//             <h3 className="font-semibold">{book.title}</h3>
//             <p>Author: {book.author}</p>
//             <p>Price: NPR {book.price}</p>
//             <p>Quantity: {book.quantity}</p>
//           </div>
//         ))
//       )}

//       <div className="mt-6 border-t pt-4">
//         <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
//         <p><strong>Subtotal:</strong> NPR {subtotal.toFixed(2)}</p>
//         <p><strong>Shipping:</strong> NPR {shipping.toFixed(2)}</p>
//         <p><strong>Tax (8%):</strong> NPR {tax.toFixed(2)}</p>
//         <p><strong>Total:</strong> NPR {total.toFixed(2)}</p>
//       </div>

//       <button
//         className="mt-6 bg-purple-600 text-white px-4 py-2 rounded"
//         onClick={handleKhaltiPayment}
//       >
//         Pay with Khalti
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;



// --Updated khalti code

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const CheckoutPage = () => {
//   const [user, setUser] = useState({
//     fullName: '',
//     phone: '',
//     email: '',
//     address: '',
//   });
//   const [userId, setUserId] = useState('');
//   const [cartBooks, setCartBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Get userId from localStorage
//         const storedUserId = localStorage.getItem('userId');
//         if (!storedUserId) {
//           toast.error("User not logged in.");
//           return;
//         }
//         setUserId(storedUserId);

//         // Fetch cart data
//         const cartResponse = await axios.get(`${baseURL}/api/cart/getcart`, {
//           withCredentials: true,
//         });
//         const cartData = cartResponse.data;

//         const formattedItems = cartData.books.map((item) => ({
//           _id: item.bookId._id,
//           title: item.bookId.title,
//           author: item.bookId.author,
//           price: item.bookId.price,
//           image: item.bookId.bookImage,
//           quantity: Number(item.quantity) || 1,
//         }));

//         setCartBooks(formattedItems);

//         // Optionally fetch user info if not stored
//         const userResponse = await axios.get(`${baseURL}/api/user`, {
//           withCredentials: true,
//         });

//         const userData = userResponse.data;
//         if (userData?.user) {
//           setUser({
//             fullName: userData.user.name || '',
//             phone: userData.user.phone || '',
//             email: userData.user.email || '',
//             address: userData.user.address || '',
//           });
//         } else {
//           toast.warning('User data missing.');
//         }

//         setIsLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err.message);
//         toast.error('Failed to load data');
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleKhaltiPayment = async () => {
//     try {
//       const orderPayload = {
//         purchaseOrderId: `ORD-${Date.now()}`,
//         userId: userId,
//         totalAmount: total.toFixed(2) * 100, // paisa
//         paymentMethod: 'khalti',
//         address: user.address,
//         books: cartBooks.map((book) => ({
//           bookId: book._id,
//           title: book.title,
//           author: book.author,
//           image: book.image || '',
//           quantity: book.quantity,
//           price: book.price,
//         })),
//       };

//       const res = await axios.post(`${baseURL}/api/payment/khalti/initiate`, orderPayload);

//       if (res.data.success) {
//         toast.success("Redirecting to Khalti...");
//         window.location.href = res.data.paymentUrl;
//       } else {
//         toast.error("Payment initiation failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Khalti initiation error.");
//     }
//   };

//   if (isLoading) return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
//     </div>
//   );

//   const subtotal = cartBooks.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const shipping = 0;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   return (
//     <div className="bg-gray-50 mt-16 min-h-screen py-10">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-purple-700 text-white py-6 px-8">
//           <h1 className="text-3xl font-extrabold">Checkout</h1>
//           <p className="text-purple-200 mt-1">Complete your purchase</p>
//         </div>
        
//         <div className="p-8">
//           {/* Two-column layout for desktop */}
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Left column: Customer info */}
//             <div>
//               <div className="mb-8">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                   </svg>
//                   Customer Information
//                 </h2>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
//                   <div className="mb-2">
//                     <span className="text-sm text-gray-500">Full Name</span>
//                     <p className="font-medium text-gray-800">{user.fullName}</p>
//                   </div>
//                   <div className="mb-2">
//                     <span className="text-sm text-gray-500">Email</span>
//                     <p className="font-medium text-gray-800">{user.email}</p>
//                   </div>
//                   <div className="mb-2">
//                     <span className="text-sm text-gray-500">Phone</span>
//                     <p className="font-medium text-gray-800">{user.phone || 'Not provided'}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm text-gray-500">Shipping Address</span>
//                     <p className="font-medium text-gray-800">{user.address}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
//                     <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
//                   </svg>
//                   Payment Method
//                 </h2>
//                 <button
//                   className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
//                   onClick={handleKhaltiPayment}
//                 >
//                   <span className="mr-2">Pay with Khalti</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
            
//             {/* Right column: Order summary */}
//             <div>
//               <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
//                 </svg>
//                 Order Summary
//               </h2>
              
//               <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-4">
//                 {cartBooks.length === 0 ? (
//                   <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
//                 ) : (
//                   <div className="divide-y divide-gray-200">
//                     {cartBooks.map(book => (
//                       <div key={book._id} className="py-3 flex items-start">
//                         <div className="h-16 w-12 bg-gray-200 rounded flex-shrink-0 mr-4 flex items-center justify-center">
//                           {book.image ? (
//                             <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
//                           ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                             </svg>
//                           )}
//                         </div>
//                         <div className="flex-grow">
//                           <h3 className="font-medium text-gray-800">{book.title}</h3>
//                           <p className="text-sm text-gray-500">{book.author}</p>
//                           <div className="flex justify-between mt-1">
//                             <span className="text-sm text-gray-600">Qty: {book.quantity}</span>
//                             <span className="font-medium text-gray-800">NPR {(book.price * book.quantity).toFixed(2)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
//                 <div className="flex justify-between mb-2">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-medium">NPR {subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-medium">NPR {shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span className="text-gray-600">Tax (8%)</span>
//                   <span className="font-medium">NPR {tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t border-gray-200 my-3"></div>
//                 <div className="flex justify-between">
//                   <span className="font-bold text-gray-800">Total</span>
//                   <span className="font-bold text-lg text-purple-600">NPR {total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center text-sm text-gray-500">
//           <p>Your order will be processed securely via Khalti payment gateway</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;




// khalti/COD code

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const CheckoutPage = () => {
  const [user, setUser] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [userId, setUserId] = useState('');
  const [cartBooks, setCartBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('khalti'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get userId from localStorage
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
          toast.error("User not logged in.");
          return;
        }
        setUserId(storedUserId);

        // Fetch cart data
        const cartResponse = await axios.get(`${baseURL}/api/cart/getcart`, {
          withCredentials: true,
        });
        const cartData = cartResponse.data;

        const formattedItems = cartData.books.map((item) => ({
          _id: item.bookId._id,
          title: item.bookId.title,
          author: item.bookId.author,
          price: item.bookId.price,
          image: item.bookId.bookImage,
          quantity: Number(item.quantity) || 1,
        }));

        setCartBooks(formattedItems);

        // Optionally fetch user info if not stored
        const userResponse = await axios.get(`${baseURL}/api/user`, {
          withCredentials: true,
        });

        const userData = userResponse.data;
        if (userData?.user) {
          setUser({
            fullName: userData.user.name || '',
            phone: userData.user.phone || '',
            email: userData.user.email || '',
            address: userData.user.address || '',
          });
        } else {
          toast.warning('User data missing.');
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        toast.error('Failed to load data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleKhaltiPayment = async () => {
    try {
      const orderPayload = {
        purchaseOrderId: `ORD-${Date.now()}`,
        userId: userId,
        totalAmount: total.toFixed(2) * 100, // paisa
        paymentMethod: 'khalti',
        address: user.address,
        books: cartBooks.map((book) => ({
          bookId: book._id,
          title: book.title,
          author: book.author,
          image: book.image || '',
          quantity: book.quantity,
          price: book.price,
        })),
      };

      const res = await axios.post(`${baseURL}/api/payment/khalti/initiate`, orderPayload);

      if (res.data.success) {
        toast.success("Redirecting to Khalti...");
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error("Payment initiation failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Khalti initiation error.");
    }
  };

  const handleCODPayment = async () => {
    try {
      const orderPayload = {
        purchaseOrderId: `ORD-${Date.now()}`,
        userId,
        totalAmount: total.toFixed(2) * 100, // Ensure the total is correct (e.g., rounded to 2 decimal places)
        paymentMethod: 'cod',
        address: user.address,
        books: cartBooks.map((book) => ({
          bookId: book._id,
          title: book.title,
          author: book.author,  
          image: book.image || '',  // fallback for missing image
          quantity: book.quantity,  // assuming cartBooks has this
          price: book.price,        // assuming cartBooks has this
        })),
      };
  
      const res = await axios.post(`${baseURL}/api/admin/codorders`, orderPayload);
  
      if (res.data.success) {
        toast.success("Order placed successfully. Please pay on delivery.");
        navigate('/codpay/successful');
      } else {
        toast.error("COD initiation failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("COD initiation error.");
    }
  };
  

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );

  const subtotal = cartBooks.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 mt-16 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-700 text-white py-6 px-8">
          <h1 className="text-3xl font-extrabold">Checkout</h1>
          <p className="text-purple-200 mt-1">Complete your purchase</p>
        </div>
        
        <div className="p-8">
          {/* Two-column layout for desktop */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column: Customer info */}
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Customer Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">Full Name</span>
                    <p className="font-medium text-gray-800">{user.fullName}</p>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">Email</span>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">Phone</span>
                    <p className="font-medium text-gray-800">{user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Shipping Address</span>
                    <p className="font-medium text-gray-800">{user.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Payment Method
                </h2>
                <div className="flex space-x-4">
                  <button
                    className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ${paymentMethod === 'khalti' ? 'bg-purple-700' : ''}`}
                    onClick={() => setPaymentMethod('khalti')}
                  >
                    Pay with Khalti
                  </button>
                  <button
                    className={`w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ${paymentMethod === 'cod' ? 'bg-gray-700' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    Pay on Delivery
                  </button>
                </div>
                <button
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
                  onClick={paymentMethod === 'khalti' ? handleKhaltiPayment : handleCODPayment}
                >
                  {paymentMethod === 'khalti' ? 'Pay with Khalti' : 'Place Order on COD'}
                </button>
              </div>
            </div>
            
            {/* Right column: Order summary */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Order Summary
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-4">
                {cartBooks.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {cartBooks.map(book => (
                      <div key={book._id} className="py-3 flex items-start">
                        <div className="h-16 w-12 bg-gray-200 rounded flex-shrink-0 mr-4 flex items-center justify-center">
                          {book.image ? (
                            <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-lg font-semibold text-gray-800">{book.title}</p>
                          <p className="text-sm text-gray-500">{book.author}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-gray-800 text-lg font-medium">${book.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="font-semibold text-lg text-gray-800">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="font-semibold text-lg text-gray-800">${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Tax</p>
                  <p className="font-semibold text-lg text-gray-800">${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-semibold text-lg text-gray-800">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
