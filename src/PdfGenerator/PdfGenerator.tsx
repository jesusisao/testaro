import React, { useState } from "react";
import "./PdfGenerator.scss";
import "../Common/common.scss";
import { sleep, replaceVariable } from "../Common/util";
import ParamBox from "../Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import vfs from "./lib/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = vfs;
pdfMake.fonts = {
  KosugiMaru: {
    normal: "KosugiMaru-Regular.ttf",
    bold: "KosugiMaru-Regular.ttf",
    italics: "KosugiMaru-Regular.ttf",
    bolditalics: "KosugiMaru-Regular.ttf"
  }
};

const PdfGenerator: React.FC = () => {
  const [pdfContent, setPdfContent] = useState("Dummy PDF #{count}");
  const [fileName, setFileName] = useState("dummy_#{count}");
  const [genNum, setGenNum] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const generatePdf = (num: number): void => {
    const createdPdfContent = replaceVariable(pdfContent, num);
    const docDefinition: TDocumentDefinitions = {
      content: [{ text: createdPdfContent, fontSize: 48, alignment: "center" }],
      defaultStyle: {
        font: "KosugiMaru"
      }
    };
    const createdFileName = replaceVariable(fileName, num);
    pdfMake.createPdf(docDefinition).download(createdFileName);
  };

  const generate = async (): Promise<void> => {
    setDownloading(true);
    for (let i = 0; i < genNum; i++) {
      generatePdf(i + 1);
      // あんまり速く大量にDLさせられない
      await sleep(300);
    }
    setDownloading(false);
  };

  return (
    <div className="PdfGenerator">
      <h1 className="page-title">ダミーPDF生成</h1>
      <p>
        ダミーのPDFファイルをたくさん生成できます。
      </p>
      <div className="params-container">
        <div className="param-container">
          <ParamBox labelName="中身の文字">
            <input
              type="text"
              defaultValue={pdfContent}
              disabled={downloading}
              onChange={(e): void => setPdfContent(e.target.value)}
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
          <ParamBox>
            <button
              className="testaro-button"
              disabled={downloading}
              onClick={generate}
            >
              生成してダウンロード
              <FontAwesomeIcon icon={faFileDownload} className="icon" />
            </button>
          </ParamBox>
        </div>
      </div>
    </div>
  );
};

export default PdfGenerator;
