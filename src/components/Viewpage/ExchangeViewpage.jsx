// import React, { useState } from 'react';
// // import King from '../../Images/King.jpg';
// import { useParams } from 'react-router-dom';

// const Viewpage = () => {

//   const bookId = useParams();

//   // const [bookDetail, setBookDetail] = useState([])
//   // const navigate = useNavigate();
//   // const [Loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null);

//   const handlefetchBookdetail = async () => {
//     // setLoading(true); // Start loading
//     // setError(null); // Reset error before fetching
//     try {
//       const response = await fetch(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
//       const data = await response.json();
//       // setBookDetail(data); // Set book data after response
//     } catch (err) {
//       console.error('Error fetching book details:', err);
//       setError('Failed to load book details'); // Set error state
//     } 
//   };

//   return (
//     <div className="min-h-screen pt-24 bg-gray-100">
//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Left Section - Image */}
//           <div className="bg-white shadow rounded p-4">
//             <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded flex items-center justify-center">
//               {/* <img src={King} alt="" /> */}
//             </div>
//             <div className="flex justify-between items-center mt-4">
//               <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">&lt;</button>
//               <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">1</button>
//               <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">&gt;</button>
//             </div>
//             <div className="mt-6">
//               <p className="text-lg font-bold">Rs. 3500</p>
//               <p className="text-sm text-gray-600">New</p>
//               <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//                 Rent Now
//               </button>
//             </div>
//           </div>

//           {/* Middle Section - Book Details */}
//           <div className="bg-white shadow rounded p-6 md:col-span-2">
//             <h2 className="text-2xl font-bold">No Longer Human</h2>
//             <p className="text-sm text-gray-600 mb-4">by Osamu Dazai</p>
//             <h3 className="font-bold text-lg">Book Description:</h3>
//             <p className="text-gray-700 mt-2 text-sm leading-relaxed">
//               Osamu Dazai's <em>No Longer Human</em>, his leading postwar Japanese writer's second novel,
//               tells the poignant and fascinating story of a young man who is caught between the breakup
//               of traditions and Western influences...
//             </p>

//             <h3 className="mt-6 font-bold text-lg">Genres:</h3>
//             <p className="text-gray-700 text-sm mt-2">Fiction and Literature: Japanese Literature</p>
//             <p className="text-gray-700 text-sm">Spirituality and Philosophy: Philosophy</p>

