import React, { useEffect, useState } from "react";

//takes in functions for submit and cancel as well as the deck object if
//editing an existing deck
function DeckForm({ handleSubmit, handleCancel, deck }) {
  //allows the state of the deck contents to be set
  const [deckInfo, setDeckInfo] = useState(deck);

  //on load and when deck changes, the deck contents will be set
  useEffect(() => {
    setDeckInfo(deck);
  }, [deck]);

  //function to be called on change of the input fields
  //sets the deck contents to the new contents from the form
  const updateForm = (event) => {
    const { name, value } = event.target;
    setDeckInfo({ ...deckInfo, [name]: value });
  };

  //on submit from the form, the handle submit function is
  //called to create/edit the deck with the new deck contents
  const submit = (event) => {
    event.preventDefault();
    handleSubmit(deckInfo);
  };

  //returns HTML content of the form for deck edit/creation
  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Deck Name"
          value={deckInfo?.name || ""}
          onChange={updateForm}
          required
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          rows="4"
          className="form-control"
          id="description"
          name="description"
          placeholder="Brief description of the deck"
          value={deckInfo?.description || ""}
          onChange={updateForm}
          required
        />
      </div>
      <button className="btn btn-secondary my-2 mr-1" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary my-2">
        Submit
      </button>
    </form>
  );
}

export default DeckForm;
