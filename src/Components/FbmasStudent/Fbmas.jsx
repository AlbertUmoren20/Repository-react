import { Component } from 'react';
import React from 'react'
import logo from "../Assets/Ellipse 2.png"
import { Route, Routes } from "react-router-dom";

class FbmasStudent extends Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
      selectedYear: '',
      selectedDepartment:'',
      showDescript : false,

      projects:[{
        name: "Exeat Management System",
        by:"by Uboh Utibeabasi",
        year: "2020",
        department: " Computer Science & Information sciences",
        description:""
      },

      {
        name:"Train Management System",
        by:"Umoren Gilbert",
        year:"2021",
        department: " MicroBiology",
        description:""
      },
      {
        name:"School Management System",
        by:"Umoren Gilbert",
        year:"2022",
        department: " Biotech",
        description:""
      },
      {
        name:"Library System",
        by:"Umoren Gilbert",
        year:"2023",
        department:" Computer Science & Information sciences",
        description:""
      },
      {
        name:"Bus Transportation System",
        by:"Umoren Gilbert",
        year:"2024",
        department: " Nursing",
        description:""
      },
      {
        name:"Security System",
        by:"Umoren Gilbert",
        year:"2021",
        department:" Microbiology",
        description:""
      },
      {
        name:"Artificial Intelligence System",
        by:"Umoren Gilbert",
        year:"2022",
        department:" Computer Science & Information sciences",
        description:""
      },
      {
        name:"Facial Recognition System",
        by:"Umoren Gilbert",
        year:"2023",
        department:" Nursing",
        description:""
      },
      {
        name:"Export Management System",
        by:"Umoren Gilbert",
        year:"2023",
        department:" Biotech",
        description:""
      },
      {
        name:"Faculty Management System",
        by:"Umoren Gilbert",
        year:"2024",
        department:" Computer Science & Information sciences",
        description:""
      },
      
      {
        name:" E-commerce Management System",
        by:"Umoren Gilbert",
        year:"2021",
        department:" MicroBiology",
        description:""
       }]}


       this.onSearchChange = this.onSearchChange.bind(this);
       this.handleYearChange = this.handleYearChange.bind(this);
       this.onDepartmentChange = this.onDepartmentChange.bind(this);
       this.onRemovedesc = this.onRemovedesc.bind(this);
       this.onProjectclicked = this.onProjectclicked.bind(this)
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
       this.setState(() => ({ searchField }));
     }
   
     handleYearChange(event) {
       const selectedYear = event.target.value;
       this.setState(() => ({ selectedYear }));
     }
   
     onDepartmentChange(event) {
       const selectedDepartment = event.target.value.toLocaleLowerCase();
       this.setState(() => ({ selectedDepartment }));
     }
   
     filterProjects = (projects, searchQuery, year, department) => {
      const {selectedYear} = this.state;
      const{selectedDepartment} = this.state;
      return projects.filter(project => {
        return project.name.toLocaleLowerCase().includes(searchQuery) && (year === "" || project.year === selectedYear) && (department === "" || project.department.toLocaleLowerCase().includes(searchQuery) === selectedDepartment);
  
      });
     }
 

  render() {
    const { searchField, projects, } = this.state;
    const years = ["2020", "2021", "2022", "2023", "2024"];
    const departments = ["Computer Science & Information sciences", "Nursing", "Biotech", "Microbiology" ];

    return (
      <div className='faculty-wrapper'>
      <div className='faculty-wrapper-continer' style={{display: this.state.showDescript ? "flex" : "none"}} onClick={this.onRemovedesc}>
      <div className='faculty-wrapper-details-1'>
       <p>Title: </p>
       <p>By: </p>
       <p>Year: </p>
       <p>Description: </p>
      </div>
      </div>
        <div className="HomeHeader-1">
        <span style={{fontSize:"60px", textDecoration: "underline red 10px"}}>FBMAS<br/> E-REPOSITORY<br/></span>
        <h5>Faculty of Basic Medical and Applied Sciences</h5>
        
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

          <select className='department-box-container'
          value= {this.onSelectedDepartment}
          onChange={this.onDepartmentChange}
          >
          <option value="">Departments</option>
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
         

        <div className="filtered-projects">
          {this.filterProjects(projects, searchField, this.state.selectedYear, this.state.selectedDepartment).map((project) => (

            <div key={project.name} className="project-card" onClick={this.onProjectclicked}>
              <h3 style={{fontSize: "15px"}}>{project.name}</h3>
              <p style={{fontSize: "14px"}}> Year: {project.year}</p>
              <p> Department:{project.department}</p>
              <p style={{fontSize: "12px"}}> {project.description.slice(0, 100)}...</p>  {}
              {}
            </div>
          ))}
        </div>
   
      </div>
    )
  }
}

export default FbmasStudent;

