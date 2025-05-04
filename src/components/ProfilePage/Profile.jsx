import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [userPosts, setUserPosts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch profile data
  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/user`, {
        withCredentials: true,
      });
      setProfile(data);
      setFormData(data.user);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user posts
  const fetchUserPosts = useCallback(async () => {
    try {
      setPostsLoading(true);
      const { data } = await axios.get(`${baseURL}/api/post/userposts`, {
        withCredentials: true,
      });
      const sortedPosts = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUserPosts(sortedPosts);
      // setUserPosts(data); // Data is directly the array of posts
    } catch (err) {
      console.error(
        "Error fetching posts:",
        err.response || err.message || err
      );
    } finally {
      setPostsLoading(false);
    }
  }, []);

  // Load profile on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Load posts when tab changes
  useEffect(() => {
    if (activeTab === "posts") {
      fetchUserPosts();
    }
  }, [activeTab, fetchUserPosts]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Toggle edit mode
  const handleEditToggle = () => setIsEditing((prev) => !prev);

  // Submit profile updates
  const handleEditSubmit = async () => {
    try {
      const { data } = await axios.put(
        `${baseURL}/api/user/profileupdate`,
        formData,
        { withCredentials: true }
      );
      setProfile((prev) => ({ ...prev, user: data.user }));
      setIsEditing(false);
      showNotification("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      showNotification("Failed to update profile.", "error");
    }
  };

  // Show notifications
  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition duration-500 z-50 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add("opacity-0");
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };


  // Handle delete post
const handleDeletePost = async (postId) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    try {
      // Send DELETE request to backend API
      const response = await axios.delete(`${baseURL}/api/deletebook/${postId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        // If successful, update UI by removing the deleted post from state
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
        showNotification("Post deleted successfully!");
      } else {
        showNotification(response.data.message, "error");
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
      showNotification("Failed to delete post.", "error");
    }
  }
};


  // Avatar style
  const initials = profile?.user?.name?.charAt(0).toUpperCase() || "U";
  const avatarGradient = [
    "bg-gradient-to-r from-blue-400 to-indigo-500",
    "bg-gradient-to-r from-pink-400 to-purple-500",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-green-400 to-teal-500",
  ][initials.charCodeAt(0) % 4];

  // Info item component
  const InfoItem = ({ label, value }) => (
    <div className="space-y-1">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-base font-semibold text-gray-800">
        {value || "Not provided"}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
      </div>
    );
  }

  if (!profile?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="text-4xl text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800">Profile Not Found</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const { name, email, phone, address } = formData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
          <div className="flex flex-col md:flex-row items-center gap-4 -mt-14 px-6 pb-4">
            <div
              className={`${avatarGradient} w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-3xl font-bold text-white shadow`}
            >
              {initials}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow">
          <div className="border-b flex space-x-4 px-6">
            {["details", "posts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 text-sm font-medium ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "details" ? "My Details" : "Added Posts"}
              </button>
            ))}
          </div>

          {/* My Details */}
          {activeTab === "details" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Personal Info
                </h3>
                {!isEditing && (
                  <button
                    onClick={handleEditToggle}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["name", "email", "phone", "address"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field}
                      </label>
                      <input
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2 flex justify-end gap-4">
                    <button
                      onClick={handleEditToggle}
                      className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                  <InfoItem label="Full Name" value={name} />
                  <InfoItem label="Phone" value={phone} />
                  <InfoItem label="Email" value={email} />
                  <InfoItem label="Address" value={address} />
                </div>
              )}
            </div>
          )}

          {/* User Posts */}
          {activeTab === "posts" && (
            <div className="p-6 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                Your Book Collection
              </h3>

              {postsLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-2"></div>
                    <p className="text-gray-500">Loading your books...</p>
                  </div>
                </div>
              ) : userPosts.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center shadow">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                  <p className="text-gray-600 text-lg mb-2">
                    No books in your collection yet
                  </p>
                  <p className="text-gray-500 mb-4">
                    Start sharing books with the community
                  </p>
                  <Link to={"/post"}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Add Your First Book
                  </button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPosts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative">
                        <div className="aspect-[8/9] w-full">
                          <img
                            src={post.bookImage || "/path/to/default/image.jpg"}
                            alt={post.title}
                            className="w-full h-full object-contain bg-gray-100"
                          />
                        </div>
                        <div className="absolute top-0 right-0 m-2">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                            {post.bookPurpose}
                          </span>
                        </div>
                        {post.price && (
                          <div className="absolute bottom-0 right-0 m-2">
                            <span className="inline-block bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-sm">
                              Rs: {post.price}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 space-y-3">
                        <h4 className="text-xl font-semibold text-gray-800 line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {post.description}
                        </p>

                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>{post.author}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            {post.genre}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            {post.condition}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-gray-100 mt-3 flex justify-between items-center">
                          <div className="flex items-center space-x-1 text-gray-500 text-xs">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                            </svg>
                            <span>{post.location}</span>
                          </div>

                          <div className="flex items-center space-x-1 text-gray-500 text-xs">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Link to={`/viewpage/${post._id}`} className="w-1/2">
                            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md">
                              View Details
                            </button>
                          </Link>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="w-1/2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!postsLoading && userPosts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Link to={"/post"} className="block w-full">
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      Add Another Book
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [postsLoading, setPostsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState("details");
//   const [userPosts, setUserPosts] = useState([]);
//   const [qrCodeFile, setQrCodeFile] = useState(null);
//   const [qrCodePreview, setQrCodePreview] = useState(null);
//   const [uploadingQR, setUploadingQR] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     qrCodeUrl: "",
//   });

//   // Fetch profile data
//   const fetchProfile = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`${baseURL}/api/user`, {
//         withCredentials: true,
//       });
//       setProfile(data);
//       setFormData({
//         ...data.user,
//         qrCodeUrl: data.user.qrCodeUrl || "",
//       });
//       if (data.user.qrCodeUrl) {
//         setQrCodePreview(data.user.qrCodeUrl);
//       }
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch user posts
//   const fetchUserPosts = useCallback(async () => {
//     try {
//       setPostsLoading(true);
//       const { data } = await axios.get(`${baseURL}/api/post/userposts`, {
//         withCredentials: true,
//       });
//       setUserPosts(data); // Data is directly the array of posts
//     } catch (err) {
//       console.error(
//         "Error fetching posts:",
//         err.response || err.message || err
//       );
//     } finally {
//       setPostsLoading(false);
//     }
//   }, []);

//   // Load profile on mount
//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   // Load posts when tab changes
//   useEffect(() => {
//     if (activeTab === "posts") {
//       fetchUserPosts();
//     }
//   }, [activeTab, fetchUserPosts]);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Handle QR code file change
//   const handleQrCodeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setQrCodeFile(file);
//       const previewUrl = URL.createObjectURL(file);
//       setQrCodePreview(previewUrl);
//     }
//   };

//   // Upload QR code
//   const handleQrCodeUpload = async () => {
//     if (!qrCodeFile) return;

//     try {
//       setUploadingQR(true);
//       const formData = new FormData();
//       formData.append("qrCode", qrCodeFile);

//       const { data } = await axios.post(
//         `${baseURL}/api/user/uploadqr`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setFormData(prev => ({
//         ...prev,
//         qrCodeUrl: data.qrCodeUrl
//       }));

//       setProfile(prev => ({
//         ...prev,
//         user: {
//           ...prev.user,
//           qrCodeUrl: data.qrCodeUrl
//         }
//       }));

//       showNotification("QR Code uploaded successfully!");
//     } catch (err) {
//       console.error("QR Code upload failed:", err);
//       showNotification("Failed to upload QR Code.", "error");
//     } finally {
//       setUploadingQR(false);
//     }
//   };

//   // Toggle edit mode
//   const handleEditToggle = () => setIsEditing((prev) => !prev);

//   // Submit profile updates
//   const handleEditSubmit = async () => {
//     try {
//       const { data } = await axios.put(
//         `${baseURL}/api/user/profileupdate`,
//         formData,
//         { withCredentials: true }
//       );
//       setProfile((prev) => ({ ...prev, user: data.user }));
//       setIsEditing(false);
//       showNotification("Profile updated successfully!");
//     } catch (err) {
//       console.error("Profile update failed:", err);
//       showNotification("Failed to update profile.", "error");
//     }
//   };

//   // Show notifications
//   const showNotification = (message, type = "success") => {
//     const notification = document.createElement("div");
//     notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition duration-500 z-50 ${
//       type === "success" ? "bg-green-500" : "bg-red-500"
//     } text-white`;
//     notification.textContent = message;
//     document.body.appendChild(notification);
//     setTimeout(() => {
//       notification.classList.add("opacity-0");
//       setTimeout(() => notification.remove(), 500);
//     }, 3000);
//   };

//   // Avatar style
//   const initials = profile?.user?.name?.charAt(0).toUpperCase() || "U";
//   const avatarGradient = [
//     "bg-gradient-to-r from-blue-400 to-indigo-500",
//     "bg-gradient-to-r from-pink-400 to-purple-500",
//     "bg-gradient-to-r from-yellow-400 to-orange-500",
//     "bg-gradient-to-r from-green-400 to-teal-500",
//   ][initials.charCodeAt(0) % 4];

//   // Info item component
//   const InfoItem = ({ label, value }) => (
//     <div className="space-y-1">
//       <p className="text-sm text-gray-500 font-medium">{label}</p>
//       <p className="text-base font-semibold text-gray-800">
//         {value || "Not provided"}
//       </p>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
//       </div>
//     );
//   }

//   if (!profile?.user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow text-center">
//           <div className="text-4xl text-red-500 mb-4">⚠️</div>
//           <h2 className="text-xl font-bold text-gray-800">Profile Not Found</h2>
//           <p className="text-gray-600">Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   const { name, email, phone, address, qrCodeUrl } = formData;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
//       <div className="max-w-5xl mx-auto px-4 py-6">
//         {/* Profile Card */}
//         <div className="bg-white rounded-xl shadow mb-8">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
//           <div className="flex flex-col md:flex-row items-center gap-4 -mt-14 px-6 pb-4">
//             <div
//               className={`${avatarGradient} w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-3xl font-bold text-white shadow`}
//             >
//               {initials}
//             </div>
//             <div className="text-center md:text-left">
//               <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
//               <p className="text-gray-600">{email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-xl shadow">
//           <div className="border-b flex space-x-4 px-6">
//             {["details", "posts"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-4 px-4 text-sm font-medium ${
//                   activeTab === tab
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 {tab === "details" ? "My Details" : "Added Posts"}
//               </button>
//             ))}
//           </div>

//           {/* My Details */}
//           {activeTab === "details" && (
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Personal Info
//                 </h3>
//                 {!isEditing && (
//                   <button
//                     onClick={handleEditToggle}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                   >
//                     Edit Profile
//                   </button>
//                 )}
//               </div>
//               {isEditing ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {["name", "email", "phone", "address"].map((field) => (
//                     <div key={field}>
//                       <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
//                         {field}
//                       </label>
//                       <input
//                         name={field}
//                         value={formData[field]}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2"
//                       />
//                     </div>
//                   ))}
//                   <div className="md:col-span-2 flex justify-end gap-4">
//                     <button
//                       onClick={handleEditToggle}
//                       className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleEditSubmit}
//                       className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//                   <InfoItem label="Full Name" value={name} />
//                   <InfoItem label="Phone" value={phone} />
//                   <InfoItem label="Email" value={email} />
//                   <InfoItem label="Address" value={address} />
//                 </div>
//               )}

//               {/* QR Code Section */}
//               <div className="mt-10">
//                 <h3 className="text-xl font-bold text-gray-800 mb-6">
//                   Payment QR Code
//                 </h3>
//                 <div className="bg-gray-50 p-6 rounded-lg">
//                   <div className="flex flex-col md:flex-row gap-8 items-center">
//                     {/* QR Code Preview */}
//                     <div className="w-full md:w-1/3">
//                       {qrCodePreview ? (
//                         <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                           <img
//                             src={qrCodePreview}
//                             alt="Payment QR Code"
//                             className="w-full aspect-square object-contain"
//                           />
//                           {!uploadingQR && qrCodeFile && (
//                             <div className="absolute bottom-2 right-2">
//                               <button
//                                 onClick={handleQrCodeUpload}
//                                 className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow-sm"
//                               >
//                                 Save QR
//                               </button>
//                             </div>
//                           )}
//                           {uploadingQR && (
//                             <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
//                               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2"></div>
//                             </div>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
//                           <div className="text-center text-gray-500">
//                             <svg
//                               className="mx-auto h-12 w-12 text-gray-400"
//                               stroke="currentColor"
//                               fill="none"
//                               viewBox="0 0 48 48"
//                               aria-hidden="true"
//                             >
//                               <path
//                                 d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                             <p className="mt-2">No QR code uploaded</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Upload Area */}
//                     <div className="w-full md:w-2/3">
//                       <div className="bg-white p-6 rounded-lg border border-gray-200">
//                         <h4 className="font-semibold text-gray-700 mb-3">
//                           Upload Your Payment QR Code
//                         </h4>
//                         <p className="text-gray-600 text-sm mb-4">
//                           Upload your payment QR code to let customers pay you directly when buying your books. Supported formats: JPG, PNG, SVG.
//                         </p>
//                         <div className="space-y-4">
//                           <label className="block w-full cursor-pointer">
//                             <div className="bg-blue-50 border border-blue-100 hover:bg-blue-100 text-blue-700 text-center py-4 px-6 rounded-lg transition duration-300">
//                               <svg
//                                 className="mx-auto h-6 w-6 mb-2"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                                 ></path>
//                               </svg>
//                               <span className="text-sm font-medium">
//                                 Select QR Code Image
//                               </span>
//                             </div>
//                             <input
//                               type="file"
//                               className="hidden"
//                               accept="image/*"
//                               onChange={handleQrCodeChange}
//                             />
//                           </label>
//                           {qrCodeFile && (
//                             <div className="text-sm text-gray-600">
//                               <span className="font-medium">Selected: </span>
//                               {qrCodeFile.name}
//                             </div>
//                           )}
//                           {qrCodeFile && !qrCodeUrl && (
//                             <button
//                               onClick={handleQrCodeUpload}
//                               disabled={uploadingQR}
//                               className={`w-full py-2 rounded-lg font-medium ${
//                                 uploadingQR
//                                   ? "bg-gray-300 text-gray-500"
//                                   : "bg-green-600 hover:bg-green-700 text-white"
//                               }`}
//                             >
//                               {uploadingQR ? "Uploading..." : "Upload QR Code"}
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* User Posts */}
//           {activeTab === "posts" && (
//             <div className="p-6 bg-gray-50">
//               <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
//                 Your Book Collection
//               </h3>

//               {postsLoading ? (
//                 <div className="flex justify-center items-center h-40">
//                   <div className="animate-pulse flex flex-col items-center">
//                     <div className="h-12 w-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-2"></div>
//                     <p className="text-gray-500">Loading your books...</p>
//                   </div>
//                 </div>
//               ) : userPosts.length === 0 ? (
//                 <div className="bg-white rounded-xl p-8 text-center shadow">
//                   <svg
//                     className="w-16 h-16 mx-auto text-gray-400 mb-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     ></path>
//                   </svg>
//                   <p className="text-gray-600 text-lg mb-2">
//                     No books in your collection yet
//                   </p>
//                   <p className="text-gray-500 mb-4">
//                     Start sharing books with the community
//                   </p>
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                     Add Your First Book
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {userPosts.map((post) => (
//                     <div
//                       key={post._id}
//                       className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1"
//                     >
//                       <div className="relative">
//                         <div className="aspect-[8/9] w-full">
//                           <img
//                             src={post.bookImage || "/path/to/default/image.jpg"}
//                             alt={post.title}
//                             className="w-full h-full object-contain bg-gray-100"
//                           />
//                         </div>
//                         <div className="absolute top-0 right-0 m-2">
//                           <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
//                             {post.bookPurpose}
//                           </span>
//                         </div>
//                         {post.price && (
//                           <div className="absolute bottom-0 right-0 m-2">
//                             <span className="inline-block bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-sm">
//                               Rs: {post.price}
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="p-5 space-y-3">
//                         <h4 className="text-xl font-semibold text-gray-800 line-clamp-1">
//                           {post.title}
//                         </h4>
//                         <p className="text-sm text-gray-600 line-clamp-2">
//                           {post.description}
//                         </p>

//                         <div className="flex items-center space-x-2 text-gray-500 text-sm">
//                           <svg
//                             className="w-4 h-4"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                               clipRule="evenodd"
//                             ></path>
//                           </svg>
//                           <span>{post.author}</span>
//                         </div>

//                         <div className="flex flex-wrap gap-2 mt-2">
//                           <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
//                             {post.genre}
//                           </span>
//                           <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
//                             {post.condition}
//                           </span>
//                         </div>

//                         <div className="pt-3 border-t border-gray-100 mt-3 flex justify-between items-center">
//                           <div className="flex items-center space-x-1 text-gray-500 text-xs">
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                               ></path>
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                               ></path>
//                             </svg>
//                             <span>{post.location}</span>
//                           </div>

//                           <div className="flex items-center space-x-1 text-gray-500 text-xs">
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                               ></path>
//                             </svg>
//                             <span>
//                               {new Date(post.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>

//                         <Link to={`/viewpage/${post._id}`} className="block w-full">
//                           <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md hover:shadow-lg">
//                             <span>View Details</span>
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {!postsLoading && userPosts.length > 0 && (
//                 <div className="mt-8 flex justify-center">
//                   <Link to={"/post"} className="block w-full">
//                     <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition flex items-center justify-center">
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                         ></path>
//                       </svg>
//                       Add Another Book
//                     </button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [postsLoading, setPostsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState("details");
//   const [userPosts, setUserPosts] = useState([]);
//   const [qrCodeFile, setQrCodeFile] = useState(null);
//   const [qrCodePreview, setQrCodePreview] = useState(null);
//   const [uploadingQR, setUploadingQR] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     qrCodeUrl: "",
//   });

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await axios.get(`${baseURL}/api/user`, {
//           withCredentials: true,
//         });
//         setProfile(data);
//         setFormData({
//           ...data.user,
//           qrCodeUrl: data.user.qrCodeUrl || "",
//         });
//         if (data.user.qrCodeUrl) {
//           setQrCodePreview(data.user.qrCodeUrl);
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Fetch user posts when tab changes
//   useEffect(() => {
//     if (activeTab === "posts") {
//       const fetchUserPosts = async () => {
//         try {
//           setPostsLoading(true);
//           const { data } = await axios.get(`${baseURL}/api/post/userposts`, {
//             withCredentials: true,
//           });
//           const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           setUserPosts(sortedPosts);
//           // setUserPosts(data);
//         } catch (err) {
//           console.error("Error fetching posts:", err);
//         } finally {
//           setPostsLoading(false);
//         }
//       };

//       fetchUserPosts();
//     }
//   }, [activeTab]);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Handle QR code file change
//   const handleQrCodeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setQrCodeFile(file);
//       setQrCodePreview(URL.createObjectURL(file));
//     }
//   };

//   // Upload QR code
//   const handleQrCodeUpload = async () => {
//     if (!qrCodeFile) return;

//     try {
//       setUploadingQR(true);
//       const formData = new FormData();
//       formData.append("qrCode", qrCodeFile);

//       const { data } = await axios.post(
//         `${baseURL}/api/user/uploadqr`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setFormData(prev => ({ ...prev, qrCodeUrl: data.qrCodeUrl }));
//       setProfile(prev => ({
//         ...prev,
//         user: { ...prev.user, qrCodeUrl: data.qrCodeUrl }
//       }));

//       showNotification("QR Code uploaded successfully!");
//     } catch (err) {
//       console.error("QR Code upload failed:", err);
//       showNotification("Failed to upload QR Code.", "error");
//     } finally {
//       setUploadingQR(false);
//     }
//   };

//   // Submit profile updates
//   const handleEditSubmit = async () => {
//     try {
//       const { data } = await axios.put(
//         `${baseURL}/api/user/profileupdate`,
//         formData,
//         { withCredentials: true }
//       );
//       setProfile((prev) => ({ ...prev, user: data.user }));
//       setIsEditing(false);
//       showNotification("Profile updated successfully!");
//     } catch (err) {
//       console.error("Profile update failed:", err);
//       showNotification("Failed to update profile.", "error");
//     }
//   };

//   // Show notifications
//   const showNotification = (message, type = "success") => {
//     const notification = document.createElement("div");
//     notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition duration-500 z-50 ${
//       type === "success" ? "bg-green-500" : "bg-red-500"
//     } text-white`;
//     notification.textContent = message;
//     document.body.appendChild(notification);
//     setTimeout(() => {
//       notification.classList.add("opacity-0");
//       setTimeout(() => notification.remove(), 500);
//     }, 3000);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (!profile?.user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow text-center">
//           <div className="text-4xl text-red-500 mb-4">⚠️</div>
//           <h2 className="text-xl font-bold text-gray-800">Profile Not Found</h2>
//           <p className="text-gray-600">Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   // Avatar style
//   const initials = profile.user.name?.charAt(0).toUpperCase() || "U";

//   const { name, email, phone, address } = formData;

//   // Info item component
//   const InfoItem = ({ label, value }) => (
//     <div className="space-y-1">
//       <p className="text-sm text-gray-500 font-medium">{label}</p>
//       <p className="text-base font-semibold text-gray-800">
//         {value || "Not provided"}
//       </p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
//       <div className="max-w-5xl mx-auto px-4 py-6">
//         {/* Profile Card */}
//         <div className="bg-white rounded-xl shadow mb-8">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
//           <div className="flex flex-col md:flex-row items-center gap-4 -mt-14 px-6 pb-4">
//             <div
//               className={`bg-slate-500 w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-3xl font-bold text-white shadow`}
//             >
//               {initials}
//             </div>
//             <div className="text-center md:text-left">
//               <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
//               <p className="text-gray-600">{email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-xl shadow">
//           <div className="border-b flex space-x-4 px-6">
//             {["details", "posts"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-4 px-4 text-sm font-medium ${
//                   activeTab === tab
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 {tab === "details" ? "My Details" : "Added Posts"}
//               </button>
//             ))}
//           </div>

//           {/* My Details */}
//           {activeTab === "details" && (
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Personal Info
//                 </h3>
//                 {!isEditing && (
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                   >
//                     Edit Profile
//                   </button>
//                 )}
//               </div>
//               {isEditing ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {["name", "email", "phone", "address"].map((field) => (
//                     <div key={field}>
//                       <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
//                         {field}
//                       </label>
//                       <input
//                         name={field}
//                         value={formData[field]}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2"
//                       />
//                     </div>
//                   ))}
//                   <div className="md:col-span-2 flex justify-end gap-4">
//                     <button
//                       onClick={() => setIsEditing(false)}
//                       className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleEditSubmit}
//                       className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//                   <InfoItem label="Full Name" value={name} />
//                   <InfoItem label="Phone" value={phone} />
//                   <InfoItem label="Email" value={email} />
//                   <InfoItem label="Address" value={address} />
//                 </div>
//               )}

//               {/* QR Code Section */}
//               <div className="mt-10">
//                 <h3 className="text-xl font-bold text-gray-800 mb-6">
//                   Payment QR Code
//                 </h3>
//                 <div className="bg-gray-50 p-6 rounded-lg">
//                   <div className="flex flex-col md:flex-row gap-8 items-center">
//                     {/* QR Code Preview */}
//                     <div className="w-full md:w-1/3">
//                       {qrCodePreview ? (
//                         <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                           <img
//                             src={qrCodePreview}
//                             alt="Payment QR Code"
//                             className="w-full aspect-square object-contain"
//                           />
//                           {!uploadingQR && qrCodeFile && (
//                             <div className="absolute bottom-2 right-2">
//                               <button
//                                 onClick={handleQrCodeUpload}
//                                 className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow-sm"
//                               >
//                                 Save QR
//                               </button>
//                             </div>
//                           )}
//                           {uploadingQR && (
//                             <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
//                               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2"></div>
//                             </div>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
//                           <div className="text-center text-gray-500">
//                             <svg
//                               className="mx-auto h-12 w-12 text-gray-400"
//                               stroke="currentColor"
//                               fill="none"
//                               viewBox="0 0 48 48"
//                               aria-hidden="true"
//                             >
//                               <path
//                                 d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                             <p className="mt-2">No QR code uploaded</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Upload Area */}
//                     <div className="w-full md:w-2/3">
//                       <div className="bg-white p-6 rounded-lg border border-gray-200">
//                         <h4 className="font-semibold text-gray-700 mb-3">
//                           Upload Your Payment QR Code
//                         </h4>
//                         <p className="text-gray-600 text-sm mb-4">
//                           Upload your payment QR code to let customers pay you directly when buying your books. Supported formats: JPG, PNG, SVG.
//                         </p>
//                         <div className="space-y-4">
//                           <label className="block w-full cursor-pointer">
//                             <div className="bg-blue-50 border border-blue-100 hover:bg-blue-100 text-blue-700 text-center py-4 px-6 rounded-lg transition duration-300">
//                               <svg
//                                 className="mx-auto h-6 w-6 mb-2"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                                 ></path>
//                               </svg>
//                               <span className="text-sm font-medium">
//                                 Select QR Code Image
//                               </span>
//                             </div>
//                             <input
//                               type="file"
//                               className="hidden"
//                               accept="image/*"
//                               onChange={handleQrCodeChange}
//                             />
//                           </label>
//                           {qrCodeFile && (
//                             <div className="text-sm text-gray-600">
//                               <span className="font-medium">Selected: </span>
//                               {qrCodeFile.name}
//                             </div>
//                           )}
//                           {qrCodeFile && !formData.qrCodeUrl && (
//                             <button
//                               onClick={handleQrCodeUpload}
//                               disabled={uploadingQR}
//                               className={`w-full py-2 rounded-lg font-medium ${
//                                 uploadingQR
//                                   ? "bg-gray-300 text-gray-500"
//                                   : "bg-green-600 hover:bg-green-700 text-white"
//                               }`}
//                             >
//                               {uploadingQR ? "Uploading..." : "Upload QR Code"}
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* User Posts */}
//           {activeTab === "posts" && (
//             <div className="p-6 bg-gray-50">
//               <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
//                 Your Book Collection
//               </h3>

//               {postsLoading ? (
//                 <div className="flex justify-center items-center h-40">
//                   <div className="animate-pulse flex flex-col items-center">
//                     <div className="h-12 w-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-2"></div>
//                     <p className="text-gray-500">Loading your books...</p>
//                   </div>
//                 </div>
//               ) : userPosts.length === 0 ? (
//                 <div className="bg-white rounded-xl p-8 text-center shadow">
//                   <svg
//                     className="w-16 h-16 mx-auto text-gray-400 mb-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     ></path>
//                   </svg>
//                   <p className="text-gray-600 text-lg mb-2">
//                     No books in your collection yet
//                   </p>
//                   <p className="text-gray-500 mb-4">
//                     Start sharing books with the community
//                   </p>
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                     Add Your First Book
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {userPosts.map((post) => (
//                     <div
//                       key={post._id}
//                       className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1"
//                     >
//                       <div className="relative">
//                         <div className="aspect-[8/9] w-full">
//                           <img
//                             src={post.bookImage || "/path/to/default/image.jpg"}
//                             alt={post.title}
//                             className="w-full h-full object-contain bg-gray-100"
//                           />
//                         </div>
//                         <div className="absolute top-0 right-0 m-2">
//                           <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
//                             {post.bookPurpose}
//                           </span>
//                         </div>
//                         {post.price && (
//                           <div className="absolute bottom-0 right-0 m-2">
//                             <span className="inline-block bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-sm">
//                               Rs: {post.price}
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="p-5 space-y-3">
//                         <h4 className="text-xl font-semibold text-gray-800 line-clamp-1">
//                           {post.title}
//                         </h4>
//                         <p className="text-sm text-gray-600 line-clamp-2">
//                           {post.description}
//                         </p>

//                         <div className="flex items-center space-x-2 text-gray-500 text-sm">
//                           <svg
//                             className="w-4 h-4"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                               clipRule="evenodd"
//                             ></path>
//                           </svg>
//                           <span>{post.author}</span>
//                         </div>

//                         <div className="flex flex-wrap gap-2 mt-2">
//                           <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
//                             {post.genre}
//                           </span>
//                           <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
//                             {post.condition}
//                           </span>
//                         </div>

//                         <div className="pt-3 border-t border-gray-100 mt-3 flex justify-between items-center">
//                           <div className="flex items-center space-x-1 text-gray-500 text-xs">
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                               ></path>
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                               ></path>
//                             </svg>
//                             <span>{post.location}</span>
//                           </div>

//                           <div className="flex items-center space-x-1 text-gray-500 text-xs">
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                               ></path>
//                             </svg>
//                             <span>
//                               {new Date(post.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>

//                         <Link to={`/viewpage/${post._id}`} className="block w-full">
//                           <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium group shadow-md hover:shadow-lg">
//                             <span>View Details</span>
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {!postsLoading && userPosts.length > 0 && (
//                 <div className="mt-8 flex justify-center">
//                   <Link to={"/post"} className="block w-full">
//                     <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition flex items-center justify-center">
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                         ></path>
//                       </svg>
//                       Add Another Book
//                     </button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
