import { toFullWidth } from "src/components/Common/util";
import kenData from "src/lib/kenMini.json";
const kenList = kenData as Array<KenAddress>;
const kenLength = kenList.length;

export type Address = {
  postalCode: string;
  prefectureKana: string;
  cityKana: string;
  townAreaKana: string;
  prefecture: string;
  city: string;
  townArea: string;
  houseNumber: string;
};

export type KenAddress = {
  postalCode: string;
  prefectureKana: string;
  cityKana: string;
  townAreaKana: string;
  prefecture: string;
  city: string;
  townArea: string;
};

const generateRandomHouseNumber = (): string => {
  const branchNum = Math.floor(Math.random() * 2) + 1;
  const li: string[] = [];
  for (let i = 0; i < branchNum + 1; i++) {
    li.push(toFullWidth(Math.floor(Math.random() * 19) + 1));
  }
  return li.join("ー");
};

export const generateRandomAddress = (): Address => {
  const index = Math.floor(Math.random() * kenLength);
  const result = kenList[index];
  if (result.townArea === "") {
    // 町域が空のデータにあたってしまったらもう一回ガチャを回す
    return generateRandomAddress();
  }
  return { ...kenList[index], houseNumber: generateRandomHouseNumber() };
};
