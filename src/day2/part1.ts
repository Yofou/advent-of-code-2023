import * as fs from "node:fs";

const BAG_COLORS = {
	red: 'red',
	green: 'green',
	blue: 'blue',
}

const BAG_LIMITS = {
	[BAG_COLORS.red]: 12,
	[BAG_COLORS.green]: 13,
	[BAG_COLORS.blue]: 14
}

const file = fs.readFileSync('./src/day2/day2.txt').toString()

const newLines = file.split('\n')
newLines.pop();

type SetOfCubes = Record<keyof typeof BAG_COLORS, number>
const games = newLines.map((line) => {
	const getRoll = line.split(': ')[1]
	const getCubesFromRoll = getRoll.split('; ')

	const getPlays = getCubesFromRoll.map(roll => {
		const plays = roll.split(', ')
		const cubes = plays.map(play => play.split(' '))

		const asObject = cubes.reduce((total, curr) => {
			total[curr[1] as keyof typeof BAG_COLORS] = parseInt(curr[0], 10)
			return total
		}, {} as SetOfCubes)

		return asObject;
	})

	return getPlays
})

const isAnySetImpossible = (sets: SetOfCubes[]) => {
	const isImpossible = sets.some((set) => {
		const keys = Object.keys(set) as unknown as (keyof SetOfCubes)[]

		for (let key of keys) {
			const limit = BAG_LIMITS[key]
			const number = set[key]

			if (number > limit) {
				return true;
			}
		}

		return false
	})
	return isImpossible
}

let gamesImpossible = 0;
games.forEach((game, index) => {
	const isImpossible = isAnySetImpossible(game)
	if (!isImpossible) {
		gamesImpossible += (index + 1)
	}
})

console.log(gamesImpossible)
	
