// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpass, setConfirmpass] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [errors, setErrors] = useState({});
//   const [successmessage, setsuccessmessage] = useState("");
//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};
    
//     // Name validation
//     if (!name.trim()) {
//       newErrors.name = "Name is required";
//     } else if (name.trim().length < 2) {
//       newErrors.name = "Name must be at least 2 characters";
//     }
    
//     // Email validation
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
//       newErrors.email = "Invalid email address";
//     }
    
//     // Phone validation (optional field)
//     if (phone && !/^[0-9+\-\s()]{10,15}$/.test(phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//     }
    
//     // Address validation (optional field)
//     if (address && address.trim().length < 5) {
//       newErrors.address = "Address should be at least 5 characters";
//     }
    
//     // Password validation
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
//       newErrors.password = "Password must include uppercase, lowercase, and numbers";
//     }
    
//     // Confirm password validation
//     if (!confirmpass) {
//       newErrors.confirmpass = "Please confirm your password";
//     } else if (password !== confirmpass) {
//       newErrors.confirmpass = "Passwords do not match";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       return;
//     }

//     try {
//       const response = await axios.post(`${baseURL}/api/Signup`, { 
//         name, 
//         email, 
//         password, 
//         phone, 
//         address 
//       });
      
//       const { token } = response.data;
//       localStorage.setItem('authToken', token);
      
//       // alert('Account created successfully!');
//       // navigate('/Login');
//       setsuccessmessage("Plese check your email to verify your account.")
//     } catch (error) {
//       console.error('Error during signup:', error);
      
//       if (error.response?.status === 409) {
//         setErrors({...errors, email: "Email already exists"});
//       } else {
//         alert(error.response?.data?.message || 'An error occurred during signup');
//       }
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setsuccessmessage("")
//       setErrors("")
//       // setErrorMessage("")
//     }, 3000)
//   }, [])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>
//         <p className="text-gray-600 mb-6 text-center">
//           Join the community and start exchanging, renting, and discovering books today!
//         </p>
//         <form className="space-y-4" onSubmit={handleSubmit} noValidate>
//         <div>
//               {successmessage && (
//                 <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
//                   {successmessage}
//                   </div>
//               )}
//               {/* {errors && (
//                 <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
//                   {errors}
//                 </div>
//               )} */}
//             </div>

//           <div className="space-y-2">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               placeholder="Enter your full name"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//           </div>
          
//           <div className="space-y-2">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email address"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>
          
//           <div className="space-y-2">
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
//             <input
//               type="tel"
//               id="phone"
//               placeholder="Enter your phone number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//           </div>
          
//           <div className="space-y-2">
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//             <input
//               type="text"
//               id="address"
//               placeholder="Enter your address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
//           </div>
          
//           <div className="space-y-2">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Create a password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//             <p className="text-gray-500 text-xs mt-1">
//               Password must be at least 8 characters with uppercase, lowercase letters and numbers
//             </p>
//           </div>
          
//           <div className="space-y-2">
//             <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               id="confirm-password"
//               placeholder="Confirm your password"
//               required
//               value={confirmpass}
//               onChange={(e) => setConfirmpass(e.target.value)}
//               className={`w-full px-3 py-2 border ${errors.confirmpass ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.confirmpass && <p className="text-red-500 text-xs mt-1">{errors.confirmpass}</p>}
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/Login" className="text-blue-500 hover:underline">Sign In</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
    }
    
    // Phone validation (optional field)
    if (phone && !/^[0-9+\-\s()]{10,15}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    // Address validation (optional field)
    if (address && address.trim().length < 5) {
      newErrors.address = "Address should be at least 5 characters";
    }
    
    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      newErrors.password = "Password must include uppercase, lowercase, and numbers";
    }
    
    // Confirm password validation
    if (!confirmpass) {
      newErrors.confirmpass = "Please confirm your password";
    } else if (password !== confirmpass) {
      newErrors.confirmpass = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/Signup`, { 
        name, 
        email, 
        password, 
        phone, 
        address 
      });
      
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      
      setSuccessMessage("Please check your email to verify your account.");
    } catch (error) {
      console.error('Error during signup:', error);
      
      if (error.response?.status === 409) {
        setErrors({...errors, email: "Email already exists"});
      } else {
        alert(error.response?.data?.message || 'An error occurred during signup');
      }
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
          <h1 className="text-2xl font-bold mb-1 text-center text-gray-800">Join Satasat</h1>
          <p className="text-gray-600 mb-4 text-center text-sm">
            Your community for exchanging, renting, and discovering books!
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

            <div className="space-y-0.5">
              <label htmlFor="name" className="block text-xs font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3 py-2 pl-8 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm`}
                />
                <div className="absolute left-2.5 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            
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
                  className={`w-full px-3 py-2 pl-8 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm`}
                />
                <div className="absolute left-2.5 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-0.5">
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-3 py-2 pl-8 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm`}
                  />
                  <div className="absolute left-2.5 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>
              
              <div className="space-y-0.5">
                <label htmlFor="address" className="block text-xs font-medium text-gray-700">Address</label>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    placeholder="Your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full px-3 py-2 pl-8 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm`}
                  />
                  <div className="absolute left-2.5 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
              </div>
            </div>
            
            <div className="space-y-0.5">
              <label htmlFor="password" className="block text-xs font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 pl-8 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm`}
                />
                <div className="absolute left-2.5 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              <p className="text-gray-500 text-xs">
                8+ characters with upper, lower case & numbers
              </p>
            </div>
            
            <div className="space-y-0.5">
              <label htmlFor="confirm-password" className="block text-xs font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  required
                  value={confirmpass}
                  onChange={(e) => setConfirmpass(e.target.value)}
                  className={`w-full px-3 py-2 pl-8 border ${errors.confirmpass ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm`}
                />
                <div className="absolute left-2.5 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.confirmpass && <p className="text-red-500 text-xs">{errors.confirmpass}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-medium text-sm mt-2"
            >
              Create Account
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-xs">
              Already have an account?{' '}
              <Link to="/Login" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to Satasat's{' '}
              <a href="#" className="text-blue-500 hover:underline">Terms</a> and{' '}
              <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;