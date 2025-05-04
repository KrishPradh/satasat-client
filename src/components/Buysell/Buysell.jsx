// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Buysell = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("all");
//   const [selectedCondition, setSelectedCondition] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch books for buy/sell
//   const getBuySellBooks = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${baseURL}/api/buysell/get-buysell-books`);
//       const data = await response.json();
//       if (data && Array.isArray(data.books)) {
//         setBooks(data.books);
//       } else {
//         setBooks([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch buy/sell books:", err);
//       setBooks([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBuySellBooks();
//   }, []);

//   // Filter books based on selected genre and condition
//   const filteredBooks = books.filter(
//     (book) =>
//       (selectedGenre === "all" || book.genre === selectedGenre) &&
//       (selectedCondition === "all" || book.condition === selectedCondition)
//   );

//   return (
//     <div className="min-h-screen mt-16 bg-gradient-to-b from-blue-50 to-white">
//       <div className="max-w-6xl mx-auto px-6 py-10">
//         {/* Filter Section */}
//         <div className="bg-white p-6 rounded-xl shadow-md mb-10 transition-all duration-300">
//           <h2 className="text-xl font-semibold mb-4">Filter Books</h2>
//           <div className="flex gap-6 flex-wrap">
//             {/* Genre Filter */}
//             <div className="w-full md:w-64">
//               <label className="block text-gray-700 mb-2 font-medium">Genre</label>
//               <div className="relative">
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   value={selectedGenre}
//                   onChange={(e) => setSelectedGenre(e.target.value)}
//                 >
//                   <option value="all">All Genres</option>
//                   <option value="fiction">Fiction</option>
//                   <option value="science-fiction">Science Fiction</option>
//                   <option value="romance">Romance</option>
//                   <option value="fantasy">Fantasy</option>
//                   <option value="action">Action</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Condition Filter */}
//             <div className="w-full md:w-64">
//               <label className="block text-gray-700 mb-2 font-medium">Condition</label>
//               <div className="relative">
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   value={selectedCondition}
//                   onChange={(e) => setSelectedCondition(e.target.value)}
//                 >
//                   <option value="all">All Conditions</option>
//                   <option value="new">New</option>
//                   <option value="used">Used</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Summary */}
//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isLoading ? "Loading books..." : `${filteredBooks.length} Books Available for Sale`}
//           </h2>
//         </div>

//         {/* Loading Spinner */}
//         {isLoading && (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         )}

//         {/* Books Listing */}
//         {!isLoading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {filteredBooks.length > 0 ? (
//               filteredBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 hover:scale-105"
//                 >
//                   {/* Book image container with fancy background */}
//                   <div className="relative p-4 pt-6 pb-1">
//                     <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white rounded-t-xl"></div>

//                     <div className="relative z-10 flex justify-center">
//                       <div className="h-56 w-full relative">
//                         {/* Book shadow effect */}
//                         <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg opacity-50"></div>

//                         {/* Book image with perspective effect */}
//                         <div className="h-full w-full relative transform perspective-1000 group-hover:rotate-y-6 transition-transform duration-500">
//                           <img
//                             src={`${book.bookImage || "placeholder.svg"}`}
//                             alt={book.title}
//                             className="object-contain w-full h-full shadow-md rounded-lg transform transition-all duration-300"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Badge for book condition */}
//                     <div className="absolute top-3 right-3 z-20">
//                       <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${book.condition === "New" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"}`}>
//                         {book.condition}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Book details */}
//                   <div className="p-5 flex-grow flex flex-col justify-between relative z-10 border-t border-gray-100">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-1 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{book.title}</h2>
//                       <p className="text-gray-600 mb-2 italic">by {book.author}</p>

//                       {/* "Posted by" Section */}
//                       {book.user && (
//                         <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
//                           <div className="h-9 w-9 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
//                             {book.user.name.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="ml-3">
//                             <p className="text-sm font-medium text-gray-700">
//                               Posted by:
//                             </p>
//                             <p className="text-sm font-semibold text-blue-600">
//                               {book.user.name}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex items-center mb-3">
//                       <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
//                         Rs. {book.price || "N/A"}
//                       </span>
//                     </div>

//                     {/* View Details Button */}
//                     <Link to={`/viewpage/${book._id}`} className="block mt-4">
//                       <button className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-l rounded-lg transition-all duration-300 transform hover:scale-105">
//                         Buy Now
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-xl font-medium text-gray-500 col-span-4">
//                 No books match the selected filters.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Buysell;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Buysell = () => {
//   const [books, setBooks] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("all");
//   const [selectedCondition, setSelectedCondition] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch books for buy/sell
//   const getBuySellBooks = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${baseURL}/api/buysell/get-buysell-books`);
//       const data = await response.json();
//       if (data && Array.isArray(data.books)) {
//         setBooks(data.books);

