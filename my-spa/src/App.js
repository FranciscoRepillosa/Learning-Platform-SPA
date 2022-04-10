import React from "react"
import HomePage from "./pages/HomePage/HomePage.component";
import CoursePage from "./pages/CoursePage/CoursePage.component";
import CheackoutPage from "./pages/CheckoutPage/CheckoutPage.component";
import {Route, Switch} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SubmitCoursePage from "./pages/SubmitCoursePage/SubmitCoursePage.component";
import TestPage from "./pages/TestPage/TestPage.component";
import newLessonPage from "./pages/newLessonPage/newLessonPage.component";
import UserCourseListPage from "./pages/UserCourseListPage/UserCourseListPage.component";
import SignUpPage from "./pages/SignUpPage/SignUp.component";
import LoginPage from "./pages/LoginPage/LoginPageComponent";
import ProfileIcon from "./components/profile-icon/profile-icon.component";
console.log(TestPage.render)
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
        <Switch>
          <Route exact={true} path="/" component={HomePage}/>
          <Route exact={true} path="/course/:courseId" component={CoursePage}/>
          <Route exact={true} path="/checkout/:courseId" component={CheackoutPage}/>
          <Route exact={true} path="/course" component={SubmitCoursePage} />
          <Route exact={true} path="/testpage" component={ProfileIcon} />
          <Route exact={true} path="/newlesson/:courseId" component={newLessonPage} />
          <Route exact={true} path="/mycourses" component={UserCourseListPage} />
          <Route exact={true} path="/signup" component={SignUpPage} />			  
          <Route exact={true} path="/login" component={LoginPage} />         
        </Switch>
      </Router>
    </div>
  )
}

export default App;
