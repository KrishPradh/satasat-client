// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RentReqPage = () => {
//   const [receivedRequests, setReceivedRequests] = useState([]);
//   const [sentRequests, setSentRequests] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   // Helper: Format duration object into readable string
//   const formatDuration = (duration) => {
//     if (!duration || typeof duration !== "object") return "N/A";

//     const parts = [];
//     if (duration.months) parts.push(`${duration.months} month${duration.months > 1 ? "s" : ""}`);
//     if (duration.weeks) parts.push(`${duration.weeks} week${duration.weeks > 1 ? "s" : ""}`);
//     if (duration.days) parts.push(`${duration.days} day${duration.days > 1 ? "s" : ""}`);

//     return parts.length > 0 ? parts.join(", ") : "N/A";
//   };

//   useEffect(() => {
//     const id = localStorage.getItem("userId");
//     setUserId(id);
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchRentRequests = async () => {
//       try {
//         const response = await axios.get(
//           "${baseURL}/api/rentrequest/getrequest",
//           {
//             params: { userId },
//             withCredentials: true,
//           }
//         );

//         setReceivedRequests(response.data.receivedRequests || []);
//         setSentRequests(response.data.sentRequests || []);
//       } catch (error) {
//         console.error("Error fetching rent requests:", error);
//       }
//     };

//     fetchRentRequests();
//   }, [userId]);

//   return (
//     <div className="min-h-screen mt-14 bg-[#F5F9FF] p-8">
//       <h1 className="text-3xl font-bold text-center mb-6">Rental Requests</h1>

//       <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
//         {/* Received Requests */}
//         <div className="p-6 bg-white shadow-lg rounded-xl">
//           <h2 className="text-xl font-semibold border-b pb-2">📥 Received Requests</h2>
//           {receivedRequests.length === 0 ? (
//             <p className="text-gray-500 mt-3">No received requests found.</p>
//           ) : (
//             <ul className="mt-3 space-y-4">
//               {receivedRequests.map((req) => (
//                 <li key={req._id} className="p-5 bg-gray-50 rounded-lg shadow-md">
//                   <p className="text-lg font-medium text-gray-800">
//                     {req.bookId?.title || "Unknown Title"}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Requested by: {req.renterUserId?.name || "Unknown User"}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Duration: {formatDuration(req.duration)}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Deposit: ₹{req.securityDeposit || 0}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Status: {req.status || "Pending"}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Sent Requests */}
//         <div className="p-6 bg-white shadow-lg rounded-xl">
//           <h2 className="text-xl font-semibold border-b pb-2">🛠 Sent Requests</h2>
//           {sentRequests.length === 0 ? (
//             <p className="text-gray-500 mt-3">No sent requests found.</p>
//           ) : (
//             <ul className="mt-3 space-y-4">
//               {sentRequests.map((req) => (
//                 <li key={req._id} className="p-5 bg-gray-50 rounded-lg shadow-md">
//                   <p className="text-lg font-medium text-gray-800">
//                     {req.bookId?.title || "Unknown Title"}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Owner: {req.ownerUserId?.name || "Unknown Owner"}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Duration: {formatDuration(req.duration)}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Status: {req.status || "Pending"}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentReqPage;

//----updated---
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RentReqPage = () => {
//   const [receivedRequests, setReceivedRequests] = useState([]);
//   const [sentRequests, setSentRequests] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   const formatDuration = (duration) => {
//     if (!duration || typeof duration !== "object") return "N/A";
//     const parts = [];
//     if (duration.months)
//       parts.push(`${duration.months} month${duration.months > 1 ? "s" : ""}`);
//     if (duration.weeks)
//       parts.push(`${duration.weeks} week${duration.weeks > 1 ? "s" : ""}`);
//     if (duration.days)
//       parts.push(`${duration.days} day${duration.days > 1 ? "s" : ""}`);
//     return parts.length > 0 ? parts.join(", ") : "N/A";
//   };

//   useEffect(() => {
//     const id = localStorage.getItem("userId");
//     setUserId(id);
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchRentRequests = async () => {
//       try {
//         const response = await axios.get(
//           "${baseURL}/api/rentrequest/getrequest",
//           {
//             params: { userId },
//             withCredentials: true,
//           }
//         );

//         setReceivedRequests(response.data.receivedRequests || []);
//         setSentRequests(response.data.sentRequests || []);
//       } catch (error) {
//         console.error("Error fetching rent requests:", error);
//       }
//     };

//     fetchRentRequests();
//   }, [userId]);

//   const handleStatusUpdate = async (requestId, newStatus) => {
//     try {
//       await axios.put("${baseURL}/api/rentrequest/updatestatus", {
//         requestId,
//         status: newStatus,
//       });
//       // Refresh requests after update
//       setReceivedRequests((prev) =>
//         prev.map((req) =>
//           req._id === requestId ? { ...req, status: newStatus } : req
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleViewDetails = (requestId) => {
//     navigate(`/rentrequest/details/${requestId}`);
//   };

//   return (
//     <div className="min-h-screen mt-14 bg-[#F5F9FF] p-8">
//       <h1 className="text-3xl font-bold text-center mb-6">Rental Requests</h1>

//       <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
//         {/* Received Requests */}
//         <div className="p-6 bg-white shadow-lg rounded-xl">
//           <h2 className="text-xl font-semibold border-b pb-2">
//             📥 Received Requests
//           </h2>
//           {receivedRequests.length === 0 ? (
//             <p className="text-gray-500 mt-3">No received requests found.</p>
//           ) : (
//             <ul className="mt-3 space-y-4">
//               {receivedRequests.map((req) => (
//                 <li
//                   key={req._id}
//                   className="p-5 bg-gray-50 rounded-lg shadow-md space-y-1"
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={`${baseURL}/${req.senderBookImage}`}
//                       alt={req.bookId?.title || "Book Image"}
//                       className="w-16 h-20 object-cover rounded-md border"
//                     />
//                     <p className="text-lg font-medium text-gray-800">
//                       {req.bookId?.title || "Unknown Title"}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     Requested by: {req.renterUserId?.name || "Unknown User"}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Duration: {formatDuration(req.duration)}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Deposit: Rs: {req.securityDeposit || 0}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Status:{" "}
//                     <span className="font-medium">
//                       {req.status || "Pending"}
//                     </span>
//                   </p>

//                   <div className="flex gap-2 mt-2">
//                     {req.status === "pending" && (
//                       <>
//                         <button
//                           onClick={() =>
//                             handleStatusUpdate(req._id, "accepted")
//                           }
//                           className="px-3 py-1 bg-green-500 text-white rounded-md"
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleStatusUpdate(req._id, "declined")
//                           }
//                           className="px-3 py-1 bg-red-500 text-white rounded-md"
//                         >
//                           Decline
//                         </button>
//                       </>
//                     )}
//                     <button
//                       onClick={() => handleViewDetails(req._id)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded-md"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Sent Requests */}
//         <div className="p-6 bg-white shadow-lg rounded-xl">
//           <h2 className="text-xl font-semibold border-b pb-2">
//             🛠 Sent Requests
//           </h2>
//           {sentRequests.length === 0 ? (
//             <p className="text-gray-500 mt-3">No sent requests found.</p>
//           ) : (
//             <ul className="mt-3 space-y-4">
//               {sentRequests.map((req) => (
//                 <li
//                   key={req._id}
//                   className="p-5 bg-gray-50 rounded-lg shadow-md space-y-1"
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={req.bookId?.image || "/default-book.png"}
//                       alt={req.bookId?.title || "Book Image"}
//                       className="w-16 h-20 object-cover rounded-md border"
//                     />
//                     <p className="text-lg font-medium text-gray-800">
//                       {req.bookId?.title || "Unknown Title"}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     Owner: {req.ownerUserId?.name || "Unknown Owner"}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Duration: {formatDuration(req.duration)}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Status:{" "}
//                     <span className="font-medium">
//                       {req.status || "Pending"}
//                     </span>
//                   </p>

//                   <button
//                     onClick={() => handleViewDetails(req._id)}
//                     className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
//                   >
//                     View Details
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentReqPage;




import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const RentReqPage = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const formatDuration = (duration) => {
    if (!duration || typeof duration !== "object") return "N/A";
    const parts = [];
    if (duration.months)
      parts.push(`${duration.months} month${duration.months > 1 ? "s" : ""}`);
    if (duration.weeks)
      parts.push(`${duration.weeks} week${duration.weeks > 1 ? "s" : ""}`);
    if (duration.days)
      parts.push(`${duration.days} day${duration.days > 1 ? "s" : ""}`);
    return parts.length > 0 ? parts.join(", ") : "N/A";
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchRentRequests = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/rentrequest/getrequest`,
          {
            params: { userId },
            withCredentials: true,
          }
        );

        setReceivedRequests(response.data.receivedRequests || []);
        setSentRequests(response.data.sentRequests || []);
      } catch (error) {
        console.error("Error fetching rent requests:", error);
      }
    };

    fetchRentRequests();
  }, [userId]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await axios.put(`${baseURL}/api/rentrequest/updatestatus`, {
        requestId,
        status: newStatus,
      });

      setReceivedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleViewDetails = (requestId) => {
    navigate(`/rentrequestbookdetail/${requestId}`);
  };

  return (
    <div className="min-h-screen mt-14 bg-[#F5F9FF] p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Rental Requests</h1>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        {/* Received Requests */}
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
            📥 Received Requests
          </h2>
          {receivedRequests.length === 0 ? (
            <p className="text-gray-500 mt-3">No received requests found.</p>
          ) : (
            <ul className="mt-3 space-y-4">
              {receivedRequests.map((req) => (
                <li
                  key={req._id}
                  className="p-5 bg-gray-50 rounded-lg shadow-md"
                >
                  <div className="flex gap-4">
                    <img
                      src={`${req.bookId?.bookImage}`}
                      alt={req.bookId?.title || "Book"}
                      className="w-20 h-28 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-800">
                        {req.bookId?.title || "Unknown Title"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Requested by: {req.renterUserId?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration: {formatDuration(req.duration)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Deposit: Rs {req.securityDeposit || 0}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Price: Rs {req.totalPrice || 0}
                      </p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                          req.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : req.status === "accepted"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {req.status}
                      </span>

                      <div className="mt-3 flex flex-wrap gap-3">
                        {req.status === "pending" && (
                          <>
                            <button
                              className="bg-green-500 text-white px-4 py-2 rounded-md"
                              onClick={() =>
                                handleStatusUpdate(req._id, "accepted")
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-md"
                              onClick={() =>
                                handleStatusUpdate(req._id, "declined")
                              }
                            >
                              Decline
                            </button>
                          </>
                        )}
                        <button
                          className="text-blue-500 underline text-sm"
                          onClick={() => handleViewDetails(req._id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sent Requests */}
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
            🛠 Sent Requests
          </h2>
          {sentRequests.length === 0 ? (
            <p className="text-gray-500 mt-3">No sent requests found.</p>
          ) : (
            <ul className="mt-3 space-y-4">
              {sentRequests.map((req) => (
                <li
                  key={req._id}
                  className="p-5 bg-gray-50 rounded-lg shadow-md"
                >
                  <div className="flex gap-4">
                    <img
                      src={req.bookId?.bookImage || "/default-book.png"}
                      alt={req.bookId?.title || "Book"}
                      className="w-20 h-28 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-800">
                        {req.bookId?.title || "Unknown Title"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Owner: {req.ownerUserId?.name || "Unknown Owner"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration: {formatDuration(req.duration)}
                      </p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                          req.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : req.status === "accepted"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {req.status}
                      </span>

                      <div className="mt-2">
                        <button
                          onClick={() => handleViewDetails(req._id)}
                          className="text-blue-500 underline text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentReqPage;
