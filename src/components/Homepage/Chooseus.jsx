
//--- updated---
// import React from 'react';
// import Rentbooks from '../../Images/Rentabooks.png';
// import rewards from '../../Images/Rewards.png';
// import bookexg from '../../Images/BookExchange.png';
// import diverse from '../../Images/Diverse.png';
// // import "../../css/Homepage/Chooseus.css";

// const Chooseus = () => {
//   return (
//     <div className='bg-[#eef1f9]'>
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h1 className="italic font-serif text-4xl font-bold">Why choose us?</h1>
//       </div>
//       <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-8">
//         <div className="card bg-white rounded-lg shadow-md text-center p-5 transition-all duration-300 hover:translate-y-[-10px] hover:shadow-lg">
//           <div className="icon-container mb-4 flex justify-center">
//             <img src={bookexg} alt="Book Exchange" className="w-[150px] h-[150px] object-contain" />
//           </div>
//           <h3 className="text-[20px] mb-2 font-serif text-[#333333]">Book Exchange</h3>
//           <p className="text-[14px] italic font-serif text-[#666666] leading-relaxed">Trade your old books effortlessly with other users in the community.</p>
//         </div>

//         <div className="card bg-white rounded-lg shadow-md text-center p-5 transition-all duration-300 hover:translate-y-[-10px] hover:shadow-lg">
//           <div className="icon-container mb-4 flex justify-center">
//             <img src={Rentbooks} alt="Affordable Rentals" className="w-[150px] h-[150px] object-contain" />
//           </div>
//           <h3 className="text-[20px] mb-2 font-serif text-[#333333]">Affordable Rentals</h3>
//           <p className="text-[14px] italic font-serif text-[#666666] leading-relaxed">Save money by renting books instead of buying them.</p>
//         </div>

//         <div className="card bg-white rounded-lg shadow-md text-center p-5 transition-all duration-300 hover:translate-y-[-10px] hover:shadow-lg">
//           <div className="icon-container mb-4 flex justify-center">
//             <img src={diverse} alt="Diverse Genres" className="w-[150px] h-[150px] object-contain" />
//           </div>
//           <h3 className="text-[20px] mb-2 font-serif text-[#333333]">Diverse Genres</h3>
//           <p className="text-[14px] font-serif italic text-[#666666] leading-relaxed">Explore thousands of books across a variety of genres and topics.</p>
//         </div>

//         <div className="card bg-white rounded-lg shadow-md text-center p-5 transition-all duration-300 hover:translate-y-[-10px] hover:shadow-lg">
//           <div className="icon-container mb-4 flex justify-center">
//             <img src={rewards} alt="Rewards System" className="w-[150px] h-[150px] object-contain" />
//           </div>
//           <h3 className="text-[20px] mb-2 font-serif text-[#333333]">Rewards System</h3>
//           <p className="text-[14px] font-serif italic text-[#666666] leading-relaxed">Earn points for every transaction and redeem them for exciting perks.</p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Chooseus;


import React from 'react';
import Rentbooks from '../../Images/Rentabooks.png';
import bookexg from '../../Images/BookExchange.png';
import diverse from '../../Images/Diverse.png';

const Chooseus = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-6">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif relative inline-block pb-3">
            Why Choose Us?
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
            Experience the best way to discover, exchange, and enjoy books with our community-driven platform.
          </p>
        </div>

        {/* Enhanced feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Book Exchange Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center p-4">
              <img 
                src={bookexg} 
                alt="Book Exchange" 
                className="h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 font-serif mb-3">Book Exchange</h3>
              <p className="text-gray-600 leading-relaxed">
                Trade your old books effortlessly with other users in our growing community. Find new treasures while sharing your favorites.
              </p>
            </div>
          </div>

          {/* Affordable Rentals Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center p-4">
              <img 
                src={Rentbooks} 
                alt="Affordable Rentals" 
                className="h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 font-serif mb-3">Affordable Rentals</h3>
              <p className="text-gray-600 leading-relaxed">
                Save money by renting books instead of buying them. Enjoy more titles while spending less on your reading habit.
              </p>
            </div>
          </div>

          {/* Diverse Genres Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center p-4">
              <img 
                src={diverse} 
                alt="Diverse Genres" 
                className="h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 font-serif mb-3">Diverse Genres</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore thousands of books across a variety of genres and topics. From classics to contemporary, find exactly what you're looking for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chooseus;