import React from "react";
import { useLocation } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_votreCléPublique");

const Payment = (props) => {
  const location = useLocation();
  const { title, price } = location.state;

  const { completed, setCompleted, token, userToken } = props;

  return (
    <>
      <span>test</span>
      <br />
      <span>{title}</span>
      <br />
      <span>{price}</span>
      <br />
      <Elements stripe={stripePromise}>
        <CheckoutForm
          completed={completed}
          setCompleted={setCompleted}
          token={token}
          userToken={userToken}
        />
      </Elements>
    </>
  );
};

export default Payment;
