import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import logo from "../Assets/Ellipse 2.png"
import { Link } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

      const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
      //A user regex, that going to be used to validate name with
      //It must start with a lower/upperCase letter, and then followed by 3 to 23 characters that can be lower or upper case letters. digits hyphens  or underscores
      const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
      //A password regex to validate the password
      //requires at least one lowercase, uppercase, one digit and one special character
   
      const [fullName, setFullName] = useState('');
      const [matricNumber, setMatricNumber] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate()
   
      const handleSubmit = (event) => {
         event.preventDefault();
         // Implement your login logic here
         console.log('Full Name:', fullName);
         console.log('Matric Number:', matricNumber);
         console.log('Password:', password);
       };
   
       const [clicked, setClicked] = useState(false);
       const handleButtonClick = ()=>{
           setClicked(true);
           navigate('/SignUp')

       }
   //  const details = JSON.parse(localStorage.getItem('detailsremember'))

    //Local Storage in Javascript, Tenary in Javascript
    // , Array and object destruction, setting of object in react


    //state
   //  const [formstate , setformstate] = React.useState({
   //       username : details ? details.username :  '' ,
   //       password : details ? details.password : '' ,
   //       Remember : false
   //      })

   // const [count, setcount] = useState(0);
   // function handleClick(){
   //    setcount (count + 1)
   // }
   // return (
   //    <button onClick={handleClick}>Click (count) 4 times
   //    </button>

   // )
   
  

   //Event Handlers
   //   console.log(formstate)
   //  const formchange = (event) => {
   //     const {name, value, type} = event.target

   //     if (type === 'checkbox'){
          
   //         setformstate(prev => {
   //           return{
   //              ...prev,
   //              Remember : event.target.checked
   //           }
   //         })
   //     }
   //     else{
   //     setformstate(prev => {
   //       return{
   //          ...prev,
   //          [name] : value
   //       }
   //     })
   //  }
   //  }

   //  const formsubmit = (event) => {
   //     event.preventDefault()
   //     if (formstate.Remember === true){
   //      localStorage.setItem('detailsremember', JSON.stringify({username : formstate.username , password : formstate.password}))
   //     }
   //     window.location.reload()
   //  }

    return (
//       <div style={{
//          display: "flex",
//          justifyContent:"center",
//          marginTop: "100px"
//       }}>

//       <div className="HomeLogo">
//       <img src={logo} style={
//          {   width: "100px",
//              height: "100px",
//              position: "absolute",
//              top:"0px",
//              left:"0px",
//              padding:"10px"       
//          }} 
//          alt="">
//  </img>
//  </div>
//         <div className="container">
//          <form onChange={formchange} onSubmit={formsubmit}>
//               <h1>Log In</h1> 
              
//              <div className ="input-box">
//              <div className="position">
//              <input type="text" name="username" placeholder="Username" defaultValue={formstate.username} required/>
//              <FaUser className="icon"/>
//              </div>
//              </div>

//             <div className="input-box">
//             <div className="position">
//             <input type="password" name="password" placeholder="Password" defaultValue={formstate.password} required/>
//             <MdLockOutline className="icon"/>
//                 </div>
//              </div>

//              <div className="remember-forgot">
//                  <label>
//                      <input type="checkbox" name="Remember"/> Remember Me</label>
//                 <a href= "#" > Forgot password?</a> 
//              </div>

//              <button type="submit">Login</button>

//              <div className="register-link">
//              <p>Don't have an acount?<a href="#"> Register</a></p>
//              </div>
//         </form>
//     </div>
//     </div>
<div className="SignUpHome-Page" style={{
   position:"relative",

}}> 
  <div className="HomeHeader">
  TRINITY UNIVERSITY APPRASAIL SITE <br/> LOG IN
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

<div className="Rectangle">
<div className="input-box">

<div className="login-form-container">

<form onSubmit={handleSubmit}>
  <label htmlFor="fullName" className="login-form-label">Full Name</label>
  <input
    type="text"
    id="fullName"
    name="fullName"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    required
    style={{ backgroundColor: 'white' }}
  />
  <label htmlFor="matricNumber" className="login-form-label">Matric Number</label>
  <input
    type="text"
    id="matricNumber"
    name="matricNumber"
    value={matricNumber}
    onChange={(e) => setMatricNumber(e.target.value)}
    required
    style={{ backgroundColor: 'white' }}
  />
  <label htmlFor="password" className="login-form-label">Password</label>
  <input
    type="password"
    id="password"
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    style={{ backgroundColor: 'white' }}
  />

</form>
</div>

  </div>

  </div>
  <div className="Body-text">
  <h1>
          Don't have an account?<br/>
          Click <span style={{ color: "red" }} className="SignUp-button1" onClick={handleButtonClick}>Sign Up</span>
        </h1>
        <button type="submit">Submit</button>
  </div>

   </div>

  );
  

}

   


export default LoginForm;

// import { useState } from "react";
// function Square ({value, onSquareClick}){
 
//   return (
//   <button className = "square" 
//   onClick = {onSquareClick}>
//     {value}
//     </button> 
//   )
// }

// export default function Board() {
//   const [squares, setSquares] = useState(Array(9).fill(null)); 
//   // creates an array with nine elements and sets each of them to null
//   function handleClick(i) {
//     const nextSquares = squares.slice();
//     nextSquares[i] = "X";
//     setSquares(nextSquares)
//   }
//   return (
//     <> 
//     <div className = "board-row"> 
//     <Square value = {squares[0]} onSquareClick={ ()=> handleClick (0)}/>
//     <Square value = {squares[1]} onSquareClick={ ()=> handleClick (1)} />
//     <Square value = {squares[2]} onSquareClick={ ()=> handleClick (2)}/>
//     </div>
//     <div className = "board-row">
//     <Square value = {squares[3]} onSquareClick={ ()=> handleClick (3)} />
//     <Square value = {squares[4]} onSquareClick={ ()=> handleClick (4)} />
//     <Square value = {squares[5]} onSquareClick={ ()=> handleClick (5)} />
//     </div>
//     <div className = "board-row">
//     <Square value = {squares[6]} onSquareClick={ ()=> handleClick (6)}/>
//     <Square value = {squares[7]} onSquareClick={ ()=> handleClick (7)} />
//     <Square value = {squares[8]} onSquareClick={ ()=> handleClick (8)} />
//     </div>
//     </>
//   );
// }
