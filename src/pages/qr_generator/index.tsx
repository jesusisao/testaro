import { useState, createRef, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";
import ParamBox from "src/components/Common/ParamBox";
import QRCode from "qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faTimes } from "@fortawesome/free-solid-svg-icons";

const QrGenerator: NextPage = () => {
  const [codes, setCodes] = useState(["", "", ""]);
  const [canvasRefs, setCanvasRefs] = useState([
    createRef<HTMLCanvasElement>(),
    createRef<HTMLCanvasElement>(),
    createRef<HTMLCanvasElement>(),
  ]);

  const generate = (): void => {
    for (let i = 0; i < codes.length; i++) {
      if (codes[i] === "") {
        // canvasをクリアする。わりと無理やりな実装。
        // QRCode.toCanvasでcanvasのwidth, heightを書き換えるのでここで無理やり最小値に戻す
        QRCode.toCanvas(canvasRefs[i].current, "0");

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const canvasElement = canvasRefs[i].current!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const context = canvasElement.getContext("2d")!;
        context.fillStyle = "rgb(40, 44, 52)";
        context.fillRect(0, 0, canvasElement.height, canvasElement.width);
        continue;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      QRCode.toCanvas(canvasRefs[i].current, codes[i], (error: any) => {
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
        <div className={style.qrList} key={i + ""}>
          <ParamBox labelName="QR用文字列">
            <div className={style.canvasList}>
              <input
                type="text"
                value={code}
                onChange={(e): void => updateCode(i, e.target.value)}
              ></input>
              <button onClick={(): void => removeClicked(i)}>
                <FontAwesomeIcon icon={faTimes} className={commonStyle.icon} />
              </button>
              <button onClick={(): void => generateAndDownload(i)}>
                <FontAwesomeIcon
                  icon={faFileDownload}
                  className={commonStyle.icon}
                />
              </button>
              <canvas
                ref={canvasRefs[i]}
                key={i + ""}
                className={style.qrCanvas}
                width={116}
                height={116}
              ></canvas>
            </div>
          </ParamBox>
        </div>
      );
    }
    return <div>{items}</div>;
  };
  const title = "QRコード生成";

  return (
    <div className={style.page}>
      <Head>
        <title>{title} | Testaro</title>
      </Head>
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <div className={commonStyle.paramsContainer}>
        <div className={commonStyle.paramContainer}>
          {inputList()}

          <button className={commonStyle.testaroButton} onClick={add}>
            項目追加
          </button>

          <button
            className={commonStyle.testaroButton}
            onClick={generate}
            style={{ marginLeft: 5 }}
          >
            生成
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
