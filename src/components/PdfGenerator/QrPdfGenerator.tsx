import React, { useState, useEffect, useMemo } from "react";
import style from "./PdfGenerator.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { sleep } from "src/models/util";
// ブラウザでPDFを生成する場合は Virtual file system を使って、その中にフォントのデータが無いといけない
import vfs from "src/lib/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions, Content } from "pdfmake/interfaces";

// arrをn個の配列（以下result）に分割する。
// 例えば、n=2の時、arrの1番目は1つ目のresultに、arrの2番目は2つ目のresultにローテーションで格納され、arrの3番目は1つ目のresultに格納される。
// arr = [1, 2, 3, 4]でn = 2の時、resultは[[1, 3], [2, 4]]になる
function distributeIntoSlices<T>(arr: T[], n: number): T[][] {
  if (n <= 0) throw new Error("n must be greater than 0");
  const result: T[][] = Array.from({ length: n }, () => []);
  arr.forEach((item, index) => {
    result[index % n].push(item);
  });
  return result;
}

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
  const validQrCodeAndIndexes = useMemo(() => {
    return qrCodes
      .map((code, index) => {
        return { code, index };
      })
      .filter(
        (codeIndexHash) =>
          codeIndexHash.code !== "" && canvasRefs[codeIndexHash.index].current
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

    if (validQrCodeAndIndexes.length === 0) return content;

    // QRコードを2列で表示するためのテーブルを作成
    const tableBody = [];

    const row = [];
    for (const qrCodeAndIndex of validQrCodeAndIndexes) {
      const canvasCurrentRef = canvasRefs[qrCodeAndIndex.index].current;
      if (!canvasCurrentRef) continue;
      const qrDataUrl = canvasCurrentRef.toDataURL("image/png");
      row.push({
        stack: [
          { image: qrDataUrl, width: 150, alignment: "center" },
          {
            text: qrCodeAndIndex.code,
            fontSize: 10,
            alignment: "center",
          },
        ],
      });
    }
    tableBody.push(distributeIntoSlices(row, 2));

    content.push({
      table: {
        widths: [250, 250],
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
      pageMargins: [20, 20, 20, 20],
    };
  };

  // プレビュー用のPDFを生成する関数
  const generatePreview = async (): Promise<string> => {
    // 少し待ってcanvasの描画が完了するのを待つ
    await sleep(500);

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
      const newBase64 = await generatePreview();
      setPreviewSrc(newBase64);
    };

    updatePreview();
  }, [validQrCodeAndIndexes]);

  const generatePdf = async (): Promise<void> => {
    setDownloading(true);

    try {
      // 少し待ってcanvasの描画が完了するのを待つ
      await sleep(500);

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
            <span className={commonStyle.paramLabel}>ファイルパラメータ</span>
            <div style={{ marginTop: "8px" }}>
              <ParamBox labelName="PDFファイル名">
                <input
                  type="text"
                  value={fileName}
                  disabled={downloading}
                  onChange={(e): void => setFileName(e.target.value)}
                />
              </ParamBox>
            </div>

            <button
              className={commonStyle.testaroButton}
              disabled={downloading || validQrCodeAndIndexes.length === 0}
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
      </div>
    </div>
  );
};

export default QrPdfGenerator;
