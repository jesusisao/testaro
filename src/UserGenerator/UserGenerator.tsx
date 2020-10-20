import React, { useState } from "react";
import "./UserGenerator.scss";
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

const UserGenerator: React.FC = () => {
  const [genNum, setGenNum] = useState(20);
  const [useNumro, setUseNumro] = useState(false);
  const [mailDomain, setMailDomain] = useState("testaro.netlify.app");

  const generate = (): void => {
    setGenNum(0);
    setTimeout(() => {
      setGenNum(genNum);
    }, 0);
  };

  const users = createUsers(genNum, useNumro, mailDomain);

  const downloadCsv = (): void => {
    downloadAsCsv(userToCsvText(users), "users")
  }

  return (
    <div className="UserGenerator">
      <h1 className="page-title">ダミーユーザー情報生成</h1>
      <p>
        セルをクリックすると、中の値が勝手にクリップボードにコピーされます。
      </p>
      <div className="params-container">
        <div className="param-container">
          <ParamBox labelName="一条太郎方式">
            <input
              type="checkbox"
              defaultChecked={useNumro}
              onChange={(e): void => setUseNumro(e.target.checked)}
            ></input>
          </ParamBox>
          <ParamBox labelName="メールのドメイン">
            <input
              type="text"
              defaultValue={mailDomain}
              onChange={(e): void => setMailDomain(e.target.value)}
            ></input>
          </ParamBox>
          <ParamBox labelName="生成数">
            <input
              className="text-right"
              type="number"
              defaultValue={genNum}
              onChange={(e): void => setGenNum(parseInt(e.target.value))}
            ></input>
          </ParamBox>

          <button className="testaro-button" onClick={generate}>
            再生成
          </button>
          <button className="testaro-button" onClick={downloadCsv} style={{ marginLeft: 5 }}>
            CSVダウンロード
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </button>

        </div>
      </div>
      <div className="outputs-container" style={{ display: "block"}}>
        <div className="output-container">
          {generateUserTable(users)}
        </div>
      </div>
    </div>
  );
};

export default UserGenerator;
