import React, { useState } from "react";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";

type Pattern = "decode" | "encode";

const UriDecoder: React.FC = () => {
  const [pattern, setPattern] = useState("decode" as Pattern);
  const [originalUri, setOriginalUri] = useState("");

  const output1 =
    pattern === "decode" ? decodeURI(originalUri) : encodeURI(originalUri);
  const output2 =
    pattern === "decode"
      ? decodeURIComponent(originalUri)
      : encodeURIComponent(originalUri);

  return (
    <div className={style.page}>
      <h1 className={commonStyle.pageTitle}>URIデコーダー</h1>
      <p>「%」が沢山ついたURLなどを解読する時に使えます。</p>
      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
          <p>URI入力</p>
          <ParamBox labelName="パターン">
            <select
              name="pattern"
              id="pattern"
              onChange={(e): void => setPattern(e.target.value as Pattern)}
            >
              <option value="decode">デコード</option>
              <option value="encode">エンコード</option>
            </select>
          </ParamBox>
          <textarea
            defaultValue={originalUri}
            onChange={(e): void => setOriginalUri(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className={commonStyle.outputsContainer}>
        <div className={commonStyle.outputContainer}>
          <p>出力1: {pattern}URI()</p>
          <textarea readOnly value={output1}></textarea>

          <p>出力2: {pattern}URIComponent()</p>
          <textarea readOnly value={output2}></textarea>
        </div>
      </div>
    </div>
  );
};

export default UriDecoder;