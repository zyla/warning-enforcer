import { stripIndent } from "common-tags";
import { parse } from "./Parser";

it("skips nonsense", () => {
  expect(
    parse(stripIndent`
      some messages
      should be ignored
    `)
  ).toEqual([]);
});

it("recognizes PureScript Compiling lines", () => {
  expect(
    parse(stripIndent`
      Compiling Data.Maybe
    `)
  ).toEqual([
    {
      type: "compiling",
      moduleName: "Data.Maybe",
    },
  ]);
});

it("recognizes Stack/GHC Compiling lines", () => {
  expect(
    parse(stripIndent`
      blaze-markup        > configure
      blaze-markup        > Configuring blaze-markup-0.8.2.8...
      blaze-markup        > build
      blaze-markup        > Preprocessing library for blaze-markup-0.8.2.8..
      blaze-markup        > Building library for blaze-markup-0.8.2.8..
      blaze-markup        > [1 of 6] Compiling Text.Blaze.Internal
    `)
  ).toEqual([
    {
      type: "compiling",
      moduleName: "Text.Blaze.Internal",
    },
  ]);
});
