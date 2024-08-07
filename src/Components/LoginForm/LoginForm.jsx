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
      const [fullname, setfullname] = useState('');
      const [matricnumber, setmatricnumber] = useState('');
      const [password, setpassword] = useState('');
      const [email, setemail] = useState ('')
      const [level, setlevel] = useState('')


      // const [fullName, setFullName] = useState('');
      // const [matricNumber, setMatricNumber] = useState('');
      // const [password, setPassword] = useState('');
      const [formData, setFormData ]= useState ({
        fullname: '',
        matricnumber: '',
        password: '',
        level: '',
        email: '',
      })

      const navigate = useNavigate()
      
   
      const handleSubmit = async (event) => {
        event.preventDefault();
        const student = {fullname, matricnumber, password, email, level};
      
        // Assuming this is to retrieve all students
        try {
         const response= await fetch("http://localhost:8080/student/login", {
           
            method: "POST",
            body: JSON.stringify(student),
            headers: { "Content-Type": "application/json" }, // Not strictly necessary for GET, but can be included
          });
            if(student.level === 400){
            navigate(`/StudentBody400Level?fullName=${fullname}`);
          }
          else if (response.ok) {
            const students = await response.json();
            alert("Student Retrieved");
            navigate(`/StudentBody?fullName=${fullname}`);
            console.log("Students retrieved:", students);
           
            // Use the retrieved students data here (e.g., display in UI)
          } else {
            alert("Error Retrieving Student")
            console.error("Error retrieving students:", await response.text());
           
            // Handle potential errors during student retrieval
          }
        } catch (error) {
          alert("Error Retrieving Student")
          console.error("Error retrieving students:", error);
          
          // Handle unexpected errors (e.g., network issues)
        }
      
        // Code to handle form data storage or other actions (optional)
        // ...
      };
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value }));
        switch (name) {
          case 'fullName':
            setfullname(value);
            break;
          case 'matricnumber':
            setmatricnumber(value);
            break;
          case 'password':
            setpassword(value);
            break;
          case 'email':
            setemail(value);
            break;
          case 'level':
            setlevel(value); // <--- Add this line
            break;
          default:
            break;
        }
      };
         // Implement your login logic here
      //    console.log('Full Name:', fullName);
      //    console.log('Matric Number:', matricNumber);
      //    console.log('Password:', password);
      //  };
   
      //  const [clicked, setClicked] = useState(false);

       
     
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

<div className="LoginHome-Page" style={{
   position:"relative",

}}> 
  <div className="HomeHeader">
  <span>TRINITY UNIVERSITY E-REPOSITORY</span> <br/> LOG IN
   </div>
   <div className="HomeLogoLGN">
   <img src={logo} style={{
   
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
    type="fullname"
    id="fullName"
    name="fullName"
    value={fullname}
    onChange={(e) => setfullname(e.target.value)}
    required
    style={{ backgroundColor: 'white'}}
  />

  <label htmlFor="email" className="login-form-label">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    value={email}
    onChange={handleChange}
    required
    style={{ backgroundColor: 'white' }}
  />
  <label htmlFor="password" className="login-form-label">Password</label>
  <input
    type="password"
    id="password"
    name="password"
    value={password}
    onChange={handleChange}
    required
    style={{ backgroundColor: 'white',  }}
  />
  <label htmlFor="matricnumber" className="login-form-label">MatricNumber</label>
  <input
    type="matricnumber"
    id="matricnumber"
    name="matricnumber"
    value={matricnumber}
    onChange={handleChange}
    required
    style={{ backgroundColor: 'white',  }}
  />

  <label htmlFor="level" className="login-form-label" >Level</label>
      <select 
       name="level" 
       className="my-select-class"
       value={level} 
       onChange={(e) => setlevel(e.target.value)}
       required  
       style={{ backgroundColor: 'white' }} >
       <option value="">Pick Level</option>
       <option value="100">100</option>
       <option value="200">200</option>
       <option value="300">300</option>
       <option value= "400">400</option>
      </select>

  <button type="submit-btn" className = "SubmitLGN">Submit</button>

</form>
</div>
  </div>
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
