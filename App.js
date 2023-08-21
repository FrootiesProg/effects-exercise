import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
import CardDisplay from './CardDisplay';
import DeckControls from './DeckControls';

function App() {
  // State variables
  const [deckId, setDeckId] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [remainingCards, setRemainingCards] = useState(0);
  const intervalRef = useRef(null);

  // Initialize the deck
  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
      .then(response => response.json())
      .then(data => {
        setDeckId(data.deck_id);
        setRemainingCards(data.remaining);
      });
  }, []);

  // Handle card drawing interval
  useEffect(() => {
    if (isDrawing) {
      intervalRef.current = setInterval(drawCard, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isDrawing]);

  // Draw a card from the deck
  const drawCard = () => {
    if (deckId) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            if (data.remaining === 0) {
              setIsDrawing(false);
              alert('Error: no cards remaining!');
            } else {
              setCurrentCard(data.cards[0]);
              setRemainingCards(data.remaining);
            }
          } else {
            setIsDrawing(false);
            alert('Error: no cards remaining!');
          }
        });
    }
  };

  // Toggle card drawing
  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
    if (!isDrawing) {
      drawCard(); // Draw immediately when starting
    }
  };

  // Shuffle the deck
  const shuffleDeck = () => {
    if (deckId) {
      setIsShuffling(true);
      setCurrentCard(null);

      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(() => {
          setIsShuffling(false);
          setRemainingCards(52); // Reset the remaining cards count
        });
    }
  };

  // Render the app
  return (
    <div className="app">
      <h1>Deck of Cards App</h1>
      <CardDisplay card={currentCard} />
      <p className="card-counter">Remaining Cards: {remainingCards}</p>
      <DeckControls
        startDrawing={toggleDrawing}
        stopDrawing={toggleDrawing}
        shuffleDeck={shuffleDeck}
        isDrawing={isDrawing}
        isShuffling={isShuffling}
      />
    </div>
  );
}

export default App;
