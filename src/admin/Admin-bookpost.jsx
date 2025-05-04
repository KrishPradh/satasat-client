// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "./Admin-nav";

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const AdminPost = () => {
//   const navigate = useNavigate();

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
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (!file || !file.type.startsWith("image/")) {
//       toast.error("Please upload a valid image file.");
//       e.target.value = "";
//       setFormData((prev) => ({ ...prev, bookImage: null }));
//       setPreviewImage(null);
//       return;
//     }

//     setFormData((prev) => ({ ...prev, bookImage: file }));

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreviewImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.bookImage) {
//       toast.error("Please upload a valid image file.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const form = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === "price" && formData.bookPurpose === "Exchange") return;
//         if (key === "bookImage" && value instanceof File) {
//           form.append(key, value);
//         } else if (key !== "bookImage") {
//           form.append(key, value);
//         }
//       });

//       const res = await fetch(`${baseURL}/api/upload`, {
//         method: "POST",
//         body: form,
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to post book.");

//       toast.success("Book posted successfully!");

//       setTimeout(() => {
//         navigate("/");
//         window.location.reload();
//       }, 1500);
//     } catch (err) {
//       toast.error("Login required to post the book.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="bg-gradient-to-b from-blue-50  to-gray-100 min-h-screen py-10 px-4 w-full overflow-y-auto">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-[#305582] py-4 px-6">
//             <h3 className="text-2xl font-bold text-white text-center">Post Your Book</h3>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Section 1: Book Details */}
//             <div className="md:col-span-2 flex items-center space-x-2 mb-6">
//               <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold">1</span>
//               </div>
//               <h4 className="text-lg font-semibold text-gray-800">Book Details</h4>
//             </div>

//             {["title", "author", "genre"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleInputChange}
//                   placeholder={`Enter ${field}`}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
//                 />
//               </div>
//             ))}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
//               <select
//                 name="condition"
//                 value={formData.condition}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
//               >
//                 <option value="">Select Condition</option>
//                 <option value="New">New</option>
//                 <option value="Used">Used</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 placeholder="Enter book description"
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-32"
//               />
//             </div>

//             {/* Section 2: Offer Details */}
//             <div className="md:col-span-2 flex items-center space-x-2 mt-4 mb-4">
//               <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold">2</span>
//               </div>
//               <h4 className="text-lg font-semibold text-gray-800">Offer Details</h4>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
//               <select
//                 name="bookPurpose"
//                 value={formData.bookPurpose}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
//               >
//                 <option value="">Select Purpose</option>
//                 <option value="Buy/Sell">Buy/Sell</option>
//                 <option value="Exchange">Exchange</option>
//                 <option value="Rent">Rent</option>
//               </select>
//             </div>

//             {formData.bookPurpose !== "Exchange" && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">Rs.</span>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter price"
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             )}

//             {["phoneNumber", "location"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
//                   {field === "phoneNumber" ? "Phone Number" : "Location"}
//                 </label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleInputChange}
//                   required
//                   placeholder={`Enter ${field === "phoneNumber" ? "phone number" : "location"}`}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             ))}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Available</label>
//               <select
//                 name="delivery"
//                 value={formData.delivery}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
//               >
//                 <option value="">Select Delivery Option</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             {/* Section 3: Book Image */}
//             <div className="md:col-span-2 flex items-center space-x-2 mt-6 mb-4">
//               <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold">3</span>
//               </div>
//               <h4 className="text-lg font-semibold text-gray-800">Book Image</h4>
//             </div>

//             <div className="flex flex-col md:flex-row gap-6 md:col-span-2">
//               <div className="w-full md:w-1/2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
//                 <input
//                   type="file"
//                   name="bookImage"
//                   onChange={handleFileChange}
//                   required
//                   accept="image/*"
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload a clear image of your book</p>
//               </div>

//               <div className="w-full md:w-1/2">
//                 <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
//                   {previewImage ? (
//                     <img src={previewImage} alt="Book preview" className="h-full w-full object-contain p-2" />
//                   ) : (
//                     <p className="text-gray-500">Image preview</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="md:col-span-2 mt-6">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md ${
//                   loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#305582] hover:bg-[#3b689f]"
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <span className="inline-block animate-spin mr-2">⟳</span> Posting...
//                   </>
//                 ) : (
//                   "Post Book"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPost;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Admin-nav";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const AdminPost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    bookPurpose: "new", // Default to 'new' since that's the only valid option
    price: "",
    delivery: "",
    bookImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      e.target.value = "";
      setFormData((prev) => ({ ...prev, bookImage: null }));
      setPreviewImage(null);
      return;
    }

    setFormData((prev) => ({ ...prev, bookImage: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bookImage) {
      toast.error("Please upload a valid image file.");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "bookImage" && value instanceof File) {
          form.append(key, value);
        } else if (key !== "bookImage") {
          form.append(key, value);
        }
      });

      // Updated endpoint to match your backend routes
      const res = await fetch(`${baseURL}/api/admin/book/post`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to post book.");

      toast.success("Book posted successfully!");

      setTimeout(() => {
        navigate("/admin/books");
      }, 1500);
    } catch (err) {
      toast.error("Authentication required to post the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen py-10 px-4 w-full overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#305582] py-4 px-6">
            <h3 className="text-2xl font-bold text-white text-center">Add New Book</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Book Details */}
            <div className="md:col-span-2 flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Book Details</h4>
            </div>

            {["title", "author", "genre"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter book description"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-32"
              />
            </div>

            {/* Section 2: Offer Details */}
            <div className="md:col-span-2 flex items-center space-x-2 mt-4 mb-4">
              <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Offer Details</h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">Rs.</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Available</label>
              <select
                name="delivery"
                value={formData.delivery}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Delivery Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Section 3: Book Image */}
            <div className="md:col-span-2 flex items-center space-x-2 mt-6 mb-4">
              <div className="w-8 h-8 bg-[#305582] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Book Image</h4>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:col-span-2">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input
                  type="file"
                  name="bookImage"
                  onChange={handleFileChange}
                  required
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Upload a clear image of your book</p>
              </div>

              <div className="w-full md:w-1/2">
                <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  {previewImage ? (
                    <img src={previewImage} alt="Book preview" className="h-full w-full object-contain p-2" />
                  ) : (
                    <p className="text-gray-500">Image preview</p>
                  )}
                </div>
              </div>
            </div>

            {/* Hidden bookPurpose field with default value 'new' */}
            <input type="hidden" name="bookPurpose" value="new" />

            {/* Submit Button */}
            <div className="md:col-span-2 mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#305582] hover:bg-[#3b689f]"
                }`}
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⟳</span> Adding...
                  </>
                ) : (
                  "Add Book"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPost;