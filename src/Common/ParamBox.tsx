import React from "react";

const style = {
  display: "block",
  width: "100%",
  margin: "5px",
  lineHeight: "20px"
};

const labelStyle = {
  display: "inline-block",
  width: "120px",
  lineHeight: "1.8em",
  textAlign: "right" as "right",
  paddingRight: "5px",
  verticalAlign: "middle" as "middle",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  color: "rgb(20, 20, 20)",
  marginRight: "3px",
  borderRadius: "5px"
};

const formItemStyle = {
  display: "inline-block",
  verticalAlign: "middle" as "middle"
};

const ParamBox: React.FC<{ labelName?: string }> = props => {
  return (
    <div style={style}>
      <label style={labelStyle}>{props.labelName}</label>
      <div style={formItemStyle}>{props.children}</div>
    </div>
  );
};

export default ParamBox;
