import React from "react";
import "./Menu.scss";
import logo from "./icon-400x400.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFont,
  faMale,
  faImages,
  faFilePdf,
  faFilePowerpoint,
  faQrcode,
  faBook,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Menu: React.FC = () => {
  return (
    <div className="Menu">
      <Link to="/about">
        <div className="title-container">
          <img src={logo} className="logo" alt="testaro" />
          <h1 className="site-name">Testaro</h1>
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/usergen" className="link">
            <FontAwesomeIcon icon={faMale} className="icon" />
            ダミーユーザー情報
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
          <Link to="/strgen" className="link">
            <FontAwesomeIcon icon={faFont} className="icon" />
            テスト文字列
          </Link>
        </li>
        <li>
          <Link to="/uridecode" className="link">
            <FontAwesomeIcon icon={faLink} className="icon" />
            URIデコーダー
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
      <div className="github-link">
        <a
          href="https://github.com/jesusisao/testaro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
};

export default Menu;
