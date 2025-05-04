import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Book, Users, Bookmark } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Modern Hero Section with Custom Gradient - Updated Colors */}
      <div className="bg-gradient-to-r from-[#2C5282] to-[#3b67a3] py-24 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">BookSwap Community</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Connecting readers and sharing stories through our community-driven book exchange platform.
          </p>
          <div className="mx-auto max-w-2xl relative">
            <img
              className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
              src="/api/placeholder/800/400"
              alt="People exchanging books"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-gray-800 font-medium">Over 5,000 books exchanged this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section with Timeline Dots */}
      <div className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="h-px bg-gray-200 flex-grow"></div>
            <h2 className="text-3xl font-bold text-center text-gray-900 px-6">Our Story</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>
          
          <div className="space-y-8">
            <div className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="rounded-full h-8 w-8 bg-[#2C5282] flex items-center justify-center text-white font-bold">1</div>
                <div className="h-full w-0.5 bg-blue-200"></div>
              </div>
              <div className="prose prose-lg text-gray-700 pt-1">
                <p>
                  <span className="text-[#2C5282] font-semibold">Founded in 2020</span>, BookSwap began with a simple idea: to create a community where book lovers could exchange their favorite reads and discover new stories.
                  What started as a small neighborhood book club has grown into a thriving online community.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="rounded-full h-8 w-8 bg-[#2C5282] flex items-center justify-center text-white font-bold">2</div>
                <div className="h-full w-0.5 bg-blue-200"></div>
              </div>
              <div className="prose prose-lg text-gray-700 pt-1">
                <p>
                  Through <span className="text-[#2C5282] font-semibold">dedication to literacy and sustainability</span>, we've built a platform that gives books second lives and connects readers across the country.
                  We believe every book deserves a new reader, and every reader deserves access to great books.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="rounded-full h-8 w-8 bg-[#2C5282] flex items-center justify-center text-white font-bold">3</div>
              </div>
              <div className="prose prose-lg text-gray-700 pt-1">
                <p>
                  Today, we're <span className="text-[#2C5282] font-semibold">focused on building reading communities</span> that span neighborhoods, cities, and even states. Our platform continues to evolve with features that make book exchanges simple, secure, and enjoyable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section - Modern Cards with Icons */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Literacy",
                icon: "📚",
                description: "We believe in making reading accessible to everyone and fostering a lifelong love of books in our community."
              },
              {
                title: "Sustainability",
                icon: "🌱",
                description: "By giving books new homes, we reduce waste and promote environmentally friendly reading habits."
              },
              {
                title: "Community",
                icon: "🤝",
                description: "We build connections between readers, creating a supportive network of book lovers who share recommendations and discussions."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-transform duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How BookSwap Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Book className="h-10 w-10 text-[#2C5282]" />,
                title: "List Your Books",
                description: "Add books you're willing to share to your virtual bookshelf with a few simple steps."
              },
              {
                icon: <Users className="h-10 w-10 text-[#2C5282]" />,
                title: "Connect with Readers",
                description: "Browse available books and connect with members in your area or arrange shipping."
              },
              {
                icon: <Bookmark className="h-10 w-10 text-[#2C5282]" />,
                title: "Exchange & Enjoy",
                description: "Swap books safely using our platform and discover your next favorite read."
              }
            ].map((step, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section - Modern Overlapping Cards */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Meet Our Book Enthusiasts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emma Wilson",
                role: "Founder & Book Curator",
                bio: "A lifelong reader with a passion for connecting people through literature.",
                image: "/api/placeholder/300/300"
              },
              {
                name: "Daniel Park",
                role: "Community Manager",
                bio: "Daniel organizes our book clubs and ensures our community thrives.",
                image: "/api/placeholder/300/300"
              },
              {
                name: "Sophia Chen",
                role: "Genre Specialist",
                bio: "With expertise in everything from sci-fi to classics, Sophia helps perfect our recommendations.",
                image: "/api/placeholder/300/300"
              }
            ].map((person, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#3b67a3] rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <div className="relative bg-white p-6 rounded-lg shadow-md">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-36 h-36 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-50"
                    />
                    <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                    <p className="text-[#2C5282] font-medium mb-4">{person.role}</p>
                    <p className="text-gray-600">{person.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Contact CTA with Card */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Exchanging?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Have questions about how BookSwap works or want to join our community? We're here to help you get started on your book exchange journey.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#2C5282] mr-2" />
                <span className="text-gray-700">hello@bookswap.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-5 w-5 text-[#2C5282] mr-2" />
                <span className="text-gray-700">(555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-5 w-5 text-[#2C5282] mr-2" />
                <span className="text-gray-700">Join readers nationwide</span>
              </div>
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center bg-[#2C5282] text-white font-medium px-8 py-4 rounded-lg hover:bg-[#3b67a3] transition-colors group"
            >
              Join BookSwap 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;