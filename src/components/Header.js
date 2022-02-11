import Vinted from "../assets/Vinted-logo.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const { token, tokenUser } = props;

  // [deconnected, setDeconnected] =useState(true)

  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={Vinted}
          className="logo"
          alt="logo"
          onClick={() => navigate("/")}
        />
      </div>
      <form>
        <div className="searchbar-container">
          <FontAwesomeIcon icon="fas fa-search" className="search-input-icon" />
          <input
            type="search"
            placeholder="Recherche des articles"
            className="searchbar"
          />
        </div>
      </form>
      <div>
        {token ? (
          <button className="signout-button" onClick={() => tokenUser(null)}>
            Se déconnecter
          </button>
        ) : (
          <>
            <button
              className="signin-button"
              onClick={() => navigate("/signup")}
            >
              S'inscrire
            </button>
            <button className="login-button" onClick={() => navigate("/login")}>
              Se connecter
            </button>
          </>
        )}
        <div className="sell-button-container"></div>
      </div>
      <button className="sell-button">Vends tes articles</button>
    </header>
  );
};

export default Header;
