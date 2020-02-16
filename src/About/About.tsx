import React from "react";
import "./About.scss";
import "../Common/common.scss";

const About: React.FC = () => {
  return (
    <div className="About">
      <h1 className="page-title">About</h1>
      <div className="text-area">
        <h2>Testaroについて</h2>
        <p>
          このサービスは業務システム開発の手動テストを多少楽にするために作りました。React
          + TypeScriptで作られている静的なWebページです。
          inputに入力した内容をサーバーに送信したりはしません。強いて言うならGoogle
          Analyticsを使用している程度です。
          そのため、仕事でも安心してお使い頂けます。
        </p>
        <p>
          もし機能のご要望等がありましたら、
          <a href="https://github.com/jesusisao/testaro">GitHub</a>
          にissueとして上げて頂いたり、Qiitaのコメントに書いて貰えれば対応できるかもしれません。
          プルリクエストを送って頂くのも歓迎です。
        </p>
        <p>
          自動テストを書いていても、開発中の動作確認をしたり、リリース前に確認作業をしたり……と、
          手動テストはどんなエンジニアであっても逃れることはできません。
        </p>
        <p>このページによって、多少の効率化ができたら幸いです。</p>
        <p className="author">
          <a href="https://qiita.com/jesus_isao">@jesus_isao</a>
        </p>
      </div>
      <div className="text-area">
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
