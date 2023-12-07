import { readFileSync } from 'fs'

describe.only('day 6', () => {
  const input = `
  Time:      7  15   30
  Distance:  9  40  200
  `

  const parseInput = (input: string) => {
    const lines = input.split('\n').filter(Boolean)
    const times = lines[0].trim().split(/\s+/).slice(1).map(Number)
    const distances = lines[1].trim().split(/\s+/).slice(1).map(Number)
    return times.map((time, i) => ({ time, distance: distances[i] }))
  }

  const calculateDistance = (speed: number, time: number) => speed * time

  const calculateScenarios = ({
    time,
    distance,
  }: {
    time: number
    distance: number
  }) => {
    let i = 0
    let possibleDistance = 0

    while (possibleDistance > -1) {
      possibleDistance = calculateDistance(i, time - i)
      console.log('possibleDistance', possibleDistance)
      ++i
    }
  }

  it('should parse the input', () => {
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
    calculateScenarios(parsed[0])
  })
})
