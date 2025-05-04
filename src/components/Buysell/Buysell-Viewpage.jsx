  // import axios from 'axios';
  import React, { useEffect, useState } from "react";
  import {  useNavigate, useParams } from "react-router-dom";
  import { toast } from "react-toastify";
  // import { toast } from 'react-toastify';

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const BuysellBookViewpage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchBook = async () => {
        try {
          const response = await fetch(
            `${baseURL}/api/singlebook/get-single-books/${bookId}`
          );
          if (!response.ok) throw new Error("Failed to fetch book");
          const data = await response.json();
          setBook(data);
        } catch (err) {
          setError("Could not load book details");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchBook();
    }, [bookId]);

    //   const handleAction = () => {
    //     if (book.bookPurpose === 'Exchange') {
    //       navigate(`/exchange-form?book=${bookId}`);
    //     } else if (book.bookPurpose === 'Buy/Sell') {
    //       navigate(`/buysell-form/${bookId}`);
    //     } else if (book.bookPurpose === 'Rent') {
    //       navigate(`/rent-form?book=${bookId}`);
    //     }
    //   };

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (error || !book) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-500">Error</h2>
            <p className="mb-4">{error || "No book found."}</p>
            <button
              onClick={() => navigate("/books")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Back to Books
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen pt-24 bg-blue-50">
        {/* Breadcrumb */}
        {/* <div className="container mx-auto px-4 py-2">
          <div className="flex text-sm">
            <a href="/" className="hover:text-blue-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/books" className="hover:text-blue-600">Books</a>
            <span className="mx-2">/</span>
            <span className="font-medium">{book.title}</span>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="md:flex">
              {/* Left Panel */}
              <div className="md:w-1/3 p-6 border-r border-gray-100">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <img
                    src={`${book.bookImage}`}
                    alt={book.title}
                    className="w-full object-contain"
                  />
                </div>

                {/* Dynamic Action Button */}
                <button
                  onClick={() => {
                    const userId = localStorage.getItem("userId");
                    if (!userId) {
                      toast.error("Please log in to buy", {
                        position: "top-center",
                      });
                      return;
                    }
                    navigate(`/checkout/${book._id}`);
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Buy Now
                </button>

                {/* Price Display */}

                <div className="mt-4 text-lg font-semibold text-green-700">
                  Price: Rs. {book.price}
                </div>

                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Options:</h4>
                  <ul>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {book.delivery === "Yes"
                        ? "Delivery Available"
                        : "In-person Exchange"}
                    </li>
                    <li className="flex items-center mt-2">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {book.negotiable ? "Negotiable" : "Fixed Price"}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Panel */}
              <div className="md:w-2/3 p-6">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold mb-1">{book.title}</h1>
                  <p className="text-gray-600">
                    by <span className="italic">{book.author}</span>
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h2 className="text-lg font-semibold mb-2">About This Book</h2>
                  <p className="text-gray-700">{book.description}</p>
                </div>

                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h2 className="text-lg font-semibold mb-2">Genres</h2>
                  <div className="flex flex-wrap gap-2">{book.genre}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default BuysellBookViewpage;
