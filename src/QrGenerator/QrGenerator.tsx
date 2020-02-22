import React, { useState, useRef } from "react";
import "./QrGenerator.scss";
import "../Common/common.scss";
import ParamBox from "../Common/ParamBox";
import QRCode from "qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const QrGenerator: React.FC = () => {
  const [code, setCode] = useState("");

  const canvasRef = useRef(null);

  const generate = (): void => {
    if (code.length === 0) {
      alert("コード長が短すぎます");
      return;
    }
    QRCode.toCanvas(canvasRef.current, code, function(error) {
      if (error) console.error(error);
      console.log("success!");
    });
  };

  const downloadImage = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas: any = canvasRef.current;
    const link = document.createElement("a");
    link.download = `${code}.png`;
    link.href = canvas.toDataURL(`image/png`);
    link.click();
  };

  const generateAndDownload = (): void => {
    generate();
    downloadImage();
  };

  return (
    <div className="QrGenerator">
      <h1 className="page-title">QRコード生成</h1>
      <div>
        <ParamBox labelName="QR用文字列">
          <input
            type="text"
            defaultValue={code}
            onChange={(e): void => setCode(e.target.value)}
          ></input>
        </ParamBox>

        <ParamBox>
          <button className="testaro-button" onClick={generate}>
            生成
          </button>
        </ParamBox>
        <ParamBox>
          <button className="testaro-button" onClick={generateAndDownload}>
            生成してダウンロード
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </button>
        </ParamBox>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default QrGenerator;
