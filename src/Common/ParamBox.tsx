import React from "react";

const style = {
  display: "flex",
  width: "100%",
  margin: "5px 0 5px 0",
  lineHeight: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "15px",
  boxSizing: "border-box" as "border-box"
};

const labelStyle = {
  display: "flex",
  float: "left" as "left",
  width: "120px",
  textAlign: "right" as "right",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: "5px",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  color: "rgb(20, 20, 20)",
  marginRight: "3px",
  borderRadius: "15px"
};

const formItemStyle = {
  display: "flex",
  float: "right" as "right",
  verticalAlign: "middle" as "middle"
};

const childStyle = {
  display: "block"
};

const ParamBox: React.FC<{ labelName?: string }> = props => {
  return (
    <div style={style}>
      <label style={labelStyle}>{props.labelName}</label>
      <div style={formItemStyle}>
        <div style={childStyle}>{props.children}</div>
      </div>
    </div>
  );
};

export default ParamBox;
