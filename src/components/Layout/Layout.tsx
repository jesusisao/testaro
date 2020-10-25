import Menu from "./Menu/Menu";
import style from "./Layout.module.scss";

function Layout({ children }: any): JSX.Element {
  return (
    <div className={style.app}>
      <Menu></Menu>
      <div className={style.appContainer}>{children}</div>
    </div>
  );
}

export default Layout;
