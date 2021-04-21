import React from "react"
import HomePage from "./pages/HomePage/HomePage.component";
import CoursePage from "./pages/CoursePage/CoursePage.component";
import CheackoutPage from "./pages/CheckoutPage/CheckoutPage.component";
import {Route, Switch} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SubmitCoursePage from "./pages/SubmitCoursePage/SubmitCoursePage.component";

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


        </Switch>
      </Router>
    </div>
  )
}

export default App;
