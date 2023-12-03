import * as fs from "node:fs";

const NUMBERS = "0123456789";
const codes: string = fs.readFileSync("./src/day1/day1.txt").toString();
const codesInLine = codes.split("\n");
codesInLine.pop();

const onlyNumbers = codesInLine.map((code) => {
	const codeNumbers = code.split("").filter((char) => NUMBERS.includes(char));
	return codeNumbers;
});

const calibrationValues = onlyNumbers.reduce((acc, curr) => {
	const parent = [];
	const first = curr.at(0);
	const last = curr.at(-1);
	if (first) parent.push(first);
	if (last) parent.push(last);

	const getNumber = parseFloat(parent.join(""));
	acc.push(getNumber);

	return acc;
}, [] as number[]);

const total = calibrationValues.reduce((total, curr) => total + curr, 0);
console.log(total);
