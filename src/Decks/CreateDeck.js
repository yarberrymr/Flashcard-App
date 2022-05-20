import React from "react";
import DeckForm from "./DeckForm";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  //allows for the use of history to push to different page
  const history = useHistory();

  //handles the creation of a new deck with an api call to createDeck
  //also pushes the page to the new deck view page
  function handleSubmit(deck) {
    const abortController = new AbortController();

    async function callCreateDeck() {
      try {
        const deckInfo = await createDeck(deck, abortController.signal);
        history.push(`/decks/${deckInfo.id}`);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }
    callCreateDeck();

    return () => {
      abortController.abort();
    };
  }

  //handles pushing to the home page when cancel is clicked
  function handleCancel() {
    history.push("/");
  }

  //returns the HTML to be rendered along with the DeckForm component to create the new deck

  return (
    <div>
      <div>
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">&#x1F3E0; Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Deck
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <h2>Create Deck</h2>
      <DeckForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </div>
  );
}

export default CreateDeck;
