import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home"
import { Switch, Route } from "react-router-dom";
import DeckRouting from "../Decks/DeckRouting"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
           <Home />
          </Route> 
          <Route path='/decks/:deckId'>
            <DeckRouting />
          </Route>
          <Route path="/">
            <NotFound /> 
          </Route> 
        </Switch>
      </div>
    </>
  );
}

export default Layout;
