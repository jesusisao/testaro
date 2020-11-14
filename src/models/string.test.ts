import { generateManyChars } from "./string";
import { replaceVariable } from "src/models/string";

test("replaceVariable", () => {
  const original = "テスト画像#{count}番";
  const result = replaceVariable(original, 1);
  expect(result).toBe("テスト画像1番");
});

describe("generateManyChars", () => {
  test("num0", () => {
    const pattern = "○○○○○○○○○●";
    const result = generateManyChars(pattern, 0);
    expect(result).toBe("");
  });

  test("num21", () => {
    const pattern = "○○○○○○○○○●";
    const result = generateManyChars(pattern, 21);
    expect(result).toBe("○○○○○○○○○●○○○○○○○○○●○");
  });

  test("number is smaller than pattern", () => {
    const pattern = "○○○○○○○○○●";
    const result = generateManyChars(pattern, 9);
    expect(result).toBe("○○○○○○○○○");
  });

  test("no pattern", () => {
    const pattern = "";
    const result = generateManyChars(pattern, 10);
    expect(result).toBe("");
  });
});
