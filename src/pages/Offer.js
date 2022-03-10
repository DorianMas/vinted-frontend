import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  /*Création d'un état pour récupérer les données Json*/
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  console.log("id =>", id);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log("response.data =>", response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
      console.log("Effect executed");
    } catch (error) {
      console.log(error);
    }
  }, [id, isLoading]);

  return isLoading ? (
    <div>En cours de rechargement...</div>
  ) : (
    <body>
      <div className="container-Offer">
        <div className="main-Offer">
          <div className="results-product">
            <img
              src={data.product_image.secure_url}
              className="selected-product-illustration"
            />
            <div className="details-result">
              <p className="price-product">{data.product_price} €</p>
              <div className="details-result-product">
                {data.product_details.map((info, index) => {
                  const keys = Object.keys(info);
                  return (
                    <div className="list-details-product">
                      <p>{keys[0]}</p>
                      <span>{info[keys[0]]}</span>
                    </div>
                  );
                })}
              </div>
              <div className="divider"></div>
              <div>
                <p className="name-product">{data.product_name}</p>
                <br />
                <p>{data.product_description}</p>
              </div>
              <div>
                {data.owner.account.avatar !== undefined ? (
                  <img
                    className="avatar-picture-offer"
                    src={data.owner.account.avatar.secure_url}
                  />
                ) : (
                  <span></span>
                )}

                <span>{data.owner.account.username}</span>
              </div>
              <div>
                <Link
                  to="/payment"
                  state={{
                    title: data.product_name,
                    price: data.product_price,
                  }}
                >
                  <button className="buy-button">Acheter</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Offer;
