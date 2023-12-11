import { readFileSync } from 'fs'

describe.skip('8', () => {
  const input = `
  LLR

  AAA = (BBB, BBB)
  BBB = (AAA, ZZZ)
  ZZZ = (ZZZ, ZZZ)
  `

  type Instruction = 'left' | 'right'

  type Instructions = Instruction[]
  type Nodes = {
    [k: string]: {
      [k in Instruction]: string
    }
  }

  // function that parses the input
  // it takes the first line and creates a list called instructions that has all characters as an element
  // then it takes each line and creates a list of objects that have the properties:
  // - node: is the string before the =
  // - left: is the string after the = and before the ,
  // - right: is the string after the , and before the )
  // returns a result that has the instructions and the list of objects
  const parseInput = (
    input: string
  ): { instructions: Instructions; nodes: Nodes } => {
    const lines = input.split('\n').filter((line) => line.trim() !== '')

    const instructions = lines[0]
      .trim()
      .split('')
      .map((line) => line.replace('L', 'left'))
      .map((line) => line.replace('R', 'right')) as Instructions

    const nodes = lines.slice(1).reduce((acc, line) => {
      const [node, rest] = line.trim().split(' = ')
      const [left, right] = rest.replace('(', '').replace(')', '').split(', ')

      acc[node] = { left, right }
      return acc
    }, {} as Nodes)

    return { instructions, nodes }
  }

  const navigate = (
    instructions: Instructions,
    nodes: Nodes,
    start: string,
    destination: string
  ): number => {
    let count = 0
    let index = 0
    let currentNode = start
    while (!currentNode.endsWith(destination)) {
      const instruction = instructions[index]
      const nextInstruction = nodes[currentNode][instruction]

      const nextNode = nodes[nextInstruction]

      if (nextNode) {
        currentNode = nodes[currentNode as any][instruction]
      }
      if (index === instructions.length - 1) {
        index = 0
      } else {
        index++
      }
      count++
    }
    return count
  }

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  const findLeastCommonMultiple = (numbers: number[]): number => {
    return numbers.reduce((a, b) => Math.abs(a * b) / gcd(a, b));
  }

  it('works to solve part1 with test input', () => {
    expect(parseInput(input)).toEqual({
      instructions: ['left', 'left', 'right'],
      nodes: {
        AAA: { left: 'BBB', right: 'BBB' },
        BBB: { left: 'AAA', right: 'ZZZ' },
        ZZZ: { left: 'ZZZ', right: 'ZZZ' },
      },
    })

    expect(
      navigate(
        parseInput(input).instructions,
        parseInput(input).nodes,
        'AAA',
        'ZZZ'
      )
    ).toEqual(6)
  })

  it('works to solve part1 with real input', () => {
    const input = readFileSync('./src/day8/input', 'utf8')

    expect(
      navigate(
        parseInput(input).instructions,
        parseInput(input).nodes,
        'AAA',
        'ZZZ'
      )
    ).toEqual(19199)
  })

  // function that takes input of type Nodes and second argument a character and returns all keys that end with the character
  const findKeys = (nodes: Nodes, character: string): string[] => {
    return Object.keys(nodes).filter((key) => key.endsWith(character))
  }

  it('works to solve part2 with test input', () => {
    const input = `
    LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)
    `
    const { instructions, nodes } = parseInput(input)
    const startKeys = findKeys(nodes, 'A')
    const endKeys = findKeys(nodes, 'Z')

    expect(startKeys).toEqual(['11A', '22A'])
    expect(endKeys).toEqual(['11Z', '22Z'])

    const paths = startKeys.map((startKey, index) => {
      return navigate(instructions, nodes, startKey, endKeys[index])
    })

    expect(paths).toEqual([2, 3])

    expect(findLeastCommonMultiple([2, 3])).toEqual(6)
  })

  it('works to solve part2 with real input', () => {
    const input = readFileSync('./src/day8/input', 'utf8')
    const { instructions, nodes } = parseInput(input)
    const startKeys = findKeys(nodes, 'A')

    const paths = startKeys.map((startKey) => {
      return navigate(instructions, nodes, startKey, 'Z')
    })

    expect(findLeastCommonMultiple(paths)).toEqual(13663968099527)
  })
})
