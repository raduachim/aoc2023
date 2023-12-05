import { getDefaultResultOrder } from 'dns'
import {
  checkForSpecialCharacters,
  filterOutDuplicates,
  findDigitsAroundCoordinates,
  // findNumberByCoordinates,
  findNumbers,
  findSpecialCharacters,
  parseInput,
  part1,
} from '../day3'

describe.only('day3', () => {
  const input = `
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..
    `

  const matrix = parseInput(input)

  it('works to parse the input', () => {
    const expected = [
      ['4', '6', '7', '.', '.', '1', '1', '4', '.', '.'],
      ['.', '.', '.', '*', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '3', '5', '.', '.', '6', '3', '3', '.'],
      ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
      ['6', '1', '7', '*', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '+', '.', '5', '8', '.'],
      ['.', '.', '5', '9', '2', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '7', '5', '5', '.'],
      ['.', '.', '.', '$', '.', '*', '.', '.', '.', '.'],
      ['.', '6', '6', '4', '.', '5', '9', '8', '.', '.'],
    ]

    expect(matrix).toEqual(expected)
  })

  it('works to find all numbers in a matrix', () => {
    const numbers = findNumbers(matrix)
    expect(numbers).toEqual([
      {
        number: 467,
        coordinates: [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
      },
      {
        number: 114,
        coordinates: [
          [0, 5],
          [0, 6],
          [0, 7],
        ],
      },
      {
        number: 35,
        coordinates: [
          [2, 2],
          [2, 3],
        ],
      },
      {
        number: 633,
        coordinates: [
          [2, 6],
          [2, 7],
          [2, 8],
        ],
      },
      {
        number: 617,
        coordinates: [
          [4, 0],
          [4, 1],
          [4, 2],
        ],
      },
      {
        number: 58,
        coordinates: [
          [5, 7],
          [5, 8],
        ],
      },
      {
        number: 592,
        coordinates: [
          [6, 2],
          [6, 3],
          [6, 4],
        ],
      },
      {
        number: 755,
        coordinates: [
          [7, 6],
          [7, 7],
          [7, 8],
        ],
      },
      {
        number: 664,
        coordinates: [
          [9, 1],
          [9, 2],
          [9, 3],
        ],
      },
      {
        number: 598,
        coordinates: [
          [9, 5],
          [9, 6],
          [9, 7],
        ],
      },
    ])
  })
  it('works to find all special characters in a matrix', () => {
    const specialCharactersCoordinates = findSpecialCharacters(matrix)

    expect(specialCharactersCoordinates).toEqual([
      [1, 3],
      [3, 6],
      [4, 3],
      [5, 5],
      [8, 3],
      [8, 5],
    ])
  })
  it('works to find coordinates for all digits around the coordinates of a special character', () => {
    const specialCharactersCoordinates = findSpecialCharacters(matrix)
    const digitsCoordinates = findDigitsAroundCoordinates(
      matrix,
      specialCharactersCoordinates[4]
    )

    expect(digitsCoordinates).toEqual([
      [9, 2],
      [9, 3],
    ])
  })
  // it('works to find a number in a matrix by coordinates of a digit', () => {
  //   const numbers = findNumbers(matrix)
  //   const number = findNumberByCoordinates(numbers, [9, 2])

  //   expect(number).toEqual(664)
  // })

  it('works part1 for test input', () => {
    const input = `
...................712...437.........*142.359........551.14......
.847.154..568............@...102................280...*..........
.........*...../..............@.......................426........
`
    const matrix = parseInput(input)
    const numbers = findNumbers(matrix)
    console.log(
      numbers
        .filter(({ coordinates, number }) =>
          checkForSpecialCharacters(matrix, coordinates[0], number)
        )
        .map(({ number }) => number)
    )

    const result = part1(input)
    console.log('result', result)

    expect(result).toEqual([437, 142, 551, 568, 102, 426])
  })

  it('works part1 for real input', () => {
    const result = part1().reduce((acc, number) => acc + number, 0)

    // console.log('result', result)
    // expect(result).toEqual(531318)
    expect(result).toEqual(527144)
  })
})
