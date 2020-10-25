import React from "react";
import style from "./Loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={style.loaderWrapper}>
      <div className={style.loaderContent}>
        <p>しばらくお待ち下さい…</p>
        <div className={style.loader}></div>
      </div>
    </div>
  );
};

export default Loading;
