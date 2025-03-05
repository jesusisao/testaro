import { useState } from "react";
import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";
type Pattern = "encode" | "decode";

const escapeWithUtf8 = (str: string) => {
  // 文字列を UTF-8 のバイト列に変換
  // 「"あ"」→「new Uint8Array([227, 129, 130])」
  const uint8Array = new TextEncoder().encode(str);
  // 各バイトを対応する文字コードの文字に変換
  // [227, 129, 130] →「"ã\x81\x82"」
  return String.fromCharCode(...uint8Array);
};

const unescapeWithUtf8 = (binaryString: string) => {
  // 文字コードを取得し、UTF-8 のバイト列に変換
  const uint8Array = Uint8Array.from(binaryString, (char) =>
    char.charCodeAt(0)
  );
  // バイト配列を文字列に変換する
  return new TextDecoder().decode(uint8Array);
};

const encodeBase64 = (str: string) => {
  const binaryString = escapeWithUtf8(str);
  // バイナリ文字列をBase64エンコード
  // 「"ã\x81\x82"」→「"44GC"」
  return btoa(binaryString);
};

const decodeBase64 = (base64: string) => {
  // Base64 文字列をバイナリデータを含む文字列にデコード
  const binaryString = atob(base64);
  return unescapeWithUtf8(binaryString);
};

const convertBase64 = (pattern: Pattern, original: string) => {
  try {
    return pattern === "encode"
      ? encodeBase64(original)
      : decodeBase64(original);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.warn(e.message);
    }
    return "(ERROR)";
  }
};

const Base64Decoder: NextPage = () => {
  const [pattern, setPattern] = useState("decode" as Pattern);
  const [originalString, setOriginalString] = useState("SGVsbG8sIFdvcmxkIQ==");

  const output = convertBase64(pattern, originalString);

  const title = "Base64デコーダー";
  const description =
    "Base64の文字列に対してデコード・エンコードを行います。ただし、日本語の文字のようなASCII文字ではない文字は、UTF-8にエスケープして変換します。";

  return (
    <div className={style.page}>
      <MetaHeader
        title={title}
        description={description}
        url="/base64-converter"
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
              <option value="decode">デコード</option>
              <option value="encode">エンコード</option>
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

export default Base64Decoder;
