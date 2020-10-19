import React from "react";
import "./Menu.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSitemap,
  faFont,
  faMale,
  faImages,
  faFilePdf,
  faFilePowerpoint,
  faQrcode,
  faBook
} from "@fortawesome/free-solid-svg-icons";

const Menu: React.FC = () => {
  return (
    <div className="Menu">
      <h1 className="site-name">Testaro</h1>
      <ul>
        <li>
          <Link to="/about" className="link">
            <FontAwesomeIcon icon={faSitemap} className="icon" />
            About
          </Link>
        </li>
        <li>
          <Link to="/strgen" className="link">
            <FontAwesomeIcon icon={faFont} className="icon" />
            テスト文字列
          </Link>
        </li>
        <li>
          <Link to="/usergen" className="link">
            <FontAwesomeIcon icon={faMale} className="icon" />
            ダミーユーザー
          </Link>
        </li>
        <li>
          <Link to="/imggen" className="link">
            <FontAwesomeIcon icon={faImages} className="icon" />
            ダミー画像
          </Link>
        </li>
        <li>
          <Link to="/pdfgen" className="link">
            <FontAwesomeIcon icon={faFilePdf} className="icon" />
            ダミーPDF
          </Link>
        </li>
        <li>
          <Link to="/pptxgen" className="link">
            <FontAwesomeIcon icon={faFilePowerpoint} className="icon" />
            ダミーPPTX
          </Link>
        </li>
        <li>
          <Link to="/qrgen" className="link">
            <FontAwesomeIcon icon={faQrcode} className="icon" />
            QRコード
          </Link>
        </li>
        <li>
          <Link to="/recobooks" className="link">
            <FontAwesomeIcon icon={faBook} className="icon" />
            おすすめ書籍
          </Link>
        </li>
        {/* <li>Hash</li> */}
        {/* <li>バーコード</li> */}
      </ul>
    </div>
  );
};

export default Menu;
