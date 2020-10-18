import React, { useState } from "react";
import moment from "moment";
import "./NameGenerator.scss";
import "../Common/common.scss";
import ParamBox from "../Common/ParamBox";
import { copyToClipboard, downloadAsCsv } from "../Common/util";
import { User, createUsers, userToCsvText } from "./user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const generateUserTable = (users: User[]): JSX.Element => {
  const items = [];
  for (const [i, instance] of users.entries()) {
    items.push(
      <li key={"instance" + i} className="nowrap">
        <input
          style={{ width: 50 }}
          readOnly
          type="number"
          value={i + 1}
          onClick={(): void => copyToClipboard(i + 1)}
        />
        <input
          style={{ width: 120 }}
          readOnly
          type="text"
          value={instance.familyName + "　" + instance.givenName}
          onClick={(): void =>
            copyToClipboard(instance.familyName + " " + instance.givenName)
          }
        />
        <input
          style={{ width: 100 }}
          readOnly
          type="text"
          value={instance.familyName}
          onClick={(): void => copyToClipboard(instance.familyName)}
        />
        <input
          style={{ width: 100 }}
          readOnly
          type="text"
          value={instance.givenName}
          onClick={(): void => copyToClipboard(instance.givenName)}
        />
        <input
          style={{ width: 120 }}
          readOnly
          type="text"
          value={instance.familyNameKana + "　" + instance.givenNameKana}
          onClick={(): void =>
            copyToClipboard(
              instance.familyNameKana + " " + instance.givenNameKana
            )
          }
        />
        <input
          style={{ width: 100 }}
          readOnly
          type="text"
          value={instance.familyNameKana}
          onClick={(): void => copyToClipboard(instance.familyNameKana)}
        />
        <input
          style={{ width: 100 }}
          readOnly
          type="text"
          value={instance.givenNameKana}
          onClick={(): void => copyToClipboard(instance.givenNameKana)}
        />
        <input
          style={{ width: 100 }}
          readOnly
          type="text"
          value={instance.sex}
          onClick={(): void => copyToClipboard(instance.sex)}
        />
        <input
          style={{ width: 100 }}
          readOnly
          type="text"
          value={moment(instance.birthday).format("YYYY/MM/DD")}
          onClick={(): void =>
            copyToClipboard(moment(instance.birthday).format("YYYY/MM/DD"))
          }
        />
        <input
          style={{ width: 300 }}
          readOnly
          type="text"
          value={instance.email}
          onClick={(): void => copyToClipboard(instance.email)}
        />
      </li>
    );
  }
  return <ul className="instance-records">{items}</ul>;
};

const NameGenerator: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pattern, setPattern] = useState("人名");
  const [genNum, setGenNum] = useState(10);
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
            onChange={(e): void => setGenNum(parseInt(e.target.value))}
          ></input>
        </ParamBox>
        <ParamBox labelName="パターン">
          <select
            name="pattern"
            id="pattern"
            onChange={(e): void => setPattern(e.target.value)}
          >
            <option value="人">人</option>
          </select>
        </ParamBox>
        <ParamBox labelName="一条太郎方式">
          <input
            type="checkbox"
            defaultChecked={useNumro}
            onChange={(e): void => setUseNumro(e.target.checked)}
          ></input>
        </ParamBox>
        <ParamBox>
          <button className="testaro-button" onClick={generate} style={{ marginRight: 5 }}>
            再生成
          </button>
          <button className="testaro-button" onClick={downloadCsv}>
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
