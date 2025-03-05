import { useState } from "react";
import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";

type Pattern = "decode" | "encode";

const outputUri1 = (pattern: Pattern, originalUri: string) => {
  try {
    return pattern === "decode"
      ? decodeURI(originalUri)
      : encodeURI(originalUri);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.warn(e.message);
    }
    return "(ERROR)";
  }
};

const outputUri2 = (pattern: Pattern, originalUri: string) => {
  try {
    return pattern === "decode"
      ? decodeURIComponent(originalUri)
      : encodeURIComponent(originalUri);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.warn(e.message);
    }
    return "(ERROR)";
  }
};

const UriDecoder: NextPage = () => {
  const [pattern, setPattern] = useState("decode" as Pattern);
  const [originalUri, setOriginalUri] = useState(
    "https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%BC%E3%82%BB%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0"
  );

  const output1 = outputUri1(pattern, originalUri);
  const output2 = outputUri2(pattern, originalUri);

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
          <textarea
            readOnly
            className={style.disabledTextarea}
            value={output1}
          ></textarea>
        </div>
        <div className={commonStyle.outputContainer}>
          <p>出力2: {pattern}URIComponent()</p>
          <textarea
            readOnly
            className={style.disabledTextarea}
            value={output2}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default UriDecoder;
