import React, { useState } from "react";
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from "react-router-dom";

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
     const [fullname, setfullname] = useState('');
      const [matricnumber, setmatricnumber] = useState('');
      const [password, setpassword] = useState('');
      const [email, setemail] = useState ('')
      const [level, setlevel] = useState('')
      const [formData, setFormData ]= useState ({
        fullname: '',
        matricnumber: '',
        password: '',
        level: '',
        email: '',
      })
     const navigate = useNavigate();
     const toggleForm = () => {
      console.log("Toggling form. Current state:", isLoginVisible);
      setIsLoginVisible(!isLoginVisible);
    };

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
        if(student.level === "400"){
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

  return (
    
    <div className={ `container-register ${isLoginVisible ? "": "active"}`}>
      <div className={`form-box-register ${isLoginVisible ? "login" : "register"}`}>
      {isLoginVisible ? (
        <LoginForm
          handleSubmit={handleSubmit}
          fullname={fullname}
          setfullname={setfullname}
          password={password}
          handleChange={handleChange}
          email={email}
          level={level}
          setlevel={setlevel}
        />
      ) : (
        <RegisterForm handleSubmit={handleSubmit} />
       )}
      </div>

      <div className="toggle-box-register">
        <div className={`toggle-panel-register toggle-left ${!isLoginVisible ? "active" : ""}`}>
          <h1 >Hello, Welcome! </h1>
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
};

const LoginForm = (
 {
  handleChange,
  handleSubmit,
  fullname,
  password,
  email,
  level,
  setlevel,
  setfullname
 }
) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="input-box-register">
        <input type="text" placeholder="Full Name" value={fullname}
        onChange={(e) => setfullname(e.target.value)}
        required />
        <i className="bx bxs-user"></i>
      </div>
      
      <div className="input-box-register">
        <input type="password" name="password" placeholder="Password" 
        value={password}
       onChange={handleChange}
        required />
        <i className="bx bxs-lock-alt"></i>
      </div>

      <div className="input-box-register">
        <input type="email" name="email" placeholder="Email" 
        value={email}
        onChange={handleChange}
        required />
        <i className="bx bxs-lock-alt"></i>
      </div>

      <label className="input-box-register" ></label>
      <select 
       className="level-register"
       value={level} 
       onChange={(e) => setlevel(e.target.value)}
       required>
       <option value="">Pick Level</option>
       <option value="100">100</option>
       <option value="200">200</option>
       <option value="300">300</option>
       <option value= "400">400</option>
       <i className="bx bxs-lock-alt"></i>
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

const RegisterForm = ({
 handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Registration</h1>
      <div className="input-box-register">
        <input type="text" placeholder="Username" required />
        <i className="bx bxs-user"></i>
      </div>
      <div className="input-box-register">
        <input type="email" placeholder="Email" required />
        <i className="bx bxs-envelope"></i>
      </div>
      <div className="input-box-register">
        <input type="password" placeholder="Password" required />
        <i className="bx bxs-lock-alt"></i>
      </div>
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




