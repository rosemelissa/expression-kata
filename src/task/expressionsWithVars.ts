export type Operator = "add" | "subtract" | "divide" | "multiply";

export type ExpressionWithVars = number | string |{ op: Operator; a: ExpressionWithVars; b: ExpressionWithVars };
    
function evaluate(exp: ExpressionWithVars, variableBindings: {[variable: string]: number}): number {
    if (typeof exp === 'number') {
        return exp
    } else if (typeof exp === 'string') {
        return variableBindings[exp];
    } else {
        const operator = getOperatorFunction(exp.op)
        return operator(evaluate(exp.a, variableBindings), evaluate(exp.b, variableBindings))
    }
}

function getOperatorFunction(op: Operator): (a: number, b: number) => number {
    if (op === 'add') {
        return (a: number, b: number) => a + b
    }
    if (op === "subtract") {
        return (a: number, b: number) => a - b
    }
    if (op === 'multiply') {
        return (a: number, b: number) => a * b
    }
    else {
        // assume op === 'divide'
        return (a: number, b: number) => a / b
    }
}

const variableBindings = { x: 7, y: 18 };
const expressionTreeWithVars: ExpressionWithVars = { op: 'multiply', a: {op: 'add', a: 1, b: 3}, b: {op: 'subtract', a: 'x', b: {op: 'subtract', a: 20, b: 'y'}}}
console.log(evaluate(expressionTreeWithVars, variableBindings)); // expect 20

export { evaluate };
