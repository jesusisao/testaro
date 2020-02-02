import React, { useState } from "react";
import "./NameGenerator.scss";
import "../Common/common.scss";
import { createNumroInstances } from "./numro";
import { createRandomUserInstances } from "./human";
import ParamBox from "../Common/ParamBox";
import moment from "moment";
import { copyToClipboard } from "../Common/util";

const generateDoms = (genNum: number) => {
  const userInstances = createRandomUserInstances(genNum);
  const items = [];
  for (const [i, instance] of userInstances.entries()) {
    items.push(
      <li key={"instance" + i}>
        <input
          readOnly
          type="number"
          value={i + 1}
          onClick={(): void => copyToClipboard(i + 1)}
        />
        <input
          readOnly
          type="text"
          value={instance.familyName}
          onClick={(): void => copyToClipboard(instance.familyName)}
        />
        <input
          readOnly
          type="text"
          value={instance.givenName}
          onClick={(): void => copyToClipboard(instance.givenName)}
        />
        <input
          readOnly
          type="text"
          value={instance.familyNameKana}
          onClick={(): void => copyToClipboard(instance.familyNameKana)}
        />
        <input
          readOnly
          type="text"
          value={instance.givenNameKana}
          onClick={(): void => copyToClipboard(instance.givenNameKana)}
        />
        <input
          readOnly
          type="text"
          value={instance.sex}
          onClick={(): void => copyToClipboard(instance.sex)}
        />
        <input
          readOnly
          type="text"
          value={moment(instance.birthday).format("YYYY/MM/DD")}
          onClick={(): void =>
            copyToClipboard(moment(instance.birthday).format("YYYY/MM/DD"))
          }
        />
        <input
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
  const [pattern, setPattern] = useState("人名");
  const [genNum, setGenNum] = useState(10);
  const [genStr, setGenStr] = useState("");

  const generate = (): void => {
    setGenNum(0);
    setTimeout(() => {
      setGenNum(genNum);
    }, 0);
  };

  return (
    <div className="NameGenerator">
      <h1>ダミーレコード生成</h1>
      <p>
        セルをクリックすると、中の値が勝手にクリップボードにコピーされます。
      </p>
      <div>
        <ParamBox labelName="生成数">
          <input
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
        <ParamBox>
          <button className="testaro-button" onClick={generate}>
            再生成
          </button>
        </ParamBox>
      </div>
      {generateDoms(genNum)}
    </div>
  );
};

export default NameGenerator;
