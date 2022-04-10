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
        this.videoRef = React.createRef();
    }



    componentDidMount() {
        console.log("componentDidMount");
        fetch(`http://localhost:4321/lesson/${this.props.match.params.courseId}`)
          .then(response => response.json())
          .then(lessons => {
            this.setState( { lessons: lessons})
          })
          
        let url;
        fetch(`http://localhost:4321/courses/${this.props.match.params.courseId}`)
          .then(response => response.json())
          .then(course => {
            console.log("didmount in coursepage",course);
            this.setState( { course: course.data.course });
            const accessKey = localStorage.getItem('authorization');
            fetch(`http://localhost:4321/media/courses/demoVideos/${course.data.course.videoIntro}`, {
                headers : {
                  "Authorization": accessKey,
                  "Range": "bytes=0-"
                }
            }).then(media => media.blob())
              .then(video => {
                console.log(video);
               let url = URL.createObjectURL(video);
                this.videoRef.current.src = url;
                
                console.log("nothing");
            }).catch(e => console.log(e))
          });
          this.state.lessons.forEach((lesson, index) => {
            this["lessonRef" + index] = React.createRef();
          })
      }

      changeLesson(e) {
        console.log(e)
        console.log(e.target.id);
        console.log(this.state.lessons[e.target.innerText.charAt(0)].videoPath);
        const accessKey = localStorage.getItem('authorization');
        fetch(`http://localhost:4321/media/courses/videoLessons/${this.state.lessons[e.target.innerText.charAt(0)].videoPath}`, {
                headers : {
                  "Authorization": accessKey,
                  "Range": "bytes=0-"
                }
            }).then(media => media.blob())
              .then(video => {
                console.log(video);
               let url = URL.createObjectURL(video);
                this.videoRef.current.src = url;
                
                console.log("nothing");
            }).catch(e => console.log(e))
        
      }

      

    render() {
        return(
            <div>
                <video ref={this.videoRef} className="video-sample" controls src="1. Welcome to the Course.mp4"></video>
                {console.log("this are props",this.props)}
                <div className="learn-to-section"> 
                <h1> 
                    {this.state.course.name}
                </h1>
                <p>{ this.state.course.description}</p>
                <img className="edit-name-des" src="lapiz.svg" alt="" />
                </div>
                {console.log("stateCoursePage", this.state)}
                {console.log(this.state.lessons)}
                {this.state.lessons.map((lesson, index) => (
                    <div onClick={(e) => {this.changeLesson(e)}} id={lesson.videoPath} className={`${lesson.videoPath} play-list-item`}>
                    <img className="play-btn-off" src="play-button.svg" alt="" />
                    <p className="play-list-text">{`${index} ${lesson.name}`}</p>
                    <img className="play-list-edit" src="lapiz.svg" alt="" />
                    <p hidden>{lesson.videoPath}</p>
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