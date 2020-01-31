import React from 'react';

const style = {
  display: "block",
  width: "100%"
}

const formItemStyle = {
  display: "block"
}

const ParamBox: React.FC<{labelName?: string}> = (props) => {

  return (
    <div style={style}>
      <label>{props.labelName}</label>
      <div style={formItemStyle}>{props.children}</div>
    </div>
  );
}

export default ParamBox;
