import {
  parseGameToDictionaryOfColorAndNumber,
  getMaximumScorePerColor,
  parseLine,
  validateGamePossibility,
  part1,
  part2
} from './index'

describe('day2', () => {
  describe('parseLine', () => {
    it('works', () => {
      const input: string =
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
      const actual = parseLine(input)
      const expected = {
        game: 1,
        input: '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('parseGameToDictionaryOfColorAndNumber', () => {
    it('should return the correct answer', () => {
      const input = {
        game: 1,
        input:
          '8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      }
      const actual = parseGameToDictionaryOfColorAndNumber(input)
      const expected = {
        game: 1,
        results: [
          { color: 'green', number: 8 },
          { color: 'blue', number: 6 },
          { color: 'red', number: 20 },
          { color: 'blue', number: 5 },
          { color: 'red', number: 4 },
          { color: 'green', number: 13 },
          { color: 'green', number: 5 },
          { color: 'red', number: 1 },
        ],
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('getMaximumScorePerColor', () => {
    it('works', () => {
      const input = [
        { color: 'green', number: 8 },
        { color: 'blue', number: 6 },
        { color: 'red', number: 20 },
        { color: 'blue', number: 5 },
        { color: 'red', number: 4 },
        { color: 'green', number: 13 },
        { color: 'green', number: 5 },
        { color: 'red', number: 1 },
      ]

      const actual = getMaximumScorePerColor(input)
      const expected = {
        green: 13,
        blue: 6,
        red: 20,
      }

      expect(actual).toEqual(expected)
    })
  })

  describe('validateGamePossibility', () => {
    it('works', () => {
      const inputGame = {
        game: 1,
        maxiumumScorePerColor: {
          green: 13,
          blue: 6,
          red: 20,
        },
      }
      const inputCombination = {
        red: 12,
        green: 13,
        blue: 14,
      }
      const actual = validateGamePossibility(
        inputGame.maxiumumScorePerColor,
        inputCombination
      )
      const expected = false
      expect(actual).toEqual(expected)
    })
  })

  describe('part1', () => {
    it('works with the test input', () => {
      const input = `
      Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
      Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
      Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

      const actual = part1(input)
      expect(actual).toEqual(8)
    })

    it('works with the real input', () => {
      const actual = part1()
      expect(actual).toEqual(2541)
    })
  })

  describe('part2', () => {
    it('works with the test input', () => {
      const input = `
      Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
      Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
      Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
      `
      const actual = part2(input)
      expect(actual).toEqual(2286)
    })

    it('works with the real input', () => {
      const actual = part2()
      expect(actual).toEqual(66016)
    })
  })
})
