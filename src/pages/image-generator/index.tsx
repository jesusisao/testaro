import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import commonStyle from "styles/common.module.scss";
import style from "./index.module.scss";
import { sleep } from "src/models/util";
import { replaceVariable } from "src/models/string";
import ParamBox from "src/components/Common/ParamBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faRedo } from "@fortawesome/free-solid-svg-icons";

type FileType = {
  extension: string;
  type: string;
  compressionRatio: number;
};

type FileTypes = {
  [key: string]: FileType;
};

const fileType: FileTypes = {
  jpg: {
    extension: "jpg",
    type: "image/jpeg",
    compressionRatio: 0.8,
  },
  jpeg: {
    extension: "jpeg",
    type: "image/jpeg",
    compressionRatio: 0.8,
  },
  png: {
    extension: "png",
    type: "image/png",
    compressionRatio: 1,
  },
  gif: {
    extension: "gif",
    type: "image/gif",
    compressionRatio: 1,
  },
};

const generateRandomColor = (): string => {
  // 255だとデフォルトのフォントのwhiteが見えにくくなることがあるので下げた
  const ran1 = Math.floor(Math.random() * 200);
  const ran2 = Math.floor(Math.random() * 200);
  const ran3 = Math.floor(Math.random() * 200);
  return `rgb(${ran1}, ${ran2}, ${ran3})`;
};

const toRadian = (angle: number): number => (angle * Math.PI) / 180;

type XY = {
  x: number;
  y: number;
};

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  xy: XY,
  radius: number,
  color = "rgba(255, 255, 255, 1.0)",
  strokeColor = "rgba(255, 255, 255, 1.0)"
): void => {
  ctx.beginPath();
  ctx.arc(xy.x, xy.y, radius, toRadian(0), toRadian(360), false);
  ctx.strokeStyle = strokeColor; // 枠線の色
  ctx.lineWidth = radius / 2;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
};

const drawTriangle = (
  ctx: CanvasRenderingContext2D,
  xy1: XY,
  xy2: XY,
  xy3: XY,
  color = "rgba(255, 255, 255, 1.0)"
): void => {
  ctx.beginPath();
  ctx.moveTo(xy1.x, xy1.y);
  ctx.lineTo(xy2.x, xy2.y);
  ctx.lineTo(xy3.x, xy3.y);
  ctx.closePath();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.0)"; // 枠線の色
  ctx.stroke();
  ctx.fillStyle = color; // 塗りつぶしの色
  ctx.fill();
};

const drawLine = (
  ctx: CanvasRenderingContext2D,
  xy1: XY,
  xy2: XY,
  color = "rgba(255, 255, 255, 1.0)",
  lineWidth = 10
): void => {
  ctx.beginPath();
  ctx.moveTo(xy1.x, xy1.y);
  ctx.lineTo(xy2.x, xy2.y);
  ctx.closePath();

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color; // 枠線の色
  ctx.stroke();
};

const drawSquareLine = (
  ctx: CanvasRenderingContext2D,
  xy1: XY,
  xy2: XY,
  xy3: XY,
  xy4: XY,
  color = "rgba(255, 255, 255, 1.0)",
  lineWidth = 10
) => {
  drawLine(ctx, xy1, xy2, color, lineWidth);
  drawLine(ctx, xy1, xy3, color, lineWidth);
  drawLine(ctx, xy3, xy4, color, lineWidth);
  drawLine(ctx, xy2, xy4, color, lineWidth);
};

