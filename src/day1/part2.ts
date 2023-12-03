import * as fs from "node:fs";
const NUMBERS = "0123456789";

const HUMAN_NUMBERS = [
	["one", '1ne'],
	["two", '2wo'],
	["three", '3hree'],
	["four", '4our'],
	["five", '5ive'],
	["six", '6ix'],
	["seven", '7even'],
	["eight", '8ight'],
	["nine", '9ine'],
] as const;

let codes: string = fs.readFileSync("./src/day1/day1.txt").toString();

const codesInLine = codes.split("\n");
codesInLine.pop();

const replaceHumanReadable = (code: string) => {
	const findHumanIndex = [
		code.indexOf("one"),
		code.indexOf("two"),
		code.indexOf("three"),
		code.indexOf("four"),
		code.indexOf("five"),
		code.indexOf("six"),
		code.indexOf("seven"),
		code.indexOf("eight"),
		code.indexOf("nine"),
	].map((value, index) => {
		return [value, HUMAN_NUMBERS[index]] as const;
	})
	.filter((value) => value[0] != -1)
	.sort((a, b) => a[0] - b[0]);

	let mutCode = code;
	findHumanIndex.forEach((item) => {
		mutCode = mutCode.replaceAll(item[1][0], item[1][1])
	})

	return mutCode;
}

const humanReadableReplaced = codesInLine.map(replaceHumanReadable);

const onlyNumbers = humanReadableReplaced.map((code) => {
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
