import Vinted from "../assets/Vinted-logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Switch from "react-switch";
import Loupe from "../assets/loupe.svg";

import SortComponent from "./SortComponent";

const Header = (props) => {
  const {
    token,
    tokenUser,
    setSearchTerm,
    checked,
    setChecked,
    sort,
    setSort,
    values,
    setValues,
  } = props;

  const handleChange = () => {
    setChecked(!checked);
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
      <div>
        <div className="searchbar-container">
          {/* <img src={Loupe} className="search-input-icon" /> */}
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
        <div>
          {location.pathname === "/" && (
            <div div className="price-sort-button">
              <>
                <span>Trier par prix : </span>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  className="react-switch"
                  offColor="#09b1ba"
                  onColor="#09b1ba"
                  offHandleColor="#def"
                  uncheckedIcon={
                    <div
                      style={{
                        color: "pnk",
                        paddingTop: 2,
                        paddingLeft: 6,
                        fontSize: 20,
                      }}
                    ></div>
                  }
                  checkedIcon={
                    <div
                      style={{
                        paddingTop: 2,
                        paddingLeft: 6,
                        fontSize: 20,
                      }}
                    ></div>
                  }
                  checkedHandleIcon={
                    <div
                      style={{
                        color: "black",
                        paddingTop: 3,
                        paddingLeft: 10,
                        fontSize: 20,
                      }}
                    >
                      ⇣
                    </div>
                  }
                  uncheckedHandleIcon={
                    <div
                      style={{
                        color: "black",
                        paddingTop: 2,
                        paddingLeft: 9,
                        fontSize: 20,
                      }}
                    >
                      ⇡
                    </div>
                  }
                />
              </>
              <>
                <SortComponent values={values} setValues={setValues} />
              </>
            </div>
          )}
        </div>
      </div>

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
      <button className="sell-button" onClick={() => navigate("/publish")}>
        Vends tes articles
      </button>
    </header>
  );
};

export default Header;
