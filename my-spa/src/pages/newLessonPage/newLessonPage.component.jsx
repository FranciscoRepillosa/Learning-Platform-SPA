import React, {Component, useState} from "react";
import SearchBox from "../../components/search-box/search-box.component";
import FormInput from "../../components/input/input.component";
import "../SubmitCoursePage/SubmitCoursePage.styles.css";
import MainTitle from "../../components/header/header.component";
const axios = require("axios");

const NewLessonPage = (props) => {

  console.log(props);

    const [LessonName, setLessonName] = useState("");
    const [VideoLesson, setVideoLesson] = useState("");


    const handleInputChange = (event) => {
        switch (event.target.name) {
          case "LessonName":
            setLessonName(event.target.value);
            break;
          case "VideoLesson":
            console.log(event.target.files[0])
            setVideoLesson(event.target.files[0]);
            break;
        
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(LessonName);
        console.log(VideoLesson);
        
        
        const accessKey = localStorage.getItem('authorization');

        const formData = new FormData(); 
        formData.append('key1', 'value1');
      
        // Update the formData object 
      formData.append( 
        "lessonName", 
        LessonName
      );

      formData.append( 
        "videoLesson", 
        VideoLesson
      );

      console.log(formData);
     
      // Request made to the backend api 
      // Send formData object 
      axios({
      method: "post",
      url: `http://localhost:4321/lesson/${props.match.params.courseId}`, 
      data: formData,
      headers : {
        "Content-Type": "multipart/form-data",
        "Authorization": accessKey
      }
      })
      .then(res => {
        console.log(res)
      })
          //make a API call to create a couese by sending the hooks above
          //once its created the course successfully redict to other to add a lesson
      }

    return (
        <div>
            <SearchBox />
            <MainTitle text={"New Lesson"}/>
            <form enctype="multipart/form-data">
                <div className="basic-card new-lesson-form" >
                    <FormInput type={"text"} name={"LessonName"} placeholder={"Lesson Name"}  onInputChange={handleInputChange} />
                    <FormInput type={"file"} name={"VideoLesson"} placeholder={"Video Lesson"}  onInputChange={handleInputChange} />
                    <FormInput type={"submit"} submitHandler={handleSubmit} placeholder={"Create Course"} />
                    
                </div>
            </form>
        </div>
    );
}

export default NewLessonPage;