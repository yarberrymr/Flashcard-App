import React, { useEffect, useState } from "react";
import DeckForm from "./DeckForm";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState([]);

  async function handleCreateDeck() {
    // await createDeck();
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
      <DeckForm handleFunction={handleCreateDeck()} />
    </div>
  );
}

export default CreateDeck;
