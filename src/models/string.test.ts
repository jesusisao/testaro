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

  test("emoji pattern", () => {
    const pattern = "🤔😂😊";
    const result = generateManyChars(pattern, 5);
    expect(result).toBe("🤔😂😊🤔😂");
    expect(Array.from(result).length).toBe(5); // 絵文字が5文字あることを確認
  });

  describe("半角カタカナの濁点・半濁点", () => {
    test("濁点付き半角カタカナ", () => {
      // 濁点付き半角カタカナ（ｶﾞｷﾞｸﾞｹﾞｺﾞ）
      const pattern = "ｶﾞｷﾞｸﾞｹﾞｺﾞ";
      const result = generateManyChars(pattern, 10);
      expect(result).toBe("ｶﾞｷﾞｸﾞｹﾞｺﾞ");
      // 各文字（ｶﾞ,ｷﾞ,ｸﾞ,ｹﾞ,ｺﾞ）は2文字ずつ（ベース文字+濁点）で計10文字
      expect(Array.from(result).length).toBe(10);
    });

    test("半濁点付き半角カタカナ", () => {
      // 半濁点付き半角カタカナ（ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ）
      const pattern = "ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ";
      const result = generateManyChars(pattern, 10);
      expect(result).toBe("ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ");
      // 各文字（ﾊﾟ,ﾋﾟ,ﾌﾟ,ﾍﾟ,ﾎﾟ）は2文字ずつ（ベース文字+半濁点）で計10文字
      expect(Array.from(result).length).toBe(10);
    });

    test("濁点・半濁点混合パターン", () => {
      // 濁点と半濁点が混在するパターン
      const pattern = "ｶﾞﾊﾟｷﾞﾋﾟ";
      const result = generateManyChars(pattern, 8);
      expect(result).toBe("ｶﾞﾊﾟｷﾞﾋﾟ");
      // 各文字（ｶﾞ,ﾊﾟ,ｷﾞ,ﾋﾟ）は2文字ずつで計8文字
      expect(Array.from(result).length).toBe(8);
    });

    test("通常の半角カタカナと濁点・半濁点の混合", () => {
      // 通常の半角カタカナと濁点・半濁点付きの混合
      const pattern = "ｱｶﾞﾊﾟｲ";
      const result = generateManyChars(pattern, 6);
      expect(result).toBe("ｱｶﾞﾊﾟｲ");
      // ｱ(1文字), ｶﾞ(2文字), ﾊﾟ(2文字), ｲ(1文字) で計6文字
      expect(Array.from(result).length).toBe(6);
    });

    test("濁点・半濁点のみのパターン", () => {
      // 濁点・半濁点のみのパターン
      const pattern = "ﾞﾟﾞﾟ";
      const result = generateManyChars(pattern, 6);
      expect(result).toBe("ﾞﾟﾞﾟﾞﾟ");
      // 濁点と半濁点は各1文字として扱われる
      expect(Array.from(result).length).toBe(6);
    });
  });
});
