

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUser, FaBook, FaTags, FaFileAlt, FaClock, FaPhone } from "react-icons/fa";

// const RequestBookDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [request, setRequest] = useState(null);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const loggedInUserId = localStorage.getItem("userId");
//     setUserId(loggedInUserId);
//   }, []);

//   useEffect(() => {
//     const fetchRequestDetails = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/ExchangeRequest/${id}`);
//         setRequest(response.data.request);
//       } catch (error) {
//         console.error("Error fetching request details:", error);
//       }
//     };

//     fetchRequestDetails();
//   }, [id]);

//   const handleUpdateStatus = async (newStatus) => {
//     try {
//       await axios.put(
//         "${baseURL}/api/ExchangeRequest/updatestatus",
//         { requestId: id, status: newStatus },
//         { withCredentials: true }
//       );
//       navigate("/requests");
//     } catch (error) {
//       console.error(`Error updating request status to ${newStatus}:`, error);
//     }
//   };

//   if (!request) return <p className="text-center">Loading...</p>;

//   const isReceiver = userId === request.receiver._id;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h1 className="text-2xl font-bold text-gray-900">Request Details</h1>
//         <div className="w-full h-60 overflow-hidden rounded-lg mt-4 flex justify-center items-center bg-gray-200">
//           <img 
//             src={`${baseURL}/${request.senderBookImage}`} 
//             alt="Book" 
//             className="w-auto h-full object-cover"
//           />
//         </div>
        
//         <div className="mt-4 space-y-3 text-gray-700">
//           <p className="flex items-center gap-2 text-lg"><FaBook className="text-orange-500"/> <strong>Book Name:</strong> {request.bookName}</p>
//           <p className="flex items-center gap-2"><FaUser className="text-orange-500"/> <strong>Author:</strong> {request.author}</p>
//           <p className="flex items-center gap-2"><FaTags className="text-orange-500"/> <strong>Genre:</strong> <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">{request.genre}</span></p>
//           <p className="flex items-center gap-2"><FaFileAlt className="text-orange-500"/> <strong>Description:</strong> {request.description}</p>
//           <p className="flex items-center gap-2"><FaClock className="text-orange-500"/> <strong>Posted By:</strong> {request.sender.name}</p>
//           <p className="flex items-center gap-2"><FaPhone className="text-orange-500"/> <strong>Contact:</strong> {request.number || "Not Available"}</p>
//         </div>

//         {request.status === "pending" && isReceiver && (
//           <div className="mt-4 flex justify-between">
//             <button 
//               className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
//               onClick={() => handleUpdateStatus("accepted")}
//             >
//               Accept
//             </button>
//             <button 
//               className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
//               onClick={() => handleUpdateStatus("declined")}
//             >
//               Decline
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RequestBookDetail;


  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { FaUser, FaBook, FaTags, FaFileAlt, FaClock, FaPhone, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const RequestBookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loggedInUserId = localStorage.getItem("userId");
      setUserId(loggedInUserId);
    }, []);

    useEffect(() => {
      const fetchRequestDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${baseURL}/api/ExchangeRequest/${id}`);
          setRequest(response.data.request);
        } catch (error) {
          console.error("Error fetching request details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRequestDetails();
    }, [id]);

    const handleUpdateStatus = async (newStatus) => {
      try {
        await axios.put(
          `${baseURL}/api/ExchangeRequest/updatestatus`,
          { requestId: id, status: newStatus },
          { withCredentials: true }
        );
        navigate("/requests");
      } catch (error) {
        console.error(`Error updating request status to ${newStatus}:`, error);
      }
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-orange-800 font-medium">Loading book details...</p>
          </div>
        </div>
      );
    }

    if (!request) return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">Request Not Found</h2>
          <p className="mt-2 text-gray-600">The book request you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate("/requests")}
            className="mt-4 flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            <FaArrowLeft /> Back to Requests
          </button>
        </div>
      </div>
    );

    const isReceiver = userId === request.receiver._id;
    const statusColor = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800"
    };

    return (
      <div className="min-h-screen bg-gradient-to-br mt-16 from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate("/requests")}
            className="mb-6 flex items-center gap-2 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition shadow"
          >
            <FaArrowLeft /> Back to Requests
          </button>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-blue-400 to-blue-200 p-6 flex justify-center items-center">
                <div className="w-full h-80 overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                  <img 
                    src={`${request.senderBookImage}`} 
                    alt={request.bookName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-3/5 p-8">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-gray-900">{request.bookName}</h1>
                  <span className={`${statusColor[request.status]} px-3 py-1 rounded-full text-sm font-medium uppercase`}>
                    {request.status}
                  </span>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <FaUser className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Author</p>
                      <p className="text-gray-800 font-medium">{request.author}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <FaTags className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Genre</p>
                      <p className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full inline-block text-sm font-medium">{request.genre}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <FaFileAlt className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-gray-800">{request.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <FaClock className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted By</p>
                      <p className="text-gray-800 font-medium">{request.sender.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <FaPhone className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="text-gray-800">{request.number || "Not Available"}</p>
                    </div>
                  </div>
                </div>
                
                {request.status === "pending" && isReceiver && (
                  <div className="mt-8 flex gap-4">
                    <button 
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg flex items-center justify-center gap-2"
                      onClick={() => handleUpdateStatus("accepted")}
                    >
                      <FaCheck /> Accept Request
                    </button>
                    <button 
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-lg flex items-center justify-center gap-2"
                      onClick={() => handleUpdateStatus("declined")}
                    >
                      <FaTimes /> Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default RequestBookDetail;