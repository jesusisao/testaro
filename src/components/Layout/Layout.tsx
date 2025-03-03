import type { ReactNode } from "react";
import Menu from "./Menu/Menu";
import style from "./Layout.module.scss";

const Layout: React.FC<{ labelName?: string; children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className={style.app}>
      <Menu></Menu>
      <div className={style.appContainer}>{children}</div>
    </div>
  );
};

export default Layout;
