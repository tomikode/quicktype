import { useEffect, useState, useRef } from "react";
import initWords from "../public/words.json";

export default function Home() {
	const allowedLetters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+[];',./{}:"<>?\\| `;

	//select a random word
	const selectWord = () => {
		const random = Math.floor(Math.random() * 10);
		return Array.from(initWords[random]);
	};

	//select random words, many times and return to screen state
	const selectWords = () => {
		let genWords = [];
		for (let i = 0; i < 2; i++) {
			let newWord = selectWord();
			genWords.push(newWord);
		}
		return Array.from(genWords);
	};

	//variables to track typed letters, whats on screen and original words to type, positions
	const words = useRef(selectWords());
	const [screen, setScreen] = useState([]);
	const [cursorPos, setCursorPos] = useState(0);
	const screenRef = useRef(screen);
	let letterPos = 0;
	let wordPos = 0;
	const typed = useRef([[]]);
	const onceRef = useRef(0);

	//ref for screen state used for event listeners to mutate and access state
	const setScreenState = (data) => {
		screenRef.current = data;
		setScreen(data);
	};

	//move div cursor forward
	const forwardCursor = () => {
		let cursor = document.getElementsByClassName("cursor")[0];
		let pos = 32 * (cursorPos + 1);
		cursor.style.left = `${pos}px`;
		setCursorPos(cursorPos++);
	};

	//mvoe div cursor backward
	const backwardCursor = () => {
		let cursor = document.getElementsByClassName("cursor")[0];
		let pos = 32 * (cursorPos - 1);
		cursor.style.left = `${pos}px`;
		setCursorPos(cursorPos--);
	};

	//keydown event listener controller
	const keydown = (e) => {
		if (e.key === "Backspace" && e.ctrlKey) {
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
		}
	};

	//Ctrl key + backspace key, delete entire previous word
	const ctrlBackspace = () => {
		if (letterPos === 0) backspace();
		for (let i = typed.current[wordPos].length; i >= 1; i--) {
			typed.current[wordPos].pop();
			backspace();
		}
	};

	//work on new typing and backspace

	//check if regular variables can work to replace state or something
	//clean up code
	//allow backspace through spaces
	//test hardcore
	//multiple lines cursor
	//lots of words
	//some words hidden

	//backspace key controller, within word, first letter, nothing typed
	const backspace = () => {
		letterPos--;
		let phrase = document.getElementsByClassName("phrase")[0];
		let letter = phrase.childNodes[wordPos].childNodes[letterPos];
		if (screenRef.current[wordPos].length > words.current[wordPos].length) {
			let update = screenRef.current.map((word) =>
				word.map((letter) => letter)
			);
			update[wordPos].pop();
			setScreenState(update);
		} else if (letterPos === -1 && wordPos > 0) {
			backwardCursor();
			wordPos--;
			letterPos = screenRef.current[wordPos].length;
			return;
		} else if (letterPos === -1 && wordPos === 0) {
			letterPos = 0;
			return;
		} else {
			letter.className = "letter";
		}
		typed.current[wordPos].pop();
		backwardCursor();
	};

	//input space, hop to new word, regardless of current word progress
	const inputSpace = () => {
		let cur = typed.current[wordPos].length;
		let needed = words.current[wordPos].length;
		if (cur > needed) {
			forwardCursor();
		} else {
			const dif = needed - cur + 1;
			if (cur === 0) return;
			for (let i = 0; i < dif; i++) {
				forwardCursor();
			}
		}
		wordPos++;
		if (!typed.current[wordPos]) typed.current.push([]);
		letterPos = 0;
	};

	//input wrong key, make correct letter red, add letters onto end if too many letters for word
	const inputWrong = (key) => {
		let phrase = document.getElementsByClassName("phrase")[0];
		let letter = phrase.childNodes[wordPos].childNodes[letterPos];
		if (
			screenRef.current[wordPos].length >
			words.current[wordPos].length + 10
		) {
			return;
		} else if (!letter) {
			screenRef.current[wordPos].push(key);
			setScreen(screenRef.current);
		} else {
			letter = phrase.childNodes[wordPos].childNodes[letterPos];
			letter.className = "wrong";
		}
		typed.current[wordPos].push(key);
		letterPos++;
		forwardCursor();
	};

	//input correct key, make letter green
	const inputRight = (key) => {
		let phrase = document.getElementsByClassName("phrase")[0];
		let letter = phrase.childNodes[wordPos].childNodes[letterPos];
		typed.current[wordPos].push(key);
		letter.className = "right";
		letterPos++;
		forwardCursor();
	};

	//set screen to randomly selected words
	useEffect(() => {
		setScreenState(
			words.current.map((word) => word.map((letter) => letter))
		);
	}, []);

	//create event listener once, avoid doubles
	useEffect(() => {
		if (onceRef.current === 1) {
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
