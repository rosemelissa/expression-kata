function generatePermutations(inputNumbers: number[]): number[][] {
    if (inputNumbers.length === 0) {
        return [inputNumbers];
    }
    const firstNUmber = inputNumbers[0];
    const remainingNumbers = inputNumbers.slice(1);
    const permuatationsOfRemainingNumbers = generatePermutations(remainingNumbers);
    const arrayOfPermutations = [];
    for (const permutation of permuatationsOfRemainingNumbers) {
            for (let i = 0; i <= permutation.length; i++) {

                const onePermutation = [...permutation.slice(0, i), firstNUmber, ...permutation.slice(i)];
                arrayOfPermutations.push(onePermutation);
        }
    }
    return arrayOfPermutations;
}

// console.log(generatePermutations([1, 2, 3, 4, 5, 6]));
console.log(generatePermutations([1, 2, 3]));