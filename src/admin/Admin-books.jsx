

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BookOpen, Trash2, Loader, Search } from 'lucide-react';
import Sidebar from './Admin-nav';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSort, setCurrentSort] = useState({ field: 'title', direction: 'asc' });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/get-all-books`);
        if (response.data.success) {
          setBooks(response.data.books);
        } else {
          console.error('Failed to fetch books: ', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortBooks = (field) => {
    const direction = currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc';
    const sortedBooks = [...books].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setBooks(sortedBooks);
    setCurrentSort({ field, direction });
  };

  const getSortIcon = (field) => {
    if (currentSort.field !== field) return null;
    return currentSort.direction === 'asc' ? '↑' : '↓';
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const removeBook = async (bookId) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this book?");
  //   if (!confirmDelete) return;

  //   try {
  //     const response = await axios.delete(`${baseURL}/api/delete`, {
  //       withCredentials: true,
  //       body:JSON.stringify(bookId)
  //     });

  //     if (response.data.success) {
  //       setBooks(prev => prev.filter(book => book._id !== bookId));
  //       console.log("Book deleted successfully.");
  //     } else {
  //       console.error("Failed to delete book:", response.data.message);
  //     }
  //   } catch (err) {
  //     console.error("Error deleting book:", err);
  //   }
  // };
  const removeBook = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`${baseURL}/api/deletebook/${bookId}`, {
        withCredentials: true
      });
  
      if (response.data.success) {
        setBooks(prev => prev.filter(book => book._id !== bookId));
        console.log("Book deleted successfully.");
      } else {
        console.error("Failed to delete book:", response.data.message);
      }
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };
  

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader className="animate-spin h-10 w-10 text-indigo-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">Library Management</h1>
              </div>
            </div>

            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books by title, author or genre..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-b p-4 text-left text-sm font-medium text-gray-500">#</th>
                    <th
                      className="border-b p-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-200"
                      onClick={() => sortBooks('title')}
                    >
                      <div className="flex items-center">
                        Title {getSortIcon('title')}
                      </div>
                    </th>
                    <th
                      className="border-b p-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-200"
                      onClick={() => sortBooks('author')}
                    >
                      <div className="flex items-center">
                        Author {getSortIcon('author')}
                      </div>
                    </th>
                    <th
                      className="border-b p-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-200"
                    >
                      <div className="flex items-center">
                        Book Purpose
                      </div>
                    </th>
                    <th
                      className="border-b p-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-200"
                      onClick={() => sortBooks('genre')}
                    >
                      <div className="flex items-center">
                        Genre {getSortIcon('genre')}
                      </div>
                    </th>
                    <th className="border-b p-4 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                      <tr key={book._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="border-b p-4 text-gray-600">{index + 1}</td>
                        <td className="border-b p-4">
                          <Link
                            // to={`/admin/book/${book._id}`}
                            className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                          >
                            {book.title}
                          </Link>
                        </td>
                        <td className="border-b p-4 text-gray-700">{book.author}</td>
                        <td className="border-b p-4 text-gray-700">{book.bookPurpose}</td>
                        <td className="border-b p-4">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                            {book.genre}
                          </span>
                        </td>
                        <td className="border-b p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => removeBook(book._id)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm flex items-center transition-colors duration-300"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        No books found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              Total Books: {filteredBooks.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;