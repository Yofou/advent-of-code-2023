import * as fs from "node:fs";

const map: string = fs.readFileSync("./src/day3/day3.txt").toString();
const isDigit = (char: string) => '0123456789'.includes(char) 
const isNumeric = (value: string) => {
    return /^-?\d+$/.test(value);
}

let charBuffer = ''
const scannedMap = map.split('').reduce((newMap, currentString) => {
	const targetArr = newMap.at(-1) as unknown as string[]
	if (currentString === '\n') {
		if (charBuffer.length > 0) {
			targetArr.push(charBuffer)
			charBuffer = ''
		}

		newMap.push([])
		return newMap
	} 
	
	if (isDigit(currentString)) {
		charBuffer += currentString
	} else if (charBuffer.length > 0) {
		targetArr.push(charBuffer)
		charBuffer = ''
		targetArr.push(currentString)
	} else {
		targetArr.push(currentString)
	}

	return newMap	
}, [[]] as string[][])
scannedMap.pop()


const getRowPosFromRowIndex = (y: number, x: number) => {
	const row = scannedMap[y]
	if (!row) return undefined

	let xPos = 0;
	for (let i = 0; i < x; i++) {
		const char = row[i]
		xPos += char.length
	}

	return xPos + 1
}

const getAllCharsInRow = (y: number, x: number, mag: number) => {
	const scannedChars = []
	const row = scannedMap[y]?.join('')?.split('')
	if (!row) return []

	let i = 0;
	while (i < mag) {
		const char = row[x+i]
		if (char === undefined) {
			i += 1
			continue;
		}

		scannedChars.push(char)
		i += char.length
	}

	return scannedChars
}

const getAllCharsAroundPosition = (y: number, x: number) => {
	let scannedChars: string[] = []
	const number = scannedMap[y][x]
	const rowPos = getRowPosFromRowIndex(y, x) ?? 0
	
	const left = scannedMap[y][x-1]
	const right = scannedMap[y][x+1]
	const top = getAllCharsInRow(y-1, rowPos-2, number.length + 2)
	const bottom = getAllCharsInRow(y+1, rowPos-2, number.length + 2)

	scannedChars = [...scannedChars, ...top, ...bottom]

	if (left) scannedChars.push(left)
	if (right) scannedChars.push(right)
	
	return scannedChars
}

const isPosAroundSymbol = (y: number, x: number) => {
	const chars = getAllCharsAroundPosition(y, x)
	return chars.some(char => char !== '.' && !isDigit(char))
}

const numbersAroundSymbols: number[] = []
scannedMap.forEach((row, y) => {
	row.forEach((char, x) => {
		if (isNumeric(char)) {
			const isAroundSymbol = isPosAroundSymbol(y, x);
			if (isAroundSymbol) numbersAroundSymbols.push(parseInt(char, 10))
		}
	})
})

const result = numbersAroundSymbols.reduce((total, curr) => total + curr, 0)
console.log(result)
