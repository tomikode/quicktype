import React from "react";

const Wordselection = ({ setWordNumber }) => {

	return (
		<div>
			<div className="wordsButton" onClick={() => setWordNumber(10)}>10</div>
			<div className="wordsButton" onClick={() => setWordNumber(20)}>20</div>
			<div className="wordsButton" onClick={() => setWordNumber(50)}>50</div>
			<div className="wordsButton" onClick={() => setWordNumber(100)}>100</div>
		</div>
	);
};

export default Wordselection;
