import React, { useState } from "react";
// import React from 'react'
import logo from "../Assets/Ellipse 2.png"
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
import LoginForm from "../LoginForm/LoginForm";
import SignUp from "../SignUp/SignUp";


const HomePage = () => {
    const [clicked, setClicked] = useState(false);
    const handleButtonClick = ()=>{
        setClicked(true);
    }

  return (
    <div className="HomePage" style={{
        position:"relative"
    }}> 
        <div className="HomeHeader">
             WELCOME <br/>TO<br/>TRINITY UNIVERSITY <br/>E-REPOSITORY SITE
    </div>

        <div className="HomeLogo">
             <img src={logo} style={
                {   width: "100px",
                    height: "100px",
                    position: "absolute",
                    top:"0px",
                    left:"0px",
                    padding:"10px"       
                }} 
                alt="">
        </img>
        </div>

    <div className="HomeBody">
     
        <div className="BodyHead">
            <img src={logo1} style= {{
                     width: "100px",
                    position:"relative",
                     margin:"auto",
                     marginTop: "40px",
                     padding: "10px",
                     left:"575px",
                    }} alt="">
             </img>
             </div> 

        <div className="Arrow1">
        <img src={logo2} style={{
                width: "60px",
                position:"absolute",
                left: "685px",
                bottom: "230px"
               
        }} alt=""></img>   
        </div>

        <div className="FolderHeader">
            <img src={logo3} style={{
                width: "40px",
                position:"absolute",
                left: "720px",
                bottom: "210px"

            }} alt=""></img>
        </div>

        <div className="Arrow2">
        <img src={logo4} style={{
            width: "60px",
            position:"absolute",
            left: "670px",
            bottom: "160px"
        }} alt=""></img>
        </div>

        <div className="BookHeader">
        <img src={logo5} style={{
            width: "40px",
            position:"absolute",
            left: "720px",
         }} alt=""></img>
        </div>

        <div className="Arrow3">
        <img src={logo6} style={{
            width: "60px",
            position:"absolute",
            left: "540px",
            bottom: "219px"
        }} alt=""></img>
        </div>

        <div className="SettingHeader">
        <img src={logo7} style={{
            width: "40px",
            position:"absolute",
            left: "510px",
            bottom: "250px"
        }} alt=""></img>
        </div>

        <div className="Arrow4">
        <img src={logo8} style={{
            width: "60px",
            position:"absolute",
            left: "560px",
            bottom: "130px"
        }} alt=""></img>
        </div>

        <div className="FileHeader">
        <img src={logo9} style={{
            width: "40px",
            position:"absolute",
            left: "520px",
        }} alt="">
        </img>
        </div>

     
         </div>

        
         <div className="Home-Button" style={{
            display:"flex",
            justifyContent: "space-evenly",
             padding:"40px"
        }}>
        <Link to="/Login" className="LogIn-button" onClick={handleButtonClick}>Log In</Link>
        <Routes>
        <Route exact path="/Login" element={<LoginForm/>} />
        </Routes>
       
        <Link to="/SignUp" className="SignUp-button" onClick={handleButtonClick}>Sign Up</Link>
        <Routes>
        <Route exact path="/SignUp" element={<SignUp/>} />
        </Routes>
</div>
</div>  

  )
}

export default HomePage
