import { Link } from "react-router-dom";

import Banner from "../assets/banner.jpg";

import axios from "axios";
import { useState, useEffect } from "react";

import BannerEffet from "../assets/tear.42d6cec6.svg";

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
    <div className="container">
      <main>
        <div className="banner-container">
          <div>
            <img src={Banner} className="banner" alt="banner" />
          </div>
          <div>
            <img src={BannerEffet} className="hero-block__overlay" />
          </div>
        </div>

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
                    <div className="informations-product-price">
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
  );
};

export default Home;
