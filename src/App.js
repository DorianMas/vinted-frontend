import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*Import des pages*/
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Subscription from "./pages/Subscription";

/*Import des composants*/

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Subscription />} />
      </Routes>
    </Router>
  );
}

export default App;
