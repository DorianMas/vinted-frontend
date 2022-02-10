import Vinted from "../assets/Vinted-logo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img
        src={Vinted}
        className="logo"
        alt="logo"
        onClick={() => navigate("/")}
      />
      <form>
        <input
          type="search"
          placeholder="Recherche des articles"
          className="search-bar"
        />
        <button>S'inscrire</button>
        <button>Se connecter</button>
        <button>Vends tes articles</button>
      </form>
    </header>
  );
};

export default Header;
