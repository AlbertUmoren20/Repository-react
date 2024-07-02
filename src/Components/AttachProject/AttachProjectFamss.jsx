import axios from 'axios';
import React, { useState } from 'react'

const AttachProjectFamss = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        file: e.target.files[0]
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('title', formData.title);
      data.append('year', formData.year);
      data.append('supervisor', formData.supervisor);
      data.append('projectBy', formData.projectBy);
      data.append('department', formData.department);
      data.append('description', formData.description);
      data.append('file', formData.file);
  
      // Log the FormData object
      for (const pair of data.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
  
      try {
        const response = await axios.post('http://localhost:8080/student/uploadFamss', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Project uploaded successfully');
      } catch (error) {
        console.error('There was an error uploading the project!', error);
        alert('Error uploading project');
      }
    };
  
    return (
      <div>
      <div className="HomeHeader" style={{ fontSize: "30px", textDecoration: "underline #83D0FC 10px" }}>
      UPLOAD FAMSS <br/> PROJECT
       </div>
  
  
        <div className="Rectangle-attach">
          <div className="input-box-attach">
  
            <form onSubmit={handleSubmit}>
  
            <div class="row">
            <div class="col-25">
                <label className='address'>Name:</label>
                </div>
                <div class="col-75">
                <input type="topic" name="projectBy" value={formData.projectBy} onChange={handleChange} required />
              </div>
              </div>
              <div class="row">
              <div class="col-25"> 
                <label className='address'>Year:</label>
              </div>
              <div class="col-75">
                <select name="year" value={formData.year} onChange={handleChange} required>
                  <option value="">Pick Year....</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>
  
              <div class="row">
              <div class="col-25"> 
                <label className='address'>Supervisor:</label>
                </div>
                <div class="col-75">
                <input type="topic" name="supervisor" value={formData.supervisor} onChange={handleChange} required />
              </div>
              </div>
  
              <div class="row">
              <div class="col-25"> 
                <label className='address'>Project Name</label>
                </div>
                <div class="col-75">
                <input type="topic" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              </div>
              <div class="row">
              <div class="col-25">
                <label className='address'>Department:</label>
              </div>
              <div class="col-75">
                <select name="department" value={formData.department} onChange={handleChange} required>
                  <option value="">Pick Department....</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Science">Information Science</option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="BioChemistry">BioChemistry</option>
                </select>
              </div>
            </div>
  
              <div class="row">
              <div class="col-25">
                <label className='address'>Abstract Of Project:</label>
                </div>
                <div class="col-75">
                <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
              </div>
              </div>
              <div class="row">
              <div class="col-25">    
                <label className='address'>PDF File:</label>
                </div>
                <div class="col-75">
                <input type="file" name="file" onChange={handleFileChange} required />
              </div>
              </div>
  
              <br/>
              <div class="row">
              <button type="submit" value="Submit" className='upload-btn'>Upload Project</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AttachProjectFamss
