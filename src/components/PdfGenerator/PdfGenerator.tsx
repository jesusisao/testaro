import React, { useState, useEffect, useDeferredValue } from "react";
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
  const deferredPdfContent = useDeferredValue(pdfContent); // 低優先度で更新
  const [fileName, setFileName] = useState("dummy_#{count}");
  const [genNum, setGenNum] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    const calcPreviewSrc = async () => {
      const newBase64 = await generatePreview(deferredPdfContent);
      setPreviewSrc(newBase64);
    };
    calcPreviewSrc();
  }, [deferredPdfContent]);

  const createFileFullName = (num: number) => {
    return `${replaceVariable(fileName, num)}.pdf`;
  };

  const generatePdf = (num: number): void => {
    const createdPdfContent = replaceVariable(pdfContent, num);
    const docDefinition: TDocumentDefinitions = {
      content: [{ text: createdPdfContent, fontSize: 48, alignment: "center" }],
      defaultStyle: { font: fontName },
    };
    pdfMake.createPdf(docDefinition).download(createFileFullName(num));
  };

  const generatePreview = (content: string): Promise<string> => {
    const createdPdfContent = replaceVariable(content, 1);
    const docDefinition: TDocumentDefinitions = {
      content: [{ text: createdPdfContent, fontSize: 48, alignment: "center" }],
      defaultStyle: { font: fontName },
    };
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    return new Promise((resolve) => {
      pdfDocGenerator.getBase64((data) => {
        resolve(data);
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
            <ParamBox labelName="PDF内の文字">
              <textarea
                defaultValue={pdfContent}
                disabled={downloading}
                onChange={(e): void => setPdfContent(e.target.value)}
                style={{ backgroundColor: "rgba(0,0,0,0)", paddingTop: "8px" }}
              ></textarea>
            </ParamBox>
            <ParamBox labelName="ファイル名">
              <input
                type="text"
                defaultValue={fileName}
                disabled={downloading}
                onChange={(e): void => setFileName(e.target.value)}
              />
            </ParamBox>
            <ParamBox labelName="出力枚数">
              <input
                type="number"
                defaultValue={genNum}
                disabled={downloading}
                onChange={(e): void => setGenNum(parseInt(e.target.value))}
              />
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
              ファイル名（プレビュー）: {createFileFullName(1)}
            </label>
            {previewSrc ? (
              <embed
                id="preview"
                type="application/pdf"
                src={`data:application/pdf;base64,${previewSrc}`}
                className={style.previewPdf}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfGenerator;
