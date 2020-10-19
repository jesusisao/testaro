import React from "react";
import "./Loading.scss";

const Loading: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-content">
        <p>しばらくお待ち下さい…</p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loading;
