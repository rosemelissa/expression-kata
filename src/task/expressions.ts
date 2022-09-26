export type Operator = "add" | "subtract" | "divide" | "multiply";

export type Expression =
    | number
    | { op: Operator; a: Expression; b: Expression };

function evaluate(exp: Expression): number {
    if (typeof exp === 'number') {
        return exp
    }
    else {
        const operator = getOperatorFunction(exp.op)
        return operator(evaluate(exp.a), evaluate(exp.b))
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

export { evaluate };
