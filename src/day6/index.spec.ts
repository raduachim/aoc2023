import { readFileSync } from 'fs'

type Input = {
  time: number
  distance: number
}[]

describe.skip('day 6', () => {
  const input = `
  Time:      7  15   30
  Distance:  9  40  200
  `

  const parseInput = (input: string): Input => {
    const lines = input.split('\n').filter(Boolean)
    const times = lines[0].trim().split(/\s+/).slice(1).map(Number)
    const distances = lines[1].trim().split(/\s+/).slice(1).map(Number)
    return times.map((time, i) => ({ time, distance: distances[i] }))
  }

  const calculateDistance = (buttonTime: number, totalTime: number) =>
    buttonTime * (totalTime - buttonTime)

  const calculatePossibleScenarios = ({
    time,
    distance,
  }: {
    time: number
    distance: number
  }) => {
    let possibleScenarios = 0
    for (let i = 0; i <= time; i++) {
      const possibleDistance = calculateDistance(i, time)
      if (possibleDistance > distance) {
        possibleScenarios++
      }
    }

    return possibleScenarios
  }

  const calculate = (input: Input) => {
    let result = 1

    for (let i = 0; i < input.length; i++) {
      const possibleScenarios = calculatePossibleScenarios(input[i])
      result *= possibleScenarios
    }

    return result
  }

  it('works for test input part1', () => {
    const parsed = parseInput(input)
    expect(parsed).toEqual([
      {
        time: 7,
        distance: 9,
      },
      {
        time: 15,
        distance: 40,
      },
      {
        time: 30,
        distance: 200,
      },
    ])

    expect(calculate(parsed)).toEqual(288)
  })

  it('works for test input part2', () => {
    const parsed = parseInput(input)

    const actualInput = parsed.reduce((acc, { time, distance }) => {
      if (!acc.length) {
        acc.push({
          time,
          distance,
        })
      } else {
        acc[0].time = Number(`${acc[0].time}${time}`)
        acc[0].distance = Number(`${acc[0].distance}${distance}`)
      }
      return acc
    }, [] as Input)

    expect(calculate(actualInput)).toEqual(71503)
  })

  it('works for real input part1', () => {
    const input = readFileSync('./src/day6/input', 'utf8')
    const parsed = parseInput(input)

    expect(calculate(parsed)).toEqual(6209190)
  })

  it('works for real input part2', () => {
    const input = readFileSync('./src/day6/input', 'utf8')
    const parsed = parseInput(input)

    const actualInput = parsed.reduce((acc, { time, distance }) => {
      if (!acc.length) {
        acc.push({
          time,
          distance,
        })
      } else {
        acc[0].time = Number(`${acc[0].time}${time}`)
        acc[0].distance = Number(`${acc[0].distance}${distance}`)
      }
      return acc
    }, [] as Input)

    expect(calculate(actualInput)).toEqual(28545089)
  })
})
