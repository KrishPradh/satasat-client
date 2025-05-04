// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaDollarSign, FaShieldAlt, FaFileAlt } from 'react-icons/fa';

// const RentForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [bookDetail, setBookDetail] = useState(null);
//   const [formData, setFormData] = useState({
//     renterUserId: '',
//     ownerUserId: '',
//     bookId: '',
//     duration: { months: '', weeks: '', days: '' },
//     price: '',
//     location: '',
//     phoneNumber: '',
//     securityDeposit: '',
//     rentalTerms: '',
//   });

//   const location = useLocation();
//   const bookId = new URLSearchParams(location.search).get('book');

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       if (!bookId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
//         setBookDetail(response.data);
//         setFormData((prev) => ({
//           ...prev,
//           bookId: response.data._id,
//           ownerUserId: response.data.user,
//         }));
//       } catch (err) {
//         console.error('Error fetching book details:', err);
//       }
//       setLoading(false);
//     };
//     fetchBookDetails();
//   }, [bookId]);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const response = await axios.get('${baseURL}/api/user', {
//           withCredentials: true,
//         });
//         if (response.data.success) {
//           setFormData((prev) => ({
//             ...prev,
//             renterUserId: response.data.user.id,
//           }));
//         } else {
//           console.error('Failed to get user ID');
//         }
//       } catch (error) {
//         console.error('Error fetching user ID:', error);
//       }
//     };
//     fetchUserId();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (['months', 'weeks', 'days'].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         duration: {
//           ...prev.duration,
//           [name]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         '${baseURL}/api/rentrequest/createrentalrequest',
//         formData,
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true,
//         }
//       );
//       if (response.data) {
//         alert('Rent request submitted successfully!');
//       } else {
//         alert('Submission failed: ' + (response.data.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error submitting form: ' + (error.response?.data?.message || 'Please try again.'));
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-24 mb-20 p-8 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold text-center mb-6">Rent This Book</h2>
//       <p className="text-center text-gray-600 mb-6">Complete the form below to submit your rental request.</p>
//       {loading ? (
//         <p>Loading book details...</p>
//       ) : (
//         bookDetail && (
//           <div className="mb-6 p-4 border rounded-md">
//             <h3 className="text-xl font-semibold">Book: {bookDetail.title}</h3>
//             <img src={`${baseURL}/${bookDetail.bookImage}`} alt={bookDetail.title} className="w-32 h-40 object-cover mt-2" />
//           </div>
//         )
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-3 gap-4">
//           {['months', 'weeks', 'days'].map((timeframe) => (
//             <div key={timeframe} className="relative">
//               <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
//               <input
//                 name={timeframe}
//                 type="number"
//                 placeholder={timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
//                 value={formData.duration[timeframe]}
//                 onChange={handleChange}
//                 className="w-full pl-10 p-2 border rounded-md"
//               />
//             </div>
//           ))}
//         </div>
//         <input
//           name="securityDeposit"
//           type="number"
//           placeholder="Security Deposit"
//           value={formData.securityDeposit}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded-md"
//         />
//         <div className="relative">
//           <FaFileAlt className="absolute left-3 top-3 text-gray-500" />
//           <textarea
//             name="rentalTerms"
//             placeholder="Rental Terms and Conditions"
//             value={formData.rentalTerms}
//             onChange={handleChange}
//             className="w-full pl-10 p-2 border rounded-md"
//             required
//           />
//         </div>
//         {[{ name: 'location', icon: FaMapMarkerAlt }, { name: 'phoneNumber', icon: FaPhoneAlt }].map(({ name, icon: Icon }) => (
//           <div key={name} className="relative">
//             <Icon className="absolute left-3 top-3 text-gray-500" />
//             <input
//               name={name}
//               type="text"
//               placeholder={name.replace(/([A-Z])/g, ' $1')}
//               value={formData[name]}
//               onChange={handleChange}
//               className="w-full pl-10 p-2 border rounded-md"
//               required
//             />
//           </div>
//         ))}
//         <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold">
//           Send Rent Request
//         </button>
//       </form>
//     </div>
//   );
// };
// export default RentForm;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
// } from 'react-icons/fa';
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// // Predefined terms
// const rentalTermsText = [
//   "Return the book in the same condition as received.",
//   "Late return may result in extra charges.",
//   "No markings or damage to the book is allowed.",
//   "Security deposit will be refunded after return."
// ];

// const RentForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [bookDetail, setBookDetail] = useState(null);
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     renterUserId: '',
//     ownerUserId: '',
//     bookId: '',
//     duration: { months: '', weeks: '', days: '' },
//     price: '',
//     location: '',
//     phoneNumber: '',
//     securityDeposit: '',
//     rentalTerms: rentalTermsText.join('\n'),
//   });

//   const location = useLocation();
//   const bookId = new URLSearchParams(location.search).get('book');

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       if (!bookId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
//         setBookDetail(response.data);
//         setFormData((prev) => ({
//           ...prev,
//           bookId: response.data._id,
//           ownerUserId: response.data.user
//         }));
//       } catch (err) {
//         console.error('Error fetching book details:', err);
//       }
//       setLoading(false);
//     };
//     fetchBookDetails();
//   }, [bookId]);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/user`, {
//           withCredentials: true
//         });
//         if (response.data.success) {
//           setFormData((prev) => ({
//             ...prev,
//             renterUserId: response.data.user.id
//           }));
//         }
//       } catch (error) {
//         console.error('Error fetching user ID:', error);
//       }
//     };
//     fetchUserId();
//   }, []);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;

//   //   if (['months', 'weeks', 'days'].includes(name)) {
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       duration: {
//   //         ...prev.duration,
//   //         [name]: value
//   //       }
//   //     }));
//   //   } else {
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       [name]: value
//   //     }));
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!agreedToTerms) {
//   //     alert("You must agree to the rental terms and conditions.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.post(
//   //       `${baseURL}/api/rentrequest/createrentalrequest`,
//   //       formData,
//   //       {
//   //         headers: { 'Content-Type': 'application/json' },
//   //         withCredentials: true
//   //       }
//   //     );
//   //     if (response.data) {
//   //       alert('Rent request submitted successfully!');
//   //     } else {
//   //       alert('Submission failed.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error submitting form:', error);
//   //     alert('Submission error. Try again later.');
//   //   }
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     if (['months', 'weeks', 'days'].includes(name)) {
//       // Allow only numbers or empty string
//       if (/^\d*$/.test(value)) {
//         setFormData((prev) => ({
//           ...prev,
//           duration: {
//             ...prev.duration,
//             [name]: value
//           }
//         }));
//       }
//     } else if (name === "securityDeposit") {
//       if (/^\d*$/.test(value)) {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value
//         }));
//       }
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!agreedToTerms) {
//       alert("You must agree to the rental terms and conditions.");
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         `${baseURL}/api/rentrequest/createrentalrequest`,
//         formData,
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true,
//         }
//       );
  
//       if (response.data) {
//         alert("Rent request submitted successfully!");
//         navigate("/rental-requests"); // ✅ Navigate to rental requests page or any route you want
//       } else {
//         alert("Submission failed.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Submission error. Try again later.");
//     }
//   };
  
  
//   return (
//     <div className="max-w-3xl mx-auto mt-24 mb-20 p-8 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold text-center mb-6">Rent This Book</h2>
//       <p className="text-center text-gray-600 mb-6">Complete the form below to submit your rental request.</p>

//       {loading ? (
//         <p>Loading book details...</p>
//       ) : (
//         bookDetail && (
//           <div className="mb-6 p-4 border rounded-md">
//             <h3 className="text-xl font-semibold">Book: {bookDetail.title}</h3>
//             <img
//               src={`${bookDetail.bookImage}`}
//               alt={bookDetail.title}
//               className="w-32 h-40 object-cover mt-2"
//             />
//           </div>
//         )
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Duration Inputs */}
//         <div className="grid grid-cols-3 gap-4">
//           {['months', 'weeks', 'days'].map((timeframe) => (
//             <div key={timeframe} className="relative">
//               <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
//               <input
//                 name={timeframe}
//                 type="number"
//                 placeholder={timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
//                 value={formData.duration[timeframe]}
//                 onChange={handleChange}
//                 className="w-full pl-10 p-2 border rounded-md"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Security Deposit */}
//         <input
//           name="securityDeposit"
//           type="number"
//           placeholder="Security Deposit"
//           value={formData.securityDeposit}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded-md"
//         />

//         {/* Rental Terms Display & Agreement */}
//         <div className="border p-4 rounded-md bg-gray-50">
//           <h4 className="font-semibold text-gray-800 mb-2">Rental Terms & Conditions</h4>
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {rentalTermsText.map((term, idx) => (
//               <li key={idx}>{term}</li>
//             ))}
//           </ul>
//           <label className="flex items-center mt-4 text-sm text-gray-800">
//             <input
//               type="checkbox"
//               checked={agreedToTerms}
//               onChange={(e) => setAgreedToTerms(e.target.checked)}
//               className="mr-2"
//               required
//             />
//             I agree to the Rental Terms & Conditions
//           </label>
//         </div>

//         {/* Location & Phone */}
//         {[{ name: 'location', icon: FaMapMarkerAlt }, { name: 'phoneNumber', icon: FaPhoneAlt }].map(({ name, icon: Icon }) => (
//           <div key={name} className="relative">
//             <Icon className="absolute left-3 top-3 text-gray-500" />
//             <input
//               name={name}
//               type="text"
//               placeholder={name.replace(/([A-Z])/g, ' $1')}
//               value={formData[name]}
//               onChange={handleChange}
//               className="w-full pl-10 p-2 border rounded-md"
//               required
//             />
//           </div>
//         ))}

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
//         >
//           Send Rent Request
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RentForm;


  // import React, { useState, useEffect } from 'react';
  // import axios from 'axios';
  // import { useLocation, useNavigate } from 'react-router-dom';
  // import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

  // const baseURL = process.env.REACT_APP_API_BASE_URL;

  // const rentalTermsText = [
  //   "Return the book in the same condition as received.",
  //   "Late return may result in extra charges.",
  //   "No markings or damage to the book is allowed.",
  //   "Security deposit will be refunded after return."
  // ];

  // const RentForm = () => {
  //   const [loading, setLoading] = useState(false);
  //   const [bookDetail, setBookDetail] = useState(null);
  //   const [agreedToTerms, setAgreedToTerms] = useState(false);
  //   const [error, setError] = useState('');
  //   const navigate = useNavigate();

  //   const [formData, setFormData] = useState({
  //     renterUserId: '',
  //     ownerUserId: '',
  //     bookId: '',
  //     duration: { months: '', weeks: '', days: '' },
  //     price: '',
  //     location: '',
  //     phoneNumber: '',
  //     securityDeposit: '',
  //     rentalTerms: rentalTermsText.join('\n'),
  //   });

  //   const location = useLocation();
  //   const bookId = new URLSearchParams(location.search).get('book');

  //   useEffect(() => {
  //     const fetchBookDetails = async () => {
  //       if (!bookId) return;
  //       setLoading(true);
  //       try {
  //         const response = await axios.get(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
  //         setBookDetail(response.data);
  //         setFormData((prev) => ({
  //           ...prev,
  //           bookId: response.data._id,
  //           ownerUserId: response.data.user
  //         }));
  //       } catch (err) {
  //         console.error('Error fetching book details:', err);
  //         setError('Failed to load book details.');
  //       }
  //       setLoading(false);
  //     };
  //     fetchBookDetails();
  //   }, [bookId]);

  //   useEffect(() => {
  //     const fetchUserId = async () => {
  //       try {
  //         const response = await axios.get(`${baseURL}/api/user`, {
  //           withCredentials: true
  //         });
  //         if (response.data.success) {
  //           setFormData((prev) => ({
  //             ...prev,
  //             renterUserId: response.data.user.id
  //           }));
  //         }
  //       } catch (error) {
  //         console.error('Error fetching user ID:', error);
  //         setError('Failed to identify user.');
  //       }
  //     };
  //     fetchUserId();
  //   }, []);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     if (['months', 'weeks', 'days'].includes(name)) {
  //       if (/^\d*$/.test(value)) {
  //         setFormData((prev) => ({
  //           ...prev,
  //           duration: {
  //             ...prev.duration,
  //             [name]: value
  //           }
  //         }));
  //       }
  //     } else if (name === 'securityDeposit') {
  //       if (/^\d*$/.test(value)) {
  //         setFormData((prev) => ({
  //           ...prev,
  //           [name]: value
  //         }));
  //       }
  //     } else {
  //       setFormData((prev) => ({
  //         ...prev,
  //         [name]: value
  //       }));
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError('');

  //     if (!agreedToTerms) {
  //       setError('You must agree to the rental terms and conditions.');
  //       return;
  //     }

  //     const { months, weeks, days } = formData.duration;
  //     if (!months && !weeks && !days) {
  //       setError('Please enter at least one duration (months, weeks, or days).');
  //       return;
  //     }

  //     if (!formData.securityDeposit) {
  //       setError('Security deposit is required.');
  //       return;
  //     }

  //     try {
  //       const response = await axios.post(
  //         `${baseURL}/api/rentrequest/createrentalrequest`,
  //         {
  //           ...formData,
  //           securityDeposit: Number(formData.securityDeposit),
  //           duration: {
  //             months: Number(months || 0),
  //             weeks: Number(weeks || 0),
  //             days: Number(days || 0),
  //           },
  //         },
  //         {
  //           headers: { 'Content-Type': 'application/json' },
  //           withCredentials: true,
  //         }
  //       );

  //       if (response.data) {
  //         alert("Rent request submitted successfully!");
  //         navigate("/rent-request");
  //       } else {
  //         setError("Submission failed.");
  //       }
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //       setError("Submission error. Try again later.");
  //     }
  //   };

  //   return (
  //     <div className="max-w-3xl mx-auto mt-24 mb-20 p-8 bg-white rounded-lg shadow-lg">
  //       <h2 className="text-3xl font-bold text-center mb-6">Rent This Book</h2>
  //       <p className="text-center text-gray-600 mb-6">Complete the form below to submit your rental request.</p>

  //       {loading ? (
  //         <p>Loading book details...</p>
  //       ) : error ? (
  //         <p className="text-red-500 text-center mb-4">{error}</p>
  //       ) : (
  //         bookDetail && (
  //           <div className="mb-6 p-4 border rounded-md">
  //             <h3 className="text-xl font-semibold">Book: {bookDetail.title}</h3>
  //             <img
  //               src={`${bookDetail.bookImage}`}
  //               alt={bookDetail.title}
  //               className="w-32 h-40 object-cover mt-2"
  //             />
  //           </div>
  //         )
  //       )}

  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <div className="grid grid-cols-3 gap-4">
  //           {['months', 'weeks', 'days'].map((timeframe) => (
  //             <div key={timeframe} className="relative">
  //               <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
  //               <input
  //                 name={timeframe}
  //                 type="text"
  //                 placeholder={timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
  //                 value={formData.duration[timeframe]}
  //                 onChange={handleChange}
  //                 className="w-full pl-10 p-2 border rounded-md"
  //               />
  //             </div>
  //           ))}
  //         </div>

  //         <input
  //           name="securityDeposit"
  //           type="text"
  //           placeholder="Security Deposit"
  //           value={formData.securityDeposit}
  //           onChange={handleChange}
  //           className="w-full p-2 border rounded-md"
  //         />

  //         <div className="border p-4 rounded-md bg-gray-50">
  //           <h4 className="font-semibold text-gray-800 mb-2">Rental Terms & Conditions</h4>
  //           <ul className="list-disc list-inside text-gray-700 space-y-1">
  //             {rentalTermsText.map((term, idx) => (
  //               <li key={idx}>{term}</li>
  //             ))}
  //           </ul>
  //           <label className="flex items-center mt-4 text-sm text-gray-800">
  //             <input
  //               type="checkbox"
  //               checked={agreedToTerms}
  //               onChange={(e) => setAgreedToTerms(e.target.checked)}
  //               className="mr-2"
  //             />
  //             I agree to the Rental Terms & Conditions
  //           </label>
  //         </div>

  //         {[{ name: 'location', icon: FaMapMarkerAlt }, { name: 'phoneNumber', icon: FaPhoneAlt }].map(({ name, icon: Icon }) => (
  //           <div key={name} className="relative">
  //             <Icon className="absolute left-3 top-3 text-gray-500" />
  //             <input
  //               name={name}
  //               type="text"
  //               placeholder={name.replace(/([A-Z])/g, ' $1')}
  //               value={formData[name]}
  //               onChange={handleChange}
  //               className="w-full pl-10 p-2 border rounded-md"
  //               required
  //             />
  //           </div>
  //         ))}

  //         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

  //         <button
  //           type="submit"
  //           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
  //         >
  //           Send Rent Request
  //         </button>
  //       </form>
  //     </div>
  //   );
  // };

  // export default RentForm;

  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaRupeeSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
  
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  
  const rentalTermsText = [
    "Return the book in the same condition as received.",
    "Late return may result in extra charges.",
    "No markings or damage to the book is allowed.",
    "Security deposit will be refunded after return."
  ];
  
  // Pricing configuration
  const PRICE_CONFIG = {
    dailyRate: 0.033,   // ~3.3% of book price per day
    weeklyRate: 0.25,   // 25% of book price per week
    monthlyRate: 1.0    // 100% of book price per month
  };
  
  const RentForm = () => {
    const [loading, setLoading] = useState(false);
    const [bookDetail, setBookDetail] = useState(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      renterUserId: '',
      ownerUserId: '',
      bookId: '',
      duration: { months: '', weeks: '', days: '' },
      price: '',
      location: '',
      phoneNumber: '',
      securityDeposit: '',
      rentalTerms: rentalTermsText.join('\n'),
    });
  
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
  
    const location = useLocation();
    const bookId = new URLSearchParams(location.search).get('book');
  
    useEffect(() => {
      const fetchBookDetails = async () => {
        if (!bookId) return;
        setLoading(true);
        try {
          const response = await axios.get(`${baseURL}/api/singlebook/get-single-books/${bookId}`);
          setBookDetail(response.data);
          setFormData((prev) => ({
            ...prev,
            bookId: response.data._id,
            ownerUserId: response.data.user,
            price: response.data.price // Set the base price from book details
          }));
        } catch (err) {
          console.error('Error fetching book details:', err);
          setError('Failed to load book details.');
        }
        setLoading(false);
      };
      fetchBookDetails();
    }, [bookId]);
  
    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/user`, {
            withCredentials: true
          });
          if (response.data.success) {
            setFormData((prev) => ({
              ...prev,
              renterUserId: response.data.user.id
            }));
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
          setError('Failed to identify user.');
        }
      };
      fetchUserId();
    }, []);
  
    // Calculate rental price whenever duration or book price changes
    useEffect(() => {
      if (!bookDetail || !bookDetail.price) return;
  
      const { months, weeks, days } = formData.duration;
      const bookPrice = parseFloat(bookDetail.price);
  
      let calculated = 0;
      
      if (months) calculated += bookPrice * PRICE_CONFIG.monthlyRate * parseInt(months);
      if (weeks) calculated += bookPrice * PRICE_CONFIG.weeklyRate * parseInt(weeks);
      if (days) calculated += bookPrice * PRICE_CONFIG.dailyRate * parseInt(days);
  
      setCalculatedPrice(calculated);
      setTotalPrice(calculated + (parseFloat(formData.securityDeposit) || 0));
    }, [formData.duration, formData.securityDeposit, bookDetail]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (['months', 'weeks', 'days'].includes(name)) {
        if (/^\d*$/.test(value)) {
          setFormData((prev) => ({
            ...prev,
            duration: {
              ...prev.duration,
              [name]: value
            }
          }));
        }
      } else if (name === 'securityDeposit') {
        if (/^\d*$/.test(value)) {
          setFormData((prev) => ({
            ...prev,
            [name]: value
          }));
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      if (!agreedToTerms) {
        setError('You must agree to the rental terms and conditions.');
        return;
      }
  
      const { months, weeks, days } = formData.duration;
      if (!months && !weeks && !days) {
        setError('Please enter at least one duration (months, weeks, or days).');
        return;
      }
  
      if (!formData.securityDeposit) {
        setError('Security deposit is required.');
        return;
      }
  
      try {
        const response = await axios.post(
          `${baseURL}/api/rentrequest/createrentalrequest`,
          {
            ...formData,
            totalPrice: calculatedPrice, // Use the calculated price
            securityDeposit: Number(formData.securityDeposit),
            duration: {
              months: Number(months || 0),
              weeks: Number(weeks || 0),
              days: Number(days || 0),
            },
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
  
        if (response.data) {
          toast.success("Rent request submitted successfully!");
          navigate("/rent-request");
        } else {
          setError("Submission failed.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("Submission error. Try again later.");
      }
    };
  
    // useEffect(() => {
    //   if (!bookDetail || !bookDetail.price) return;
  
    //   const { months, weeks, days } = formData.duration;
    //   const bookPrice = parseFloat(bookDetail.price);
  
    //   let calculated = 0;
  
    //   if (months) calculated += bookPrice * PRICE_CONFIG.monthlyRate * parseInt(months);
    //   if (weeks) calculated += bookPrice * PRICE_CONFIG.weeklyRate * parseInt(weeks);
    //   if (days) calculated += bookPrice * PRICE_CONFIG.dailyRate * parseInt(days);
  
    //   setCalculatedPrice(calculated);
    //   setTotalPrice(calculated + (parseFloat(formData.securityDeposit) || 0));
    // }, [formData.duration, formData.securityDeposit, bookDetail]);
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
  
    //   if (['months', 'weeks', 'days'].includes(name)) {
    //     if (/^\d*$/.test(value)) {
    //       setFormData((prev) => ({
    //         ...prev,
    //         duration: {
    //           ...prev.duration,
    //           [name]: value
    //         }
    //       }));
    //     }
    //   } else if (name === 'securityDeposit') {
    //     if (/^\d*$/.test(value)) {
    //       setFormData((prev) => ({
    //         ...prev,
    //         [name]: value
    //       }));
    //     }
    //   } else {
    //     setFormData((prev) => ({
    //       ...prev,
    //       [name]: value
    //     }));
    //   }
    // };
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
  
    //   try {
    //     // Prepare the payload with totalPrice and other relevant information
    //     const payload = {
    //       renterUserId: "user123", // Example user ID, should be dynamically set
    //       ownerUserId: "owner123", // Example owner ID
    //       bookId: bookDetail._id, // Book ID
    //       duration: formData.duration,
    //       securityDeposit: formData.securityDeposit,
    //       totalPrice: totalPrice,
    //       status: "pending", // Or any other status
    //     };
  
    //     // Send the request to the backend
    //     const response = await axios.post(`${baseURL}/api/rentrequest/createrentalrequest`, payload);
  
    //     if (response.status === 200) {
    //       console.log('Rental request submitted successfully!');
    //     }
    //   } catch (error) {
    //     console.error('Error submitting rental request:', error);
    //   }
    // };
  

    return (
      <div className="max-w-3xl mx-auto mt-24 mb-20 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Rent This Book</h2>
        <p className="text-center text-gray-600 mb-6">Complete the form below to submit your rental request.</p>
  
        {loading ? (
          <p>Loading book details...</p>
        ) : error ? (
          <p className="text-red-500 text-center mb-4">{error}</p>
        ) : (
          bookDetail && (
            <div className="mb-6 p-4 border rounded-md">
              <h3 className="text-xl font-semibold">Book: {bookDetail.title}</h3>
              <p className="text-lg font-medium">
                Rs.{bookDetail.price} (per month) 
              </p>
              <img
                src={bookDetail.bookImage}
                alt={bookDetail.title}
                className="w-32 h-40 object-cover mt-2"
              />
            </div>
          )
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {['months', 'weeks', 'days'].map((timeframe) => (
              <div key={timeframe} className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
                <input
                  name={timeframe}
                  type="text"
                  placeholder={timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  value={formData.duration[timeframe]}
                  onChange={handleChange}
                  className="w-full pl-10 p-2 border rounded-md"
                />
              </div>
            ))}
          </div>
  
          {/* Price Calculation Display */}
          <div className="bg-blue-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Rental Price:</span>
              <span className="font-semibold">
                <FaRupeeSign className="inline mr-1" />
                {calculatedPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Security Deposit:</span>
              <span className="font-semibold">
                <FaRupeeSign className="inline mr-1" />
                {formData.securityDeposit || '0'}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-blue-100">
              <span className="font-bold">Total Amount:</span>
              <span className="font-bold text-blue-600">
                <FaRupeeSign className="inline mr-1" />
                {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
  
          <input
            name="securityDeposit"
            type="text"
            placeholder="Security Deposit"
            value={formData.securityDeposit}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
  
          <div className="border p-4 rounded-md bg-gray-50">
            <h4 className="font-semibold text-gray-800 mb-2">Rental Terms & Conditions</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {rentalTermsText.map((term, idx) => (
                <li key={idx}>{term}</li>
              ))}
            </ul>
            <label className="flex items-center mt-4 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mr-2"
              />
              I agree to the Rental Terms & Conditions
            </label>
          </div>
  
          {[{ name: 'location', icon: FaMapMarkerAlt }, { name: 'phoneNumber', icon: FaPhoneAlt }].map(({ name, icon: Icon }) => (
            <div key={name} className="relative">
              <Icon className="absolute left-3 top-3 text-gray-500" />
              <input
                name={name}
                type="text"
                placeholder={name.replace(/([A-Z])/g, ' $1')}
                value={formData[name]}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded-md"
                required
              />
            </div>
          ))}
  
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
  
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
          >
            Send Rent Request
          </button>
        </form>
      </div>
    );
  };
  
  export default RentForm;