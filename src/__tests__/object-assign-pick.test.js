const { assignPick, toM } = require("../object-assign-pick");

[
  { target: {}, model: { a: null }, sources: [{}], expected: {} },
  {
    target: {},
    model: { a: null, b: null },
    sources: [{ a: [1, 2, 3], b: 2 }],
    expected: { a: [1, 2, 3], b:2 },
  },
  {
    target: {},
    model: { a: null },
    sources: [{ a: [1, 2, 3], b: 2 }],
    expected: { a: [1, 2, 3] },
  },
  {
    target: {},
    model: { a: null },
    sources: [{ a: 1, b: 2 }, { b: 2 }, { a: 3 }, { b: 4 }, { a: 5 }],
    expected: { a: 5 },
  },
  {
    target: {},
    model: { a: { b: null } },
    sources: [{ a: { b: 2, c: 3 }, d: 4 }],
    expected: { a: { b: 2 } },
  },
  {
    target: { c: 1 },
    model: { a: null },
    sources: [{ a: 1, b: 2 }],
    expected: { a: 1, c: 1 },
  },
  {
    target: { c: 1 },
    model: { a: { b: null } },
    sources: [{}, { a: "foo" }, { a: { b: "bar" } }],
    expected: { a: { b: "bar" }, c: 1 },
  },
  {
    target: { c: 1 },
    model: { a: { b: null } },
    sources: [{}, { a: "foo" }],
    expected: { c: 1 },
  },
  { target: {}, model: { a: null }, sources: [{ a: {} }], expected: { a: {} } },
  {
    target: {},
    model: { a: { b: null } },
    sources: [{ a: { b: {} } }],
    expected: { a: { b: {} } },
  },
].forEach((tc, idx) => {
  test(`Pick[${idx}] ${JSON.stringify(tc.model)} from ${JSON.stringify(
    tc.sources
  )}`, () => {
    const actual = assignPick(tc);
    expect(actual).toStrictEqual(tc.expected);
  });
});

[
  { obj: { a: 1 }, expected: { a: null } },
  {
    obj: { a: { b: { c: undefined }, d: null }, f: () => "foo" },
    expected: { a: { b: { c: null }, d: null }, f: null },
  },
].forEach((tc, idx) => {
  test(`Convert[${idx}] ${JSON.stringify(tc.obj)} to model`, () => {
    const actual = toM(tc.obj);
    expect(actual).toStrictEqual(tc.expected);
  });
});

test("Deduce model from target when model is omitted", () => {
  expect(
    assignPick({
      target: { a: null },
      sources: [{ a: 1 }],
    })
  ).toStrictEqual({
    a: 1,
  });
});

test("No need to make an array when there's only one source", () => {
  expect(
    assignPick({
      target: { a: null },
      sources: { a: 1 },
    })
  ).toStrictEqual({ a: 1 });
});

test("Source can be empty array", () => {
  expect(
    assignPick({
      target: {},
      model: { a: null },
      sources: [],
    })
  ).toStrictEqual({});
});

test("Source can be null", () => {
  expect(
    assignPick({
      target: {},
      model: { a: null },
      sources: null,
    })
  ).toStrictEqual({});
});

test("Source can be undefined", () => {
  expect(
    assignPick({
      target: {},
      model: { a: null },
      sources: undefined,
    })
  ).toStrictEqual({});
});

test("Able to pick function", () => {
  let func = () => "foo";
  expect(
    assignPick({
      target: {},
      model: { f: null },
      sources: { f: func },
    })
  ).toStrictEqual({
    f: func,
  });
});
