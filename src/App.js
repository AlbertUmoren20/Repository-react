import logo from './Components/Assets/OIP.jpeg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import SignUp from './Components/SignUp/SignUp';
import StudentBody from './Components/StudentBody/StudentBody';
import FbmasStudent from './Components/FbmasStudent/Fbmas';
import FamssStudent from './Components/FamssStudent/Famss';

import {BrowserRouter, Routes,Route} from "react-router-dom"
// import "./index.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
       <Route path='/Login' element={<LoginForm/>}/>
       <Route path = '/SignUp' element = {<SignUp/>}/>
       <Route path='/StudentBody' element = {<StudentBody/>}/>
       <Route path='/Fbmas' element = {<FbmasStudent/>}/>
       <Route path = '/Famss' element = {<FamssStudent/>}/>
       
      </Routes>
    </BrowserRouter>
  )


}

export default App;
