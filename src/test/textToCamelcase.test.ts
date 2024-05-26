import textToCamelcase from "../scripts/textToCamelcase";

describe(`textToCamelcase`, () => {
  test("Convert string to Camel case and delete all first numbers", () => {
    expect(textToCamelcase("01-all")).toStrictEqual("all");
  });
});
