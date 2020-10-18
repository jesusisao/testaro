import moment from "moment";
import { createNumroInstances } from "./numro";
import { createRandomUserInstances } from "./human";
import { arrayToCsv } from "../Common/util";

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
export type User = Human & { email: string };

export const createUsers = (genNum: number, useNumro: boolean): User[] => {
  return useNumro ? createNumroInstances(genNum) : createRandomUserInstances(genNum);
}

const usersToStringArray = (users: User[]): Array<Array<string>> => {
  const items: Array<Array<string>> = [];
  for (const [i, instance] of users.entries()) {
    items.push([
      (i + 1).toString(),
      instance.familyName + "　" + instance.givenName,
      instance.familyName,
      instance.givenName,
      instance.familyNameKana + "　" + instance.givenNameKana,
      instance.familyNameKana,
      instance.givenNameKana,
      instance.sex,
      moment(instance.birthday).format("YYYY/MM/DD")
    ])
  }
  return items
}

export const userToCsvText = (users: User[]): string => {
  return arrayToCsv(usersToStringArray(users))
}
