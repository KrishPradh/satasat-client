// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false); // Added loading state
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);  // Set loading state to true while the login request is in progress

//         try {
//             const response = await fetch(`${baseURL}/api/Login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//                 credentials: "include",
//             });
    
//             if (!response.ok) {
//                 throw new Error("Login failed");
//             }
    
//             const data = await response.json();
//             console.log(data);

//             // Store token and userId in localStorage
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("userId", data.user.id);
    
//             // Notify the user and redirect
//             toast.success('Login successful!');
//             navigate('/'); // Redirect to home after successful login
    
//             // Reset form fields
//             setEmail('');
//             setPassword('');
//         } catch (error) {
//             console.error("Error during login:", error);
//             toast.error(error.message || 'An error occurred during login');  // Use toast for errors
//         } finally {
//             setLoading(false);  // Set loading to false after the request completes
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
//                 <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>
//                 <p className="text-center text-gray-600 mb-4">Welcome back! Please enter your credentials to continue.</p>
//                 <form className="space-y-5" onSubmit={handleSubmit}>
//                     <div className="space-y-1">
//                         <label htmlFor="email" className="text-sm text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder="Enter your email address"
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <label htmlFor="password" className="text-sm text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="Enter your password"
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className={`w-full py-3 mt-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         disabled={loading}  // Disable the button during loading
//                     >
//                         {loading ? 'Logging In...' : 'Login'}
//                     </button>
//                 </form>
//                 <p className="mt-4 text-center text-sm text-gray-600">
//                     Don't have an account? <Link to="/Signup" className="text-blue-500 hover:text-blue-600">Sign Up</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${baseURL}/api/Login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error("Login failed");
            }
    
            const data = await response.json();
            console.log(data);

            // Store token and userId in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
    
            // Notify the user and redirect
            setSuccessMessage('Login successful!');
            setTimeout(() => navigate('/'), 1000); // Redirect to home after successful login
    
            // Reset form fields
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Error during login:", error);
            setErrors({...errors, general: error.message || 'An error occurred during login'});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage("");
            setErrors({});
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [successMessage, errors]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 py-4">
            <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                {/* Logo and Branding */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-3 px-6 rounded-full shadow-lg">
                        SATASAT
                    </div>
                </div>
                
                <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-1 text-center text-gray-800">Welcome Back</h1>
                    <p className="text-gray-600 mb-4 text-center text-sm">
                        Sign in to access your Satasat account
                    </p>
                    
                    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                        {successMessage && (
                            <div className="bg-green-50 text-green-700 p-2 rounded-lg mb-2 border-l-4 border-green-500 flex items-center text-sm">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {successMessage}
                            </div>
                        )}

                        {errors.general && (
                            <div className="bg-red-50 text-red-700 p-2 rounded-lg mb-2 border-l-4 border-red-500 flex items-center text-sm">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {errors.general}
                            </div>
                        )}
                        
                        <div className="space-y-0.5">
                            <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                />
                                <div className="absolute left-2.5 top-2.5 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-0.5">
                            <label htmlFor="password" className="block text-xs font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                />
                                <div className="absolute left-2.5 top-2.5 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items- justify-between text-xs">
                            <div className="flex items-center">
                                {/* <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-700">
                                    Remember me
                                </label> */}
                            </div>
                            <Link to={"/forgot-password"}>
                            <div className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all">
                                <a href="#">Forgot password?</a>
                            </div>
                            </Link>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-medium text-sm mt-2"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    
                    <div className="mt-4 text-center">
                        <p className="text-gray-600 text-xs">
                            Don't have an account?{' '}
                            <Link to="/Signup" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                        <p className="text-xs text-gray-500">
                            By signing in, you agree to Satasat's{' '}
                            <a href="#" className="text-blue-500 hover:underline">Terms</a> and{' '}
                            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
//     const [resetEmail, setResetEmail] = useState('');
//     const [resetLoading, setResetLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await fetch(`${baseURL}/api/Login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//                 credentials: "include",
//             });
    
//             if (!response.ok) {
//                 throw new Error("Login failed");
//             }
    
//             const data = await response.json();
//             console.log(data);

//             // Store token and userId in localStorage
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("userId", data.user.id);
    
//             // Notify the user and redirect
//             toast.success('Login successful!');
//             navigate('/'); // Redirect to home after successful login
    
//             // Reset form fields
//             setEmail('');
//             setPassword('');
//         } catch (error) {
//             console.error("Error during login:", error);
//             toast.error(error.message || 'An error occurred during login');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         setResetLoading(true);

//         try {
//             const response = await fetch(`${baseURL}/api/ResetPassword`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email: resetEmail }),
//             });
    
//             if (!response.ok) {
//                 throw new Error("Password reset request failed");
//             }
    
//             toast.success('Password reset link sent to your email!');
//             setResetEmail('');
//             setForgotPasswordMode(false);
//         } catch (error) {
//             console.error("Error requesting password reset:", error);
//             toast.error(error.message || 'An error occurred while requesting password reset');
//         } finally {
//             setResetLoading(false);
//         }
//     };

//     if (forgotPasswordMode) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100">
//                 <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
//                     <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reset Password</h1>
//                     <p className="text-center text-gray-600 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
//                     <form className="space-y-5" onSubmit={handleForgotPassword}>
//                         <div className="space-y-1">
//                             <label htmlFor="resetEmail" className="text-sm text-gray-700">Email</label>
//                             <input
//                                 type="email"
//                                 id="resetEmail"
//                                 placeholder="Enter your email address"
//                                 required
//                                 value={resetEmail}
//                                 onChange={(e) => setResetEmail(e.target.value)}
//                                 className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className={`w-full py-3 mt-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${resetLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                             disabled={resetLoading}
//                         >
//                             {resetLoading ? 'Sending...' : 'Send Reset Link'}
//                         </button>
//                     </form>
//                     <button 
//                         className="mt-4 text-center w-full text-sm text-blue-500 hover:text-blue-600"
//                         onClick={() => setForgotPasswordMode(false)}
//                     >
//                         Back to Login
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
//                 <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>
//                 <p className="text-center text-gray-600 mb-4">Welcome back! Please enter your credentials to continue.</p>
//                 <form className="space-y-5" onSubmit={handleSubmit}>
//                     <div className="space-y-1">
//                         <label htmlFor="email" className="text-sm text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder="Enter your email address"
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <label htmlFor="password" className="text-sm text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="Enter your password"
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                         <div className="flex justify-end">
//                             <button 
//                                 type="button" 
//                                 className="text-sm text-blue-500 hover:text-blue-600"
//                                 onClick={() => setForgotPasswordMode(true)}
//                             >
//                                 Forgot password?
//                             </button>
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         className={`w-full py-3 mt-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         disabled={loading}
//                     >
//                         {loading ? 'Logging In...' : 'Login'}
//                     </button>
//                 </form>
//                 <p className="mt-4 text-center text-sm text-gray-600">
//                     Don't have an account? <Link to="/Signup" className="text-blue-500 hover:text-blue-600">Sign Up</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;
