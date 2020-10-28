import { useState } from "react";
import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";

type Pattern = "decode" | "encode";

const UriDecoder: NextPage = () => {
  const [pattern, setPattern] = useState("decode" as Pattern);
  const [originalUri, setOriginalUri] = useState("");

  const output1 =
    pattern === "decode" ? decodeURI(originalUri) : encodeURI(originalUri);
  const output2 =
    pattern === "decode"
      ? decodeURIComponent(originalUri)
      : encodeURIComponent(originalUri);
  const title = "URIデコーダー";
  const description = "「%」が沢山ついたURLなどを解読する時に使えます。";

  return (
    <div className={style.page}>
      <MetaHeader title={title} description={description} url="/uri-decoder" />
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>
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
