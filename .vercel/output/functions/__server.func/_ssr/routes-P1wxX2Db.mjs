import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as History } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-P1wxX2Db.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var textSize = {
	sm: "text-base",
	md: "text-xl",
	lg: "text-4xl"
};
function smaller(size) {
	return size === "lg" ? "md" : "sm";
}
function DecimalText({ info, className = "" }) {
	const tail = info.truncated ? "…" : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `font-serif tabular-nums ${className}`,
		children: [
			info.sign,
			info.int,
			(info.nonRepeat || info.repeat || info.truncated) && ".",
			info.nonRepeat,
			info.repeat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "overline",
				children: info.repeat
			}) : null,
			tail
		]
	});
}
function Fraction({ num, den, size }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "mx-0.5 inline-grid justify-items-center align-middle leading-none",
		role: "img",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathPieces, {
				pieces: num,
				size
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `${size === "lg" ? "h-0.5" : "h-px"} col-span-1 w-full bg-fg`,
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathPieces, {
				pieces: den,
				size
			})
		]
	});
}
function PieceView({ piece, size }) {
	if (piece.k === "t") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-serif",
		children: piece.v
	});
	if (piece.k === "sup") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "math-sup font-serif",
		children: piece.v
	});
	if (piece.k === "dec") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecimalText, { info: piece.info });
	if (piece.k === "f") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fraction, {
		num: piece.num,
		den: piece.den,
		size: smaller(size)
	});
	return null;
}
function MathPieces({ pieces, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex flex-wrap items-center gap-x-1 ${textSize[size]}`,
		children: pieces.map((piece, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieceView, {
			piece,
			size
		}, index))
	});
}
function MathLine({ pieces, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "flex flex-wrap items-center gap-x-1 gap-y-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathPieces, {
			pieces,
			size
		})
	});
}
var CalcError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "CalcError";
	}
};
function gcd(a, b) {
	let x = a < 0n ? -a : a;
	let y = b < 0n ? -b : b;
	while (y !== 0n) {
		const t = y;
		y = x % y;
		x = t;
	}
	return x;
}
function lcm(a, b) {
	if (a === 0n || b === 0n) return 0n;
	const aa = a < 0n ? -a : a;
	const bb = b < 0n ? -b : b;
	return aa / gcd(aa, bb) * bb;
}
function normalize(n, d) {
	if (d === 0n) throw new CalcError("除數不能是 0");
	if (d < 0n) return {
		n: -n,
		d: -d
	};
	return {
		n,
		d
	};
}
function simplify(f) {
	const s = normalize(f.n, f.d);
	const g = gcd(s.n, s.d);
	return {
		n: s.n / g,
		d: s.d / g
	};
}
function isqrt$1(n) {
	if (n < 0n) return null;
	if (n < 2n) return n;
	let x0 = n;
	let x1 = (n >> 1n) + 1n;
	while (x1 < x0) {
		x0 = x1;
		x1 = x0 + n / x0 >> 1n;
	}
	return x0 * x0 === n ? x0 : null;
}
function toDecimal(f) {
	const s = simplify(f);
	const neg = s.n < 0n;
	let rem = neg ? -s.n : s.n;
	const den = s.d;
	const intPart = rem / den;
	rem %= den;
	const digits = [];
	const seen = /* @__PURE__ */ new Map();
	let repeatAt = -1;
	const limit = 32;
	while (rem !== 0n && digits.length < limit) {
		const key = rem.toString();
		const seenAt = seen.get(key);
		if (seenAt !== void 0) {
			repeatAt = seenAt;
			break;
		}
		seen.set(key, digits.length);
		rem *= 10n;
		digits.push((rem / den).toString());
		rem %= den;
	}
	const sign = neg ? "−" : "";
	const intStr = intPart.toString();
	if (repeatAt >= 0) return {
		sign,
		int: intStr,
		nonRepeat: digits.slice(0, repeatAt).join(""),
		repeat: digits.slice(repeatAt).join(""),
		truncated: false
	};
	return {
		sign,
		int: intStr,
		nonRepeat: digits.join(""),
		repeat: "",
		truncated: rem !== 0n
	};
}
function linear(f) {
	const s = simplify(f);
	const sign = s.n < 0n ? "-" : "";
	const n = (s.n < 0n ? -s.n : s.n).toString();
	if (s.d === 1n) return sign + n;
	return `${sign}${n}/${s.d}`;
}
function toMixed(f) {
	const s = simplify(f);
	if (s.d === 1n) return null;
	const absN = s.n < 0n ? -s.n : s.n;
	const whole = absN / s.d;
	const rem = absN % s.d;
	if (whole === 0n || rem === 0n) return null;
	return {
		neg: s.n < 0n,
		whole: whole.toString(),
		n: rem.toString(),
		d: s.d.toString()
	};
}
var ZERO = {
	t: "q",
	n: 0n,
	d: 1n
};
var ONE = {
	t: "q",
	n: 1n,
	d: 1n
};
var X = { t: "x" };
var E = { t: "e" };
var PI = { t: "pi" };
var INT_FAIL = "這個積分沒辦法用基本公式直接寫出來。多項式、sin、cos、tan、e^x、ln，以及外面正好乘著裡面的導數（例如 2x cos(x^2)），都可以。";
function T$1(v) {
	return {
		k: "t",
		v
	};
}
function rr(n, d) {
	if (d === 0n) throw new CalcError("除數不能是 0");
	if (n === 0n) return {
		n: 0n,
		d: 1n
	};
	if (d < 0n) {
		n = -n;
		d = -d;
	}
	const g = gcd(n < 0n ? -n : n, d);
	return {
		n: n / g,
		d: d / g
	};
}
function qNode(r) {
	return {
		t: "q",
		n: r.n,
		d: r.d
	};
}
function addR(a, b) {
	return rr(a.n * b.d + b.n * a.d, a.d * b.d);
}
function subR(a, b) {
	return addR(a, {
		n: -b.n,
		d: b.d
	});
}
function mulR(a, b) {
	return rr(a.n * b.n, a.d * b.d);
}
function divR(a, b) {
	if (b.n === 0n) throw new CalcError("除數不能是 0");
	return rr(a.n * b.d, a.d * b.n);
}
function negR(a) {
	return {
		n: -a.n,
		d: a.d
	};
}
function isZeroR(a) {
	return a.n === 0n;
}
function isOneR(a) {
	return a.n === 1n && a.d === 1n;
}
function isNegOneR(a) {
	return a.n === -1n && a.d === 1n;
}
function powRat(base, exp) {
	if (exp < 0n) return powRat(divR({
		n: 1n,
		d: 1n
	}, base), -exp);
	if (exp === 0n) {
		if (base.n === 0n) throw new CalcError("0 的 0 次方沒有定義");
		return {
			n: 1n,
			d: 1n
		};
	}
	if (exp > 40n) throw new CalcError("次方太大了");
	let n = 1n;
	let d = 1n;
	for (let i = 0n; i < exp; i += 1n) {
		n *= base.n;
		d *= base.d;
		if (n > 10n ** 24n || d > 10n ** 24n || n < -(10n ** 24n)) throw new CalcError("數字太大了");
	}
	return rr(n, d);
}
function sig(s) {
	switch (s.t) {
		case "q": return `q${s.n}/${s.d}`;
		case "x": return "x";
		case "pi": return "pi";
		case "e": return "e";
		case "add": return `+(${s.a.map(sig).join(",")})`;
		case "mul": return `*(${s.a.map(sig).join(",")})`;
		case "pow": return `^(${sig(s.b)},${sig(s.e)})`;
		case "sin":
		case "cos":
		case "tan":
		case "ln":
		case "abs":
		case "asin":
		case "atan": return `${s.t}(${sig(s.a)})`;
		default: return "?";
	}
}
function eq(a, b) {
	return sig(a) === sig(b);
}
function hasX(s) {
	switch (s.t) {
		case "x": return true;
		case "q":
		case "pi":
		case "e": return false;
		case "add":
		case "mul": return s.a.some(hasX);
		case "pow": return hasX(s.b) || hasX(s.e);
		default: return hasX(s.a);
	}
}
function isZeroNode(s) {
	return s.t === "q" && s.n === 0n;
}
function isOneNode(s) {
	return s.t === "q" && s.n === 1n && s.d === 1n;
}
function isIntQ(s) {
	return s.t === "q" && s.d === 1n;
}
function isQ(s, n, d) {
	return s.t === "q" && s.n === n && s.d === d;
}
function mapChild(s, f) {
	switch (s.t) {
		case "add":
		case "mul": return {
			...s,
			a: s.a.map(f)
		};
		case "pow": return {
			t: "pow",
			b: f(s.b),
			e: f(s.e)
		};
		case "sin":
		case "cos":
		case "tan":
		case "ln":
		case "abs":
		case "asin":
		case "atan": return {
			...s,
			a: f(s.a)
		};
		default: return s;
	}
}
function replace(s, target, rep) {
	if (eq(s, target)) return rep;
	return mapChild(s, (c) => replace(c, target, rep));
}
function onlyThrough(s, u) {
	if (eq(s, u)) return true;
	if (s.t === "x") return false;
	switch (s.t) {
		case "q":
		case "pi":
		case "e": return true;
		case "add":
		case "mul": return s.a.every((c) => onlyThrough(c, u));
		case "pow": return onlyThrough(s.b, u) && onlyThrough(s.e, u);
		default: return onlyThrough(s.a, u);
	}
}
function splitCoeff(s) {
	if (s.t === "q") return {
		coeff: rr(s.n, s.d),
		rest: ONE
	};
	if (s.t === "mul") {
		let coeff = rr(1n, 1n);
		const rest = [];
		for (const f of s.a) if (f.t === "q") coeff = mulR(coeff, rr(f.n, f.d));
		else rest.push(f);
		if (rest.length === 0) return {
			coeff,
			rest: ONE
		};
		if (rest.length === 1) return {
			coeff,
			rest: rest[0]
		};
		return {
			coeff,
			rest: {
				t: "mul",
				a: rest
			}
		};
	}
	return {
		coeff: rr(1n, 1n),
		rest: s
	};
}
function scale(c, rest) {
	if (isZeroR(c)) return ZERO;
	if (isOneR(c)) return rest;
	if (eq(rest, ONE)) return qNode(c);
	return simpMul([qNode(c), rest]);
}
function addNode(xs) {
	return {
		t: "add",
		a: xs
	};
}
function mulNode(xs) {
	return {
		t: "mul",
		a: xs
	};
}
function simp(s) {
	switch (s.t) {
		case "q": return qNode(rr(s.n, s.d));
		case "x":
		case "pi":
		case "e": return s;
		case "add": return simpAdd(s.a.map(simp));
		case "mul": return simpMul(s.a.map(simp));
		case "pow": return simpPow(simp(s.b), simp(s.e));
		case "sin": return simpSin(simp(s.a));
		case "cos": return simpCos(simp(s.a));
		case "tan": return simpTan(simp(s.a));
		case "ln": return simpLn(simp(s.a));
		case "abs": return simpAbs(simp(s.a));
		case "asin": {
			const a = simp(s.a);
			if (isZeroNode(a)) return ZERO;
			return {
				t: "asin",
				a
			};
		}
		case "atan": {
			const a = simp(s.a);
			if (isZeroNode(a)) return ZERO;
			return {
				t: "atan",
				a
			};
		}
		default: return s;
	}
}
function simpSin(a) {
	if (isZeroNode(a)) return ZERO;
	return {
		t: "sin",
		a
	};
}
function simpCos(a) {
	if (isZeroNode(a)) return ONE;
	return {
		t: "cos",
		a
	};
}
function simpTan(a) {
	if (isZeroNode(a)) return ZERO;
	return {
		t: "tan",
		a
	};
}
function simpLn(a) {
	if (isOneNode(a)) return ZERO;
	if (eq(a, E)) return ONE;
	if (a.t === "pow" && eq(a.b, E)) return simp(a.e);
	if (isZeroNode(a)) throw new CalcError("ln 0 沒有定義");
	if (a.t === "q" && a.n < 0n) throw new CalcError("ln 的裡面現在只接受正的");
	return {
		t: "ln",
		a
	};
}
function simpAbs(a) {
	if (a.t === "q") return qNode(rr(a.n < 0n ? -a.n : a.n, a.d));
	if (a.t === "abs") return a;
	return {
		t: "abs",
		a
	};
}
function simpPow(b, e) {
	if (isZeroNode(e)) {
		if (isZeroNode(b)) throw new CalcError("0 的 0 次方沒有定義");
		return ONE;
	}
	if (isOneNode(e)) return b;
	if (isOneNode(b)) return ONE;
	if (eq(b, E) && e.t === "ln") return simp(e.a);
	if (isZeroNode(b)) {
		if (e.t === "q" && e.n > 0n) return ZERO;
		if (e.t === "q" && e.n < 0n) throw new CalcError("0 不能取負次方");
		return {
			t: "pow",
			b,
			e
		};
	}
	if (b.t === "q" && isIntQ(e)) {
		if (e.n < 0n && b.n === 0n) throw new CalcError("0 不能取負次方");
		return qNode(powRat(rr(b.n, b.d), e.n));
	}
	if (b.t === "pow" && (isIntQ(e) || isIntQ(b.e))) return simpPow(b.b, simp(mulNode([b.e, e])));
	if (b.t === "mul" && isIntQ(e)) return simpMul(b.a.map((f) => simpPow(f, e)));
	if (b.t === "abs" && isIntQ(e) && e.n % 2n === 0n) return simpPow(b.a, e);
	return {
		t: "pow",
		b,
		e
	};
}
function emptyBag() {
	return {
		coeff: rr(1n, 1n),
		parts: /* @__PURE__ */ new Map(),
		zero: false
	};
}
function absorb(bag, f, exp) {
	if (bag.zero) return;
	exp = simp(exp);
	if (isZeroNode(exp)) return;
	if (f.t === "q") {
		if (f.n === 0n) {
			if (exp.t === "q" && exp.n < 0n) throw new CalcError("除數不能是 0");
			bag.zero = true;
			return;
		}
		if (isIntQ(exp) && exp.n > 0n) {
			bag.coeff = mulR(bag.coeff, powRat(rr(f.n, f.d), exp.n));
			return;
		}
		if (isIntQ(exp) && exp.n < 0n) {
			bag.coeff = mulR(bag.coeff, powRat(rr(f.d, f.n), -exp.n));
			return;
		}
	}
	if (f.t === "mul" && isIntQ(exp)) {
		for (const c of f.a) absorb(bag, c, exp);
		return;
	}
	if (f.t === "pow" && (isIntQ(exp) || isIntQ(f.e))) {
		absorb(bag, f.b, simp(mulNode([f.e, exp])));
		return;
	}
	const key = sig(f);
	const hit = bag.parts.get(key);
	if (!hit) bag.parts.set(key, {
		base: f,
		exp
	});
	else hit.exp = simp(addNode([hit.exp, exp]));
}
function bagToNode(bag) {
	if (bag.zero || isZeroR(bag.coeff)) return ZERO;
	const factors = [];
	if (!isOneR(bag.coeff)) factors.push(qNode(bag.coeff));
	const parts = [...bag.parts.values()].sort((a, b) => sig(a.base) < sig(b.base) ? -1 : sig(a.base) > sig(b.base) ? 1 : 0);
	for (const part of parts) {
		const e = simp(part.exp);
		if (isZeroNode(e)) continue;
		if (isOneNode(e)) factors.push(part.base);
		else {
			const pow = simpPow(part.base, e);
			if (pow.t === "q") {
				bag.coeff = mulR(isOneR(bag.coeff) && factors[0]?.t !== "q" ? rr(1n, 1n) : bag.coeff, rr(pow.n, pow.d));
				continue;
			}
			factors.push(pow);
		}
	}
	if (factors.length === 0) return ONE;
	if (factors.length === 1) return factors[0];
	if (factors.filter((f) => f.t === "q").length > 1) {
		let c = rr(1n, 1n);
		const rest = factors.filter((f) => {
			if (f.t === "q") {
				c = mulR(c, rr(f.n, f.d));
				return false;
			}
			return true;
		});
		return bagToNode({
			coeff: c,
			parts: new Map(rest.map((r) => [sig(r), {
				base: r,
				exp: ONE
			}])),
			zero: false
		});
	}
	return {
		t: "mul",
		a: factors
	};
}
function isPoly(s) {
	switch (s.t) {
		case "q":
		case "x": return true;
		case "add":
		case "mul": return s.a.every(isPoly);
		case "pow": return s.b.t === "x" && isIntQ(s.e) && s.e.n > 0n;
		default: return false;
	}
}
function expandPoly(xs) {
	let acc = [ONE];
	for (const factor of xs) {
		const terms = factor.t === "add" ? factor.a : [factor];
		if (acc.length * terms.length > 48) return null;
		const next = [];
		for (const left of acc) for (const right of terms) next.push(simpMul([left, right]));
		acc = next;
	}
	return simpAdd(acc);
}
function simpMul(xs) {
	if (xs.length > 1 && xs.some((factor) => factor.t === "add") && xs.every(isPoly)) {
		const expanded = expandPoly(xs);
		if (expanded) return expanded;
	}
	const bag = emptyBag();
	for (const x of xs) absorb(bag, x, ONE);
	return distributeConst(bagToNode(bag));
}
function distributeConst(s) {
	if (s.t !== "mul") return s;
	const { coeff, rest } = splitCoeff(s);
	if (isOneR(coeff) || rest.t !== "add") return s;
	return simpAdd(rest.a.map((term) => simpMul([qNode(coeff), term])));
}
function polyExp(rest) {
	if (rest.t === "x") return 1;
	if (rest.t === "pow" && rest.b.t === "x" && rest.e.t === "q") return Number(rest.e.n) / Number(rest.e.d);
	return null;
}
function compareRest(a, b) {
	const ea = polyExp(a);
	const eb = polyExp(b);
	if (ea !== null && eb !== null && ea !== eb) return eb - ea;
	if (ea !== null && eb === null) return -1;
	if (ea === null && eb !== null) return 1;
	const wa = weight(a);
	const wb = weight(b);
	if (wa !== wb) return wa - wb;
	const sa = sig(a);
	const sb = sig(b);
	return sa < sb ? -1 : sa > sb ? 1 : 0;
}
function weight(s) {
	switch (s.t) {
		case "q":
		case "pi":
		case "e": return 0;
		case "x": return 1;
		case "pow": return 2 + weight(s.b) + weight(s.e);
		case "sin":
		case "cos":
		case "tan":
		case "ln":
		case "abs":
		case "asin":
		case "atan": return 3 + weight(s.a);
		case "mul": return 4 + s.a.reduce((sum, term) => sum + weight(term), 0);
		case "add": return 5 + s.a.reduce((sum, term) => sum + weight(term), 0);
		default: return 6;
	}
}
function simpAdd(xs) {
	const flat = [];
	for (const x of xs) {
		if (isZeroNode(x)) continue;
		if (x.t === "add") flat.push(...x.a);
		else flat.push(x);
	}
	let constSum = rr(0n, 1n);
	const groups = /* @__PURE__ */ new Map();
	for (const term of flat) {
		const { coeff, rest } = splitCoeff(term);
		if (eq(rest, ONE)) {
			constSum = addR(constSum, coeff);
			continue;
		}
		const key = sig(rest);
		const prev = groups.get(key);
		if (!prev) groups.set(key, {
			coeff,
			rest
		});
		else prev.coeff = addR(prev.coeff, coeff);
	}
	const terms = [];
	const entries = [...groups.values()].sort((a, b) => compareRest(a.rest, b.rest));
	for (const entry of entries) {
		if (isZeroR(entry.coeff)) continue;
		terms.push(scale(entry.coeff, entry.rest));
	}
	if (!isZeroR(constSum)) terms.push(qNode(constSum));
	if (terms.length === 0) return ZERO;
	if (terms.length === 1) return terms[0];
	const combined = combineFractions(terms);
	if (combined) return combined;
	return {
		t: "add",
		a: terms
	};
}
function expR(s) {
	return s.t === "q" ? rr(s.n, s.d) : null;
}
function cmpR(a, b) {
	const left = a.n * b.d;
	const right = b.n * a.d;
	return left < right ? -1 : left > right ? 1 : 0;
}
function combineFractions(terms) {
	const parsed = terms.map(fractionParts);
	if (parsed.some((part) => part.dens.size === 0)) return null;
	const common = /* @__PURE__ */ new Map();
	for (const part of parsed) for (const [key, den] of part.dens) {
		const prev = common.get(key);
		if (!prev || cmpR(den.exp, prev.exp) > 0) common.set(key, {
			base: den.base,
			exp: den.exp
		});
	}
	const nums = [];
	for (const part of parsed) {
		const mult = [part.num];
		for (const [key, den] of common) {
			const have = part.dens.get(key);
			const need = have ? subR(den.exp, have.exp) : den.exp;
			if (!isZeroR(need)) mult.push(simpPow(den.base, qNode(need)));
		}
		nums.push(mult.length === 1 ? mult[0] : simpMul(mult));
	}
	const num = simpAdd(nums);
	const denFactors = [];
	for (const den of common.values()) denFactors.push(isOneR(den.exp) ? den.base : simpPow(den.base, qNode(den.exp)));
	return simpMul([num, simpPow(denFactors.length === 1 ? denFactors[0] : simpMul(denFactors), qNode(rr(-1n, 1n)))]);
}
function fractionParts(s) {
	const bag = toBag(s);
	const dens = /* @__PURE__ */ new Map();
	const numFactors = [];
	if (!isOneR(bag.coeff)) numFactors.push(qNode(bag.coeff));
	for (const part of bag.parts) {
		const exp = expR(part.exp);
		if (exp && exp.n < 0n) {
			const key = sig(part.base);
			const pos = negR(exp);
			const prev = dens.get(key);
			dens.set(key, {
				base: part.base,
				exp: prev ? addR(prev.exp, pos) : pos
			});
		} else if (isOneNode(part.exp)) numFactors.push(part.base);
		else numFactors.push({
			t: "pow",
			b: part.base,
			e: part.exp
		});
	}
	return {
		num: numFactors.length === 0 ? ONE : numFactors.length === 1 ? numFactors[0] : mulNode(numFactors),
		dens
	};
}
function asLinear(s) {
	s = simp(s);
	if (s.t === "x") return {
		a: rr(1n, 1n),
		b: rr(0n, 1n)
	};
	if (s.t === "mul") {
		const sp = splitCoeff(s);
		if (sp.rest.t === "x") return {
			a: sp.coeff,
			b: rr(0n, 1n)
		};
		return null;
	}
	if (s.t === "add") {
		let a = rr(0n, 1n);
		let b = rr(0n, 1n);
		for (const term of s.a) {
			if (term.t === "q") {
				b = addR(b, rr(term.n, term.d));
				continue;
			}
			const lin = asLinear(term);
			if (!lin || !isZeroR(lin.b)) return null;
			a = addR(a, lin.a);
		}
		if (isZeroR(a)) return null;
		return {
			a,
			b
		};
	}
	return null;
}
function D(s) {
	return diffRaw(simp(s));
}
function diffRaw(s) {
	switch (s.t) {
		case "q":
		case "pi":
		case "e": return ZERO;
		case "x": return ONE;
		case "add": return simp(addNode(s.a.map((t) => D(t))));
		case "mul": return simp(addNode(s.a.map((_, i) => mulNode(s.a.map((f, j) => j === i ? D(f) : f)))));
		case "pow": return simp(diffPow(s));
		case "sin": return simp(mulNode([{
			t: "cos",
			a: s.a
		}, D(s.a)]));
		case "cos": return simp(mulNode([
			qNode(rr(-1n, 1n)),
			{
				t: "sin",
				a: s.a
			},
			D(s.a)
		]));
		case "tan": return simp(mulNode([simpPow({
			t: "cos",
			a: s.a
		}, qNode(rr(-2n, 1n))), D(s.a)]));
		case "ln": return simp(mulNode([D(s.a), simpPow(s.a, qNode(rr(-1n, 1n)))]));
		case "abs": return simp(mulNode([
			D(s.a),
			s.a,
			simpPow({
				t: "abs",
				a: s.a
			}, qNode(rr(-1n, 1n)))
		]));
		case "asin": return simp(mulNode([D(s.a), simpPow(addNode([ONE, mulNode([qNode(rr(-1n, 1n)), simpPow(s.a, qNode(rr(2n, 1n)))])]), qNode(rr(-1n, 2n)))]));
		case "atan": return simp(mulNode([D(s.a), simpPow(addNode([ONE, simpPow(s.a, qNode(rr(2n, 1n)))]), qNode(rr(-1n, 1n)))]));
		default: return ZERO;
	}
}
function diffPow(s) {
	const b = s.b;
	const e = s.e;
	if (!hasX(e)) return mulNode([
		e,
		simpPow(b, addNode([e, qNode(rr(-1n, 1n))])),
		D(b)
	]);
	if (!hasX(b)) {
		if (b.t === "e") return mulNode([s, D(e)]);
		return mulNode([
			s,
			{
				t: "ln",
				a: b
			},
			D(e)
		]);
	}
	return D(simpPow(E, mulNode([e, {
		t: "ln",
		a: b
	}])));
}
function sqrtRat(r) {
	if (r.n < 0n) return null;
	const sn = isqrt(r.n);
	const sd = isqrt(r.d);
	if (sn === null || sd === null) return null;
	return {
		n: sn,
		d: sd
	};
}
function isqrt(n) {
	if (n < 0n) return null;
	if (n < 2n) return n;
	let x0 = n;
	let x1 = (n >> 1n) + 1n;
	while (x1 < x0) {
		x0 = x1;
		x1 = x0 + n / x0 >> 1n;
	}
	return x0 * x0 === n ? x0 : null;
}
function toBag(s) {
	if (s.t === "q") return {
		coeff: rr(s.n, s.d),
		parts: []
	};
	if (s.t === "pow") return {
		coeff: rr(1n, 1n),
		parts: [{
			base: s.b,
			exp: s.e
		}]
	};
	if (s.t === "mul") {
		let coeff = rr(1n, 1n);
		const parts = [];
		for (const f of s.a) if (f.t === "q") coeff = mulR(coeff, rr(f.n, f.d));
		else if (f.t === "pow") parts.push({
			base: f.b,
			exp: f.e
		});
		else parts.push({
			base: f,
			exp: ONE
		});
		return {
			coeff,
			parts
		};
	}
	return {
		coeff: rr(1n, 1n),
		parts: [{
			base: s,
			exp: ONE
		}]
	};
}
function partMap(parts) {
	const map = /* @__PURE__ */ new Map();
	for (const part of parts) {
		const key = sig(part.base);
		const hit = map.get(key);
		if (!hit) map.set(key, {
			base: part.base,
			exp: part.exp
		});
		else hit.exp = simp(addNode([hit.exp, part.exp]));
	}
	return map;
}
function fromParts(coeff, map) {
	const factors = [];
	if (!isOneR(coeff)) {
		if (isZeroR(coeff)) return ZERO;
		factors.push(qNode(coeff));
	}
	for (const part of map.values()) {
		if (isZeroNode(part.exp)) continue;
		if (isOneNode(part.exp)) factors.push(part.base);
		else factors.push({
			t: "pow",
			b: part.base,
			e: part.exp
		});
	}
	if (factors.length === 0) return ONE;
	if (factors.length === 1) return simp(factors[0]);
	return simp(mulNode(factors));
}
function divideNodes(num, den) {
	if (eq(den, ZERO)) return null;
	if (eq(den, ONE)) return num;
	const bn = toBag(simp(num));
	const bd = toBag(simp(den));
	if (isZeroR(bd.coeff)) return null;
	let coeff;
	try {
		coeff = divR(bn.coeff, bd.coeff);
	} catch {
		return null;
	}
	const map = partMap(bn.parts);
	const denMap = partMap(bd.parts);
	for (const [key, dpart] of denMap) {
		const have = map.get(key);
		if (!have) return null;
		have.exp = simp(addNode([have.exp, scale(rr(-1n, 1n), dpart.exp)]));
		if (isZeroNode(have.exp)) map.delete(key);
	}
	return fromParts(coeff, map);
}
function collect(s, out = []) {
	switch (s.t) {
		case "add":
		case "mul":
			for (const c of s.a) collect(c, out);
			break;
		case "pow":
			collect(s.b, out);
			collect(s.e, out);
			break;
		case "q":
		case "pi":
		case "e": return out;
		case "x": break;
		default: collect(s.a, out);
	}
	out.push(s);
	return out;
}
function xPower(s) {
	if (s.t === "x") return rr(1n, 1n);
	if (s.t === "pow" && s.b.t === "x" && s.e.t === "q") return rr(s.e.n, s.e.d);
	return null;
}
function powX(exp) {
	if (isZeroR(exp)) return ONE;
	if (isOneR(exp)) return X;
	return simpPow(X, qNode(exp));
}
function asABx2(s) {
	const terms = s.t === "add" ? s.a : [s];
	let A = rr(0n, 1n);
	let B = rr(0n, 1n);
	for (const term of terms) {
		if (term.t === "q") {
			A = addR(A, rr(term.n, term.d));
			continue;
		}
		const sp = splitCoeff(term);
		const exp = xPower(sp.rest);
		if (!exp || !(exp.n === 2n && exp.d === 1n)) return null;
		B = addR(B, sp.coeff);
	}
	return {
		A,
		B
	};
}
function hit(title, n, value, extra) {
	const lines = [[
		T$1("∫ "),
		...pretty$1(n),
		T$1(" dx = "),
		...pretty$1(value)
	]];
	if (extra) lines.push(extra);
	return {
		value,
		title,
		lines
	};
}
function matchCore(n, depth) {
	if (n.t === "q") return hit("常數的積分是乘上 x", n, scale(rr(n.n, n.d), X));
	const wholePow = xPower(n);
	if (wholePow) {
		if (wholePow.n === -1n && wholePow.d === 1n) return hit("x 的 −1 次方，積分是 ln|x|", n, {
			t: "ln",
			a: {
				t: "abs",
				a: X
			}
		});
		const np1 = addR(wholePow, rr(1n, 1n));
		if (isZeroR(np1)) return null;
		return hit("冪次法則：次數加 1，再除以新的次數", n, simp(mulNode([qNode(divR(rr(1n, 1n), np1)), powX(np1)])));
	}
	const linSin = trigLinear(n);
	if (linSin) return linSin;
	const quad = quadInt(n);
	if (quad) return quad;
	const lnHit = lnLinear(n);
	if (lnHit) return lnHit;
	const composed = composedPower(n);
	if (composed) return composed;
	return tryUSub(n, depth);
}
function trigLinear(n) {
	let kind = null;
	let inner = null;
	if (n.t === "sin") {
		kind = "sin";
		inner = n.a;
	} else if (n.t === "cos") {
		kind = "cos";
		inner = n.a;
	} else if (n.t === "tan") {
		kind = "tan";
		inner = n.a;
	} else if (n.t === "pow" && n.b.t === "e") {
		kind = "exp";
		inner = n.e;
	} else if (n.t === "pow" && n.b.t === "cos" && isQ(n.e, -2n, 1n)) {
		kind = "sec2";
		inner = n.b.a;
	} else if (n.t === "pow" && n.b.t === "cos" && isQ(n.e, -1n, 1n)) {
		kind = "tan";
		inner = null;
		const lin = asLinear(n.b.a);
		if (!lin || isZeroR(lin.a)) return null;
		return hit("∫ sec u du = ln|sec u + tan u|，再除以裡面的係數", n, simp(mulNode([qNode(divR(rr(1n, 1n), lin.a)), {
			t: "ln",
			a: {
				t: "abs",
				a: addNode([simpPow(n.b, qNode(rr(-1n, 1n))), tanOf(n.b.a)])
			}
		}])));
	}
	if (!kind || !inner) return kind === "tan" ? null : null;
	const lin = asLinear(inner);
	if (!lin || isZeroR(lin.a)) return null;
	const invA = qNode(divR(rr(1n, 1n), lin.a));
	if (kind === "sin") {
		const value = simp(mulNode([qNode(negR(divR(rr(1n, 1n), lin.a))), {
			t: "cos",
			a: inner
		}]));
		return hit(isOneR(lin.a) && isZeroR(lin.b) ? "正弦的積分是負的餘弦" : "連鎖：裡面是一次式，積分再除以係數", n, value);
	}
	if (kind === "cos") {
		const value = simp(mulNode([invA, {
			t: "sin",
			a: inner
		}]));
		return hit(isOneR(lin.a) && isZeroR(lin.b) ? "餘弦的積分是正弦" : "連鎖：裡面是一次式，積分再除以係數", n, value);
	}
	if (kind === "exp") {
		const value = simp(mulNode([invA, n]));
		return hit(isOneR(lin.a) && isZeroR(lin.b) ? "e^x 的積分還是自己" : "e 的一次式次方，積分再除以係數", n, value);
	}
	if (kind === "tan") return hit("∫ tan u du = −ln|cos u|，再除以裡面的係數", n, simp(mulNode([qNode(negR(divR(rr(1n, 1n), lin.a))), {
		t: "ln",
		a: {
			t: "abs",
			a: {
				t: "cos",
				a: inner
			}
		}
	}])));
	if (kind === "sec2") return hit("sec² 的積分是 tan，再除以裡面的係數", n, simp(mulNode([invA, {
		t: "tan",
		a: inner
	}])));
	return null;
}
function tanOf(inner) {
	return {
		t: "tan",
		a: inner
	};
}
function composedPower(n) {
	if (n.t !== "pow" || n.e.t !== "q") return null;
	const lin = asLinear(n.b);
	if (!lin || isZeroR(lin.a) || n.b.t === "x") return null;
	const exp = rr(n.e.n, n.e.d);
	if (exp.n === -1n && exp.d === 1n) return hit("一次式的 −1 次方，積分是 ln 再除以係數", n, simp(mulNode([qNode(divR(rr(1n, 1n), lin.a)), {
		t: "ln",
		a: {
			t: "abs",
			a: n.b
		}
	}])));
	const np1 = addR(exp, rr(1n, 1n));
	if (isZeroR(np1)) return null;
	return hit("一次式的次方，次數加 1，再除以新次數和係數", n, simp(mulNode([qNode(divR(rr(1n, 1n), mulR(lin.a, np1))), simpPow(n.b, qNode(np1))])));
}
function lnLinear(n) {
	if (n.t !== "ln") return null;
	const lin = asLinear(n.a);
	if (!lin || isZeroR(lin.a)) return null;
	const u = n.a;
	const value = simp(addNode([mulNode([
		u,
		qNode(divR(rr(1n, 1n), lin.a)),
		n
	]), mulNode([qNode(negR(divR(rr(1n, 1n), lin.a))), u])]));
	return {
		value,
		title: "ln 用部分積分",
		lines: [[
			T$1("∫ ln u dx，u = "),
			...pretty$1(u),
			T$1("，結果是 u ln u / a − u / a")
		], [T$1("= "), ...pretty$1(value)]]
	};
}
function quadInt(n) {
	let exp = null;
	let inside = null;
	if (n.t === "pow" && n.e.t === "q") {
		exp = rr(n.e.n, n.e.d);
		inside = n.b;
	}
	if (!exp || !inside) return null;
	const ab = asABx2(inside);
	if (!ab) return null;
	if (exp.n === -1n && exp.d === 1n && ab.A.n > 0n && ab.B.n > 0n) {
		const root = sqrtRat(divR(ab.B, ab.A));
		const den = sqrtRat(mulR(ab.A, ab.B));
		if (!root || !den) return null;
		return hit("寫成 1/(1+u²)，積分是 arctan", n, simp(mulNode([qNode(divR(rr(1n, 1n), den)), {
			t: "atan",
			a: scale(root, X)
		}])));
	}
	if (exp.n === -1n && exp.d === 2n && ab.A.n > 0n && ab.B.n < 0n) {
		const C = negR(ab.B);
		const root = sqrtRat(divR(C, ab.A));
		const den = sqrtRat(C);
		if (!root || !den) return null;
		return hit("寫成 1/√(1−u²)，積分是 arcsin", n, simp(mulNode([qNode(divR(rr(1n, 1n), den)), {
			t: "asin",
			a: scale(root, X)
		}])));
	}
	return null;
}
function tryUSub(n, depth) {
	if (depth > 5) return null;
	const seen = /* @__PURE__ */ new Set();
	const cands = collect(n).filter((u) => {
		if (!hasX(u) || u.t === "x" || eq(u, n)) return false;
		const key = sig(u);
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
	let best = null;
	let bestScore = Infinity;
	for (const u of cands) {
		const du = D(u);
		if (eq(du, ZERO)) continue;
		const quot = divideNodes(n, du);
		if (!quot) continue;
		if (!onlyThrough(quot, u)) continue;
		const qInX = simp(replace(quot, u, X));
		if (eq(qInX, n)) continue;
		let antiX;
		try {
			antiX = integrateNode(qInX, depth + 1);
		} catch {
			continue;
		}
		const value = simp(replace(antiX, X, u));
		if (!eq(D(value), simp(n))) continue;
		const score = sig(quot).length + sig(u).length;
		if (score < bestScore) {
			bestScore = score;
			best = {
				value,
				title: "湊微分：外面正好是裡面的導數",
				lines: [
					[
						T$1("令 u = "),
						...pretty$1(u),
						T$1("，u′ = "),
						...pretty$1(du)
					],
					[
						T$1("原式變成 ∫ "),
						...pretty$1(qInX),
						T$1(" du = "),
						...pretty$1(antiX)
					],
					[T$1("把 u 代回去："), ...pretty$1(value)]
				]
			};
		}
	}
	return best;
}
function matchTerm(n, depth) {
	const direct = matchCore(n, depth);
	if (direct) return direct;
	const sp = splitCoeff(n);
	if (!isOneR(sp.coeff) && !isZeroR(sp.coeff) && !eq(sp.rest, ONE)) {
		const inner = matchCore(sp.rest, depth);
		if (inner) {
			const value = simp(scale(sp.coeff, inner.value));
			return {
				value,
				title: "常數先提出來",
				lines: [[
					T$1("∫ "),
					...pretty$1(n),
					T$1(" dx = "),
					...pretty$1(qNode(sp.coeff)),
					T$1(" · ∫ "),
					...pretty$1(sp.rest),
					T$1(" dx")
				], [
					T$1("= "),
					...pretty$1(qNode(sp.coeff)),
					T$1(" · ("),
					...pretty$1(inner.value),
					T$1(") = "),
					...pretty$1(value)
				]]
			};
		}
	}
	return null;
}
function integrateNode(n, depth = 0) {
	if (depth > 6) throw new CalcError("這個積分太複雜了");
	n = simp(n);
	if (n.t === "add") return simp(addNode(n.a.map((term) => integrateNode(term, depth + 1))));
	const hitNode = matchTerm(n, depth);
	if (!hitNode) throw new CalcError(INT_FAIL);
	return hitNode.value;
}
function explainInt(raw) {
	const steps = [];
	const n = simp(raw);
	if (!eq(n, raw)) steps.push({
		title: "先化簡",
		lines: [pretty$1(raw), [T$1("= "), ...pretty$1(n)]]
	});
	const value = walkInt(n, steps, 0);
	steps.push({
		title: "結果",
		lines: [[...pretty$1(value), T$1(" + C")]]
	});
	const back = D(value);
	if (eq(back, n)) steps.push({
		title: "驗算：把答案微分，應該回到原式",
		lines: [[
			...pretty$1(value),
			T$1("′ = "),
			...pretty$1(back)
		]]
	});
	return {
		value,
		steps
	};
}
function walkInt(n, steps, depth) {
	if (n.t === "add") {
		steps.push({
			title: "和的積分，一項一項積",
			lines: [pretty$1(n)]
		});
		const parts = [];
		for (const term of n.a) {
			const one = matchTerm(term, depth);
			if (!one) throw new CalcError(INT_FAIL);
			steps.push({
				title: one.title,
				lines: one.lines
			});
			parts.push(one.value);
		}
		const sum = simp(addNode(parts));
		steps.push({
			title: "把各項加起來",
			lines: [pretty$1(sum)]
		});
		return sum;
	}
	const one = matchTerm(n, depth);
	if (!one) throw new CalcError(INT_FAIL);
	steps.push({
		title: one.title,
		lines: one.lines
	});
	return one.value;
}
function explainDiff(raw) {
	const steps = [];
	const n = simp(raw);
	if (!eq(n, raw)) steps.push({
		title: "先化簡",
		lines: [pretty$1(raw), [T$1("= "), ...pretty$1(n)]]
	});
	const value = narrate(n, steps);
	const official = D(n);
	const shown = eq(value, official) ? value : official;
	steps.push({
		title: "結果",
		lines: [pretty$1(shown)]
	});
	return {
		value: shown,
		steps
	};
}
function narrate(n, steps) {
	n = simp(n);
	if (!hasX(n)) {
		steps.push({
			title: "常數的導數是 0",
			lines: [[...pretty$1(n), T$1("′ = 0")]]
		});
		return ZERO;
	}
	if (n.t === "x") {
		steps.push({
			title: "x 的導數是 1",
			lines: [[T$1("x′ = 1")]]
		});
		return ONE;
	}
	const lin = asLinear(n);
	if (lin) {
		const d = qNode(lin.a);
		const title = isZeroR(lin.b) ? "x 的倍數，導數就是那個倍數" : "一次式的導數是 x 的係數";
		steps.push({
			title,
			lines: [[
				...pretty$1(n),
				T$1("′ = "),
				...pretty$1(d)
			]]
		});
		return d;
	}
	if (n.t === "add") {
		steps.push({
			title: "和的導數，逐項相加",
			lines: [pretty$1(n)]
		});
		const ds = n.a.map((term) => narrate(term, steps));
		const sum = simp(addNode(ds));
		steps.push({
			title: "各項加起來",
			lines: [joinPieces(ds, " + "), [T$1("= "), ...pretty$1(sum)]]
		});
		return sum;
	}
	const sp = splitCoeff(n);
	if (!isOneR(sp.coeff) && !isNegOneR(sp.coeff) && hasX(sp.rest)) {
		const c = qNode(sp.coeff);
		steps.push({
			title: "常數倍先提出來",
			lines: [[
				...pretty$1(n),
				T$1("′ = "),
				...pretty$1(c),
				T$1(" · ("),
				...pretty$1(sp.rest),
				T$1(")′")
			]]
		});
		const inner = narrate(sp.rest, steps);
		const out = simp(mulNode([c, inner]));
		steps.push({
			title: "乘回常數",
			lines: [[
				...pretty$1(c),
				T$1(" · "),
				...pretty$1(inner),
				T$1(" = "),
				...pretty$1(out)
			]]
		});
		return out;
	}
	if (isNegOneR(sp.coeff) && hasX(sp.rest) && n.t === "mul") {
		steps.push({
			title: "負號先留著",
			lines: [[
				...pretty$1(n),
				T$1("′ = −("),
				...pretty$1(sp.rest),
				T$1(")′")
			]]
		});
		const inner = narrate(sp.rest, steps);
		const out = simp(mulNode([qNode(rr(-1n, 1n)), inner]));
		steps.push({
			title: "補上負號",
			lines: [[
				T$1("−("),
				...pretty$1(inner),
				T$1(") = "),
				...pretty$1(out)
			]]
		});
		return out;
	}
	if (n.t === "pow") return narratePow(n, steps);
	if (n.t === "sin" || n.t === "cos" || n.t === "tan" || n.t === "ln" || n.t === "asin" || n.t === "atan" || n.t === "abs") return narrateFn(n, steps);
	const quot = asQuotient(n);
	if (quot && hasX(quot.den)) return narrateQuot(quot.num, quot.den, steps);
	if (n.t === "mul") return narrateProd(n, steps);
	const d = D(n);
	steps.push({
		title: "套用微分法則",
		lines: [[
			...pretty$1(n),
			T$1("′ = "),
			...pretty$1(d)
		]]
	});
	return d;
}
function narratePow(n, steps) {
	const b = n.b;
	const e = n.e;
	if (!hasX(e)) {
		const d = D(n);
		if (b.t === "x") {
			steps.push({
				title: "冪次法則",
				lines: [[T$1("次數先乘下來，再把次數減 1")], [
					...pretty$1(n),
					T$1("′ = "),
					...pretty$1(d)
				]]
			});
			return d;
		}
		const expMinus = simp(addNode([e, qNode(rr(-1n, 1n))]));
		steps.push({
			title: "冪次法則，再乘裡面的導數",
			lines: [[
				T$1("("),
				...pretty$1(b),
				T$1(")"),
				supPiece(expMinus),
				T$1(" 的次數先乘下來")
			], [
				T$1("裡面 "),
				...pretty$1(b),
				T$1(" 還要再微分")
			]]
		});
		const db = narrate(b, steps);
		const out = simp(mulNode([
			e,
			simpPow(b, expMinus),
			db
		]));
		steps.push({
			title: "乘起來",
			lines: [[...pretty$1(out)]]
		});
		return eq(out, d) ? out : d;
	}
	if (b.t === "e") {
		steps.push({
			title: "指數函數的導數還是自己，再乘指數的導數",
			lines: [[T$1("(e^u)′ = e^u · u′")], [T$1("u = "), ...pretty$1(e)]]
		});
		if (e.t === "x") return n;
		const du = narrate(e, steps);
		const out = simp(mulNode([n, du]));
		steps.push({
			title: "乘起來",
			lines: [[
				...pretty$1(n),
				T$1(" · "),
				...pretty$1(du),
				T$1(" = "),
				...pretty$1(out)
			]]
		});
		return out;
	}
	if (!hasX(b)) {
		const d = D(n);
		steps.push({
			title: "一般指數：a^u 的導數是 a^u · ln a · u′",
			lines: [[
				...pretty$1(n),
				T$1("′ = "),
				...pretty$1(d)
			]]
		});
		return d;
	}
	const d = D(n);
	steps.push({
		title: "一般冪：先寫成 e^(指數 · ln 底數) 再微分",
		lines: [[
			...pretty$1(n),
			T$1("′ = "),
			...pretty$1(d)
		]]
	});
	return d;
}
function narrateFn(n, steps) {
	const d = D(n);
	if (n.t !== "sin" && n.t !== "cos" && n.t !== "tan" && n.t !== "ln" && n.t !== "asin" && n.t !== "atan" && n.t !== "abs") return d;
	const arg = n.a;
	const name = n.t === "sin" ? "sin" : n.t === "cos" ? "cos" : n.t === "tan" ? "tan" : n.t === "ln" ? "ln" : n.t === "asin" ? "arcsin" : n.t === "atan" ? "arctan" : "|u|";
	const rule = n.t === "sin" ? "(sin u)′ = cos u · u′" : n.t === "cos" ? "(cos u)′ = −sin u · u′" : n.t === "tan" ? "(tan u)′ = sec²u · u′" : n.t === "ln" ? "(ln u)′ = u′ / u" : n.t === "asin" ? "(arcsin u)′ = u′ / √(1−u²)" : n.t === "atan" ? "(arctan u)′ = u′ / (1+u²)" : "(|u|)′ = u′ · u / |u|";
	if (arg.t === "x") {
		steps.push({
			title: `${name} x 的導數`,
			lines: [[T$1(rule)], [
				...pretty$1(n),
				T$1("′ = "),
				...pretty$1(d)
			]]
		});
		return d;
	}
	const duConst = D(arg);
	if (!hasX(duConst) && !isZeroNode(duConst)) {
		steps.push({
			title: "連鎖法則",
			lines: [
				[T$1(rule)],
				[
					T$1("u = "),
					...pretty$1(arg),
					T$1("，u′ = "),
					...pretty$1(duConst)
				],
				[
					...pretty$1(n),
					T$1("′ = "),
					...pretty$1(d)
				]
			]
		});
		return d;
	}
	steps.push({
		title: "連鎖法則",
		lines: [[T$1(rule)], [T$1("u = "), ...pretty$1(arg)]]
	});
	narrate(arg, steps);
	steps.push({
		title: "代回去",
		lines: [[
			...pretty$1(n),
			T$1("′ = "),
			...pretty$1(d)
		]]
	});
	return d;
}
function asQuotient(s) {
	const bag = toBag(s);
	const num = [];
	const den = [];
	for (const part of bag.parts) if (part.exp.t === "q" && part.exp.n < 0n) {
		const e = rr(-part.exp.n, part.exp.d);
		den.push(isOneR(e) ? part.base : simpPow(part.base, qNode(e)));
	} else if (!isOneNode(part.exp)) num.push(simpPow(part.base, part.exp));
	else num.push(part.base);
	if (den.length === 0) return null;
	if (!isOneR(bag.coeff)) {
		if (bag.coeff.n < 0n) num.unshift(qNode(bag.coeff));
		else num.unshift(qNode(bag.coeff));
	}
	const numN = num.length === 0 ? ONE : num.length === 1 ? num[0] : mulNode(num);
	const denN = den.length === 1 ? den[0] : mulNode(den);
	if (!hasX(simp(denN))) return null;
	if (xPower(s) || splitCoeff(s).rest && xPower(splitCoeff(s).rest)) return null;
	return {
		num: simp(numN),
		den: simp(denN)
	};
}
function narrateQuot(num, den, steps) {
	const d = D(simp(mulNode([num, simpPow(den, qNode(rr(-1n, 1n)))])));
	steps.push({
		title: "商的法則",
		lines: [
			[T$1("(u/v)′ = (u′v − uv′) / v²")],
			[T$1("u = "), ...pretty$1(num)],
			[T$1("v = "), ...pretty$1(den)]
		]
	});
	const du = narrate(num, steps);
	const dv = narrate(den, steps);
	steps.push({
		title: "代進公式",
		lines: [[
			T$1("("),
			...pretty$1(du),
			T$1(" · "),
			...pretty$1(den),
			T$1(" − "),
			...pretty$1(num),
			T$1(" · "),
			...pretty$1(dv),
			T$1(") / ("),
			...pretty$1(den),
			T$1(")²")
		], [T$1("= "), ...pretty$1(d)]]
	});
	return d;
}
function narrateProd(n, steps) {
	const factors = n.a.filter((f) => f.t !== "q");
	if (factors.length < 2) {
		const d = D(n);
		steps.push({
			title: "套用微分法則",
			lines: [[
				...pretty$1(n),
				T$1("′ = "),
				...pretty$1(d)
			]]
		});
		return d;
	}
	const u = factors[0];
	const v = factors.length === 2 ? factors[1] : simp(mulNode(factors.slice(1)));
	steps.push({
		title: "乘積法則",
		lines: [
			[T$1("(uv)′ = u′v + uv′")],
			[T$1("u = "), ...pretty$1(u)],
			[T$1("v = "), ...pretty$1(v)]
		]
	});
	const du = narrate(u, steps);
	const dv = narrate(v, steps);
	const out = simp(addNode([mulNode([du, v]), mulNode([u, dv])]));
	steps.push({
		title: "代進公式",
		lines: [[
			...pretty$1(du),
			T$1(" · "),
			...pretty$1(v),
			T$1(" + "),
			...pretty$1(u),
			T$1(" · "),
			...pretty$1(dv),
			T$1(" = "),
			...pretty$1(out)
		]]
	});
	return out;
}
function joinPieces(xs, sep) {
	const out = [];
	xs.forEach((item, i) => {
		if (i > 0) out.push(T$1(sep));
		out.push(...pretty$1(item));
	});
	return out;
}
function supPiece(e) {
	if (e.t === "q" && e.d === 1n) return {
		k: "sup",
		v: e.n < 0n ? `−${(-e.n).toString()}` : e.n.toString()
	};
	if (e.t === "x") return {
		k: "sup",
		v: "x"
	};
	return T$1("^(" + flatPieces(pretty$1(e)) + ")");
}
function pretty$1(s) {
	return prettyAt(s, 0);
}
function prettyAt(s, parent) {
	switch (s.t) {
		case "q": return prettyRat(s.n, s.d, parent);
		case "x": return [T$1("x")];
		case "pi": return [T$1("π")];
		case "e": return [T$1("e")];
		case "add": return paren(prettyAdd(s), parent > 1);
		case "mul": return paren(prettyMul(s), parent > 2 && needsMulParen(s));
		case "pow": return prettyPow(s);
		case "abs": return [
			T$1("|"),
			...pretty$1(s.a),
			T$1("|")
		];
		case "sin":
		case "cos":
		case "tan":
		case "asin":
		case "atan": return prettyCall(s);
		case "ln":
			if (s.a.t === "abs") return [
				T$1("ln|"),
				...pretty$1(s.a.a),
				T$1("|")
			];
			return prettyCall(s);
		default: return [T$1("?")];
	}
}
function paren(ps, on) {
	return on ? [
		T$1("("),
		...ps,
		T$1(")")
	] : ps;
}
function needsMulParen(s) {
	return !toBag(s).parts.some((p) => p.exp.t === "q" && p.exp.n < 0n) && !(s.a[0]?.t === "q" && s.a[0].n < 0n);
}
function prettyRat(n, d, parent) {
	const r = rr(n, d);
	const neg = r.n < 0n;
	const an = (neg ? -r.n : r.n).toString();
	const body = r.d === 1n ? [T$1(an)] : [{
		k: "f",
		num: [T$1(an)],
		den: [T$1(r.d.toString())]
	}];
	if (!neg) return body;
	if (parent > 0) return [
		T$1("("),
		T$1("−"),
		...body,
		T$1(")")
	];
	return [T$1("−"), ...body];
}
function prettyAdd(s) {
	const out = [];
	s.a.forEach((term, index) => {
		const sp = splitCoeff(term);
		if (index > 0 && sp.coeff.n < 0n) {
			const pos = simp(mulNode([qNode(rr(-1n, 1n)), term]));
			out.push(T$1(" − "), ...prettyAt(pos, 1));
			return;
		}
		if (index > 0) out.push(T$1(" + "));
		out.push(...prettyAt(term, 1));
	});
	return out;
}
function prettyMul(s) {
	const bag = toBag(s);
	const num = [];
	const den = [];
	for (const part of [...bag.parts].sort((a, b) => compareRest(a.base, b.base))) if (part.exp.t === "q" && part.exp.n < 0n) {
		const e = rr(-part.exp.n, part.exp.d);
		den.push(isOneR(e) ? part.base : {
			t: "pow",
			b: part.base,
			e: qNode(e)
		});
	} else num.push(isOneNode(part.exp) ? part.base : {
		t: "pow",
		b: part.base,
		e: part.exp
	});
	let cn = bag.coeff.n;
	const cd = bag.coeff.d;
	const neg = cn < 0n;
	if (neg) cn = -cn;
	if (cn !== 1n) num.unshift(qNode(rr(cn, 1n)));
	if (cd !== 1n) den.unshift(qNode(rr(cd, 1n)));
	const numP = num.length === 0 ? [T$1("1")] : prettyProduct(num);
	if (den.length === 0) return neg ? [T$1("−"), ...numP] : numP;
	const frac = {
		k: "f",
		num: numP,
		den: prettyProduct(den)
	};
	return neg ? [T$1("−"), frac] : [frac];
}
function prettyProduct(factors) {
	if (factors.length === 1 && factors[0].t === "add") return pretty$1(factors[0]);
	const out = [];
	factors.forEach((factor, index) => {
		if (index > 0 && !juxtapose(factor)) out.push(T$1("·"));
		out.push(...prettyAt(factor, 2));
	});
	return out;
}
function juxtapose(factor) {
	if (factor.t === "x" || factor.t === "add") return true;
	return factor.t === "pow" && (factor.b.t === "x" || factor.b.t === "add");
}
function prettyPow(s) {
	if (s.b.t === "cos" && isQ(s.e, -2n, 1n)) return [
		T$1("sec"),
		{
			k: "sup",
			v: "2"
		},
		T$1("("),
		...pretty$1(s.b.a),
		T$1(")")
	];
	if (s.b.t === "cos" && isQ(s.e, -1n, 1n)) return [
		T$1("sec("),
		...pretty$1(s.b.a),
		T$1(")")
	];
	if (s.b.t === "sin" && isQ(s.e, -1n, 1n)) return [
		T$1("csc("),
		...pretty$1(s.b.a),
		T$1(")")
	];
	if ((s.b.t === "sin" || s.b.t === "cos" || s.b.t === "tan") && isIntQ(s.e) && s.e.n >= 2n && s.e.n <= 9n) return [
		T$1(s.b.t),
		{
			k: "sup",
			v: s.e.n.toString()
		},
		T$1("("),
		...pretty$1(s.b.a),
		T$1(")")
	];
	if (isQ(s.e, 1n, 2n)) {
		if (s.b.t === "x" || s.b.t === "q") return [T$1("√"), ...prettyAt(s.b, 4)];
		return [
			T$1("√("),
			...pretty$1(s.b),
			T$1(")")
		];
	}
	if (isQ(s.e, -1n, 2n)) return [{
		k: "f",
		num: [T$1("1")],
		den: [
			T$1("√("),
			...pretty$1(s.b),
			T$1(")")
		]
	}];
	if (s.e.t === "q" && s.e.n < 0n) {
		const pos = rr(-s.e.n, s.e.d);
		const den = isOneR(pos) ? pretty$1(s.b) : pretty$1({
			t: "pow",
			b: s.b,
			e: qNode(pos)
		});
		return [{
			k: "f",
			num: [T$1("1")],
			den
		}];
	}
	if ((s.b.t === "x" || s.b.t === "e" || s.b.t === "pi") && (s.e.t === "x" || s.e.t === "q" && s.e.d === 1n && s.e.n >= 0n && s.e.n <= 9n)) {
		const v = s.e.t === "x" ? "x" : s.e.n.toString();
		return [...prettyAt(s.b, 4), {
			k: "sup",
			v
		}];
	}
	if (s.e.t === "q" && s.e.d === 1n && s.e.n >= 2n && s.e.n <= 9n) return [...prettyAt(s.b, 4), {
		k: "sup",
		v: s.e.n.toString()
	}];
	return [
		...prettyAt(s.b, 4),
		T$1("^("),
		...pretty$1(s.e),
		T$1(")")
	];
}
function prettyCall(s) {
	const name = s.t === "asin" ? "arcsin" : s.t === "atan" ? "arctan" : s.t;
	if (s.a.t === "x") return [T$1(`${name} x`)];
	return [
		T$1(`${name}(`),
		...pretty$1(s.a),
		T$1(")")
	];
}
function flatPieces(ps) {
	return ps.map((p) => {
		if (p.k === "t") return p.v;
		if (p.k === "sup") return "^" + p.v;
		if (p.k === "f") return `${flatSide(p.num)}/${flatSide(p.den)}`;
		return "";
	}).join("").replace(/\s+/g, " ").trim();
}
function flatSide(ps) {
	const text = flatPieces(ps);
	return text.includes("+") || text.includes("−") || text.includes("·") || /^\d/.test(text) && !/^\d+$/.test(text) ? `(${text})` : text;
}
var FUNCS = /* @__PURE__ */ new Set([
	"sin",
	"cos",
	"tan",
	"ln",
	"log",
	"exp",
	"sec",
	"csc",
	"cot",
	"arcsin",
	"arccos",
	"arctan",
	"asin",
	"acos",
	"atan",
	"abs",
	"sqrt"
]);
function normalizeCalc(input) {
	return input.replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 65296 + 48)).replace(/＋/g, "+").replace(/[－–—−]/g, "-").replace(/[＊×·•]/g, "*").replace(/[／⁄÷]/g, "/").replace(/（/g, "(").replace(/）/g, ")").replace(/＾/g, "^").replace(/\*\*/g, "^").replace(/π/g, "π").replace(/∫/g, "∫");
}
function tokenize$1(input) {
	const s = normalizeCalc(input);
	const out = [];
	let i = 0;
	while (i < s.length) {
		const c = s[i];
		if (c === " " || c === "	" || c === "\n" || c === "\r") {
			i += 1;
			continue;
		}
		if (c >= "0" && c <= "9" || c === "." && s[i + 1] >= "0" && s[i + 1] <= "9") {
			let j = i;
			if (s[j] !== ".") while (j < s.length && s[j] >= "0" && s[j] <= "9") j += 1;
			if (s[j] === ".") {
				j += 1;
				while (j < s.length && s[j] >= "0" && s[j] <= "9") j += 1;
			}
			out.push({
				k: "num",
				v: s.slice(i, j)
			});
			i = j;
			continue;
		}
		if (c === "π") {
			out.push({
				k: "id",
				v: "pi"
			});
			i += 1;
			continue;
		}
		if (/[a-zA-Z]/.test(c)) {
			let j = i;
			while (j < s.length && /[a-zA-Z]/.test(s[j])) j += 1;
			out.push({
				k: "id",
				v: s.slice(i, j).toLowerCase()
			});
			i = j;
			continue;
		}
		if ("+-*/^()".includes(c) || c === "√") {
			if (c === "(") out.push({ k: "lp" });
			else if (c === ")") out.push({ k: "rp" });
			else out.push({
				k: "op",
				v: c
			});
			i += 1;
			continue;
		}
		throw new CalcError(`看不懂「${c}」`);
	}
	out.push({ k: "end" });
	return out;
}
function decimalToNode(raw) {
	if (!raw.includes(".")) return qNode(rr(BigInt(raw), 1n));
	const [a = "", b = ""] = raw.split(".");
	if (b.length === 0) return qNode(rr(BigInt(a || "0"), 1n));
	return qNode(rr(BigInt(`${a || "0"}${b}`), 10n ** BigInt(b.length)));
}
function applyFunc(name, arg) {
	if (name === "sin") return {
		t: "sin",
		a: arg
	};
	if (name === "cos") return {
		t: "cos",
		a: arg
	};
	if (name === "tan") return {
		t: "tan",
		a: arg
	};
	if (name === "ln" || name === "log") return {
		t: "ln",
		a: arg
	};
	if (name === "exp") return {
		t: "pow",
		b: E,
		e: arg
	};
	if (name === "sqrt") return {
		t: "pow",
		b: arg,
		e: qNode(rr(1n, 2n))
	};
	if (name === "sec") return simpPow({
		t: "cos",
		a: arg
	}, qNode(rr(-1n, 1n)));
	if (name === "csc") return simpPow({
		t: "sin",
		a: arg
	}, qNode(rr(-1n, 1n)));
	if (name === "cot") return mulNode([{
		t: "cos",
		a: arg
	}, simpPow({
		t: "sin",
		a: arg
	}, qNode(rr(-1n, 1n)))]);
	if (name === "arcsin" || name === "asin") return {
		t: "asin",
		a: arg
	};
	if (name === "arctan" || name === "atan") return {
		t: "atan",
		a: arg
	};
	if (name === "arccos" || name === "acos") return addNode([mulNode([qNode(rr(1n, 2n)), PI]), mulNode([qNode(rr(-1n, 1n)), {
		t: "asin",
		a: arg
	}])]);
	if (name === "abs") return {
		t: "abs",
		a: arg
	};
	throw new CalcError(`還不會算 ${name}`);
}
function parseExpr(input) {
	const trimmed = input.trim();
	if (!trimmed) throw new CalcError("請先輸入算式");
	if (trimmed.length > 240) throw new CalcError("算式太長了");
	const tokens = tokenize$1(trimmed);
	let i = 0;
	const peek = () => tokens[i] ?? { k: "end" };
	function consume() {
		const t = peek();
		i += 1;
		return t;
	}
	function opIs(v) {
		const t = peek();
		return t.k === "op" && t.v === v;
	}
	function startsPower() {
		const t = peek();
		if (t.k === "num" || t.k === "id" || t.k === "lp") return true;
		return t.k === "op" && (t.v === "√" || t.v === "-");
	}
	function parseSum() {
		let left = parseProduct();
		while (opIs("+") || opIs("-")) {
			const op = consume();
			const right = parseProduct();
			left = op.k === "op" && op.v === "-" ? addNode([left, mulNode([qNode(rr(-1n, 1n)), right])]) : addNode([left, right]);
		}
		return left;
	}
	function parseProduct() {
		let left = parsePower();
		while (true) {
			if (opIs("*")) {
				consume();
				left = mulNode([left, parsePower()]);
				continue;
			}
			if (opIs("/")) {
				consume();
				left = mulNode([left, {
					t: "pow",
					b: parsePower(),
					e: qNode(rr(-1n, 1n))
				}]);
				continue;
			}
			if (startsPower() && !(peek().k === "op" && peek().k === "op")) {
				const t = peek();
				if (t.k === "op" && t.v === "-") break;
				if (t.k === "num" || t.k === "id" || t.k === "lp" || t.k === "op" && t.v === "√") {
					left = mulNode([left, parsePower()]);
					continue;
				}
			}
			break;
		}
		return left;
	}
	function parsePower() {
		const left = parsePrefix();
		if (opIs("^")) {
			consume();
			return {
				t: "pow",
				b: left,
				e: parseFuncArg()
			};
		}
		return left;
	}
	function parseFuncArg() {
		let left = parsePower();
		while (true) {
			const t = peek();
			if (t.k === "num" || t.k === "id" || t.k === "lp" || t.k === "op" && t.v === "√") {
				left = mulNode([left, parsePower()]);
				continue;
			}
			break;
		}
		return left;
	}
	function parsePrefix() {
		if (opIs("+")) {
			consume();
			return parsePrefix();
		}
		if (opIs("-")) {
			consume();
			return mulNode([qNode(rr(-1n, 1n)), parsePrefix()]);
		}
		if (opIs("√")) {
			consume();
			return {
				t: "pow",
				b: parseFuncArg(),
				e: qNode(rr(1n, 2n))
			};
		}
		const t = peek();
		if (t.k === "id" && FUNCS.has(t.v)) {
			consume();
			return applyFunc(t.v, parseFuncArg());
		}
		return parseAtom();
	}
	function parseAtom() {
		const t = peek();
		if (t.k === "num") {
			consume();
			return decimalToNode(t.v);
		}
		if (t.k === "id") {
			consume();
			if (t.v === "x") return X;
			if (t.v === "e") return E;
			if (t.v === "pi") return PI;
			if (t.v === "d") throw new CalcError("微分請按「微分」，或把 d/dx 寫在最前面");
			throw new CalcError(`目前只對 x 微積分，看不懂「${t.v}」`);
		}
		if (t.k === "lp") {
			consume();
			const inner = parseSum();
			if (peek().k !== "rp") throw new CalcError("少了右括號 )");
			consume();
			return inner;
		}
		if (t.k === "end") throw new CalcError("算式還沒寫完");
		const label = t.k === "op" ? t.v : t.k === "rp" ? ")" : "";
		throw new CalcError(label ? `這裡不該出現「${label}」` : "算式還沒寫完");
	}
	const ast = parseSum();
	if (peek().k !== "end") throw new CalcError("算式還沒寫完，或多了一個符號");
	return ast;
}
function splitCalcPrefix(input) {
	let s = normalizeCalc(input).trim();
	let op = null;
	if (/^d\s*\/\s*dx/i.test(s)) {
		op = "diff";
		s = s.replace(/^d\s*\/\s*dx/i, "").trim();
	} else if (s.startsWith("∫")) {
		op = "int";
		s = s.slice(1).trim();
	} else if (/^int\s+/i.test(s)) {
		op = "int";
		s = s.replace(/^int\s+/i, "").trim();
	}
	if (op === "int") s = s.replace(/d\s*x$/i, "").trim();
	return {
		op,
		body: s
	};
}
function solveCalculus(input, requested) {
	const { op: leading, body } = splitCalcPrefix(input);
	const op = leading ?? requested;
	const ast = parseExpr(body);
	const explained = op === "diff" ? explainDiff(ast) : explainInt(ast);
	const answerPieces = op === "int" ? [...pretty$1(explained.value), T$1(" + C")] : pretty$1(explained.value);
	return {
		input: body,
		op,
		steps: [{
			title: "原式",
			lines: [pretty$1(ast)]
		}, ...explained.steps],
		answer: answerPieces,
		linear: flat(answerPieces),
		headline: op === "diff" ? "導數" : "不定積分",
		inputPretty: pretty$1(ast)
	};
}
function tryPrettyCalc(input) {
	try {
		const { body } = splitCalcPrefix(input);
		if (!body.trim()) return null;
		return pretty$1(parseExpr(body));
	} catch {
		return null;
	}
}
function flat(ps) {
	return flatPieces(ps);
}
function T(v) {
	return {
		k: "t",
		v
	};
}
function fmtInt(n) {
	return n < 0n ? `−${(-n).toString()}` : n.toString();
}
function F(f, mode) {
	const s = mode === "bar" ? normalize(f.n, f.d) : simplify(f);
	const neg = s.n < 0n;
	const n = (neg ? -s.n : s.n).toString();
	const d = s.d.toString();
	if (mode === "auto" && s.d === 1n) return [T((neg ? "−" : "") + n)];
	const frac = {
		k: "f",
		num: [T(n)],
		den: [T(d)]
	};
	return neg ? [T("−"), frac] : [frac];
}
function FP(f, mode) {
	const s = mode === "bar" ? normalize(f.n, f.d) : simplify(f);
	const body = F(f, mode);
	if (s.n < 0n) return [
		T("("),
		...body,
		T(")")
	];
	return body;
}
function normalizeInput(input) {
	return input.replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 65296 + 48)).replace(/＋/g, "+").replace(/[－–—−]/g, "-").replace(/[＊×·•xX]/g, "*").replace(/[／⁄]/g, "/").replace(/[：∶:]/g, "÷").replace(/（/g, "(").replace(/）/g, ")").replace(/％/g, "%").replace(/＾/g, "^").replace(/\*\*/g, "^");
}
function tokenize(input) {
	const s = normalizeInput(input);
	const out = [];
	let i = 0;
	while (i < s.length) {
		const c = s[i];
		if (c === " " || c === "	" || c === "\n" || c === "\r") {
			i += 1;
			continue;
		}
		if (c >= "0" && c <= "9" || c === "." && s[i + 1] >= "0" && s[i + 1] <= "9") {
			let j = i;
			if (s[j] !== ".") while (j < s.length && s[j] >= "0" && s[j] <= "9") j += 1;
			if (s[j] === ".") {
				j += 1;
				while (j < s.length && s[j] >= "0" && s[j] <= "9") j += 1;
			}
			const raw = s.slice(i, j);
			if (raw === ".") throw new CalcError("小數點後面要有數字");
			out.push({
				k: "num",
				v: raw
			});
			i = j;
			continue;
		}
		if ("+-*/^%()".includes(c) || c === "÷" || c === "√" || c === "又") {
			if (c === "(") out.push({ k: "lp" });
			else if (c === ")") out.push({ k: "rp" });
			else out.push({
				k: "op",
				v: c
			});
			i += 1;
			continue;
		}
		throw new CalcError(`看不懂「${c}」`);
	}
	out.push({ k: "end" });
	return out;
}
function decimalToFrac(raw) {
	if (!raw.includes(".")) return {
		n: BigInt(raw),
		d: 1n
	};
	const [a = "", b = ""] = raw.split(".");
	if (b.length === 0) return {
		n: BigInt(a || "0"),
		d: 1n
	};
	const digits = `${a || "0"}${b}`;
	return {
		n: BigInt(digits),
		d: 10n ** BigInt(b.length)
	};
}
function parse(input) {
	const trimmed = input.trim();
	if (!trimmed) throw new CalcError("請先輸入算式");
	if (trimmed.length > 240) throw new CalcError("算式太長了");
	const tokens = tokenize(trimmed);
	let i = 0;
	const peek = () => tokens[i] ?? { k: "end" };
	function consume() {
		const t = peek();
		i += 1;
		return t;
	}
	function opIs(v) {
		const t = peek();
		return t.k === "op" && t.v === v;
	}
	function takeOp(v) {
		if (!opIs(v)) return false;
		consume();
		return true;
	}
	function parseExpression() {
		let left = parseTerm();
		while (opIs("+") || opIs("-")) {
			const op = consume();
			if (op.k !== "op") throw new CalcError("算式還沒寫完");
			const right = parseTerm();
			left = {
				type: "bin",
				op: op.v === "-" ? "-" : "+",
				left,
				right
			};
		}
		return left;
	}
	function startsAtom() {
		const t = peek();
		if (t.k === "num" || t.k === "lp") return true;
		return t.k === "op" && t.v === "√";
	}
	function parseTerm() {
		let left = parseSummand();
		while (true) {
			if (opIs("*") || opIs("÷")) {
				const tok = consume();
				left = {
					type: "bin",
					op: tok.k === "op" && tok.v === "÷" ? "÷" : "*",
					left,
					right: parseSummand()
				};
				continue;
			}
			if (startsAtom()) {
				left = {
					type: "bin",
					op: "*",
					left,
					right: parseSummand()
				};
				continue;
			}
			break;
		}
		return left;
	}
	function parseSummand() {
		const t = peek();
		if (t.k === "op" && t.v === "-") {
			consume();
			return {
				type: "neg",
				expr: parseSummand()
			};
		}
		if (t.k === "op" && t.v === "+") {
			consume();
			return parseSummand();
		}
		return parseFrac();
	}
	function parseFrac() {
		const first = parseFracAtom();
		if (!opIs("/")) return first;
		const parts = [first];
		while (takeOp("/")) parts.push(parseFracAtom());
		if (parts.length === 4 && parts.every((p) => p.type === "num")) {
			const [a, b, c, d] = parts;
			return {
				type: "bin",
				op: "÷",
				paired: true,
				left: {
					type: "bin",
					op: "/",
					left: a,
					right: b
				},
				right: {
					type: "bin",
					op: "/",
					left: c,
					right: d
				}
			};
		}
		let left = parts[0];
		for (let k = 1; k < parts.length; k += 1) left = {
			type: "bin",
			op: "/",
			left,
			right: parts[k]
		};
		return left;
	}
	function parseFracAtom() {
		const t = peek();
		if (t.k === "op" && t.v === "-") {
			consume();
			return {
				type: "neg",
				expr: parseFracAtom()
			};
		}
		if (t.k === "op" && t.v === "+") {
			consume();
			return parseFracAtom();
		}
		if (t.k === "op" && t.v === "√") {
			consume();
			return {
				type: "sqrt",
				expr: parseFracAtom()
			};
		}
		return parsePowBody();
	}
	function parsePowBody() {
		const base = parsePostfix();
		if (takeOp("^")) return {
			type: "pow",
			base,
			exp: parseFracAtom()
		};
		return base;
	}
	function parsePostfix() {
		let e = parsePrimary();
		while (takeOp("%")) e = {
			type: "pct",
			expr: e
		};
		return e;
	}
	function parseMixedPart() {
		if (peek().k === "lp") return parsePrimary();
		if (peek().k !== "num") throw new CalcError("又 後面要接分數，例如 2又1/3");
		const numTok = consume();
		if (numTok.k !== "num") throw new CalcError("又 後面要接分數，例如 2又1/3");
		const num = {
			type: "num",
			raw: numTok.v,
			frac: decimalToFrac(numTok.v)
		};
		if (takeOp("/")) {
			if (peek().k !== "num") throw new CalcError("分數的分母要是數字");
			const denTok = consume();
			if (denTok.k !== "num") throw new CalcError("分數的分母要是數字");
			return {
				type: "bin",
				op: "/",
				left: num,
				right: {
					type: "num",
					raw: denTok.v,
					frac: decimalToFrac(denTok.v)
				}
			};
		}
		return num;
	}
	function parsePrimary() {
		const t = peek();
		if (t.k === "num") {
			consume();
			const num = {
				type: "num",
				raw: t.v,
				frac: decimalToFrac(t.v)
			};
			if (takeOp("又")) return {
				type: "mixed",
				whole: num,
				part: parseMixedPart()
			};
			return num;
		}
		if (t.k === "lp") {
			consume();
			const inner = parseExpression();
			if (peek().k !== "rp") throw new CalcError("少了右括號 )");
			consume();
			return {
				type: "group",
				expr: inner
			};
		}
		if (t.k === "end") throw new CalcError("算式還沒寫完");
		const label = t.k === "op" ? t.v : t.k === "rp" ? ")" : "";
		throw new CalcError(label ? `這裡不該出現「${label}」` : "算式還沒寫完");
	}
	const ast = parseExpression();
	if (peek().k !== "end") throw new CalcError("算式還沒寫完，或多了一個符號");
	return ast;
}
function precOf(e) {
	switch (e.type) {
		case "bin":
			if (e.op === "+" || e.op === "-") return 1;
			if (e.op === "*" || e.op === "÷") return 2;
			return 3;
		case "neg":
		case "sqrt": return 4;
		case "pow": return 5;
		case "pct": return 6;
		default: return 7;
	}
}
function wrap(e, minPrec, side) {
	const p = precOf(e);
	if (p < minPrec || side === "r" && p === minPrec && e.type === "bin") return [
		T("("),
		...pretty(e),
		T(")")
	];
	return pretty(e);
}
function slot(e) {
	if (e.type === "group") return pretty(e.expr);
	return pretty(e);
}
function simpleSup(e) {
	if (e.type === "num" && !e.raw.includes(".")) return e.raw;
	if (e.type === "neg" && e.expr.type === "num" && !e.expr.raw.includes(".")) return `−${e.expr.raw}`;
	return null;
}
function pretty(e) {
	switch (e.type) {
		case "num": return [T(e.raw)];
		case "group": return [
			T("("),
			...pretty(e.expr),
			T(")")
		];
		case "neg": return [T("−"), ...wrap(e.expr, 4, "r")];
		case "sqrt": {
			const inner = e.expr;
			if (inner.type === "num" || inner.type === "bin" && inner.op === "/") return [T("√"), ...pretty(inner)];
			if (inner.type === "group" && inner.expr.type === "bin" && inner.expr.op === "/") return [T("√"), ...pretty(inner.expr)];
			if (inner.type === "group") return [
				T("√("),
				...pretty(inner.expr),
				T(")")
			];
			return [
				T("√("),
				...pretty(inner),
				T(")")
			];
		}
		case "pct": return [...wrap(e.expr, 6, "l"), T("%")];
		case "pow": {
			const sup = simpleSup(e.exp);
			const base = wrap(e.base, 5, "l");
			if (sup !== null) return [...base, {
				k: "sup",
				v: sup
			}];
			return [
				...base,
				T("^("),
				...pretty(e.exp),
				T(")")
			];
		}
		case "mixed": return [
			...pretty(e.whole),
			T("又"),
			...pretty(e.part)
		];
		case "bin":
			if (e.op === "/") return [{
				k: "f",
				num: slot(e.left),
				den: slot(e.right)
			}];
			{
				const sym = e.op === "+" ? " + " : e.op === "-" ? " − " : e.op === "*" ? " × " : " ÷ ";
				const p = precOf(e);
				return [
					...wrap(e.left, p, "l"),
					T(sym),
					...wrap(e.right, p, "r")
				];
			}
		default: return [];
	}
}
function finishReduce(steps, raw) {
	const norm = normalize(raw.n, raw.d);
	const g = gcd(norm.n, norm.d);
	const value = {
		n: norm.n / g,
		d: norm.d / g
	};
	if (g > 1n) steps.push({
		title: "約分",
		lines: [[
			T("最大公因數是 "),
			T(g.toString()),
			T("，分子分母一起除")
		], [
			...F(norm, "bar"),
			T(" = "),
			...F(value, "auto")
		]]
	});
	return {
		value,
		steps
	};
}
function addSub(a, b, op) {
	const A = simplify(a);
	const B = simplify(b);
	const sym = op === "+" ? " + " : " − ";
	if (A.d === 1n && B.d === 1n) {
		const n = op === "+" ? A.n + B.n : A.n - B.n;
		return {
			value: {
				n,
				d: 1n
			},
			steps: [{
				title: op === "+" ? "整數相加" : "整數相減",
				lines: [[
					T(fmtInt(A.n)),
					T(sym),
					T(fmtInt(B.n)),
					T(" = "),
					T(fmtInt(n))
				]]
			}]
		};
	}
	const m = lcm(A.d, B.d);
	const a2 = {
		n: A.n * (m / A.d),
		d: m
	};
	const b2 = {
		n: B.n * (m / B.d),
		d: m
	};
	const raw = normalize(op === "+" ? a2.n + b2.n : a2.n - b2.n, m);
	const steps = [];
	if (A.d !== B.d) {
		const lines = [[
			T("分母 "),
			T(A.d.toString()),
			T(" 和 "),
			T(B.d.toString()),
			T(" 的最小公倍數是 "),
			T(m.toString())
		]];
		if (A.d !== m) lines.push([
			...F(A, "auto"),
			T(" = "),
			...F(a2, "bar")
		]);
		if (B.d !== m) lines.push([
			...F(B, "auto"),
			T(" = "),
			...F(b2, "bar")
		]);
		steps.push({
			title: "通分",
			lines
		});
	}
	steps.push({
		title: A.d === B.d ? op === "+" ? "分母相同，分子相加" : "分母相同，分子相減" : op === "+" ? "分子相加" : "分子相減",
		lines: [[
			...F(a2, "bar"),
			T(sym),
			...FP(b2, "bar"),
			T(" = "),
			...F(raw, "bar")
		]]
	});
	return finishReduce(steps, raw);
}
function multiply(a, b) {
	const A = simplify(a);
	const B = simplify(b);
	if (A.d === 1n && B.d === 1n) {
		const n = A.n * B.n;
		return {
			value: {
				n,
				d: 1n
			},
			steps: [{
				title: "整數相乘",
				lines: [[
					T(fmtInt(A.n)),
					T(" × "),
					T(fmtInt(B.n)),
					T(" = "),
					T(fmtInt(n))
				]]
			}]
		};
	}
	if (A.d === 1n || B.d === 1n) {
		const raw = normalize(A.n * B.n, A.d * B.d);
		return finishReduce([{
			title: "整數乘分數，乘到分子上",
			lines: [[
				...F(A, "auto"),
				T(" × "),
				...FP(B, "auto"),
				T(" = "),
				...F(raw, "bar")
			]]
		}], raw);
	}
	let an = A.n;
	let ad = A.d;
	let bn = B.n;
	let bd = B.d;
	const g1 = gcd(an, bd);
	const g2 = gcd(bn, ad);
	const steps = [];
	if (g1 > 1n || g2 > 1n) {
		const an2 = an / g1;
		const bd2 = bd / g1;
		const bn2 = bn / g2;
		const ad2 = ad / g2;
		const note = [T("公因數 ")];
		if (g1 > 1n) note.push(T(g1.toString()));
		if (g1 > 1n && g2 > 1n) note.push(T("、"));
		if (g2 > 1n) note.push(T(g2.toString()));
		note.push(T(" 先約掉"));
		steps.push({
			title: "交叉約分",
			lines: [
				[
					...F(A, "auto"),
					T(" × "),
					...FP(B, "auto")
				],
				note,
				[
					...F({
						n: an2,
						d: ad2
					}, "bar"),
					T(" × "),
					...FP({
						n: bn2,
						d: bd2
					}, "bar")
				]
			]
		});
		an = an2;
		ad = ad2;
		bn = bn2;
		bd = bd2;
	}
	const raw = normalize(an * bn, ad * bd);
	steps.push({
		title: "分子分母各自相乘",
		lines: [[
			...F({
				n: an,
				d: ad
			}, "bar"),
			T(" × "),
			...FP({
				n: bn,
				d: bd
			}, "bar"),
			T(" = "),
			...F(raw, "bar")
		]]
	});
	return finishReduce(steps, raw);
}
function divide(a, b, op) {
	const A = simplify(a);
	const B = simplify(b);
	if (B.n === 0n) throw new CalcError("除數不能是 0");
	if (A.d === 1n && B.d === 1n) {
		const raw = normalize(A.n, B.n);
		const value = simplify(raw);
		if (!(value.n !== raw.n || value.d !== raw.d) && op === "/") return {
			value,
			steps: []
		};
		const sym = op === "/" ? " / " : " ÷ ";
		return finishReduce([{
			title: "整數相除，寫成分數",
			lines: [[
				T(fmtInt(A.n)),
				T(sym),
				T(fmtInt(B.n)),
				T(" = "),
				...F(raw, "bar")
			]]
		}], raw);
	}
	const recip = simplify(normalize(B.d, B.n));
	const intro = {
		title: "除法改成乘上倒數",
		lines: [[
			...F(A, "auto"),
			T(" ÷ "),
			...FP(B, "auto"),
			T(" = "),
			...F(A, "auto"),
			T(" × "),
			...FP(recip, "auto")
		]]
	};
	const prod = multiply(A, recip);
	return {
		value: prod.value,
		steps: [intro, ...prod.steps]
	};
}
function power(base, exp) {
	const B = simplify(base);
	const E = simplify(exp);
	if (E.d !== 1n) throw new CalcError("次方只支援整數，例如 (3/2)^2");
	const e = E.n;
	if (e > 100n || e < -100n) throw new CalcError("次方請介在 −100 到 100");
	if (e === 0n) {
		if (B.n === 0n) throw new CalcError("0 的 0 次方沒有定義");
		return {
			value: {
				n: 1n,
				d: 1n
			},
			steps: [{
				title: "0 次方",
				lines: [[...F(B, "auto"), T(" 的 0 次方是 1")]]
			}]
		};
	}
	const steps = [];
	let target = B;
	let p = e;
	if (e < 0n) {
		if (B.n === 0n) throw new CalcError("0 不能取負次方");
		const inv = simplify(normalize(B.d, B.n));
		steps.push({
			title: "負次方是倒數",
			lines: [[
				...F(B, "auto"),
				{
					k: "sup",
					v: fmtInt(e)
				},
				T(" = "),
				...F(inv, "auto"),
				{
					k: "sup",
					v: (-e).toString()
				}
			]]
		});
		target = inv;
		p = -e;
	}
	if (p === 1n) {
		if (steps.length === 0) return {
			value: target,
			steps: [{
				title: "1 次方",
				lines: [[...F(target, "auto"), T(" 的 1 次方還是自己")]]
			}]
		};
		return {
			value: target,
			steps
		};
	}
	const raw = normalize(target.n ** p, target.d ** p);
	steps.push({
		title: "乘開次方",
		lines: [[
			...F(target, "auto"),
			{
				k: "sup",
				v: p.toString()
			},
			T(" = "),
			...F(raw, "bar")
		]]
	});
	return finishReduce(steps, raw);
}
function squareRoot(v) {
	const A = simplify(v);
	if (A.n < 0n) throw new CalcError("負數不能開平方根");
	const sn = isqrt$1(A.n);
	const sd = isqrt$1(A.d);
	if (sn === null || sd === null) throw new CalcError("這個平方根開不盡，沒辦法寫成準確分數。試試 √(9/4)");
	const value = simplify({
		n: sn,
		d: sd
	});
	return {
		value,
		steps: [{
			title: "開平方",
			lines: [[
				T("√"),
				...F(A, "auto"),
				T(" = "),
				...F(value, "auto")
			]]
		}]
	};
}
function percent(v) {
	const A = simplify(v);
	const raw = normalize(A.n, A.d * 100n);
	return finishReduce([{
		title: "百分號就是除以 100",
		lines: [[
			...F(A, "auto"),
			T("% = "),
			...F(raw, "bar")
		]]
	}], raw);
}
function negate(v) {
	const A = simplify(v);
	const value = simplify({
		n: -A.n,
		d: A.d
	});
	return {
		value,
		steps: [{
			title: A.n < 0n ? "負負得正" : "加上負號",
			lines: [[
				T("−("),
				...F(A, "auto"),
				T(") = "),
				...F(value, "auto")
			]]
		}]
	};
}
function evalNum(e) {
	const value = simplify(e.frac);
	if (!e.raw.includes(".")) return {
		value,
		steps: []
	};
	const places = e.raw.split(".")[1]?.length ?? 0;
	if (places === 0) return {
		value,
		steps: []
	};
	const shown = normalize(e.frac.n, e.frac.d);
	return finishReduce([{
		title: "小數化成分數",
		lines: [[
			T(e.raw),
			T(" 小數點後有 "),
			T(String(places)),
			T(places === 1 ? " 位，分母是 10" : ` 位，分母是 1 後面 ${places} 個 0`)
		], [
			T(e.raw),
			T(" = "),
			...F(shown, "bar")
		]]
	}], shown);
}
function evalMixed(e, whole, part) {
	if (whole.value.d !== 1n) throw new CalcError("又 的前面要是整數");
	if (whole.value.n < 0n) throw new CalcError("負的帶分數請把負號寫在最前面，例如 −2又1/3");
	const w = whole.value.n;
	const p = simplify(part.value);
	if (p.n < 0n) throw new CalcError("又 後面請用正的分數");
	const asFrac = {
		n: w * p.d,
		d: p.d
	};
	const raw = normalize(asFrac.n + p.n, p.d);
	return finishReduce([
		...whole.steps,
		...part.steps,
		{
			title: "帶分數化成假分數",
			lines: [[
				T(w.toString()),
				T("又"),
				...F(p, "auto"),
				T(" = "),
				T(w.toString()),
				T(" + "),
				...F(p, "auto")
			], [
				...F(asFrac, "bar"),
				T(" + "),
				...F(p, "bar"),
				T(" = "),
				...F(raw, "bar")
			]]
		}
	], raw);
}
function evaluate(e) {
	switch (e.type) {
		case "num": return evalNum(e);
		case "group": {
			const inner = evaluate(e.expr);
			if (inner.steps.length === 0) return inner;
			return {
				value: inner.value,
				steps: [{
					title: "先算括號",
					lines: [pretty(e.expr)]
				}, ...inner.steps]
			};
		}
		case "neg": {
			const inner = evaluate(e.expr);
			const n = negate(inner.value);
			return {
				value: n.value,
				steps: [...inner.steps, ...n.steps]
			};
		}
		case "pct": {
			const inner = evaluate(e.expr);
			const n = percent(inner.value);
			return {
				value: n.value,
				steps: [...inner.steps, ...n.steps]
			};
		}
		case "sqrt": {
			const inner = evaluate(e.expr);
			const n = squareRoot(inner.value);
			return {
				value: n.value,
				steps: [...inner.steps, ...n.steps]
			};
		}
		case "pow": {
			const base = evaluate(e.base);
			const exp = evaluate(e.exp);
			const n = power(base.value, exp.value);
			return {
				value: n.value,
				steps: [
					...base.steps,
					...exp.steps,
					...n.steps
				]
			};
		}
		case "mixed": return evalMixed(e, evaluate(e.whole), evaluate(e.part));
		case "bin": {
			const left = evaluate(e.left);
			const right = evaluate(e.right);
			const pre = e.paired ? [{
				title: "連寫的四段分數",
				lines: [[T("四個數字用斜線連寫，先切成兩個分數，再相除")], pretty(e)]
			}] : [];
			const op = e.op === "+" ? addSub(left.value, right.value, "+") : e.op === "-" ? addSub(left.value, right.value, "-") : e.op === "*" ? multiply(left.value, right.value) : divide(left.value, right.value, e.op === "÷" ? "÷" : "/");
			return {
				value: op.value,
				steps: [
					...pre,
					...left.steps,
					...right.steps,
					...op.steps
				]
			};
		}
		default: throw new CalcError("沒辦法計算這個式子");
	}
}
function decimalLine(info) {
	if (!info.nonRepeat && !info.repeat) return [T("小數正好是 "), {
		k: "dec",
		info
	}];
	if (info.repeat) return [T("小數會循環，橫線是循環節 "), {
		k: "dec",
		info
	}];
	if (info.truncated) return [T("小數很長，先寫到這裡 "), {
		k: "dec",
		info
	}];
	return [T("小數正好是 "), {
		k: "dec",
		info
	}];
}
function solve(input) {
	const ast = parse(input);
	const ev = evaluate(ast);
	const result = simplify(ev.value);
	const decimal = toDecimal(result);
	const mixed = toMixed(result);
	const view = pretty(ast);
	const lines = [[T("最簡分數是 "), ...F(result, "auto")]];
	if (mixed) lines.push([
		T("帶分數是 "),
		T(mixed.neg ? "−" : ""),
		T(mixed.whole),
		T("又"),
		{
			k: "f",
			num: [T(mixed.n)],
			den: [T(mixed.d)]
		}
	]);
	lines.push(decimalLine(decimal));
	return {
		input,
		steps: [
			{
				title: "原式",
				lines: [view]
			},
			...ev.steps,
			{
				title: "結果",
				lines
			}
		],
		result,
		decimal,
		mixed,
		linear: linear(result),
		pretty: view
	};
}
function tryPretty(input) {
	try {
		return pretty(parse(input));
	} catch {
		return null;
	}
}
var STARTER = "1/2 + 1/3";
var CALC_STARTER = "x^3 + 2x";
var HISTORY_KEY = "xisuan.history.v2";
var FRAC_EXAMPLES = [
	"1/2 + 1/3",
	"2/3÷4/5",
	"2/3/4/5",
	"2又1/3",
	"0.1 + 0.2",
	"(1/2)^3",
	"50% + 1/4",
	"√(9/4)"
];
var CALC_EXAMPLES = [
	"x^3 + 2x",
	"sin(2x)",
	"x sin x",
	"e^x",
	"ln x",
	"1/(1+x^2)",
	"(2x+1)^3"
];
var CALC_CHIPS = [
	{
		label: "x",
		insert: "x"
	},
	{
		label: "π",
		insert: "π"
	},
	{
		label: "eˣ",
		insert: "e^("
	},
	{
		label: "sin",
		insert: "sin("
	},
	{
		label: "cos",
		insert: "cos("
	},
	{
		label: "tan",
		insert: "tan("
	},
	{
		label: "ln",
		insert: "ln("
	},
	{
		label: "√",
		insert: "√("
	},
	{
		label: "arctan",
		insert: "arctan("
	}
];
var KEYS = [
	[
		{
			label: "C",
			action: "clear",
			tone: "util"
		},
		{
			label: "(",
			insert: "(",
			tone: "util"
		},
		{
			label: ")",
			insert: ")",
			tone: "util"
		},
		{
			label: "⌫",
			action: "back",
			tone: "util"
		}
	],
	[
		{
			label: "7",
			insert: "7",
			tone: "num"
		},
		{
			label: "8",
			insert: "8",
			tone: "num"
		},
		{
			label: "9",
			insert: "9",
			tone: "num"
		},
		{
			label: "÷",
			insert: "÷",
			tone: "op"
		}
	],
	[
		{
			label: "4",
			insert: "4",
			tone: "num"
		},
		{
			label: "5",
			insert: "5",
			tone: "num"
		},
		{
			label: "6",
			insert: "6",
			tone: "num"
		},
		{
			label: "×",
			insert: "×",
			tone: "op"
		}
	],
	[
		{
			label: "1",
			insert: "1",
			tone: "num"
		},
		{
			label: "2",
			insert: "2",
			tone: "num"
		},
		{
			label: "3",
			insert: "3",
			tone: "num"
		},
		{
			label: "−",
			insert: "-",
			tone: "op"
		}
	],
	[
		{
			label: "0",
			insert: "0",
			tone: "num"
		},
		{
			label: ".",
			insert: ".",
			tone: "num"
		},
		{
			label: "/",
			insert: "/",
			tone: "num"
		},
		{
			label: "+",
			insert: "+",
			tone: "op"
		}
	],
	[
		{
			label: "又",
			insert: "又",
			tone: "util"
		},
		{
			label: "√",
			insert: "√",
			tone: "util"
		},
		{
			label: "%",
			insert: "%",
			tone: "util"
		},
		{
			label: "=",
			action: "eq",
			tone: "eq"
		}
	]
];
var CALC_KEYS = [
	[
		{
			label: "C",
			action: "clear",
			tone: "util"
		},
		{
			label: "(",
			insert: "(",
			tone: "util"
		},
		{
			label: ")",
			insert: ")",
			tone: "util"
		},
		{
			label: "⌫",
			action: "back",
			tone: "util"
		}
	],
	[
		{
			label: "7",
			insert: "7",
			tone: "num"
		},
		{
			label: "8",
			insert: "8",
			tone: "num"
		},
		{
			label: "9",
			insert: "9",
			tone: "num"
		},
		{
			label: "÷",
			insert: "÷",
			tone: "op"
		}
	],
	[
		{
			label: "4",
			insert: "4",
			tone: "num"
		},
		{
			label: "5",
			insert: "5",
			tone: "num"
		},
		{
			label: "6",
			insert: "6",
			tone: "num"
		},
		{
			label: "×",
			insert: "×",
			tone: "op"
		}
	],
	[
		{
			label: "1",
			insert: "1",
			tone: "num"
		},
		{
			label: "2",
			insert: "2",
			tone: "num"
		},
		{
			label: "3",
			insert: "3",
			tone: "num"
		},
		{
			label: "−",
			insert: "-",
			tone: "op"
		}
	],
	[
		{
			label: "0",
			insert: "0",
			tone: "num"
		},
		{
			label: ".",
			insert: ".",
			tone: "num"
		},
		{
			label: "^",
			insert: "^",
			tone: "num"
		},
		{
			label: "+",
			insert: "+",
			tone: "op"
		}
	]
];
var toneClass = {
	num: "bg-key text-fg border-line",
	util: "bg-key text-muted border-line",
	op: "bg-fg text-surface border-fg",
	eq: "bg-accent text-accent-fg border-accent"
};
function readHistory() {
	try {
		const raw = localStorage.getItem(HISTORY_KEY);
		if (!raw) return [];
		const data = JSON.parse(raw);
		if (!Array.isArray(data)) return [];
		return data.filter((item) => !!item && typeof item === "object" && typeof item.expr === "string" && typeof item.linear === "string");
	} catch {
		return [];
	}
}
function Calculator() {
	const inputRef = (0, import_react.useRef)(null);
	const [mode, setMode] = (0, import_react.useState)("calc");
	const [op, setOp] = (0, import_react.useState)("diff");
	const [value, setValue] = (0, import_react.useState)(CALC_STARTER);
	const [caret, setCaret] = (0, import_react.useState)(8);
	const [selEnd, setSelEnd] = (0, import_react.useState)(8);
	const [solved, setSolved] = (0, import_react.useState)(null);
	const [calcSolved, setCalcSolved] = (0, import_react.useState)(() => {
		try {
			return solveCalculus(CALC_STARTER, "diff");
		} catch {
			return null;
		}
	});
	const [error, setError] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [histOpen, setHistOpen] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const preview = (0, import_react.useMemo)(() => mode === "calc" ? tryPrettyCalc(value) : tryPretty(value), [mode, value]);
	const showing = mode === "frac" && solved && solved.input === value ? solved : null;
	const showingCalc = mode === "calc" && calcSolved && calcSolved.input === value && calcSolved.op === op ? calcSolved : null;
	const steps = showingCalc?.steps ?? showing?.steps ?? null;
	const examples = mode === "calc" ? CALC_EXAMPLES : FRAC_EXAMPLES;
	const keys = mode === "calc" ? CALC_KEYS : KEYS;
	(0, import_react.useEffect)(() => {
		setHistory(readHistory());
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
	}, [history, hydrated]);
	function range() {
		const el = inputRef.current;
		if (el && document.activeElement === el && el.selectionStart !== null && el.selectionEnd !== null) return [el.selectionStart, el.selectionEnd];
		return [Math.min(caret, selEnd), Math.max(caret, selEnd)];
	}
	function syncCaret(el) {
		setCaret(el.selectionStart ?? value.length);
		setSelEnd(el.selectionEnd ?? value.length);
	}
	function remember(next, pos) {
		setValue(next);
		setCaret(pos);
		setSelEnd(pos);
		setError(null);
		setCopied(false);
		requestAnimationFrame(() => {
			const el = inputRef.current;
			if (!el || document.activeElement !== el) return;
			el.setSelectionRange(pos, pos);
		});
	}
	function insert(text) {
		const [start, end] = range();
		remember(value.slice(0, start) + text + value.slice(end), start + text.length);
	}
	function backspace() {
		const [start, end] = range();
		if (start !== end) {
			remember(value.slice(0, start) + value.slice(end), start);
			return;
		}
		if (start === 0) return;
		remember(value.slice(0, start - 1) + value.slice(end), start - 1);
	}
	function clearAll() {
		remember("", 0);
	}
	function pushHistory(expr, linear, itemMode, itemOp) {
		setHistory((prev) => [{
			expr,
			linear,
			at: Date.now(),
			mode: itemMode,
			op: itemOp
		}, ...prev.filter((item) => item.expr !== expr || item.mode !== itemMode || item.op !== itemOp)].slice(0, 12));
	}
	function calculateFrac(expr) {
		try {
			const next = solve(expr);
			setSolved(next);
			setError(null);
			setCopied(false);
			pushHistory(next.input, next.linear, "frac");
		} catch (err) {
			if (/[a-zπ∫]/i.test(expr)) {
				setError("這是微積分的式子，先點上面的「微積分」。");
				return;
			}
			setError(err instanceof CalcError ? err.message : "沒辦法計算這個式子");
		}
	}
	function calculateCalc(expr, nextOp = op) {
		try {
			const next = solveCalculus(expr, nextOp);
			setOp(nextOp);
			setCalcSolved(next);
			setError(null);
			setCopied(false);
			pushHistory(next.input, next.linear, "calc", nextOp);
		} catch (err) {
			setError(err instanceof CalcError ? err.message : "沒辦法計算這個式子");
		}
	}
	function calculate(expr = value) {
		if (mode === "calc") calculateCalc(expr, op);
		else calculateFrac(expr);
	}
	function loadExpr(expr, itemMode = mode, itemOp = op) {
		setMode(itemMode);
		setOp(itemOp);
		setValue(expr);
		setCaret(expr.length);
		setSelEnd(expr.length);
		setHistOpen(false);
		setError(null);
		if (itemMode === "calc") calculateCalc(expr, itemOp);
		else calculateFrac(expr);
	}
	function switchMode(next) {
		if (next === mode) return;
		setMode(next);
		setError(null);
		setCopied(false);
		if (next === "calc" && (value === STARTER || value.trim() === "")) {
			loadExpr(CALC_STARTER, "calc", "diff");
			return;
		}
		if (next === "frac" && (value === CALC_STARTER || value.trim() === "")) loadExpr(STARTER, "frac");
	}
	async function copyAnswer() {
		const linear = showingCalc?.linear ?? showing?.linear;
		if (!linear) return;
		try {
			await navigator.clipboard.writeText(linear);
			setCopied(true);
		} catch {
			setError("沒辦法複製，答案是 " + linear);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh overflow-hidden bg-surface text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-1 shrink-0 bg-accent",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "contents lg:flex lg:h-dvh lg:w-96 lg:shrink-0 lg:flex-col lg:border-r lg:border-line",
				onSubmit: (event) => {
					event.preventDefault();
					if (mode === "calc") calculateCalc(value, "diff");
					else calculate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "order-1 px-4 pt-4 pb-2 lg:px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-serif text-3xl leading-none",
								children: "析算"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: mode === "calc" ? "對 x 微分或積分，按下去看過程" : "分數計算機，按等於看過程"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "最近算過",
								"aria-pressed": histOpen,
								onClick: () => setHistOpen((open) => !open),
								className: "flex size-11 items-center justify-center rounded-full border border-line bg-key text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
									className: "size-5",
									"aria-hidden": true
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 rounded-full border border-line bg-key p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": mode === "frac",
								onClick: () => switchMode("frac"),
								className: `h-11 rounded-full ${mode === "frac" ? "bg-fg text-surface" : "text-muted"}`,
								children: "分數"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": mode === "calc",
								onClick: () => switchMode("calc"),
								className: `h-11 rounded-full ${mode === "calc" ? "bg-fg text-surface" : "text-muted"}`,
								children: "微積分"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "order-2 min-w-0 px-4 lg:px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm text-muted",
								htmlFor: "expr",
								children: "算式"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "expr",
									ref: inputRef,
									value,
									placeholder: mode === "calc" ? "例如 x^3 + 2x" : "例如 1/2 + 1/3",
									autoCapitalize: "off",
									autoCorrect: "off",
									spellCheck: false,
									enterKeyHint: "done",
									onChange: (event) => {
										setValue(event.target.value);
										syncCaret(event.target);
										setError(null);
										setCopied(false);
									},
									onSelect: (event) => syncCaret(event.currentTarget),
									className: "h-12 min-w-0 flex-1 rounded-xl border border-line bg-key px-3 font-serif text-xl tabular-nums text-fg outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "h-12 shrink-0 rounded-xl bg-accent px-4 font-medium text-accent-fg",
									children: mode === "calc" ? "微分" : "計算"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex gap-2 overflow-x-auto pb-1",
								children: examples.map((example) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => loadExpr(example),
									className: "min-h-11 shrink-0 rounded-full border border-line bg-key px-3 font-serif text-sm text-fg",
									children: example
								}, example))
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "pb-2 text-sm text-accent",
								children: error
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "order-3 min-w-0 px-4 py-3 lg:px-5",
						"aria-live": "polite",
						children: showingCalc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: showingCalc.headline
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathLine, {
										pieces: showingCalc.answer,
										size: showingCalc.linear.length > 24 ? "md" : "lg"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: copyAnswer,
								className: "shrink-0 text-sm text-accent",
								children: copied ? "已複製" : "複製答案"
							})]
						}) : showing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "最簡分數"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 overflow-x-auto",
									children: showing.result.d === 1n ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-serif text-4xl tabular-nums",
										children: [showing.result.n < 0n ? "−" : "", (showing.result.n < 0n ? -showing.result.n : showing.result.n).toString()]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center font-serif text-4xl",
										children: [showing.result.n < 0n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mr-1",
											children: "−"
										}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-grid justify-items-center leading-none",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-2",
													children: (showing.result.n < 0n ? -showing.result.n : showing.result.n).toString()
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-full bg-fg" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-2",
													children: showing.result.d.toString()
												})
											]
										})]
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shrink-0 text-right",
								children: [
									showing.mixed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-serif text-lg",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mr-1 text-sm text-muted",
												children: "帶分數"
											}),
											showing.mixed.neg ? "−" : "",
											showing.mixed.whole,
											"又",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-grid justify-items-center align-middle text-base leading-none",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "px-1",
														children: showing.mixed.n
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-full bg-fg" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "px-1",
														children: showing.mixed.d
													})
												]
											})
										]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecimalText, { info: showing.decimal })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: copyAnswer,
										className: "mt-1 text-sm text-accent",
										children: copied ? "已複製" : "複製答案"
									})
								]
							})]
						}) : preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: mode === "calc" ? "式子" : "分數寫法"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathLine, {
								pieces: preview,
								size: "lg"
							})
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: mode === "calc" ? "輸入含 x 的式子，按微分或積分。" : "輸入算式後，按等於或計算，過程會寫在下面。"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pad-safe order-5 min-w-0 px-4 pt-1 lg:px-5",
						children: [mode === "calc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 flex gap-2 overflow-x-auto",
							children: CALC_CHIPS.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => insert(chip.insert),
								className: "min-h-11 shrink-0 rounded-full border border-line bg-key px-3 font-serif text-sm text-fg",
								children: chip.label
							}, chip.label))
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-4 gap-2",
							children: [keys.flat().map((key) => {
								const name = "insert" in key ? key.insert : key.action;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "action" in key && key.action === "eq" ? "submit" : "button",
									"aria-label": key.label === "⌫" ? "退格" : key.label === "C" ? "清除" : key.label,
									onClick: () => {
										if ("action" in key) {
											if (key.action === "clear") clearAll();
											if (key.action === "back") backspace();
											return;
										}
										insert(key.insert);
									},
									className: `h-12 rounded-xl border font-serif text-xl ${toneClass[key.tone]}`,
									children: key.label
								}, key.label + name);
							}), mode === "calc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: `col-span-2 h-12 rounded-xl border font-serif text-lg ${toneClass.eq}`,
								children: "微分"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => calculateCalc(value, "int"),
								className: "col-span-2 h-12 rounded-xl border border-fg bg-fg font-serif text-lg text-surface",
								children: "積分"
							})] }) : null]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "order-4 min-h-0 flex-1 overflow-y-auto border-t border-line lg:order-none lg:h-dvh lg:border-t-0",
				children: [histOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-line px-4 py-3 lg:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm text-muted",
							children: "最近算過"
						}), history.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setHistory([]),
							className: "text-sm text-accent",
							children: "清除紀錄"
						}) : null]
					}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty",
						children: "還沒有紀錄。按過計算的式子會留在這台裝置上。"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-t border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => loadExpr(item.expr, item.mode ?? "frac", item.op ?? "diff"),
							className: "flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-serif",
								children: item.expr
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 font-serif text-accent",
								children: item.linear
							})]
						})
					}, `${item.at}-${item.expr}`)) })]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-3 lg:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "解題過程"
					}), steps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2",
						children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 border-b border-line py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 shrink-0 font-serif text-lg text-accent",
								children: index + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: step.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 space-y-1 overflow-x-auto",
									children: step.lines.map((line, lineIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathLine, {
										pieces: line,
										size: "sm"
									}, lineIndex))
								})]
							})]
						}, `${step.title}-${index}`))
					}) : mode === "calc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-md text-pretty text-base leading-relaxed",
						children: ["按「微分」或「積分」，這裡會寫出冪次、乘積、連鎖，或湊微分。", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-sm text-muted",
							children: "變數用 x。可以寫 sin、cos、tan、ln、e^x、arctan。積分會加上 C，並把答案微分回去驗算。"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-md text-pretty text-base leading-relaxed",
						children: [
							"按 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif",
								children: "＝"
							}),
							" 或「計算」，這裡會一步一步寫出通分、約分和結果。",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block text-sm text-muted",
								children: "/ 是分數線，÷ 是除法。2/3/4/5 會先看成兩個分數再相除。帶分數寫 2又1/3。"
							})
						]
					})]
				})]
			})]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {});
}
//#endregion
export { Home as component };
