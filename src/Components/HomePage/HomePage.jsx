import React, { useState } from "react";
// import React from 'react'
import logo from "../Assets/Trinity.png"
import logo1 from "../Assets/icons8-head-50 1.png"
import logo2 from "../Assets/icons8-curved-arrow-downward-32 2.jpg"
import logo3 from "../Assets/icons8-folder-24 2.png"
import logo4 from "../Assets/icons8-curved-arrow-downward-32 3.png"
import logo5 from "../Assets/icons8-book-50 2.png"
import logo6 from "../Assets/icons8-curved-arrow-downward-32 4.jpg"
import logo7 from "../Assets/icons8-setting-24 1.jpg"
import logo8 from "../Assets/icons8-curved-arrow-downward-32 1.png"
import logo9 from "../Assets/icons8-document-48 2.png"
import logo10 from "../Assets/Rectangle 30 (1).png"
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Register from "../Register/Register"
import LoginForm from "../LoginForm/LoginForm";
import SignUp from "../SignUp/SignUp";
import bodyimage from "../Assets/eB0MfDXYTWFrQ7m1N.png"


const HomePage = () => {
    const [clicked, setClicked] = useState(false);
    const handleButtonClick = ()=>{
        setClicked(true);
    }

  return (
    <div className="HomePage" >

    <div className="parent-element">
    <div className="HomeLogo">
    <img src={logo}  
       alt="">
</img>
</div>
        <div className="HomeHeader-home">
        
       
             <h1>Trinity University<br/> Repository!!!!!</h1>
             <p>
             As the education sector grows, so does the need to make learning resources more accessible and secure. This e-repository is your go-to platform for exploring and preserving final year projects.
             
             Think of it as a digital library built by students, for students. Whether you're looking for inspiration, reference materials, or a way to ensure your hard work lasts for future generations, this platform is here to help. Let's build a legacy of knowledge together!</p>

             <Link to="/Register" className="SignUp-button" onClick={handleButtonClick}>Register</Link>
        <Routes>
        <Route exact path="/Register" element={<Register/>} />
        </Routes>
    </div>

    </div>


        
         
</div>  

  )
}

export default HomePage
