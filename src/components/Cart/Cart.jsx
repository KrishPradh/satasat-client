// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [book, setBook] = useState(null);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);

//   // Fetch userId from localStorage when the component mounts
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId"); // Assuming 'userId' is saved in localStorage
//     if (storedUserId) {
//       setUserId(storedUserId);
//     } else {
//       setError("Log in to see the items you've added to your cart!");
//       setLoading(false);
//     }
//   }, []);

//   const fetchCartData = useCallback(async () => {
//     if (!userId) {
//       setError("Invalid user ID.");
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const response = await axios.get(`${baseURL}/api/cart/getcart`, {
//         withCredentials: true,
//       });
//       const cartData = response.data;
      
//       const formattedItems = cartData.books.map((item) => ({
//         id: item.bookId._id,
//         name: item.bookId.title,
//         image: item.bookId.bookImage,
//         price: item.bookId.price,
//         quantity: Number(item.quantity) > 0 ? item.quantity : 1, 
//       }));
  
//       setCartItems(formattedItems);
//     } catch (err) {
//       setError("Failed to load cart. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);
  

//   useEffect(() => {
//     if (userId) {
//       fetchCartData();
//     }
//   }, [fetchCartData, userId]);

//   // Calculate totals
//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const shipping = 0;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   // Handle quantity change
//   const updateQuantity = async (id, newQuantity) => {
//     if (newQuantity < 1) return;
  
//     const originalCart = [...cartItems];
  
//     // Optimistically update the UI
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
  
//     try {
//       await axios.patch(
//         `${baseURL}/api/cart/update/${id}`,
//         { quantity: newQuantity,bookId:id },
//         { withCredentials: true }
//       );
//       // No need to refetch — UI already updated
//     } catch (err) {
//       console.error("Failed to update quantity", err);
//       setError("Error updating quantity. Please try again.");
  
//       // Revert to original cart items
//       setCartItems(originalCart);
//     }
//   };
  
//   // Handle item removal
//   const removeItem = async (bookId) => {
//     try {
//       const response = await axios.delete(
//         `${baseURL}/api/cart/remove/${bookId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       // Only update the cart if the response contains the new list of books
//       if (response.data.books) {
//         setCartItems(
//           response.data.books.map((item) => ({
//             id: item.bookId._id,
//             name: item.bookId.title,
//             image: item.bookId.bookImage,
//             price: item.bookId.price,
//             quantity: item.quantity,
//           }))
//         );
//       }
//     } catch (err) {
//       console.error("Failed to remove item from cart", err);
//       setError("Error removing item. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-gray-50 mt-16 min-h-screen py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">
//           Your Shopping Cart
//         </h1>

//         {loading ? (
//           <div className="text-center text-gray-900">Loading your cart...</div>
//         ) : error ? (
//           <div className="bg-white rounded-lg shadow-md p-6 text-center">
//             <h2 className="text-xl font-medium text-gray-900 mb-4">Notice</h2>
//             <p className="text-gray-600 mb-6">
//               {error}{" "}
//             </p>
//           </div>
//         ) : cartItems.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-6 text-center">
//             <h2 className="text-xl font-medium text-gray-900 mb-4">
//               Your cart is empty
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Looks like you haven't added anything to your cart yet.
//             </p>
//             <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
//               Start Shopping
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col md:flex-row gap-8">
//             {/* Cart Items */}
//             <div className="md:w-2/3">
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-6 border-b border-gray-200">
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     Cart Items ({cartItems.length})
//                   </h2>
//                 </div>

//                 <ul>
//                   {cartItems.map((item) => (
//                     <li
//                       key={item.id}
//                       className="border-b border-gray-200 last:border-b-0"
//                     >
//                       <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-20 h-20 object-cover rounded"
//                         />

//                         <div className="flex-1">
//                           <h3 className="text-lg font-medium text-gray-900">
//                             {item.name}
//                           </h3>
//                           <p className="text-gray-600 mt-1">
//                             Price: Rs.{item.price.toFixed(2)}
//                           </p>
//                         </div>

//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center border border-gray-300 rounded-md">
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity - 1)
//                               }
//                               className="px-3 py-1 text-gray-600 hover:bg-gray-100"
//                             >
//                               -
//                             </button>
//                             <span>{item.quantity}</span>
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity + 1)
//                               }
//                               className="px-3 py-1 text-gray-600 hover:bg-gray-100"
//                             >
//                               +
//                             </button>
//                           </div>

