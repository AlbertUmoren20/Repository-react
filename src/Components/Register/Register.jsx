import React, { useState } from "react";
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from "react-router-dom";
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {
  bxUser,
  bxLockAlt,
  bxEnvelope,
  bxlGoogle,
  bxlFacebook,
  bxlGithub,
  bxlLinkedin,
} from "boxicons"; // Import icons 


const App = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [clicked, setClicked] = useState(false);
    //  const [fullname, setfullname] = useState('');
    //   const [matricnumber, setmatricnumber] = useState('');
    //   const [password, setpassword] = useState('');
    //   const [email, setemail] = useState ('')
    //   const [level, setlevel] = useState('')
      // const [formData, setFormData,  ]= useState ({
      //   fullname: '',
      //   matricnumber: '',
      //   password: '',
      //   level: '',
      //   email: '',
      // })
      const formik = useFormik({
        initialValues:{
        fullname: '',
        matricnumber: '',
        password: '',
        level: '',
        email: ''
      },
      
    validationSchema: Yup.object ({
      fullname: Yup.string("Must fill up").required("Required"),
      matricnumber: Yup.string().required("Matric is Required").matches(/^[A-Za-z0-9]+$/, "Matric number must be alphanumeric"),
      password: Yup.string().required("Password is Required").min(6, "Password must be less than 6 characters"),
      email: Yup.string().email("Invalid email address").required(" Email is required "),
      level: Yup.string().required("Level is required").oneOf([100,200,300,400], "Invalid level")
    }),
 
    onSubmit: values => {
      console.log("student registered")
      alert(JSON.stringify(values, null, 2));
    },
})

     const navigate = useNavigate();
     const toggleForm = () => {
      console.log("Toggling form. Current state:", isLoginVisible);
      setIsLoginVisible(!isLoginVisible);
    };

 

  const handleRegister = async (values) =>{
    // This is for adding a new student into the database
    try {
      const response = await fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        console.log("New Student Added");
        navigate('/Login');
        alert("New Student Added");
        // Update UI or display success message to user
      } else {
        console.error("Error adding student:", await response.text(), 1500);
        // Handle potential errors during student addition (e.g., display error message to user)
      }
    } catch (error) {
      console.error("Error adding student:", error);
      // Handle unexpected errors (e.g., network issues)
    } finally {
      // Code to be executed regardless of success or failure (e.g., reset form)
    }
  }

 const handleButtonClick = ()=> {
   setClicked(true);
   navigate('/Login');
 }
 
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({...prevFormData, [name]: value }));
  //   switch (name) {
  //     case 'fullName':
  //       setfullname(value);
  //       break;
  //     case 'matricnumber':
  //       setmatricnumber(value);
  //       break;
  //     case 'password':
  //       setpassword(value);
  //       break;
  //     case 'email':
  //       setemail(value);
  //       break;
  //     case 'level':
  //       setlevel(value); // <--- Add this line
  //       break;
  //     default:
  //       break;
    // }
  

  return (
    
    <div className={ `container-register ${isLoginVisible ? "": "active"}`}>
      <div className={`form-box-register ${isLoginVisible ? "login" : "register"}`}>
      {isLoginVisible ? (
        <LoginForm formik = {formik}/>
      ) : (
        <RegisterForm formik= {formik} />
       )}
      </div>

      <div className="toggle-box-register">
        <div className={`toggle-panel-register toggle-left ${!isLoginVisible ? "active" : ""}`}>
          <h1>Hello, Welcome! </h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn" onClick={toggleForm}>
            Register
          </button>
        </div>

        <div className={`toggle-panel-register toggle-right ${isLoginVisible ? "active" : ""}`}>
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={toggleForm}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
const LoginForm = ({formik}) => { 
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Login</h1>

      <div className="input-box-register">
        <input type="text" 
        name="fullname"
        placeholder="Full Name" 
        value={formik.values.fullname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required />
        <i className="bx bxs-user"></i>
        {formik.touched.fullname && formik.errors.fullname ? (
          <div className="error">{formik.errors.fullname}</div>
        ) : null}
      </div>
      
      <div className="input-box-register">
        <input type="password" 
        name="password" 
        placeholder="Password" 
        value={formik.values.password}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
        required />
        <i className="bx bxs-lock-alt"></i>
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>  ) : null}
      </div>

      <div className="input-box-register">
        <input type="email" 
        name="email" 
        placeholder="Email" 
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required />
        <i className="bx bxs-envelope"></i>
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>  ) : null}
      </div>

      <label className="input-box-register" ></label>
      <select 
       className="level-register"
       name="level"
       value={formik.values.level} 
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       required>
       <option value="">Pick Level</option>
       <option value="100">100</option>
       <option value="200">200</option>
       <option value="300">300</option>
       <option value= "400">400</option>
       <i className="bx bxs-lock-alt"></i>
       {formik.touched.level && formik.errors.level ? (
        <div className="error">{formik.errors.level}</div>  ) : null}
      </select>

       
      <div className="forgot-link-register">
        <a href="#">Forgot Password?</a>
      </div>
      
      <button type="submit" className="btn">
        Login
      </button>
      <p>or login with social platforms</p>
      <div className="social-icons-register">
        <a href="#">
          <i className="bx bxl-google"></i>
        </a>
        <a href="#">
          <i className="bx bxl-facebook"></i>
        </a>
        <a href="#">
          <i className="bx bxl-github"></i>
        </a>
        <a href="#">
          <i className="bx bxl-linkedin"></i>
        </a>
      </div>
    </form>
  );
};


