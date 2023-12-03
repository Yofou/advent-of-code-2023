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

const getRowIndexFromRowPos = (y: number, x: number) => {
	const row = scannedMap[y]
	if (!row) return undefined

	let xPos = 0;
	let i = 0;
	while (xPos <= x) {
		const char = row[i]
		xPos += char?.length ?? 1
		i += 1
	}

	return i - 1
}

const getAllCharsInRow = (y: number, x: number, mag: number) => {
	const scannedChars: [string, number, number][] = []
	const row = scannedMap[y]?.join('')?.split('')
	if (!row) return []

	let i = 0;
	while (i < mag) {
		const char = row[x+i]

		scannedChars.push([char, y, x+i])
		i += char?.length ?? 1
	}

	return scannedChars
}

const getAllCharsAroundPosition = (y: number, x: number) => {
	let scannedChars: [string, number, number][] = []
	const number = scannedMap[y][x]
	const rowPos = getRowPosFromRowIndex(y, x) ?? 0
	
	const left = scannedMap[y][x-1]
	const right = scannedMap[y][x+1]
	const top = getAllCharsInRow(y-1, rowPos-2, number.length + 2)
	const bottom = getAllCharsInRow(y+1, rowPos-2, number.length + 2)

	scannedChars.push([left, y, rowPos-2])
	scannedChars.push([right, y, rowPos+1])

	scannedChars = [...scannedChars, ...top, ...bottom]
	
	return scannedChars
}

const getAllNumbersAroundPosition = (y: number, x: number) => {
	const chars = getAllCharsAroundPosition(y, x)
		.filter(char => isNumeric(char[0]))
		.map(char => {
			let x = getRowIndexFromRowPos(char[1], char[2])
			if (x != undefined) {
				char[2] = x
			} 
			return char
		});

	const charCachePos: Record<string, boolean> = {}
	const dedupeChars = chars.filter(char => {
		const key = `${char[1]},${char[2]}`
		const posFromCache = charCachePos[key]
		if (posFromCache) {
			return false
		} else {
			charCachePos[key] = true;
			return true;
		}
	})

	return dedupeChars.map(chars => parseInt(scannedMap[chars[1]][chars[2]], 10))
}

const ratios: number[] = []
scannedMap.forEach((row, y) => {
	row.forEach((char, x) => {
		if (char !== '*') {
			return
		}

		const numbers = getAllNumbersAroundPosition(y, x)
		if (numbers.length === 2) {
			const ratio = numbers[0] * numbers[1]
			ratios.push(ratio)
		}
	})
})

const result = ratios.reduce((total, curr) => total + curr, 0)
console.log(result)
