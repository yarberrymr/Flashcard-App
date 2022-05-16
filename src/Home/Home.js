import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckCardInfo from "./DeckCardInfo";
import { listDecks, deleteDeck } from "../utils/api/index";


function Home() {
  const [decks, setDecks] = useState([]);

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

 
  async function handleDeleteDeck(id) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(id);
      setDecks(() => decks.filter((deck) => deck.id !== id));
    }
  }

  
  const rows = decks.map((deck) => DeckCardInfo({ deck, handleDeleteDeck }));


  return (
    <>
      <div className='row'>
        <Link to='/decks/new' className='btn btn-secondary'>
        <span>&#43;</span>Create Deck
        </Link>
      </div>
      <div className='row'>{rows}</div>
    </>
  );
}

export default Home;
