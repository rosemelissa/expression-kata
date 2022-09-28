import { evaluate } from "./expressions";

// 1. Programmatically generate ALL possible expression trees that use between 1 and 6 of the available numbers.  (This will be tricky if you’ve never looked at generating combinations before.  See resource below.)
export type Operator = "add" | "subtract" | "divide" | "multiply";

export type Expression =
    | number
    | { op: Operator; a: Expression; b: Expression };


function generateAllTrees(numbers: number[]): Expression[] {}
//1 - generate all permutations of numbers
const numberPermutations: number[][] = generatePermutations(numbers);
//2 - generate all combinations of operatores and variables for trees
//3 - for each possible tree, for each possible permutation, fill in the numbers into the tree and add to output[]

function generatePermutations(inputNumbers: number[]): number[][] {
    if (inputNumbers.length === 0) {
        return [inputNumbers];
    }
    const firstNUmber = inputNumbers[0];
    const remainingNumbers = inputNumbers.slice(1);
    const permuatationsOfRemainingNumbers = generatePermutations(remainingNumbers);
    const arrayOfPermutations = [];
    for (let i = 0; i <= remainingNumbers.length; i++) {
        const onePermutation = [...remainingNumbers.slice(0, i), firstNUmber, ...remainingNumbers.slice(i)];
        arrayOfPermutations.push(onePermutation);
    }
    return arrayOfPermutations;

}

/*
if INPUT_NUMBERS.length = 0
    return INPUT_NUMBERS

// ALL_PERMUTATIONS = []
// ALL_PERMUTATIONS.push(generatePermutations())

FIRST_NUMBER = INPUT_NUMBERS[0]
REMAINING_NUMBERS = INPUT_NUMBERS.slice(1)
Permutations_of_remaining_numbers = generatePermutations(REMAINING_NUMBERS)
ARRAY_OF_PERMS = []
for i=0; i<=REMAINING_NUMBERS.length; i++
    ONE_PERM = insert FIRST_NUMBER at position i of PERMUATATION_OF_REMAINING_NUMBERS
    ARRAY_OF_PERMS.push(THIS_PERM)
return ARRAY_OF_PERMS
*/





// 2. As you generate them, use your evaluate function on each expression tree in turn, and keep track of which expression tree evaluates closest to the target number.  At the end, this is your solution.

function findClosestTree(trees: Expression[], target: number): [Expression, number] {
    let currentClosestTree = trees[0];
    let currentClosestResult = evaluate(trees[0]);
    for (const tree of trees) {
        const result = evaluate(tree);
        if (result === target) {
            return [tree, result]
        } else {
            if (Math.abs(target - result) < Math.abs(target - currentClosestResult)) {
                currentClosestResult = result;
                currentClosestTree = tree;
            }
        }
    }
    return [currentClosestTree, currentClosestResult]
}



// 3. Print out your solution expression tree, either working bottom-up, or as a graph.