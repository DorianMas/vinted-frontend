import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

/*Import des pages*/
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";

import Cookies from "js-cookie";

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

  const [isLoading, setIsLoading] = useState(true);

  /*Création d'un état pour récupérer les données Json*/
  const [data, setData] = useState();

  /* Déclaration d'un UseState pour la barre de recherche*/
  const [searchTerm, setSearchTerm] = useState("");

  /* Déclaration des deux UseState pour afficher les résultats par prix (croissant/décroissant) */
  const [checked, setChecked] = useState(false);

  const [sort, setSort] = useState("price-asc");

  /*Création d'un état pour intégrer une pagination des produits*/
  const [page, setPage] = useState(1);
  const limit = 6;

  /*Création d'un état pour le tri min/max */
  const [values, setValues] = useState([20, 100]);

  return (
    <Router>
      <Header
        tokenUser={tokenUser}
        token={token}
        setSearchTerm={setSearchTerm}
        checked={checked}
        setChecked={setChecked}
        sort={sort}
        setSort={setSort}
        values={values}
        setValues={setValues}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              setData={setData}
              searchTerm={searchTerm}
              sort={sort}
              setSort={setSort}
              checked={checked}
              setChecked={setChecked}
              page={page}
              setPage={setPage}
              limit={limit}
              values={values}
            />
          }
        />
        <Route path="/signup" element={<Signup tokenUser={tokenUser} />} />
        <Route path="/login" element={<Login tokenUser={tokenUser} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/offer/:id" element={<Offer />} />

        <Route
          path="/payment"
          element={<Payment tokenUser={tokenUser} token={token} />}
        />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
