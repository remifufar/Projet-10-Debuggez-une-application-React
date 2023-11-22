import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // changement du comparateur < en > pour trier dans le bon sens
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      // Ajout du +1 pour vérifier si la prochaine carte à afficher est la dernière carte du slider
      () => setIndex(index +1 < byDateDesc.length ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // modif de la place de la key
        <div key={event.title}>
          <div 
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            {/* Ajout d'un alt unique */}
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Changement de _ par Item (bouton) */}
              {byDateDesc.map((Item, radioIdx) => (
                <input
                // clé construite en utilisant le titre de l'élément dotItem
                  key={`radio-${Item.title}`}
                  type="radio"
                  name="radio-button"
                  // index à la place de idx pour associer l'index au radioIdx
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
