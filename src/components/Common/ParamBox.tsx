import type { ReactNode } from "react";
import styles from "./ParamBox.module.scss";

const ParamBox: React.FC<{
  labelName?: string;
  labelWidth?: string;
  children: ReactNode;
}> = (props) => {
  const labelStyle = props.labelWidth ? { width: props.labelWidth } : {};

  return (
    <div className={styles.container}>
      <label className={styles.label} style={labelStyle}>
        {props.labelName}
      </label>
      <div className={styles.formItem}>{props.children}</div>
    </div>
  );
};

export default ParamBox;
