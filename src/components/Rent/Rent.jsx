// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Rent = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("all");
//   const [selectedCondition, setSelectedCondition] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   const getRentBooks = async () => {
//     setIsLoading(true);
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
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getRentBooks();
//   }, []);

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
//             <div className="w-full md:w-64">
//               <label className="block text-gray-700 mb-2 font-medium">Genre</label>
//               <div className="relative">
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={selectedGenre}
//                   onChange={(e) => setSelectedGenre(e.target.value)}
//                 >
//                   <option value="all">All Genres</option>
//                   <option value="fiction">Fiction</option>
//                   <option value="science-fiction">Science Fiction</option>
//                   <option value="romance">Romance</option>
//                   <option value="fantasy">Fantasy</option>
//                   <option value="Action">Action</option>
//                   <option value="Comedy">Comedy</option>
//                   <option value="Education">Education</option>
//                 </select>
//               </div>
//             </div>

//             <div className="w-full md:w-64">
//               <label className="block text-gray-700 mb-2 font-medium">Condition</label>
//               <div className="relative">
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={selectedCondition}
//                   onChange={(e) => setSelectedCondition(e.target.value)}
//                 >
//                   <option value="all">All Conditions</option>
//                   <option value="New">New</option>
//                   <option value="Used">Used</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Summary */}
//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isLoading ? "Loading books..." : `${filteredBooks.length} Books Available for Rent`}
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
//                   <div className="relative p-4 pt-6 pb-1">
//                     <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white rounded-t-xl"></div>

//                     <div className="relative z-10 flex justify-center">
//                       <div className="h-56 w-full relative">
//                         <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg opacity-50"></div>
//                         <img
//                           src={`${book.bookImage || "placeholder.svg"}`}
//                           alt={book.title}
//                           className="object-contain w-full h-full shadow-md rounded-lg transform transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="absolute top-3 right-3 z-20">
//                       <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
//                         book.condition === "New"
//                           ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                           : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
//                       }`}>
//                         {book.condition}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="p-5 flex-grow flex flex-col justify-between relative z-10 border-t border-gray-100">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-1 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{book.title}</h2>
//                       <p className="text-gray-600 mb-2 italic">by {book.author}</p>

//                       <div className="flex items-center mb-3">
//                         <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
//                           {book.genre}
//                         </span>
//                       </div>

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

//                     <Link to={`/viewpage/${book._id}`} className="block mt-4">
//                       <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition duration-300 font-semibold">
//                         Rent Now
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center col-span-full text-gray-500">
//                 No matching book found.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Rent;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Rent = () => {
//   const [books, setBooks] = useState([]);
//   const [genres, setGenres] = useState([]); // Added state to store genres
//   const [selectedGenre, setSelectedGenre] = useState("all");
//   const [selectedCondition, setSelectedCondition] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   const getRentBooks = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${baseURL}/api/rent/get-rent-books`, {
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

//   const getGenres = async () => {
//     try {
//       const response = await fetch(`${baseURL}/api/genres`, { method: "GET" });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Fetched genres:", data);

//       if (data && Array.isArray(data.genres)) {
//         setGenres(data.genres); // Set the genres from the response
//       } else {
//         console.error("Expected an array but got:", data);
//         setGenres([]);
//       }
//     } catch (error) {
//       console.error("Error fetching genres:", error);
//       setGenres([]);
//     }
//   };

//   useEffect(() => {
//     getRentBooks();
//     getGenres(); // Fetch genres when the component mounts
//   }, []);

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
//             <div className="w-full md:w-64">
//               <label className="block text-gray-700 mb-2 font-medium">Genre</label>
//               <div className="relative">
//               <select
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
//               </div>
//             </div>

//             <div className="w-full md:w-64">
//               <label className="block text-gray-700 mb-2 font-medium">Condition</label>
//               <div className="relative">
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={selectedCondition}
//                   onChange={(e) => setSelectedCondition(e.target.value)}
//                 >
//                   <option value="all">All Conditions</option>
//                   <option value="New">New</option>
//                   <option value="Used">Used</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Summary */}
//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isLoading ? "Loading books..." : `${filteredBooks.length} Books Available for Rent`}
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
//                   <div className="relative p-4 pt-6 pb-1">
//                     <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white rounded-t-xl"></div>

//                     <div className="relative z-10 flex justify-center">
//                       <div className="h-56 w-full relative">
//                         <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg opacity-50"></div>
//                         <img
//                           src={`${book.bookImage || "placeholder.svg"}`}
//                           alt={book.title}
//                           className="object-contain w-full h-full shadow-md rounded-lg transform transition-all duration-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="absolute top-3 right-3 z-20">
//                       <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
//                         book.condition === "New"
//                           ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                           : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
//                       }`}>
//                         {book.condition}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="p-5 flex-grow flex flex-col justify-between relative z-10 border-t border-gray-100">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-1 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{book.title}</h2>
//                       <p className="text-gray-600 mb-2 italic">by {book.author}</p>

//                       <div className="flex items-center mb-3">
//                         <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
//                           {book.genre}
//                         </span>
//                       </div>

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

//                     <Link to={`/viewpage/${book._id}`} className="block mt-4">
//                       <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition duration-300 font-semibold">
//                         Rent Now
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center col-span-full text-gray-500">
//                 No matching book found.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Rent;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Rent = () => {
  const [books, setBooks] = useState([]);
  // const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const getRentBooks = async () => {
    setIsLoading(true);
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

  // const getGenres = async () => {
  //   try {
  //     const response = await fetch(`${baseURL}/api/genres`, { method: "GET" });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Fetched genres:", data);

  //     if (data && Array.isArray(data.genres)) {
  //       setGenres(data.genres);
  //     } else {
  //       console.error("Expected an array but got:", data);
  //       setGenres([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching genres:", error);
  //     setGenres([]);
  //   }
  // };

  useEffect(() => {
    getRentBooks();
    // getGenres();
  }, []);

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
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 mt-16">
      <div className="container mx-auto px-4">
        {/* Header section with improved styling */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif relative inline-block">
            Book Rent Platform
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover books available for rent and connect with book owners in your community.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4">Filter Books</h2>
          <div className="flex gap-6 flex-wrap">
            <div className="w-full md:w-64">
              <label className="block text-gray-700 mb-2 font-medium">Genre</label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <option value="all">All Genres</option>
                  {books
                    .map((book) => book.genre)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLoading ? "Loading books..." : `${filteredBooks.length} Books Available for Rent`}
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
                    
                    {/* Condition badge */}
                    <div className="absolute top-3 right-3 z-20">
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
                      <p className="text-gray-600 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span className="font-medium">By:</span> {book.author}
                      </p>
                      <div className="mt-2 mb-3">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {book.genre}
                        </span>
                      </div>


                      <div className="flex items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-gray-700">Price:</span>
                        <span className="ml-1 text-blue-600 font-semibold">Rs. {book.price || "N/A"}</span>
                      </div>    

                      {/* User information with icon */}
                      {book.user && (
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm mr-2">
                            {book.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="font-medium">Posted By:</span>
                              <span className="ml-1 text-gray-700">{book.user.name}</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enhanced button with animation */}
                    <div className="mt-4">
                      <Link to={`/viewpage/${book._id}`} className="block w-full">
                        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md hover:shadow-lg">
                          <span>Rent Now</span>
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
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xl font-medium text-gray-500 mb-2">No books found</p>
                <p className="text-gray-400">Try adjusting your filter criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rent;
