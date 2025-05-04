// import React, { useEffect, useState } from 'react';
// import books from '../../Images/book.png';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const HeroSection = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/user`, {
//           withCredentials: true, // Ensure cookies are sent
//         });
//         if (response.data.success) {
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleSignupClick = () => {
//     navigate('/Signup');
//   };

//   return (
//     <div className="font-sans bg-gray-100 pt-1">
//       <section className="text-gray-500 py-12 bg-blue-100 h-[650px]">
//         <div className="flex flex-wrap items-center max-w-6xl h-[550px] mx-32 gap-15">
//           {/* Hero Text Section */}
//           <div className="flex-1 max-w-[50%] pr-10">
//             <h1 className="text-[55px] font-extrabold font-serif italic text-gray-800 mb-0">
//               Welcome To
//             </h1>
//             <h2 className="text-[45px] font-bold font-serif italic text-gray-800 mb-4 mt-1">
//               SATA SAT
//             </h2>
//             <p className="text-[18px] italic font-serif text-gray-700 mb-6 leading-relaxed">
//               We bring book lovers together to buy, sell, exchange, and rent books
//               effortlessly. Whether you're looking to declutter your shelf, discover a rare gem, 
//               or save money on your next read, we've got you covered.
//             </p>
//             {!isLoggedIn && (
//               <div className="flex space-x-4">
//                 <button
//                   className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-sans italic px-5 py-3 rounded-md shadow-lg text-lg font-bold hover:from-blue-600 hover:to-blue-900 transition-all"
//                   onClick={handleSignupClick}
//                 >
//                   Sign Up For Free
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Hero Image Section */}
//           <div className="max-w-[50%]">
//             <img src={books} alt="hero" className="w-98 h-58 ml-16" />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroSection;


// // import books from '../../Images/book.png';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const HeroSection = () => {
// //   const navigate = useNavigate();
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const response = await axios.get('${baseURL}/api/user', {
// //           withCredentials: true,
// //         });
// //         if (response.data.success) {
// //           setIsLoggedIn(true);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching user:', error);
// //       }
// //     };

// //     fetchUser();
// //   }, []);

// //   const handleSignupClick = () => {
// //     navigate('/Signup');
// //   };

// //   return (
// //     <div className="font-sans mt-">
// //       {/* Added pt-20 to fix navbar overlap */}
// //       <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen flex items-center pt-20">
// //         {/* Decorative elements */}
// //         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
// //           <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200 opacity-30 blur-xl"></div>
// //           <div className="absolute bottom-20 right-40 w-80 h-80 rounded-full bg-indigo-300 opacity-20 blur-xl"></div>
// //           <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-purple-200 opacity-20 blur-lg"></div>
// //         </div>

// //         {/* Content container */}
// //         <div className="container mx-auto px-6 lg:px-12 py-16 z-10 relative">
// //           <div className="flex flex-col lg:flex-row items-center gap-12">
            
// //             {/* Text section - enhanced with better typography and animation */}
// //             <div className="lg:w-1/2 space-y-6">
// //               <div className="space-y-1">
// //                 <h1 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-600 font-serif">
// //                   Welcome To
// //                 </h1>
// //                 <h2 className="text-4xl lg:text-5xl font-bold text-indigo-900 font-serif mt-2">
// //                   SATA SAT
// //                 </h2>
// //               </div>
              
// //               <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              
// //               <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
// //                 We bring book lovers together to buy, sell, exchange, and rent books
// //                 effortlessly. Whether you're looking to declutter your shelf, discover a rare gem, 
// //                 or save money on your next read, we've got you covered.
// //               </p>
              
// //               {!isLoggedIn && (
// //                 <div className="pt-4">
// //                   <button
// //                     onClick={handleSignupClick}
// //                     className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center group"
// //                   >
// //                     <span>Sign Up For Free</span>
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
// //                     </svg>
// //                   </button>
// //                 </div>
// //               )}
              
// //               {/* Feature badges */}
// //               <div className="flex flex-wrap gap-3 pt-4">
// //                 <span className="px-4 py-2 bg-white bg-opacity-80 rounded-full text-sm font-medium text-indigo-700 shadow-sm">Buy Books</span>
// //                 <span className="px-4 py-2 bg-white bg-opacity-80 rounded-full text-sm font-medium text-indigo-700 shadow-sm">Sell Books</span>
// //                 <span className="px-4 py-2 bg-white bg-opacity-80 rounded-full text-sm font-medium text-indigo-700 shadow-sm">Exchange</span>
// //                 <span className="px-4 py-2 bg-white bg-opacity-80 rounded-full text-sm font-medium text-indigo-700 shadow-sm">Rent</span>
// //               </div>
// //             </div>
            
// //             {/* Image section - enhanced with card effect and shadow */}
// //             <div className="lg:w-1/2 relative">
// //               <div className="absolute -top-4 -left-4 w-full h-full bg-indigo-200 rounded-2xl transform rotate-3"></div>
// //               <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-200 rounded-2xl transform -rotate-3"></div>
// //               <div className="relative bg-white p-6 rounded-2xl shadow-xl">
// //                 <img 
// //                   src={books} 
// //                   alt="Books collection" 
// //                   className="w-full h-auto object-cover rounded-lg"
// //                 />
// //                 <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-lg">
// //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
// //                   </svg>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default HeroSection;
import React, { useEffect, useState } from 'react';
import books from '../../Images/book.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const HeroSection = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/user`, {
          withCredentials: true, // Ensure cookies are sent
        });
        if (response.data.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSignupClick = () => {
    navigate('/Signup');
  };

  return (
    <div className="font-sans bg-gray-100 pt-1">
      <section className="text-gray-500 py-6 md:py-12 bg-blue-100 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-[650px]">
        <div className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:max-w-6xl lg:mx-auto h-full gap-6 md:gap-8 lg:gap-12">
          {/* Hero Text Section */}
          <div className="w-full md:max-w-[50%] md:pr-4 lg:pr-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-extrabold font-serif italic text-gray-800 mb-0">
              Welcome To
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold font-serif italic text-gray-800 mb-2 sm:mb-3 md:mb-4 mt-1">
              SATA SAT
            </h2>
            <p className="text-base md:text-lg lg:text-[18px] italic font-serif text-gray-700 mb-4 md:mb-6 leading-relaxed">
              We bring book lovers together to buy, sell, exchange, and rent books
              effortlessly. Whether you're looking to declutter your shelf, discover a rare gem, 
              or save money on your next read, we've got you covered.
            </p>
            {!isLoggedIn && (
              <div className="flex justify-center md:justify-start space-x-4">
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-sans italic px-4 sm:px-5 py-2 sm:py-3 rounded-md shadow-lg text-base sm:text-lg font-bold hover:from-blue-600 hover:to-blue-900 transition-all"
                  onClick={handleSignupClick}
                >
                  Sign Up For Free
                </button>
              </div>
            )}
          </div>

          {/* Hero Image Section */}
          <div className="w-full md:max-w-[50%] mt-6 md:mt-0 flex justify-center">
            <img src={books} alt="hero" className="w-4/5 max-w-md md:w-full lg:w-98 lg:h-58 md:ml-0 lg:ml-16" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
