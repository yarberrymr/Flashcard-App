import React, { useEffect, useState } from "react";

//takes in functions for save and done as well as the card object if
//editing an existing card
function CardForm({ handleSave, handleDone, card }) {
  //allows the state of the cardcontents to be set
  const [cardInfo, setCardInfo] = useState(card);

  //on load and when card changes, the card contents will be set
  useEffect(() => {
    setCardInfo(card);
  }, [card]);

  //function to be called on change of the input fields
  //sets the card contents to the new contents from the form
  const updateForm = (event) => {
    const { name, value } = event.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  //on submit from the form, the handle save function is
  //called to create/edit the card with the new card contents
  //clears the form when the card is saved
  const submit = (event) => {
    event.preventDefault();
    handleSave(cardInfo);
    setCardInfo({});
  };

  //returns HTML content of the form for card edit/creation
  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          type="text"
          id="front"
          name="front"
          placeholder="Front side of card"
          value={cardInfo?.front || ""}
          onChange={updateForm}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          name="back"
          id="back"
          placeholder="Back side of card"
          value={cardInfo?.back || ""}
          onChange={updateForm}
          required
        ></textarea>
        <button className="btn btn-secondary my-2 mr-1" onClick={handleDone}>
          Done
        </button>
        <button type="submit" className="btn btn-primary my-2">
          Save
        </button>
      </div>
    </form>
  );
}

export default CardForm;
