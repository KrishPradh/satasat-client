import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../Context/CartContext";
// import { CartContext } from "../../CartContext";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Buynew = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [cartStatus, setCartStatus] = useState({
    loading: false,
    success: false,
    message: "",
  });
  const {fetchCartData}=useContext(CartContext)

  // Fetch Books
  const getNewBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/admin/book/getpost`, { method: "GET" });
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
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setGenres([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getNewBooks();
  }, []);
  

  useEffect(() => {
    getNewBooks();
  }, []);


  const filteredBooks = books.filter((book) => {
    return (
      (selectedGenre === "all" || book.genre === selectedGenre)
    );
  });

  const handleAddToCart = async (bookId) => {
    if (!bookId) return;

    setCartStatus({ loading: true, success: false, message: "" });

    try {
      const response = await axios.post(
        `${baseURL}/api/cart/addtocart`,
        {
          bookId: bookId,
          quantity: 1,
        },
        { withCredentials: true }
      );

      setCartStatus({
        loading: false,
        success: true,
      });

      // Show a success toast notification
      toast.success("Added to cart successfully!"); // Success toast
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartStatus({
        loading: false,
        success: false,
        // message: "Failed to add to cart. Please try again.",
      });

      // Show an error toast notification
      toast.error("Please login to add to cart."); // Error toast
    }

    fetchCartData()
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif relative inline-block">
            Book Buy Platform
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover books available to buy.
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

            
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLoading ? "Loading books..." : `${filteredBooks.length} Books Available to Buy`}
          </h2>
        </div>

        {/* Books Listing */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
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
                      <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                        {book.title}
                      </h2>
                      <p className="text-gray-600 mb-2 flex items-center">
                        <span className="font-medium">By:</span> {book.author}
                      </p>
                      <div className="mt-2 mb-3">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {book.genre}
                        </span>
                      </div>
                      <div className="flex items-center mb-3">
                        <span className="font-medium text-gray-700">Price:</span>
                        <span className="ml-1 text-blue-600 font-semibold">Rs. {book.price || "N/A"}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-auto gap-2">
                      
                      <button
                        type="button"
                        onClick={() => handleAddToCart(book._id)}
                        disabled={cartStatus.loading}
                        className={`w-full py-3 rounded-lg transition duration-300 font-medium ${
                          cartStatus.loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                        }`}
                      >
                        {cartStatus.loading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-800"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Adding to cart...
                          </span>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                      <button
                        onClick={() => navigate(`/buynew-viewpage/${book._id}`)}
                        className="bg-gradient-to-r from-blue-500 to-blue-400 hover:to-blue-500 text-blue-50 px-5 py-1 rounded-lg text-sm font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      >
                        View Details
                      </button>
                      {cartStatus.message && (
                        <div
                          className={`mt-2 p-2 text-sm rounded-lg ${
                            cartStatus.success
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {cartStatus.message}
                        </div>
                      )}
                    </div>
                    
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
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

export default Buynew;
