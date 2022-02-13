import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

/*Import des pages*/
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Cookies from "js-cookie";

/*Import des composants*/

function App() {
  /*Ajouts des cookies*/
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const tokenUser = (token) => {
    if (token) {
      //Gestion du cookie
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  /* Déclaration d'un UseState pour la barre de recherche*/
  const [searchTerm, setSearchTerm] = useState("");

  /* Déclaration des deux UseState pour afficher les résultats par prix (croissant/décroissant) */
  const [toggle, setToggle] = useState(false);
  const [sort, setSort] = useState("price-asc");

  return (
    <Router>
      <Header
        tokenUser={tokenUser}
        token={token}
        setSearchTerm={setSearchTerm}
        togle={toggle}
        setToggle={setToggle}
        sort={sort}
        setSort={setSort}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTerm={searchTerm}
              sort={sort}
              setSort={setSort}
              toggle={toggle}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup tokenUser={tokenUser} />} />
        <Route path="/login" element={<Login tokenUser={tokenUser} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
