// import React, { useState, useEffect } from 'react';
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const FeedbackForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', message: '', rating: 0 });
//     const [submitted, setSubmitted] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [reviews, setReviews] = useState([]);
//     const [loadingReviews, setLoadingReviews] = useState(true);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         try {
//             const response = await fetch(`${baseURL}/api/feedback/submitFeedback`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) throw new Error('Failed to submit feedback');

//             setSubmitted(true);
//             setFormData({ name: '', email: '', message: '', rating: 0 });
//             fetchReviews(); // Refresh the reviews after submitting
//         } catch (err) {
//             console.error('Error submitting feedback:', err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const fetchReviews = async () => {
//         setLoadingReviews(true);
//         try {
//             const response = await fetch(`${baseURL}/api/feedback/getAllFeedback`);
//             if (!response.ok) throw new Error('Failed to fetch reviews');
//             const data = await response.json();
//             setReviews(data);
//         } catch (error) {
//             console.error('Error fetching reviews:', error);
//         } finally {
//             setLoadingReviews(false);
//         }
//     };

//     useEffect(() => {
//         fetchReviews();
//     }, []);

//     const StarRating = ({ rating }) => (
//         <div className="flex">
//             {[...Array(5)].map((_, i) => (
//                 <svg
//                     key={i}
//                     className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                 >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//             ))}
//         </div>
//     );

//     const RatingInput = ({ rating, onChange }) => (
//         <div className="flex space-x-1">
//             {[1, 2, 3, 4, 5].map((value) => (
//                 <svg
//                     key={value}
//                     onClick={() => onChange(value)}
//                     className={`w-6 h-6 cursor-pointer ${
//                         value <= rating ? 'text-yellow-400' : 'text-gray-300'
//                     }`}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                 >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//             ))}
//         </div>
//     );

//     return (
//         <div className="justify-items-center pt-20 h-auto pb-20 bg-gray-50">
//             <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg mx-auto">
//                 <div className="flex flex-col md:flex-row">
//                     {/* Left: Customer Reviews */}
//                     <div className="bg-[#365d8d] text-white p-8 flex flex-col md:w-1/2">
//                         <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
//                         <div className="space-y-6 overflow-y-auto max-h-96">
//                             {loadingReviews ? (
//                                 <p className="text-white">Loading reviews...</p>
//                             ) : reviews.length === 0 ? (
//                                 <p className="text-white">No reviews yet.</p>
//                             ) : (
//                                 reviews.map((review, index) => (
//                                     <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg">
//                                         <div className="flex justify-between items-center mb-2">
//                                             <h3 className="font-semibold">{review.name}</h3>
//                                             <StarRating rating={review.rating || 0} />
//                                         </div>
//                                         <p className="text-blue-50 text-sm">
//                                             {review.message || review.comment}
//                                         </p>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>

//                     {/* Right: Feedback Form */}
//                     <div className="p-8 md:w-1/2">
//                         {!submitted ? (
//                             <>
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Feedback</h2>
//                                 <form onSubmit={handleSubmit} className="space-y-4">
//                                     <div>
//                                         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                                             Name
//                                         </label>
//                                         <input
//                                             id="name"
//                                             type="text"
//                                             name="name"
//                                             placeholder="Your full name"
//                                             value={formData.name}
//                                             onChange={handleChange}
//                                             required
//                                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                                             Email
//                                         </label>
//                                         <input
//                                             id="email"
//                                             type="email"
//                                             name="email"
//                                             placeholder="your.email@example.com"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             required
//                                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                                             Your Feedback
//                                         </label>
//                                         <textarea
//                                             id="message"
//                                             name="message"
//                                             placeholder="Please share your thoughts here..."
//                                             value={formData.message}
//                                             onChange={handleChange}
//                                             required
//                                             rows="5"
//                                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                                         <RatingInput
//                                             rating={formData.rating}
//                                             onChange={(value) =>
//                                                 setFormData((prev) => ({ ...prev, rating: value }))
//                                             }
//                                         />
//                                     </div>

//                                     <div className="flex justify-end mt-6">
//                                         <button
//                                             type="submit"
//                                             disabled={isSubmitting}
//                                             className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
//                                         </button>
//                                     </div>
//                                 </form>
//                             </>
//                         ) : (
//                             <div className="flex flex-col items-center justify-center h-full py-8">
//                                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
//                                     <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
//                                 <p className="text-gray-600 text-center mb-6">Your feedback has been successfully submitted.</p>
//                                 <button
//                                     onClick={() => setSubmitted(false)}
//                                     className="text-blue-600 hover:text-blue-800 font-medium"
//                                 >
//                                     Submit another response
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FeedbackForm;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ message: "", rating: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // const userId = localStorage.getItem("userId"); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   const userId = localStorage.getItem("userId"); // Get the userId from localStorage

  //   if (!userId) {
  //     console.error("User is not logged in");
  //     toast.error("Please login to submit feedback.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${baseURL}/api/feedback/submitFeedback`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId,
  //         message: formData.message,
  //         rating: formData.rating,
  //       }),
  //     });

  //     if (!response.ok) throw new Error("Failed to submit feedback");

  //     setSubmitted(true);
  //     setFormData({ name: "", email: "", message: "", rating: 0 });
  //     fetchReviews(); // Refresh the reviews after submitting
  //   } catch (err) {
  //     console.error("Error submitting feedback:", err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      toast.error("⚠️ Please login to submit feedback.");
      return; // Exit early — don't set isSubmitting
    }
  
    setIsSubmitting(true); // Only set this if user is authenticated
  
    try {
      const response = await fetch(`${baseURL}/api/feedback/submitFeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          message: formData.message,
          rating: formData.rating,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to submit feedback");
  
      toast.success("✅ Feedback submitted successfully!");
      setSubmitted(true);
      setFormData({ message: "", rating: 0 });
      fetchReviews(); // Refresh
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("❌ Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await fetch(`${baseURL}/api/feedback/getAllFeedback`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      console.log("Fetched reviews:", data); // Log the data to check its structure

      // Check if 'feedbacks' is an array and set it as reviews
      setReviews(Array.isArray(data.feedbacks) ? data.feedbacks : []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const StarRating = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const RatingInput = ({ rating, onChange }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <svg
          key={value}
          onClick={() => onChange(value)}
          className={`w-6 h-6 cursor-pointer ${
            value <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="justify-items-center pt-20 h-auto pb-20 bg-gray-50">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left: Customer Reviews */}
          <div className="bg-[#365d8d] text-white p-8 flex flex-col md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
            <div className="space-y-6 overflow-y-auto max-h-96">
              {loadingReviews ? (
                <p className="text-white">Loading reviews...</p>
              ) : reviews.length === 0 ? (
                <p className="text-white">No reviews yet.</p>
              ) : (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-10 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">
                        {review.name ? review.name.name : "Anonymous"}
                      </h3>
                      <StarRating rating={review.rating || 0} />
                    </div>
                    <p className="text-blue-50 text-sm">
                      {review.message || review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right: Feedback Form */}
          <div className="p-8 md:w-1/2">
            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Share Your Feedback
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Feedback
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Please share your thoughts here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <RatingInput
                      rating={formData.rating}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, rating: value }))
                      } 
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-500">
                  Thank you for your feedback!
                </h2>
                <p className="text-lg text-gray-700 mt-2">
                  We appreciate your input.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Submit Another Response
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
