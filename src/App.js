
import './App.css';
// import LoginForm from './Components/LoginForm/LoginForm';
import Register from './Components/Register/Register'
import HomePage from './Components/HomePage/HomePage';
import SignUp from './Components/SignUp/SignUp';
import StudentBody from './Components/StudentBody/StudentBody';
import FbmasStudent from './Components/FbmasStudent/Fbmas';
import FamssStudent from './Components/FamssStudent/Famss';
import FacultyStudent from './Components/FacultyStudent/FacultyStudent';
import UploadProjectFamss from './Components/UploadProject/UploadProjectFamss';
import UploadProjectFbmas from './Components/UploadProject/UploadProjectFbmas';
import AttachProject from './Components/AttachProject/AttachProject';
import AttachProjectFamss from './Components/AttachProject/AttachProjectFamss';
import AttachedProject from './Components/AttachProject/AttachedProject';
import StudentBody400 from './Components/StudentBody/StudentBody400';
import NursingStudent from './Components/NursingStudent/Nursing'
import UploadProjectNursing from './Components/UploadProject/UploadProjectNursing'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import LecturerDashboard from './Components/LecturerDashboard/LecturerDashboard';
import NotFound from './Components/NotFound';
  import {BrowserRouter, Routes,Route} from "react-router-dom"

import { Flip, ToastContainer } from 'react-toastify';
// import "./index.css"

function App({ children }) {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      {/* hmmm */}
       {/* <Route path='/Login' element={<LoginForm/>}/>  */}
       <Route path='/Login' element= {<Register/>}/>
       <Route path = '/SignUp' element = {<SignUp/>}/>
       <Route path='/StudentBody' element = {<StudentBody/>}/>
       {/* Legacy routes for backward compatibility */}
       <Route path='/Fbmas' element = {<FbmasStudent/>}/>
       <Route path = '/Famss' element = {<FamssStudent/>}/>
       <Route path = '/Nursing' element = {<NursingStudent/>}/>
       {/* Dynamic faculty route - supports any faculty created by admin */}
       <Route path = '/Faculty/:facultyAbbr' element = {<FacultyStudent/>}/>
       {/* <Route path = '/400Famss' element = {<UploadProjectFamss/>}/> */}
       {/* <Route path = '/400Fbmas' element = {<UploadProjectFbmas/>}/> */}
       {/* <Route path = '/400Nursing' element = {<UploadProjectNursing/>}/> */}
       <Route path='/AttachProject' element= {<AttachProject/>}/>
       <Route path='/AttachProjectFamss' element={<AttachProjectFamss/>}/>
       <Route path='/AttachedProject' element={<AttachedProject/>}/>
        {/* <Route path='/StudentBody400Level' element= {<StudentBody400/>}/> */}
        <Route path='/AdminDashboard' element= {<AdminDashboard/>}/>
        <Route path='/LecturerDashboard' element= {<LecturerDashboard/>}/>
        <Route path="*" element={<NotFound />} />

      </Routes>
       <ToastContainer 
         style={{ zIndex: "20000" }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        transition={Flip}
       />
       {children}
       
    </BrowserRouter>
  );
}

export default App;
