import React, { useState, createRef, useEffect } from "react";
import "./QrGenerator.scss";
import "../Common/common.scss";
import ParamBox from "../Common/ParamBox";
import QRCode from "qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faTimes } from "@fortawesome/free-solid-svg-icons";

const QrGenerator: React.FC = () => {
  const [codes, setCodes] = useState([""]);
  const [canvasRefs, setCanvasRefs] = useState([
    createRef<HTMLCanvasElement>()
  ]);

  const generate = (): void => {
    for (let i = 0; i < codes.length; i++) {
      if (codes[i] === "") continue;
      QRCode.toCanvas(canvasRefs[i].current, codes[i], function(error) {
        if (error) console.error(error);
        console.log("success!");
      });
    }
  };

  useEffect(() => {
    generate();
  });

  const downloadImage = (index: number): void => {
    const canvas: HTMLCanvasElement | null = canvasRefs[index].current;
    const link = document.createElement("a");
    link.download = `${codes[index]}.png`;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    link.href = canvas!.toDataURL(`image/png`);
    link.click();
  };

  const add = (): void => {
    setCodes([...codes, ""]);
    setCanvasRefs([...canvasRefs, createRef<HTMLCanvasElement>()]);
  };

  const removeClicked = (index: number): void => {
    if (codes.length <= 1) {
      alert("項目は最低1つ必要です。削除できません。");
      return;
    }
    const newCodes = Object.assign([], codes);
    newCodes.splice(index, 1);
    setCodes(newCodes);
  };

  const generateAndDownload = (index: number): void => {
    try {
      generate();
      downloadImage(index);
    } catch (e) {
      alert(e);
    }
  };

  const updateCode = (index: number, value: string): void => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  const inputList = (): JSX.Element => {
    const items = [];
    for (const [i, code] of codes.entries()) {
      items.push(
        <ParamBox labelName="QR用文字列" key={i + ""}>
          <input
            type="text"
            value={code}
            onChange={(e): void => updateCode(i, e.target.value)}
          ></input>
          <button onClick={(): void => removeClicked(i)}>
            <FontAwesomeIcon icon={faTimes} className="icon" />
          </button>
          <button onClick={(): void => generateAndDownload(i)}>
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </button>
          <canvas
            ref={canvasRefs[i]}
            key={i + ""}
            className="qr-canvas"
          ></canvas>
        </ParamBox>
      );
    }
    return <div>{items}</div>;
  };

  return (
    <div className="QrGenerator">
      <h1 className="page-title">QRコード生成</h1>
      <div>
        {inputList()}

        <ParamBox>
          <button className="testaro-button" onClick={add}>
            項目追加
          </button>
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

export default QrGenerator;
