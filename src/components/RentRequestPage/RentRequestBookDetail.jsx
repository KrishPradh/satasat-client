import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaBook,
  FaTags,
  FaFileAlt,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaClipboardList,
  FaCalendarAlt
} from "react-icons/fa";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const RentRequestBookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    setUserId(loggedInUserId);
  }, []);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/rentrequest/getrequestbyid/${id}`);
        setRequest(response.data.request);
      } catch (error) {
        console.error("Error fetching rent request details:", error);
      }
    };

    fetchRequestDetails();
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      await axios.put(
        `${baseURL}/api/rentrequest/updatestatus`,
        { requestId: id, status: newStatus },
        { withCredentials: true }
      );
      navigate("/rentrequests");
    } catch (error) {
      console.error(`Error updating rent request status to ${newStatus}:`, error);
    }
  };

  if (!request) return <p className="text-center">Loading...</p>;

  const isOwner = userId === request.ownerUserId._id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900">Rental Request Details</h1>
        <div className="w-full h-60 overflow-hidden rounded-lg mt-4 flex justify-center items-center bg-gray-200">
          <img
            src={`${request.bookId?.bookImage}`}
            alt="Book"
            className="w-auto h-full object-cover"
          />
        </div>

        <div className="mt-4 space-y-3 text-gray-700">
          <p className="flex items-center gap-2 text-lg"><FaBook className="text-orange-500"/> <strong>Book Name:</strong> {request.bookId?.title}</p>
          {/* <p className="flex items-center gap-2"><FaUser className="text-orange-500"/> <strong>Author:</strong> {request.bookId?.author}</p> */}
          <p className="flex items-center gap-2"><FaClock className="text-orange-500"/> <strong>Requested By:</strong> {request.renterUserId?.name}</p>
          <p className="flex items-center gap-2"><FaCalendarAlt className="text-orange-500"/> <strong>Duration:</strong> 
            {request.duration?.months}m {request.duration?.weeks}w {request.duration?.days}d
          </p>
          <p className="flex items-center gap-2"><FaMoneyBill className="text-orange-500"/> <strong>Security Deposit:</strong> Rs. {request.securityDeposit}</p>
          <p className="flex items-center gap-2"><FaClipboardList className="text-orange-500"/> <strong>Rental Terms:</strong> {request.rentalTerms}</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-orange-500"/> <strong>Location:</strong> {request.location}</p>
          <p className="flex items-center gap-2"><FaPhone className="text-orange-500"/> <strong>Contact:</strong> {request.phoneNumber}</p>
          <p className="flex items-center gap-2"><FaMoneyBill className="text-green-700"/><strong>Total Price:</strong> {request.totalPrice}</p>
        </div>

        {request.status === "pending" && isOwner && (
          <div className="mt-4 flex justify-between">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              onClick={() => handleUpdateStatus("accepted")}
            >
              Accept
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => handleUpdateStatus("declined")}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentRequestBookDetail;
