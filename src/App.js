import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  const pandaEmojis = ["🐼", "🎋", "🍜", "🎍", "🏮", "🎎"];
  const gameCards = [...pandaEmojis, ...pandaEmojis];

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = gameCards
      .map((card, index) => ({ id: index, content: card, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setScore(0);
  };

  const handleCardClick = (cardId) => {
    if (
      flipped.length === 2 ||
      flipped.includes(cardId) ||
      matched.includes(cardId)
    ) {
      return;
    }

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].content === cards[secondId].content) {
        setMatched([...matched, firstId, secondId]);
        setScore(score + 1);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="App">
      <h1>🐼 Panda Memory Game 🐼</h1>
      <div className="game-info">
        <p>Score: {score}</p>
        <button onClick={shuffleCards}>New Game</button>
      </div>
      <div className="game-board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">❓</div>
              <div className="card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
