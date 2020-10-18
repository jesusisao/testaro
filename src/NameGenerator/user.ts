import moment from "moment";
import { createNumroInstances } from "./numro";
import { createRandomUserInstances } from "./human";
import { arrayToCsv } from "../Common/util";
import { Address } from "./address";

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
export type Sex = "female" | "male";
export type Human = FamilyName & GivenName & { sex: Sex; birthday: Date };
export type User = Human & { email: string } & Address;

export const createUsers = (genNum: number, useNumro: boolean): User[] => {
  return useNumro ? createNumroInstances(genNum) : createRandomUserInstances(genNum);
}

const usersToStringArray = (users: User[]): Array<Array<string>> => {
  const items: Array<Array<string>> = [];
  for (const [i, user] of users.entries()) {
    items.push([
      (i + 1).toString(),
      user.familyName + "　" + user.givenName,
      user.familyName,
      user.givenName,
      user.familyNameKana + "　" + user.givenNameKana,
      user.familyNameKana,
      user.givenNameKana,
      user.sex,
      moment(user.birthday).format("YYYY/MM/DD"),
      user.postalCode,
      user.prefecture,
      user.city,
      user.townArea,
      user.houseNumber
    ])
  }
  return items
}

export const userToCsvText = (users: User[]): string => {
  return arrayToCsv(usersToStringArray(users))
}
