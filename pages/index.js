import { useEffect, useState, useRef } from "react";
import TypingTest from "../components/Typingtest";
import Gamefinish from "../components/Gamefinish";
import Wordselection from "../components/Wordselection";

export default function Home() {
	const [wpm, setWpm] = useState(-1);
	const [wordNumber, setWordNumber] = useState(20)

	const endGame = (wpm) => {
		setWpm(wpm)
		console.log(wpm)
	}

	useEffect(() => {
		console.log(wordNumber)
	}, [wordNumber])

	return (
		<div>
			<div>TESTING SIZE</div>
			<Wordselection setWordNumber={setWordNumber} />
			{wpm !== -1 ? <Gamefinish wpm={wpm} /> : 
			<TypingTest endGame={endGame} wordNumber={wordNumber} />
			}
		</div>
	);
}

//https://stitches.dev/
