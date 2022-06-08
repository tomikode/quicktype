import { useEffect, useState, useRef } from "react";
import initWords from "../public/words.json";

export default function TypingTest() {
	const allowedLetters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+[];',./{}:"<>?\\| `;

	//select a random word
	const selectWord = () => {
		const random = Math.floor(Math.random() * 10);
		return Array.from(initWords[random]);
	};

	//select random words, many times and return to screen state
	const selectWords = () => {
		let genWords = [];
		for (let i = 0; i < 6; i++) {
			let newWord = selectWord();
			genWords.push(newWord);
		}
		return Array.from(genWords);
	};

	//variables to track typed letters, whats on screen and original words to type, positions
	const words = useRef(selectWords());
	const [screen, setScreen] = useState([]);
	const screenRef = useRef(screen);
	let letterPos = 0;
	let wordPos = 0;
	const [typed, setTyped] = useState([[]]);
	const typedRef = useRef(typed);

	//ref for screen state used for event listeners to mutate and access state
	const setScreenState = (data) => {
		screenRef.current = data;
		setScreen(data);
	};

	const setTypedState = (data) => {
		typedRef.current = data;
		setTyped(data);
	};

	//move div cursor forward
	const forwardCursor = (oldLetter, oldWord, newLetter, newWord) => {
		let copy = [...screenRef.current];
		let cursorChar = copy[oldWord].splice(oldLetter, 1);
		copy[newWord].splice(newLetter, 0, cursorChar[0]);
		setScreenState(copy);
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
		if (wordPos === 0 && letterPos === 0) return;
		let newWord = wordPos;
		if (letterPos > words.current[wordPos].length) {
			let clone = [...screenRef.current];
			clone[wordPos] = ["║", ...words.current[wordPos]];
			setScreenState(clone);
		} else {
			if (letterPos === 0) {
				newWord = wordPos - 1;
			} 
			forwardCursor(letterPos, wordPos, 0, newWord)
		}
		let clone = [...typedRef.current];
		clone[newWord] = [];
		setTypedState(clone);
		letterPos = 0;
		wordPos = newWord;
	};

	//ctrl backspace and spacebar bug currently,
	//fixed rendering classes for letters

	//backspace key controller, within word, first letter, nothing typed
	const backspace = () => {
		if (wordPos === 0 && letterPos === 0) return;
		if (letterPos > 0) {
			let clone = [...typedRef.current];
			clone[wordPos].pop();
			setTypedState(clone);
			forwardCursor(letterPos, wordPos, letterPos - 1, wordPos);
			if (letterPos > words.current[wordPos].length) {
				clone = [...screenRef.current];
				clone[wordPos].pop();
				setScreenState(clone);
			}
			letterPos--;
		} else {
			let newLetterPos = typedRef.current[wordPos - 1].length;
			forwardCursor(letterPos, wordPos, newLetterPos, wordPos - 1);
			letterPos = newLetterPos;
			wordPos--;
		}
	};

	//input space, hop to new word, regardless of current word progress
	const inputSpace = () => {
		if (wordPos + 1 >= words.current.length) return;
		wordPos++;
		if (!typedRef.current[wordPos]) {
			let clone = [...typedRef.current];
			clone.push([]);
			setTypedState(clone);
		}
		forwardCursor(letterPos, wordPos - 1, 0, wordPos);
		letterPos = 0;
	};

	//input wrong key, make correct letter red, add letters onto end if too many letters for word
	const inputWrong = (key) => {
		const length = words.current[wordPos].length;
		if (letterPos >= length + 10) return;
		let clone = [...typedRef.current];
		clone[wordPos].push(key);
		setTypedState(clone);
		if (letterPos >= length) {
			clone = [...screenRef.current];
			clone[wordPos].push(key);
			setScreenState(clone);
		}
		letterPos++;
		forwardCursor(letterPos - 1, wordPos, letterPos, wordPos);
	};

	//input correct key, make letter green
	const inputRight = (key) => {
		letterPos++;
		let clone = [...typedRef.current];
		clone[wordPos].push(key);
		setTypedState(clone);
		forwardCursor(letterPos - 1, wordPos, letterPos, wordPos);
	};

	//set screen to randomly selected words
	useEffect(() => {
		let withCursor = words.current.map((word) =>
			word.map((letter) => letter)
		);
		withCursor[0].splice(0, 0, "║");
		setScreenState(withCursor);
		document.addEventListener("keydown", keydown);
	}, []);

	const setCursor = () => {
		const pos = document
			.getElementsByClassName("curPos")[0]
			.getBoundingClientRect();
		const phrasePos = document
			.getElementsByClassName("phrase")[0]
			.getBoundingClientRect();
		const cursor = document.getElementsByClassName("cursor")[0];
		cursor.style.left = `${pos.left - phrasePos.left}px`;
		cursor.style.top = `${pos.top - phrasePos.top}px`;
	};

	useEffect(() => {
		if (screen.length > 0) setCursor();
	}, [JSON.stringify(screen)]);

	const determineClass = (windex, lindex) => {
		const given = typedRef.current[windex];
		const needed = words.current[windex];
		if (!given || !given[lindex]) return "letter";
		else if (!needed[lindex] || given[lindex] !== needed[lindex])
			return "wrong";
		return "right";
	};

	const seeValue = () => {
		console.log(typed);
	};

	return (
		<div className="container">
			<button onClick={seeValue}>see values</button>
			<div className="phrase">
				<div className="cursor" />
				{screen
					? screen.map((word, w) => {
							let index = -1;
							return (
								<div key={w} className="word">
									{word.map((letter, l) => {
										if (word.includes("║")) {
											index++;
											if (letter === "║") {
												index--;
												return (
													<div
														key={l}
														className="curPos"
													/>
												);
											}
											return (
												<div
													key={l}
													className={determineClass(
														w,
														index
													)}
												>
													{letter}
												</div>
											);
										} else {
											return (
												<div
													key={l}
													className={determineClass(
														w,
														l
													)}
												>
													{letter}
												</div>
											);
										}
									})}
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
}
