import React, { useState, useEffect } from "react";
import CardForm from "./CardForm";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api";

function EditCard() {
  //allows the ability to use history to push to different page
  //allows the ability to set the state of deck and card to enable editing
  //allows the use of the deckId and cardId piece of the url for reading the deck and card
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();

  //loads a single deck on load of the page and as deckId changes
  useEffect(() => {
    const abortController = new AbortController();

    async function loadCard() {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setDeck(deckInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }

    loadCard();

    return () => abortController.abort();
  }, [deckId]);

  //loads a single card on load of the page and as cardId changes
  useEffect(() => {
    const abortController = new AbortController();

    async function loadCard() {
      try {
        const cardInfo = await readCard(cardId, abortController.signal);
        setCard(cardInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }

    loadCard();

    return () => abortController.abort();
  }, [cardId]);

  //passed into the CardForm and called in CardForm when the form is submitted
  //calls updateCard with the updated card information
  async function handleSave(card) {
    try {
      await updateCard(card);
      history.push(`/decks/${deckId}`);
    } catch (err) {
      throw err;
    }
  }

  //passed into the CardForm and called in CardForm when the done button is clicked
  //takes the user to the deck view page for that deck
  function handleDone() {
    history.push(`/decks/${deckId}`);
  }

  //conditional rendering to show loading... until the card is read and loaded
  //once the card is read and loaded, the CardForm is displayed
  if (!deck) {
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
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Add Card</h1>
        <CardForm handleSave={handleSave} handleDone={handleDone} card={card} />
      </div>
    );
  }
}

export default EditCard;
