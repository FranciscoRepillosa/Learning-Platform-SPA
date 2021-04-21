import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from '../../components/Checkout-form/checkout-form.component';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IdihjBfIYPsMJPYMND7ooEi9GsYOyMaY8mhIjB0MvynMaq7wpX2FAf9LpUkFlY43nBc2lbZX6lHk7YBC7djRemZ00yNsm8AUF");

const CheckoutPage = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm courseId={props.location.state.courseId} />
    </Elements>
  );
};

export default CheckoutPage;