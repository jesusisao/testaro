import React, { useState, useEffect, useRef } from 'react';
import './ImageGenerator.scss';

const ImageGenerator: React.FC = () => {
  const [comment, setComment] = useState('テスト画像');
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [genNum, setGenNum] = useState(1);
  const [color, setColor] = useState("#009d2d");
  const [font, setFont] = useState("serif");
  const [useRandomColor, setUseRandomColor] = useState(false);

  const generate = () => {
    const ctx: CanvasRenderingContext2D = getContext();

    ctx.fillStyle = useRandomColor ? generateRandomColor() : color;
    ctx.fillRect(0, 0, width, height);

    const fontSize = 64;
    // フォントによってtextWidthが変わるので注意
    ctx.font = `${fontSize}px ${font}`;
    const textWidth = ctx.measureText( comment ).width;
    const textHeight = fontSize;
    const fontX = (width - textWidth) / 2;
    const fontY = (height + textHeight) / 2;
    ctx.fillStyle = `rgb(255, 255, 255)`;
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
        <input type="number" defaultValue={width} onChange={ e => setWidth(parseInt(e.target.value)) }></input>
        <input type="number" defaultValue={height} onChange={ e => setHeight(parseInt(e.target.value)) }></input>
        <select defaultValue={font} onChange={ e => setFont(e.target.value) }>
          <option value="serif">serif</option>
          <option value="sans-serif">sans-serif</option>
          <option value="monospace">monospace</option>
        </select>
        <input type="text" defaultValue={comment} onChange={ e => setComment(e.target.value) }></input>
        <input type="checkbox" defaultChecked={useRandomColor} onChange={ e => setUseRandomColor(e.target.checked) }></input>
        <input type="color" defaultValue={color} disabled={Boolean(useRandomColor)} onChange={ e => setColor(e.target.value) }></input>
        <button onClick={generate}>生成</button>
      </div>
      <canvas className="canvas" ref={canvasRef}  width={width} height={height} />
      <div>
        <input type="number" defaultValue={1} onChange={ e => setGenNum( parseInt(e.target.value) ) }></input>
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
