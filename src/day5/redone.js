const { readFileSync } = require('fs')

// function that sorts a Map by the source first element
const sortMap = (map) => {
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
const parseInput = (input) => {
  const lines = input
    .trim()
    .split('\n')
    .map((line) => line.trim())
  const seeds = lines[0]
    .split(' ')
    .slice(1)
    .map((seed) => parseInt(seed, 10))

  const seedToSoilMap = []
  const soilToFertilizerMap = []
  const fertilizerToWaterMap = []
  const waterToLightMap = []
  const lightToTemperatureMap = []
  const temperatureToHumidityMap = []
  const humidityToLocationMap = []

  let currentMap = seedToSoilMap

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

// function that takes a Map and a number as input and returns a number as a result
// it finds the source range that contains the number
// if a range is found it will calculate the result for the number being the number minus the start of the source range plus the start of the destination range
// if no range is found it will return the number
const getResult = (map, number) => {
  for (let i = 0; i < map.length; i++) {
    const range = map[i]
    if (number >= range.source[0] && number <= range.source[1]) {
      return number - range.source[0] + range.destination[0]
    }
  }
  return number
}

const calculate = (parsed, value) => {
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

// function that takes a list of numbers as input and groups them into groups of 2
// and then returns a list of the new groups
const group = (numbers) => {
  const groups = []
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

const calculateRange = (parsed, range) => {
  let min = Infinity

  for (let i = range[0]; i < range[0] + range[1]; i++) {
    const result = calculate(parsed, i)
    if (!isFinite(result)) {
      console.log('value that returns NaN', i)
    }
    if (result < min) {
      min = result
    }

    if (i % 100000000 === 0) {
      console.log(
        'processed 100 million numbers',
        'left-to-calculate',
        range[0] + range[1] - i
      )
    }
  }

  return min
}

const input = readFileSync('./src/day5/input', 'utf8')
const parsed = parseInput(input)
// console.log(group(parsed.seeds))

let min = Infinity


group(parsed.seeds).forEach((range) => {
  const result = calculateRange(parsed, range)
  if (result < min) {
    min = result
  }
  console.log('range - result', range, result, min)
})

console.log(min)
