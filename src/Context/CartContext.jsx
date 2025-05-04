import axios from "axios";
import { useState,useEffect, useCallback } from "react";
import { createContext } from "react";
import { baseURL } from "../components/Cart/Cart";

export const CartContext=createContext()


const CartProvider=({children})=>{
    const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

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


    return <CartContext.Provider value={{cartItems,fetchCartData}}>
        {children}
    </CartContext.Provider>
}

export default CartProvider