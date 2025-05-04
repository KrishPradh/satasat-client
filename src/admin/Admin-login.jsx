// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const AdminLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await fetch(`${baseURL}/api/admin/login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//                 credentials: "include",
//             });
    
//             if (!response.ok) {
//                 throw new Error("Admin login failed");
//             }
    
//             const data = await response.json();
//             console.log(data);

//             // Store token and adminId in localStorage
//             localStorage.setItem("adminToken", data.token);
//             localStorage.setItem("adminId", data.admin.id);
    
//             // Notify the user and redirect
//             toast.success('Admin login successful!');
//             navigate('/admin-dashboard'); // Redirect to admin dashboard
    
//             // Reset form fields
//             setEmail('');
//             setPassword('');
//         } catch (error) {
//             console.error("Error during admin login:", error);
//             toast.error(error.message || 'Access denied. Please verify your admin credentials.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-900">
//             <div className="bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-md border border-gray-700">
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
//                     <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
//                 </div>
//                 <p className="text-center text-gray-400 mb-6">Secure administrative access only</p>
                
//                 <form className="space-y-5" onSubmit={handleSubmit}>
//                     <div className="space-y-2">
//                         <label htmlFor="email" className="text-sm font-medium text-gray-300">Admin Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder="Enter your admin email"
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div className="space-y-2">
//                         <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="Enter your password"
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div className="flex items-center justify-between pt-2">
//                         <div className="flex items-center">
//                             <input 
//                                 id="remember-me" 
//                                 name="remember-me" 
//                                 type="checkbox" 
//                                 className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
//                             />
//                             <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
//                                 Remember me
//                             </label>
//                         </div>
//                         <div className="text-sm">
//                             <Link to="/admin/reset-password" className="text-blue-400 hover:text-blue-300">
//                                 Forgot password?
//                             </Link>
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         className={`w-full py-3 mt-4 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         disabled={loading}
//                     >
//                         {loading ? 'Authenticating...' : 'Sign In to Admin'}
//                     </button>
//                 </form>
                
//                 <div className="mt-6 pt-4 border-t border-gray-700">
//                     <p className="text-center text-sm text-gray-400">
//                         Need an admin account? <Link to="/admin/request-access" className="text-blue-400 hover:text-blue-300">Request Access</Link>
//                     </p>
//                     <p className="text-center text-sm text-gray-400 mt-2">
//                         <Link to="/" className="text-blue-400 hover:text-blue-300">Return to main site</Link>
//                     </p>
//                 </div>
                
//                 <div className="mt-6 text-center text-xs text-gray-500">
//                     Protected administrative area. Unauthorized access attempts will be logged.
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${baseURL}/api/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Admin login failed");
            }
    
            const data = await response.json();
            
            // Store token in localStorage
            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("adminId", data.user.id);
            
            // Safely store adminId based on response structure
            if (data.admin && data.admin.id) {
                localStorage.setItem("adminId", data.admin.id);
            } else if (data.id) {
                localStorage.setItem("adminId", data.id);
            } else if (data.adminId) {
                localStorage.setItem("adminId", data.adminId);
            } else {
                console.warn("Admin ID not found in response:", data);
            }
            
            // Handle remember me functionality
            // if (rememberMe) {
            //     localStorage.setItem("adminEmail", email);
            // } else {
            //     localStorage.removeItem("adminEmail");
            // }
    
            toast.success('Admin login successful!');
            navigate('/admin-dashboard');
    
            // Reset form fields
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Error during admin login:", error);
            toast.error(error.message || 'Access denied. Please verify your admin credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-md border border-gray-700">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
                </div>
                <p className="text-center text-gray-400 mb-6">Secure administrative access only</p>
                
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Admin Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your admin email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="username"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 mt-4 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading ? 'Authenticating...' : 'Sign In to Admin'}
                    </button>
                </form>
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <p className="text-center text-sm text-gray-400 mt-2">
                        <Link to="/" className="text-blue-400 hover:text-blue-300">Return to main site</Link>
                    </p>
                </div>
                
                <div className="mt-6 text-center text-xs text-gray-500">
                    Protected administrative area. Unauthorized access attempts will be logged.
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;