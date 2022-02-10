import { Link, useSearchParams } from "react-router-dom";

import axios from "axios";

import { useState, useEffect } from "react";


const Subscription = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  /*Ajout des états pour les champs de formulaire*/
  const [username, setUsername] = userState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleUsernameChange = event => {
  const value = event.target.value;
  setUsername(value)
} 

  const handleEmailChange = event => {
    const value = event.target.value;
    setEmail(value);
  }

const handlePasswordChange = event => {
  const value = event.target.value;
  setPassword(value);
}

const handleSubmit = event {
  event.preventDefault();
  console.log(username, email, password);
}




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            "email": event.target.value,
            "username": event.target.value,
            "password": event.target.value,
            // newsletter: true,
          }
        );
        console.log(response.data);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
    console.log("Effect executed");
  }, []);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          />
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          />
      </form>
      <div className="checkbox-container">
        <div>
          <input type="checkbox" />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>
      <button type="submit" value="Submit" className="submit-button">
        S'inscrire
      </button>
      <a href="/login"> Tu as déjà un compte ? Connecte-toi !</a>
    </div>
  );
};

export default Subscription;
