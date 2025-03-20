import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import { copyToClipboard } from "src/models/util";
import ParamBox from "src/components/Common/ParamBox";
import { generateManyChars } from "src/models/string";

// パターンの定義
const patterns = [
  { value: "あアｱｶﾞﾊﾟＡａAa１1亜" },
  { value: "0123456789" },
  { value: "０１２３４５６７８９" },
  { value: "ぜんかくひらがな" },
  { value: "ゼンカクカタカナ" },
  { value: "ﾊﾝｶｸｶﾀｶﾅﾀﾞｸﾃﾝｲﾘ" },
  { value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", label: "ABCDEFG..." },
  { value: "abcdefghijklmnopqrstuvwxyz", label: "abcdefg..." },
  {
    value: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
    label: "ＡＢＣＤＥＦＧ...",
  },
  {
    value: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
    label: "ａｂｃｄｅｆｇ...",
  },
  { value: "亜唖娃阿哀愛挨姶逢葵" },
  { value: "XXXXXXXXX*" },
  { value: "○○○○○○○○○●" },
  { value: "a", label: "URL形式 (https://testaro.netlify.app/?a=aaa...)" },
  {
    value:
      "𠀋𡈽𡌛𡑮𡢽𠮟𡚴𡸴𣇄𣗄𣜿𣝣𣳾𤟱𥒎𥔎𥝱𥧄𥶡𦫿𦹀𧃴𧚄𨉷𨏍𪆐𠂉𠂢𠂤𠆢𠈓𠌫𠎁𠍱𠏹𠑊𠔉𠗖𠘨𠝏𠠇𠠺𠢹𠥼𠦝𠫓𠬝𠵅𠷡𠺕𠹭𠹤𠽟𡈁𡉕𡉻𡉴𡋤𡋗𡋽𡌶𡍄𡏄𡑭𡗗𦰩𡙇𡜆𡝂𡧃𡱖𡴭𡵅𡵸𡵢𡶡𡶜𡶒𡶷𡷠𡸳𡼞𡽶𡿺𢅻𢌞𢎭𢛳𢡛𢢫𢦏𢪸𢭏𢭐𢭆𢰝𢮦𢰤𢷡𣇃𣇵𣆶𣍲𣏓𣏒𣏐𣏤𣏕𣏚𣏟𣑊𣑑𣑋𣑥𣓤𣕚𣖔𣘹𣙇𣘸𣘺𣜜𣜌𣝤𣟿𣟧𣠤𣠽𣪘𣱿𣴀𣵀𣷺𣷹𣷓𣽾𤂖𤄃𤇆𤇾𤎼𤘩𤚥𤢖𤩍𤭖𤭯𤰖𤴔𤸎𤸷𤹪𤺋𥁊𥁕𥄢𥆩𥇥𥇍𥈞𥉌𥐮𥓙𥖧𥞩𥞴𥧔𥫤𥫣𥫱𥮲𥱋𥱤𥸮𥹖𥹥𥹢𥻘𥻂𥻨𥼣𥽜𥿠𥿔𦀌𥿻𦀗𦁠𦃭𦉰𦊆𦍌𣴎𦐂𦙾𦚰𦜝𦣝𦣪𦥑𦥯𦧝𦨞𦩘𦪌𦪷𦱳𦳝𦹥𦾔𦿸𦿶𦿷𧄍𧄹𧏛𧏚𧏾𧐐𧑉𧘕𧘔𧘱𧚓𧜎𧜣𧝒𧦅𧪄𧮳𧮾𧯇𧲸𧶠𧸐𧾷𨂊𨂻𨊂𨋳𨐌𨑕𨕫𨗈𨗉𨛗𨛺𨥉𨥆𨥫𨦇𨦈𨦺𨦻𨨞𨨩𨩱𨩃𨪙𨫍𨫤𨫝𨯁𨯯𨴐𨵱𨷻𨸟𨸶𨺉𨻫𨼲𨿸𩊠𩊱𩒐𩗏𩙿𩛰𩜙𩝐𩣆𩩲𩷛𩸽𩸕𩺊𩹉𩻄𩻩𩻛𩿎𪀯𪀚𪃹𪂂𢈘𪎌𪐷𪗱𪘂𪘚𪚲",
    label: "UTF-8の4byte漢字（𠀋𠮷𩸽...）",
  },
  { value: "🤔😂😊😭😇💪👊✋🙏👏", label: "絵文字（🤔😂😊...）" },
];

const StringGenerator: NextPage = () => {
  const [pattern, setPattern] = useState(patterns[0].value);
  const [charNum, setCharNum] = useState(500);
  const [genStr, setGenStr] = useState("");
  const [customPattern, setCustomPattern] = useState(false);
  const [patternInput, setPatternInput] = useState(patterns[0].value);

  // URL形式かを判定するための苦しい処理
  const isUrlPattern = (customPattern: boolean, pattern: string): boolean => {
    return !customPattern && pattern === "a";
  };

  const generate = (): void => {
    if (isUrlPattern(customPattern, pattern)) {
      const baseStr = "https://testaro.netlify.app/?a=";
      // 文字数からベースURLの長さを引いた数のaを生成
      // ただし最低1文字は生成する
      const aCount = Math.max(1, charNum - baseStr.length);
      const aString = "a".repeat(aCount);
      setGenStr(baseStr + aString);
    } else {
      const patternToUse = customPattern ? patternInput : pattern;
      const result = generateManyChars(patternToUse, charNum);
      setGenStr(result);
    }
  };

  useEffect(() => {
    if (!customPattern) {
      setPatternInput(pattern);
    }
  }, [pattern, customPattern]);

  const title = "テスト文字列生成";
  const description =
    "任意の長さの文字列を生成できます。半角カタカナの濁点・半濁点はそれぞれ1文字として数えられる仕様です。";
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
                {patterns.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label || p.value}
                  </option>
                ))}
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
