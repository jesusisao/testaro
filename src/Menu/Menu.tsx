import React from "react";
import "./Menu.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSitemap,
  faFont,
  faMale,
  faImages,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons";

const style = {
  marginRight: "5px",
  opacity: "0.3",
  width: "1em"
};

const Menu: React.FC = () => {
  return (
    <div className="Menu">
      <h1 className="site-name">Testaro</h1>
      <ul>
        <li>
          <Link to="/about" className="link">
            <FontAwesomeIcon icon={faSitemap} style={style} />
            About
          </Link>
        </li>
        <li>
          <Link to="/strgen" className="link">
            <FontAwesomeIcon icon={faFont} style={style} />
            テスト文字列
          </Link>
        </li>
        <li>
          <Link to="/namegen" className="link">
            <FontAwesomeIcon icon={faMale} style={style} />
            ダミーレコード
          </Link>
        </li>
        <li>
          <Link to="/imggen" className="link">
            <FontAwesomeIcon icon={faImages} style={style} />
            ダミー画像
          </Link>
        </li>
        <li>
          <Link to="/pdfgen" className="link">
            <FontAwesomeIcon icon={faFilePdf} style={style} />
            ダミーPDF
          </Link>
        </li>
        {/* <li>Hash</li> */}
        {/* <li>バーコード</li> */}
      </ul>
    </div>
  );
};

export default Menu;