//             <h3 className="mt-6 font-bold text-lg">General:</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <p className="text-sm font-bold">Location:</p>
//                 <p className="text-sm text-gray-700">
//                   nepal sahakari bhitya sastha ltd, new baneshwor, Kathmandu-10...
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold">Delivery:</p>
//                 <p className="text-sm text-gray-700">Available</p>
//                 <p className="mt-2 text-sm font-bold">Negotiable:</p>
//                 <p className="text-sm text-gray-700">No</p>
//               </div>
//               <div>
//                     <h1>Posted By</h1>
//                     <h2>Name: Krish</h2>
//                     <h2>contact no. : 98000000 </h2>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Viewpage;


  // import React, { useEffect, useState } from 'react';
  // import { useNavigate, useParams } from 'react-router-dom';

  // const ExchangeViewpage = () => {
  //   const { bookId } = useParams(); // Get the bookId from the URL
  //   const [bookDetail, setBookDetail] = useState(null); // State to store book details
  //   const [loading, setLoading] = useState(true); // Loading state
  //   const [error, setError] = useState(null); // Error state
  //   const navigate = useNavigate();

  //   // Function to fetch book details from the API
  //   const handlefetchBookdetail = async () => {
  //     try {
  //       const response = await fetch(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
        
  //       // Check if response is ok
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setBookDetail(data); // Set book data after response
  //     } catch (err) {
  //       console.error('Error fetching book details:', err);
  //       setError('Failed to load book details'); // Set error state
  //     } finally {
  //       setLoading(false); // Stop loading
  //     }
  //   };

  //   // Fetch book details when the component mounts or bookId changes
  //   useEffect(() => {
  //     handlefetchBookdetail();
  //   }, [bookId]);

  //   if (loading) {
  //     return <p>Loading...</p>; // Show loading while data is being fetched
  //   }

  //   if (error) {
  //     return <p className="text-red-500">{error}</p>; // Show error message if there's an issue
  //   }

  //   if (!bookDetail) {
  //     return <p>No book found</p>; // If no book data is found
  //   }

  //   const handleExchangeBookForm = () => {
  //     navigate(`/exchange-form?book=${bookId}`); // Redirect to the desired form path
  //   };

  //   return (
  //     <div className="min-h-screen pt-24 bg-gray-100">
  //       {/* Main Content */}
  //       <div className="container mx-auto px-4 py-10">
  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //           {/* Left Section - Image */}
  //           <div className="bg-white shadow rounded p-4">
  //             <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded flex items-center justify-center">
  //               {/* Assuming `bookDetail.bookImage` is the image URL */}
  //               <img src={`${baseURL}/${bookDetail.bookImage}`} alt={bookDetail.title} />
  //             </div>
  //             <div className="flex justify-between items-center mt-4">
  //               <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">&lt;</button>
  //               <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">1</button>
  //               <button className="p-2 bg-gray-300 rounded hover:bg-gray-400">&gt;</button>
  //             </div>
  //             <div className="mt-6">
  //               {/* <p className="text-lg font-bold">{bookDetail.price} Rs.</p> */}
  //               <p className="text-sm text-gray-600">{bookDetail.condition}</p>
  //               <button onClick={handleExchangeBookForm} className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
  //                 Exchange
  //               </button>
  //             </div>
  //           </div>

  //           {/* Middle Section - Book Details */}
  //           <div className="bg-white shadow rounded p-6 md:col-span-2">
  //             <h2 className="text-2xl font-bold">{bookDetail.title}</h2>
  //             <p className="text-sm text-gray-600 mb-4">by {bookDetail.author}</p>
  //             <h3 className="font-bold text-lg">Book Description:</h3>
  //             <p className="text-gray-700 mt-2 text-sm leading-relaxed">
  //               {bookDetail.description}
  //             </p>

  //             <h3 className="mt-6 font-bold text-lg">Genres:</h3>
  //             <p className="text-gray-700 text-sm mt-2">
  //               {bookDetail.genre && Array.isArray(bookDetail.genre)
  //                 ? bookDetail.genre.join(', ') // Safely join genres if it's an array
  //                 : 'Genres not available'}
  //             </p>

  //             <h3 className="mt-6 font-bold text-lg">General:</h3>
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  //               <div>
  //                 <p className="text-sm font-bold">Location:</p>
  //                 <p className="text-sm text-gray-700">{bookDetail.location}</p>
  //               </div>
  //               <div>
  //                 <p className="text-sm font-bold">Delivery:</p>
  //                 <p className="text-sm text-gray-700">{bookDetail.deliveryAvailable ? 'Available' : 'Not Available'}</p>
  //                 <p className="mt-2 text-sm font-bold">Negotiable:</p>
  //                 <p className="text-sm text-gray-700">{bookDetail.negotiable ? 'Yes' : 'No'}</p>
  //               </div>
  //               <div>
  //                 {bookDetail.postedBy ? (
  //                   <>
  //                     <h1>Posted By</h1>
  //                     <h2>Name: {bookDetail.postedBy.name}</h2>
  //                     <h2>Contact No.: {bookDetail.postedBy.contact}</h2>
  //                   </>
  //                 ) : (
  //                   <p className="text-gray-500">Posted by information not available.</p>
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default ExchangeViewpage;


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const ExchangeViewpage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError('Could not load book details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [bookId]);
  
  // Handle exchange request
  const handleExchange = () => {
    navigate(`/exchange-form?book=${bookId}`);
  };
  
  // Get condition styling
  const getConditionClass = (condition) => {
    switch(condition?.toLowerCase()) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like new': return 'bg-emerald-100 text-emerald-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold text-red-500">Error</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => navigate('/books')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }
  
  // No book found
  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">No Book Found</h2>
          <button 
            onClick={() => navigate('/books')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 bg-blue-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex text-sm">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span className="mx-2">/</span>
          <a href="/books" className="hover:text-blue-600">Books</a>
          <span className="mx-2">/</span>
          <span className="font-medium">{book.title}</span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="md:flex">
            {/* Book image and exchange actions */}
            <div className="md:w-1/3 p-6 border-r border-gray-100">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <img 
                  src={`${baseURL}/${book.bookImage}`} 
                  alt={book.title}
                  className="w-full object-contain"
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionClass(book.condition)}`}>
                  {book.condition}
                </span>
              </div>
              
              <button 
                onClick={handleExchange}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Request Exchange
              </button>
              
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Exchange Options:</h4>
                <ul>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {book.deliveryAvailable ? 'Delivery Available' : 'In-person Exchange'}
                  </li>
                  <li className="flex items-center mt-2">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {book.negotiable ? 'Negotiable' : 'Fixed Exchange'}
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Book details */}
            <div className="md:w-2/3 p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold mb-1">{book.title}</h1>
                <p className="text-gray-600">by <span className="italic">{book.author}</span></p>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">About This Book</h2>
                <p className="text-gray-700">{book.description}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {book.genre && Array.isArray(book.genre) ? 
                    book.genre.map((genre, idx) => (
                      <span key={idx} className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                        {genre}
                      </span>
                    )) : 
                    <span className="text-gray-500">Genres not available</span>
                  }
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2">Exchange Details</h2>
                <p className="text-gray-700">
                  This book is available for exchange. Click the "Request Exchange" button to start the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeViewpage;