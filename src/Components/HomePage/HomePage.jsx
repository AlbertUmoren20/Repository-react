import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../Assets/TU-LOGO-1.png";
import Register from "../Register/Register";
import students from "../Assets/students.jpg";
import BackButton from "../BackButton/BackButton";

const HomePage = () => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <img 
            src={logo} 
            alt="Trinity University Logo" 
            className="h-16 md:h-20 object-contain"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="py-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Trinity University <span className="text-blue-600">Repository</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                As the education sector grows, so does the need to make learning resources more accessible and secure. This e-repository is your go-to platform for exploring and preserving final year projects.
                <br /><br />
                Think of it as a digital library built by students, for students. Whether you're looking for inspiration, reference materials, or a way to ensure your hard work lasts for future generations, this platform is here to help. Let's build a legacy of knowledge together!
              </p>
              
              <Link 
                to="/Signup" 
                onClick={handleButtonClick}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Register Now
              </Link>
            </div>

            {/* Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform rotate-3 opacity-20"></div>
                <img 
                  src={students} 
                  alt="Knowledge Repository" 
                  className="relative w-full h-auto rounded-xl shadow-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Routes */}
      <Routes>
        <Route exact path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default HomePage;