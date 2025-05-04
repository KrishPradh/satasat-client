// // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import '../css/Post.css';

// // const Post = () => {
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         author: '',
// //         genre: '',
// //         description: '',
// //         condition: '',
// //         bookPurpose: '',
// //         bookImage: null,
// //     });

// //     // Handle input changes
// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData((prevState) => ({
// //             ...prevState,
// //             [name]: value,
// //         }));
// //     };

// //     // Handle file change
// //     const handleFileChange = (e) => {
// //         setFormData((prevState) => ({
// //             ...prevState,
// //             bookImage: e.target.files[0],
// //         }));
// //     };

// //     // Handle form submission
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const form = new FormData();
// //             form.append('title', formData.title);
// //             form.append('author', formData.author);
// //             form.append('genre', formData.genre);
// //             form.append('description', formData.description);
// //             form.append('condition', formData.condition);
// //             form.append('bookPurpose', formData.bookPurpose);
// //             form.append('bookImage', formData.bookImage);
// //             const response = await fetch('${baseURL}/api/upload', {
// //             method : "POST",
// //             body: form
// //             })
// //             console.log('Book posted successfully', response.data);
// //             // Handle success (e.g., show a success message or redirect)
// //         } catch (error) {
// //             console.error('Error posting book:', error);
// //             // Handle error (e.g., show an error message)
// //         }
// //     };

// //     return (
// //         <div className="flex flex-col justify-center items-center h-[95vh] mb-48 pt-60 bg-[#f0eee2] p-5 box-border">
// //             <h3>Post Your Book</h3>
// //             <form onSubmit={handleSubmit}>
// //                 <div className="form-group">
// //                     <label>Book Title:</label>
// //                     <input
// //                         type="text"
// //                         name="title"
// //                         value={formData.title}
// //                         onChange={handleInputChange}
// //                         placeholder="Enter book title"
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label>Author:</label>
// //                     <input
// //                         type="text"
// //                         name="author"
// //                         value={formData.author}
// //                         onChange={handleInputChange}
// //                         placeholder="Enter author's name"
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label>Genre:</label>
// //                     <input
// //                         type="text"
// //                         name="genre"
// //                         value={formData.genre}
// //                         onChange={handleInputChange}
// //                         placeholder="Enter book genre"
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label>Description:</label>
// //                     <textarea
// //                         name="description"
// //                         value={formData.description}
// //                         onChange={handleInputChange}
// //                         placeholder="Enter book description"
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label>Condition:</label>
// //                     <select
// //                         name="condition"
// //                         value={formData.condition}
// //                         onChange={handleInputChange}
// //                         required
// //                     >
// //                         <option value="">Select condition</option>
// //                         <option value="New">New</option>
// //                         <option value="Used">Used</option>
// //                     </select>
// //                 </div>
// //                 <div className="form-group">
// //                     <label>Purpose:</label>
// //                     <select
// //                         name="bookPurpose"
// //                         value={formData.bookPurpose}
// //                         onChange={handleInputChange}
// //                         required
// //                     >
// //                         <option value="">Select purpose</option>
// //                         <option value="Buy/Sell">Buy/Sell</option>
// //                         <option value="Exchange">Exchange</option>
// //                         <option value="Rent">Rent</option>
// //                     </select>
// //                 </div>
// //                 <div className="form-group">
// //                     <label>Upload Image:</label>
// //                     <input
// //                         type="file"
// //                         name="bookImage"
// //                         onChange={handleFileChange}
// //                         required
// //                     />
// //                 </div>
// //                 <div className="button-group">
// //                     <button type="submit">Post Book</button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };

// // export default Post;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import '../css/Post.css';

// const Post = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         author: '',
//         genre: '',
//         description: '',
//         condition: '',
//         bookPurpose: '',
//         bookImage: null,
//     });

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Handle file change
//     const handleFileChange = (e) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             bookImage: e.target.files[0],
//         }));
//     };

//     const navigate = useNavigate();
//         // Handle form submission
//         // const handleSubmit = async (e) => {
//         //     e.preventDefault();

