import React, { useState, useEffect } from "react";
import DeckForm from "./DeckForm";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function EditDeck() {
    const history = useHistory()
    const [deck, setDeck] = useState();
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
    
        async function getDeck(){
            
            const _deck = await readDeck(deckId, abortController.signal)
            setDeck(_deck);
        } 
        getDeck();
        
        return () => abortController.abort();
    }, [deckId])
 
    function handleSubmit(deck) {
        const abortController = new AbortController();
    
        async function callUpdateDeck() {
          try {
            const deckInfo = await updateDeck(deck, abortController.signal);
            history.push(`/decks/${deckInfo.id}`);
          } catch (err) {
            if (err.name === "AbortError") {
              console.info("aborted");
            } else {
              throw err;
            }
          }
        }
        callUpdateDeck();
    
        return () => {
          abortController.abort();
        };
      }
  
  function handleCancel() {
    history.push(`/decks/${deck.id}`);
  }
  if(!deck) {
    return (
        <p>Loading...</p>
    )
} else {
  return (
    <div>
      <div>
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
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
      <DeckForm handleSubmit={handleSubmit} handleCancel={handleCancel} deck={deck} />
    </div>
  );
}
}

export default EditDeck;
