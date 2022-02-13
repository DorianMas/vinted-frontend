import Vinted from "../assets/Vinted-logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "react-switch";

const Header = (props) => {
  const { token, tokenUser, setSearchTerm, toggle, setToggle, sort, setSort } =
    props;

  const handleSwitch = (checked) => {
    setToggle(checked);
  };

  const location = useLocation();
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
          <input
            type="search"
            placeholder="Recherche des articles"
            className="searchbar"
            onChange={(event) => {
              const value = event.target.value;
              setSearchTerm(value);
            }}
          />
        </div>
        {/* <>
          {location.pathname === "/" && (
            <label>
              <span>Trier par prix : </span>
              <br />
              <Switch onChange={handleSwitch} checked={toggle} />
            </label>
          )}
        </> */}
        {/* <Switch
          //     onChange={handleSwitch}
          //     checked={toggle}
          //     // className="switch-button"
          //     onColor="#40aeb7"
          //     offColor="#40aeb7"
          //     height={20}
          //     width={42}
          // uncheckedIcon={false}
          // checkedIcon={false}
          // checkedHandleIcon={
          //   <div
          //   // style={{
          //   //   display: "flex",
          //   //   justifyContent: "center",
          //   //   alignItems: "center",
          //   //   height: "100%",
          //   //   fontSize: 15,
          //   //   backgroundColor: "red",
          //   // }}
          //   >
          //     ⇣
          //   </div>
          // }
          // uncheckedHandleIcon={
          //   <div
          //   // style={{
          //   //   display: "flex",
          //   //   justifyContent: "center",
          //   //   alignItems: "center",
          //   //   height: "100%",
          //   //   fontSize: 15,
          //   //   backgroundColor: "black",
          //   // }}
          //   >
          //     ⇡
          //   </div>
          // }
          // />
          // </label> */}
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
