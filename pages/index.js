import { useEffect, useState, useRef } from "react";
import TypingTest from "../components/Typingtest";
import Gamefinish from "../components/Gamefinish";
import Wordselection from "../components/Wordselection";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";


export default function Home() {
	const [stats, setStats] = useState({ wpm: -1, lpm: -1 });
	const [wordNumber, setWordNumber] = useState(20)
	const [reload, setReload] = useState(1)

	const setWordsForGame = (num) => {
		setReload(reload => reload + 1)
		setWordNumber(num)
		setStats({ wpm: -1, lpm: -1 })
	}

	const endGame = (wpm, lpm, time) => {
		setStats({ wpm, lpm, time })
	}

	//endgame (time, wpm, lpm, words)
	//footer
	//polish header, test, footer
	//test different screens
	//deploy

	return (
		<div className="p-6 h-screen">
			<div className="h-[10vh]">
				<Menubar setWordsForGame={setWordsForGame} />
			</div>
			<div className="h-[75vh]">
				{stats.wpm !== -1 ? <Gamefinish stats={stats} /> :
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
