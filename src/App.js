import logo from './Components/Assets/OIP.jpeg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import Register from './Components/Register/Register'
import HomePage from './Components/HomePage/HomePage';
import SignUp from './Components/SignUp/SignUp';
import StudentBody from './Components/StudentBody/StudentBody';
import FbmasStudent from './Components/FbmasStudent/Fbmas';
import FamssStudent from './Components/FamssStudent/Famss';
import UploadProjectFamss from './Components/UploadProject/UploadProjectFamss';
import UploadProjectFbmas from './Components/UploadProject/UploadProjectFbmas';
import AttachProject from './Components/AttachProject/AttachProject';
import AttachProjectFamss from './Components/AttachProject/AttachProjectFamss';
import StudentBody400 from './Components/StudentBody/StudentBody400';
  import {BrowserRouter, Routes,Route} from "react-router-dom"
// import "./index.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
       <Route path='/Login' element={<LoginForm/>}/>
       <Route path='/Register' element= {<Register/>}/>
       <Route path = '/SignUp' element = {<SignUp/>}/>
       <Route path='/StudentBody' element = {<StudentBody/>}/>
       <Route path='/Fbmas' element = {<FbmasStudent/>}/>
       <Route path = '/Famss' element = {<FamssStudent/>}/>
       <Route path = '/400Famss' element = {<UploadProjectFamss/>}/>
       <Route path = '/400Fbmas' element = {<UploadProjectFbmas/>}/>
       <Route path='/AttachProject' element= {<AttachProject/>}/>
       <Route path='/AttachProjectFamss' element={<AttachProjectFamss/>}/>
        <Route path='/StudentBody400Level' element= {<StudentBody400/>}/>
      </Routes>
    </BrowserRouter>
  )


}

export default App;
