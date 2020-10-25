import React, { useState } from "react";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";
import { copyToClipboard, downloadAsCsv } from "src/components/Common/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import {
  User,
  createUsers,
  userToCsvText,
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
    downloadAsCsv(userToCsvText(users), "users");
  };

  return (
    <div className={style.page}>
      <h1 className={commonStyle.pageTitle}>ダミーユーザー情報生成</h1>
      <p>
        セルをクリックすると、中の値が勝手にクリップボードにコピーされます。
      </p>
      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
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
              className={commonStyle.textRight}
              type="number"
              defaultValue={genNum}
              onChange={(e): void => setGenNum(parseInt(e.target.value))}
            ></input>
          </ParamBox>

          <button className={commonStyle.testaroButton} onClick={generate}>
            再生成
          </button>
          <button
            className={commonStyle.testaroButton}
            onClick={downloadCsv}
            style={{ marginLeft: 5 }}
          >
            CSVダウンロード
            <FontAwesomeIcon
              icon={faFileDownload}
              className={commonStyle.icon}
            />
          </button>
        </div>
      </div>
      <div
        className={commonStyle.outputsContainer}
        style={{ display: "block" }}
      >
        <div className={commonStyle.outputContainer}>
          {generateUserTable(users)}
        </div>
      </div>
    </div>
  );
};

export default UserGenerator;
