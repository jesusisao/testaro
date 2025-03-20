// 半角数字を全角数字へ変換
export const toFullWidth = (num: number): string => {
  const str = num.toString();
  return str.replace(/./g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
};

// パターンと文字数を入れると、パターンを繰り返して文字数分だけ文字を生成してくれる関数
export const generateManyChars = (pattern: string, charNum: number): string => {
  if (charNum === 0) return "";
  // Array.fromを使用して正しくUnicode文字（絵文字含む）をカウント
  const patternChars = Array.from(pattern);
  const patternLength = patternChars.length;
  if (patternLength === 0) return "";

  const loopNum = Math.floor(charNum / patternLength);
  const lastAddNum = charNum % patternLength;
  let str = "";
  for (let i = 0; i < loopNum; i++) {
    str += pattern;
  }

  // 残りの文字を追加（sliceではなくArray.fromで分割した配列から取得）
  return str + patternChars.slice(0, lastAddNum).join("");
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
