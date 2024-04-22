import logo from './Components/Assets/OIP.jpeg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import SignUp from './Components/SignUp/SignUp';
import {BrowserRouter, Routes,Route} from "react-router-dom"
// import "./index.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
       <Route path='/Login' element={<LoginForm/>}/>
       <Route path = '/SignUp' element = {<SignUp/>}/>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
