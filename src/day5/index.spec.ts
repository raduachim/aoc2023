import { readFileSync } from 'fs'

describe.only('day5', () => {
  // seeds: 79 14 55 13

  // seed-to-soil map:
  //            [0, 49] - [0, 49]
  // 50 98 2 -> [98, 99] - [50, 51]
  // 52 50 48 -> [50, 97] - [52, 99]

  // 79 - 50 = 29

  // 52 + 29 = 81

  // soil-to-fertilizer map:
  // 0 15 37 [15, 51] - [0, 36]
  // 37 52 2 [52, 53] - [37, 38]
  // 39 0 15 [0, 14] - [39, 53]
  //         [54, 99] - [54, 99]

  // fertilizer-to-water map:
  // 49 53 8
  // 0 11 42
  // 42 0 7
  // 57 7 4

  // water-to-light map:
  // 88 18 7
  // 18 25 70

  // light-to-temperature map:
  // 45 77 23
  // 81 45 19
  // 68 64 13

  // [45, 63] -> [81, 99]
  // [64, 76] -> [68, 80]
  // [77, 99] -> [45, 67]

  // lightToTemperatureMap: {
  //   '0': 0,
  //   '45': 81,
  //   '64': 68,
  //   '77': 45,
  //   '100': 100,
  // },

  // temperature-to-humidity map:
  // 0 69 1
  // 1 0 69

  // humidity-to-location map:
  // 60 56 37
  // 56 93 4
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
    [key: string]: number
  }

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

  // function that sorts the keys of a Map asscending by their keys as Numbers
  const sortMap = (map: Map): Map => {
    const sortedMap: Map = {}
    Object.keys(map)
      .map((key) => parseInt(key, 10))
      .sort((a, b) => a - b)
      .forEach((key) => {
        sortedMap[key] = map[key]
      })
    return sortedMap
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

    const seedToSoilMap: Map = {}
    const soilToFertilizerMap: Map = {}
    const fertilizerToWaterMap: Map = {}
    const waterToLightMap: Map = {}
    const lightToTemperatureMap: Map = {}
    const temperatureToHumidityMap: Map = {}
    const humidityToLocationMap: Map = {}

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
        currentMap[0] = 0
      } else if (line === 'soil-to-fertilizer map:') {
        max = 0
        sortMap(currentMap)
        currentMap = soilToFertilizerMap
        currentMap[0] = 0
      } else if (line === 'fertilizer-to-water map:') {
        max = 0
        sortMap(currentMap)
        currentMap = fertilizerToWaterMap
        currentMap[0] = 0
      } else if (line === 'water-to-light map:') {
        max = 0
        sortMap(currentMap)
        currentMap = waterToLightMap
        currentMap[0] = 0
      } else if (line === 'light-to-temperature map:') {
        max = 0
        sortMap(currentMap)
        currentMap = lightToTemperatureMap
        currentMap[0] = 0
      } else if (line === 'temperature-to-humidity map:') {
        max = 0
        sortMap(currentMap)
        currentMap = temperatureToHumidityMap
        currentMap[0] = 0
      } else if (line === 'humidity-to-location map:') {
        max = 0
        sortMap(currentMap)
        currentMap = humidityToLocationMap
        currentMap[0] = 0
      } else {
        const [first, second, third] = line
          .split(' ')
          .map((number) => parseInt(number, 10))

        if (second + third - 1 > max) {
          max = second + third - 1
        }

        currentMap[`${second}`] = first
        // currentMap[max] = second + third - 1
        currentMap[max + 1] = max + 1

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

  // function that takes a Map and a seed as input
  // it gets the keys of the Map and creates a list of ranges made of consecutive keys
  // it then finds the range that contains the seed and returns the minimum of that range
  const getRangeKey = (map: Map, seed: number): number => {
    const keys = Object.keys(map)
    const ranges: number[][] = []
    let range: number[] = []
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (keys[i + 1]) {
        ranges.push([Number(key), Number(keys[i + 1])])
      }
    }

    let min = 0

    if (seed > ranges[ranges.length - 1][1]) {
      return ranges[ranges.length - 1][1]
    }

    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i]
      if (seed >= range[0] && seed < range[1]) {
        min = range[0]
        break
      }
    }

    return min
  }

  // function that takes a Map and a value as input
  // it gets the range key for the value from the provided Map
  // it then gets the value for the range key from the provided Map
  // it returns a result that is the value of the range key plus the difference between the value and the range key
  const getResult = (map: Map, value: number): number => {
    const rangeKey = getRangeKey(map, value)
    const rangeValue = map[rangeKey] + value - rangeKey

    return rangeValue
  }

  it('works to parse input', () => {
    const expected: Input = {
      seeds: [79, 14, 55, 13],
      seedToSoilMap: { '0': 0, '50': 52, '98': 50, '100': 100 },
      soilToFertilizerMap: {
        '0': 39,
        '15': 0,
        '52': 37,
        '54': 54,
      },
      fertilizerToWaterMap: {
        '0': 42,
        '7': 57,
        '11': 0,
        '53': 49,
        '61': 61,
      },

      waterToLightMap: {
        '0': 0,
        '18': 88,
        '25': 18,
        '95': 95,
      },
      lightToTemperatureMap: {
        '0': 0,
        '45': 81,
        '64': 68,
        '77': 45,
        '100': 100,
      },
      temperatureToHumidityMap: { '0': 1, '69': 0, '70': 70 },
      humidityToLocationMap: {
        '0': 0,
        '56': 60,
        '93': 56,
        '97': 97,
      },
    }

    expect(parseInput(input)).toEqual(expected)
  })

  // it('works to get the range key', () => {
  //   const parsed = parseInput(input)
  //   const seed = 79
  //   const expected = 50
  //   expect(getRangeKey(parsed.seedToSoilMap, seed)).toEqual(expected)
  // })

  // it('works to get a value from a map for a value', () => {
  //   const parsed = parseInput(input)
  //   const seed = 79

  //   expect(getResult(parsed.seedToSoilMap, seed)).toEqual(81)
  // })

  // function to get the minium from a list of numbers
  const getMin = (numbers: number[]): number => {
    let min = numbers[0]
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i]
      }
    }
    return min
  }

  const calculate = (parsed: Input, value: number): number => {
    const seedToSoilMap = parsed.seedToSoilMap
    const soilToFertilizerMap = parsed.soilToFertilizerMap
    const fertilizerToWaterMap = parsed.fertilizerToWaterMap
    const waterToLightMap = parsed.waterToLightMap
    const lightToTemperatureMap = parsed.lightToTemperatureMap
    const temperatureToHumidityMap = parsed.temperatureToHumidityMap
    const humidityToLocationMap = parsed.humidityToLocationMap
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

  it('works to get the final result for a seed', () => {
    // Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
    const input = readFileSync('./src/day5/input', 'utf8')
    const parsed = parseInput(input)

    expect(getMin(parsed.seeds.map(seed => calculate(parsed, seed)))).toEqual(107430936)
  })
})
