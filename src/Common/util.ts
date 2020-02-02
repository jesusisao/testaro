import moment from "moment";

export const sleep = (msec: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, msec));

export const createRandomDate = (rangeStart: Date, rangeEnd: Date): Date => {
  const unixTimeStampStart = rangeStart.getTime();
  const unixTimeStampEnd = rangeEnd.getTime();
  const resultTimeStamp: number =
    Math.floor((unixTimeStampEnd - unixTimeStampStart) * Math.random()) +
    unixTimeStampStart;
  return new Date(resultTimeStamp);
};

export const dateToString = (date: Date): string => {
  return moment(date.getTime()).format("YYYYMMDD");
};

export const copyToClipboard = (arg: string | number): void => {
  if (navigator.clipboard) {
    if (typeof arg === "number") {
      navigator.clipboard.writeText(arg.toString());
      return;
    }
    navigator.clipboard.writeText(arg);
  }
};

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
    "無量大数"
  ];
  const exponents = [
    1,
    2,
    3,
    4,
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    68
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

export const numKanjiToKana = (kanji: string): string => {
  let result = "";
  for (const char of kanji) {
    if (char === "一") result += "イチ";
    if (char === "二") result += "ニ";
    if (char === "三") result += "サン";
    if (char === "四") result += "ヨン";
    if (char === "五") result += "ゴ";
    if (char === "六") result += "ロク";
    if (char === "七") result += "ナナ";
    if (char === "八") result += "ハチ";
    if (char === "九") result += "キュウ";
    if (char === "十") result += "ジュウ";
    if (char === "百") result += "ヒャク";
    if (char === "千") result += "セン";
  }
  return result;
};

export const numKanjiToRome = (kanji: string): string => {
  let result = "";
  for (const char of kanji) {
    if (char === "一") result += "ichi";
    if (char === "二") result += "ni";
    if (char === "三") result += "san";
    if (char === "四") result += "yon";
    if (char === "五") result += "go";
    if (char === "六") result += "roku";
    if (char === "七") result += "nana";
    if (char === "八") result += "hachi";
    if (char === "九") result += "kyu";
    if (char === "十") result += "ju";
    if (char === "百") result += "hyaku";
    if (char === "千") result += "sen";
  }
  return result;
};
