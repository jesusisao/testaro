import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import { copyToClipboard } from "src/models/util";
import ParamBox from "src/components/Common/ParamBox";
import { generateManyChars } from "src/models/string";

const StringGenerator: NextPage = () => {
  const [pattern, setPattern] = useState("あアｱｶﾞﾊﾟＡａAa１1亜");
  const [charNum, setCharNum] = useState(500);
  const [genStr, setGenStr] = useState("");
  const [customPattern, setCustomPattern] = useState(false);
  const [patternInput, setPatternInput] = useState("あアｱｶﾞﾊﾟＡａAa１1亜");

  const generate = (): void => {
    const patternToUse = customPattern ? patternInput : pattern;
    const result = generateManyChars(patternToUse, charNum);
    setGenStr(result);
  };

  useEffect(() => {
    if (!customPattern) {
      setPatternInput(pattern);
    }
  }, [pattern, customPattern]);

  const title = "テスト文字列生成";
  const description = "任意の長さの文字列を生成できます。";
  return (
    <div className={style.page}>
      <MetaHeader
        title={title}
        description={description}
        url="/string-generator"
      />
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>
      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
          <ParamBox labelName="手動入力">
            <input
              type="checkbox"
              checked={customPattern}
              onChange={(e): void => setCustomPattern(e.target.checked)}
              className={commonStyle.checkbox}
            ></input>
          </ParamBox>

          {customPattern ? (
            <ParamBox labelName="パターン入力">
              <textarea
                value={patternInput}
                onChange={(e): void => setPatternInput(e.target.value)}
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  paddingTop: "8px",
                }}
              ></textarea>
            </ParamBox>
          ) : (
            <ParamBox labelName="パターン選択">
              <select
                name="pattern"
                id="pattern"
                value={pattern}
                onChange={(e): void => setPattern(e.target.value)}
              >
                <option value="あアｱｶﾞﾊﾟＡａAa１1亜">
                  あアｱｶﾞﾊﾟＡａAa１1亜
                </option>
                <option value="0123456789">0123456789</option>
                <option value="０１２３４５６７８９">
                  ０１２３４５６７８９
                </option>
                <option value="ぜんかくひらがな">ぜんかくひらがな</option>
                <option value="ゼンカクカタカナ">ゼンカクカタカナ</option>
                <option value="ﾊﾝｶｸｶﾀｶﾅﾀﾞｸﾃﾝｲﾘ">ﾊﾝｶｸｶﾀｶﾅﾀﾞｸﾃﾝｲﾘ</option>
                <option value="ABCDEFG">ABCDEFG</option>
                <option value="abcdefg">abcdefg</option>
                <option value="ＡＢＣＤＥＦＧ">ＡＢＣＤＥＦＧ</option>
                <option value="ａｂｃｄｅｆｇ">ａｂｃｄｅｆｇ</option>
                <option value="亜唖娃阿哀愛挨姶逢葵">
                  亜唖娃阿哀愛挨姶逢葵
                </option>
                <option value="XXXXXXXXX*">XXXXXXXXX*</option>
                <option value="○○○○○○○○○●">○○○○○○○○○●</option>
                {/* <option value="🤔😂😊😭😇💪👊✋🙏👏">よく使う絵文字</option> */}
              </select>
            </ParamBox>
          )}
          <ParamBox labelName="文字数">
            <input
              className={commonStyle.textRight}
              type="number"
              defaultValue={charNum}
              onChange={(e): void => setCharNum(parseInt(e.target.value))}
            ></input>
          </ParamBox>

          <button className={commonStyle.testaroButton} onClick={generate}>
            生成
          </button>
        </div>
      </div>
      <div className={commonStyle.outputsContainer}>
        <div className={commonStyle.outputContainer}>
          <p className={commonStyle.outputLabel}>出力</p>
          <textarea
            className={style.outputArea}
            readOnly
            value={genStr}
          ></textarea>
          <div>
            <button
              className={commonStyle.testaroButton}
              onClick={(): void => copyToClipboard(genStr)}
            >
              クリップボードにコピー
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringGenerator;
