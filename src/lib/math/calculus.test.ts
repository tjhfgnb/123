import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CalcError } from "./rational.ts";
import { solveCalculus } from "./calculus.ts";

function answer(input: string, op: "diff" | "int") {
  const solved = solveCalculus(input, op);
  return {
    linear: solved.linear.replace(/\s/g, ""),
    titles: solved.steps.map((step) => step.title),
  };
}

describe("derivatives", () => {
  it("differentiates a polynomial", () => {
    const got = answer("x^3 + 2x", "diff");
    assert.equal(got.linear, "3x^2+2");
    assert.ok(got.titles.includes("冪次法則"));
  });

  it("differentiates sin of a linear", () => {
    assert.equal(answer("sin(2x)", "diff").linear, "2·cos(2x)");
  });

  it("uses the product rule", () => {
    assert.equal(answer("x*sin x", "diff").linear, "sinx+x·cosx");
  });

  it("differentiates the exponential and logarithm", () => {
    assert.equal(answer("e^x", "diff").linear, "e^x");
    assert.equal(answer("ln x", "diff").linear, "1/x");
  });

  it("uses the quotient rule", () => {
    const got = answer("(x^2)/(x+1)", "diff");
    assert.ok(got.titles.includes("商的法則"));
    assert.equal(got.linear, "(x^2+2x)/((x+1)^2)");
  });

  it("differentiates a constant to zero", () => {
    assert.equal(answer("5", "diff").linear, "0");
  });

  it("chain-rules a power", () => {
    assert.equal(answer("(2x+1)^3", "diff").linear, "6(2x+1)^2");
  });

  it("differentiates arctan", () => {
    assert.equal(answer("arctan x", "diff").linear, "1/(x^2+1)");
  });
});

describe("integrals", () => {
  it("integrates a polynomial", () => {
    const got = answer("x^3 + 2x", "int");
    assert.equal(got.linear, "x^4/4+x^2+C");
    assert.ok(got.titles.some((title) => title.includes("驗算")));
  });

  it("integrates sin of a linear", () => {
    assert.equal(answer("sin(2x)", "int").linear, "−cos(2x)/2+C");
  });

  it("spots a substitution", () => {
    assert.equal(answer("2x*cos(x^2)", "int").linear, "sin(x^2)+C");
  });

  it("integrates 1/x and e^x", () => {
    assert.equal(answer("1/x", "int").linear, "ln|x|+C");
    assert.equal(answer("e^(3x)", "int").linear, "e^(3x)/3+C");
  });

  it("integrates the arctan kernel", () => {
    assert.equal(answer("1/(1+x^2)", "int").linear, "arctanx+C");
  });

  it("rejects an unsupported integral", () => {
    assert.throws(() => solveCalculus("sin(x^2)", "int"), (err: unknown) => err instanceof CalcError);
  });
});
