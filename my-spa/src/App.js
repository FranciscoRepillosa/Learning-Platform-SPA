import React from "react"
import dotenv from "dotenv";
import HomePage from "./pages/HomePage/HomePage.component";
import CoursePage from "./pages/CoursePage/CoursePage.component";
import CheackoutPage from "./pages/CheckoutPage/CheckoutPage.component";
//import {Route, Routes, Switch} from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubmitCoursePage from "./pages/SubmitCoursePage/SubmitCoursePage.component";
import TestPage from "./pages/TestPage/TestPage.component";
import newLessonPage from "./pages/newLessonPage/newLessonPage.component";
import UserCourseListPage from "./pages/UserCourseListPage/UserCourseListPage.component";
import SignUpPage from "./pages/SignUpPage/SignUp.component";
import LoginPage from "./pages/LoginPage/LoginPageComponent";
import ProfileIcon from "./components/profile-icon/profile-icon.component";
console.log(TestPage.render)
dotenv.config({ path: "../settings.env"})


/*
const Other = (props) => (
  <div>
    {props.match.params.courseId}
  </div>
)
*/


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={< HomePage/> }/>
          <Route exact={true} path="/course/:courseId" element={< CoursePage/> }/>
          <Route exact={true} path="/checkout/:courseId" element={< CheackoutPage/> }/>
          <Route exact={true} path="/course" element={< SubmitCoursePage/> } />
          <Route exact={true} path="/testpage" element={ <ProfileIcon/> } />
          <Route exact={true} path="/newlesson/:courseId" element={ <newLessonPage/> } />
          <Route exact={true} path="/mycourses" element={ <UserCourseListPage/> } />
          <Route exact={true} path="/signup" element={ <SignUpPage/> } />			  
          <Route exact={true} path="/login" element={ <LoginPage/> } />
          <Route exact={true} path="/test" element={ <TestPage/> } />         
        </Routes>
      </Router>
    </div>
  )
}

export default App;
