import { readFileSync } from 'fs'

describe('day10', () => {
  const input = `
  .....
  .S-7.
  .|.|.
  .L-J.
  .....
  `

  // function that parses an input string into a matrix
  function parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((row) => row.trim().split(''))
  }

  // function that navigates a matrix
  // it takes a matrix, a starting point, an ending point and a direction (up, down, left, right)
  // the goal is to reach the ending point
  // the function should return the path taken
  // the rules for navigating are:
  // - if the character is -, then you can move horizontally in the direction you are going
  // - if the character is |, then you can move vertically in the direction you are going
  // - if the character is 7 and you are coming from the left, then you can move down
  // - if the character is 7 and you are coming from the bottom, then you can move left
  // - if the character is J, and you are coming from the left, then you can move up
  // - if the character is J, and you are coming from the top, then you can move left
  // - if the character is L, and you are coming from the right, then you can move up
  // - if the character is L, and you are coming from the top, then you can move right
  // - if the character is F, and you are coming from the right, then you can move down
  // - if the character is F, and you are coming from the bottom, then you can move right
  // once you reach the ending point, you should return the path taken
  // if you cannot reach the ending point, you should return null
  const navigate = (
    input: string[][],
    start: [number, number],
    end: [number, number],
    direction: 'up' | 'down' | 'left' | 'right',
    steps = 1
  ): Number | null => {
    let [x, y] = start
    const [endX, endY] = end

    while (x !== endX || y !== endY) {
      const current = input[x][y]

      if (current === '-') {
        if (direction === 'left') {
          y -= 1
        } else if (direction === 'right') {
          y += 1
        }
      } else if (current === '|') {
        if (direction === 'up') {
          x -= 1
        } else if (direction === 'down') {
          x += 1
        }
      } else if (current === '7') {
        if (direction === 'right') {
          x += 1
          direction = 'down'
        } else if (direction === 'up') {
          y -= 1
          direction = 'left'
        }
      } else if (current === 'J') {
        if (direction === 'down') {
          y -= 1
          direction = 'left'
        } else if (direction === 'right') {
          x -= 1
          direction = 'up'
        }
      } else if (current === 'L') {
        if (direction === 'left') {
          x -= 1
          direction = 'up'
        } else if (direction === 'down') {
          y += 1
          direction = 'right'
        }
      } else if (current === 'F') {
        if (direction === 'left') {
          x += 1
          direction = 'down'
        } else if (direction === 'up') {
          y += 1
          direction = 'right'
        }
      } else {
        return null
      }

      steps += 1
    }

    return steps
  }

  // function that finds the character S in a matrix and returns a list of objects with the character and its coordinates
  // the list contains the coordinates of the character S and coordinates of sorrounding characters (up, down, left, right)
  const findS = (input: string[][]): any => {
    const result: { character: string; coordinates: [number, number] }[] = []
    for (let i = 0; i < input.length; i++) {
      const row = input[i]
      for (let j = 0; j < row.length; j++) {
        const character = row[j]
        if (character === 'S') {
          result.push({ character, coordinates: [i, j] })
          result.push({ character: row[j + 1], coordinates: [i, j + 1] })
          result.push({ character: row[j - 1], coordinates: [i, j - 1] })
          result.push({ character: input[i + 1][j], coordinates: [i + 1, j] })
          result.push({ character: input[i - 1][j], coordinates: [i - 1, j] })
        }
      }
    }
    return result.filter((item) => !!item.character && item.character !== '.')
  }

  it('works to parse the input', () => {
    expect(parseInput(input)).toEqual([
      ['.', '.', '.', '.', '.'],
      ['.', 'S', '-', '7', '.'],
      ['.', '|', '.', '|', '.'],
      ['.', 'L', '-', 'J', '.'],
      ['.', '.', '.', '.', '.'],
    ])
  })

  it('works to navigate', () => {
    let input = `
    .....
    .S-7.
    .|.|.
    .L-J.
    .....
    `
    // expect(navigate(parseInput(input), [1, 2], [1, 1], 'right')).toEqual(8)

    input = `
    ..F7.
    .FJ|.
    SJ.L7
    |F--J
    LJ...
    `

    // [
    //   [ '.', '.', 'F', '7', '.' ],
    //   [ '.', 'F', 'J', '|', '.' ],
    //   [ 'S', 'J', '.', 'L', '7' ],
    //   [ '|', 'F', '-', '-', 'J' ],
    //   [ 'L', 'J', '.', '.', '.' ]
    // ]

    expect(navigate(parseInput(input), [3, 0], [2, 0], 'down')).toEqual(16)
  })

  it('works to navigate the real input', () => {
    const input = readFileSync('./src/day10/input', 'utf8')

    expect(navigate(parseInput(input), [121, 110], [120, 110], 'down')).toEqual(
      6870 * 2
    )
  })
})
