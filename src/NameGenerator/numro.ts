import { FamilyName, GivenName, User, Sex } from "./humanType";
import {
  dateToString,
  numbersToKanji,
  numKanjiToKana,
  numKanjiToRome
} from "../Common/util";

const createNumro = (num: number): GivenName => {
  const numKanji = numbersToKanji(num);
  return {
    givenName: `${numKanji}郎`,
    givenNameKana: `${numKanjiToKana(numKanji)}ロウ`,
    givenNameRome: `${numKanjiToRome(numKanji)}ro`
  };
};

let Numros: Record<number, GivenName> = {
  // 豆知識： 一郎、二郎はその昔、11番目や12番目を表していたらしい。
  // 十は切腹を連想させることから、11番目が一郎、12番目が二郎だったとか。
  // ちなみに13番目は又三郎などになる。
  // ただし江戸時代以降は普通に一郎は1番目、二郎は2番目の意味になったとか。
  1: {
    givenName: "太郎",
    givenNameKana: "タロウ",
    givenNameRome: "taro"
  },
  2: {
    givenName: "次郎",
    givenNameKana: "ジロウ",
    givenNameRome: "jiro"
  },
  3: {
    givenName: "三郎",
    givenNameKana: "サブロウ",
    givenNameRome: "saburo"
  }
};

for (let i = 4; i <= 100; i++) {
  Numros = { [i]: createNumro(i), ...Numros };
}

const createNumjo = (num: number): FamilyName => {
  const numKanji = numbersToKanji(num);
  return {
    familyName: `${numKanji}条`,
    familyNameKana: `${numKanjiToKana(numKanji)}ジョウ`,
    familyNameRome: `${numKanjiToRome(numKanji)}jo`
  };
};

// ここでキャッシュしておく
let Numjos: Record<number, FamilyName> = {};
for (let i = 1; i <= 100; i++) {
  Numjos = { [i]: createNumjo(i), ...Numjos };
}

export const createNumroInstances = (num: number): Array<User> => {
  const result = [];
  const NumroLength = Object.keys(Numros).length;
  for (let i = 0; i < num; i++) {
    const givenNameIndex = (i % NumroLength) + 1;
    const familyNameIndex = Math.floor(i / NumroLength) + 1;
    const familyName = Numjos[familyNameIndex];
    const birthday = new Date(1990 + familyNameIndex, 0, 0);
    birthday.setDate(birthday.getDate() + givenNameIndex);
    result.push({
      familyName: familyName.familyName,
      familyNameKana: familyName.familyNameKana,
      familyNameRome: familyName.familyNameRome,
      ...Numros[givenNameIndex],
      sex: "male" as Sex,
      birthday: birthday,
      email: `${Numros[givenNameIndex].givenNameRome}.${
        familyName.familyNameRome
      }${dateToString(birthday)}@testaro.com`
    });
  }
  return result;
};
