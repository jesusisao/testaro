import React from "react";
import "./About.scss";
import "../Common/common.scss";

const About: React.FC = () => {
  return (
    <div className="About">
      <h1>About</h1>
      <div className="text-area">
        <p>
          このサービスは業務システム開発の手動テストを多少楽にするために作りました。React
          +
          TypeScriptで作られているWebページです。全てJavaScriptで動いているため、inputに入力した内容をサーバーに送信したりはしません。
          仕事でも安心してお使い頂けます。リポジトリは
          <a href="https://github.com/jesusisao/testaro">こちら</a>
          にあります。
        </p>
        <p>
          仮に自動テストを書いていても、開発中の動作確認をしたり、リリース前に確認作業をしたり……と、
          手動テストはどんなエンジニアであっても逃れることはできません。
        </p>
        <p>
          もし機能のご要望等がありましたら、
          <a href="https://github.com/jesusisao/testaro">GitHub</a>
          にissueとして上げて頂いたり、Qiitaのコメントに書いて貰えれば対応できるかもしれません。
          プルリクエストを送って頂くのも歓迎です。
        </p>
        <p>このページによって、多少の効率化ができたら幸いです。</p>
        <p className="author">
          <a href="https://qiita.com/jesus_isao">@jesus_isao</a>
        </p>
      </div>
    </div>
  );
};

export default About;
