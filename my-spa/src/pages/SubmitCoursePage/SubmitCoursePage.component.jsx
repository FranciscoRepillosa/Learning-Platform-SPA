import React, {Component, useState} from "react";
import SearchBox from "../../components/search-box/search-box.component";
import FormInput from "../../components/input/input.component";
import "./SubmitCoursePage.styles.css"
import MainTitle from "../../components/header/header.component";
const axios = require("axios");

const SubmitCoursePage = () => {

    const [CourseName, setCourseName] = useState("");
    const [CourseDescription, setCourseDescription] = useState("");
    const [CoverImage, setCoverImage] = useState("");
    const [VideoIntro, setVideoIntro] = useState("");


    const handleInputChange = (event) => {
        switch (event.target.name) {
          case "courseName":
            setCourseName(event.target.value);
            break;
          case "courseDescription":
            setCourseDescription(event.target.value);
            break;
          case "coverImage":
            setCoverImage(event.target.files[0]);
            break;
          case "videoIntro":
              console.log(event.target.files);
            setVideoIntro(event.target.files[0]);
            break;
        
        }
      };

      const handleSubmit = (event) => {
        console.log(event);

        event.preventDefault();


        const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "coverImage", 
        CoverImage, 
        CoverImage.name 
      );

      formData.append( 
        "videoIntro", 
        VideoIntro, 
        VideoIntro.name 
      );

      formData.append( 
        "courseName", 
        CourseName, 
      );

      formData.append( 
        "courseDescription", 
        CourseDescription, 
      );



      
     
      // Request made to the backend api 
      // Send formData object 
      axios.post("http://localhost:3001/ramdon", formData
      )
      .then(res => console.log(res))
          //make a API call to create a couese by sending the hooks above
          //once its created the course successfully redict to other to add a lesson
      }

    return (
        <div>
            <SearchBox />
            <MainTitle text={"New Course"}/>
            <form action="" method="post">
                <div className="basic-card new-lesson-form" >
                    <FormInput type={"text"} name={"courseName"} placeholder={"Course Name"}  onInputChange={handleInputChange} />
                    <FormInput type={"text"} name={"courseDescription"} placeholder={"Course Description"}  onInputChange={handleInputChange} />
                    <FormInput type={"file"} name={"coverImage"} placeholder={"Cover Image"}  onInputChange={handleInputChange} />
                    <FormInput type={"file"} name={"videoIntro"} placeholder={"Video Intro"}  onInputChange={handleInputChange} />
                    <FormInput type={"submit"} submitHandler={handleSubmit} placeholder={"Create Course"} />
                    
                </div>
            </form>
        </div>
    );
}

export default SubmitCoursePage;
