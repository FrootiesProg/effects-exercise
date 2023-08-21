import React from "react";

// Component for controlling the card drawing and shuffling
const DeckControls = ({
  startDrawing,
  stopDrawing,
  shuffleDeck,
  isDrawing,
  isShuffling,
}) => {
  return (
    <div className="deck-controls">
      {/* Toggle button for drawing */}
      {isDrawing ? (
        <button onClick={stopDrawing} disabled={isShuffling}>
          Stop Drawing
        </button>
      ) : (
        <button onClick={startDrawing} disabled={isShuffling}>
          Start Drawing
        </button>
      )}

      {/* Button for shuffling */}
      <button onClick={shuffleDeck} disabled={isShuffling}>
        Shuffle Deck
      </button>
    </div>
  );
};

export default DeckControls;
