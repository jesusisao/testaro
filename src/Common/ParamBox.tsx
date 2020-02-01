import React from 'react';

const style = {
  display: "block",
  width: "100%",
  margin: "5px",
  lineHeight: "20px"
}

const labelStyle = {
  display: "inline-block",
  width: "120px",
  textAlign: "right" as "right",
  paddingRight: "5px",
  verticalAlign: "middle" as "middle"
}

const formItemStyle = {
  display: "inline-block",
  verticalAlign: "middle" as "middle",
}

const ParamBox: React.FC<{labelName?: string}> = (props) => {

  return (
    <div style={style}>
      <label style={labelStyle}>{props.labelName}</label>
      <div style={formItemStyle}>{props.children}</div>
    </div>
  );
}

export default ParamBox;
