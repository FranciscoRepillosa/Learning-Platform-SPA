import React,{Component, useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./CoursePage.styles.css"

const axios = require('axios').default;

// class CoursePage1 extends Component {

//     constructor(props) {
//         super();
//         this.props = props;
//         this.state = {
//             course: {},
//             lessons: [],
//             videoUrl: null
//         }
//         this.videoRef = React.createRef();
//     }



//     componentDidMount() {


//         // console.log("componentDidMount");
//         axios({
//           method: "get",
//           withCredentials: true,
//           url: `http://localhost:2121/lesson/${this.props.match.params.courseId}`
//         })
//           .then(data => {
//             let lessons = data.data;
//             console.log(lessons);
//             this.setState( { lessons: lessons})
//           })
          
//         // let url;
//         axios({
//           method: "get",
//           withCredentials: true,
//           url: `http://localhost:2121/courses/${this.props.match.params.courseId}`
//         })
//           .then(course => {
//             console.log("didmount in coursepage",course);
//             //this.setState( { course: course.data.course });

//             this.setState({
//               videoUrl: `http://localhost:2121/media/free/courses/${course.data.data.course._id}/demoVideos/${course.data.data.course.videoIntro}`,
//               course: course.data.data.course
//             });
//             const accessKey = localStorage.getItem('authorization');
//             console.log('accessKey --------',accessKey);
//             //this.videoRef.current.src = `http://localhost:2121/media/courses/625ad64a0a8d551d143281c6/demoVideos/1650120262224-VID_20220322_181150.mp4`;
//             //console.log('src ======',this.videoRef.current.src);
//             //console.log();
//             // fetch(`http://localhost:2121/media/courses/${course.data.course._id}/demoVideos/${course.data.course.videoIntro}`, {
//             //     headers : {
//             //       "Authorization": accessKey,
//             //       "Range": "bytes=0-"
//             //     }
//             // }).then(media => media.blob())
//             //   .then(video => {
//             //     console.log(video);
//             //    let url = URL.createObjectURL(video);
//             //     this.videoRef.current.src = url;
                
//             //     console.log("nothing");
//             // }).catch(e => console.log(e))
//           });
//           this.state.lessons.forEach((lesson, index) => {
//             this["lessonRef" + index] = React.createRef();
//           })
//       }

//       changeLesson(e) {
//         console.log(e)
//         console.log(e.target.id);
//         console.log(this.state.lessons[e.target.innerText.charAt(0)].videoPath);
//         const accessKey = localStorage.getItem('authorization');
//         console.log('anymore');
//         console.log( this.state.lessons[e.target.innerText.charAt(0)]);
//         this.setState({
//           videoUrl: `http://localhost:2121/media/courses/${this.state.course._id}/videoLessons/${this.state.lessons[e.target.innerText.charAt(0)].videoPath}`,
//         });
//         // fetch(`http://localhost:2121/media/courses/videoLessons/${this.state.lessons[e.target.innerText.charAt(0)].videoPath}`, {
//         //         headers : {
//         //           "Authorization": accessKey,
//         //           "Range": "bytes=0-"
//         //         }
//         //     }).then(media => media.blob())
//         //       .then(video => {
//         //         console.log(video);
//         //        let url = URL.createObjectURL(video);
//         //         this.videoRef.current.src = url;
                
//         //         console.log("nothing");
//         //     }).catch(e => console.log(e))
        
//       }
    
      
      

//     render() {
      
//       //const navigate = useNavigate()

//       return(
//             <div>
//                 <video className="video-sample" controls src={this.state.videoUrl} >
//                   {console.log('video url', this.state.videoUrl)}
//                 </video>
//                 {console.log("this are props",this.props)}
//                 <div className="learn-to-section"> 
//                 <h1> 
//                     {this.state.course.name}
//                 </h1>
//                 <p>{ this.state.course.description}</p>
//                 <img className="edit-name-des" src="lapiz.svg" alt="" />
//                 </div>
//                 {console.log("stateCoursePage", this.state)}
//                 {console.log(this.state.lessons)}
//                 {this.state.lessons.map((lesson, index) => (
//                     <div onClick={(e) => {this.changeLesson(e)}} id={lesson.videoPath} className={`${lesson.videoPath} play-list-item`}>
//                     <img className="play-btn-off" src="play-button.svg" alt="" />
//                     <p className="play-list-text">{`${index} ${lesson.name}`}</p>
//                     <img className="play-list-edit" src="lapiz.svg" alt="" />
//                     <p hidden>{lesson.videoPath}</p>
//                     </div>
//                 ))}
//                 <button onClick={() => navigate(`/checkout/${this.state.course._id}`)}> BUY 10 $</button>
//             </div>
//         )
//     }   
// }

const CoursePage = (props) => {
  
  const navigate = useNavigate()

  const {courseId} = useParams()

  const [course, setCourse] = useState({
    videoUrl: null,
    lessons: []
  })
  // const [lessons, setLessons] = useState([]) 
  const [videoUrl, setVideoUrl] = useState(null)

  useEffect(async () => {

    console.log('after Mount');
    
    const lessons = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:2121/lesson/${courseId}`
        })
          .then(data => {
            let lessons = data.data;
            return lessons
            // setLessons(lessons)
          })
          
        // let url;
    const details = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:2121/courses/${courseId}`
        })
          .then(courseRes => {

            // this.setState({
            //   videoUrl: `http://localhost:2121/media/free/courses/${course.data.data.course._id}/demoVideos/${course.data.data.course.videoIntro}`,
            //   course: course.data.data.course
            // });
            courseRes.data.data.course.lessons = lessons;
            courseRes.data.data.course.videoUrl = `http://localhost:2121/media/free/courses/${courseRes.data.data.course._id}/demoVideos/${courseRes.data.data.course.videoIntro}`

            //return course.data.data.course
            // setVideoUrl(`http://localhost:2121/media/free/courses/${course.data.data.course._id}/demoVideos/${course.data.data.course.videoIntro}`);
            // setCourse(course.data.data.course)
            console.log(videoUrl !== `http://localhost:2121/media/free/courses/${courseRes.data.data.course._id}/demoVideos/${courseRes.data.data.course.videoIntro}`);
            console.log('vidUrl ',videoUrl);
            // if (videoUrl !== `http://localhost:2121/media/free/courses/${courseRes.data.data.course._id}/demoVideos/${courseRes.data.data.course.videoIntro}`) {
            //   console.log('the fuck yo');  
              
            setVideoUrl(courseRes.data.data.course.videoUrl)
            // }
            setCourse(courseRes.data.data.course)

          });
  }, []);

  

  const buyCourse = () => {
    const isLogin = localStorage.getItem("isLogin") ? true : false;
    console.log('this mf is login?',isLogin);
    if(isLogin) {
      navigate(`/checkout/${course._id}`)
    }
    else{
      localStorage.setItem("goTo", `/checkout/${course._id}`);
      navigate(`/signup`)
    }
  }
  
  const changeLesson = (e) => {
            course.videoUrl = `http://localhost:2121/media/courses/${course._id}/videoLessons/${course.lessons[e.target.innerText.charAt(0)].videoPath}`
            let delila = course
            setVideoUrl(`http://localhost:2121/media/courses/${course._id}/videoLessons/${course.lessons[e.target.innerText.charAt(0)].videoPath}`)
            // this.setState({
            //   videoUrl: `http://localhost:2121/media/courses/${course._id}/videoLessons/${course.lessons[e.target.innerText.charAt(0)].videoPath}`,
            // })
            
  }

  return(
        <div>
          {console.log('render')}
          {console.log('the real course mf', videoUrl)}
           <video className="video-sample" controls src={videoUrl} >
            </video>
          <div className="learn-to-section"> 
            <h1> 
              {course.name}
            </h1>
            <p>{course.description}</p>
            <img className="edit-name-des" src="lapiz.svg" alt="" />
          </div>
          {course.lessons.map((lesson, index) => (
          <div onClick={(e) => {changeLesson(e)}}  id={lesson.videoPath} className={`${lesson.videoPath} play-list-item`}>
            <img className="play-btn-off" src="play-button.svg" alt="" />
            <p className="play-list-text">{`${index} ${lesson.name}`}</p>
            <img className="play-list-edit" src="lapiz.svg" alt="" />
            <p hidden>{lesson.videoPath}</p>
          </div>
          ))}
          <button onClick={() => buyCourse()}> BUY 10 $</button>
          </div>
        )

}



//const CoursePageWithEouter = withRouter(CoursePage);

export default CoursePage;