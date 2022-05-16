import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import StudyDeck from "../Study/StudyDeck";

function DeckRouting() {
    return (
        <Switch>
          <Route path={"/decks/:deckId/study"} exact={true}>
            <StudyDeck />
          </Route>
        </Switch>
      );
}
export default DeckRouting;