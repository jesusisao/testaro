import { replaceVariable } from "./util";

test("replaceVariable", () => {
  const original = "テスト画像#{count}番";
  const result = replaceVariable(original, 1);
  expect(result).toBe("テスト画像1番");
});
