import { useState } from "react";
import TypingTest from "../components/Typingtest";
import Gamefinish from "../components/Gamefinish";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";
import Meta from "../components/Meta";

export default function Home() {
	const [stats, setStats] = useState({ wpm: -1, lpm: -1, time: 0, words: 0 });
	const [wordNumber, setWordNumber] = useState(20);
	const [reload, setReload] = useState(1);

	const setWordsForGame = (num) => {
		setReload((reload) => reload + 1);
		setWordNumber(num);
		setStats({ wpm: -1, lpm: -1 });
	};

	const endGame = (wpm, lpm, time) => {
		setStats({ wpm, lpm, time, words: wordNumber });
	};

	//icons for endgame
	//footer
	//polish header, test, footer
	//test different screens
	//deploy

	return (
		<div>
			<Meta />
			<div className="p-6 h-screen relative flex flex-col">
				<div className="">
					<Menubar
						setWordsForGame={setWordsForGame}
						wordNumber={wordNumber}
					/>
				</div>
				<div className="flex-grow">
					{stats.wpm !== -1 ? (
						<Gamefinish
							stats={stats}
							setWordsForGame={setWordsForGame}
						/>
					) : (
						<TypingTest
							endGame={endGame}
							wordNumber={wordNumber}
							reload={reload}
						/>
					)}
				</div>
				<div className="">
					<Footer />
				</div>
			</div>
		</div>
	);
}

//https://stitches.dev/
