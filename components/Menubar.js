import React from "react";

const Menubar = ({ setWordsForGame, wordNumber }) => {
	const getClass = (num) => {
		if (num === wordNumber) return "wordsButton text-purple-500";
		return "wordsButton";
	};

	return (
		<div className="border-b border-slate-300 pb-4">
			<div className="flex items-center max-w-[900px] m-auto">
				<div className="inline-block">
					<div className="title">
						<span className="text-purple-500 font-extrabold">
							Q
						</span>
						uick
					</div>
					<div className="title">
						<span className="text-purple-500 font-extrabold pl-3">
							T
						</span>
						ype
					</div>
				</div>
				<div className="ml-auto mr-0 inline-block">
					<div className="text-right select-none">Words</div>
					<div>
						<div
							className={getClass(10)}
							onClick={() => setWordsForGame(10)}
						>
							10
						</div>
						<div
							className={getClass(20)}
							onClick={() => setWordsForGame(20)}
						>
							20
						</div>
						<div
							className={getClass(50)}
							onClick={() => setWordsForGame(50)}
						>
							50
						</div>
						<div
							className={getClass(100)}
							onClick={() => setWordsForGame(100)}
						>
							100
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menubar;

//icon, word numbers,
