import React, { useState } from "react";
import "./NameGenerator.scss";
import "../Common/common.scss";
import ParamBox from "../Common/ParamBox";
import { copyToClipboard, downloadAsCsv } from "../Common/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import {
  User,
  createUsers,
  userToCsvText,
  sortedUserKeys,
  DisplayUser,
  usersDisplayHashArray,
  userDisplayInfo
} from "./user/user";

const generateUserTable = (users: User[]): JSX.Element => {
  const displayUsers = usersDisplayHashArray(users)
  const items = [];
  for (const [i, user] of displayUsers.entries()) {
    items.push(
      generateUserRow(i, user)
    );
  }
  return <ul className="instance-records">{items}</ul>;
};

const generateUserRow = (index: number, user: DisplayUser): JSX.Element => {
  const items = [];
  for (const key of sortedUserKeys) {
    if (!(userDisplayInfo[key]["display"])) continue;
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
  return <li key={"user_" + index} className="nowrap">
    {items}
  </li>
}

const NameGenerator: React.FC = () => {
  const [genNum, setGenNum] = useState(20);
  const [useNumro, setUseNumro] = useState(false);

  const generate = (): void => {
    setGenNum(0);
    setTimeout(() => {
      setGenNum(genNum);
    }, 0);
  };

  const users = createUsers(genNum, useNumro);

  const downloadCsv = (): void => {
    downloadAsCsv(userToCsvText(users), "users")
  }

  return (
    <div className="NameGenerator">
      <h1 className="page-title">ダミーレコード生成</h1>
      <p>
        セルをクリックすると、中の値が勝手にクリップボードにコピーされます。
      </p>
      <div>
        <ParamBox labelName="生成数">
          <input
            className="text-right"
            type="number"
            defaultValue={genNum}
            max="1000"
            onChange={(e): void => setGenNum(parseInt(e.target.value))}
          ></input>
        </ParamBox>
        <ParamBox labelName="一条太郎方式">
          <input
            type="checkbox"
            defaultChecked={useNumro}
            onChange={(e): void => setUseNumro(e.target.checked)}
          ></input>
        </ParamBox>
        <ParamBox>
          <button className="testaro-button" onClick={generate}>
            再生成
          </button>
          <button className="testaro-button" onClick={downloadCsv} style={{ marginLeft: 5 }}>
            CSVダウンロード
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </button>
        </ParamBox>
      </div>
      {generateUserTable(users)}
    </div>
  );
};

export default NameGenerator;
