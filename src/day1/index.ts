import { readFileSync } from 'fs'

// function that takes input a string and returns a number composed from the first digit from the left and the first digit from the right
export const getTwoDigits = (str: string, includeWords = false) => {
  // return the number composed from the first digit from the left and the first digit from the right

  return Number(
    `${getFirstDigit(str, 'left', includeWords)}${getFirstDigit(
      str,
      'right',
      includeWords
    )}`
  )
}

// function that loops through the input array and maps each item and returns the two digits for each item
const getTwoDigitsArray = (inputArray: string[]) => {
  // return the array of two digits
  return inputArray.map((item) => getTwoDigits(item))
}

export const part1 = (input?: string) => {
  const inputArray = getInput(input)
  // get the array of two digits
  const twoDigitsArray = getTwoDigitsArray(inputArray)
  // get the sum of the array of two digits
  const sum = twoDigitsArray.reduce((acc, curr) => acc + curr)
  // return the sum
  return sum
}

const digitsAsWords: { [k: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const digitsAsDigits: { [k: string]: number } = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
}

const getDigitsFromString = (
  str: string,
  includeWords: boolean
): { [k: number]: number } => {
  const dictionary = includeWords
    ? { ...digitsAsWords, ...digitsAsDigits }
    : digitsAsDigits
  return Object.keys(dictionary).reduce((acc, curr) => {
    const regex = new RegExp(curr, 'g')
    const matches = Array.from(str.matchAll(regex))
    matches.forEach((match) => {
      acc[match.index] = dictionary[curr]
    })
    return acc
  }, {} as { [k: number]: number })
}

// function that takes an input a string and a direction left | right
// it uses getDigitsFromString to get the digits from the string
// for direction left it returns the value from the dictionary with the lowest index
// for direction right it returns the value from the dictionary with the highest index
export const getFirstDigit = (
  str: string,
  direction: 'left' | 'right',
  includeWords: boolean
) => {
  // get the digits from the string
  const digits = getDigitsFromString(str, includeWords)
  // if direction is left
  if (direction === 'left') {
    // return the value from the dictionary with the lowest index
    return digits[Math.min(...Object.keys(digits).map(Number))]
  }
  // if direction is right
  if (direction === 'right') {
    // return the value from the dictionary with the highest index
    return digits[Math.max(...Object.keys(digits).map(Number))]
  }
}

export const getInput = (input?: string) => {
  const inputArray = (input || readFileSync('./src/day1/input', 'utf8'))
    .trim()
    .split('\n')

  return inputArray
}

export const part2 = (input?: string) => {
  const inputArray = getInput(input)

  const twoDigitsArray = inputArray.map((item) => {
    return getTwoDigits(item, true)
  })

  const sum = twoDigitsArray.reduce((acc, curr) => acc + curr)

  return sum
}
