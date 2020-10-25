import { NextPage } from "next";
import Head from "next/head";
import style from "./index.module.scss";
import commonStyle from "styles/common.module.scss";

const RecommendedBooks: NextPage = () => {
  const title = "おすすめ書籍";
  return (
    <div className={style.page}>
      <Head>
        <title>{title} | Testaro</title>
      </Head>
      <h1 className={commonStyle.pageTitle}>{title}</h1>
      <p>テスト品質・開発品質を向上させるためのおすすめ書籍です。</p>

      <div className={style.textArea}>
        <h2>
          ソフトウェアテストの教科書 品質を決定づけるテスト工程の基本と実践
        </h2>
        <p>
          境界値分析、分岐網羅条件網羅、デシジョンテーブルなど、アプリケーション開発におけるテストについて基本的な手法を知ることができます。
        </p>
        <p>
          この本は基本的にウォーターフォール開発を主眼に置いて内容が書かれているのですが、自動テストを書く上でも、「何をテストしたらよいか」を知っておくことはとても意味があるはずです。
          <a href="https://www.amazon.co.jp/dp/4797365811/ref=cm_sw_r_tw_dp_x_Z9zJFbGZ46NJC">
            Amazonで購入する
          </a>
        </p>
      </div>

      <div className={style.textArea}>
        <h2>テスト駆動開発</h2>
        <p>
          「テスト」とタイトルに入ってはいますが、この本はテスト技法の本ではなく開発手法の本です。
          「テスト駆動開発」とは最初に自動テストを書いて、そのテストが通るようにプロダクションコードを書いていく開発手法です。
        </p>
        <p>
          著者のKent
          Beckはアジャイルマニフェスト起案者でもあります。エクストリームプログラミングで、どうやって品質を担保していくのか、その基本的な手法を、この本で学ぶことができるかもしれません。
          <a href="https://www.amazon.co.jp/dp/4274217884/ref=cm_sw_r_tw_dp_x_AbAJFb2Z29XM2">
            Amazonで購入する
          </a>
        </p>
      </div>
    </div>
  );
};

export default RecommendedBooks;
