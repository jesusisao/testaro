import React, { useState, useEffect, useRef } from "react";
import "./ImageGenerator.scss";
import "../Common/common.scss";
import ParamBox from "../Common/ParamBox";

const title = "ダミー画像生成";

const sleep = (msec: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, msec));

const generateRandomColor = (): string => {
  // 255だとデフォルトのフォントのwhiteが見えにくくなることがあるので下げた
  const ran1 = Math.floor(Math.random() * 200);
  const ran2 = Math.floor(Math.random() * 200);
  const ran3 = Math.floor(Math.random() * 200);
  return `rgb(${ran1}, ${ran2}, ${ran3})`;
};

export const replaceVariable = (original: string, num: number): string => {
  const re = /#{.+?}/;
  const matches = original.match(re);
  if (matches === null) return original;
  const matchesNames = matches.map(str => str.slice(2).slice(0, -1));
  let copied = original.slice();
  for (const match of matchesNames) {
    if (match === "count") {
      copied = copied.replace("#{count}", num.toString());
    }
  }
  return copied;
};

const ImageGenerator: React.FC = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [genNum, setGenNum] = useState(1);
  const [comment, setComment] = useState("Dummy #{count}");
  const [font, setFont] = useState("serif");
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [useRandomColor, setUseRandomColor] = useState(true);
  const [color, setColor] = useState("#009d2d");
  const [fileNamePrefix, setFileNamePrefix] = useState("dummy_img");
  const [imageFormat, setImageFormat] = useState("jpg");
  const [downloading, setDownloading] = useState(false);
  const [doDrawSize, setDoDrawSize] = useState(true);

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

  const downloadImage = (
    imageNumber: number,
    useNumSplitter: boolean
  ): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas: any = canvasRef.current;
    const link = document.createElement("a");
    const fileName = useNumSplitter
      ? `${fileNamePrefix}_${imageNumber}.${imageFormat}`
      : `${fileNamePrefix}.${imageFormat}`;
    link.download = fileName;
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
    const useNumSplitter = genNum > 1;
    for (let i = 0; i < genNum; i++) {
      draw(i + 1);
      downloadImage(i + 1, useNumSplitter);
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
      <h1>{title}</h1>
      <div className="paras-container">
        <div>
          <h2>画像パラメータ</h2>
          <ParamBox labelName="幅">
            <input
              type="number"
              defaultValue={width}
              disabled={downloading}
              onChange={(e): void => setWidth(parseInt(e.target.value))}
            ></input>
          </ParamBox>
          <ParamBox labelName="高さ">
            <input
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
          <ParamBox>
            <button
              className="testaro-button"
              disabled={downloading}
              onClick={(): void => draw()}
            >
              再生成
            </button>
          </ParamBox>
        </div>

        <div>
          <h2>ファイルパラメータ</h2>
          <ParamBox labelName="出力枚数">
            <input
              type="number"
              defaultValue={genNum}
              disabled={downloading}
              onChange={(e): void => setGenNum(parseInt(e.target.value))}
            ></input>
          </ParamBox>
          <ParamBox labelName="ファイル名">
            <input
              type="text"
              defaultValue={fileNamePrefix}
              disabled={downloading}
              onChange={(e): void => setFileNamePrefix(e.target.value)}
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
          <ParamBox>
            <button
              className="testaro-button"
              disabled={downloading}
              onClick={downloadsImage}
            >
              画像をダウンロード
            </button>
          </ParamBox>
        </div>
      </div>

      <canvas
        className="canvas"
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};

export default ImageGenerator;
