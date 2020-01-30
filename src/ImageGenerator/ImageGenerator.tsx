import React, { useState, useEffect, useRef } from 'react';
import './ImageGenerator.scss';

const ImageGenerator: React.FC = () => {
  const [comment, setComment] = useState('テスト画像');
  const [charNum, setCharNum] = useState(1);
  const width = 400;
  const height = 300;

  const generate = () => {
    const ctx: CanvasRenderingContext2D = getContext();

    const ran1 = Math.floor(Math.random() * 200)
    const ran2 = Math.floor(Math.random() * 200)
    const ran3 = Math.floor(Math.random() * 200)
    ctx.fillStyle = `rgb(${ran1}, ${ran2}, ${ran3})`;
    ctx.fillRect(0, 0, width, height);

    const fontSize = 64;
    // フォントによってtextWidthが変わるので注意
    ctx.font = `${fontSize}px serif`;
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
        <input type="number" defaultValue={1} onChange={ e => setCharNum( parseInt(e.target.value) ) }></input>
        <button onClick={generate}>生成</button>
      </div>
      <canvas className="canvas" ref={canvasRef}  width={width} height={height} />
      <div>
        <button onClick={downloadImage} >画像をダウンロード</button>
      </div>
    </div>
  );
}

export default ImageGenerator;
