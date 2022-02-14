import axios from "axios";
import { useState } from "react";

import { Navigate } from "react-router-dom";

const Publish = (props) => {
  const { token, data, setData } = props;

  /*Déclaration de UseStates relatifs aux champs du formulaire*/
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(1);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // créer un objet de type FormData
      const data = new FormData();
      // ajouter les paires clé/valeur
      data.append("picture", file);
      data.append("title", title);
      data.append("description", description);
      data.append("brand", brand);
      data.append("size", size);
      data.append("color", color);
      data.append("condition", state);
      data.append("city", city);
      data.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log("Publish error ===> ", error.message);
      console.log("Catch error ===> ", error.response);
    }
  };

  return token === null ? (
    <Navigate to="/login" />
  ) : (
    <div className="publish-page">
      <div className="publish-bloc">
        <h2>Vends ton article</h2>
        <div className="publish-section">
          <div className="publish-add-container">
            <input
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
              className="publish-add-file-button"
            />
            <label for="file">
              <span>+ </span> Ajoute une photo
            </label>
          </div>
          <div className="publish-title-container">
            <div>
              <span>Titre</span>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Décris ton article</span>
              <input
                type="text"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-description-container">
            <div>
              <span>Marque</span>
              <input
                type="text"
                placeholder="ex: Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Taille</span>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Couleur</span>
              <input
                type="text"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Etat</span>
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  setState(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Lieu</span>
              <input
                type="text"
                placeholder="ex: Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-price-container">
            <div>
              <div>
                <span>Prix</span>
                <input
                  type="number"
                  placeholder="0,00 €"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </div>
              <div>
                <input type="checkbox" />
                <span>Je suis intéresssé(e) par les échanges</span>
              </div>
            </div>
          </div>
        </div>
        <div className="publish-button-container">
          <button className="publish-button" onClick={handleSubmit}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
