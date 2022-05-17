import React from "react";
import { Link } from "react-router-dom";

function DeckViewCard({deck, card, handleDeleteCard}) {
    return (
<div className='card col-12' key={card.id}>
      <div className='card-body'>
        <div className='row'>
          <h5 className='col-6 '>{card.front}</h5>
          <p className='col-6 text-right'>{card.back} cards</p>
        </div>
        <div className='row'>
            <div className="col-11 text-right">
          <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className='btn btn-secondary'>
            Edit
          </Link>
          </div>
          <button
            className='btn btn-danger delete-deck col-1'
            onClick={() => handleDeleteCard(deck.id)}
          ><span>&#x1F5D1;</span>
          </button>
        </div>
      </div>
    </div>
    )
}

export default DeckViewCard;