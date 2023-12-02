import {
  parseGameToDictionaryOfColorAndNumber,
  getMaximumScorePerColor,
  parseLine,
  validateGamePossibility,
} from './index'

describe.only('day2', () => {
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
      const actual = validateGamePossibility(inputGame, inputCombination)
      const expected = false
      expect(actual).toEqual(expected)
    })
  })
})
