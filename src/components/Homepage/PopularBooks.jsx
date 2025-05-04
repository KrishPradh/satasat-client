

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const PopularBooks = () => {
//   const [books, setBooks] = useState([]);
//   const navigate = useNavigate();

//   const getAllBooks = async () => {
//     try {
//       const response = await fetch(`${baseURL}/api/get-all-books`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setBooks(data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   useEffect(() => {
//     getAllBooks();
//   }, []);

//   const handleBuy = (bookId) => {
//     navigate(`/buy/${bookId}`);
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white py-16">
//       <div className="container mx-auto px-4">
//         {/* Header section with improved styling */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif relative inline-block">
//             Popular Books
//             <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             Explore a wide range of book categories tailored to your interests
//             and needs.
//           </p>
//         </div>

//         {/* View all section */}
//         <div className="flex justify-end mb-8">
//           <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center group">
//             <span className="font-medium">View All</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Books grid with improved card styling */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
//           {books.map((book) => (
//             <div
//               key={book._id}
//               className="bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
//             >
//               {/* Book image with enhanced hover effect */}
//               <div className="relative h-56 w-full overflow-hidden bg-gradient-to-tr from-blue-50 to-indigo-50 group">
//                 <img
//                   src={`${book.bookImage || "placeholder.svg"}`}
//                   alt={book.title}
//                   className="object-contain w-full h-full p-3 transition-transform duration-500 ease-out group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>

//               {/* Book details with improved styling */}
//               <div className="p-5 flex-grow flex flex-col justify-between">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
//                     {book.title}
//                   </h2>
//                   <p className="text-gray-600 mb-2 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//                     </svg>
//                     <span className="font-medium">By:</span> {book.author}
//                   </p>
//                   <div className="mt-2 mb-3">
//                     <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
//                       {book.genre}
//                     </span>
//                   </div>

//                   {/* Added icons for better visual appeal */}
//                   <p className="text-gray-600 mb-2 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                     <span className="font-medium">Posted By:</span>{" "}
//                     <span className="ml-1 text-gray-700">{book.user.name || "Unknown"}</span>
//                   </p>
//                   <p className="text-gray-600 mb-1 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                     <span className="font-medium">Purpose:</span>{" "}
//                     <span className="ml-1 text-gray-700">{book.bookPurpose || "Not specified"}</span>
//                   </p>
//                 </div>

//                 {/* Enhanced button with animation */}
//                 <div className="mt-4">
//                   <Link to={`/viewpage/${book._id}`} className="block w-full">
//                     <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md hover:shadow-lg">
//                       <span>View Details</span>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 5l7 7-7 7"
//                         />
//                       </svg>
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopularBooks;


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const PopularBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const getAllBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${baseURL}/api/get-all-books`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Ensure the data is an array
//       if (Array.isArray(data)) {
//         setBooks(data);
//       } else if (Array.isArray(data.books)) {
//         setBooks(data.books);
//       } else {
//         throw new Error("Invalid data format received from server.");
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       setError("Failed to load books. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllBooks();
//   }, []);

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white py-16 min-h-screen">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif relative inline-block">
//             Popular Books
//             <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             Explore a wide range of book categories tailored to your interests.
//           </p>
//         </div>

//         {/* Loading and Error Handling */}
//         {loading && <div className="text-center text-lg">Loading...</div>}
//         {error && <div className="text-center text-red-500">{error}</div>}

//         {/* Books Grid */}
//         {!loading && !error && books.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
//             {books.map((book) => (
//               <div
//                 key={book._id}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
//               >
//                 <div className="relative h-56 w-full overflow-hidden bg-gradient-to-tr from-blue-50 to-indigo-50 group">
//                   <img
//                     src={book.bookImage || "placeholder.svg"}
//                     alt={book.title}
//                     className="object-contain w-full h-full p-3 transition-transform duration-500 ease-out group-hover:scale-110"
//                   />
//                 </div>
//                 <div className="p-5 flex-grow flex flex-col justify-between">
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1 transition-colors duration-300 hover:text-blue-600">
//                       {book.title}
//                     </h2>
//                     <p className="text-gray-600 mb-2">
//                       <strong>Author:</strong> {book.author}
//                     </p>
//                     <div className="mt-2 mb-3">
//                       <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
//                         {book.genre}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mb-2">
//                       <strong>Posted By:</strong> {book.user?.name || "Unknown"}
//                     </p>
//                     <p className="text-gray-600 mb-2">
//                       <strong>Purpose:</strong> {book.bookPurpose || "Not specified"}
//                     </p>
//                   </div>
//                   <div className="mt-4">
//                     <Link to={`/viewpage/${book._id}`} className="block w-full">
//                       <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
//                         View Details
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* No Books Found */}
//         {!loading && !error && books.length === 0 && (
//           <div className="text-center text-gray-500">No books available.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PopularBooks;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");

  const getAllBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/api/get-all-books`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let booksArray = [];
      if (Array.isArray(data)) {
        booksArray = data;
      } else if (Array.isArray(data.books)) {
        booksArray = data.books;
      } else {
        throw new Error("Invalid data format received from server.");
      }

      // Filter out books posted by the current user
      const filteredBooks = booksArray.filter(
        (book) => book.user && book.user._id !== currentUserId
      );

      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);


  const getViewPath = (book) => {
    // For buy/sell books, go to buysell-viewpage
    if (book.bookPurpose && book.bookPurpose.toLowerCase() === "buy/sell") {
      return `/buysell-viewpage/${book._id}`;
    }
    // For all other purposes (rent, exchange, etc.), go to regular viewpage
    return `/viewpage/${book._id}`;
  };


  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif relative inline-block">
            Popular Books
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore a wide range of book categories tailored to your interests.
          </p>
        </div>

        {/* Loading and Error Handling */}
        {loading && <div className="text-center text-lg">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* Books Grid */}
        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-tr from-blue-50 to-indigo-50 group">
                  <img
                    src={book.bookImage || "placeholder.svg"}
                    alt={book.title}
                    className="object-contain w-full h-full p-3 transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1 transition-colors duration-300 hover:text-blue-600">
                      {book.title}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      <strong>Author:</strong> {book.author}
                    </p>
                    <div className="mt-2 mb-3">
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {book.genre}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      <strong>Posted By:</strong> {book.user?.name || "Unknown"}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Purpose:</strong>{" "}
                      {book.bookPurpose || "Not specified"}
                    </p>
                  </div>
                  <div className="mt-4">
                    {/* <Link to={`/viewpage/${book._id}`} className="block w-full"> */}
                    <Link to={getViewPath(book)} className="block w-full">
                      <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Books Found */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center text-gray-500">No books available.</div>
        )}
      </div>
    </div>
  );
};

export default PopularBooks;

