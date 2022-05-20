import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckCardInfo from "./DeckCardInfo";
import { listDecks, deleteDeck } from "../utils/api/index";

function Home() {
  //set state for decks to be able to display them
  const [decks, setDecks] = useState([]);

  //load the decks on the loading of the home page
  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        let listedDecks = await listDecks(abortController.signal);
        setDecks(listedDecks);
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

  //handles deleting a deck from the list of decks; called on click of the delete button
  async function handleDeleteDeck(id) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(id);
      setDecks(() => decks.filter((deck) => deck.id !== id));
    }
  }

  //mapping the list of decks into the proper card display
  const rows = decks.map((deck) => DeckCardInfo({ deck, handleDeleteDeck }));

  //return the HTML elements containing the decks display
  if (!decks) {
    return <p>Loading...</p>;
  } else {
  return (
    <>
      <div className="row mb-2">
        <Link to="/decks/new" className="btn btn-secondary">
          &#x2795; Create Deck
        </Link>
      </div>
      <div className="row">{rows}</div>
    </>
  );
  }
}

export default Home;
