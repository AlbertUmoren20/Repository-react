import { Component } from 'react';
import React from 'react'
import logo from "../Assets/Ellipse 2.png"
import { useLocation } from 'react-router-dom';
import { FaThumbsDown } from 'react-icons/fa6';

class FamssStudent extends Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
      selectedYear: '',
      showDescript : false,
      projects:[{
        name: "The Effects of Financial Innovation on Bank Performance",
        by:"by Uboh Utibeabasi",  
        year: "2020",
        department: "",
        description:"This was done by a 400 level, computer science student under the supervision of Mrs Olagoke Shitta"
      },
      
      {
        name:"Cyber-Security on Fraud Prevention in Nigerian Commercial Banks",
        by:"Albert Umoren",
        year:"2021",
        description:"Done by a 400level, computer science student"
      },
      {
        name:"The Impact of Value for Money Audit on the Expenditure Control of Public Sector",
        by:"Umoren Gilbert",
        year:"2022",
        description:"Done by a 400level, computer science student"
      },
      {
        name:"Causes of Project Failure in Botswana Public Projects: Contractors’ Perspective",
        by:"",
        year:"2023",
        department:"Business Admin",
        description:"Done by a 400level, computer science student"
      },
      {
        name:"Internal Audit and Performance of Public Institutions in Ngororero District Rwanda",
        by:"",
        year:"2024",
        department:"Business Admin",
        description:"Done by a 400level, computer science student"
      },
      {
        name:"Effect of Macroeconomic Variables on Economic Growth in Botswana",
        by:"",
        year:"2021",
        department:"Economics",
        description:"Done by a 400level, computer science student"
      },
      {
        name:"Government Expenditure and Economic Growth: Does Corruption and Democracy Matter?",
        by:"",
        year:"2022",
        department:"Economics",
        description:"Done by a 400level, computer science student"
      },
      {
        name:"Virtual Classrooms: Enhancing Education through Technology",
        by:"",
        year:"2023",
        department:"Mass Com",
        description:"Done by a 400level, computer science student"
      },
      {
        name:"Online Gaming Communities as Social Spaces",
        by:"" ,
        year:"2023",
        department:"Mass Com",
        description:"Done by a 400level, computer science student"
      },
      {
        name:"Pre-colonial Relations Among the Yorubas' in Nigeria",
        by:"",
        year:"2024",
        department:"International",
        description:"Done by a 400level, computer science student"
      },
      
      {
        name:"The Role of Mediation in the Russian-Ukraine Conflict",
        by:"",
        year:"2021",
        department:"International Rel.",
        description:"Done by a 400level, computer science student"
       }],
 
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this) 
    this.onProjectclicked = this.onProjectclicked.bind(this)
    this.onRemovedesc = this.onRemovedesc.bind(this);

    
  }
  onRemovedesc(){
      this.setState({showDescript : false})
  }

  onProjectclicked(project){
    this.setState({
      showDescript : true
     })}


  

  onSearchChange(event) {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });

    const {projects} = this.state
    const filteredProjects = projects.filter((project)=> {
      return project.name.toLocaleLowerCase().includes(searchField);
    });

   
  }

  handleYearChange(event) {
    const selectedYear = event.target.value;
    this.setState(() =>{
      return {selectedYear};
    })
  }

  filterProjects = (projects, searchQuery, year) => {
    const {selectedYear} = this.state;
    const {selectedDepartment} = this.state;
    return projects.filter(project => {
      return project.name.toLocaleLowerCase().includes(searchQuery) && (year === "" || project.year === selectedYear);
      
    });
  }



  render() {
      const { searchField, projects } = this.state;
    const years = ["2020", "2021", "2022", "2023", "2024"];
    const departments = ["Accounting", "Business Admin.", "Mass Com.", "Political Sci.", "International Rel."]
  

    return (
      <div className='faculty-wrapper'> 
      <div className='faculty-wrapper-continer' style={{display: this.state.showDescript ? "flex" : "none"}} onClick={this.onRemovedesc}>
      
      <div className='faculty-wrapper-details'>
       <p>Title: </p>
       <p>By: </p>
       <p>Year: </p>
       <p>Description: </p>
      </div>

      </div>
      <div className="HomeHeader-1">
      <span style={{fontSize:"50px", textDecoration: "underline #1b4cd2 10px"}}>FAMSS<br/> E-REPOSITORY<br/></span>
      <h5 style={{fontSize: "40px"}}>Faculty of Art Management and social sciences</h5>
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
            <div className='search-box-container'>
            <input
            className = "search-box"
            type='Search'
            placeholder= "Search Projects"
            onChange = {this.onSearchChange} 
            project = {this.filterProjects}
          />
          
          <select className='year-box'
          value= {this.selectedYear}
          onChange={this.handleYearChange}
        >
          <option value="">Department</option>
          {departments.map(department => ( 
            <option key={department} value={department}>{department}</option>
          ))}
          </select>


          <select className='year-box'
          value= {this.selectedYear}
          onChange={this.handleYearChange}
        >
          <option value="">All Years</option>
          {years.map(year => ( 
            <option key={year} value={year}>{year}</option>
          ))}
          </select>
            </div>
         

        <div className="filtered-projects" > 
          {this.filterProjects(projects, searchField, this.state.selectedYear,).map((project) => (
            
            <div key={project.name} className="project-card-1" onClick={this.onProjectclicked}>
              <h3 style={{fontSize: "15px"}}>{project.name.slice(0,19)}....</h3>
              <p style={{fontSize: "14px"}}> Year: {project.year}</p>
              <p style={{fontSize: "12px"}}>{project.description.slice(0, 100)}...</p>  {/* Truncate description for brevity */}
              { /*Insert any button if needed in here */}
            </div>
          ))}
        </div>
   
      </div>
    )
  }
}

export default FamssStudent;

