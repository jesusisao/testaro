/**
 * 数値を漢数字表記に変換
 * @param  {number} num - 半角数字
 * @return {string} 漢数字表記
 * @throws {TypeError} 半角数字以外の文字が含まれている場合
 * @throws {RangeError} 数値が Number.MIN_SAFE_INTEGER ～ Number.MAX_SAFE_INTEGER の範囲外の場合
 */
export const numbersToKanji = (num: number): string => {
  if (!Number.isSafeInteger(num)) {
    throw new RangeError(
      "数値が " +
        Number.MIN_SAFE_INTEGER +
        " ～ " +
        Number.MAX_SAFE_INTEGER +
        " の範囲外です。漢数字に変換できませんでした。-> " +
        num
    );
  }
  if (num === 0) {
    return "零";
  }
  let ret = "";
  if (num < 0) {
    ret += "マイナス";
    num *= -1;
  }
  const kanjiNums = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const kanjiNames = [
    "十",
    "百",
    "千",
    "万",
    "億",
    "兆",
    "京",
    "垓",
    "𥝱",
    "穣",
    "溝",
    "澗",
    "正",
    "載",
    "極",
    "恒河沙",
    "阿僧祇",
    "那由他",
    "不可思議",
    "無量大数",
  ];
  const exponents = [
    1, 2, 3, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68,
  ];
  const exponentsLen = exponents.length;
  for (let i = exponentsLen; i >= 0; --i) {
    const bias = Math.pow(10, exponents[i]);
    if (num >= bias) {
      const top = Math.floor(num / bias);
      if (top >= 10) {
        ret += numbersToKanji(top);
      } else {
        if (top === 1 && exponents[i] <= 3) {
          // ※先頭の数字が1、かつ指数が3 (千の位) 以下の場合のみ『一』をつけない
        } else {
          ret += kanjiNums[top];
        }
      }
      ret += kanjiNames[i];
      num -= top * bias;
    }
  }
  ret += kanjiNums[num];
  return ret;
};

const kanaTable: { [key: string]: string } = {
  一: "イチ",
  二: "ニ",
  三: "サン",
  四: "ヨン",
  五: "ゴ",
  六: "ロク",
  七: "ナナ",
  八: "ハチ",
  九: "キュウ",
  十: "ジュウ",
  百: "ヒャク",
  千: "セン",
  万: "マン",
  億: "オク",
};

export const numKanjiToKana = (kanji: string): string => {
  let result = "";
  for (const char of kanji) {
    // eslint-disable-next-line no-prototype-builtins
    if (kanaTable.hasOwnProperty(char)) {
      result += kanaTable[char];
    }
  }
  return result;
};

const romeTable: { [key: string]: string } = {
  一: "ichi",
  二: "ni",
  三: "san",
  四: "yon",
  五: "go",
  六: "roku",
  七: "nana",
  八: "hachi",
  九: "kyu",
  十: "ju",
  百: "hyaku",
  千: "sen",
  万: "man",
  億: "oku",
};

export const numKanjiToRome = (kanji: string): string => {
  let result = "";
  for (const char of kanji) {
    // eslint-disable-next-line no-prototype-builtins
    if (romeTable.hasOwnProperty(char)) {
      result += romeTable[char];
    }
  }
  return result;
};
