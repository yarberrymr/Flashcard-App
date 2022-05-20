import React, { useState, useEffect } from "react";
import DeckForm from "./DeckForm";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function EditDeck() {
  //allows the ability to use history to push to different page
  //allows the ability to set the state of deck to enable editing
  //allows the use of the deckId piece of the url for reading the deck
  const history = useHistory();
  const [deck, setDeck] = useState();
  const { deckId } = useParams();

  //loads a single deck on load of the page and as deckId changes
  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      const chosenDeck = await readDeck(deckId, abortController.signal);
      setDeck(chosenDeck);
    }
    getDeck();

    return () => abortController.abort();
  }, [deckId]);

  //passed into the DeckForm and called in DeckForm when the form is submitted
  //calls updateDeck with the updated deck
  function handleSubmit(deck) {
    const abortController = new AbortController();

    async function callUpdateDeck() {
      try {
        const deckInfo = await updateDeck(deck, abortController.signal);
        history.push(`/decks/${deckInfo.id}`);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }
    callUpdateDeck();

    return () => {
      abortController.abort();
    };
  }

  //passed into the DeckForm and called in DeckForm when the cancel button is clicked
  //takes the user to the deck view page for that deck
  function handleCancel() {
    history.push(`/decks/${deck.id}`);
  }

  //conditional rendering to show loading... until the deck is read and loaded
  //once the deck is read and loaded, the DeckForm is displayed
  if (!deck) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <div>
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">&#x1F3E0; Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Edit Deck
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <h2>Edit Deck</h2>
        <DeckForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          deck={deck}
        />
      </div>
    );
  }
}

export default EditDeck;
