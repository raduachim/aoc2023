import { readFileSync } from 'fs'

describe('day5 redone', () => {
  const input = `
  seeds: 79 14 55 13

  seed-to-soil map:
  50 98 2
  52 50 48

  soil-to-fertilizer map:
  0 15 37
  37 52 2
  39 0 15

  fertilizer-to-water map:
  49 53 8
  0 11 42
  42 0 7
  57 7 4

  water-to-light map:
  88 18 7
  18 25 70

  light-to-temperature map:
  45 77 23
  81 45 19
  68 64 13

  temperature-to-humidity map:
  0 69 1
  1 0 69

  humidity-to-location map:
  60 56 37
  56 93 4
  `

  type Map = {
    source: [number, number]
    destination: [number, number]
    range: number
  }[]

  type Input = {
    seeds: number[]
    seedToSoilMap: Map
    soilToFertilizerMap: Map
    fertilizerToWaterMap: Map
    waterToLightMap: Map
    lightToTemperatureMap: Map
    temperatureToHumidityMap: Map
    humidityToLocationMap: Map
  }

  // function that sorts a Map by the source first element
  const sortMap = (map: Map) => {
    map.sort((a, b) => a.source[0] - b.source[0])
  }

  // function that parses input and returns information from it as follows:
  // 1. it first finds the seeds line and extracts the seeds from it
  // 2. it then goes through all the maps and extracts the information into maps of type Map like this:
  // - the third number in a line defines a range length
  // - the second number in the line defines the start of the range for the key
  // - the first number in the line defines the start of the range for the value
  // - the key is a tuple of [start, start + length - 1]
  // - the value is a tuple of [start, start + length - 1]
  // an example for the seed-to-soil map:
  // {
  //   [0, 49]: [0, 49],
  //   [98, 99]: [50, 51],
  //   [50, 97]: [52, 99]
  // }
  // 3. it returns an object of type Input with all the information
  const parseInput = (input: string): Input => {
    const lines = input
      .trim()
      .split('\n')
      .map((line) => line.trim())
    const seeds = lines[0]
      .split(' ')
      .slice(1)
      .map((seed) => parseInt(seed, 10))

    const seedToSoilMap: Map = []
    const soilToFertilizerMap: Map = []
    const fertilizerToWaterMap: Map = []
    const waterToLightMap: Map = []
    const lightToTemperatureMap: Map = []
    const temperatureToHumidityMap: Map = []
    const humidityToLocationMap: Map = []

    let currentMap: Map = seedToSoilMap

    let max = 0
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i]
      if (line === '') {
        continue
      }
      if (line === 'seed-to-soil map:') {
        max = 0
        sortMap(currentMap)
        currentMap = seedToSoilMap
        // currentMap[0] = 0
      } else if (line === 'soil-to-fertilizer map:') {
        max = 0
        sortMap(currentMap)
        currentMap = soilToFertilizerMap
        // currentMap[0] = 0
      } else if (line === 'fertilizer-to-water map:') {
        max = 0
        sortMap(currentMap)
        currentMap = fertilizerToWaterMap
        // currentMap[0] = 0
      } else if (line === 'water-to-light map:') {
        max = 0
        sortMap(currentMap)
        currentMap = waterToLightMap
        // currentMap[0] = 0
      } else if (line === 'light-to-temperature map:') {
        max = 0
        sortMap(currentMap)
        currentMap = lightToTemperatureMap
        // currentMap[0] = 0
      } else if (line === 'temperature-to-humidity map:') {
        max = 0
        sortMap(currentMap)
        currentMap = temperatureToHumidityMap
        // currentMap[0] = 0
      } else if (line === 'humidity-to-location map:') {
        max = 0
        sortMap(currentMap)
        currentMap = humidityToLocationMap
        // currentMap[0] = 0
      } else {
        const [first, second, third] = line
          .split(' ')
          .map((number) => parseInt(number, 10))

        currentMap.push({
          destination: [first, first + third - 1],
          source: [second, second + third - 1],
          range: third,
        })

        if (second + third - 1 > max) {
          max = second + third - 1
        }

        // currentMap[`${second}`] = first
        // currentMap[max] = second + third - 1
        // currentMap[max + 1] = max + 1

        // currentMap[`${[second, second + third - 1]}`] = [
        //   first,
        //   first + third - 1,
        // ]
      }
    }

    return {
      seeds,
      seedToSoilMap,
      soilToFertilizerMap,
      fertilizerToWaterMap,
      waterToLightMap,
      lightToTemperatureMap,
      temperatureToHumidityMap,
      humidityToLocationMap,
    }
  }

  // const getResult = (map: Map, number: number): number => {
  //   let left = 0
  //   let right = map.length - 1

  //   while (left <= right) {
  //     const mid = Math.floor((left + right) / 2)
  //     const range = map[mid]

  //     if (number >= range.source[0] && number <= range.source[1]) {
  //       return number - range.source[0] + range.destination[0]
  //     } else if (number < range.source[0]) {
  //       right = mid - 1
  //     } else {
  //       left = mid + 1
  //     }
  //   }

  //   return number
  // }

  // function that takes a Map and a number as input and returns a number as a result
  // it finds the source range that contains the number
  // if a range is found it will calculate the result for the number being the number minus the start of the source range plus the start of the destination range
  // if no range is found it will return the number
  // const getResult = (map: Map, number: number): number => {
  //   for (let i = 0; i < map.length; i++) {
  //     const range = map[i]
  //     if (number >= range.source[0] && number <= range.source[1]) {
  //       return number - range.source[0] + range.destination[0]
  //     }
  //   }
  //   return number
  // }

  const getResult = (
    map: Map,
    number: number,
    rangeToSearch: 'source' | 'destination' = 'source'
  ): number => {
    for (let i = 0; i < map.length; i++) {
      const range = map[i]
      if (
        number >= range[rangeToSearch][0] &&
        number <= range[rangeToSearch][1]
      ) {
        if (rangeToSearch === 'source') {
          return number - range.source[0] + range.destination[0]
        } else {
          return number - range.destination[0] + range.source[0]
        }
      }
    }
    return number
  }

  const calculate = (parsed: Input, value: number): number => {
    const seedToSoilMap = parsed.seedToSoilMap
    const soilToFertilizerMap = parsed.soilToFertilizerMap
    const fertilizerToWaterMap = parsed.fertilizerToWaterMap
    const waterToLightMap = parsed.waterToLightMap
    const lightToTemperatureMap = parsed.lightToTemperatureMap
    const temperatureToHumidityMap = parsed.temperatureToHumidityMap
    const humidityToLocationMap = parsed.humidityToLocationMap

    // const seedValue = getResult(seedToSoilMap, value)
    // // console.log('seedValue', seedValue)
    // const soilValue = getResult(soilToFertilizerMap, seedValue)
    // // console.log('soilValue', soilValue)
    // const fertilizerValue = getResult(fertilizerToWaterMap, soilValue)
    // // console.log('fertilizerValue', fertilizerValue)
    // const waterValue = getResult(waterToLightMap, fertilizerValue)
    // // console.log('waterValue', waterValue)
    // const lightValue = getResult(lightToTemperatureMap, waterValue)
    // // console.log('lightValue', lightValue)
    // const temperatureValue = getResult(temperatureToHumidityMap, lightValue)
    // // console.log('temperatureValue', temperatureValue)
    // const humidityValue = getResult(humidityToLocationMap, temperatureValue)
    // console.log('humidityValue', humidityValue)
    // return humidityValue
    return getResult(
      humidityToLocationMap,
      getResult(
        temperatureToHumidityMap,
        getResult(
          lightToTemperatureMap,
          getResult(
            waterToLightMap,
            getResult(
              fertilizerToWaterMap,
              getResult(soilToFertilizerMap, getResult(seedToSoilMap, value))
            )
          )
        )
      )
    )
  }

  // function that takes an Input and a value and returns a number as a result
  const calculateBackwards = (parsed: Input, value: number): number => {
    const seedToSoilMap = parsed.seedToSoilMap
    const soilToFertilizerMap = parsed.soilToFertilizerMap
    const fertilizerToWaterMap = parsed.fertilizerToWaterMap
    const waterToLightMap = parsed.waterToLightMap
    const lightToTemperatureMap = parsed.lightToTemperatureMap
    const temperatureToHumidityMap = parsed.temperatureToHumidityMap
    const humidityToLocationMap = parsed.humidityToLocationMap

    const humidityValue = getResult(humidityToLocationMap, value, 'destination')

    const temperatureValue = getResult(
      temperatureToHumidityMap,
      humidityValue,
      'destination'
    )

    const lightValue = getResult(
      lightToTemperatureMap,
      temperatureValue,
      'destination'
    )

    const waterValue = getResult(waterToLightMap, lightValue, 'destination')

    const fertilizerValue = getResult(
      fertilizerToWaterMap,
      waterValue,
      'destination'
    )
    const soilValue = getResult(
      soilToFertilizerMap,
      fertilizerValue,
      'destination'
    )
    const seedValue = getResult(seedToSoilMap, soilValue, 'destination')

    return seedValue
  }

  const calculatePart1 = (parsed: Input): number => {
    let min = Infinity

    parsed.seeds.forEach((seed) => {
      const result = calculate(parsed, seed)
      if (result < min) {
        min = result
      }
    })

    return min
  }

  it('works to parse input', () => {
    const expected: Input = {
      seeds: [79, 14, 55, 13],
      seedToSoilMap: [
        {
          destination: [52, 99],
          source: [50, 97],
          range: 48,
        },
        {
          destination: [50, 51],
          source: [98, 99],
          range: 2,
        },
      ],
      soilToFertilizerMap: [
        {
          destination: [39, 53],
          source: [0, 14],
          range: 15,
        },
        {
          destination: [0, 36],
          source: [15, 51],
          range: 37,
        },
        {
          destination: [37, 38],
          source: [52, 53],
          range: 2,
        },
      ],
      fertilizerToWaterMap: [
        {
          destination: [42, 48],
          source: [0, 6],
          range: 7,
        },
        {
          destination: [57, 60],
          source: [7, 10],
          range: 4,
        },
        {
          destination: [0, 41],
          source: [11, 52],
          range: 42,
        },
        {
          destination: [49, 56],
          source: [53, 60],
          range: 8,
        },
      ],
      waterToLightMap: [
        {
          destination: [88, 94],
          source: [18, 24],
          range: 7,
        },
        {
          destination: [18, 87],
          source: [25, 94],
          range: 70,
        },
      ],
      lightToTemperatureMap: [
        {
          destination: [81, 99],
          source: [45, 63],
          range: 19,
        },
        {
          destination: [68, 80],
          source: [64, 76],
          range: 13,
        },
        {
          destination: [45, 67],
          source: [77, 99],
          range: 23,
        },
      ],
      temperatureToHumidityMap: [
        {
          destination: [1, 69],
          source: [0, 68],
          range: 69,
        },
        {
          destination: [0, 0],
          source: [69, 69],
          range: 1,
        },
      ],
      humidityToLocationMap: [
        {
          destination: [60, 96],
          source: [56, 92],
          range: 37,
        },
        {
          destination: [56, 59],
          source: [93, 96],
          range: 4,
        },
      ],
    }

    expect(parseInput(input)).toEqual(expected)
  })

  it('works to parse a range going backwards', () => {
    const parsed = parseInput(input)

    expect(calculateBackwards(parsed, 82)).toEqual(79)
    expect(calculateBackwards(parsed, 43)).toEqual(14)
    expect(calculateBackwards(parsed, 86)).toEqual(55)
    expect(calculateBackwards(parsed, 35)).toEqual(13)
    expect(calculateBackwards(parsed, 13)).toEqual(38)
  })

  // it('works to get a value from a map for a value', () => {
  //   const parsed = parseInput(input)

  //   expect(getResult(parsed.seedToSoilMap, 79)).toEqual(81)
  //   expect(getResult(parsed.seedToSoilMap, 14)).toEqual(14)
  //   expect(getResult(parsed.seedToSoilMap, 55)).toEqual(57)
  //   expect(getResult(parsed.seedToSoilMap, 13)).toEqual(13)
  // })

  // it('works to get the final value for each seed', () => {
  //   const parsed = parseInput(input)

  //   expect(calculate(parsed, 79)).toEqual(82)
  //   expect(calculate(parsed, 14)).toEqual(43)
  //   expect(calculate(parsed, 55)).toEqual(86)
  //   expect(calculate(parsed, 13)).toEqual(35)
  // })

  // it('works to get the final result for test data', () => {
  //   const parsed = parseInput(input)
  //   expect(calculatePart1(parsed)).toEqual(35)
  // })

  // it('works to get the final result for real data', () => {
  //   const input = readFileSync('./src/day5/input', 'utf8')
  //   const parsed = parseInput(input)
  //   expect(calculatePart1(parsed)).toEqual(107430936)
  // })

  // function that takes a list of numbers as input and groups them into groups of 2
  // and then returns a list of the new groups
  const group = (numbers: number[]): number[][] => {
    const groups: number[][] = []
    for (let i = 0; i < numbers.length; i += 2) {
      groups.push([numbers[i], numbers[i + 1]])
    }
    return groups
  }

  // function that takes an array of 2 numbers as input
  // the first number is the start of the range
  // the second number is the length of the range
  // using the fastest way to iterate over a range in JavaScript
  // it will use the calculate function to calculate the result for each number in the range
  // it will then return the minimum result

  const calculateRange = (parsed: Input, range: number[]): number => {
    let min = Infinity

    for (let i = range[0]; i < range[0] + range[1]; i++) {
      const result = calculate(parsed, i)
      if (!isFinite(result)) {
        console.log('value that returns NaN', i)
      }
      if (result < min) {
        min = result
      }
      console.log(
        'range',
        'i',
        'min',
        'left-to-calculate',
        range,
        i,
        min,
        range[0] + range[1] - i
      )
    }

    return min
  }

  const calculateRangesBackwards = (parsed: Input, ranges: number[][]) => {
    let min = 0

    while (true) {
      if (min % 100000000 === 0) {
        console.log('processed 100 million numbers')
      }
      const result = calculateBackwards(parsed, min)

      if (isInRange(ranges, result)) {
        return min
      }

      min++
    }
  }

  // function that takes input the grouped ranges and a value as input
  // it checks if the values is in any of the ranges
  // if it is it will return true
  // if it is not it will return false
  const isInRange = (ranges: number[][], value: number) => {
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i]
      if (value >= range[0] && value <= range[0] + range[1]) {
        return true
      }
    }
    return false
  }

  it.skip('works for part2 with test input', () => {
    const input = readFileSync('./src/day5/input', 'utf8')
    const parsed = parseInput(input)
    // console.log(group(parsed.seeds))

    const min = calculateRangesBackwards(parsed, group(parsed.seeds))

    expect(min).toEqual(23738616)
  })
})
