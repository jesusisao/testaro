import { DateTime } from "luxon";
import { createNumros } from "./numro";
import { createRandomUsers } from "./human";
import { arrayToCsv } from "src/models/util";
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

export type DisplayUserKey =
  | keyof User
  | "joinedName"
  | "joinedNameKana"
  | "joinedNameRome"
  | "id"
  | "sexJa"
  | "sexIso";
export type DisplayUser = Record<DisplayUserKey, string>;
type Item = {
  sortNum: number;
  width: number;
  defaultDisplay: boolean;
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

export const userDisplayInfo: Record<DisplayUserKey, Item> = {
  id: {
    sortNum: 1,
    width: 50,
    defaultDisplay: true,
  },
  joinedName: {
    sortNum: 2,
    width: 120,
    defaultDisplay: true,
  },
  familyName: {
    sortNum: 3,
    width: 80,
    defaultDisplay: false,
  },
  givenName: {
    sortNum: 4,
    width: 80,
    defaultDisplay: false,
  },
  joinedNameKana: {
    sortNum: 5,
    width: 120,
    defaultDisplay: true,
  },
  familyNameKana: {
    sortNum: 6,
    width: 100,
    defaultDisplay: false,
  },
  givenNameKana: {
    sortNum: 7,
    width: 100,
    defaultDisplay: false,
  },
  joinedNameRome: {
    sortNum: 8,
    width: 120,
    defaultDisplay: false,
  },
  familyNameRome: {
    sortNum: 9,
    width: 80,
    defaultDisplay: false,
  },
  givenNameRome: {
    sortNum: 10,
    width: 80,
    defaultDisplay: false,
  },
  sex: {
    sortNum: 11,
    width: 60,
    defaultDisplay: false,
  },
  sexJa: {
    sortNum: 12,
    width: 60,
    defaultDisplay: false,
  },
  sexIso: {
    sortNum: 13,
    width: 100,
    defaultDisplay: false,
  },
  birthday: {
    sortNum: 14,
    width: 100,
    defaultDisplay: true,
  },
  email: {
    sortNum: 15,
    width: 300,
    defaultDisplay: true,
  },
  postalCode: {
    sortNum: 16,
    width: 70,
    defaultDisplay: true,
  },
  prefecture: {
    sortNum: 17,
    width: 60,
    defaultDisplay: true,
  },
  city: {
    sortNum: 18,
    width: 120,
    defaultDisplay: true,
  },
  townArea: {
    sortNum: 19,
    width: 120,
    defaultDisplay: true,
  },
  houseNumber: {
    sortNum: 20,
    width: 100,
    defaultDisplay: true,
  },
  prefectureKana: {
    sortNum: 21,
    width: 80,
    defaultDisplay: false,
  },
  cityKana: {
    sortNum: 22,
    width: 80,
    defaultDisplay: false,
  },
  townAreaKana: {
    sortNum: 23,
    width: 80,
    defaultDisplay: false,
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

export const usersDisplayHashArray = (
  users: User[],
  idOffset: number,
  nameSeparator = " "
): Array<DisplayUser> => {
  const items: Array<DisplayUser> = [];
  for (const [i, user] of users.entries()) {
    items.push({
      id: (i + 1 + idOffset).toString(),
      joinedName: user.familyName + nameSeparator + user.givenName,
      familyName: user.familyName,
      givenName: user.givenName,
      joinedNameKana: user.familyNameKana + nameSeparator + user.givenNameKana,
      familyNameKana: user.familyNameKana,
      givenNameKana: user.givenNameKana,
      joinedNameRome: user.givenNameRome + " " + user.familyNameRome,
      familyNameRome: user.familyNameRome,
      givenNameRome: user.givenNameRome,
      sex: user.sex,
      sexJa: sexToJapanese(user.sex),
      sexIso: sexToIso5218(user.sex),
      birthday: DateTime.fromJSDate(user.birthday).toFormat("yyyy/MM/dd"),
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
const usersToStringArray = (
  users: User[],
  idOffset: number,
  nameSeparator = " ",
  displayColumns: Record<DisplayUserKey, boolean>
): Array<Array<string>> => {
  // Filter keys based on displayColumns
  const keysToDisplay = sortedUserKeys.filter((key) => displayColumns[key]);
  const items: Array<Array<string>> = [keysToDisplay];

  const displayUsers = usersDisplayHashArray(users, idOffset, nameSeparator);
  for (const user of displayUsers) {
    const item: Array<string> = [];
    for (const key of sortedUserKeys) {
      if (!displayColumns[key]) continue;
      item.push(user[key]);
    }
    items.push(item);
  }
  return items;
};

export const userToCsvText = (
  users: User[],
  idOffset: number,
  nameSeparator = " ",
  displayColumns: Record<DisplayUserKey, boolean>
): string => {
  return arrayToCsv(
    usersToStringArray(users, idOffset, nameSeparator, displayColumns)
  );
};
