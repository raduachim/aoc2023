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

const inputCombination = {
  red: 12,
  green: 13,
  blue: 14,
}

// function that validates the possibility of a game
// and returns true if the game is possible
// and returns false if the game is not possible
// it takes a game as the first argument and an inputCombination as the second argument
// for each color in the inputCombination it checks the game's maximumScorePerColor equivalent color
// and if the maximumScorePerColor is greater than the inputCombination's color then it returns false
// otherwise it returns true
export const validateGamePossibility = (
  maximumScorePerColor: { [key: string]: number },
  inputCombination: { [key: string]: number }
) => {
  const keys = Object.keys(maximumScorePerColor)
  const isValid = keys.every((key) => {
    const maximumScore = maximumScorePerColor[key]
    const inputCombinationScore = inputCombination[key]
    return maximumScore <= inputCombinationScore
  })
  return isValid
}

export const part1 = (input?: string) => {
  const textInput = getInput(input)

  return textInput
    .map((line) => {
      const parsedGame = parseGameToDictionaryOfColorAndNumber(parseLine(line))
      const game = {
        game: parsedGame.game,
        maximumScorePerColor: getMaximumScorePerColor(parsedGame.results),
      }
      const isPossible = validateGamePossibility(
        game.maximumScorePerColor,
        inputCombination
      )

      return {
        game: game.game,
        isPossible,
      }
    })
    .filter((game) => game.isPossible)
    .reduce((acc, game) => {
      return acc + game.game
    }, 0)
}

export const part2 = (input?: string) => {
  const textInput = getInput(input)

  return textInput
    .map((line) => {
      const parsedGame = parseGameToDictionaryOfColorAndNumber(parseLine(line))
      const maximumScorePerColor = getMaximumScorePerColor(parsedGame.results)
      return Object.values(maximumScorePerColor).reduce((acc, value) => {
        return acc * value
      }, 1)
    })
    .reduce((acc, power) => {
      return acc + power
    }, 0)
}
