import type { ReactNode } from "react";

const style = {
  display: "flex",
  width: "100%",
  margin: "1px 0 1px 0",
  lineHeight: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box" as const,
};

const labelStyle = (labelWidth: string | undefined) => {
  const width = labelWidth ? labelWidth : "120px";
  return {
    display: "flex",
    float: "left" as const,
    width: width,
    textAlign: "right" as const,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "5px",
    backgroundColor: "rgb(0, 128, 151)",
    color: "rgba(255, 255, 255, 0.8)",
  };
};

const formItemStyle = {
  display: "flex",
  float: "right" as const,
  verticalAlign: "middle" as const,
};

const ParamBox: React.FC<{
  labelName?: string;
  labelWidth?: string;
  children: ReactNode;
}> = (props) => {
  return (
    <div style={style}>
      <label style={labelStyle(props.labelWidth)}>{props.labelName}</label>
      <div style={formItemStyle}>{props.children}</div>
    </div>
  );
};

export default ParamBox;
