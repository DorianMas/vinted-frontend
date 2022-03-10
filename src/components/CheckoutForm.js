import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);

      console.log(cardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log("Stripe Response ===> ", stripeResponse);

      const stripeToken = stripeResponse.token.id;
      console.log("stripToken ==> ", stripeToken);
      console.log(title);
      console.log(price);
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(
        //&id=${stripeToken}
        `https://lereacteur-vinted-api.herokuapp.com/payment`,
        {
          token: stripeToken,
          // le token que vous avez reçu de l'API Stripe
          title: title,
          amount: price,
          // le prix indiqué dans l'annonce
        }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <div className="card-payment">
            <CardElement />
          </div>
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
