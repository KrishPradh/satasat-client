// Sidebar.js
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   BookMarked,
//   BarChart,
//   BookOpen,
//   Users,
//   LogOut,
// } from "lucide-react";

// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const location = useLocation();

//   const navItems = [
//     {
//       title: "Dashboard",
//       icon: BarChart,
//       path: "/admin-dashboard",
//     },
//     {
//       title: "Books",
//       icon: BookOpen,
//       path: "/adminBooks",
//     },
//     {
//       title: "Users",
//       icon: Users,
//       path: "/adminUser",
//     },
//     {
//       title: "BookPost",
//       icon: BookOpen,
//       path: "/adminPost",
//     },
//     {
//       title: "Bookdetails",
//       icon: BookOpen,
//       path: "/adminorderhistory",
//     },
//     // Add more items here as needed
//   ];

//   return (
//     <div
//       className={`${
//         sidebarOpen ? "w-64" : "w-20"
//       } bg-white shadow-lg transition-all duration-300 flex flex-col h-screen`}
//     >
//       <div className="p-4 flex items-center border-b border-gray-100">
//         <BookMarked className="text-blue-600" size={24} />
//         {sidebarOpen && (
//           <h1 className="ml-3 text-xl font-bold text-gray-800">BookSwap</h1>
//         )}
//       </div>

//       <nav className="flex-1 py-4">
//         {navItems.map(({ title, icon: Icon, path }) => (
//           <Link to={path} key={title}>
//             <div
//               className={`px-4 py-2 flex items-center rounded-lg mx-2 mb-2 ${
//                 location.pathname === path
//                   ? "text-blue-600 bg-blue-50"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               <Icon size={20} />
//               {sidebarOpen && <span className="ml-3">{title}</span>}
//             </div>
//           </Link>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-gray-100">
//         <div className="flex items-center text-gray-600 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
//           <LogOut size={20} />
//           {sidebarOpen && <span className="ml-3">Logout</span>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookMarked,
  BarChart,
  BookOpen,
  Users,
  LogOut,
  Bell,
} from "lucide-react";
import { baseURL } from "../components/Cart/Cart";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: BarChart,
      path: "/admin-dashboard",
    },
    {
      title: "Books",
      icon: BookOpen,
      path: "/adminBooks",
    },
    {
      title: "Users",
      icon: Users,
      path: "/adminUser",
    },
    {
      title: "BookPost",
      icon: BookOpen,
      path: "/adminPost",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/admin-notification",
    },
    
    {
      title: "Bookdetails",
      icon: BookOpen,
      path: "/adminorderhistory",
    },
    // Add more items here as needed
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
      toast.success("Logout successful!");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      window.location.href = "/adminLogin";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-white shadow-lg transition-all duration-300 flex flex-col h-screen`}
    >
      <div className="p-4 flex items-center border-b border-gray-100">
        <BookMarked className="text-blue-600" size={24} />
        {sidebarOpen && (
          <h1 className="ml-3 text-xl font-bold text-gray-800">BookSwap</h1>
        )}
      </div>

      <nav className="flex-1 py-4">
        {navItems.map(({ title, icon: Icon, path }) => (
          <Link to={path} key={title}>
            <div
              className={`px-4 py-2 flex items-center rounded-lg mx-2 mb-2 ${
                location.pathname === path
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              {sidebarOpen && <span className="ml-3">{title}</span>}
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
      <div 
          className="flex items-center text-gray-600 hover:bg-gray-100 rounded-lg p-2 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {sidebarOpen && <span className="ml-3">Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;