import React, {useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection  from '../payment-card/payment-card.component';
import CheckoutFormInputs from '../Checkout-form-inputs/Checkout-form-inputs.component';

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

  const setJWT = (token) => {
    localStorage.setItem('authorization', `Bearer ${token}`);
  }

  const createUser = async (userData) => {
    
    const newUser = await axios({
      method: "post",
      url: "http://localhost:4321/user/signup",
      data: userData
    });
    
    return newUser
  }

  const giveCourseAccess = () => {
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
  }
  
    
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

            if(!localStorage.getItem('authorization')) {
              
              const userData = {
                name: nameInput,
                email: emailInput,
                password: passwordInput,
                confirmPassword: confirmPasswordInput
              };

              const newUser = await createUser(userData);

              setJWT(newUser.data.token);

            }
            
              giveCourseAccess();
            
          
        }
      }
    });
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <CheckoutFormInputs onInputChange={handleInputChange} />
      <CardSection  />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}