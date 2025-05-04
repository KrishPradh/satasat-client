

// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";


// const RentBooks = () => {
//   const [books, setBooks] = useState([]);

//   const getRentBooks = async () => {
//     try {
//       const response = await fetch(
//         "${baseURL}/api/rent/get-rent-books",
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Fetched data:", data);

//       if (data && Array.isArray(data.books)) {
//         setBooks(data.books);
//       } else {
//         console.error("Expected an array but got:", data);
//         setBooks([]);
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       setBooks([]);
//     }
//   };

//   useEffect(() => {
//     getRentBooks();
//   }, []);

// // const PopularBooks = () => {
// //   const [books, setBooks] = useState([]);
// //   const navigate = useNavigate();

// //   const getAllBooks = async () => {
// //     try {
// //       const response = await fetch("${baseURL}/api/get-all-books", {
// //         method: "GET",
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       setBooks(data);
// //     } catch (error) {
// //       console.error("Error fetching books:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     getAllBooks();
// //   }, []);

//   // const handleBuy = (bookId) => {
//   //   navigate(`/buy/${bookId}`);
//   // };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl italic font-serif font-bold">Rent Books</h1>
//         <button className="bg-blue-500 text-white py-1 px-4 rounded-sm italic font-sans font-semibold text-[18px] hover:bg-blue-700 transition-colors duration-300">
//           View All
//         </button>
//       </div>
//       <p className="text-gray-600 mb-6 italic text-lg">
//         Explore a wide range of book categories tailored to your interests and needs.
//       </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
//         {books.map((book) => (
//           <div
//             key={book._id}
//             className="bg-white rounded-sm shadow-md overflow-hidden relative flex flex-col"
//           >
//             {/* Badge for book condition */}
//             <div className="absolute top-2 left-2">
//               <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
//                 {book.condition || "Available"}
//               </span>
//             </div>

//             {/* Book image with hover effect */}
//             <div className="relative h-48 w-full group">
//               <img
//                 src={`${baseURL}/${book.bookImage || "placeholder.svg"}`}
//                 alt={book.title}
//                 className="object-contain w-full h-full p-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
//               />
//             </div>

//             {/* Book details */}
//             {/* <div className="p-4 flex-grow flex flex-col justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold mb-0">{book.title}</h2>
//                 <p className="text-gray-600 mb-1 italic">by {book.author}</p>
//                 <p className="text-sm text-gray-500 mb-3">Genre: {book.genre}</p>
//               </div> */}
//               <div className="p-4 flex-grow flex flex-col justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold mb-0">{book.title}</h2>
//                   <p className="text-gray-600 mb-1 italic">by {book.author}</p>
//                   <p className="text-sm text-gray-500 mb-3">Genre: {book.genre}</p>

//                  {/* Display user details */}
//                 {book.user && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     Posted by: {book.user.name}
//                   </p>
//                 )}
//                 </div>
            

//               {/* View button */}
//               <div>
//                 <Link to={`/rentviewpage/${book._id}`}>
//                   <button className="w-full bg-blue-600 text-white py-1  rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//                     View Now
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RentBooks;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const RentBooks = () => {
//   const [books, setBooks] = useState([]);

//   const getRentBooks = async () => {
//     try {
//       const response = await fetch(
//         `${baseURL}/api/rent/get-rent-books`,
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Fetched data:", data);

//       if (data && Array.isArray(data.books)) {
//         setBooks(data.books);
//       } else {
//         console.error("Expected an array but got:", data);
//         setBooks([]);
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       setBooks([]);
//     }
//   };

//   useEffect(() => {
//     getRentBooks();
//   }, []);

//   return (
//     <div className="bg-gradient-to-b from-blue-45 to-white py-16">
//       <div className="container mx-auto px-6">
//         {/* Section header with decorative elements */}
//         <div className="mb-12">
//           <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//             <div className="mb-4 md:mb-0">
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif relative inline-block">
//                 Rent Books
//                 <span className="absolute -bottom-2 left-0 w-24 h-1.5 bg-blue-600 rounded-full"></span>
//               </h1>
//             </div>
//             <button className="bg-blue-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center group">
//               <span>View All</span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </button>
//           </div>
//           <p className="text-gray-600 text-lg max-w-3xl">
//             Explore a wide range of book categories tailored to your interests and needs. Rent books at affordable prices and return when you're done.
//           </p>
//         </div>

//         {/* Books grid with enhanced cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
//           {books.map((book) => (
//             <div
//               key={book._id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border border-gray-100"
//             >
//               {/* Book image with enhanced presentation */}
//               <div className="relative h-52 w-full overflow-hidden bg-gray-50">
//                 <img
//                   src={`${book.bookImage || "placeholder.svg"}`}
//                   alt={book.title}
//                   className="object-contain w-full h-full p-3 transition-all duration-300 ease-in-out hover:scale-110"
//                 />
                
//                 {/* Enhanced availability badge */}
//                 <div className="absolute top-3 left-3">
//                   <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-sm">
//                     {book.condition || "Available"}
//                   </span>
//                 </div>
                
//                 {/* Price tag badge if applicable */}
//                 {book.rentPrice && (
//                   <div className="absolute top-3 right-3">
//                     <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm">
//                       ${book.rentPrice}/week
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Book details with improved typography and layout */}
//               <div className="p-5 flex-grow flex flex-col justify-between">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{book.title}</h2>
//                   <p className="text-gray-600 mb-2">by <span className="font-medium">{book.author}</span></p>
                  