//         // Extract unique genres from the books and set them
//         const bookGenres = data.books
//           .map((book) => book.genre)
//           .filter((value, index, self) => self.indexOf(value) === index); // Get unique genres
//         setGenres(bookGenres);
//       } else {
//         setBooks([]);
//         setGenres([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch buy/sell books:", err);
//       setBooks([]);
//       setGenres([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBuySellBooks();
//   }, []);

//   // Filter books based on selected genre and condition
//   const filteredBooks = books.filter(
//     (book) =>
//       (selectedGenre === "all" || book.genre === selectedGenre) &&
//       (selectedCondition === "all" || book.condition === selectedCondition)
//   );

//   return (
//     <div className="min-h-screen mt-16 bg-gradient-to-b from-blue-50 to-white">
//       <div className="max-w-6xl mx-auto px-6 py-10">
//         {/* Filter Section */}
//         <div className="bg-white p-6 rounded-xl shadow-md mb-10 transition-all duration-300">
//           <h2 className="text-xl font-semibold mb-4">Filter Books</h2>
//           <div className="flex gap-6 flex-wrap">
//             {/* Genre Filter */}
//             <div className="w-full md:w-64">
//               <label className="block text-gray-700 mb-2 font-medium">Genre</label>
//               <div className="relative">
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   value={selectedGenre}
//                   onChange={(e) => setSelectedGenre(e.target.value)}
//                 >
//                   <option value="all">All Genres</option>
//                   {genres.map((genre, index) => (
//                     <option key={index} value={genre}>
//                       {genre.charAt(0).toUpperCase() + genre.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Condition Filter */}
//             <div className="w-full md:w-64">
//               <label className="block text-gray-700 mb-2 font-medium">Condition</label>
//               <div className="relative">
//               <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={selectedCondition}
//                   onChange={(e) => setSelectedCondition(e.target.value)}
//                 >
//                   <option value="all">All Conditions</option>
//                   <option value="New">New</option>
//                   <option value="Used">Used</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Summary */}
//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isLoading ? "Loading books..." : `${filteredBooks.length} Books Available for Sale`}
//           </h2>
//         </div>

//         {/* Loading Spinner */}
//         {isLoading && (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         )}

//         {/* Books Listing */}
//         {!isLoading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {filteredBooks.length > 0 ? (
//               filteredBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 hover:scale-105"
//                 >
//                   {/* Book image container with fancy background */}
//                   <div className="relative p-4 pt-6 pb-1">
//                     <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white rounded-t-xl"></div>

//                     <div className="relative z-10 flex justify-center">
//                       <div className="h-56 w-full relative">
//                         {/* Book shadow effect */}
//                         <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg opacity-50"></div>

//                         {/* Book image with perspective effect */}
//                         <div className="h-full w-full relative transform perspective-1000 group-hover:rotate-y-6 transition-transform duration-500">
//                           <img
//                             src={`${book.bookImage || "placeholder.svg"}`}
//                             alt={book.title}
//                             className="object-contain w-full h-full shadow-md rounded-lg transform transition-all duration-300"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Badge for book condition */}
//                     <div className="absolute top-3 right-3 z-20">
//                       <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${book.condition === "New" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"}`}>
//                         {book.condition}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Book details */}
//                   <div className="p-5 flex-grow flex flex-col justify-between relative z-10 border-t border-gray-100">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-1 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{book.title}</h2>
//                       <p className="text-gray-600 mb-2 italic">by {book.author}</p>

//                       {/* "Posted by" Section */}
//                       {book.user && (
//                         <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
//                           <div className="h-9 w-9 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
//                             {book.user.name.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="ml-3">
//                             <p className="text-sm font-medium text-gray-700">
//                               Posted by:
//                             </p>
//                             <p className="text-sm font-semibold text-blue-600">
//                               {book.user.name}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex items-center mb-3">
//                       <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
//                         Rs. {book.price || "N/A"}
//                       </span>
//                     </div>

