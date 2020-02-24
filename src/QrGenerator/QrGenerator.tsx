import React, { useState, createRef } from "react";
import "./QrGenerator.scss";
import "../Common/common.scss";
import ParamBox from "../Common/ParamBox";
import QRCode from "qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faCheck } from "@fortawesome/free-solid-svg-icons";

const QrGenerator: React.FC = () => {
  const [codes, setCodes] = useState([""]);
  const [canvasRefs, setCanvasRefs] = useState([
    createRef<HTMLCanvasElement>()
  ]);
  // const elementsRef = useRef(codes.map(() => createRef<HTMLCanvasElement>()));

  const generate = (): void => {
    const containZeroLength: boolean = codes.reduce(
      (accumulator: boolean, el: string) => el.length === 0 || accumulator,
      false
    );
    if (containZeroLength) {
      alert("空欄の項目が存在しています。");
      return;
    }

    for (let i = 0; i < codes.length; i++) {
      QRCode.toCanvas(canvasRefs[i].current, codes[i], function(error) {
        if (error) console.error(error);
        console.log("success!");
      });
    }
  };

  const downloadImage = (index: number): void => {
    const canvas: HTMLCanvasElement | null = canvasRefs[index].current;
    const link = document.createElement("a");
    link.download = `${codes[index]}.png`;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    link.href = canvas!.toDataURL(`image/png`);
    link.click();
  };

  const generateAndDownload = (index: number): void => {
    generate();
    downloadImage(index);
  };

  const add = (): void => {
    setCodes([...codes, ""]);
    setCanvasRefs([...canvasRefs, createRef<HTMLCanvasElement>()]);
  };

  const remove = (index: number): void => {
    if (codes.length <= 1) {
      alert("項目は最低1つ必要です。削除できません。");
    }
    const newCodes = Object.assign([], codes);
    const a = newCodes.splice(index, 1);
    console.warn(a);
    setCodes(newCodes);
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
          <button onClick={(): void => remove(i)}>
            <FontAwesomeIcon icon={faCheck} className="icon" />
          </button>
          <button onClick={(): void => generateAndDownload(i)}>
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </button>
        </ParamBox>
      );
    }
    return <div>{items}</div>;
  };

  const canvasList = (): JSX.Element => {
    const items = [];
    for (let i = 0; i < codes.length; i++) {
      items.push(<canvas ref={canvasRefs[i]} key={i + ""}></canvas>);
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

        {canvasList()}
      </div>
    </div>
  );
};

export default QrGenerator;
