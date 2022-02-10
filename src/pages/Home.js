import { Link } from "react-router-dom";

import Banner from "../assets/banner.jpg";

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
        <main>
          <img src={Banner} className="banner" alt="banner" />
          <div className="products-bloc">
            {data.offers.map((offer, index) => {
              return (
                <Link to={`/offer/${offer._id}`}>
                  <div className="product">
                    <div className="avatar">
                      <img
                        src={offer.owner.account.avatar.secure_url}
                        className="avatar-picture"
                      />
                      <span>{offer.owner.account.username}</span>
                    </div>
                    <img
                      className="product-illustration"
                      key={index}
                      src={offer.product_image.secure_url}
                    />
                    <div className="informations-product">
                      <div className="informations-product-firstline">
                        <span>{offer.product_price} €</span>
                        {/* <FontAwesomeIcon icon="fal fa-info-circle" /> */}
                      </div>
                      <div className="informations-product-secondline">
                        {offer.product_details.map((elem, index) => {
                          return (
                            <>
                              <span>{elem.TAILLE && <p>{elem.TAILLE}</p>}</span>
                              <span>{elem.MARQUE}</span>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </body>
  );
};

export default Home;
