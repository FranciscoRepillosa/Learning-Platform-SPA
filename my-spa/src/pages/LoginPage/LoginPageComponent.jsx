import React, {Component, useState} from "react";
import {useNavigate} from "react-router-dom";
import SearchBox from "../../components/search-box/search-box.component";
import FormInput from "../../components/input/input.component";
import "../SubmitCoursePage/SubmitCoursePage.styles.css";
import MainTitle from "../../components/header/header.component";
const axios = require("axios");
axios.defaults.baseURL = 'https://api.courseapp.repillosa.com';

//import Cookies from 'universal-cookie';

const LoginPage = (props) => {

  console.log(props);
    
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleInputChange = (event) => {
        switch (event.target.name) {
          case "email":
            setEmail(event.target.value);
            break;
          case "password":
            setPassword(event.target.value);
            break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

      let reqBody = {
          email,
          password
      };

      console.log(reqBody);
     
      // Request made to the backend api 
      // Send formData object 
      axios({
      method: "post",
      url: `/user/login`, 
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
        // const cookies = new Cookies();
        // cookies.set('isLogin', true, { path: '/' });
        // console.log(cookies.get('isLogin')); // Pacman

        //localStorage.setItem('authorization', `Bearer ${res.data.token}`);
      })
    }

    return (
        <div>
            <SearchBox />
            <MainTitle text={"LOGIN"}/>
            <form>
                <div className="basic-card new-lesson-form" >
                    <FormInput type={"text"} name={"email"} placeholder={"Email"}  onInputChange={handleInputChange} />
                    <FormInput type={"text"} name={"password"} placeholder={"Password"}  onInputChange={handleInputChange} />
                    <FormInput type={"submit"} submitHandler={handleSubmit} placeholder={"LOGIN"} />
                    
                </div>
            </form>
        </div>
    );
}

export default LoginPage;