const ImageGenerator: NextPage = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [comment, setComment] = useState("Dummy #{count}");
  const [font, setFont] = useState("serif");
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [doDrawSize, setDoDrawSize] = useState(true);
  const [useRandomColor, setUseRandomColor] = useState(true);
  const [color, setColor] = useState("#009d2d");
  const [useBorder, setUseBorder] = useState(true);

  const [fileName, setFileName] = useState("dummy_#{count}");
  const [selectedImage, setSelectedImage] = useState(
    Object.entries(fileType)[0][0]
  );
  const [genNum, setGenNum] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const [imageLikeIcon, setImageLikeIcon] = useState(false);

  const widthForDraw = width;
  const heightForDraw = imageLikeIcon ? width : height;
  const iconColor = fontColor;

  const canvasRef = useRef(null);

  const getContext = (): CanvasRenderingContext2D => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };

  const draw = (count = 1): void => {
    const ctx: CanvasRenderingContext2D = getContext();
    const randomColor = generateRandomColor();
    const backgroundColor = useRandomColor ? randomColor : color;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, widthForDraw, heightForDraw);

    if (useBorder) {
      drawSquareLine(
        ctx,
        { x: 0, y: 0 },
        { x: 0, y: heightForDraw },
        { x: widthForDraw, y: 0 },
        { x: widthForDraw, y: heightForDraw },
        fontColor
      );
    }

    if (imageLikeIcon) {
      // アイコンのやつ
      const xy1 = { x: widthForDraw / 2, y: heightForDraw * (1 / 3) };
      const xy2 = {
        x: widthForDraw / 2 + widthForDraw / 6,
        y: (heightForDraw * 29) / 30,
      };
      const xy3 = {
        x: widthForDraw / 2 - widthForDraw / 6,
        y: (heightForDraw * 29) / 30,
      };
      drawTriangle(ctx, xy1, xy2, xy3, iconColor);
      drawCircle(
        ctx,
        { x: widthForDraw / 2, y: heightForDraw / 3 },
        widthForDraw / 6,
        iconColor,
        backgroundColor
      );
      ctx.save();
      return;
    }

    // 真ん中に文字書くやつ。改行に対応
    const replacedCommentList = replaceVariable(comment, count).split("\n");
    const lineNum: number = replacedCommentList.length;
    for (const [index, replacedComment] of replacedCommentList.entries()) {
      // フォントによってtextWidthが変わるので注意
      ctx.font = `${fontSize}px ${font}`;
      const textHeight = fontSize;
      const fontX = widthForDraw / 2;
      const fontY =
        (heightForDraw - textHeight * lineNum) / 2 + (1 + index) * textHeight;
      ctx.textAlign = "center" as const;
      ctx.fillStyle = fontColor;
      ctx.fillText(replacedComment, fontX, fontY);
    }

    if (doDrawSize) {
      // 左下にサイズ書くやつ
      ctx.font = `15px ${font}`;
      ctx.textAlign = "start" as const;
      ctx.fillStyle = fontColor;
      ctx.fillText(`width: ${widthForDraw}px`, 10, heightForDraw - 35);
      ctx.fillText(`height: ${heightForDraw}px`, 10, heightForDraw - 15);
    }

    ctx.save();
  };

  const createFileFullName = (imageNumber: number): string => {
    const replacedFileName = replaceVariable(fileName, imageNumber);
    return `${replacedFileName}.${fileType[selectedImage]["extension"]}`;
  };

  const downloadImage = (imageNumber: number): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas: any = canvasRef.current;
    const link = document.createElement("a");
    link.download = createFileFullName(imageNumber);
    link.href = canvas.toDataURL(
      fileType[selectedImage]["type"],
      fileType[selectedImage]["compressionRatio"]
    );
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

  const imageOptions = Object.keys(fileType).map((key) => {
    return (
      <option key={key} value={key}>
        {key}
      </option>
    );
  });

  useEffect(() => {
    draw();
  });

  const title = "ダミー画像生成";
  const description = "任意のサイズのダミー画像を大量に生成できます。";

  return (
    <div className={style.page}>
      <MetaHeader
        title={title}
        description={description}
        url="/image-generator"
      />
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>
      <div className={commonStyle.paramsOutputsContainer}>
        <div className={commonStyle.paramsContainer}>
          <div className={commonStyle.paramContainer}>
            <span className={commonStyle.paramLabel}>画像パラメータ</span>
            <div style={{ marginTop: "8px" }}>
              <ParamBox labelName="ユーザーアイコン">
                <input
                  type="checkbox"
                  defaultChecked={imageLikeIcon}
                  disabled={downloading}
                  onChange={(e): void => setImageLikeIcon(e.target.checked)}
                  className={commonStyle.checkbox}
                ></input>
              </ParamBox>

              <ParamBox labelName={imageLikeIcon ? "幅と高さ" : "幅"}>
                <input
                  className={commonStyle.textRight}
                  type="number"
                  defaultValue={width}
                  disabled={downloading}
                  onChange={(e): void => setWidth(parseInt(e.target.value))}
                ></input>
              </ParamBox>

              {!imageLikeIcon && (
                <ParamBox labelName="高さ">
                  <input
                    className={commonStyle.textRight}
                    type="number"
                    defaultValue={height}
                    disabled={downloading}
                    onChange={(e): void => setHeight(parseInt(e.target.value))}
                  ></input>
                </ParamBox>
              )}

              {!imageLikeIcon && (
                <ParamBox labelName="画像内の文字">
                  <textarea
                    defaultValue={comment}
                    disabled={downloading}
                    onChange={(e): void => setComment(e.target.value)}
                    style={{
                      backgroundColor: "rgba(0,0,0,0)",
                      paddingTop: "8px",
                    }}
                  ></textarea>
                </ParamBox>
              )}

              {!imageLikeIcon && (
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
              )}

              <ParamBox labelName={imageLikeIcon ? "アイコンの色" : "文字色"}>
                <input
                  type="color"
                  defaultValue={fontColor}
                  disabled={downloading}
                  onChange={(e): void => setFontColor(e.target.value)}
                ></input>
              </ParamBox>

              {!imageLikeIcon && (
                <ParamBox labelName="文字サイズ">
                  <div>
                    <input
                      className={commonStyle.textRight}
                      type="number"
                      value={fontSize}
                      disabled={downloading}
                      onChange={(e): void =>
                        setFontSize(parseInt(e.target.value))
                      }
                    ></input>
                    <br />
                    <input
                      type="range"
                      value={fontSize}
                      min="1"
                      max="300"
                      disabled={downloading}
                      onChange={(e): void =>
                        setFontSize(parseInt(e.target.value))
                      }
                      style={{
                        margin: "0 8px",
                      }}
                    ></input>
                  </div>
                </ParamBox>
              )}

              {!imageLikeIcon && (
                <ParamBox labelName="高さと幅を画像に書き込む">
                  <input
                    type="checkbox"
                    defaultChecked={doDrawSize}
                    disabled={downloading}
                    onChange={(e): void => setDoDrawSize(e.target.checked)}
                    className={commonStyle.checkbox}
                  ></input>
                </ParamBox>
              )}

              <ParamBox labelName="背景色をランダムにする">
                <input
                  type="checkbox"
                  defaultChecked={useRandomColor}
                  disabled={downloading}
                  onChange={(e): void => setUseRandomColor(e.target.checked)}
                  className={commonStyle.checkbox}
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

              <ParamBox labelName="枠線をつける">
                <input
                  type="checkbox"
                  defaultChecked={useBorder}
                  disabled={downloading}
                  onChange={(e): void => setUseBorder(e.target.checked)}
                  className={commonStyle.checkbox}
                ></input>
              </ParamBox>
            </div>

            <button
              className={commonStyle.testaroButton}
              disabled={downloading}
              onClick={(): void => draw()}
            >
              再生成
              <FontAwesomeIcon icon={faRedo} className={commonStyle.icon} />
            </button>
          </div>

          <div className={commonStyle.paramContainer}>
            <span className={commonStyle.paramLabel}>ファイルパラメータ</span>
            <div style={{ marginTop: "8px" }}>
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
                  defaultValue={selectedImage}
                  disabled={downloading}
                  onChange={(e): void => setSelectedImage(e.target.value)}
                >
                  {imageOptions}
                </select>
              </ParamBox>
              <ParamBox labelName="出力枚数">
                <input
                  className={commonStyle.textRight}
                  type="number"
                  defaultValue={genNum}
                  disabled={downloading}
                  onChange={(e): void => setGenNum(parseInt(e.target.value))}
                ></input>
              </ParamBox>
            </div>
            <button
              className={commonStyle.testaroButton}
              disabled={downloading}
              onClick={downloadsImage}
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
            <p className={commonStyle.outputLabel}>
              ファイル名（プレビュー）: {createFileFullName(1)}
            </p>
            <canvas
              id="canvas"
              ref={canvasRef}
              width={widthForDraw}
              height={heightForDraw}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
