import style from "./UserTable.module.scss";
import commonStyle from "styles/common.module.scss";
import { copyToClipboard } from "src/models/util";
import {
  User,
  sortedUserKeys,
  DisplayUser,
  usersDisplayHashArray,
  userDisplayInfo,
} from "src/models/user/user";

export const headerLabels: Record<string, string> = {
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
