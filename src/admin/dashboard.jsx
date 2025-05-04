// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   BookOpen,
//   Users,
//   RefreshCw,
//   CreditCard,
//   BookMarked,
//   Search,
//   Bell,
//   LogOut,
//   PlusCircle,
//   ArrowUp,
//   MoreHorizontal,
// } from "lucide-react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [books, setBooks] = useState([]);
//   const [booksCount, setBooksCount] = useState(0);
//   const [userCount, setUserCount] = useState(0);

//   const stats = [
//     {
//       title: "Total Books",
//       value: booksCount.toLocaleString(),
//       icon: BookOpen,
//       color: "bg-blue-100 text-blue-600",
//     },
//     {
//       title: "Total Users",
//       value: userCount.toLocaleString(),
//       icon: Users,
//       color: "bg-green-100 text-green-600",
//     },
//     // {
//     //   title: "Exchanges",
//     //   value: "843",
//     //   icon: RefreshCw,
//     //   change: "+24%",
//     //   color: "bg-purple-100 text-purple-600",
//     // },
//   ];

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/get-all-books`);
//         setBooks(response.data.books || []);
//         setBooksCount(response.data.booksCount || 0);
//       } catch (error) {
//         console.error("Failed to fetch books", error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     const fetchUserCount = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/userscount`);
//         setUserCount(response.data.count || 0);
//       } catch (error) {
//         console.error("Failed to fetch user count", error);
//       }
//     };

//     fetchUserCount();
//   }, []);

//   return (
//     <div className="flex h-screen mt-16 bg-gray-50">
//       {/* Sidebar */}
//       <div
//         className={`${
//           sidebarOpen ? "w-64" : "w-20"
//         } bg-white shadow-lg transition-all duration-300 flex flex-col`}
//       >
//         <div className="p-4 flex items-center border-b border-gray-100">
//           <BookMarked className="text-blue-600" size={24} />
//           {sidebarOpen && (
//             <h1 className="ml-3 text-xl font-bold text-gray-800">BookSwap</h1>
//           )}
//         </div>

//         <nav className="flex-1 py-4">
//           <div className="px-4 py-2 flex items-center text-blue-600 bg-blue-50 rounded-lg mx-2 mb-2">
//             <BarChart size={20} />
//             {sidebarOpen && <span className="ml-3 font-medium">Dashboard</span>}
//           </div>

//           <Link to={"/adminBooks"}>
//           <div className="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-100 rounded-lg mx-2 mb-2">
//             <BookOpen size={20} />
//             {sidebarOpen && <span className="ml-3">Books</span>}
//           </div>
//           </Link>

//           <Link to="/adminUser">
//             {" "}
//             {/* Your target route */}
//             <div className="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-100 rounded-lg mx-2 mb-2">
//               <Users size={20} />
//               {sidebarOpen && <span className="ml-3">Users</span>}
//             </div>
//           </Link>

//             {/* <div className="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-100 rounded-lg mx-2 mb-2">
//               <RefreshCw size={20} />
//               {sidebarOpen && <span className="ml-3">Exchanges</span>}
//             </div>

//           <div className="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-100 rounded-lg mx-2 mb-2">
//             <CreditCard size={20} />
//             {sidebarOpen && <span className="ml-3">Payments</span>}
//           </div> */}
//         </nav>

//         <div className="p-4 border-t border-gray-100">
//           <div className="flex items-center text-gray-600 hover:bg-gray-100 rounded-lg p-2">
//             <LogOut size={20} />
//             {sidebarOpen && <span className="ml-3">Logout</span>}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="lg:hidden"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//           <div className="relative w-64">
//           </div>
//           <div className="flex items-center space-x-4">
//             <Bell size={20} />
//             <LogOut size={20} />
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="px-6 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className={`p-3 rounded-full ${stat.color}`}>
//                     <stat.icon size={20} />
//                   </div>
//                   <span className="text-sm font-medium text-green-500 flex items-center">
//                     {stat.change}
//                     <ArrowUp size={16} className="ml-1" />
//                   </span>
//                 </div>
//                 <h3 className="text-sm font-medium text-gray-500">
//                   {stat.title}
//                 </h3>
//                 <p className="text-2xl font-bold text-gray-800 mt-1">
//                   {stat.value}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import {
  BarChart,
  BookOpen,
  Users,
  RefreshCw,
  Bell,
  LogOut,
  ArrowUp,
  BookAIcon,
  BookA,
} from "lucide-react";
import axios from "axios";
import Sidebar from "./Admin-nav"; // Import the reusable sidebar
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [books, setBooks] = useState([]);
  const [booksCount, setBooksCount] = useState(0);
  const [booksAdminCount, setAdminBooksCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  const stats = [
    {
      title: "Total Books",
      value: booksCount.toLocaleString(),
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Users",
      value: userCount.toLocaleString(),
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Admin Books",
      value: booksAdminCount.toLocaleString(),
      icon: BookA,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Admin Books Sales",
      value: totalSales.toLocaleString(),
      icon: BookA,
      color: "bg-green-100 text-green-600",
    },
    // Commented out stats
    // {
    //   title: "Exchanges",
    //   value: "843",
    //   icon: RefreshCw,
    //   change: "+24%",
    //   color: "bg-purple-100 text-purple-600",
    // },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/get-all-books`);
        setBooks(response.data.books || []);
        setBooksCount(response.data.booksCount || 0);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/userscount`);
        setUserCount(response.data.count || 0);
      } catch (error) {
        console.error("Failed to fetch user count", error);
      }
    };

    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchAdminBookCount = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/admin/book/getpost`);
        setAdminBooksCount(response.data.booksCount || 0);
      } catch (error) {
        console.error("Failed to fetch user count", error);
      }
    };

    fetchAdminBookCount();
  }, []);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await fetch('/api/admin/overall-sales');
      const data = await res.json();
      setTotalSales(data.totalSales);
    };
    fetchSales();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Use the reusable Sidebar component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
       

        {/* Dashboard Content */}
        <main className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  {stat.change && (
                    <span className="text-sm font-medium text-green-500 flex items-center">
                      {stat.change}
                      <ArrowUp size={16} className="ml-1" />
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-500">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
