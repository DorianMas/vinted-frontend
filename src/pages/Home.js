import { Link } from "react-router-dom";

import Banner from "../assets/banner.jpg";

import axios from "axios";
import { useState, useEffect } from "react";

import BannerEffet from "../assets/tear.42d6cec6.svg";

const Home = (props) => {
  const {
    data,
    setData,
    searchTerm,
    checked,
    setChecked,
    setSort,
    sort,
    page,
    setPage,
    limit,
    values,
    setValues,
  } = props;

  console.log(data);

  let counterPage;
  // console.log("Nombre de produits =>", counterPage);
  let roundTotalPages;
  // console.log("Nombre de pages à l'arrondi =>", roundTotalPages);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (checked === false) {
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
        counterPage = response.data.count;
        roundTotalPages = Math.ceil(counterPage / limit);
        setIsLoading(false);
      } else {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=${sort}&limit=${limit}&page=${page}&priceMin=${values[0]}&priceMax=${values[1]}`
        );
        console.log("console.log de response.data==> ", response.data);
        setData(response.data);
        counterPage = response.data.count;
        roundTotalPages = Math.ceil(counterPage / limit);
        console.log(roundTotalPages);
        setIsLoading(false);
      }
    };
    fetchData();
    console.log("Effect executed");
  }, [
    searchTerm,
    sort,
    setChecked,
    checked,
    page,
    setSort,
    values,
    setValues,
    limit,
  ]);
  // console.log(data);
  // console.log(limit);
  // console.log(data.count);

  console.log("Nombre de page ==>", page);

  const handlePreviousPage = () => {
    if (page === 1) {
      <span></span>;
    } else {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page > roundTotalPages) {
      <span></span>;
    } else {
      setPage(page + 1);
    }
    console.log("Nombre de page ==>", page);
    console.log("Page maximum ==>", roundTotalPages);
  };

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
                    {offer.owner.account.avatar ? (
                      <img
                        src={offer.owner.account.avatar.secure_url}
                        className="avatar-picture"
                      />
                    ) : (
                      <span></span>
                    )}
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
          {searchTerm ? (
            <span></span>
          ) : (
            <>
              <button
                className="pagination-button"
                onClick={handlePreviousPage}
              >
                Page précédente
              </button>
              <span>{page}</span>
              <button className="pagination-button" onClick={handleNextPage}>
                Page suivante
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
