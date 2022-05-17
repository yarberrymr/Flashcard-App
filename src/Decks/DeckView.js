import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck, listDecks } from "../utils/api/index";
import DeckViewCard from "./DeckViewCard";

function DeckView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const [decks, setDecks] = useState([]);
  const {url} = useRouteMatch();

  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        let _decks = await listDecks(abortController.signal);
        setDecks(_decks);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, []);

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
  async function handleDeleteDeck(id) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(id);
      setDecks(() => decks.filter((deck) => deck.id !== id));
    }
  }



if(!deck || !cards) {
    return (
        <p>Loading...</p>
    )
} else {
    const rows = cards.map((card) => DeckViewCard({deck, card, handleDeleteCard}))
  return (
    <div className="col-12">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="row">
          <div className="col-12">
        <h5>{deck.name}</h5>
        <p>{deck.description}</p>
        </div>
        <div className="col-10">
          <Link to={`${url}/edit`} className="btn btn-secondary">Edit</Link>
          <Link to={`${url}/study`} className='btn btn-primary'>Study</Link>
          <Link to={`${url}/cards/new`} className='btn btn-primary'>Add Cards</Link>
        </div>
        <div className="col-2 text-right" >
        <button
            className='btn btn-danger delete-deck'
            onClick={() => handleDeleteDeck(deck.id)}
          ><span>&#x1F5D1;</span></button>
        </div>
      </div>
      <h2>Cards</h2>
      <div className="col-12 mb-4">
          {rows}
      </div>
    </div>
  );
}
}

export default DeckView;