//                           <div className="w-20 text-right">
//                             <p className="text-lg font-medium text-gray-900">
//                               Rs.{(item.price * item.quantity).toFixed(2)}
//                             </p>
//                           </div>

//                           <button
//                             onClick={() => removeItem(item.id)}
//                             className="text-red-500 hover:text-red-700 transition"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-6 w-6"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Continue Shopping & Update Cart */}
//               <div className="flex justify-between mt-6">
//                 <button className="px-6 py-3 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition">
//                   Continue Shopping
//                 </button>
//                 {/* <button className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
//                   Update Cart
//                 </button> */}
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="md:w-1/3">
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="text-gray-900 font-medium">
//                       Rs.{subtotal.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="text-gray-900 font-medium">
//                       Rs.{shipping.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Tax</span>
//                     <span className="text-gray-900 font-medium">
//                       Rs.{tax.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="border-t border-gray-200 pt-4 mt-4">
//                     <div className="flex justify-between">
//                       <span className="text-lg font-semibold text-gray-900">
//                         Total
//                       </span>
//                       <span className="text-xl font-bold text-gray-900">
//                         Rs.{total.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <Link to={`/buynew-checkout/${book._id}?userId =${userId}`}> 
//                 <button className="w-full mt-8 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition font-medium text-lg">
//                   Proceed to Checkout
//                 </button>
//                 </Link> 
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
// import { CartContext } from "../../CartContext";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const { cartItems:contextCartITEMS, fetchCartData:contextfetchCartData } = useContext(CartContext);
  // const data=useContext(CartContext)

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("Log in to see the items you've added to your cart!");
      setLoading(false);
    }
  }, []);

  const fetchCartData = useCallback(async () => {
    if (!userId) {
      setError("Invalid user ID.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${baseURL}/api/cart/getcart`, {
        withCredentials: true,
      });
      const cartData = response.data;

      const formattedItems = cartData.books.map((item) => ({
        id: item.bookId._id,
        name: item.bookId.title,
        image: item.bookId.bookImage,
        price: item.bookId.price,
        quantity: Number(item.quantity) > 0 ? item.quantity : 1,
      }));

      setCartItems(formattedItems);
    } catch (err) {
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchCartData();
    }
  }, [fetchCartData, userId]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    const originalCart = [...cartItems];
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      await axios.patch(
        `${baseURL}/api/cart/update/${id}`,
        { quantity: newQuantity, bookId: id },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
      setError("Error updating quantity. Please try again.");
      setCartItems(originalCart);
    }
  };

  const removeItem = async (bookId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/cart/remove/${bookId}`,
        { withCredentials: true }
      );

      if (response.data.books) {
        setCartItems(
          response.data.books.map((item) => ({
            id: item.bookId._id,
            name: item.bookId.title,
            image: item.bookId.bookImage,
            price: item.bookId.price,
            quantity: item.quantity,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to remove item from cart", err);
      setError("Error removing item. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 mt-16 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Shopping Cart
        </h1>

        {loading ? (
          <div className="text-center text-gray-900">Loading your cart...</div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Notice</h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                <ul>
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />

                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            Price: Rs.{item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          <div className="w-20 text-right">
                            <p className="text-lg font-medium text-gray-900">
                              Rs.{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            🗑️
                          </button>
                          {/* <Link
                            to ={`/buynew-checkout/${item.id}`}
                          >
                            <button className="w-full mt-8 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition font-medium text-lg">
                              Proceed to Checkout
                            </button>
                          </Link> */}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">
                      Rs.{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">
                      Rs.{shipping.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900 font-medium">
                      Rs.{tax.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        Rs.{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/buynew-checkout/"
                >
                  <button className="w-full mt-8 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition font-medium text-lg">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