//         //     try {
//         //         const form = new FormData();
//         //         form.append('title', formData.title);
//         //         form.append('author', formData.author);
//         //         form.append('genre', formData.genre);
//         //         form.append('description', formData.description);
//         //         form.append('condition', formData.condition);
//         //         form.append('bookPurpose', formData.bookPurpose);
//         //         form.append('bookImage', formData.bookImage);
//         //         const response = await fetch('${baseURL}/api/upload', {
//         //         method : "POST",
//         //         body: form
//         //         })
//         //         console.log('Book posted successfully', response.data);
//         //         alert('Book posted successfully!');
//         //         navigate('/')
//         //         // Handle success (e.g., show a success message or redirect)
//         //     } catch (error) {
//         //         console.error('Error posting book:', error);
//         //         alert('Error posting book. Please try again.');
//         //         // Handle error (e.g., show an error message)
//         //     }
//         // };

//         const handleSubmit = async (e) => {
//             e.preventDefault();

//             try {
//                 const form = new FormData();
//                 form.append('title', formData.title);
//                 form.append('author', formData.author);
//                 form.append('genre', formData.genre);
//                 form.append('description', formData.description);
//                 form.append('condition', formData.condition);
//                 form.append('bookPurpose', formData.bookPurpose);

//                 if (formData.bookImage instanceof File) {
//                     form.append('bookImage', formData.bookImage);
//                 } else {
//                     console.error('Invalid bookImage file:', formData.bookImage);
//                     alert('Please upload a valid image file.');
//                     return;
//                 }

//                 const response = await fetch('${baseURL}/api/upload', {
//                     method: "POST",
//                     body: form,
//                     credentials: "include"  // Ensures cookies are sent
//                 });

//                 if (!response.ok) {
//                     throw new Error(`Server error: ${response.statusText}`);
//                 }

//                 const data = await response.json();
//                 console.log('Book posted successfully', data);
//                 alert('Book posted successfully!');
//                 navigate('/'); // Redirect to home page
//             } catch (error) {
//                 console.error('Error posting book:', error);
//                 alert('Error posting book. Please try again.');
//             }
//         };

//     return (
//         <div className="flex flex-col justify-center items-center h-[95vh] mb-48 pt-60 bg-[#f0eee2] p-5 box-border">
//             <form onSubmit={handleSubmit} className="w-full max-w-[600px]  bg-white p-8 rounded-lg shadow-md">
//                 <div className="form-group mb-5">
//                 <h3 className="text-center text-[1.8rem] mb-5 text-[#333333]">Post Your Book</h3>
//                     <label className="block mb-2 text-[14px] text-[#555555]">Book Title:</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         placeholder="Enter book title"
//                         required
//                         className="w-full p-2 text-[14px] border border-[#cccccc] rounded-[5px] box-border"
//                     />
//                 </div>
//                 <div className="form-group mb-5">
//                     <label className="block mb-2 text-[14px] text-[#555555]">Author:</label>
//                     <input
//                         type="text"
//                         name="author"
//                         value={formData.author}
//                         onChange={handleInputChange}
//                         placeholder="Enter author's name"
//                         required
//                         className="w-full p-2 text-[14px] border border-[#cccccc] rounded-[5px] box-border"
//                     />
//                 </div>
//                 <div className="form-group mb-5">
//                     <label className="block mb-2 text-[14px] text-[#555555]">Genre:</label>
//                     <input
//                         type="text"
//                         name="genre"
//                         value={formData.genre}
//                         onChange={handleInputChange}
//                         placeholder="Enter book genre"
//                         required
//                         className="w-full p-2 text-[14px] border border-[#cccccc] rounded-[5px] box-border"
//                     />
//                 </div>
//                 <div className="form-group mb-5">
//                     <label className="block mb-2 text-[14px] text-[#555555]">Description:</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         placeholder="Enter book description"
//                         required
//                         className="w-full p-2 text-[14px] border border-[#cccccc] rounded-[5px] box-border resize-none h-[100px]"
//                     />
//                 </div>
//                 <div className="form-group mb-5">
//                     <label className="block mb-2 text-[14px] text-[#555555]">Condition:</label>
//                     <select
//                         name="condition"
//                         value={formData.condition}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full p-2 text-[14px] border border-[#cccccc] rounded-[5px] box-border"
//                     >
//                         <option value="">Select condition</option>
//                         <option value="New">New</option>
//                         <option value="Used">Used</option>
//                     </select>
//                 </div>
//                 <div className="form-group mb-5">
//                     <label className="block mb-2 text-[14px] text-[#555555]">Purpose:</label>
//                     <select
//                         name="bookPurpose"
//                         value={formData.bookPurpose}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full p-2 text-[14px] border border-[#cccccc] rounded-[5px] box-border"
//                     >
//                         <option value="">Select purpose</option>
//                         <option value="Buy/Sell">Buy/Sell</option>
//                         <option value="Exchange">Exchange</option>
//                         <option value="Rent">Rent</option>
//                     </select>
//                 </div>
//                 <div className="form-group mb-5">
//                     <label className="block mb-2 text-[14px] text-[#555555]">Upload Image:</label>
//                     <input
//                         type="file"
//                         name="bookImage"
//                         onChange={handleFileChange}
//                         required
//                         className="border-none p-0"
//                     />
//                 </div>
//                 <div className="button-group flex justify-center mt-5">
//                     <button type="submit" className="bg-[#007bff] text-white px-5 py-2 text-[16px] rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-[#0056b3]">
//                         Post Book
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Post;

