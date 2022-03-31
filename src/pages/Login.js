import axios from "axios";

import { useState } from "react";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

/*Ajout des états pour les champs de formulaire*/
const Login = (props) => {
  const { tokenUser } = props;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*Ajout de l'état pour le message d'erreur*/
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);

      if (response.data.token) {
        tokenUser(response.data.token);
        //redirection
        navigate("/");
      }
    } catch (error) {
      console.log("Login error ===> ", error.message);
      console.log("Catch error ===> ", error.response);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("L'e-mail ou le mot de passe associé n'existe pas");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Se connecter</h2>
      <span>{errorMessage}</span>
      <form className="signup-form" onSubmit={handleSubmit}>
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
        <button type="submit" value="Submit" className="submit-button">
          Se connecter
        </button>
      </form>
      <a onClick={() => navigate("/signup")}>
        Pas encore de compte ? Inscris-toi !
      </a>
    </div>
  );
};

export default Login;
