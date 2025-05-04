// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";  // Ensure you import Link

// const BookExchange = () => {
//   const [books, setBooks] = useState([]);

//   const getExchangeBooks = async () => {
//     try {
//       const response = await fetch(
//         "${baseURL}/api/exchange/get-exchange-books",
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
//     getExchangeBooks();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6 mt-14">
//       <h1 className="text-4xl font-bold mb-8">Book Exchange Platform</h1>

//       <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <div className="flex gap-4 flex-wrap">
//           <div className="w-64">
//             <label className="block mb-2">Genre</label>
//             <select className="w-full p-2 border rounded-lg bg-white">
//               <option value="all">All Genres</option>
//               <option value="fiction">Fiction</option>
//               <option value="science-fiction">Science Fiction</option>
//               <option value="romance">Romance</option>
//               <option value="fantasy">Fantasy</option>
//             </select>
//           </div>

//           <div className="w-64">
//             <label className="block mb-2">Condition</label>
//             <select className="w-full p-2 border rounded-lg bg-white">
//               <option value="all">All Conditions</option>
//               <option value="excellent">Excellent</option>
//               <option value="good">Good</option>
//               <option value="fair">Fair</option>
//             </select>
//           </div>

//           <div className="flex items-end">
//             <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
//               Apply Filter
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {books.map((book) => (
//           <div
//             key={book._id}
//             className="bg-white rounded-sm shadow-md overflow-hidden relative flex flex-col"
//           >
//             {/* Badge for book condition */}
//             <div className="absolute top-1 left-2">
//               <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
//                 {book.condition}
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
//             <div className="p-4 flex-grow flex flex-col justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold mb-0">{book.title}</h2>
//                 <p className="text-gray-600 mb-1 italic">by {book.author}</p>
//                 <p className="text-sm text-gray-500 mb-3">Genre: {book.genre}</p>
//               </div>

//               {/* View button */}
//               <div>
//                 <Link to={`/viewpage/${book._id}`}>
//                   <button className="w-full bg-blue-600 text-white py-1 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//                     Exchange Now
//                   </button>
//                 </Link>
//               </div>
//             </div> {/* End of the book details div */}
//           </div> // End of the book card div
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookExchange;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const BookExchange = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("all");
//   const [selectedCondition, setSelectedCondition] = useState("all");

//   // Fetch books from API
//   const getExchangeBooks = async () => {
//     try {
//       const response = await fetch(
//         "${baseURL}/api/exchange/get-exchange-books",
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
//     getExchangeBooks();
//   }, []);

//   // Handle filtering logic
//   const filteredBooks = books.filter((book) => {
//     return (
//       (selectedGenre === "all" || book.genre === selectedGenre) &&
//       (selectedCondition === "all" || book.condition === selectedCondition)
//     );
//   });

//   return (
//     <div className="max-w-6xl mx-auto p-6 mt-14">
//       <h1 className="text-4xl font-bold mb-8">Book Exchange Platform</h1>

//       {/* Filter Section */}
//       <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <div className="flex gap-4 flex-wrap">
//           {/* Genre Filter */}
//           <div className="w-64">
//             <label className="block mb-2">Genre</label>
//             <select
//               className="w-full p-2 border rounded-lg bg-white"
//               value={selectedGenre}
//               onChange={(e) => setSelectedGenre(e.target.value)}
//             >
//               <option value="all">All Genres</option>
//               <option value="fiction">Fiction</option>
//               <option value="science-fiction">Science Fiction</option>
//               <option value="romance">Romance</option>
//               <option value="fantasy">Fantasy</option>
//               <option value="Action">Action</option>
//             </select>
//           </div>

//           {/* Condition Filter */}
//           <div className="w-64">
//             <label className="block mb-2">Condition</label>
//             <select
//               className="w-full p-2 border rounded-lg bg-white"
//               value={selectedCondition}
//               onChange={(e) => setSelectedCondition(e.target.value)}
//             >
//               <option value="all">All Conditions</option>
//               <option value="New">New</option>
//               <option value="Used">Used</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Books Listing */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {filteredBooks.length > 0 ? (
//           filteredBooks.map((book) => (
//             <div
//               key={book._id}
//               className="bg-white rounded-sm shadow-md overflow-hidden relative flex flex-col"
//             >
//               {/* Badge for book condition */}
//               <div className="absolute top-1 left-2">
//                 <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
//                   {book.condition}
//                 </span>
//               </div>

//               {/* Book image */}
//               <div className="relative h-48 w-full group">
//                 <img
//                   src={`${baseURL}/${book.bookImage || "placeholder.svg"}`}
//                   alt={book.title}
//                   className="object-contain w-full h-full p-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
//                 />
//               </div>

              
//               {/* <div className="p-4 flex-grow flex flex-col justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold mb-0">{book.title}</h2>
//                   <p className="text-gray-600 mb-1 italic">by {book.author}</p>
//                   <p className="text-sm text-gray-500 mb-3">Genre: {book.genre}</p>
//                 </div> */}
//                 <div className="p-4 flex-grow flex flex-col justify-between">
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

                
//                 <div> 
//                   <Link to={`/exchangeviewpage/${book._id}`}>
//                     <button className="w-full bg-blue-600 text-white py-1 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//                       Exchange Now
//                     </button>
//                   </Link>
//                 </div>
//               </div> 
//             </div> 
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-500">
//             No matching book found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookExchange;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const BookExchange = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("all");
//   const [selectedCondition, setSelectedCondition] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch books from API
//   const getExchangeBooks = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${baseURL}/api/exchange/get-exchange-books`, {
//         method: "GET",
//       });

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
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getExchangeBooks();
//   }, []);

//   // Handle filtering logic
//   const filteredBooks = books.filter((book) => {
//     return (
//       (selectedGenre === "all" || book.genre === selectedGenre) &&
//       (selectedCondition === "all" || book.condition === selectedCondition)
//     );
//   });

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
//                   {/* Dynamically list genres based on books */}
//                   {books
//                     .map((book) => book.genre) // Extract genres from books
//                     .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
//                     .map((genre) => (
//                       <option key={genre} value={genre}>
//                         {genre}
//                       </option>
//                     ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
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
//                   <option value="New">New</option>
//                   <option value="Used">Used</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Summary */}
//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isLoading ? "Loading books..." : `${filteredBooks.length} Books Available for Exchange`}
//           </h2>
//         </div>

//         {/* Loading State */}
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
//                       <span
//                         className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
//                           book.condition === "New"
//                             ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                             : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
//                         }`}
//                       >
//                         {book.condition}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Book details */}
//                   <div className="p-5 flex-grow flex flex-col justify-between relative z-10 border-t border-gray-100">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-1 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
//                         {book.title}
//                       </h2>
//                       <p className="text-gray-600 mb-2 italic">by {book.author}</p>

//                       <div className="flex items-center mb-3">
//                         <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
//                           {book.genre}
//                         </span>
//                       </div>

//                       {/* Display user details */}
//                       {book.user && (
//                         <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
//                           <div className="h-9 w-9 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
//                             {book.user.name.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="ml-3">
//                             <p className="text-sm font-medium text-gray-700">Posted by:</p>
//                             <p className="text-sm font-semibold text-blue-600">{book.user.name}</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Exchange button */}
//                     <Link to={`/viewpage/${book._id}`} className="block mt-4">
//                       <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium shadow-md">
//                         Exchange Now
//                       </button>
//                     </Link>
//                   </div>  
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
//                 <svg
//                   className="w-16 h-16 text-gray-300 mb-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <p className="text-xl font-medium text-gray-600">
//                   No books found matching your filters
//                 </p>
//                 <p className="text-gray-500 mt-2 max-w-md">
//                   Try adjusting your filters or check back later for new additions to our exchange collection
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookExchange;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const BookExchange = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch books from API
  const getExchangeBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/exchange/get-exchange-books`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (data && Array.isArray(data.books)) {
        setBooks(data.books);
      } else {
        console.error("Expected an array but got:", data);
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExchangeBooks();
  }, []);

  // Handle filtering logic
  // const filteredBooks = books.filter((book) => {
  //   return (
  //     (selectedGenre === "all" || book.genre === selectedGenre) &&
  //     (selectedCondition === "all" || book.condition === selectedCondition)
  //   );
  // });

  const currentUserId = localStorage.getItem("userId");

const filteredBooks = books.filter((book) => {
  const isNotCurrentUserBook = book.user && book.user._id !== currentUserId;
  return (
    isNotCurrentUserBook &&
    (selectedGenre === "all" || book.genre === selectedGenre) &&
    (selectedCondition === "all" || book.condition === selectedCondition)
  );
});


  return (
    <div className="bg-gradient-to-b mt-12 from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Header section with improved styling */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif relative inline-block">
            Book Exchange Platform
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Exchange your books with other readers and discover new stories to enjoy.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4">Filter Books</h2>
          <div className="flex gap-6 flex-wrap">
            {/* Genre Filter */}
            <div className="w-full md:w-64">
              <label className="block text-gray-700 mb-2 font-medium">Genre</label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <option value="all">All Genres</option>
                  {/* Dynamically list genres based on books */}
                  {books
                    .map((book) => book.genre) // Extract genres from books
                    .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                    .map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
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
              <label className="block text-gray-700 mb-2 font-medium">Condition</label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                >
                  <option value="all">All Conditions</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
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
          <h2 className="text-2xl font-bold text-gray-800">
            {isLoading ? "Loading books..." : `${filteredBooks.length} Books Available for Exchange`}
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Books grid with improved card styling - matching PopularBooks component */}
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
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                        book.condition === "New"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                      }`}>
                        {book.condition}
                      </span>
                    </div>
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

                      {/* Display user details with icon */}
                      {book.user && (
                        <p className="text-gray-600 mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-medium">Posted By:</span>{" "}
                          <span className="ml-1 text-gray-700">{book.user.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Enhanced button with animation */}
                    <div className="mt-4">
                      <Link to={`/viewpage/${book._id}`} className="block w-full">
                        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md hover:shadow-lg">
                          <span>Exchange Now</span>
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
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-xl font-medium text-gray-600">
                  No books found matching your filters
                </p>
                <p className="text-gray-500 mt-2 max-w-md">
                  Try adjusting your filters or check back later for new additions to our exchange collection
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookExchange;