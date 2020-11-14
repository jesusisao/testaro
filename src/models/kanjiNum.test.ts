import { numbersToKanji, numKanjiToKana, numKanjiToRome } from "./kanjiNum";

test("numbersToKanji", () => {
  const result = numbersToKanji(123456789);
  expect(result).toBe("一億二千三百四十五万六千七百八十九");
});

test("numKanjiToKana", () => {
  const result = numKanjiToKana("一億二千三百四十五万六千七百八十九");
  expect(result).toBe(
    "イチオクニセンサンヒャクヨンジュウゴマンロクセンナナヒャクハチジュウキュウ"
  );
});

test("numKanjiToRome", () => {
  const result = numKanjiToRome("一億二千三百四十五万六千七百八十九");
  expect(result).toBe(
    "ichiokunisensanhyakuyonjugomanrokusennanahyakuhachijukyu"
  );
});
