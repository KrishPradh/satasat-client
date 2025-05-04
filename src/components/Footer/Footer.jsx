import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
              About Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Welcome to Sata Sat, your one-stop platform for book exchanges, rentals, and purchases. 
              Connecting readers across the world!
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" 
                   className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">›</span>
                  <span className="ml-2">About</span>
                </a>
              </li>
              <li>
                <a href="/contact" 
                   className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">›</span>
                  <span className="ml-2">Contact</span>
                </a>
              </li>
              <li>
                <a href="/terms" 
                   className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">›</span>
                  <span className="ml-2">Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="/privacy" 
                   className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">›</span>
                  <span className="ml-2">Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                satasat@gmail.com
              </p>
              <p className="text-gray-300 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                98000000
              </p>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
              Follow Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <div className="flex flex-col space-y-2">
              <a href="https://facebook.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
                Facebook
              </a>
              <a href="https://twitter.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
                Twitter
              </a>
              <a href="https://instagram.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"/>
                  <rect strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x="3" y="3" width="18" height="18" rx="5"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Sata Sat. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;