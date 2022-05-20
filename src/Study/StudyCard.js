import React from "react";

//takes in functions for buttons and the current card that is being rendered
function StudyCard({
  card,
  flipped,
  length,
  handleFlip,
  currentPosition,
  handleNextCard,
}) {
  //return the HTML for each card that is to be studied, including buttons
  //and conditional rendering to show either the front or back of the cards
  return (
    <div className="card" style={{ width: "600px" }}>
      <div className="card-body container">
        <h4>
          Card {currentPosition} of {length}
        </h4>
        <div className="row">
          <div className="col">
            <p className="card-text">{flipped ? card.back : card.front}</p>
            <button className="btn btn-secondary mr-1" onClick={handleFlip}>
              Flip
            </button>
            {flipped && (
              <button className="btn btn-primary" onClick={handleNextCard}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
