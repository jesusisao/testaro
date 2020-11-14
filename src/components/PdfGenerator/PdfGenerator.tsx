import React, { useState } from "react";
import style from "./PdfGenerator.module.scss";
import commonStyle from "styles/common.module.scss";
import { sleep, replaceVariable } from "src/models/util";
import ParamBox from "src/components/Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import vfs from "src/lib/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = vfs;
pdfMake.fonts = {
  KosugiMaru: {
    normal: "KosugiMaru-Regular.ttf",
    bold: "KosugiMaru-Regular.ttf",
    italics: "KosugiMaru-Regular.ttf",
    bolditalics: "KosugiMaru-Regular.ttf",
  },
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
        font: "KosugiMaru",
      },
    };
    const createdFileName = `${replaceVariable(fileName, num)}.pdf`;
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

  const title = "ダミーPDF生成";
  const description = "異なる文字の書かれたテスト用のPDFを大量に生成できます。";

  return (
    <div className={style.page}>
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>
      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
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

          <button
            className={commonStyle.testaroButton}
            disabled={downloading}
            onClick={generate}
          >
            生成してダウンロード
            <FontAwesomeIcon
              icon={faFileDownload}
              className={commonStyle.icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfGenerator;
