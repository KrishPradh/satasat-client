import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const RentViewpage = () => {
  const { bookId } = useParams(); // Get the bookId from the URL
  const [bookDetail, setBookDetail] = useState(null); // State to store book details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Function to fetch book details from the API
  const handlefetchBookdetail = async () => {
    try {
      const response = await fetch(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBookDetail(data); // Set book data after response
    } catch (err) {
      console.error('Error fetching book details:', err);
      setError('Failed to load book details'); // Set error state
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch book details when the component mounts or bookId changes
  useEffect(() => {
    handlefetchBookdetail();
  }, [bookId]);

  if (loading) {
    return <p>Loading...</p>; // Show loading while data is being fetched
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error message if there's an issue
  }

  if (!bookDetail) {
    return <p>No book found</p>; // If no book data is found
  }

  const handleRentBookForm = () => {
    navigate(`/rent-form?book=${bookId}`); // Redirect to the desired form path
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Image */}
          <div className="bg-white shadow rounded p-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded flex items-center justify-center">
              {/* Assuming `bookDetail.bookImage` is the image URL */}
              <img src={`${baseURL}/${bookDetail.bookImage}`} alt={bookDetail.title} />
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">&lt;</button>
              <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">1</button>
              <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">&gt;</button>
            </div>
            <div className="mt-6">
              <p className="text-lg font-bold">Rs: {bookDetail.price} </p>
              <p className="text-sm text-gray-600">{bookDetail.condition}</p>
              <button onClick={handleRentBookForm} className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Rent
              </button>
            </div>
          </div>

          {/* Middle Section - Book Details */}
          <div className="bg-white shadow rounded p-6 md:col-span-2">
            <h2 className="text-2xl font-bold">{bookDetail.title}</h2>
            <p className="text-sm text-gray-600 mb-4">by {bookDetail.author}</p>
            <h3 className="font-bold text-lg">Book Description:</h3>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">
              {bookDetail.description}
            </p>

            <h3 className="mt-6 font-bold text-lg">Genres:</h3>
            <p className="text-gray-700 text-sm mt-2">
              {bookDetail.genre && Array.isArray(bookDetail.genre)
                ? bookDetail.genre.join(', ') // Safely join genres if it's an array
                : 'Genres not available'}
            </p>

            <h3 className="mt-6 font-bold text-lg">General:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-bold">Location:</p>
                <p className="text-sm text-gray-700">{bookDetail.location}</p>
              </div>
              <div>
                <p className="text-sm font-bold">Delivery:</p>
                <p className="text-sm text-gray-700">{bookDetail.deliveryAvailable ? 'Available' : 'Not Available'}</p>
                <p className="mt-2 text-sm font-bold">Negotiable:</p>
                <p className="text-sm text-gray-700">{bookDetail.negotiable ? 'Yes' : 'No'}</p>
              </div>
              <div>
                {bookDetail.postedBy ? (
                  <>
                    <h1>Posted By</h1>
                    <h2>Name: {bookDetail.postedBy.name}</h2>
                    <h2>Contact No.: {bookDetail.postedBy.contact}</h2>
                  </>
                ) : (
                  <p className="text-gray-500">Posted by information not available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentViewpage;
