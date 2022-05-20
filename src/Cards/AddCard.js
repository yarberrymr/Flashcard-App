import React, { useState, useEffect } from "react";
import CardForm from "./CardForm";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function AddCard() {
  //allows for the use of history to push to different page
  //allows for the use of params to set deckId from the url
  //allows state of deck to be set
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  //on load of the page and on change of deckId, reads the chosen deck
  //sets the state of deck with the read deck
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
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

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  //handles the creation of a new cardwith an api call to createCard
  async function handleSave(card) {
    try {
      await createCard(deckId, card);
    } catch (error) {
      throw error;
    }
  }

  //handles pushing to the deck page when done is clicked
  function handleDone() {
    history.push(`/decks/${deckId}`);
  }

  //returns the HTML to be rendered along with the CardForm component to create the new card
  //conditionally renders the page to avoid errors
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
        <CardForm handleSave={handleSave} handleDone={handleDone} />
      </div>
    );
  }
}

export default AddCard;
