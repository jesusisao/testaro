import { useState } from "react";
import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";

type Pattern = "escape" | "unescape";

const change = (pattern: Pattern, original: string) => {
  try {
    return pattern === "escape"
      ? JSON.stringify(original).slice(1, -1)
      : JSON.parse(`"${original}"`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.warn(e.message);
    }
    return "(ERROR)";
  }
};

const UriDecoder: NextPage = () => {
  const [pattern, setPattern] = useState("unescape" as Pattern);
  const [originalString, setOriginalString] = useState(
    "\\u30C6\\u30B9\\u30BF\\u30ED\\u30A6"
  );

  const output = change(pattern, originalString);

  const title = "Unicodeエスケープシーケンス変換";
  const description = "「\\u3042」 → 「あ」のように変換します。";

  return (
    <div className={style.page}>
      <MetaHeader
        title={title}
        description={description}
        url="/unicode-escape-sequence"
      />
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>
      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
          <ParamBox labelName="パターン">
            <select
              name="pattern"
              id="pattern"
              onChange={(e): void => setPattern(e.target.value as Pattern)}
            >
              <option value="unescape">unescape</option>
              <option value="escape">escape</option>
            </select>
          </ParamBox>
          <textarea
            defaultValue={originalString}
            onChange={(e): void => setOriginalString(e.target.value)}
            style={{ marginTop: "8px" }}
          ></textarea>
        </div>
      </div>
      <div className={commonStyle.outputsContainer}>
        <div className={commonStyle.outputContainer}>
          <p className={commonStyle.outputLabel}>出力</p>
          <textarea
            readOnly
            className={style.disabledTextarea}
            value={output}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default UriDecoder;
