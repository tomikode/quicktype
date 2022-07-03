import React from "react";

const Menubar = ({ setWordsForGame }) => {
	return (
		<div className="flex items-center border-b border-slate-600 pb-4 ">
			<div className="inline-block">
				<div className="title"><span className="text-purple-600 font-extrabold">Q</span>uick</div>
				<div className="title"><span className="text-purple-600 font-extrabold pl-3">T</span>ype</div>
			</div>
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
