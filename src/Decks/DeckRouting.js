import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import StudyDeck from "../Study/StudyDeck";
import CreateDeck from "./CreateDeck"
import DeckView from "./DeckView"

function DeckRouting() {
    return (
        <Switch>
          <Route exact={true} path="/decks/new">
            <CreateDeck />
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