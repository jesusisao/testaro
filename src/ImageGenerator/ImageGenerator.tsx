import React, { useState, useEffect, useRef } from 'react';
import './ImageGenerator.scss';
import ParamBox from '../Common/ParamBox';

const ImageGenerator: React.FC = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [genNum, setGenNum] = useState(1);
  const [comment, setComment] = useState('Dummy #{count}');
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
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };

  const draw = (count: number = 1) => {
    const ctx: CanvasRenderingContext2D = getContext();

    ctx.fillStyle = useRandomColor ? generateRandomColor() : color;
    ctx.fillRect(0, 0, width, height);

    const replacedComment = replaceVariable(comment, count);

    // フォントによってtextWidthが変わるので注意
    ctx.font = `${fontSize}px ${font}`;
    const textWidth = ctx.measureText( replacedComment ).width;
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
  }

  const downloadsImage = async () => {
    if (genNum >= 50) {
      const doExec = window.confirm(`${genNum}枚の画像をダウンロードしようとしています。本当に宜しいですか？`);
      if (!doExec) return;
    }
    setDownloading(true);
    const useNumSplitter = genNum > 1
    for (let i = 0; i < genNum; i++) {
      draw(i + 1)
      downloadImage(i + 1, useNumSplitter);
      // あんまり速く大量にDLさせられない
      await sleep(300);
    }
    setDownloading(false);
  }

  const downloadImage = (imageNumber: number, useNumSplitter: boolean) => {
    const canvas: any = canvasRef.current;
    const link = document.createElement('a');
    const fileName = useNumSplitter
      ? `${fileNamePrefix}_${imageNumber}.${imageFormat}`
      : `${fileNamePrefix}.${imageFormat}`;
    link.download = fileName;
    link.href = canvas.toDataURL(`image/${imageFormat}`);
    link.click();
  }

  useEffect(() => {
    draw()
  })

  return (
    <div className="ImageGenerator">
      <h1>ダミー画像生成</h1>
      <div>
        <ParamBox labelName="幅">
          <input
            type="number"
            defaultValue={width}
            onChange={ e => setWidth(parseInt(e.target.value)) }>
          </input>
        </ParamBox>
        <ParamBox labelName="高さ">
          <input
            type="number"
            defaultValue={height}
            onChange={ e => setHeight(parseInt(e.target.value)) }>
          </input>
        </ParamBox>
        <ParamBox labelName="画像内の文字">
          <input 
            type="text"
            defaultValue={comment}
            onChange={ e => setComment(e.target.value) }>
          </input>
        </ParamBox>
        <ParamBox labelName="フォント">
          <select defaultValue={font} onChange={ e => setFont(e.target.value) }>
            <option value="serif">serif</option>
            <option value="sans-serif">sans-serif</option>
            <option value="monospace">monospace</option>
          </select>
        </ParamBox>
        <ParamBox labelName="文字色">
          <input
            type="color"
            defaultValue={fontColor}
            onChange={ e => setFontColor(e.target.value) }>
          </input>
        </ParamBox>
        <ParamBox labelName="文字サイズ">
          <input
            type="number"
            value={fontSize}
            onChange={ e => setFontSize(parseInt(e.target.value)) }>
          </input>
          <br />
          <input
            type="range"
            value={fontSize}
            min="1"
            max="300"
            onChange={ e => setFontSize(parseInt(e.target.value)) }></input>
        </ParamBox>
        <ParamBox labelName="高さと幅を画像に書き込む">
          <input
            type="checkbox"
            defaultChecked={doDrawSize}
            onChange={ e => setDoDrawSize(e.target.checked) }>
          </input>
        </ParamBox>
        <ParamBox labelName="背景色をランダムにする">
          <input
            type="checkbox"
            defaultChecked={useRandomColor}
            onChange={ e => setUseRandomColor(e.target.checked) }>
          </input>
        </ParamBox>
        {
          !useRandomColor &&
          <ParamBox labelName="背景色">
            <input
              type="color"
              defaultValue={color}
              disabled={useRandomColor}
              onChange={ e => setColor(e.target.value) }>
            </input>
          </ParamBox>
        }
        <button onClick={() => draw()}>再生成</button>
      </div>

      <canvas className="canvas" ref={canvasRef}  width={width} height={height} />

      <div>
        <ParamBox labelName="出力枚数">
          <input
            type="number"
            defaultValue={genNum}
            onChange={ e => setGenNum( parseInt(e.target.value) ) }>
          </input>
        </ParamBox>
        <ParamBox labelName="ファイル名">
          <input
            type="text"
            defaultValue={fileNamePrefix}
            onChange={ e => setFileNamePrefix(e.target.value) }>
          </input>
        </ParamBox>
        <ParamBox labelName="画像の形式">
          <select defaultValue={imageFormat} onChange={ e => setImageFormat(e.target.value) }>
            <option value="jpg">jpg</option>
            <option value="jpeg">jpeg</option>
            <option value="png">png</option>
            <option value="gif">gif</option>
          </select>
        </ParamBox>
        <button onClick={downloadsImage}>画像をダウンロード</button>
      </div>
    </div>
  );
}

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const generateRandomColor = (): string => {
  // 255だとデフォルトのフォントのwhiteが見えにくくなることがあるので下げた
  const ran1 = Math.floor(Math.random() * 200);
  const ran2 = Math.floor(Math.random() * 200);
  const ran3 = Math.floor(Math.random() * 200);
  return `rgb(${ran1}, ${ran2}, ${ran3})`;
}

export const replaceVariable = (original: string, num: number) => {
  const re = /#{.+?}/;
  const matches = original.match(re);
  if (matches === null) return original;
  const matchesNames = matches.map((str) => str.slice(2).slice(0, -1));
  let copied = original.slice();
  for (const match of matchesNames) {
    if (match === "count") {
      copied = copied.replace("#{count}", num.toString())
    }
  }
  return copied
}

export default ImageGenerator;
