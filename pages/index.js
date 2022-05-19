import { useEffect, useState, useRef } from "react";
import initWords from "../public/words.json";

export default function Home() {
	const allowedLetters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+[];',./{}:"<>?\\| `;

	const [words, setWords] = useState([]);
	const [cursorPos, setCursorPos] = useState(0);
	const typedRef = useRef("");
	const onceRef = useRef(0);

	const selectWord = () => {
		const random = Math.floor(Math.random() * 10);
		return Array.from(initWords[random]);
	};

	const selectWords = () => {
		let genWords = [];
		for (let i = 0; i < 2; i++) {
			genWords.push(selectWord());
		}
		return Array.from(genWords);
	};

	const keydown = (e) => {
		if (e.key === "Backspace" && cursorPos === 0) {
			return;
		} else if (e.key === "Backspace" && e.ctrlKey) {
			ctrlBackspace();
		} else if (e.key === "Backspace") {
			backspace();
		} else {
			if (!allowedLetters.includes(e.key)) return;
			else if (e.key === words[cursorPos]) {
				inputRight(e.key);
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
		while (
			typedRef.current.length > 0 &&
			words[typedRef.current.length - 1] !== " "
		) {
			backspace();
		}
	};

	//maybe adding letter after words, detect when space is used and jump to next work, like monkeytype?
	//lock correctly written words
	//longer sentences, spanning lines downwards, cursor hops down line
	//minimum width of container phrase div
	//possibly having space as part of the word
	//keeping track of where cursor is within word and what word its on

	const backspace = () => {
		let phrase = document.getElementsByClassName("phrase")[0]

		let current 
		if (current.className === "space") {
		} else if (current.className === "wrongspace") {
			current.innerHTML = "";
			current.className = "space";
		} else current.className = "letter";
		typedRef.current = typedRef.current.slice(0, -1);

		let cursor = document.getElementsByClassName("cursor")[0];
		let pos = 32 * (cursorPos - 1);
		cursor.style.left = `${pos}px`;
		setCursorPos(cursorPos--);
	};

	const inputWrong = (key) => {
		let current =
			document.getElementsByClassName("word")[0].childNodes[cursorPos];
		if (current.className === "space") {
			current.innerHTML = key;
			current.className = "wrongspace";
		} else current.className = "wrong";
		typedRef.current = typedRef.current + key;
	};

	const inputRight = (key) => {
		let current =
			document.getElementsByClassName("word")[0].childNodes[cursorPos];
		if (current.className === "space") {
		} else current.className = "right";
		typedRef.current = typedRef.current + key;
	};

	useEffect(() => {
		setWords(selectWords);
	}, []);

	useEffect(() => {
		if (onceRef.current) {
			document.addEventListener("keydown", keydown, { passive: false });
		}
		onceRef.current++;
	}, [words]);

	return (
		<div className="container">
			<div className="cursor" style={{ left: "0px" }} />
			<div className="phrase">
				{words
					? words.map((word, index) => {
						console.log(word)
							return (
								<div key={index} className="word">
									{word.map((letter, index) => {
										return (
											<div key={index} className="letter">
												{letter}
											</div>
										);
									})}<div className="space" />
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
}
