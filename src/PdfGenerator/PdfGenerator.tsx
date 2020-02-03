import React, { useState } from "react";
import "./PdfGenerator.scss";
import "../Common/common.scss";
import ParamBox from "../Common/ParamBox";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfGenerator: React.FC = () => {
  const [pdfContent, setPdfContent] = useState("Dummy PDF");

  const generate = (): void => {
    const docDefinition = {
      content: [{ text: pdfContent, fontSize: 48, alignment: "center" }]
    };
    pdfMake.createPdf(docDefinition).download("dummy");
    console.log("generated.");
  };

  return (
    <div className="PdfGenerator">
      <h1>ダミーPDF生成</h1>
      <div>
        <ParamBox labelName="中身の文字">
          <input
            type="text"
            defaultValue={pdfContent}
            onChange={(e): void => setPdfContent(e.target.value)}
          ></input>
        </ParamBox>
        <ParamBox>
          <button className="testaro-button" onClick={generate}>
            生成
          </button>
        </ParamBox>
      </div>
    </div>
  );
};

export default PdfGenerator;
