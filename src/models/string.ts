// 半角数字を全角数字へ変換
export const toFullWidth = (num: number): string => {
  const str = num.toString();
  return str.replace(/./g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
};

// パターンと文字数を入れると、パターンを繰り返して文字数分だけ文字を生成してくれる関数
export const generateManyChars = (pattern: string, charNum: number): string => {
  const patternLength = pattern.length;
  if (charNum === 0) return "";
  if (patternLength === 0) return "";
  const loopNum = Math.floor(charNum / patternLength);
  const lastAddNum = charNum % patternLength;
  let str = "";
  for (let i = 0; i < loopNum; i++) {
    str += pattern;
  }
  return str + pattern.slice(0, lastAddNum);
};

export const replaceVariable = (original: string, num: number): string => {
  const re = /#{.+?}/g;
  const matches = original.match(re);
  if (matches === null) return original;
  const matchesNames = matches.map((str) => str.slice(2).slice(0, -1));
  let copied = original.slice();
  for (const match of matchesNames) {
    if (match === "count") {
      copied = copied.replace("#{count}", num.toString());
    }
  }
  return copied;
};
