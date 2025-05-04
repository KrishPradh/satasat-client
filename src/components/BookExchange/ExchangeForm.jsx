

// Updated

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const ExchangeForm = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [bookDetail, setBookDetail] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [formData, setFormData] = useState({
//     bookName: "",
//     author: "",
//     location: "",
//     phoneNumber: "",
//     genre: "", 
//     description: "",
//     condition: "new",
//     senderBookImage: null,
//     senderUserId: "",
//     reciverUserId: "",
//     reciverBookId: "",
//   });

//   const location = useLocation();
//   const bookId = new URLSearchParams(location.search).get("book");

//   // Fetch book details
//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       if (!bookId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${baseURL}/api/singlebook/get-single-books/${bookId}`
//         );
//         setBookDetail(response.data);
//         setFormData((prev) => ({
//           ...prev,
//           reciverBookId: response.data._id,
//           reciverUserId: response.data.user,
//         }));
//       } catch (err) {
//         console.error("Error fetching book details:", err);
//       }
//       setLoading(false);
//     };
//     fetchBookDetails();
//   }, [bookId]);

//   // Fetch sender user ID from token (stored in cookies)
//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/user`, {
//           withCredentials: true, // Ensures cookies are sent
//         });

//         if (response.data.success) {
//           setFormData((prev) => ({
//             ...prev,
//             senderUserId: response.data.user.id, // Set senderUserId from the response
//           }));
//         } else {
//           console.error("Failed to get user ID");
//         }
//       } catch (error) {
//         console.error("Error fetching user ID:", error);
//       }
//     };

//     fetchUserId();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (type === "file") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));

//       // Create image preview
//       if (files[0]) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImagePreview(reader.result);
//         };
//         reader.readAsDataURL(files[0]);
//       } else {
//         setImagePreview(null);
//       }
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "senderBookImage" && formData[key]) {
//         formDataToSend.append(key, formData[key]);
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     try {
//       const response = await axios.post(
//         `${baseURL}/api/ExchangeRequest/create`,
//         formDataToSend,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true, // Ensures the token is sent in cookies
//         }
//       );

//       if (response.data) {
//         alert("Request submitted successfully!");
//         navigate('/exchange-request');
//       } else {
//         alert(
//           "Submission failed: " + (response.data.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert(
//         "Error submitting form: " +
//           (error.response?.data?.message || "Please try again.")
//       );
//     }finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <div className="max-w-2xl mt-24 mb-24 mx-auto p-6 bg-white rounded-lg shadow-md">
//       {loading ? (
//         <p>Loading book details...</p>
//       ) : (
//         bookDetail && (
//           <div className="mb-6 p-4 border rounded-md">
//             <h3 className="text-xl font-semibold">Book You Want to Receive:</h3>
//             <p className="text-lg">Title: {bookDetail.title}</p>
//             <img
//               src={`${bookDetail.bookImage}`}
//               alt={bookDetail.title}
//               className="w-32 h-40 object-cover mt-2"
//             />
//           </div>
//         )
//       )}
//       <h2 className="text-2xl font-bold text-center mb-6">Send Your Book</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4"
//         encType="multipart/form-data"
//       >
//         {["bookName", "author", "location", "phoneNumber"].map((name) => (
//           <input
//             key={name}
//             name={name}
//             type="text"
//             placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
//             value={formData[name]}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded-md"
//           />
//         ))}

//         {/* Genre Dropdown */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Genre
//           </label>
//           <input
//             type="text"
//             name="genre"
//             value={formData.genre}
//             onChange={handleChange}
//             placeholder="Enter genre"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//           />
//         </div>

//         {/* Description Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description:
//           </label>
//           <textarea
//             name="description"
//             placeholder="Enter book description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Book Image:
//           </label>
//           <input
//             type="file"
//             name="senderBookImage"
//             accept="image/*"
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded-md"
//           />
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Book preview"
//               className="w-32 h-40 object-cover border mt-2"
//             />
//           )}
//         </div>

//         {/* Book Condition */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Condition:
//           </label>
//           <select
//             name="condition"
//             value={formData.condition}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           >
//             <option value="new">New</option>
//             <option value="used">Used</option>
//           </select>
//         </div>

//         <button
//         type="submit"
//         disabled={loading}
//         className={`w-full py-2 rounded-md flex items-center justify-center gap-2 transition duration-200 
//           ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
//       >
//         {loading ? (
//           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//         ) : (
//           'Send Exchange Request'
//         )}
//         {loading && <span>Submitting...</span>}
//       </button>
//       </form>
//     </div>
//   );
// };

// export default ExchangeForm;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const ExchangeForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [bookDetail, setBookDetail] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({
    bookName: "",
    author: "",
    phoneNumber: "",
    genre: ""
  });
  
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    location: "",
    phoneNumber: "",
    genre: "", 
    description: "",
    condition: "new",
    senderBookImage: null,
    senderUserId: "",
    reciverUserId: "",
    reciverBookId: "",
  });

  const location = useLocation();
  const bookId = new URLSearchParams(location.search).get("book");

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseURL}/api/singlebook/get-single-books/${bookId}`
        );
        setBookDetail(response.data);
        setFormData((prev) => ({
          ...prev,
          reciverBookId: response.data._id,
          reciverUserId: response.data.user,
        }));
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
      setLoading(false);
    };
    fetchBookDetails();
  }, [bookId]);

  // Fetch sender user ID from token
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/user`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setFormData((prev) => ({
            ...prev,
            senderUserId: response.data.user.id,
          }));
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Clear error when user starts typing
    if (["bookName", "author", "phoneNumber", "genre"].includes(name)) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Create image preview
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Validate book name
    if (!formData.bookName.trim()) {
      newErrors.bookName = "Book name is required";
      isValid = false;
    }
    
    // Validate author
    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
      isValid = false;
    }
    
    // Validate phone number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Enter a valid phone number (10-15 digits)";
      isValid = false;
    }
    
    // Validate genre
    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "senderBookImage" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${baseURL}/api/ExchangeRequest/create`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data) {
        toast.success("Request submitted successfully!");
        navigate('/exchange-request');
      } else {
        alert(
          "Submission failed: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Error submitting form: " +
          (error.response?.data?.message || "Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mt-24 mb-24 mx-auto p-6 bg-white rounded-lg shadow-md">
      {loading && !bookDetail ? (
        <p>Loading book details...</p>
      ) : (
        bookDetail && (
          <div className="mb-6 p-4 border rounded-md">
            <h3 className="text-xl font-semibold">Book You Want to Receive:</h3>
            <p className="text-lg">Title: {bookDetail.title}</p>
            <img
              src={`${bookDetail.bookImage}`}
              alt={bookDetail.title}
              className="w-32 h-40 object-cover mt-2"
            />
          </div>
        )
      )}
      <h2 className="text-2xl font-bold text-center mb-6">Send Your Book</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Book Name Input with Validation */}
        <div className="mb-4">
          <input
            name="bookName"
            type="text"
            placeholder="Book Name"
            value={formData.bookName}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.bookName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bookName && <p className="mt-1 text-sm text-red-500">{errors.bookName}</p>}
        </div>
        
        {/* Author Input with Validation */}
        <div className="mb-4">
          <input
            name="author"
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
        </div>
        
        {/* Location Input (no validation) */}
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        
        {/* Phone Number Input with Validation */}
        <div className="mb-4">
          <input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number (digits only)"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
        </div>

        {/* Genre Input with Validation */}
        <div className="mb-4">
          <input
            name="genre"
            type="text"
            placeholder="Enter genre"
            value={formData.genre}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.genre ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.genre && <p className="mt-1 text-sm text-red-500">{errors.genre}</p>}
        </div>

        {/* Description Field (no validation) */}
        <textarea
          name="description"
          placeholder="Enter book description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        {/* Image Upload (no validation) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Book Image:
          </label>
          <input
            type="file"
            name="senderBookImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Book preview"
              className="w-32 h-40 object-cover border mt-2"
            />
          )}
        </div>

        {/* Book Condition */}
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md flex items-center justify-center gap-2 transition duration-200 
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            'Send Exchange Request'
          )}
        </button>
      </form>
    </div>
  );
};

export default ExchangeForm;