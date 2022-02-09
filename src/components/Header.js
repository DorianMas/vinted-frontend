import Vinted from "../assets/Vinted-logo.svg";

const Header = () => {
  return (
    <header>
      <img src={Vinted} className="logo" alt="logo" />
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
