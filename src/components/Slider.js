import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";

const Slider = ({ cards, reports, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState([]);
  const slideContainer = useRef(null);

  useEffect(() => {
    const initialCards = cards.slice(0, 3);
    setCardsToShow(initialCards);
  }, [cards]);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % cards.length;
    const newCards = [
      cards[newIndex],
      cards[(newIndex + 1) % cards.length],
      cards[(newIndex + 2) % cards.length],
    ];
    setCurrentIndex(newIndex);
    setCardsToShow(newCards);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    const newCards = [
      cards[(newIndex - 1 + cards.length) % cards.length],
      cards[newIndex],
      cards[(newIndex + 1) % cards.length],
    ];
    setCurrentIndex(newIndex);
    setCardsToShow(newCards);
  };

  return (
    <div className="flex items-center justify-around w-2/3 bg-cyan-500 h-full rounded-xl p-5">
      <button className="button" onClick={handlePrev}>
        &#10094;
      </button>
      <div
        className="flex flex-nowrap overflow-x-hidden w-full scroll-smooth justify-around"
        ref={slideContainer}
      >
        {cardsToShow.length > 0 ? (
          cardsToShow.map((card, index) => (
            <Card type={type} card={card} reports={reports} key={index} />
          ))
        ) : (
          <p className="text-2xl">No cards to show.</p>
        )}
      </div>

      <button className="button" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
