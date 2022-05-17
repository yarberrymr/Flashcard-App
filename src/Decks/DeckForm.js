import React from "react";
import { Link } from "react-router-dom";


function DeckForm({
  name = "Deck Name",
  description = "Brief description of the deck",
  handleFunction
}) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="DeckName">Name</label>
        <input
          type="text"
          className="form-control"
          id="DeckName"
          placeholder={`${name}`}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="DeckDescription">Description</label>
        <textarea
          rows="4"
          className="form-control"
          id="DeckDescription"
          placeholder={`${description}`}
        />
      </div>
      <Link to="/" className="btn btn-secondary">
        Cancel
      </Link>
      <Link to="/" className="btn btn-primary ml-2" onClick={() => handleFunction()} >
        Submit
      </Link>
    </form>
  );
}

export default DeckForm;