//----Updated Code-----

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Post = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         author: '',
//         genre: '',
//         description: '',
//         condition: '',
//         bookPurpose: '',
//         price: '',
//         phoneNumber: '',
//         delivery: '',
//         bookImage: null,
//         location: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (e) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             bookImage: e.target.files[0],
//         }));
//     };

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const form = new FormData();
//             form.append('title', formData.title);
//             form.append('author', formData.author);
//             form.append('genre', formData.genre);
//             form.append('description', formData.description);
//             form.append('condition', formData.condition);
//             form.append('bookPurpose', formData.bookPurpose);
//             form.append('phoneNumber', formData.phoneNumber);
//             form.append('delivery', formData.delivery);
//             form.append('location', formData.location); // Append location to form data
//             if (formData.bookPurpose !== "Exchange") {
//                 form.append('price', formData.price);
//             }
//             if (formData.bookImage instanceof File) {
//                 form.append('bookImage', formData.bookImage);
//             } else {
//                 alert('Please upload a valid image file.');
//                 return;
//             }

//             const response = await fetch('${baseURL}/api/upload', {
//                 method: "POST",
//                 body: form,
//                 credentials: "include"
//             });

//             if (!response.ok) {
//                 throw new Error(`Server error: ${response.statusText}`);
//             }

//             alert('Book posted successfully!');
//             navigate('/');
//         } catch (error) {
//             alert('Error posting book. Please try again.');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
//             <form onSubmit={handleSubmit} className="w-full max-w-lg mt-20 bg-white p-8 rounded-lg shadow-md">
//                 <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">Post Your Book</h3>
//                 <div className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Book Title</label>
//                         <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter book title" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Author</label>
//                         <input type="text" name="author" value={formData.author} onChange={handleInputChange} placeholder="Enter author name" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Genre</label>
//                         <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} placeholder="Enter genre" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Description</label>
//                         <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter book description" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Condition</label>
//                         <select name="condition" value={formData.condition} onChange={handleInputChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
//                             <option value="">Select Condition</option>
//                             <option value="New">New</option>
//                             <option value="Used">Used</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Purpose</label>
//                         <select name="bookPurpose" value={formData.bookPurpose} onChange={handleInputChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
//                             <option value="">Select Purpose</option>
//                             <option value="Buy/Sell">Buy/Sell</option>
//                             <option value="Exchange">Exchange</option>
//                             <option value="Rent">Rent</option>
//                         </select>
//                     </div>
//                     {formData.bookPurpose !== "Exchange" && (
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Price</label>
//                             <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter price" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//                         </div>
//                     )}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                         <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Enter contact number" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Delivery Available</label>
//                         <select name="delivery" value={formData.delivery} onChange={handleInputChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
//                             <option value="">Select Delivery Option</option>
//                             <option value="Yes">Yes</option>
//                             <option value="No">No</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Location</label> {/* New Location Field */}
//                         <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter your location" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Book Image</label>
//                         <input type="file" name="bookImage" onChange={handleFileChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//                     </div>
//                     <div>
//                         <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition">Post Book</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Post;



// updatedd

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Post = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     genre: "",
//     description: "",
//     condition: "",
//     bookPurpose: "",
//     price: "",
//     phoneNumber: "",
//     delivery: "",
//     bookImage: null,
//     location: "",
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   setFormData((prevState) => ({
//   //     ...prevState,
//   //     bookImage: file,
//   //   }));

//   //   // Create preview for selected image
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setPreviewImage(reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   } else {
//   //     setPreviewImage(null);
//   //   }
//   // };
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
  
//     if (file && !file.type.startsWith("image/")) {
//       toast.error("Please upload a valid image file.");
//       e.target.value = ""; // Clear the invalid file
//       setPreviewImage(null);
//       return;
//     }
  
//     setFormData((prevState) => ({
//       ...prevState,
//       bookImage: file,
//     }));
  
//     // Create preview for selected image
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewImage(null);
//     }
//   };
  

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const form = new FormData();
//       form.append("title", formData.title);
//       form.append("author", formData.author);
//       form.append("genre", formData.genre);
//       form.append("description", formData.description);
//       form.append("condition", formData.condition);
//       form.append("bookPurpose", formData.bookPurpose);
//       form.append("phoneNumber", formData.phoneNumber);
//       form.append("delivery", formData.delivery);
//       form.append("location", formData.location);
//       if (formData.bookPurpose !== "Exchange") {
//         form.append("price", formData.price);
//       }
//       if (formData.bookImage instanceof File) {
//         form.append("bookImage", formData.bookImage);
//       } else {
//         alert("Please upload a valid image file.");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`${baseURL}/api/upload`, {
//         method: "POST",
//         body: form,
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.statusText}`);
//       }

//       toast.success("Book posted successfully!");
      
//       // Navigate to home page after a short delay to allow the user to see the success toast
//       setTimeout(() => {
//         navigate("/");
//         window.location.reload()
//       }, 1500);
//     } catch (error) {
//       alert("Login to post the book.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 mt-16 to-gray-100 min-h-screen py-10 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-[#305582] py-4 px-6">
//             <h3 className="text-2xl font-bold text-white text-center">
//               Share Your Book
//             </h3>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 md:p-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                 <div className="flex items-center space-x-2 mb-6">
//                   <div className="w-8 h-8 bg-[#305582]         rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold">1</span>
//                   </div>
//                   <h4 className="text-lg font-semibold text-gray-800">
//                     Book Details
//                   </h4>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Book Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   placeholder="Enter book title"
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Author
//                 </label>
//                 <input
//                   type="text"
//                   name="author"
//                   value={formData.author}
//                   onChange={handleInputChange}
//                   placeholder="Enter author name"
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Genre
//                 </label>
//                 <input
//                   type="text"
//                   name="genre"
//                   value={formData.genre}
//                   onChange={handleInputChange}
//                   placeholder="Enter genre"
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Condition
//                 </label>
//                 <select
//                   name="condition"
//                   value={formData.condition}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
//                 >
//                   <option value="">Select Condition</option>
//                   <option value="New">New</option>
//                   <option value="Used">Used</option>
//                 </select>
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Enter book description"
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-32"
//                 ></textarea>
//               </div>

//               <div className="md:col-span-2">
//                 <div className="flex items-center space-x-2 mb-6 mt-4">
//                   <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold">2</span>
//                   </div>
//                   <h4 className="text-lg font-semibold text-gray-800">
//                     Offer Details
//                   </h4>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Purpose
//                 </label>
//                 <select
//                   name="bookPurpose"
//                   value={formData.bookPurpose}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
//                 >
//                   <option value="">Select Purpose</option>
//                   <option value="Buy/Sell">Buy/Sell</option>
//                   <option value="Exchange">Exchange</option>
//                   <option value="Rent">Rent</option>
//                 </select>
//               </div>

//               {formData.bookPurpose !== "Exchange" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Price
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <span className="text-gray-500">Rs. </span>
//                     </div>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleInputChange}
//                       placeholder=" Enter price"
//                       required
//                       className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   placeholder="Enter contact number"
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   placeholder="Enter your location"
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Available
//                 </label>
//                 <select
//                   name="delivery"
//                   value={formData.delivery}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
//                 >
//                   <option value="">Select Delivery Option</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>

//               <div className="md:col-span-2">
//                 <div className="flex items-center space-x-2 mb-6 mt-4">
//                   <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold">3</span>
//                   </div>
//                   <h4 className="text-lg font-semibold text-gray-800">
//                     Book Image
//                   </h4>
//                 </div>

//                 <div className="flex flex-col md:flex-row gap-6">
//                   <div className="w-full md:w-1/2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Upload Image
//                     </label>
//                     <input
//                       type="file"
//                       name="bookImage"
//                       onChange={handleFileChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Upload a clear image of your book
//                     </p>
//                   </div>
//                   <div className="w-full md:w-1/2">
//                     <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
//                       {previewImage ? (
//                         <img
//                           src={previewImage}
//                           alt="Book preview"
//                           className="h-full w-full object-contain p-2"
//                         />
//                       ) : (
//                         <div className="text-center text-gray-500">
//                           <p>Image preview</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="md:col-span-2 mt-6">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full ${
//                     loading ? "bg-gray-400" : "bg-[#305582] hover:bg-[#3b689f]"
//                   } text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md`}
//                 >
//                   {loading ? (
//                     <>
//                       <span className="inline-block animate-spin mr-2">⟳</span>
//                       Posting...
//                     </>
//                   ) : (
//                     "Post Book"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Post = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    condition: "",
    bookPurpose: "",
    price: "",
    phoneNumber: "",
    delivery: "",
    bookImage: null,
    qrcodeImage:null,
    location: "",
    // qrCodeImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [qrPreviewImage, setQrPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      e.target.value = ""; // Clear the invalid file
      setPreviewImage(null);
      return;
    }
  
    setFormData((prevState) => ({
      ...prevState,
      bookImage: file,
    }));
  
    // Create preview for selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  
  const handleQrCodeChange = (e) => {
    const file = e.target.files[0];
  
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file for QR code.");
      e.target.value = ""; // Clear the invalid file
      setQrPreviewImage(null);
      return;
    }
  
    setFormData((prevState) => ({
      ...prevState,
      qrcodeImage: file,
    }));
  
    // Create preview for selected QR code image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setQrPreviewImage(null);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("author", formData.author);
      form.append("genre", formData.genre);
      form.append("description", formData.description);
      form.append("condition", formData.condition);
      form.append("bookPurpose", formData.bookPurpose);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("delivery", formData.delivery);
      form.append("location", formData.location);
      
      if (formData.bookPurpose !== "Exchange") {
        form.append("price", formData.price);
      }
      
      if (formData.bookImage instanceof File) {
        form.append("bookImage", formData.bookImage);
      } else {
        toast.error("Please upload a valid book image file.");
        setLoading(false);
        return;
      }
      
      // Add QR code image if it's Buy/Sell and a QR code was uploaded
      if (formData.bookPurpose === "Buy/Sell" && formData.qrcodeImage instanceof File) {
        form.append("qrcodeImage", formData.qrcodeImage);
      }

      const response = await fetch(`${baseURL}/api/upload`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      toast.success("Book posted successfully!");
      
      // Navigate to home page after a short delay to allow the user to see the success toast
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Login to post the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 mt-16 to-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#305582] py-4 px-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Share Your Book
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Book Details
                  </h4>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter book title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Enter author name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  placeholder="Enter genre"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter book description"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-32"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-6 mt-4">
                  <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Offer Details
                  </h4>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose
                </label>
                <select
                  name="bookPurpose"
                  value={formData.bookPurpose}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                >
                  <option value="">Select Purpose</option>
                  <option value="Buy/Sell">Buy/Sell</option>
                  <option value="Exchange">Exchange</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              {formData.bookPurpose !== "Exchange" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">Rs. </span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder=" Enter price"
                      required
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Available
                </label>
                <select
                  name="delivery"
                  value={formData.delivery}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                >
                  <option value="">Select Delivery Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-6 mt-4">
                  <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Book Image
                  </h4>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="bookImage"
                      onChange={handleFileChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload a clear image of your book
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Book preview"
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <div className="text-center text-gray-500">
                          <p>Image preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Section - Only show when Buy/Sell is selected */}
              {formData.bookPurpose === "Buy/Sell" && (
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2 mb-6 mt-4">
                    <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Payment QR Code
                    </h4>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload QR Code
                      </label>
                      <input
                        type="file"
                        name="qrcodeImage"
                        onChange={handleQrCodeChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload your payment QR code for easier transactions
                      </p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        {qrPreviewImage ? (
                          <img
                            src={qrPreviewImage}
                            alt="QR Code preview"
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <div className="text-center text-gray-500">
                            <p>QR Code preview</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="md:col-span-2 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
                    loading ? "bg-gray-400" : "bg-[#305582] hover:bg-[#3b689f]"
                  } text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md`}
                >
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⟳</span>
                      Posting...
                    </>
                  ) : (
                    "Post Book"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;