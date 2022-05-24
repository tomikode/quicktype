import { useEffect, useState, useRef } from "react";
import initWords from "../public/words.json";

export default function Home() {
	const allowedLetters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+[];',./{}:"<>?\\| `;

	const selectWord = () => {
		const random = Math.floor(Math.random() * 10);
		return Array.from(initWords[random]);
	};

	const selectWords = () => {
		let genWords = [];
		for (let i = 0; i < 2; i++) {
			let newWord = selectWord();
			genWords.push(newWord);
		}
		return Array.from(genWords);
	};

	const words = useRef(selectWords());
	const [screen, setScreen] = useState([]);
	const [cursorPos, setCursorPos] = useState(0);
	const screenRef = useRef([]);
	let letterPos = 0;
	let wordPos = 0;
	let typed = "";
	const onceRef = useRef(0);

	const keydown = (e) => {
		if (e.key === "Backspace" && cursorPos === 0 && wordPos === 0) {
			return;
		} else if (e.key === "Backspace" && e.ctrlKey) {
			ctrlBackspace();
		} else if (e.key === "Backspace") {
			backspace();
		} else {
			if (!allowedLetters.includes(e.key)) return;
			else if (e.key === words.current[wordPos][letterPos]) {
				inputRight(e.key);
			} else if (e.key === " ") {
				inputSpace();
			} else {
				inputWrong(e.key);
			}

			let cursor = document.getElementsByClassName("cursor")[0];
			let pos = 32 * (cursorPos + 1);
			cursor.style.left = `${pos}px`;
			setCursorPos(cursorPos++);
		}
	};

	const ctrlBackspace = () => {
		while (typed.length > 0 && words[typed.length - 1] !== " ") {
			backspace();
		}
	};

	//maybe adding letter after words, detect when space is used and jump to next work, like monkeytype?
	//lock correctly written words
	//longer sentences, spanning lines downwards, cursor hops down line
	//minimum width of container phrase div
	//possibly having space as part of the word
	//keeping track of where cursor is within word and what word its on

	//work on new typing and backspace

	//check if regular variables can work to replace state or something
	//new backspace and typing, and clean up code

	const backspace = () => {
		// let phrase = document.getElementsByClassName("phrase")[0]
		// let current
		// if (current.className === "space") {
		// } else if (current.className === "wrongspace") {
		// 	current.innerHTML = "";
		// 	current.className = "space";
		// } else current.className = "letter";
		// typed = typed.slice(0, -1);
		// let cursor = document.getElementsByClassName("cursor")[0];
		// let pos = 32 * (cursorPos - 1);
		// cursor.style.left = `${pos}px`;
		// setCursorPos(cursorPos--);
	};

	const inputWrong = (key) => {
		let phrase = document.getElementsByClassName("phrase")[0];
		let letter = phrase.childNodes[wordPos].childNodes[letterPos];

		typed += key;
		if (!letter) {
			screenRef.current[wordPos].push(key);
			console.log(screenRef.current)
			console.log(words.current)
			setScreen(screenRef.current);
			letterPos++;
		} else {
			letter = phrase.childNodes[wordPos].childNodes[letterPos];
			letter.className = "wrong";
			letterPos++;
		}

		// let current =
		// 	document.getElementsByClassName("word")[0].childNodes[cursorPos];
		// if (current.className === "space") {
		// 	current.innerHTML = key;
		// 	current.className = "wrongspace";
		// } else current.className = "wrong";
		// typed = typed + key;
	};

	const inputRight = (key) => {
		let phrase = document.getElementsByClassName("phrase")[0];
		let letter = phrase.childNodes[wordPos].childNodes[letterPos];
		letter.className = "right";
		letterPos++;
	};

	useEffect(() => {
		setScreen(words.current.map(word => word.map(letter => letter)));
	}, []);

	useEffect(() => {
		if (onceRef.current === 1) {
			screenRef.current = screen;
			document.addEventListener("keydown", keydown);
		}
		onceRef.current++;
	}, [screen]);

	return (
		<div className="container">
			<div className="cursor" style={{ left: "0px" }} />
			<div className="phrase">
				{screen
					? screen.map((word, i) => {
							return (
								<div key={i} className="word">
									{word.map((letter, x) => {	
										if (x >= words.current[i].length)
											return (
												<div key={x} className="wrong">
													{letter}
												</div>
											);
										return (
											<div key={x} className="letter">
												{letter}
											</div>
										);
									})}
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
}
