import { createNumros } from "./numro";
import { createRandomUsers } from "./human";
import { Address } from "../address";

export type FamilyName = {
  familyName: string;
  familyNameKana: string;
  familyNameRome: string;
};
export type GivenName = {
  givenName: string;
  givenNameKana: string;
  givenNameRome: string;
};
export type Sex = "not known" | "male" | "female" | "not applicable";
export type Human = FamilyName & GivenName & { sex: Sex; birthday: Date };
export type User = Human & { email: string } & Address;

export const createUsers = (
  genNum: number,
  useNumro: boolean,
  mailDomain: string,
  idOffset: number
): User[] => {
  return useNumro
    ? createNumros(genNum, mailDomain, idOffset)
    : createRandomUsers(genNum, mailDomain);
};

export const sexToJapanese = (sex: Sex): string => {
  switch (sex) {
    case "male":
      return "男";
    case "female":
      return "女";
    case "not known":
      return "不明";
    case "not applicable":
      return "適用外";
    default:
      return "";
  }
};

export const sexToIso5218 = (sex: Sex): string => {
  switch (sex) {
    case "not known":
      return "0";
    case "male":
      return "1";
    case "female":
      return "2";
    case "not applicable":
      return "9";
    default:
      return "";
  }
};
