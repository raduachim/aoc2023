import { getFirstDigit, getInput, getTwoDigits, part1, part2 } from './index'

const input = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`

describe('getInput', () => {
  it('works with supplied input', () => {
    const result = getInput(input)
    expect(result).toEqual([
      'two1nine',
      'eightwothree',
      'abcone2threexyz',
      'xtwone3four',
      '4nineeightseven2',
      'zoneight234',
      '7pqrstsixteen',
    ])
  })

  it('reads the input file if no supplied input', () => {
    const result = getInput()
    expect(result.length).toBeGreaterThan(50)
  })
})

describe('getFirstDigit', () => {
  it('works', () => {
    const result = getFirstDigit(getInput(input)[0], 'left', true)
    expect(result).toBe(2)
  })

  it('works for all input', () => {
    const result = getFirstDigit(getInput(input)[1], 'left', true)
    expect(result).toBe(8)
  })

  it('works for input with multiple occurence of the same digit', () => {
    const left = getFirstDigit('five11eight1', 'left', true)
    const right = getFirstDigit('five11eight1', 'right', true)
    expect(left).toBe(5)
    expect(right).toBe(1)
  })
})

describe('getTwoDigits', () => {
  it('works for all words in the test input', () => {
    const data = getInput(input)

    const result = data.map((item) => getTwoDigits(item, true))

    expect(result).toEqual([29, 83, 13, 24, 42, 14, 76])
  })
})

describe('part1', () => {
  it('works for the real input', () => {
    const result = part1()
    expect(result).toBe(55172)
  })
})

describe('part2', () => {
  it('works for the test input', () => {
    const result = part2(input)
    expect(result).toBe(281)
  })

  it('works for the real input', () => {
    const result = part2()
    expect(result).toBe(54925)
  })
})
