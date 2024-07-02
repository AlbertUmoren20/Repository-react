import { useEffect, useRef, useState } from "react";
import React  from "react";
import logo from "../Assets/Ellipse 2.png"
import { FaUser } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  
   const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
   //A user regex, that going to be used to validate name with
   //It must start with a lower/upperCase letter, and then followed by 3 to 23 characters that can be lower or upper case letters. digits hyphens  or underscores
   const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
   //A password regex to validate the password
   //requires at least one lowercase, uppercase, one digit and one special character

   // const [fullName, setFullName] = useState('');
   // const [matricNumber, setMatricNumber] = useState('');
   // const [password, setPassword] = useState('');

   // const handleSubmit = (event) => {
   //    event.preventDefault();
   //    // Implement your login logic here
   //    console.log('Full Name:', fullName);
   //    console.log('Matric Number:', matricNumber);
   //    console.log('Password:', password);
   //  };

   //  const [clicked, setClicked] = useState(false);
   //  const handleButtonClick = ()=>{
   //      setClicked(true);
   //  }

   // const userRef = useRef(); // This is for the user reference, which will allow us to focus on the user input when it loads
   // const errRef = useRef(); //error ref, so if there's an error we will need to put a focus on that and then making it announced by a screen reader

   // const [user, setUser] = useState("");
   // const [validName, setValidName] = useState(false); //If the name validates or not
   // const [userFocus, setUserFocus] = useState(false); //if we have focus on the user input field or not

   // const[pwd, setPwd] = useState("")
   // const [validPwd, setValidPwd] = useState(false);
   // const [pwdFocus, setPwdFocus] = useState (false);

   // const [matchPwd, setMatchPwd] = useState("") // this is for the match password side
   // const [validMatch, setValidMatch] = useState (false);
   // const [matchFocus, setMatchFocus] = useState(false);

   // const [errMsg, setErrMsg] = useState("");
   // const [success, setSuccess] =useState(false);

   // useEffect (()=>{
   //    useRef.current.focus();
   // }, []) // A focus on the username input

   // useEffect (()=>{
   //    const result = USER_REGEX.test(user); //testing the user state against the Regex
   //    console.log(result);
   //    console.log(user);
   //    setValidName (result)
   // }, [user]) //So anytime it changes it will check the validation of that field

   // useEffect (()=>{
   //    const result = PWD_REGEX.test(user); //testing the user state against the Regex
      // console.log(result);
      // console.log(pwd);
      // setValidPwd (result)
      // const match = pwd === matchPwd; //conparing password with the match password state
   //    setValidMatch(match);
   // }, [pwd, matchPwd]) 

   // useEffect (() =>{
   //    setErrMsg('');
   // }, [pwd, user, matchPwd])// Anytime a user changes one of the state of these 3
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
   // //              ...prev,
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

//     const formsubmit = (event) => {
//        event.preventDefault()
//        if (formstate.Remember === true){
//         localStorage.setItem('detailsremember', JSON.stringify({username : formstate.username , password : formstate.password}))
//        }
//        window.location.reload()
//     }

const [fullname, setFullname] = useState('');
const [matricnumber, setMatricnumber] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState ('');
const [level, setLevel] = useState ('');
const [currentLevel, setCurrentLevel] = useState('')
const [courseStudy, setCourseStudy] = useState('')
const [formData, setFormData] = useState ({
  fullname: '',
  matricnumber: '',
  password: '',
  level: '',
  email: ''
})

const navigate = useNavigate()

const handleSubmit = async (event) => {
  event.preventDefault();
  const student = { fullname, matricnumber, password, email, level};

  // This is for adding a new student into the database
  try {
    const response = await fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (response.ok) {
      console.log("New Student Added");
      navigate('/Login');
      // Update UI or display success message to user
    } else {
      console.error("Error adding student:", await response.text());
      // Handle potential errors during student addition (e.g., display error message to user)
    }
  } catch (error) {
    console.error("Error adding student:", error);
    // Handle unexpected errors (e.g., network issues)
  } finally {
    // Code to be executed regardless of success or failure (e.g., reset form)
  }
};


const [clicked, setClicked] = useState(false);
const handleButtonClick = ()=>{
  setClicked(true);
  navigate('/Login');

}

