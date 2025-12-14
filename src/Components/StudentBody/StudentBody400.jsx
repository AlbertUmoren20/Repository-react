import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../Assets/Ellipse 2.png";
import BackButton from "../BackButton/BackButton";

const StudentBody400 = () => {
    const location = useLocation();
    const fullName = new URLSearchParams(location.search).get("fullName");
    const navigate = useNavigate();
  
    const [clicked, setClicked] = useState(false);
    const handleButtOnClick = ()=>{
         setClicked(true);
         navigate("/400Fbmas");
  }
    const handleButtonOnClick1 = ()=>{
         setClicked(true);
         navigate("/400Famss");
  }
    const handleButtonOnClick2 = ()=>{
         setClicked(true);
         navigate("/400Nursing");
  }

      return (
  
          <div>
          <BackButton />
          <div className="HomeHeader-Studentbody">
    Welcome, <br/> 
    <span style={{fontSize:"60px", textDecoration: "underline #83D0FC 10px"}}> - {fullName} -</span>
     </div>
  
     <div className="HomeLogo400">
     <img src={logo}     
        alt="">
      </img>
          </div>
  
          <div className='faculty'>
          <h1>Which Faculty?</h1>
  
          <div className='faculty-container'>
            <button class='faculty-button' onClick={handleButtOnClick}>
              <h2>FBMAS</h2>
              <p>Faculty of Basic Medical <br/> and Applied Sciences</p>
        </button>
           <button class='faculty-button-1' onClick={handleButtonOnClick1}>
              <h2>FAMSS</h2>
              <p>Faculty of Art Management <br/> and Social Sciences</p>
        </button>
        <button class='faculty-button-2' onClick={handleButtonOnClick2}>
          <h2>*****</h2>
        <p>Faculty of Nursing  </p>
         </button>
        </div>
        </div>
        </div>
      );
}

export default StudentBody400
