const fs = require("fs");

const ting = () => {
	let data = fs.readFileSync("commonWords.txt");
	data = data.toString('utf-8')
    const arr = data.split("\r\n")
    console.log(JSON.stringify(arr))
};

ting()