const handleChange = (event)=>{
  setFormData = ({...formData, [event.target.name]: event.target.value})
}

  return (



//     <div style={{
//         display: "flex",
//         justifyContent:"center",
//         marginTop: "100px"
//      }}>

//      <div className="HomeLogo">
//      <img src={logo} style={
//         {   width: "100px",
//             height: "100px",
//             position: "absolute",
//             top:"0px",
//             left:"0px",
//             padding:"10px"       
//         }} 
//         alt="">
// </img>
// </div>
// <div className="container">
// <form >
//      <h1>Sign Up</h1> 
     
//     <div className ="input-box">
//     <div className="position">
//     <input type="text" name="username" placeholder="Username" defaultValue={formstate.username} required/>
//     <FaUser className="icon"/>
//     </div>
//     </div>

//    <div className="input-box">
//    <div className="position">
//    <input type="password" name="password" placeholder="Password" defaultValue={formstate.password} required/>
//    <MdLockOutline className="icon"/>
//        </div>
//     </div>

//     <div className="remember-forgot">
//         <label>
//             <input type="checkbox" name="Remember"/> Remember Me</label>
//        <a href= "#" > Forgot password?</a> 
//     </div>

//     <button type="submit">Login</button>

//     <div className="register-link">
//     <p>Don't have an acount? <a href="#"> Register</a></p>
//     </div>
// </form>
// </div>
// </div></div>
// <div className="SignUpHome-Page" style={{
//    position:"relative"
// }}> 
//   <div className="HomeHeader">
//   TRINITY UNIVERSITY APPRASAIL SITE <br/> LOG IN
//    </div>
// //    <div className="HomeLogo">
// //    <img src={logo} style={
// //       {   width: "100px",
//           height: "100px",
//           position: "absolute",
//           top:"0px",
//           left:"0px",
//           padding:"10px"       
//       }} 
//       alt="">
// </img>
// </div>

// <div className="Rectangle">
// <div className="input-box">

// <div className="login-form-container">

// <form onSubmit={handleSubmit}>
//   <label htmlFor="fullName" className="login-form-label">Full Name</label>
//   <input
//     type="text"
//     id="fullName"
//     name="fullName"
//     value={fullName}
//     onChange={(e) => setFullName(e.target.value)}
//     required
//     style={{ backgroundColor: 'white' }}
//   />
//   <label htmlFor="matricNumber" className="login-form-label">Matrix Number</label>
//   <input
//     type="text"
//     id="matricNumber"
//     name="matricNumber"
//     value={matricNumber}
//     onChange={(e) => setMatricNumber(e.target.value)}
//     required
//     style={{ backgroundColor: 'white' }}
//   />
//   <label htmlFor="password" className="login-form-label">Password</label>
//   <input
//     type="password"
//     id="password"
//     name="password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     required
//     style={{ backgroundColor: 'white' }}
//   />

// </form>
// </div>

//   </div>

//   </div>
//   <div className="Body-text">
//   <p>Don't have an account?<br/> Click <span style={{ color: "red"}}>Sign Up</span></p>
//   </div>
//   </div>

<div className="LoginHome-Page" style={{
  position:"relative",

}}> 
 <div className="HomeHeader">
 TRINITY UNIVERSITY E-REPOSITORY <br/> SIGN UP
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

<div className="wrapper">

<form onSubmit={handleSubmit}>
  <label htmlFor="fullName"></label>

  <input
    type="text"
    // id="fullName"
    className="smallBox"
    name="fullName"
    placeholder="Input Full Name"
    value={fullname}
    onChange={(e) => setFullname(e.target.value)}
    required
  />

  <input
    type="text"
    // id="fullName"
    className="smallBox4"
    name="matricNumber"
    placeholder="Matric Number"
    value={matricnumber}
    onChange={(e) => setMatricnumber(e.target.value)}
    required
  />

  <input
  type="text"
  // id="fullName"
  className="smallBox5"
  name="password"
  placeholder="Create Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

<input
type="text"
// id="fullName"
className="smallBox6"
name="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
type="text"
// id="fullName"
className="smallBox6"
name="level"
placeholder="Level"
value={level}
onChange={(e) => setLevel(e.target.value)}
required
/>


<button type="submit" style={{display:"flex",   margin: "0",
position: "absolute",
top: "380px",
left:"46%",
fontSize:"20px",
cursor:"pointer",
transform: "translateY(-50%)"}}>Submit</button>

</form>
</div>
<div className="LogText">
<h1>
Already have an account?
Click <span style={{ color: "red" }} className="Login-button1" onClick={handleButtonClick}>Log In</span>
</h1>
</div>
</div>
  );
  

}

export default SignUp

