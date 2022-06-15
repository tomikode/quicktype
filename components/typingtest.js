import { useEffect, useState, useRef } from "react";
import initWords from "../public/words.json";

export default function TypingTest({ endGame, wordNumber }) {
	const allowedLetters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+[];',./{}:"<>?\\| `;

	//select a random word
	const selectWord = () => {
		const random = Math.floor(Math.random() * 10);
		return Array.from(initWords[random]);
	};

	//select random words, many times and return to screen state
	const selectWords = (wordNumber) => {
		let genWords = [];
		for (let i = 0; i < wordNumber; i++) {
			let newWord = selectWord();
			genWords.push(newWord);
		}
		return Array.from(genWords);
	};

	//variables to track typed letters, whats on screen and original words to type, positions
	const words = useRef([]);
	const [screen, setScreen] = useState([]);
	const screenRef = useRef(screen);
	const [typed, setTyped] = useState([[]]);
	const typedRef = useRef(typed);
	const hideRef = useRef(0);
	const letterPos = useRef(0);
	const wordPos = useRef(0);
	const prevLoc = useRef(0);
	const prevTime = useRef(0);

	const wordTimes = useRef([]);

	//ref for screen state used for event listeners to mutate and access state
	const setScreenState = (data) => {
		screenRef.current = data;
		setScreen(data);
	};

	const setTypedState = (data) => {
		typedRef.current = data;
		setTyped(data);
	};

	const getScreenWord = () => {
		return wordPos.current - hideRef.current;
	};

	//move div cursor forward
	const moveCursor = (oldLetter, oldWord, newLetter, newWord) => {
		let copy = [...screenRef.current];
		let cursorChar = copy[oldWord - hideRef.current].splice(oldLetter, 1);
		copy[newWord - hideRef.current].splice(newLetter, 0, cursorChar[0]);
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
			else {
				if (!prevTime.current) startTime();
				if (
					e.key === words.current[wordPos.current][letterPos.current]
				) {
					inputRight(e.key);
				} else if (e.key === " ") {
					inputSpace();
				} else {
					inputWrong(e.key);
				}
			}
		}
	};

	//Ctrl key + backspace key, delete entire previous word
	const ctrlBackspace = () => {
		if (wordPos.current === hideRef.current && letterPos.current === 0)
			return;
		let newWord = wordPos.current;
		if (letterPos.current > words.current[wordPos.current].length) {
			let clone = [...screenRef.current];
			clone[getScreenWord()] = ["║", ...words.current[getScreenWord()]];
			setScreenState(clone);
		} else {
			if (letterPos.current === 0) {
				newWord = wordPos.current - 1;
				if (checkWord(newWord - hideRef.current)) return;
			}
			moveCursor(letterPos.current, wordPos.current, 0, newWord);
		}
		let clone = [...typedRef.current];
		clone[newWord] = [];
		setTypedState(clone);
		letterPos.current = 0;
		wordPos.current = newWord;
	};

	//last time reference
	//array of correct word times, lock words if correct
	//accuracy
	//time of full game
	//endgame things
	//restart button
	//then start sytling
	//selection for number of words

	//backspace key controller, within word, first letter, nothing typed
	const backspace = () => {
		if (wordPos.current === hideRef.current && letterPos.current === 0)
			return;
		if (letterPos.current > 0) {
			let clone = [...typedRef.current];
			clone[wordPos.current].pop();
			setTypedState(clone);
			moveCursor(
				letterPos.current,
				wordPos.current,
				letterPos.current - 1,
				wordPos.current
			);
			if (letterPos.current > words.current[wordPos.current].length) {
				clone = [...screenRef.current];
				clone[getScreenWord()].pop();
				setScreenState(clone);
			}
			letterPos.current--;
		} else {
			if (checkWord(wordPos.current - hideRef.current - 1)) return;
			let newLetterPos = typedRef.current[wordPos.current - 1].length;
			moveCursor(
				letterPos.current,
				wordPos.current,
				newLetterPos,
				wordPos.current - 1
			);
			letterPos.current = newLetterPos;
			wordPos.current--;
		}
	};

	//input space, hop to new word, regardless of current word progress
	const inputSpace = () => {
		if (wordPos.current + 1 >= words.current.length) {
			finishGame();
			return;
		}
		wordPos.current++;
		if (!typedRef.current[wordPos.current]) {
			let clone = [...typedRef.current];
			clone.push([]);
			setTypedState(clone);
		}
		moveCursor(letterPos.current, wordPos.current - 1, 0, wordPos.current);
		letterPos.current = 0;
		if (checkWord(wordPos.current - hideRef.current - 1)) nextTime();
	};

	//input wrong key, make correct letter red, add letters onto end if too many letters for word
	const inputWrong = (key) => {
		const length = words.current[wordPos.current].length;
		if (letterPos.current >= length + 10) return;
		let clone = [...typedRef.current];
		clone[wordPos.current].push(key);
		setTypedState(clone);
		if (letterPos.current >= length) {
			clone = [...screenRef.current];
			clone[getScreenWord()].push(key);
			setScreenState(clone);
		}
		letterPos.current++;
		moveCursor(
			letterPos.current - 1,
			wordPos.current,
			letterPos.current,
			wordPos.current
		);
	};

	//input correct key, make letter green
	const inputRight = (key) => {
		letterPos.current++;
		let clone = [...typedRef.current];
		clone[wordPos.current].push(key);
		setTypedState(clone);
		moveCursor(
			letterPos.current - 1,
			wordPos.current,
			letterPos.current,
			wordPos.current
		);
		if (
			wordPos.current === words.current.length - 1 &&
			checkWord(wordPos.current - hideRef.current)
		) {
			nextTime();
			finishGame();
		}
	};

	const finishGame = () => {
		const wpm = Math.floor(calculateWPM());
		if (!wpm) wpm = 0;
		endGame(wpm);
	};

	const startTime = () => {
		const startDate = new Date();
		prevTime.current = startDate;
	};

	const nextTime = () => {
		const finishTime = new Date();
		const wpm = 60 / ((finishTime - prevTime.current) / 1000);
		wordTimes.current.push(wpm);
		prevTime.current = finishTime;
	};

	const calculateWPM = () => {
		const sum = wordTimes.current.reduce((a, b) => a + b, 0);
		return sum / wordTimes.current.length;
	};

	const resetTest = () => {
		window.removeEventListener("keydown", keydown);
		window.removeEventListener("resize", setCursor);
		words.current = selectWords(wordNumber);
		prevTime.current = 0;
		prevLoc.current = 0;
		wordPos.current = 0;
		letterPos.current = 0;
		hideRef.current = 0;
		setScreenState([[]]);
		setTypedState([[]]);
		wordTimes.current = [];
	};

	//set screen to randomly selected words
	useEffect(() => {
		resetTest()
		let withCursor = words.current.map((word) =>
			word.map((letter) => letter)
		);
		withCursor[0].splice(0, 0, "║");
		setScreenState(withCursor);
		window.addEventListener("keydown", keydown);
		window.addEventListener("resize", setCursor);

		return () => {
			resetTest()
		}
	}, [wordNumber]);

	useEffect(() => {
		if (screen.length > 0) {
			setCursor();
		}
	}, [JSON.stringify(screen)]);

	const setCursor = () => {
		if (!prevLoc.current) setPrevLoc();
		const curPos = document.getElementById("curPos");
		const pos = curPos.getBoundingClientRect();
		const cursor = document.getElementsByClassName("cursor")[0];
		checkDeleteLine(pos);
		cursor.style.left = `${pos.left}px`;
		cursor.style.top = `${pos.top}px`;
		setPrevLoc();
	};

	const deleteLine = (middleTop) => {
		const words = document.getElementsByClassName("phrase")[0].childNodes;
		let index = 0;
		for (let word of words) {
			if (word.getBoundingClientRect().top === middleTop) {
				let clone = [...screenRef.current];
				clone.splice(0, index);
				setScreenState(clone);
				hideRef.current += index;
				return;
			}
			index++;
		}
	};

	const checkDeleteLine = (pos) => {
		const words = document.getElementsByClassName("phrase")[0].childNodes;
		let lines = [];
		for (let word of words) {
			const top = word.getBoundingClientRect().top;
			if (lines.length === 3) break;
			if (!lines.includes(top)) {
				lines.push(top);
			}
		}
		if (lines[2] <= pos.top) {
			deleteLine(lines[1]);
		}
	};

	const setPrevLoc = () => {
		const curPos = document
			.getElementsByClassName("curPos")[0]
			.getBoundingClientRect();
		prevLoc.current = curPos.top;
	};

	const checkWord = (w) => {
		const given = JSON.stringify(typedRef.current[w + hideRef.current]);
		const needed = JSON.stringify(words.current[w + hideRef.current]);
		return given === needed;
	};

	const isCompleteWord = (w) => {
		if (checkWord(w)) {
			return "completeWord";
		}
		return "word";
	};

	const determineClass = (windex, lindex, wordClass) => {
		if (wordClass === "completeWord") return "completeLetter";
		const given = typedRef.current[windex + hideRef.current];
		const needed = words.current[windex + hideRef.current];
		if (!given || !given[lindex]) return "letter";
		else if (!needed[lindex] || given[lindex] !== needed[lindex])
			return "wrong";
		return "right";
	};

	const seeValue = () => {
		calculateWPM();
	};

	return (
		<div className="container">
			{/* <button onClick={seeValue}>see values</button> */}
			<div className="cursor" />
			<div className="phrase">
				{screen
					? screen.map((word, w) => {
							let index = -1;
							const wordClass = isCompleteWord(w);
							return (
								<div key={w} className={wordClass}>
									{word.map((letter, l) => {
										if (word.includes("║")) {
											index++;
											if (letter === "║") {
												index--;
												return (
													<div
														key={l}
														className="curPos"
														id="curPos"
													/>
												);
											}
											return (
												<div
													key={l}
													className={determineClass(
														w,
														index,
														wordClass
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
														l,
														wordClass
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
