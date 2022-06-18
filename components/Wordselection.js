import React from "react";

const Wordselection = ({ setWordsForGame }) => {

	return (
		<div className="inline-block">
			<div className="wordsButton" onClick={() => setWordsForGame(10)}>10</div>
			<div className="wordsButton" onClick={() => setWordsForGame(20)}>20</div>
			<div className="wordsButton" onClick={() => setWordsForGame(50)}>50</div>
			<div className="wordsButton" onClick={() => setWordsForGame(100)}>100</div>
		</div>
	);
};

export default Wordselection;
