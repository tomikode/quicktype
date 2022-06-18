import React from "react";

const Menubar = ({ setWordsForGame }) => {
	return (
		<div className="flex items-center">
			<h1 className="inline-block select-none"><span className="text-purple-600">Q</span>uick<span className="text-purple-600">T</span>ype</h1>
			<div className="ml-auto mr-0 inline-block">
				<div className="text-right select-none">Words</div>
				<div>
					<div
						className="wordsButton"
						onClick={() => setWordsForGame(10)}
					>
						10
					</div>
					<div
						className="wordsButton"
						onClick={() => setWordsForGame(20)}
					>
						20
					</div>
					<div
						className="wordsButton"
						onClick={() => setWordsForGame(50)}
					>
						50
					</div>
					<div
						className="wordsButton"
						onClick={() => setWordsForGame(100)}
					>
						100
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menubar;

//icon, word numbers,
