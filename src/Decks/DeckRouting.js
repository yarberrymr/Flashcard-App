import React from "react";
import { Switch, Route } from "react-router-dom";
import StudyDeck from "../Study/StudyDeck";
import CreateDeck from "./CreateDeck";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";

//holds the routes for various components that are displayed
//and rendered at various times in the application
function DeckRouting() {
  return (
    <Switch>
      <Route exact={true} path="/decks/new">
        <CreateDeck />
      </Route>
      <Route exact={true} path="/decks/:deckId/edit">
        <EditDeck />
      </Route>
      <Route exact={true} path="/decks/:deckId/cards/new">
        <AddCard />
      </Route>
      <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
        <EditCard />
      </Route>
      <Route exact={true} path={"/decks/:deckId/study"}>
        <StudyDeck />
      </Route>
      <Route exact={true} path={"/decks/:deckId"}>
        <DeckView />
      </Route>
    </Switch>
  );
}
export default DeckRouting;
