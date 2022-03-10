import React from "react";
import { useLocation } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51KUWUJIkpSnYhQP37VpswUt8GxghBBwq8Cg1fyHbOQApI4H81eivhxWIt4yXHhCNzow6LGIErEwXBOAgjNxbEktj00ILyZKUpP"
);

const Payment = (props) => {
  const location = useLocation();
  const { title, price } = location.state;

  const { completed, setCompleted, token, userToken } = props;

  const totalPrice = price + 1.5;

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="resume-order">
          <h3>Résumé de la commande</h3>
          <div className="resume-order-commande">
            <span>Commmande</span>
            <span>{price} €</span>
          </div>
          <div className="resume-order-frais-protection">
            <span>Frais protection acheteur</span>
            <span>0.50 €</span>
          </div>
          <div className="resume-order-frais-port">
            <span>Frais de port</span>
            <span>1.00 €</span>
          </div>
        </div>
        <div className="total-payment">
          <div className="total-payment-price">
            <span>Total</span>
            <span>{totalPrice} €</span>
          </div>
          <div className="total-payment-resume">
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir{" "}
              <span>{title}</span>. Vous allez payer <span>{totalPrice} €</span>{" "}
              (frais de protection et frais de port inclus).
            </p>
          </div>
        </div>
        <div className="card-payment-container">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              completed={completed}
              setCompleted={setCompleted}
              token={token}
              userToken={userToken}
              title={title}
              price={price}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
