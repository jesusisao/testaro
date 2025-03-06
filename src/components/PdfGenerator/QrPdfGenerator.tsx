import React, { useState, useEffect, useMemo } from "react";
import style from "./PdfGenerator.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
// ブラウザでPDFを生成する場合は Virtual file system を使って、その中にフォントのデータが無いといけない
// @ts-expect-error - vfs_fontsが大きすぎてモジュールとして解釈できない
import vfs from "src/lib/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions, Content } from "pdfmake/interfaces";

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

interface QrPdfGeneratorProps {
  qrCodes: string[];
  canvasRefs: React.RefObject<HTMLCanvasElement>[];
}

const QrPdfGenerator: React.FC<QrPdfGeneratorProps> = ({
  qrCodes,
  canvasRefs,
}) => {
  const [fileName, setFileName] = useState("qr_codes");
  const [downloading, setDownloading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // 有効なQRコードのみをフィルタリング
  const validQrCodes = useMemo(() => {
    return qrCodes.filter(
      (code, index) => code !== "" && canvasRefs[index].current
    );
  }, [qrCodes, canvasRefs]);

  // PDFのコンテンツを作成する関数
  const createPdfContent = (): Content[] => {
    const content: Content[] = [];

    // タイトルを追加
    content.push({
      text: "QRコード一覧",
      fontSize: 16,
      alignment: "center",
      margin: [0, 0, 0, 20],
    });

    // QRコードを2列で表示するためのテーブルを作成
    const tableBody = [];
    for (let i = 0; i < validQrCodes.length; i += 2) {
      const row = [];

      // 1列目
      if (i < validQrCodes.length && canvasRefs[i].current) {
        const qrDataUrl = canvasRefs[i].current!.toDataURL("image/png");
        row.push({
          stack: [
            { image: qrDataUrl, width: 150, alignment: "center" },
            {
              text: validQrCodes[i],
              fontSize: 10,
              alignment: "center",
              margin: [0, 5, 0, 15],
            },
          ],
          margin: [0, 10, 10, 0],
        });
      } else {
        row.push({});
      }

      // 2列目
      if (i + 1 < validQrCodes.length && canvasRefs[i + 1].current) {
        const qrDataUrl = canvasRefs[i + 1].current!.toDataURL("image/png");
        row.push({
          stack: [
            { image: qrDataUrl, width: 150, alignment: "center" },
            {
              text: validQrCodes[i + 1],
              fontSize: 10,
              alignment: "center",
              margin: [0, 5, 0, 15],
            },
          ],
          margin: [0, 10, 0, 0],
        });
      } else {
        row.push({});
      }

      tableBody.push(row);
    }

    content.push({
      table: {
        widths: ["*", "*"],
        body: tableBody,
      },
      layout: "noBorders",
    });

    return content;
  };

  // PDFドキュメント定義を作成する関数
  const createDocDefinition = (): TDocumentDefinitions => {
    return {
      content: createPdfContent(),
      defaultStyle: { font: fontName },
      pageSize: "A4",
      pageMargins: [40, 40, 40, 40],
    };
  };

  // プレビュー用のPDFを生成する関数
  const generatePreview = async (): Promise<string> => {
    if (validQrCodes.length === 0) return "";

    const docDefinition = createDocDefinition();
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    return new Promise((resolve) => {
      pdfDocGenerator.getBase64((data) => {
        resolve(data);
      });
    });
  };

  // QRコードが変更されたらプレビューを更新
  useEffect(() => {
    const updatePreview = async () => {
      if (validQrCodes.length > 0) {
        const newBase64 = await generatePreview();
        setPreviewSrc(newBase64);
      } else {
        setPreviewSrc(null);
      }
    };

    updatePreview();
  }, [validQrCodes]);

  const generatePdf = (): void => {
    setDownloading(true);

    try {
      // PDFドキュメントの定義
      const docDefinition = createDocDefinition();

      // PDFを生成してダウンロード
      pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
    } catch (error) {
      console.error("PDF生成エラー:", error);
      alert("PDFの生成中にエラーが発生しました。");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={style.qrPdfGenerator}>
      <div className={commonStyle.paramsOutputsContainer}>
        <div className={commonStyle.paramsContainer}>
          <div className={commonStyle.paramContainer}>
            <ParamBox labelName="PDFファイル名">
              <input
                type="text"
                value={fileName}
                disabled={downloading}
                onChange={(e): void => setFileName(e.target.value)}
              />
            </ParamBox>

            <button
              className={commonStyle.testaroButton}
              disabled={downloading || validQrCodes.length === 0}
              onClick={generatePdf}
            >
              PDFでダウンロード
              <FontAwesomeIcon
                icon={faFileDownload}
                className={commonStyle.icon}
              />
            </button>
          </div>
        </div>

        {validQrCodes.length > 0 && (
          <div className={commonStyle.outputsContainer}>
            <div className={commonStyle.outputContainer}>
              <p className={commonStyle.outputLabel}>
                プレビュー: {`${fileName}.pdf`}
              </p>
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
        )}
      </div>
    </div>
  );
};

export default QrPdfGenerator;
