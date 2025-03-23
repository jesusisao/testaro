import { DateTime } from "luxon";
import style from "./UserTable.module.scss";
import commonStyle from "styles/common.module.scss";
import { copyToClipboard } from "src/models/util";
import { User, sexToJapanese, sexToIso5218 } from "src/models/user/user";
import { arrayToCsv } from "src/models/util";

export type DisplayUserKey =
  | keyof User
  | "joinedName"
  | "joinedNameKana"
  | "joinedNameRome"
  | "id"
  | "sexJa"
  | "sexIso";

export type DisplayUser = Record<DisplayUserKey, string>;

export const headerLabels: DisplayUser = {
  id: "ID",
  joinedName: "氏名",
  familyName: "姓",
  givenName: "名",
  joinedNameKana: "氏名(カナ)",
  familyNameKana: "姓(カナ)",
  givenNameKana: "名(カナ)",
  joinedNameRome: "氏名(ローマ字)",
  familyNameRome: "姓(ローマ字)",
  givenNameRome: "名(ローマ字)",
  sex: "性別(en)",
  sexJa: "性別(ja)",
  sexIso: "性別(ISO 5218)",
  birthday: "生年月日",
  email: "メールアドレス",
  postalCode: "郵便番号",
  prefecture: "都道府県",
  city: "市区町村",
  townArea: "町名",
  houseNumber: "番地",
  prefectureKana: "都道府県(カナ)",
  cityKana: "市区町村(カナ)",
  townAreaKana: "町名(カナ)",
};

type Item = {
  sortNum: number;
  width: number;
  defaultDisplay: boolean;
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

export const sortedUserKeys: DisplayUserKey[] = (
  Object.keys(userDisplayInfo) as DisplayUserKey[]
).sort((a, b) => {
  if (userDisplayInfo[a]["sortNum"] < userDisplayInfo[b]["sortNum"]) return -1;
  if (userDisplayInfo[a]["sortNum"] > userDisplayInfo[b]["sortNum"]) return 1;
  return 0;
});

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

const generateHeaderRow = (
  displayColumns: Record<string, boolean>
): React.JSX.Element => {
  const items = [];
  for (const key of sortedUserKeys) {
    if (!displayColumns[key]) continue;
    items.push(
      <span
        className={style.headerCell}
        style={{
          minWidth: userDisplayInfo[key]["width"],
          maxWidth: userDisplayInfo[key]["width"],
        }}
        key={`header_${key}`}
      >
        {headerLabels[key] || key}
      </span>
    );
  }
  return (
    <li key="header_row" className={`${commonStyle.nowrap}`}>
      {items}
    </li>
  );
};

const generateUserRow = (
  index: number,
  user: DisplayUser,
  displayColumns: Record<string, boolean>
): React.JSX.Element => {
  const items = [];
  for (const key of sortedUserKeys) {
    if (!displayColumns[key]) continue;
    items.push(
      <input
        style={{
          minWidth: userDisplayInfo[key]["width"],
          maxWidth: userDisplayInfo[key]["width"],
        }}
        readOnly
        key={key}
        type="text"
        value={user[key]}
        onClick={(): void => copyToClipboard(user[key])}
      />
    );
  }
  return (
    <li key={"user_" + index} className={commonStyle.nowrap}>
      {items}
    </li>
  );
};

const generateUserTable = (
  users: User[],
  idOffset: number,
  nameSeparator = " ",
  displayColumns: Record<string, boolean>
): React.JSX.Element => {
  const displayUsers = usersDisplayHashArray(users, idOffset, nameSeparator);
  const items = [];

  items.push(generateHeaderRow(displayColumns));

  for (const [i, user] of displayUsers.entries()) {
    items.push(generateUserRow(i + idOffset, user, displayColumns));
  }
  return <ul className={style.instanceRecords}>{items}</ul>;
};

const UserTable: React.FC<{
  users: User[];
  idOffset: number;
  nameSeparator?: string;
  displayColumns: Record<string, boolean>;
}> = (prop) => {
  return (
    <>
      {generateUserTable(
        prop.users,
        prop.idOffset,
        prop.nameSeparator,
        prop.displayColumns
      )}
    </>
  );
};

export default UserTable;
