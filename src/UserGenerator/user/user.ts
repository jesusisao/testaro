import moment from "moment";
import { createNumros } from "./numro";
import { createRandomUsers } from "./human";
import { arrayToCsv } from "../../Common/util";
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
export type Sex = "female" | "male";
export type Human = FamilyName & GivenName & { sex: Sex; birthday: Date };
export type User = Human & { email: string } & Address;

export const createUsers = (
  genNum: number,
  useNumro: boolean,
  mailDomain: string
): User[] => {
  return useNumro
    ? createNumros(genNum, mailDomain)
    : createRandomUsers(genNum, mailDomain);
};

type DisplayUserKey = keyof User | "joinedName" | "joinedNameKana" | "id";
export type DisplayUser = Record<DisplayUserKey, string>;
type Item = {
  sortNum: number;
  width: number;
  display: boolean;
};

export const userDisplayInfo: Record<DisplayUserKey, Item> = {
  id: {
    sortNum: 1,
    width: 50,
    display: true,
  },
  joinedName: {
    sortNum: 2,
    width: 120,
    display: true,
  },
  familyName: {
    sortNum: 3,
    width: 80,
    display: true,
  },
  givenName: {
    sortNum: 4,
    width: 80,
    display: true,
  },
  joinedNameKana: {
    sortNum: 5,
    width: 120,
    display: true,
  },
  familyNameKana: {
    sortNum: 6,
    width: 100,
    display: true,
  },
  givenNameKana: {
    sortNum: 7,
    width: 100,
    display: true,
  },
  familyNameRome: {
    sortNum: 8,
    width: 80,
    display: false,
  },
  givenNameRome: {
    sortNum: 9,
    width: 80,
    display: false,
  },
  sex: {
    sortNum: 10,
    width: 50,
    display: true,
  },
  birthday: {
    sortNum: 11,
    width: 100,
    display: true,
  },
  email: {
    sortNum: 12,
    width: 300,
    display: true,
  },
  postalCode: {
    sortNum: 13,
    width: 80,
    display: true,
  },
  prefecture: {
    sortNum: 14,
    width: 80,
    display: true,
  },
  city: {
    sortNum: 15,
    width: 120,
    display: true,
  },
  townArea: {
    sortNum: 16,
    width: 120,
    display: true,
  },
  houseNumber: {
    sortNum: 17,
    width: 100,
    display: true,
  },
  prefectureKana: {
    sortNum: 18,
    width: 80,
    display: false,
  },
  cityKana: {
    sortNum: 19,
    width: 80,
    display: false,
  },
  townAreaKana: {
    sortNum: 20,
    width: 80,
    display: false,
  },
};

export const sortedUserKeys: Array<DisplayUserKey> = Object.keys(
  userDisplayInfo
).sort((a: string, b: string) => {
  if (
    userDisplayInfo[a as DisplayUserKey]["sortNum"] <
    userDisplayInfo[b as DisplayUserKey]["sortNum"]
  )
    return -1;
  if (
    userDisplayInfo[a as DisplayUserKey]["sortNum"] >
    userDisplayInfo[b as DisplayUserKey]["sortNum"]
  )
    return 1;
  return 0;
}) as Array<DisplayUserKey>;

const sortedUserKeysDisplay: Array<DisplayUserKey> = sortedUserKeys.filter(
  (key) => {
    return userDisplayInfo[key]["display"];
  }
);

export const usersDisplayHashArray = (users: User[]): Array<DisplayUser> => {
  const items: Array<DisplayUser> = [];
  for (const [i, user] of users.entries()) {
    items.push({
      id: (i + 1).toString(),
      joinedName: user.familyName + "　" + user.givenName,
      familyName: user.familyName,
      givenName: user.givenName,
      joinedNameKana: user.familyNameKana + "　" + user.givenNameKana,
      familyNameKana: user.familyNameKana,
      givenNameKana: user.givenNameKana,
      familyNameRome: user.familyNameRome,
      givenNameRome: user.givenNameRome,
      sex: user.sex,
      birthday: moment(user.birthday).format("YYYY/MM/DD"),
      email: user.email,
      postalCode: user.postalCode,
      prefecture: user.prefecture,
      city: user.city,
      townArea: user.townArea,
      houseNumber: user.houseNumber,
      prefectureKana: user.prefectureKana,
      cityKana: user.cityKana,
      townAreaKana: user.townAreaKana,
    });
  }
  return items;
};

// 主にCSV用。
const usersToStringArray = (users: User[]): Array<Array<string>> => {
  const displayUsers = usersDisplayHashArray(users);
  const items: Array<Array<string>> = [sortedUserKeysDisplay];
  for (const user of displayUsers) {
    const item: Array<string> = [];
    for (const key of sortedUserKeys) {
      if (!userDisplayInfo[key]["display"]) continue;
      item.push(user[key]);
    }
    items.push(item);
  }
  return items;
};

export const userToCsvText = (users: User[]): string => {
  return arrayToCsv(usersToStringArray(users));
};
