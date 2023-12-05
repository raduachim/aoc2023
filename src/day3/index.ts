import { readFileSync } from 'fs'

const getInput = (input?: string) => {
  const inputArray = (input || readFileSync('./src/day3/input', 'utf8')).trim()

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

// function that takes a matrix and iterates over each row looking for numbers
// a number is made out of consecutive digits
// it returns an array of objects with the number and its coordinates
export const findNumbers = (matrix: string[][]) => {
  const numbers: { number: number; coordinates: number[][] }[] = []
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i]
    let number: string[] = []
    let coordinates: number[][] = []
    for (let j = 0; j < row.length; j++) {
      const character = row[j]
      if (Number(character)) {
        number.push(character)
        coordinates.push([i, j])
      } else {
        if (number.length > 1) {
          numbers.push({ number: Number(number.join('')), coordinates })
        }
        number = []
        coordinates = []
      }
    }
  }
  return numbers
}

// function that traverses the matrix and finds all special characters
// a special character is a character that is not a number or a dot
// it returns the coordinates of the special characters
export const findSpecialCharacters = (matrix: string[][]) => {
  const specialCharacters: number[][] = []
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i]
    for (let j = 0; j < row.length; j++) {
      const character = row[j]
      if (character !== '.' && !Number(character) && character !== '0') {
        specialCharacters.push([i, j])
      }
    }
  }
  return specialCharacters
}

// function that takes a matrix and set of coordinates
// it checks around the coordinates for all digits in a 3x3 grid
// it returns the coordinates of the digits
export const findDigitsAroundCoordinates = (
  matrix: string[][],
  coordinates: number[]
) => {
  try {
    const [row, column] = coordinates
    const digits: number[][] = []
    for (let i = row - 1; i <= row + 1; i++) {
      const row = matrix[i]
      for (let j = column - 1; j <= column + 1; j++) {
        const character = row[j]
        if (Number(character)) {
          digits.push([i, j])
        }
      }
    }
    return digits
  } catch (ex) {
    console.log(coordinates)
    throw ex
  }
}

// function that takes a list of numbers and their coordinates and a set of coordinates
// it checks if the coordinates are part of a number
// it returns the number
export const findNumberByCoordinates = (
  numbers: { number: number; coordinates: number[][] }[],
  coordinates: number[]
) => {
  for (const number of numbers) {
    for (const coordinate of number.coordinates) {
      if (
        coordinate[0] === coordinates[0] &&
        coordinate[1] === coordinates[1]
      ) {
        return number.number
      }
    }
  }
  return null
}

// function that filters out duplicate consecutive numbers in a list
// it returns the list without duplicates
export const filterOutDuplicates = (list: number[]) => {
  const filteredList: number[] = []
  for (let i = 0; i < list.length; i++) {
    const number = list[i]
    const previousNumber = list[i - 1]
    if (number !== previousNumber) {
      filteredList.push(number)
    }
  }
  return filteredList
}

export const part1 = (input?: string) => {
  const textInput = getInput(input)
  const matrix = parseInput(textInput)

  const numbers = findNumbers(matrix)
  const specialCharactersCoordinates = findSpecialCharacters(matrix)
  const digitsCoordinates = specialCharactersCoordinates.flatMap(
    (coordinates) => findDigitsAroundCoordinates(matrix, coordinates)
  )
  const result = filterOutDuplicates(
    digitsCoordinates
      .map((coordinates) => findNumberByCoordinates(numbers, coordinates))
      .filter((number) => !!number)
  )

  return result.reduce((acc, number) => acc + number, 0)
}
