import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import StudyCard from "./StudyCard";

function StudyDeck() {
  //adds the ability to use history to push to different pages
  //adds the ability to pull the deckId from the url
  //adds the ability to set the state of multiple items used in the study section
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({});
  const [flipped, setFlipped] = useState(false);
  const [deckLength, setDeckLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(1);

  //triggers on load and on change of deck id
  //allows deck to be read, and set the state of the deck, card, length of the deck, and flipped
  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      const clickedDeck = await readDeck(deckId, abortController.signal);
      setDeck(clickedDeck);
      setCard(clickedDeck.cards[0]);
      setDeckLength(clickedDeck.cards.length);
      setFlipped(false);
    }
    getDeck();

    return () => abortController.abort();
  }, [deckId]);
  // handles flipping the card, called on click of flip button
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  // handleNextCard sets the current position of the cards, sets the state of current position, flipped, card
  // Also redirects home if selected on window confirm
  const handleNextCard = () => {
    setCurrentPosition(currentPosition + 1);
    setFlipped(!flipped);
    if (currentPosition !== deckLength) {
      setCard(deck.cards[currentPosition]);
    } else {
      const resp = window.confirm(
        "Restart cards? Click 'cancel' to return to the home page"
      );
      if (!resp) {
        history.push("/");
      } else {
        setCard(deck.cards[0]);
        setCurrentPosition(1);
        setFlipped(false);
      }
    }
  };

  //returns HTML with navbar, and study card components
  //also includes conditional rendering if enough cards are present
  if (!deck || !card) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">&#x1F3E0; Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
        <div className="cards">
          {deckLength > 2 && (
            <StudyCard
              flipped={flipped}
              handleFlip={handleFlip}
              card={card}
              length={deckLength}
              currentPosition={currentPosition}
              handleNextCard={handleNextCard}
            />
          )}
          {deckLength < 3 && (
            <div>
              <h2>Not enough cards.</h2>
              <p>
                You need at least 3 cards to study. There are {deckLength} cards
                in this deck
              </p>
              <Link to={`/decks/${deckId}/cards/new`}>
                <button className="btn btn-primary">Add Cards</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default StudyDeck;
