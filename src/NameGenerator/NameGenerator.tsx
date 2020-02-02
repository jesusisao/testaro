import React, { useState, useEffect } from "react";
import "./NameGenerator.scss";
import "../Common/common.scss";
import { createNumroInstances } from "./numro";
import { createRandomHumanInstances } from "./humanNames";
import ParamBox from "../Common/ParamBox";

const generateDoms = (genNum: number) => {
  const humanInstances = createRandomHumanInstances(genNum);
  const items = [];
  for (const [i, instance] of humanInstances.entries()) {
    items.push(
      <li key={"instance" + i}>
        <input readOnly type="number" defaultValue={i + 1} />
        <input readOnly type="text" defaultValue={instance.familyName} />
        <input readOnly type="text" defaultValue={instance.givenName} />
        <input readOnly type="text" defaultValue={instance.familyNameKana} />
        <input readOnly type="text" defaultValue={instance.givenNameKana} />
        <input readOnly type="text" defaultValue={instance.sex} />
      </li>
    );
  }

  return <ul className="instance-records">{items}</ul>;
};

const NameGenerator: React.FC = () => {
  const [pattern, setPattern] = useState("人名");
  const [genNum, setGenNum] = useState(5);
  const [genStr, setGenStr] = useState("");

  const copyToClipboard = (str: string): void => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(str);
    }
  };

  const generate = (): void => {
    const original = genNum;
    setGenNum(0);
    setTimeout(() => {
      setGenNum(original);
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
            生成
          </button>
        </ParamBox>
      </div>
      {generateDoms(genNum)}
    </div>
  );
};

export default NameGenerator;
