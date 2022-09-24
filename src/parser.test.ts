import { parseExpression } from "./parser";

describe("parser", () => {
    test("parse of literal", () => {
        expect(parseExpression("7")).toBe(7);
    });
    test("parse of simple expression", () => {
        expect(parseExpression("(+ 2 9)")).toStrictEqual({
            op: "add",
            a: 2,
            b: 9,
        });
    });
    test("parse of once-nested expression", () => {
        expect(parseExpression("(+ 2 (- 5 2))")).toStrictEqual({
            op: "add",
            a: 2,
            b: { op: "subtract", a: 5, b: 2 },
        });
    });
    test("parse of complex-nested expression", () => {
        expect(parseExpression("(+ (/ 5 (* 2 5)) (- 5 4))")).toStrictEqual({
            op: "add",
            a: { op: "divide", a: 5, b: { op: "multiply", a: 2, b: 5 } },
            b: { op: "subtract", a: 5, b: 4 },
        });
    });
});
