const fs = require('fs')

const input = fs.readFileSync('./src/day5/input', 'utf8')

const parseInput = (input) => {
  const lines = input
    .trim()
    .split('\n')
    .map((line) => line.trim())
  const seeds = lines[0]
    .split(' ')
    .slice(1)
    .map((seed) => parseInt(seed, 10))

  const maps = {
    seed: {},
    soil: {},
    fertilizer: {},
    water: {},
    light: {},
    temperature: {},
    humidity: {},
  }

  let currentMap = maps.seed

  let max = 0
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i]
    if (line === '') {
      continue
    }
    if (line.endsWith('map:')) {
      max = 0
      currentMap = maps[line.split('-')[0]] = {}
      currentMap[0] = 0
    } else {
      const [first, second, third] = line
        .split(' ')
        .map((number) => parseInt(number, 10))

      if (second + third - 1 > max) {
        max = second + third - 1
      }

      currentMap[`${second}`] = first
      currentMap[max + 1] = max + 1
    }
  }

  return { seeds, ...maps }
}

// const getResult = (map, value) => {
//   console.log(Object.keys(map))
//   let rangeKey = Object.keys(map).find(
//     (key) => value >= key && value < map[key]
//   )

//   console.log('rangeKey', rangeKey)

//   if (!rangeKey && value > Object.keys(map)[Object.keys(map).length - 1]) {
//     rangeKey = Object.keys(map)[Object.keys(map).length - 1]
//   }

//   if (!rangeKey && value < Object.keys(map)[0]) {
//     rangeKey = Object.keys(map)[0]
//   }

//   return map[rangeKey] + value - rangeKey
// }

const getResult = (map, value) => {
  const rangeKey = getRangeKey(map, value)
  return map[rangeKey] + value - rangeKey
}

const getRangeKey = (map, seed) => {
  const keys = Object.keys(map)
  const ranges = []

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (keys[i + 1]) {
      ranges.push([Number(key), Number(keys[i + 1])])
    }
  }

  let low = 0
  let high = ranges.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const currentRange = ranges[mid]

    if (seed >= currentRange[0] && seed < currentRange[1]) {
      return currentRange[0]
    } else if (seed < currentRange[0]) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return ranges[ranges.length - 1][1]
}

const calculate = (parsed, value) => {
  const { seed, soil, fertilizer, water, light, temperature, humidity } = parsed

  // const seedValue = getResult(seed, value)
  // console.log('seedValue', seedValue)
  // const soilValue = getResult(soil, seedValue)
  // console.log('soilValue', soilValue)
  // const fertilizerValue = getResult(fertilizer, soilValue)
  // console.log('fertilizerValue', fertilizerValue)
  // const waterValue = getResult(water, fertilizerValue)
  // console.log('waterValue', waterValue)
  // const lightValue = getResult(light, waterValue)
  // console.log('lightValue', lightValue)
  // const temperatureValue = getResult(temperature, lightValue)
  // console.log('temperatureValue', temperatureValue)
  // const humidityValue = getResult(humidity, temperatureValue)
  // console.log('humidityValue', humidityValue)
  // return humidityValue

  return getResult(
    humidity,
    getResult(
      temperature,
      getResult(
        light,
        getResult(
          water,
          getResult(fertilizer, getResult(soil, getResult(seed, value)))
        )
      )
    )
  )
}

const getMin = (numbers) => Math.min(...numbers)

const group = (numbers) => {
  const groups = []
  for (let i = 0; i < numbers.length; i += 2) {
    groups.push([numbers[i], numbers[i + 1]])
  }
  return groups
}

const calculateRange = (parsed, range) => {
  let min = Infinity
  for (let i = range[0]; i < range[0] + range[1]; i++) {
    // for (let i = range[0]; i < range[0] + 2; i++) {
    const result = calculate(parsed, i)
    if (!isFinite(result)) {
      console.log('value that returns NaN', i)
    }
    console.log('result', result, min)
    if (result < min) {
      min = result
    }
  }
  return min
}

const parsed = parseInput(input)

// console.log(calculate(parsed, 3684516104))

let min = Infinity

group(parsed.seeds).forEach((range) => {
  const result = calculateRange(parsed, range)
  if (result < min) {
    min = result
  }
  console.log('range - result', range, result, min)
})

console.log(min)
