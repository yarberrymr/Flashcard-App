import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index";

function DeckView() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck(){
        
        const _deck = await readDeck(deckId, abortController.signal)
        setDeck(_deck);
        setCards(_deck.cards)
       
    } 
    getDeck();
    
    return () => abortController.abort();
}, [deckId])

  async function handleDeleteCard(id) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(id);
      setCards(() => cards.filter((card) => card.id !== id));
    }
  }
console.log(deck)
if(!deck) {
    return (
        <p>Loading...</p>
    )
} else {
  return (
    <div className="col-12">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Name
          </li>
        </ol>
      </nav>
      <div className="row">
          <div className="col-12">
        <h5>Name</h5>
        <p>Description</p>
        </div>
        <div className="col-11">
          <Link to="/" className="btn btn-secondary">Edit</Link>
          <Link to="/" className='btn btn-primary'>Study</Link>
          <Link to="/" className='btn btn-primary'>Add Cards</Link>
        </div>
        <div className="col-1" >
          <Link to="/" className="btn btn-danger delete-deck">&#x1F5D1;</Link>
        </div>
      </div>
      <h2>Cards</h2>
      <div className='card col-12' key={deck.id}>
      <div className='card-body'>
        <div className='row'>
          <h5 className='col-8 '>{deck.name}</h5>
          <p className='col-4 text-right'>{deck.cards.length} cards</p>
        </div>
        <p className='card-text'>{deck.description}</p>
        <div className='row'>
            <div className="col-11">
          <Link to={`/decks/${deck.id}`} className='btn btn-secondary'>
            &#x1F441; Edit
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
    </div>
  );
}
}

export default DeckView;
