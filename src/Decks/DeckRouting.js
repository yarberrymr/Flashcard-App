import React from "react";
import { Switch, Route } from "react-router-dom";
import StudyDeck from "../Study/StudyDeck";
import CreateDeck from "./CreateDeck"
import DeckView from "./DeckView"
import EditDeck from "./EditDeck"
import AddCard from "../Cards/AddCard"

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
          <Route path={"/decks/:deckId/study"} exact={true}>
            <StudyDeck />
          </Route>
          <Route path={"/decks/:deckId"} exact={true}>
            <DeckView />
          </Route>
        </Switch>
      );
}
export default DeckRouting;