import React from "react";

import "./course-list.styles.css"
import CourseCard from "../course-card/course-card.component"

const CourseList = ({courses}) => {
  courses.map(course => (
    <CourseCard name={course.name} photo={course.photo} />
  ))
}
    

export default CourseList;