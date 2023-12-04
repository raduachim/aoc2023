import { readFileSync } from 'fs'

const getInput = (input?: string) => {
  const inputArray = (input || readFileSync('./src/day3/input', 'utf8'))
    .trim()
    .split('\n')

  return inputArray
}

// function that parses the input into a matrix
// it splits the input by new line
// it filters out empty lines
// it splits each line by character
// it returns the matrix
export const parseInput = (input: string) => {
  const matrix = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      return line.split('')
    })
  return matrix
}

export const part1 = (input?: string) => {
  const textInput = getInput(input)

  return textInput
}
