import React from "react";
import { Link } from "react-router-dom";

//takes in a deck, card, and function to handle deleting a card
function DeckViewCard({deck, card, handleDeleteCard}) {
  
  //returns the HTML for the cards contained in a deck
    return (
<div className='card col-12 mb-1' key={card.id}>
      <div className='card-body'>
        <div className='row'>
          <h5 className='col-6 '>{card.front}</h5>
          <p className='col-6 text-right'>{card.back}</p>
        </div>
        <div className='row'>
            <div className="col-11 text-right">
          <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className='btn btn-secondary'>
          &#x1F58A; Edit
          </Link>
          </div>
          <button
            className='btn btn-danger delete-deck col-1'
            onClick={() => handleDeleteCard(card.id)}
          ><span>&#x1F5D1;</span>
          </button>
        </div>
      </div>
    </div>
    )
}

export default DeckViewCard;