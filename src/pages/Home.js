import { Link } from "react-router-dom";

import Banner from "../assets/banner.jpg";

import Header from "../components/Header";

import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  /*Création d'un état pour récupérer les données Json*/
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
    console.log("Effect executed");
  }, []);

  return isLoading ? (
    <div>En cours de rechargement...</div>
  ) : (
    <body>
      <div className="container">
        <Header />
        <main>
          <img src={Banner} className="banner" alt="banner" />
          <div className="products-bloc">
            {data.offers.map((offer, index) => {
              return (
                <div className="product">
                  {offer.product_pictures.map((picture, index) => {
                    return <img src={picture.secure_url[1]} />;
                  })}
                </div>
              );
            })}
          </div>
        </main>
      </div>
      <Link to={"/offer"}>Go to product with Link</Link>
    </body>
  );
};

export default Home;
