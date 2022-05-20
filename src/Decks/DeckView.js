import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch, useHistory } from "react-router-dom";
import {
  readDeck,
  deleteCard,
  deleteDeck,
  listDecks,
} from "../utils/api/index";
import DeckViewCard from "./DeckViewCard";

function DeckView() {
  //allows for the use of history to navigate to a specific page
  //allows the use of params to get the deckId from the url to use
  //allows the use of state to hold various information for the component
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const [decks, setDecks] = useState([]);
  const { url } = useRouteMatch();

  //lists all stored decks on load of the page, happens once
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

  //reads the deck that was clicked on using the deckId from the url
  //sets the state for deck and cards useing the chosenDeck
  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      const chosenDeck = await readDeck(deckId, abortController.signal);
      setDeck(chosenDeck);
      setCards(chosenDeck.cards);
    }
    getDeck();
    return () => abortController.abort();
  }, [deckId]);

  //function to delete card when a button is clicked
  //passed into function to map cards into rows
  async function handleDeleteCard(id) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(id);
      setCards(() => cards.filter((card) => card.id !== id));
    }
  }

  //function to delete deck when a button is clicked
  //returns user to home page when confirmed
  async function handleDeleteDeck(id) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(id);
      setDecks(() => decks.filter((deck) => deck.id !== id));
      history.push("/");
    }
  }

  //conditional rendering to show loading... until the deck and cards are read and loaded
  //once they are loaded, the navbar is displayed along with card rows and buttons
  //the buttons allow for editing, studying, and deleting
  if (!deck || !cards) {
    return <p>Loading...</p>;
  } else {
    const rows = cards.map((card) =>
      DeckViewCard({ deck, card, handleDeleteCard })
    );
    return (
      <div className="col-12">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">&#x1F3E0; Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <div className="row mb-1">
          <div className="col-12">
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
          </div>
          <div className="col-10">
            <Link to={`${url}/edit`} className="btn btn-secondary mr-1">
              &#x1F58A; Edit
            </Link>
            <Link to={`${url}/study`} className="btn btn-primary mr-1">
              &#x1F4D6; Study
            </Link>
            <Link to={`${url}/cards/new`} className="btn btn-primary">
              &#x2795; Add Cards
            </Link>
          </div>
          <div className="col-2 text-right">
            <button
              className="btn btn-danger delete-deck"
              onClick={() => handleDeleteDeck(deck.id)}
            >
              <span>&#x1F5D1;</span>
            </button>
          </div>
        </div>
        <h2>Cards</h2>
        <div className="col-12 mb-4">{rows}</div>
      </div>
    );
  }
}

export default DeckView;