const RegisterForm = ({formik}) =>{
  return (
    <form onSubmit= {formik.handleSubmit}>
      <h1>Registration</h1>
      <div className="input-box-register">

        <input type="text" 
        name="fullname"
        placeholder="Full Name" 
        value={formik.values.fullname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required />
        <i className="bx bxs-user"></i>
        {formik.touched.fullname && formik.errors.fullname ? (
          <div className="error">{formik.errors.fullname}</div>
        ) : null}
      </div>
      <div className="input-box-register">
        <input type="email" 
        name="email" 
        placeholder="Email" 
        value={formik.values.email}   
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required />
        <i className="bx bxs-envelope"></i>
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>  ) : null}
      </div>
      <div className="input-box-register">
        <input type="password"
         name="password"
          placeholder="Password" 
          value={formik.values.password}   
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         required />
        <i className="bx bxs-lock-alt"></i>
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>  ) : null}
      </div>

      <div className="input-box-register">
        <input type="matricnumber"
        name="matricnumber"
         placeholder="Matricnumber" 
         value={formik.values.matricnumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         required />
        <i className="bx bxs-user"></i>
        {formik.touched.matricnumber && formik.errors.matricnumber ? (
          <div className="error">{formik.errors.matricnumber}</div>  ) : null}
      </div>
  
      <label className="input-box-register" ></label>
      <select 
       className="level-register"
       name="level"
       value={formik.values.level} 
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       required>
       <option value="">Pick Level</option>
       <option value="100">100</option>
       <option value="200">200</option>
       <option value="300">300</option>
       <option value= "400">400</option>
       <i className="bx bxs-lock-alt"></i>
       {formik.touched.level && formik.errors.level ? (
        <div className="error">{formik.errors.level}</div>  ) : null}
      </select>

      <button type="submit" className="btn">
        Register
      </button>
      <p>or register with social platforms</p>
      <div className="social-icons-register">
        <a href="#"> 
          <i className="bx bxl-google"></i>
        </a>
        <a href="#">
          <i className="bx bxl-facebook"></i>
        </a>
        <a href="#">
          <i className="bx bxl-github"></i>
        </a>
        <a href="#">
          <i className="bx bxl-linkedin"></i>
        </a>
      </div>
    </form>
  );
};


export default App;




