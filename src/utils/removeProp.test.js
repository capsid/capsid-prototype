import removeProp from "./removeProp";

it("removes a property from a simple object", () => {
  expect(removeProp({ remove: 1, a: 2 }, "remove")).toEqual({ a: 2 });
});

it("removes a nested property", () => {
  expect(removeProp({ a: { remove: 1 } }, "remove")).toEqual({
    a: {}
  });
});

it("can handle arrays", () => {
  expect(
    removeProp({ a: [1, 2, { remove: 1 }], b: { c: 1, remove: 2 } }, "remove")
  ).toEqual({ a: [1, 2, {}], b: { c: 1 } });
});

it("can handle the ES query that this was built for", () => {
  expect(
    removeProp(
      { bool: { must: [{ terms: { label: ["label"], boost: 0 } }] } },
      "boost"
    )
  ).toEqual({ bool: { must: [{ terms: { label: ["label"] } }] } });
});
