import React, { useState } from "react";
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

  const toggleForm = () => {
    setIsLoginVisible(!isLoginVisible);
  };


  return (
    
    <div className="container-register">
      <div className={`form-box-register ${isLoginVisible ? "login" : "register"}`}>
        {isLoginVisible ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="toggle-box-register">
        <div className={`toggle-panel toggle-left ${!isLoginVisible ? "active" : ""}`}>
          <h1 style={{color: "red"}}>Hello, Welcome! </h1>
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

const LoginForm = () => {
  return (
    <form action="#">
      <h1>Login</h1>
      <div className="input-box-register">
        <input type="text" placeholder="Username" required />
        <i className="bx bxs-user"></i>
      </div>
      <div className="input-box-register">
        <input type="password" placeholder="Password" required />
        <i className="bx bxs-lock-alt-register"></i>
      </div>
      <div className="forgot-link-register">
        <a href="#">Forgot Password?</a>
      </div>
      <button type="submit" className="btn-register">
        Login
      </button>
      <p>or login with social platforms</p>
      <div className="social-icons">
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

const RegisterForm = () => {
  return (
    <form action="#">
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
      <button type="submit" className="btn-register">
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




