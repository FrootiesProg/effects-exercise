import React from "react";

// Component for displaying a single card
const CardDisplay = ({ card }) => {
  return (
    <div className="card">
      {/* Display the card image */}
      {card ? (
        <img src={card.image} alt={`${card.value} of ${card.suit}`} />
      ) : (
        <p>No cards remaining!</p>
      )}
    </div>
  );
};

export default CardDisplay;
