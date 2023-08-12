import React from "react";
import { useNavigate } from "react-router-dom";
//import {withRouter} from "react-router-dom";

import "./course-card.styles.css";

const CourseCard = ({name, photo, history, _id}) => {

const navigate = useNavigate() 

return (
    <div className="course-card" onClick={() => navigate(`/course/${_id}`)} >
        <h2 className="course-card-title">
               {name}
        </h2>
        <img className="course-card-edit" src="lapiz.svg" alt="edit course"/>
        <img className="course-card-img" src={`/courses/coverImage/${photo}`} alt="course"/>
    </div>
)
        
}

export default CourseCard;