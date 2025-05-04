import axios from "axios";
// import { useState,useEffect, useCallback } from "react";
import { createContext, useEffect, useState } from "react";
import { baseURL } from "../components/Cart/Cart";

export const NotificationContext=createContext()


const NotificationProvider=({children})=>{
    const [notifications, setNotifications] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [userId, setUserId] = useState(null);
    
      useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
      }, []);

      useEffect(() => {
        if (userId) {
          fetchNotifications();
        }
      }, [userId]);
    
      // Fetch notifications
      const fetchNotifications = async () => {
        if (!userId) {
          setError("User ID not found");
          return;
        }
    
        try {
          setLoading(true);
          const res = await fetch(`${baseURL}/api/notification/getnoti/${userId}`);
          const data = await res.json();
    
          if (!res.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch notifications");
          }
    
          setNotifications(data.data);
          setError(null);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    


    return <NotificationContext.Provider value={{notifications,fetchNotifications}}>
        {children}
    </NotificationContext.Provider>
}

export default NotificationProvider;


