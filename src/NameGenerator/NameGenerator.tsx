import React, { useState } from "react";
import "./NameGenerator.scss";
import "../Common/common.scss";
import { createNumroInstances } from "./numro";
import { createRandomUserInstances } from "./human";
import ParamBox from "../Common/ParamBox";
import moment from "moment";

const generateDoms = (genNum: number) => {
  const userInstances = createRandomUserInstances(genNum);
  const items = [];
  for (const [i, instance] of userInstances.entries()) {
    items.push(
      <li key={"instance" + i}>
        <input readOnly type="number" value={i + 1} />
        <input readOnly type="text" value={instance.familyName} />
        <input readOnly type="text" value={instance.givenName} />
        <input readOnly type="text" value={instance.familyNameKana} />
        <input readOnly type="text" value={instance.givenNameKana} />
        <input readOnly type="text" value={instance.sex} />
        <input
          readOnly
          type="text"
          value={moment(instance.birthday).format("YYYY/MM/DD")}
        />
        <input readOnly type="text" value={instance.email} />
      </li>
    );
  }

  return <ul className="instance-records">{items}</ul>;
};

const copyToClipboard = (str: string): void => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str);
  }
};

const NameGenerator: React.FC = () => {
  const [pattern, setPattern] = useState("人名");
  const [genNum, setGenNum] = useState(5);
  const [genStr, setGenStr] = useState("");

  const generate = (): void => {
    setGenNum(0);
    setTimeout(() => {
      setGenNum(genNum);
    }, 0);
  };

  return (
    <div className="NameGenerator">
      <h1>ダミー固有名詞</h1>
      <div>
        <ParamBox labelName="パターン">
          <select
            name="pattern"
            id="pattern"
            onChange={(e): void => setPattern(e.target.value)}
          >
            <option value="人名">人名</option>
          </select>
        </ParamBox>
        <ParamBox labelName="生成数">
          <input
            type="number"
            defaultValue={genNum}
            onChange={(e): void => setGenNum(parseInt(e.target.value))}
          ></input>
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
