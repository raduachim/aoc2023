import { readFileSync } from 'fs'

const getInput = (input?: string) => {
  const inputArray = (input || readFileSync('./src/day2/input', 'utf8'))
    .trim()
    .split('\n')

  return inputArray
}

// function that takes an argument a string like 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
// and splits on the colon and returns an object with the game number and the input
export const parseLine = (input: string) => {
  const [game, rest] = input.split(':')
  return {
    game: Number(game.replace('Game ', '')),
    input: rest.trim(),
  }
}

// function that takes the input and first splits on the semicolon
// then splits each group on the comma
// then splits each color on the space
// then returns an array of objects with the color and the number of the color
export const parseGameToDictionaryOfColorAndNumber = (value: {
  game: number
  input: string
}): { game: number; results: Array<{ color: string; number: number }> } => {
  // '8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
  const groups = value.input.split(';')
  // [
  //   '8 green', '6 blue', '20 red',
  //   '5 blue', '4 red', '13 green',
  //   '5 green', '1 red',
  // ]
  const parsedGroups = groups.map((group) => {
    // group = '8 green', '6 blue', '20 red'
    const colors = group.split(',')
    // colors = ['8 green', '6 blue', '20 red']
    const parsedColors = colors.map((color) => {
      // color = '8 green'
      const [number, colorName] = color.trim().split(' ')
      return {
        color: colorName,
        number: Number(number),
      }
    })
    return parsedColors
  })
  return { game: value.game, results: parsedGroups.flat() }
}

// function that takes the output of parseGameToDictionaryOfColorAndNumber
// and finds the maximum number for each color
// and returns an object where the color is the key and the number is the value
export const getMaximumScorePerColor = (
  input: Array<{ color: string; number: number }>
) => {
  const colorAndNumber = input.reduce((acc, { color, number }) => {
    if (acc[color]) {
      acc[color] = Math.max(acc[color], number)
    } else {
      acc[color] = number
    }
    return acc
  }, {} as { [key: string]: number })
  return colorAndNumber
}

// function that validates the possibility of a game
// and returns true if the game is possible
// and returns false if the game is not possible
// it takes the first input

export const part1 = (input?: string) => {
  const textInput = getInput(input)
  const parsedGame = parseGameToDictionaryOfColorAndNumber(
    parseLine(textInput[0])
  )
  const game = {
    game: parsedGame.game,
    maximumScorePerColor: getMaximumScorePerColor(parsedGame.results),
  }
  return game
}
