import { NextPage } from "next";
import Head from "next/head";
import commonStyle from "styles/common.module.scss";
import style from "./index.module.scss";

const About: NextPage = () => {
  return (
    <div className={style.page}>
      <Head>
        <title>Testaro</title>
      </Head>
      <h1 className={commonStyle.pageTitle}>About</h1>
      <div className={style.textArea}>
        <h2>Testaroについて</h2>
        <p>
          このサービスはWebサービス開発や業務システム開発時の手動テストを多少楽にするために作りました。
          React + TypeScriptで作られている静的なWebページです。
          inputに入力した内容をサーバーに送信したりはしません。強いて言うならGoogle
          Analyticsを使用している程度です。
          そのため、仕事でも安心してお使い頂けます。
        </p>
        <p>
          もし機能のご要望等がありましたら、
          <a
            href="https://github.com/jesusisao/testaro"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          にissueとして上げて頂いたり、Qiitaのコメントに書いて貰えれば対応できるかもしれません。
          プルリクエストを送って頂くのも歓迎です。
        </p>
        <p>
          自動テストを書いていても、開発中の動作確認をしたり、リリース前に確認作業をしたり……と、
          手動テストはどんなエンジニアであっても逃れることはできません。
        </p>
        <p>このページによって、多少の効率化ができたら幸いです。</p>
        <p className={style.author}>
          <a
            href="https://qiita.com/jesus_isao"
            target="_blank"
            rel="noopener noreferrer"
          >
            @jesus_isao
          </a>
        </p>
      </div>
      <div className={style.textArea}>
        <h2>動作環境</h2>
        <p>
          PC環境で使用することを想定しています。 Google
          Chromeで動作確認を行っています。
        </p>
      </div>
    </div>
  );
};

export default About;
