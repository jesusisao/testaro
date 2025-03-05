import { useState, useEffect } from "react";
import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import commonStyle from "styles/common.module.scss";
import style from "./index.module.scss";
import ParamBox from "src/components/Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { copyToClipboard } from "src/models/util";

const RandomStringGenerator: NextPage = () => {
  const [length, setLength] = useState(16);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [generatedStrings, setGeneratedStrings] = useState<string[]>([]);

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const generateRandomString = (len: number): string => {
    let chars = "";
    if (useUppercase) chars += uppercaseChars;
    if (useLowercase) chars += lowercaseChars;
    if (useNumbers) chars += numberChars;
    if (useSymbols) chars += symbolChars;

    // 少なくとも1つのオプションが選択されていることを確認
    if (chars.length === 0) {
      chars = lowercaseChars; // デフォルトで小文字を使用
    }

    let result = "";
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  };

  const generateStrings = (): void => {
    const newStrings = [];
    for (let i = 0; i < 8; i++) {
      newStrings.push(generateRandomString(length));
    }
    setGeneratedStrings(newStrings);
  };

  useEffect(() => {
    generateStrings();
  }, []);

  const title = "ランダム文字列生成";
  const description =
    "選択された文字種でランダムな文字列を生成できます。生成された文字列をクリックすると、クリップボードにコピーされます。";

  return (
    <div className={style.page}>
      <MetaHeader
        title={title}
        description={description}
        url="/random-string-generator"
      />
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>

      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
          <ParamBox labelName="文字数">
            <div>
              <input
                className={commonStyle.textRight}
                type="number"
                min="1"
                max="30"
                value={length}
                onChange={(e): void => setLength(parseInt(e.target.value))}
              ></input>
              <br />
              <input
                type="range"
                value={length}
                min="1"
                max="30"
                onChange={(e): void => setLength(parseInt(e.target.value))}
                style={{
                  margin: "0 8px",
                }}
              ></input>
            </div>
          </ParamBox>

          <ParamBox labelName="数字">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e): void => setUseNumbers(e.target.checked)}
              className={commonStyle.checkbox}
            ></input>
          </ParamBox>

          <ParamBox labelName="英字（小文字）">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={(e): void => setUseLowercase(e.target.checked)}
              className={commonStyle.checkbox}
            ></input>
          </ParamBox>

          <ParamBox labelName="英字（大文字）">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={(e): void => setUseUppercase(e.target.checked)}
              className={commonStyle.checkbox}
            ></input>
          </ParamBox>

          <ParamBox labelName="記号">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e): void => setUseSymbols(e.target.checked)}
              className={commonStyle.checkbox}
            ></input>
          </ParamBox>

          <button
            className={commonStyle.testaroButton}
            onClick={generateStrings}
          >
            再生成
            <FontAwesomeIcon icon={faRedo} className={commonStyle.icon} />
          </button>
        </div>
      </div>

      <div className={commonStyle.outputsContainer}>
        <div className={commonStyle.outputContainer}>
          <p className={commonStyle.outputLabel}>出力</p>
          <div className={style.stringGrid}>
            {generatedStrings.map((str, index) => (
              <div
                key={index}
                className={style.stringItem}
                onClick={() => copyToClipboard(str)}
              >
                <span>{str}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomStringGenerator;
