import React, { useState, useEffect } from "react";
import style from "./PdfGenerator.module.scss";
import commonStyle from "styles/common.module.scss";
import { sleep } from "src/models/util";
import { replaceVariable } from "src/models/string";
import ParamBox from "src/components/Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
// ブラウザでPDFを生成する場合は Virtual file system を使って、その中にフォントのデータが無いといけない
import vfs from "src/lib/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

const fontName = "KosugiMaru";
const fontFileName = `${fontName}-Regular.ttf`;
pdfMake.vfs = vfs;
pdfMake.fonts = {
  KosugiMaru: {
    normal: fontFileName,
    bold: fontFileName,
    italics: fontFileName,
    bolditalics: fontFileName,
  },
};

const PdfGenerator: React.FC = () => {
  const [pdfContent, setPdfContent] = useState("Dummy PDF #{count}");
  const [fileName, setFileName] = useState("dummy_#{count}");
  const [genNum, setGenNum] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewSrc = async () => {
      const newSrc = await generatePreview();
      setPreviewSrc(newSrc);
    };
    fetchPreviewSrc();
  }, []);

  const generatePdf = (num: number): void => {
    const createdPdfContent = replaceVariable(pdfContent, num);
    const docDefinition: TDocumentDefinitions = {
      content: [{ text: createdPdfContent, fontSize: 48, alignment: "center" }],
      defaultStyle: {
        font: fontName,
      },
    };
    const createdFileName = `${replaceVariable(fileName, num)}.pdf`;
    pdfMake.createPdf(docDefinition).download(createdFileName);
  };

  const generatePreview = (): Promise<string> => {
    const createdPdfContent = replaceVariable(pdfContent, 1);
    const docDefinition: TDocumentDefinitions = {
      content: [{ text: createdPdfContent, fontSize: 48, alignment: "center" }],
      defaultStyle: {
        font: fontName,
      },
    };
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    return new Promise((resolve) => {
      pdfDocGenerator.getBase64((data) => {
        resolve(`data:application/pdf;base64,${data}`);
      });
    });
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
      <div className={commonStyle.paramsOutputsContainer}>
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

        <div className={commonStyle.outputsContainer}>
          <div className={commonStyle.outputContainer}>
            <label className={style.previewLabel} htmlFor="preview">
              プレビュー
            </label>
            <embed
              id="preview"
              type="application/pdf"
              src={previewSrc ? previewSrc : ""}
              className={style.previewPdf}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfGenerator;