//                   <div className="flex items-center mb-3">
//                     <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                       {book.genre}
//                     </span>
//                   </div>

//                   {/* User details with improved presentation */}
//                   {book.user && (
//                     <div className="flex items-center mt-3 pb-2 border-t border-gray-100 pt-2">
//                       <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-medium mr-2">
//                         {book.user.name.charAt(0).toUpperCase()}
//                       </div>
//                       <span className="text-sm text-gray-600">
//                         Posted by <span className="font-medium">{book.user.name}</span>
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Enhanced view button */}
//                 <div className="mt-4">
//                   <Link 
//                     to={`/viewpage/${book._id}`}
//                     className="block w-full"
//                   >
//                     <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center font-medium">
//                       <span>View Details</span>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

// export default RentBooks;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;
const currentUserId = localStorage.getItem("userId");

const RentBooks = () => {
  const [books, setBooks] = useState([]);

  const getRentBooks = async () => {
    try {
      const response = await fetch(`${baseURL}/api/rent/get-rent-books`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched data:", data);
  
      if (data && Array.isArray(data.books)) {
        // Filter out books posted by the current user
        const filteredBooks = data.books.filter(
          (book) => book.user && book.user._id !== currentUserId
        );
        setBooks(filteredBooks);
      } else {
        console.error("Expected an array but got:", data);
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };
  

  useEffect(() => {
    getRentBooks();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Header section with improved styling */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif relative inline-block">
            Rent Books
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore a wide range of book categories tailored to your interests
            and needs. Rent books at affordable prices and return when you're done.
          </p>
        </div>

        {/* View all section */}
        <div className="flex justify-end mb-8">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center group">
            <span className="font-medium">View All</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        {/* Books grid with improved card styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
            >
              {/* Book image with enhanced hover effect */}
              <div className="relative h-56 w-full overflow-hidden bg-gradient-to-tr from-blue-50 to-indigo-50 group">
                <img
                  src={`${book.bookImage || "placeholder.svg"}`}
                  alt={book.title}
                  className="object-contain w-full h-full p-3 transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Condition badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-sm">
                    {book.condition || "Available"}
                  </span>
                </div>
                
                {/* Price tag badge if applicable */}
                {book.rentPrice && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-xs font-semibold text-white bg-green-500 rounded-full shadow-sm">
                      ${book.rentPrice}/week
                    </span>
                  </div>
                )}
              </div>

              {/* Book details with improved styling */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
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

                  {/* Added icons for better visual appeal */}
                  {book.user && (
                    <p className="text-gray-600 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">Posted By:</span>{" "}
                      <span className="ml-1 text-gray-700">{book.user.name || "Unknown"}</span>
                    </p>
                  )}
                </div>

                {/* Enhanced button with animation */}
                <div className="mt-4">
                  <Link to={`/viewpage/${book._id}`} className="block w-full">
                    <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md hover:shadow-lg">
                      <span>View Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentBooks;