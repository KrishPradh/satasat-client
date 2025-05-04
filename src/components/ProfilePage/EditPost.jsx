// import React, { useState } from 'react';

// const EditPost = () => {
//   const [formData, setFormData] = useState({
//     _id: "680c5ba9067e6e209fa50268",
//     title: "The Alchemist",
//     author: "Andrew",
//     genre: "sci-fi",
//     description: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an…",
//     bookImage: "https://res.cloudinary.com/dkxjlwrk9/image/upload/v1745640360/BookExch…",
//     qrcodeImage: "https://res.cloudinary.com/dkxjlwrk9/image/upload/v1745640361/BookExch…",
//     condition: "New",
//     bookPurpose: "Buy/Sell",
//     price: 899,
//     phoneNumber: "9803333333",
//     location: "Kathmandu",
//     delivery: "Yes",
//     user: "680b4abc37bdceedc8d916a6",
//     createdAt: "2025-04-26T04:06:01.413+00:00"
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated Post:", formData);
//     // Send formData to backend here
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-6 p-6 border rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4">Edit Book Post</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {Object.entries(formData).map(([key, value]) =>
//           key !== "_id" && key !== "createdAt" && key !== "user" && key !== "__v" ? (
//             key.includes("Image") ? (
//               <div key={key}>
//                 <label className="block font-medium">{key}</label>
//                 <img src={value} alt={key} className="w-32 h-32 object-cover mb-2" />
//                 <input
//                   type="text"
//                   name={key}
//                   value={value}
//                   onChange={handleChange}
//                   className="w-full border px-3 py-2 rounded"
//                 />
//               </div>
//             ) : (
//               <div key={key}>
//                 <label className="block font-medium">{key}</label>
//                 <input
//                   type={typeof value === "number" ? "number" : "text"}
//                   name={key}
//                   value={value}
//                   onChange={handleChange}
//                   className="w-full border px-3 py-2 rounded"
//                 />
//               </div>
//             )
//           ) : null
//         )}
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPost;
