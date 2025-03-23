import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";

const RecommendedBooks: NextPage = () => {
  const title = "おすすめ書籍";
  const description =
    "テスト品質・開発品質を向上させるためのおすすめ書籍です。とりあえず一冊持っておいて損はありません。";
  return (
    <div className={style.page}>
      <MetaHeader
        title={title}
        description={description}
        url="/recommended-books"
      />
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>{description}</p>

      <article className={style.article}>
        <h2 className={style.articleTitle}>ソフトウェアテストの教科書</h2>
        <div className={style.articleBody}>
          <a
            href="https://amzn.to/41UYILO"
            target="_blank"
            className={style.image}
          >
            <img
              style={{ width: "160px" }}
              src="https://m.media-amazon.com/images/I/81pvuoQQr4L._SL1500_.jpg"
            ></img>
          </a>
          <p>
            境界値分析、分岐網羅条件網羅、デシジョンテーブルなど、アプリケーション開発におけるテストについて基本的な手法を知ることができます。
          </p>
        </div>
      </article>

      <article className={style.article}>
        <h2>テスト駆動開発</h2>
        <div className={style.articleBody}>
          <a
            href="https://amzn.to/4iQgW80"
            target="_blank"
            className={style.image}
          >
            <img
              style={{ width: "160px" }}
              src="https://m.media-amazon.com/images/I/813DXFJioDL._SY425_.jpg"
            ></img>
          </a>
          <span>
            <p>
              「テスト」とタイトルに入ってはいますが、この本はテスト技法の本ではなく開発手法の本です。
              「テスト駆動開発」とは最初に自動テストを書いて、そのテストが通るようにプロダクションコードを書いていく開発手法です。
            </p>
            <p>
              著者のKent
              Beckはアジャイルマニフェスト起案者でもあります。エクストリームプログラミングで、どうやって品質を担保していくのか、その基本的な手法を、この本で学ぶことができるかもしれません。
            </p>
          </span>
        </div>
      </article>
    </div>
  );
};

export default RecommendedBooks;
