import React from "react";
import {withRouter} from "react-router-dom";

import "./course-card.styles.css";

const CourseCard = ({name, photo, history, _id}) => (
    <div className="course-card" onClick={() => history.push(`/course/${_id}`)} >
        <h2 className="course-card-title">
               {name}
        </h2>
        <img className="course-card-edit" src="lapiz.svg" alt="edit course"/>
        <img className="course-card-img" src={`/courses/coverImage/${photo}`} alt="course"/>
    </div>    )

export default withRouter(CourseCard);