//                     {/* View Details Button */}
//                     <Link to={`/viewpage/${book._id}`} className="block mt-4">
//                       <button className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-l rounded-lg transition-all duration-300 transform hover:scale-105">
//                         Buy Now
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-xl font-medium text-gray-500 col-span-4">
//                 No books match the selected filters.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Buysell;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Buysell = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch books for buy/sell
  const getBuySellBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/buysell/get-buysell-books`);
      const data = await response.json();
      if (data && Array.isArray(data.books)) {
        setBooks(data.books);

        // Extract unique genres from the books and set them
        const bookGenres = data.books
          .map((book) => book.genre)
          .filter((value, index, self) => self.indexOf(value) === index); // Get unique genres
        setGenres(bookGenres);
      } else {
        setBooks([]);
        setGenres([]);
      }
    } catch (err) {
      console.error("Failed to fetch buy/sell books:", err);
      setBooks([]);
      setGenres([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBuySellBooks();
  }, []);

  // Filter books based on selected genre and condition
  // const filteredBooks = books.filter(
  //   (book) =>
  //     (selectedGenre === "all" || book.genre === selectedGenre) &&
  //     (selectedCondition === "all" || book.condition === selectedCondition)
  // );

  const currentUserId = localStorage.getItem("userId");

const filteredBooks = books.filter((book) => {
  const isNotCurrentUserBook = book.user && book.user._id !== currentUserId;
  return (
    isNotCurrentUserBook &&
    (selectedGenre === "all" || book.genre === selectedGenre) &&
    (selectedCondition === "all" || book.condition === selectedCondition)
  );
});

  //   if (!books) return;

  //   setCartStatus({ loading: true, success: false, message: "" });

  //   try {
  //     const response = await axios.post(
  //       `${baseURL}/api/cart/addtocart`,
  //       {
  //         bookId: books._id,
  //         quantity: 1,
  //       },
  //       { withCredentials: true }
  //     );

  //     setCartStatus({
  //       loading: false,
  //       success: true,
  //       message: "Added to cart successfully!",
  //     });
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     setCartStatus({
  //       loading: false,
  //       success: false,
  //       message: "Failed to add to cart. Please try again.",
  //     });
  //   }
  // };

  // const handleAddToCart = async (bookId) => {
  //   if (!bookId) return;

  //   setCartStatus({ loading: true, success: false, message: "" });

  //   try {
  //     const response = await axios.post(
  //       `${baseURL}/api/cart/addtocart`,
  //       {
  //         bookId: bookId,  // Correctly sending the bookId here
  //         quantity: 1,
  //       },
  //       { withCredentials: true }  // to send cookies
  //     );

  //     setCartStatus({
  //       loading: false,
  //       success: true,
  //       message: "Added to cart successfully!",
  //     });
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     setCartStatus({
  //       loading: false,
  //       success: false,
  //       message: "Failed to add to cart. Please try again.",
  //     });
  //   }
  // };

  return (
    <div className="bg-gradient-to-b mt-12 from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Header section with improved styling */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif relative inline-block">
            Books For Sale
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Find your next favorite book from our collection of user-listed
            titles
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-10 transition-all duration-300 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter Books
          </h2>
          <div className="flex gap-6 flex-wrap">
            {/* Genre Filter */}
            <div className="w-full md:w-64">
              <label className="block text-gray-700 mb-2 font-medium">
                Genre
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <option value="all">All Genres</option>
                  {genres.map((genre, index) => (
                    <option key={index} value={genre}>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Condition Filter */}
            <div className="w-full md:w-64">
              <label className="block text-gray-700 mb-2 font-medium">
                Condition
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                >
                  <option value="all">All Conditions</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            {isLoading ? (
              "Loading books..."
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {filteredBooks.length} Books Available for Sale
              </>
            )}
          </h2>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Books Listing */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
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

                    {/* Badge for book condition */}
                    <div className="absolute top-3 right-3 z-20">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                          book.condition === "New"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                            : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                        }`}
                      >
                        {book.condition}
                      </span>
                    </div>
                  </div>

                  {/* Book details */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
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

                      {/* Price display */}
                      <div className="flex items-center mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-blue-500 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-medium text-gray-700">
                          Price:
                        </span>
                        <span className="ml-1 text-blue-600 font-semibold">
                          Rs. {book.price || "N/A"}
                        </span>
                      </div>

                      {/* Posted by section */}
                      {book.user && (
                        <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                          <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                            {book.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">
                              Posted by:
                            </p>
                            <p className="text-sm font-semibold text-blue-600">
                              {book.user.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Buy Now Button */}
                    {/* <div className="mt-4">
                      <Link
                        to={`/viewpage/${book._id}`}
                        className="block w-full"
                      >
                        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md hover:shadow-lg">
                          <span>Add to Cart</span>
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
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </button>
                      </Link>
                    </div> */}
                    
                    <div className="mt-4">
                      <Link to={`/buysell-viewpage/${book._id}`} className="block w-full">
                        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md hover:shadow-lg">
                          <span>View Details</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xl font-medium text-gray-500">
                  No books match the selected filters.
                </p>
                <p className="text-gray-400 mt-2">
                  Try changing your filter criteria
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Buysell;
