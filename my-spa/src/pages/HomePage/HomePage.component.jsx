import React, {Component} from "react";
import "../../components/search-box/search-box.styles.css";
import "../../components/header/header.styles.css";
import "../../components/course-card/course-card.styles.css";
import SearchBox from "../../components/search-box/search-box.component";
import MainTitle from "../../components/header/header.component";
import CourseCard from "../../components/course-card/course-card.component";
//import ProfileIcon from "../../components/profile-icon/profile-icon.component";
import TopNavContainer from "../../components/top-nav-container/top-nav-container.component";

class HomePage extends Component {
    constructor() {
      super();
      this.HandleSearchInputChange = this.HandleSearchInputChange.bind(this); 
  
      this.state = {
        courses: []
      }
    }
  /*
    componentDidMount() {
      console.log("componentDidMount");
      fetch("http://localhost:4321/courses")
        .then(response => response.json())
        .then(courses => {
          this.setState( { courses: courses.data.courses })
        })
    }
  */
     HandleSearchInputChange(searchedCourses) {
    
     this.setState({ courses: searchedCourses })
    
  }
     
    
    render() {
      return (
        <div>
          <TopNavContainer onSearchInputChange={this.HandleSearchInputChange} />
          <MainTitle text="Best tech courses ever" />
          {console.log("st", this.state.courses)}
          { this.state.courses.map(course => (
            <CourseCard name={course.name} photo={course.photo} _id={course._id} />
          ) ) }
        </div>
      )
    }
  }
  

  export default HomePage;