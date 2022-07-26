import { useState } from "react";
import TypingTest from "../components/Typingtest";
import Gamefinish from "../components/Gamefinish";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";


export default function Home() {
	const [stats, setStats] = useState({ wpm: -1, lpm: -1, time: 0, words: 0  });
	const [wordNumber, setWordNumber] = useState(20)
	const [reload, setReload] = useState(1)

	const setWordsForGame = (num) => {
		setReload(reload => reload + 1)
		setWordNumber(num)
		setStats({ wpm: -1, lpm: -1 })
	}

	const endGame = (wpm, lpm, time) => {
		setStats({ wpm, lpm, time, words: wordNumber })
	}

	//given specific words for test? animations between tests
	//wordTimes currently simple, maybe change?
	//icons for endgame
	//endgame styling
	//endgame (time, wpm, lpm, words)
	//set fixed heights and width for lpm and wpm in endgame
	//footer
	//polish header, test, footer
	//test different screens
	//deploy

	return (
		<div className="p-6 h-screen">
			<div className="h-[10vh]">
				<Menubar setWordsForGame={setWordsForGame} wordNumber={wordNumber} />
			</div>
			<div className="h-[75vh]">
				{stats.wpm !== -1 ? <Gamefinish stats={stats} setWordsForGame={setWordsForGame} /> :
					<TypingTest endGame={endGame} wordNumber={wordNumber} reload={reload} />
				}
			</div>
			<div className="h-[5vh]">
				<Footer />
			</div>
		</div>
	);
}

//https://stitches.dev/
