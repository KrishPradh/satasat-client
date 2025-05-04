import { useState, useEffect, useContext } from 'react';
import { AlertCircle, Check, Info, RefreshCw } from 'lucide-react';
import { baseURL } from '../Cart/Cart';
import { NotificationContext } from '../../Context/NotificationContext';

const NotificationsPage = () => {
  // const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const { notifications,  fetchNotifications} = useContext(NotificationContext);

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
  // const fetchNotifications = async () => {
  //   if (!userId) {
  //     setError("User ID not found");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await fetch(`${baseURL}/api/notification/getnoti/${userId}`);
  //     const data = await res.json();

  //     if (!res.ok || !data.success) {
  //       throw new Error(data.message || "Failed to fetch notifications");
  //     }

  //     setNotifications(data.data);
  //     setError(null);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getIcon = (type) => {
    switch (type) {
      case 'exchange_request':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'rental_request':
        return <Check className="text-green-500" size={20} />;
      case 'purchase':
        return <Info className="text-blue-500" size={20} />;
      default:
        return <Info className="text-gray-500" size={20} />;
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-36 mb-40 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        {/* <button 
          onClick={fetchNotifications} 
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button> */}
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {loading && !notifications.length ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="mb-4">
            <Info size={48} className="opacity-30" />
          </div>
          <p>No notifications to display</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((noti) => (
            <div key={noti._id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">{getIcon(noti.type)}</div>
                <div className="flex-grow">
                  <p className="text-gray-800">{noti.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(noti.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

// import { useContext } from 'react';
// import { AlertCircle, Check, Info, RefreshCw } from 'lucide-react';
// import { NotificationContext } from '../../Context/NotificationContext';


// const NotificationsPage = () => {
//   const { notifications, fetchNotifications, loading, error } = useContext(NotificationContext);

//   const getIcon = (type) => {
//     switch (type) {
//       case 'exchange_request':
//         return <AlertCircle className="text-yellow-500" size={20} />;
//       case 'rental_request':
//         return <Check className="text-green-500" size={20} />;
//       case 'purchase':
//         return <Info className="text-blue-500" size={20} />;
//       default:
//         return <Info className="text-gray-500" size={20} />;
//     }
//   };

//   const formatDate = (date) => {
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }).format(new Date(date));
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto mt-36 mb-40 p-6 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
//       </div>

//       {error && (
//         <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
//           <div className="flex items-center gap-2">
//             <AlertCircle size={16} />
//             <span>{error}</span>
//           </div>
//         </div>
//       )}

//       {loading && !notifications.length ? (
//         <div className="flex justify-center items-center h-32">
//           <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : notifications.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//           <div className="mb-4">
//             <Info size={48} className="opacity-30" />
//           </div>
//           <p>No notifications to display</p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {notifications.map((noti) => (
//             <div key={noti._id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
//               <div className="flex items-start gap-4">
//                 <div className="mt-1 flex-shrink-0">{getIcon(noti.type)}</div>
//                 <div className="flex-grow">
//                   <p className="text-gray-800">{noti.message}</p>
//                   <p className="text-xs text-gray-500 mt-1">{formatDate(noti.createdAt)}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationsPage;
