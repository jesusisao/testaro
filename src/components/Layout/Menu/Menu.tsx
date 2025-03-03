import style from "./Menu.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFont,
  faMale,
  faImages,
  faFilePdf,
  faFilePowerpoint,
  faQrcode,
  faUnderline,
  faBook,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Menu: React.FC = () => {
  return (
    <div className={style.menu}>
      <Link href="/about" className={style.titleContainer}>
        <img src="/icon-400x400.png" className={style.logo} alt="testaro" />
        <h1 className={style.siteName}>Testaro</h1>
      </Link>

      <ul>
        <li>
          <Link href="/image-generator">
            <span className={style.link}>
              <FontAwesomeIcon icon={faImages} className={style.icon} />
              ダミー画像
            </span>
          </Link>
        </li>
        <li>
          <Link href="/pdf-generator">
            <span className={style.link}>
              <FontAwesomeIcon icon={faFilePdf} className={style.icon} />
              ダミーPDF
            </span>
          </Link>
        </li>
        <li>
          <Link href="/pptx-generator">
            <span className={style.link}>
              <FontAwesomeIcon icon={faFilePowerpoint} className={style.icon} />
              ダミーPPTX
            </span>
          </Link>
        </li>
        <li>
          <Link href="/user-generator">
            <span className={style.link}>
              <FontAwesomeIcon icon={faMale} className={style.icon} />
              ダミーユーザー情報
            </span>
          </Link>
        </li>
        <li>
          <Link href="/qr-generator">
            <span className={style.link}>
              <FontAwesomeIcon icon={faQrcode} className={style.icon} />
              QRコード
            </span>
          </Link>
        </li>
        <li>
          <Link href="/string-generator">
            <span className={style.link}>
              <FontAwesomeIcon icon={faFont} className={style.icon} />
              テスト文字列
            </span>
          </Link>
        </li>
        <li>
          <Link href="/uri-decoder">
            <span className={style.link}>
              <FontAwesomeIcon icon={faLink} className={style.icon} />
              URIデコーダー
            </span>
          </Link>
        </li>
        <li>
          <Link href="/unicode-escape-sequence">
            <span className={style.link}>
              <FontAwesomeIcon icon={faUnderline} className={style.icon} />
              Unicodeエスケープ
            </span>
          </Link>
        </li>
        <li>
          <Link href="/recommended-books">
            <span className={style.link}>
              <FontAwesomeIcon icon={faBook} className={style.icon} />
              おすすめ書籍
            </span>
          </Link>
        </li>
      </ul>
      <div className={style.githubLink}>
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
