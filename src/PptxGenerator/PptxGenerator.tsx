import React, { useState } from "react";
import "./PptxGenerator.scss";
import "../Common/common.scss";
import { sleep, replaceVariable } from "../Common/util";
import ParamBox from "../Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import pptxgen from "pptxgenjs";

const PptxGenerator: React.FC = () => {
  const [pptxContent, setPptxContent] = useState("Dummy PPTX #{count}");
  const [fileName, setFileName] = useState("dummy_#{count}");
  const [genNum, setGenNum] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const generatePptx = (num: number): void => {
    // 1. Create a new Presentation
    const pres = new pptxgen();

    // 2. Add a Slide
    const slide = pres.addSlide();

    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    const textboxText = replaceVariable(pptxContent, num);
    const textboxOpts: pptxgen.TextPropsOptions = {
      fontSize: 48,
      x: 1,
      y: 2.5,
      color: "000000",
      align: "center"
    };
    slide.addText(textboxText, textboxOpts);

    // 4. Save the Presentation
    pres.writeFile(replaceVariable(fileName, num));
  };

  const generate = async (): Promise<void> => {
    setDownloading(true);
    for (let i = 0; i < genNum; i++) {
      generatePptx(i + 1);
      // あんまり速く大量にDLさせられない
      await sleep(300);
    }
    setDownloading(false);
  };

  return (
    <div className="PptxGenerator">
      <h1 className="page-title">ダミーPPTX生成</h1>
      <p>ダミーのパワポをたくさん生成できます。</p>
      <div className="params-container">
        <div className="param-container">
          <ParamBox labelName="中身の文字">
            <input
              type="text"
              defaultValue={pptxContent}
              disabled={downloading}
              onChange={(e): void => setPptxContent(e.target.value)}
            ></input>
          </ParamBox>
          <ParamBox labelName="ファイル名">
            <input
              type="text"
              defaultValue={fileName}
              disabled={downloading}
              onChange={(e): void => setFileName(e.target.value)}
            ></input>
          </ParamBox>
          <ParamBox labelName="出力枚数">
            <input
              type="number"
              defaultValue={genNum}
              disabled={downloading}
              onChange={(e): void => setGenNum(parseInt(e.target.value))}
            ></input>
          </ParamBox>

          <button
            className="testaro-button"
            disabled={downloading}
            onClick={generate}
          >
            生成してダウンロード
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PptxGenerator;
