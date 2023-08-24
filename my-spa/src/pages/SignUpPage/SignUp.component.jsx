import React, {Component, useState} from "react";
import {useNavigate} from "react-router-dom";
import SearchBox from "../../components/search-box/search-box.component";
import FormInput from "../../components/input/input.component";
import "../SubmitCoursePage/SubmitCoursePage.styles.css";
import MainTitle from "../../components/header/header.component";
const axios = require("axios");


const NewLessonPage = (props) => {

    console.log(props);
    const navigate = useNavigate()

    const [name, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleInputChange = (event) => {
        switch (event.target.name) {
          case "name":
            setUserName(event.target.value);
            break;
          case "email":
            setEmail(event.target.value);
            break;
          case "password":
            setPassword(event.target.value);
            break;
          case "confirmPassword":
            setConfirmPassword(event.target.value);
            break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

      let reqBody = {
          name,
          email,
          password,
          confirmPassword
      };

      console.log(reqBody);
     
      // Request made to the backend api 
      // Send formData object 
      axios({
      method: "post",
      url: `http://api.courseapp.repillosa.com/user/signup`, 
      data: reqBody,
      withCredentials: true
      })
      .then(res => {
        console.log(res);
        const wannaGoTo = localStorage.getItem("goTo");
        if (res.data.status === 'success' && !wannaGoTo ) {
          localStorage.setItem("isLogin", true);
          navigate('/signup')
        }
        else if(res.data.status === 'success' && wannaGoTo ){
          localStorage.setItem("isLogin", true);
          navigate(wannaGoTo)
        }
      })
    }

    return (
        <div>
            <SearchBox />
            <MainTitle text={"SIGNUP"}/>
            <form>
                <div className="basic-card new-lesson-form" >
                    <FormInput type={"text"} name={"name"} placeholder={"Name"}  onInputChange={handleInputChange} />
                    <FormInput type={"text"} name={"email"} placeholder={"Email"}  onInputChange={handleInputChange} />
                    <FormInput type={"text"} name={"password"} placeholder={"Password"}  onInputChange={handleInputChange} />
                    <FormInput type={"text"} name={"confirmPassword"} placeholder={"ConfirmPassword"}  onInputChange={handleInputChange} />
                    <FormInput type={"submit"} submitHandler={handleSubmit} placeholder={"SIGNUP"} />
                    
                </div>
            </form>
        </div>
    );
}

export default NewLessonPage;