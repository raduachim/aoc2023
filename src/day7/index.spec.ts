import { readFileSync } from 'fs'

describe('day7', () => {
  const input = `
  LLR

  AAA = (BBB, BBB)
  BBB = (AAA, ZZZ)
  ZZZ = (ZZZ, ZZZ)
  `

  type Instruction = string
  type Instructions = Instruction[]
  type Nodes = {
    node: string
    left: string
    right: string
  }[]

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
      .map((line) => line.replace('R', 'right'))
    const nodes = lines.slice(1).map((line) => {
      const [node, rest] = line.trim().split(' = ')
      const [left, right] = rest.replace('(', '').replace(')', '').split(', ')
      return { node, left, right }
    })
    return { instructions, nodes }
  }

  // function that navigates as follows:
  // it starts from the first node
  // it iterates through the instructions
  // if the instruction is L it gets the value of the left property of the current node
  // then it finds the next node that has the same node property as the value of the left property
  // this next node can be found either at the current index plus 1 or 2 or at the current index minus 1 or 2
  // if the instruction is R it gets the value of the right property of the current node and does the same as above
  // when it reaches the end of instructions it starts again from the beginning of instructions
  // the function will run until it finds a node with the value ZZZ
  // it will count how many times it has run
  // it will return the count
  const navigate = (instructions: Instructions, nodes: Nodes): number => {
    let count = 0
    let index = 0
    let currentNode = nodes[0]
    while (currentNode.node !== 'ZZZ') {
      const instruction = instructions[index]
      const nextNode = nodes.find(
        (node) => node.node === (currentNode as any)[instruction]
      )
      if (nextNode) {
        currentNode = nextNode
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

  it('works to solve part1 with test input', () => {
    expect(parseInput(input)).toEqual({
      instructions: ['left', 'left', 'right'],
      nodes: [
        { node: 'AAA', left: 'BBB', right: 'BBB' },
        { node: 'BBB', left: 'AAA', right: 'ZZZ' },
        { node: 'ZZZ', left: 'ZZZ', right: 'ZZZ' },
      ],
    })

    expect(
      navigate(parseInput(input).instructions, parseInput(input).nodes)
    ).toEqual(6)
  })

  it('works to solve part1 with real input', () => {
    const input = readFileSync('./src/day7/input', 'utf8')

    expect(
      navigate(parseInput(input).instructions, parseInput(input).nodes)
    ).toEqual(6)
  })
})
