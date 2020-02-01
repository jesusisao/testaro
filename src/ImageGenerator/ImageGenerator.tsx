import React, { useState, useEffect, useRef } from 'react';
import './ImageGenerator.scss';
import ParamBox from '../Common/ParamBox';

const ImageGenerator: React.FC = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [genNum, setGenNum] = useState(1);
  const [comment, setComment] = useState('テスト画像#{count}');
  const [font, setFont] = useState("serif");
  const [fontSize, setFontSize] = useState(64);
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [useRandomColor, setUseRandomColor] = useState(false);
  const [color, setColor] = useState("#009d2d");

  const generate = () => {
    const ctx: CanvasRenderingContext2D = getContext();

    ctx.fillStyle = useRandomColor ? generateRandomColor() : color;
    ctx.fillRect(0, 0, width, height);

    // フォントによってtextWidthが変わるので注意
    ctx.font = `${fontSize}px ${font}`;
    const textWidth = ctx.measureText( comment ).width;
    const textHeight = fontSize;
    const fontX = (width - textWidth) / 2;
    const fontY = (height + textHeight) / 2;
    ctx.fillStyle = fontColor;
    ctx.fillText(comment, fontX, fontY);
    ctx.save();
  }

  const canvasRef = useRef(null);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };

  const downloadsImage = async () => {
    for (let i = 0; i < genNum; i++) {
      generate()
      downloadImage();
      await sleep(300);
    }
  }

  const downloadImage = () => {
    const canvas: any = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'test_image.jpeg';
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  }

  useEffect(() => {
    generate()
  })

  return (
    <div className="ImageGenerator">
      <h1>テスト画像生成</h1>
      <div>
        <ParamBox labelName="幅">
          <input type="number" defaultValue={width} onChange={ e => setWidth(parseInt(e.target.value)) }></input>
        </ParamBox>
        <ParamBox labelName="高さ">
          <input type="number" defaultValue={height} onChange={ e => setHeight(parseInt(e.target.value)) }></input>
        </ParamBox>
        <ParamBox labelName="画像内の文字">
          <input type="text" defaultValue={comment} onChange={ e => setComment(e.target.value) }></input>
        </ParamBox>
        <ParamBox labelName="フォント">
          <select defaultValue={font} onChange={ e => setFont(e.target.value) }>
            <option value="serif">serif</option>
            <option value="sans-serif">sans-serif</option>
            <option value="monospace">monospace</option>
          </select>
        </ParamBox>
        <ParamBox labelName="文字色">
          <input type="color" defaultValue={fontColor} onChange={ e => setFontColor(e.target.value) }></input>
        </ParamBox>
        <ParamBox labelName="文字サイズ">
          <input type="number" value={fontSize} onChange={ e => setFontSize(parseInt(e.target.value)) }></input>
          <br />
          <input
            type="range"
            value={fontSize}
            min="1"
            max="300"
            onChange={ e => setFontSize(parseInt(e.target.value)) }></input>
        </ParamBox>
        <ParamBox labelName="背景色をランダムにする">
          <input type="checkbox" defaultChecked={useRandomColor} onChange={ e => setUseRandomColor(e.target.checked) }></input>
        </ParamBox>
        <ParamBox labelName="背景色">
          <input type="color" defaultValue={color} disabled={useRandomColor} onChange={ e => setColor(e.target.value) }></input>
        </ParamBox>
        <button onClick={generate}>生成</button>
      </div>

      <canvas className="canvas" ref={canvasRef}  width={width} height={height} />

      <div>
        <ParamBox labelName="出力枚数">
          <input type="number" defaultValue={1} onChange={ e => setGenNum( parseInt(e.target.value) ) }></input>
        </ParamBox>
        <button onClick={downloadsImage}>画像をダウンロード</button>
      </div>
    </div>
  );
}

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const generateRandomColor = (): string => {
  const ran1 = Math.floor(Math.random() * 200);
  const ran2 = Math.floor(Math.random() * 200);
  const ran3 = Math.floor(Math.random() * 200);
  return `rgb(${ran1}, ${ran2}, ${ran3})`;
}

export default ImageGenerator;
