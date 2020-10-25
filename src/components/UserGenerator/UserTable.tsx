import React from "react";
import style from "./UserTable.module.scss";
import commonStyle from "styles/common.module.scss";
import { copyToClipboard } from "src/components/Common/util";
import {
  User,
  sortedUserKeys,
  DisplayUser,
  usersDisplayHashArray,
  userDisplayInfo,
} from "src/models/user/user";

const generateUserRow = (index: number, user: DisplayUser): JSX.Element => {
  const items = [];
  for (const key of sortedUserKeys) {
    if (!userDisplayInfo[key]["display"]) continue;
    items.push(
      <input
        style={{ width: userDisplayInfo[key]["width"] }}
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

const generateUserTable = (users: User[]): JSX.Element => {
  const displayUsers = usersDisplayHashArray(users);
  const items = [];
  for (const [i, user] of displayUsers.entries()) {
    items.push(generateUserRow(i, user));
  }
  return <ul className={style.instanceRecords}>{items}</ul>;
};

const UserTable: React.FC<{ users: User[] }> = (prop) => {
  return <>{generateUserTable(prop.users)}</>;
};

export default UserTable;
