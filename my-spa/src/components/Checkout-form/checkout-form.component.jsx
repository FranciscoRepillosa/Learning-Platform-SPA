import React, {useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection  from '../payment-card/payment-card.component';

const axios = require("axios").default;

export default function CheckoutForm ({courseId}) {

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "name":
        setNameInput(event.target.value)
        break;

    case "email":
        setEmailInput(event.target.value)
        break;

    case "password":
        setPasswordInput(event.target.value)
        break;

     case "confirmPassword":
        setConfirmPasswordInput(event.target.value)
        break;
    }
  };
  
     const handleSubmit = (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      console.log("stripe not loaded");
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    console.log("creating the client_secret");
    let clientSecret;

    fetch(`http://localhost:4321/checkout/${courseId}}`)
    .then(response => response.json())
    .then(async clientSecret => {
      
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        }
      });
  
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
            console.log("oh yeah baby, we did it ouo ouo ouo ouo");
          // Show a success message to your customer
            console.log(event.target.value);
            console.log("nameInput ",nameInput);
            console.log("emailInput ",{emailInput});
            console.log("passwordInput ",{passwordInput});
            console.log("confirmPasswordInput ",{ confirmPasswordInput });

            const userData = {
              name: nameInput,
              email: emailInput,
              password: passwordInput,
              confirmPassword: confirmPasswordInput
            };

            
            console.log(courseId);
            axios({
              method: "post",
              url: "http://localhost:4321/user/signup",
              data: userData
            })
            .then(res => {
              console.log(res);
              localStorage.setItem('authorization', `Bearer ${res.data.token}`);

              axios({
                method: "patch",
                url: "http://localhost:4321/user/giveCourseAccess",
                headers: {
                  "authorization": localStorage.getItem("authorization")
                },
                data: {
                  courseId
                }
              })
              .then(res => {
                console.log(res);
                alert("Success shopping");
                window.location.replace("http://localhost:3000");
              })
              .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  alert(error.response.data.message);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });

            })
            .catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                alert(error.response.data.message);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            });

            

          
          // register the user by making a API call to user/signup
          // localStorage.setItem('Authorization', rememberMe);
          // once is register give accsess to brought course by making a API call to user/
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    });
    
    /*
    var response = fetch('/http://localhost:4321/checkout/').then(function(response) {
        return response.json();
      }).then(function(responseJson) {
         clientSecret = responseJson.client_secret;
        console.log(clientSecret);
        // Render the form to collect payment details, then
        // call stripe.confirmCardPayment() with the client secret.
      });
      */
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="name" name="name" onChange={handleInputChange} id=""/> <br/>
      <input type="email" placeholder="email" name="email" onChange={handleInputChange} id=""/> <br/>
      <input type="password" placeholder="password" name="password" onChange={handleInputChange} id=""/> <br/>
      <input type="password" placeholder="repeat password" name="confirmPassword" onChange={handleInputChange} id=""/> <br/>
      <CardSection  />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}