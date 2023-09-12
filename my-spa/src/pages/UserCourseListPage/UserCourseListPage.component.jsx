import React, {Component, useState, useEffect} from "react";
import SearchBox from "../../components/search-box/search-box.component";
import "../SubmitCoursePage/SubmitCoursePage.styles.css";
import MainTitle from "../../components/header/header.component";
import CourseCard from "../../components/course-card/course-card.component";
import config from '../../config.dev'
const axios = require("axios");

const UserCourseListPage = (props) => {

  console.log(props);

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const accessKey = localStorage.getItem('authorization');
        axios({
            method: "get",
            withCredentials: true,
            url: config.baseURL+`/user/courses`,
            headers : {
              "Authorization": accessKey
            }
            })
        .then(res => {
            console.log(res.data.userCourses.courses);
            setCourses(res.data.userCourses.courses)
        })
    })
    
    return (
        <div>
            <SearchBox />
            <MainTitle text={"New Lesson"}/>
            { courses.map(course => (
            <CourseCard name={course.name} photo={course.photo} _id={course._id} />
          ) ) }
            {console.log(courses)}
        </div>
    );
}

export default UserCourseListPage;