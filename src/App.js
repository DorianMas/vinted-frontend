import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

/*Import des pages*/
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";

/*Import des composants*/

function App() {
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

  return (
    <Router>
      <Header tokenUser={tokenUser} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup tokenUser={tokenUser} />} />
        <Route path="/login" element={<Login tokenUser={tokenUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
