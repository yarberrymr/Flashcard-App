import React from "react";
import { Link } from "react-router-dom";

//takes in the current deck and the function to delete deck
function DeckCardInfo({ deck, handleDeleteDeck }) {
  return (
    <div className="card col-12 mb-1" key={deck.id}>
      <div className="card-body">
        <div className="row">
          <h5 className="col-8 ">{deck.name}</h5>
          <p className="col-4 text-right">{deck.cards.length} cards</p>
        </div>
        <p className="card-text">{deck.description}</p>
        <div className="row">
          <div className="col-11">
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">
              &#x1F441; View
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
              &#x1F4D6; Study
            </Link>
          </div>
          <button
            className="btn btn-danger delete-deck col-1"
            onClick={() => handleDeleteDeck(deck.id)}
          >
            <span>&#x1F5D1;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckCardInfo;
