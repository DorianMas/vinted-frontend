import axios from "axios";

import { useState } from "react";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const { tokenUser } = props;

  const navigate = useNavigate();

  /*Ajout des états pour les champs de formulaire*/
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  /*Ajout de l'état pour le message d'erreur*/
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNewsletterChange = (event) => {
    const checked = event.target.checked;
    setNewsletter(checked);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Une requête au serveur pour créer un nouveau user
      // axios.post(URL, data)
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log(response.data);

      if (response.data.token) {
        //Sauvegarder le token dans un cookie
        tokenUser(response.data.token);
        //Rediriger le user "/"
        navigate("/");
      }
      // const token = response.data.token;
      // Cookies.set("token", token, { expires: 7 });
    } catch (error) {
      console.log("Signup Error ===> ", error.message);
      console.log("Catch error ===> ", error.response);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <span>{errorMessage}</span>
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

        <div className="checkbox-container">
          <div>
            <input type="checkbox" onClick={handleNewsletterChange} />
            <span>S'inscrire à notre newsletter</span>
          </div>
        </div>
        <p className="infos-newsletter">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button type="submit" value="Submit" className="submit-button">
          S'inscrire
        </button>
      </form>
      <a onClick={() => navigate("/login")}>
        {" "}
        Tu as déjà un compte ? Connecte-toi !
      </a>
    </div>
  );
};

export default Signup;
