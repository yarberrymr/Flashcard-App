import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import StudyCard from "./StudyCard";

function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckLength, setDeckLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(1);

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck(){
        
        const _deck = await readDeck(deckId, abortController.signal)
        setDeck(_deck);
        setCard(_deck.cards[0])
        setDeckLength(_deck.cards.length)
        setIsFlipped(false);
    } 
    getDeck();
    
    return () => abortController.abort();
}, [deckId])
// flip handler handles flips of the card
const flipHandler = () =>{
    setIsFlipped(!isFlipped)
}
// nextCardHandler sets the current position of the cards, sets the state of currentPos, isFlipped, card. 
// Also redirects home if selected
const nextCardHandler = () =>{
  setCurrentPosition(currentPosition + 1)
  setIsFlipped(!isFlipped)
  if(currentPosition !== deck.cards.length){
      setCard(deck.cards[currentPosition])
  }
  else{
      const resp = window.confirm("Restart cards? Click 'cancel' to return to the home page");
      if (!resp){
          history.push("/");
      }else{
          setCard(deck.cards[1])
          setCurrentPosition(1);
          setIsFlipped(false);
      }
  }
  
  
}

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
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
            isFlipped={isFlipped}
            flipHandler={flipHandler}
            card={card}
            length={deckLength}
            currentPosition={currentPosition}
            nextCardHandler={nextCardHandler}
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

export default StudyDeck;
