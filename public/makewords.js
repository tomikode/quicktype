const fs = require("fs");

const ting = () => {
	const data = fs.readFileSync("commonWords.txt");
	console.log(data.toString('utf-8'));
    
};

ting()