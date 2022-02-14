import { Link } from "react-router-dom";

import Banner from "../assets/banner.jpg";

import axios from "axios";
import { useState, useEffect } from "react";

import BannerEffet from "../assets/tear.42d6cec6.svg";

const Home = (props) => {
  const { searchTerm, toggle, setSort, sort, page, setPage, limit } = props;

  const [isLoading, setIsLoading] = useState(true);

  /*Création d'un état pour récupérer les données Json*/
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (toggle === false) {
        setSort("price-asc");
      } else {
        setSort("price-desc");
      }

      if (searchTerm) {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchTerm}&sort=${sort}`
        );
        console.log("console.log de response.data==> ", response.data);
        setData(response.data);
        setIsLoading(false);
      } else {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=${sort}&limit=${limit}&page=${page}`
        );
        console.log("console.log de response.data==> ", response.data);
        setData(response.data);
        setIsLoading(false);
      }
    };
    fetchData();
    console.log("Effect executed");
  }, [searchTerm, sort, setSort, toggle, page]);

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
        <div className="pagination-container">
          {page === 1 ? (
            <>
              <button>Page précédente</button>
              <button onClick={() => setPage(page + 1)}>Page suivante</button>
            </>
          ) : page === 6 ? (
            <>
              <button onClick={() => setPage(page - 1)}>Page précédente</button>
              <button>Page suivante</button>
            </>
          ) : (
            <>
              <button onClick={() => setPage(page - 1)}>Page précédente</button>{" "}
              <button onClick={() => setPage(page + 1)}>Page suivante</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
