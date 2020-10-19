import React, { useState, useEffect, useRef } from "react";
import "./ImageGenerator.scss";
import "../Common/common.scss";
import { sleep, replaceVariable } from "../Common/util";
import ParamBox from "../Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const title = "ダミー画像生成";

const generateRandomColor = (): string => {
  // 255だとデフォルトのフォントのwhiteが見えにくくなることがあるので下げた
  const ran1 = Math.floor(Math.random() * 200);
  const ran2 = Math.floor(Math.random() * 200);
  const ran3 = Math.floor(Math.random() * 200);
  return `rgb(${ran1}, ${ran2}, ${ran3})`;
};

const ImageGenerator: React.FC = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [comment, setComment] = useState("Dummy #{count}");
  const [font, setFont] = useState("serif");
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [doDrawSize, setDoDrawSize] = useState(true);
  const [useRandomColor, setUseRandomColor] = useState(true);
  const [color, setColor] = useState("#009d2d");
  const [fileName, setFileName] = useState("dummy_#{count}");
  const [imageFormat, setImageFormat] = useState("jpg");
  const [genNum, setGenNum] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const canvasRef = useRef(null);

  const getContext = (): CanvasRenderingContext2D => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };

  const draw = (count = 1): void => {
    const ctx: CanvasRenderingContext2D = getContext();

    ctx.fillStyle = useRandomColor ? generateRandomColor() : color;
    ctx.fillRect(0, 0, width, height);

    const replacedComment = replaceVariable(comment, count);

    // フォントによってtextWidthが変わるので注意
    // TODO: 使えるフォントもっと増やす
    ctx.font = `${fontSize}px ${font}`;
    const textWidth = ctx.measureText(replacedComment).width;
    const textHeight = fontSize;
    const fontX = (width - textWidth) / 2;
    const fontY = (height + textHeight) / 2;
    ctx.fillStyle = fontColor;
    ctx.fillText(replacedComment, fontX, fontY);

    if (doDrawSize) {
      ctx.font = `${15}px ${font}`;
      ctx.fillText(`width: ${width}px`, 10, height - 35);
      ctx.fillText(`height: ${height}px`, 10, height - 15);
    }
    ctx.save();
  };

  const createFileFullName = (imageNumber: number): string => {
    const replacedFileName = replaceVariable(fileName, imageNumber);
    return `${replacedFileName}.${imageFormat}`;
  };

  const downloadImage = (imageNumber: number): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas: any = canvasRef.current;
    const link = document.createElement("a");
    link.download = createFileFullName(imageNumber);
    link.href = canvas.toDataURL(`image/${imageFormat}`);
    link.click();
  };

  const downloadsImage = async (): Promise<void> => {
    if (genNum >= 50) {
      const doExec = window.confirm(
        `${genNum}枚の画像をダウンロードしようとしています。本当に宜しいですか？`
      );
      if (!doExec) return;
    }
    setDownloading(true);
    for (let i = 0; i < genNum; i++) {
      draw(i + 1);
      downloadImage(i + 1);
      // あんまり速く大量にDLさせられない
      await sleep(300);
    }
    setDownloading(false);
  };

  useEffect(() => {
    draw();
  });

  return (
    <div className="ImageGenerator">
      <h1 className="page-title">{title}</h1>
      <p>
        出力枚数を指定することで、大量のダミー画像を一括でダウンロード可能です。
      </p>
      <div className="params-container">
        <div className="param-container">
          <span className="param-label">画像パラメータ</span>
          <ParamBox labelName="幅">
            <input
              className="text-right"
              type="number"
              defaultValue={width}
              disabled={downloading}
              onChange={(e): void => setWidth(parseInt(e.target.value))}
            ></input>
          </ParamBox>
          <ParamBox labelName="高さ">
            <input
              className="text-right"
              type="number"
              defaultValue={height}
              disabled={downloading}
              onChange={(e): void => setHeight(parseInt(e.target.value))}
            ></input>
          </ParamBox>
          <ParamBox labelName="画像内の文字">
            <input
              type="text"
              defaultValue={comment}
              disabled={downloading}
              onChange={(e): void => setComment(e.target.value)}
            ></input>
          </ParamBox>
          <ParamBox labelName="フォント">
            <select
              defaultValue={font}
              disabled={downloading}
              onChange={(e): void => setFont(e.target.value)}
            >
              <option value="serif">serif</option>
              <option value="sans-serif">sans-serif</option>
              <option value="monospace">monospace</option>
            </select>
          </ParamBox>
          <ParamBox labelName="文字色">
            <input
              type="color"
              defaultValue={fontColor}
              disabled={downloading}
              onChange={(e): void => setFontColor(e.target.value)}
            ></input>
          </ParamBox>
          <ParamBox labelName="文字サイズ">
            <input
              className="text-right"
              type="number"
              value={fontSize}
              disabled={downloading}
              onChange={(e): void => setFontSize(parseInt(e.target.value))}
            ></input>
            <br />
            <input
              type="range"
              value={fontSize}
              min="1"
              max="300"
              disabled={downloading}
              onChange={(e): void => setFontSize(parseInt(e.target.value))}
            ></input>
          </ParamBox>
          <ParamBox labelName="高さと幅を画像に書き込む">
            <input
              type="checkbox"
              defaultChecked={doDrawSize}
              disabled={downloading}
              onChange={(e): void => setDoDrawSize(e.target.checked)}
            ></input>
          </ParamBox>
          <ParamBox labelName="背景色をランダムにする">
            <input
              type="checkbox"
              defaultChecked={useRandomColor}
              disabled={downloading}
              onChange={(e): void => setUseRandomColor(e.target.checked)}
            ></input>
          </ParamBox>
          {!useRandomColor && (
            <ParamBox labelName="背景色">
              <input
                type="color"
                defaultValue={color}
                disabled={useRandomColor || downloading}
                onChange={(e): void => setColor(e.target.value)}
              ></input>
            </ParamBox>
          )}

          <button
            className="testaro-button"
            disabled={downloading}
            onClick={(): void => draw()}
          >
            再生成
          </button>

        </div>

        <div className="param-container">
          <span className="param-label">ファイルパラメータ</span>
          <ParamBox labelName="ファイル名">
            <input
              type="text"
              defaultValue={fileName}
              disabled={downloading}
              onChange={(e): void => setFileName(e.target.value)}
            ></input>
          </ParamBox>
          <ParamBox labelName="画像の形式">
            <select
              defaultValue={imageFormat}
              disabled={downloading}
              onChange={(e): void => setImageFormat(e.target.value)}
            >
              <option value="jpg">jpg</option>
              <option value="jpeg">jpeg</option>
              <option value="png">png</option>
              <option value="gif">gif</option>
            </select>
          </ParamBox>
          <ParamBox labelName="出力枚数">
            <input
              className="text-right"
              type="number"
              defaultValue={genNum}
              disabled={downloading}
              onChange={(e): void => setGenNum(parseInt(e.target.value))}
            ></input>
          </ParamBox>
          <button
            className="testaro-button"
            disabled={downloading}
            onClick={downloadsImage}
          >
            生成してダウンロード
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </button>
        </div>
      </div>

      <div className="outputs-container">
        <div className="output-container">
          <label className="canvasLabel" htmlFor="canvas">
            ファイル名（プレビュー）: {createFileFullName(1)}
          </label>
          <canvas id="canvas" ref={canvasRef} width={width} height={height} />
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
