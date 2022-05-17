import React from "react";
import DeckForm from "./DeckForm";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    const history = useHistory()
 
    function handleSubmit(deck) {
        const abortController = new AbortController();
    
        async function callCreateDeck() {
          try {
            const deckInfo = await createDeck(deck, abortController.signal);
            history.push(`/decks/${deckInfo.id}`);
          } catch (err) {
            if (err.name === "AbortError") {
              console.info("aborted");
            } else {
              throw err;
            }
          }
        }
        callCreateDeck();
    
        return () => {
          abortController.abort();
        };
      }
  
  function handleCancel() {
    history.push("/");
  }

  return (
    <div>
      <div>
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
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
