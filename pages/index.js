import { useEffect, useState, useRef } from "react";
import TypingTest from "../components/Typingtest";
import Gamefinish from "../components/Gamefinish";
import Wordselection from "../components/Wordselection";
import Menubar from "../components/Menubar";


export default function Home() {
	const [stats, setStats] = useState({ wpm: -1, lpm: -1 });
	const [wordNumber, setWordNumber] = useState(20)
	const [reload, setReload] = useState(1)

	const setWordsForGame = (num) => {
		setReload(reload => reload + 1)
		setWordNumber(num)
		setStats({ wpm: -1, lpm: -1 })
	}

	const endGame = (wpm, lpm) => {
		setStats({ wpm, lpm })
	}

	return (
		<div className="p-6 h-screen">
			<Menubar setWordsForGame={setWordsForGame} />
			{stats.wpm !== -1 ? <Gamefinish stats={stats} /> : 
			<TypingTest endGame={endGame} wordNumber={wordNumber} reload={reload} />
			}
		</div>
	);
}

//https://stitches.dev/
