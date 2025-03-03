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

const generateUserRow = (
  index: number,
  user: DisplayUser
): React.JSX.Element => {
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

const generateUserTable = (
  users: User[],
  idOffset: number
): React.JSX.Element => {
  const displayUsers = usersDisplayHashArray(users, idOffset);
  const items = [];
  for (const [i, user] of displayUsers.entries()) {
    items.push(generateUserRow(i + idOffset, user));
  }
  return <ul className={style.instanceRecords}>{items}</ul>;
};

const UserTable: React.FC<{ users: User[]; idOffset: number }> = (prop) => {
  return <>{generateUserTable(prop.users, prop.idOffset)}</>;
};

export default UserTable;
