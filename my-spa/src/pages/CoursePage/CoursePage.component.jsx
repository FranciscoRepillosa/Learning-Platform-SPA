import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import "./CoursePage.styles.css"

class CoursePage extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            course: {},
            lessons: []
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
        fetch(`http://localhost:4321/courses/${this.props.match.params.courseId}`)
          .then(response => response.json())
          .then(course => {
            console.log("didmount in coursepage",course);
            this.setState( { course: course.data.course })
          });

        fetch(`http://localhost:4321/lesson/${this.props.match.params.courseId}`)
          .then(response => response.json())
          .then(lessons => {
            this.setState( { lessons: lessons})
          })
      }

      

    render() {
        return(
            <div>
                <video className="video-sample" controls src="1. Welcome to the Course.mp4"></video>
                {console.log("this are props",this.props)}
                <div className="learn-to-section"> 
                <h1> 
                    {this.state.course.name}
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim delectus illum quae animi, in recusandae beatae dicta qui fugit ipsa deleniti expedita deserunt illo numquam cumque. Impedit in molestias reprehenderit? </p>
                <img className="edit-name-des" src="lapiz.svg" alt="" />
                </div>
                {console.log("stateCoursePage", this.state)}
                {this.state.lessons.map(lesson => (
                    <div className="play-list-item">
                    <img className="play-btn-off" src="play-button.svg" alt="" />
                    <p className="play-list-text">{lesson.name}</p>
                    <img className="play-list-edit" src="lapiz.svg" alt="" />
                    </div>
                ))}
                <button onClick={() => this.props.history.push({
                                                                pathname: `/checkout/${this.state.course._id}`, 
                                                                state: {courseId: this.state.course._id}})}> BUY 10 $</button>
            </div>
        )
    }   
}

const CoursePageWithEouter = withRouter(CoursePage);

export default CoursePageWithEouter;