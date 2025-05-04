import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const ExchangeReqPage = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/ExchangeRequest/user`,
          { params: { userId }, withCredentials: true }
        );

        setReceivedRequests(
          (response.data.receivedRequests || []).filter((book) => {
            return book.status !== "accepted" && book.status !== "declined";
          })
          
        );
        setSentRequests(response.data.sentRequests || []);
      } catch (error) {
        console.error("Error fetching exchange requests:", error);
      }
    };

    fetchRequests();
  }, [userId]);

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/ExchangeRequest/updatestatus`,
        { requestId, status: newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setReceivedRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== requestId)
        );
      }
    } catch (error) {
      console.error(`Error updating request status to ${newStatus}:`, error);
    }
  };

  return (
    <div className="min-h-screen mt-14 bg-[#F5F9FF] p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Exchange Requests</h1>

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
              {receivedRequests.map((request) => (
                <li
                  key={request._id}
                  className="p-5 bg-gray-50 rounded-lg shadow-md"
                >
                  <div className="flex gap-4">
                    <img
                      src={`${request.senderBookImage}`}
                      alt={request.bookName}
                      className="w-20 h-28 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-800">
                        {request.bookName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Author: {request.author}
                      </p>
                      <p className="text-sm text-gray-600">
                      Posted by: {request.sender?.name ?? "Unknown"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-md"
                          onClick={() =>
                            updateRequestStatus(request._id, "accepted")
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                          onClick={() =>
                            updateRequestStatus(request?._id, "declined")
                          }
                        >
                          Decline
                        </button>
                        <button
                          className="text-blue-500 underline"
                          onClick={() =>
                            navigate(`/requestbookdetail/${request?._id}`)
                          }
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
              {sentRequests.map((request) => (
                <li
                  key={request?._id}
                  className="p-5 bg-gray-50 rounded-lg shadow-md"
                >
                  <div className="flex gap-4">
                    <img
                      src={`${request.senderBookImage}`}
                      alt={request.bookName}
                      className="w-20 h-28 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {request.bookName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Author: {request.author}
                      </p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : request.status === "accepted"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {request.status}
                      </span>
                      <div className="mt-2">
                        <button
                          className="text-blue-500 underline text-sm"
                          onClick={() =>
                            navigate(`/requestbookdetail/${request?._id}`)
                          }
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

export default ExchangeReqPage;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ExchangeReqPage = () => {
//   const [receivedRequests, setReceivedRequests] = useState([]);
//   const [sentRequests, setSentRequests] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [activeTab, setActiveTab] = useState("received");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const id = localStorage.getItem("userId");
//     setUserId(id);
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get(
//           "${baseURL}/api/ExchangeRequest/user",
//           { params: { userId }, withCredentials: true }
//         );

//         setReceivedRequests(response.data.receivedRequests || []);
//         setSentRequests(response.data.sentRequests || []);
//       } catch (error) {
//         console.error("Error fetching exchange requests:", error);
//       }
//     };

//     fetchRequests();
//   }, [userId]);

//   const updateRequestStatus = async (requestId, newStatus) => {
//     try {
//       const response = await axios.put(
//         "${baseURL}/api/ExchangeRequest/updatestatus",
//         { requestId, status: newStatus },
//         { withCredentials: true }
//       );

//       if (response.status === 200) {
//         setReceivedRequests((prevRequests) =>
//           prevRequests.filter((req) => req._id !== requestId)
//         );
//       }
//     } catch (error) {
//       console.error(`Error updating request status to ${newStatus}:`, error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight mb-2">
//             Book Exchange Requests
//           </h1>
//           <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
//             Manage your book exchange requests and connect with other readers
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center mb-8">
//           <div className="inline-flex rounded-lg bg-white shadow-md p-1">
//             <button
//               onClick={() => setActiveTab("received")}
//               className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
//                 activeTab === "received"
//                   ? "bg-indigo-600 text-white shadow-sm"
//                   : "text-gray-700 hover:text-indigo-600"
//               }`}
//             >
//               Received Requests
//             </button>
//             <button
//               onClick={() => setActiveTab("sent")}
//               className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
//                 activeTab === "sent"
//                   ? "bg-indigo-600 text-white shadow-sm"
//                   : "text-gray-700 hover:text-indigo-600"
//               }`}
//             >
//               Sent Requests
//             </button>
//           </div>
//         </div>

//         {/* Received Requests */}
//         {activeTab === "received" && (
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="bg-indigo-700 py-4 px-6">
//               <div className="flex items-center space-x-2">
//                 <div className="bg-white rounded-full p-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-indigo-700"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                     />
//                   </svg>
//                 </div>
//                 <h2 className="text-xl font-bold text-white">
//                   Received Requests
//                 </h2>
//               </div>
//             </div>
//             <div className="p-6">
//               {receivedRequests.length === 0 ? (
//                 <div className="text-center py-12">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-16 w-16 text-gray-300 mx-auto mb-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1}
//                       d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                     />
//                   </svg>
//                   <p className="text-gray-500 text-lg">
//                     No received requests found.
//                   </p>
//                   <p className="text-gray-400 mt-1">
//                     When someone sends you a book exchange request, it will
//                     appear here.
//                   </p>
//                 </div>
//               ) : (
//                 <ul className="space-y-6">
//                   {receivedRequests.map((request) => (
//                     <li
//                       key={request._id}
//                       className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
//                     >
//                       <div className="flex flex-col sm:flex-row">
//                         <div className="sm:w-1/4 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 flex items-center justify-center">
//                           <img
//                             src={`${baseURL}/${request.senderBookImage}`}
//                             alt={request.senderBookName}
//                             className="w-32 h-44 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
//                           />
//                         </div>
//                         <div className="sm:w-3/4 p-6">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="text-xl font-bold text-gray-800 mb-1">
//                                 {request.senderBookName}
//                               </h3>
//                               <p className="text-indigo-600 mb-2">
//                                 By {request.senderAuthor}
//                               </p>
//                               <div className="flex items-center mb-4">
//                                 <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
//                                   <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-4 w-4 text-indigo-600"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       strokeWidth={2}
//                                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                                     />
//                                   </svg>
//                                 </div>
//                                 <span className="text-gray-600">
//                                   Sent by{" "}
//                                   <span className="font-medium text-gray-800">
//                                     {request.sender?.name ?? "Unknown"}
//                                   </span>
//                                 </span>
//                               </div>
//                               <p className="text-sm text-gray-500">
//                                 Status:{" "}
//                                 <span className="font-semibold capitalize">
//                                   {request.status}
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex space-x-4 mt-4">
//                             <button
//                               className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-lg transition-colors duration-200"
//                               onClick={() =>
//                                 updateRequestStatus(request._id, "accepted")
//                               }
//                             >
//                               Accept
//                             </button>
//                             <button
//                               className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors duration-200"
//                               onClick={() =>
//                                 updateRequestStatus(request._id, "declined")
//                               }
//                             >
//                               Decline
//                             </button>
//                             <button
//                               className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium rounded-lg transition-colors duration-200 flex items-center"
//                               onClick={() =>
//                                 navigate(`/requestbookdetail/${request._id}`)
//                               }
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5 mr-1"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Sent Requests (simple list) */}
//         {activeTab === "sent" && (
//           <div className="bg-white rounded-xl shadow-xl p-6">
//             <h2 className="text-xl font-bold text-indigo-800 mb-4">
//               Sent Requests
//             </h2>
//             {sentRequests.length === 0 ? (
//               <p className="text-gray-500">You haven’t sent any requests yet.</p>
//             ) : (
//               <ul className="space-y-4">
//                 {sentRequests.map((request) => (
//                   <li
//                     key={request._id}
//                     className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
//                   >
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h3 className="font-semibold text-gray-800">
//                           {request.receiverBookName}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           To: {request.receiver?.name ?? "Unknown"}
//                         </p>
//                         <p className="text-sm text-gray-500 capitalize">
//                           Status: {request.status}
//                         </p>
//                       </div>
//                       <button
//                         className="text-indigo-600 text-sm font-medium hover:underline"
//                         onClick={() =>
//                           navigate(`/requestbookdetail/${request._id}`)
//                         }
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExchangeReqPage;
