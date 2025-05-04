// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Users, Trash2, Shield, Mail, User, Search, RefreshCw, UserPlus, AlertTriangle } from 'lucide-react';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const AdminUser = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRole, setSelectedRole] = useState('all');
//   const [confirmDelete, setConfirmDelete] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${baseURL}/api/allusers`, {});
      
//       if (response.data.success) {
//         setUsers(response.data.users);
//       }
//     } catch (error) {
//       console.error('Failed to fetch users', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteClick = (userId) => {
//     setConfirmDelete(userId);
//   };

//   const deleteUser = async (user) => {
//     try {
//       const response = await axios.delete(`${baseURL}/api/delete/${user._id}`, {
//         // withCredentials: true,
//       });
  
//       if (response.data.success) {
//         // Use a different variable name inside filter
//         setUsers(users.filter(u => u._id !== user._id));
//         setConfirmDelete(null);
//         console.log('User deleted successfully.');
//       } else {
//         console.error('Failed to delete user:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error.message);
//     }
//   };
  
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleRoleFilter = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = 
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesRole = selectedRole === 'all' || 
//       (selectedRole === 'admin' && user.role === 'Admin') ||
//       (selectedRole === 'user' && (user.role === 'User' || !user.role));
      
//     return matchesSearch && matchesRole;
//   });

//   const getRoleBadgeClass = (role) => {
//     if (role === 'Admin') {
//       return 'bg-purple-100 text-purple-800';
//     } else {
//       return 'bg-blue-100 text-blue-800';
//     }
//   };

//   return (
//     <div className="bg-gray-50 mt-16 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center">
//               <Users className="h-6 w-6 text-purple-600 mr-2" />
//               <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//             </div>
//             <button 
//               onClick={fetchUsers}
//               className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md flex items-center transition duration-300 text-sm"
//             >
//               <RefreshCw className="h-4 w-4 mr-2" />
//               Refresh
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="col-span-2 relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />  
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <RefreshCw className="animate-spin h-8 w-8 text-purple-600 mx-auto" />
//               <p className="mt-2 text-gray-600">Loading users...</p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50 border-b border-gray-200">
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <User className="h-4 w-4 mr-1" />
//                         Name
//                       </div>
//                     </th>
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <Mail className="h-4 w-4 mr-1" />
//                         Email
//                       </div>
//                     </th>
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <Shield className="h-4 w-4 mr-1" />
//                         Role
//                       </div>
//                     </th>
//                     <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredUsers.length > 0 ? (
//                     filteredUsers.map((user, index) => (
//                       <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
//                         <td className="py-3 px-6 text-sm text-gray-500">{index + 1}</td>
//                         <td className="py-3 px-6 text-sm font-medium text-gray-900">
//                           {user.name || 'N/A'}
//                         </td>
//                         <td className="py-3 px-6 text-sm text-gray-500">
//                           {user.email}
//                         </td>
//                         <td className="py-3 px-6">
//                           <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role || 'User')}`}>
//                             {user.role || 'User'}
//                           </span>
//                         </td>
//                         <td className="py-3 px-6 text-center">
//                           {confirmDelete === user._id ? (
//                             <div className="flex justify-center space-x-2">
//                               <div className="bg-white p-2 rounded-md shadow-md border border-gray-200">
//                                 <p className="text-sm text-gray-700 mb-2 font-medium">Are you sure you want to delete this user?</p>
//                                 <div className="flex space-x-2">
//                                   <button 
//                                     onClick={() => deleteUser(user)} 
//                                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition duration-300"
//                                   >
//                                     Yes, Delete
//                                   </button>
//                                   <button 
//                                     onClick={() => setConfirmDelete(null)}
//                                     className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs transition duration-300"
//                                   >
//                                     Cancel
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="flex justify-center space-x-2">
//                               <button 
//                                 onClick={() => handleDeleteClick(user._id)}
//                                 className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-xs flex items-center transition duration-300"
//                               >
//                                 <Trash2 className="h-3 w-3 mr-1" />
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="py-10 text-center text-gray-500">
//                         <div className="flex flex-col items-center justify-center space-y-2">
//                           <AlertTriangle className="h-8 w-8 text-gray-400" />
//                           <p>No users found matching your criteria</p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
            
//             <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
//               <span className="text-sm text-gray-500">
//                 Showing {filteredUsers.length} of {users.length} users
//               </span>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUser;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Trash2, Shield, Mail, User, Search, RefreshCw, AlertTriangle, UserPlus, Filter } from 'lucide-react';
import Sidebar from './Admin-nav';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}/api/allusers`);
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId) => {
    setConfirmDelete(userId);
  };

  const deleteUser = async (user) => {
    try {
      const response = await axios.delete(`${baseURL}/api/delete/${user._id}`);
      if (response.data.success) {
        setUsers(users.filter(u => u._id !== user._id));
        setConfirmDelete(null);
        // Toast notification could be added here
      } else {
        setError(response.data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
      setError('Network error while deleting user. Please try again.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch ;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-purple-600 mr-2" />
                  <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={fetchUsers}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md flex items-center transition duration-300 text-sm"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </button>
               </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCw className="animate-spin h-8 w-8 text-purple-600 mx-auto" />
                  <p className="mt-2 text-gray-600">Loading users...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="py-3 px-6 text-sm text-gray-500">{index + 1}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{user.name || 'N/A'}</td>
                            <td className="py-3 px-6 text-sm text-gray-500">{user.email}</td>
                            <td className="py-3 px-6">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${(user.role || 'User')}`}>
                                {user.role || 'User'}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                              {confirmDelete === user._id ? (
                                <div className="flex justify-center space-x-2">
                                  <div className="bg-white p-2 rounded-md shadow-md border border-gray-200">
                                    <p className="text-sm text-gray-700 mb-2 font-medium">Are you sure you want to delete this user?</p>
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => deleteUser(user)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition duration-300"
                                      >
                                        Yes, Delete
                                      </button>
                                      <button
                                        onClick={() => setConfirmDelete(null)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs transition duration-300"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-center space-x-2">
                                  <button
                                    onClick={() => handleDeleteClick(user._id)}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-xs flex items-center transition duration-300"
                                    disabled={user.role === 'Admin'}
                                    title={user.role === 'Admin' ? "Admin users cannot be deleted" : "Delete user"}
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-10 text-center text-gray-500">
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <AlertTriangle className="h-8 w-8 text-gray-400" />
                              <p>No users found matching your criteria</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
                  <span className="text-sm text-gray-500">
                    Showing {filteredUsers.length} of {users.length} users
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;